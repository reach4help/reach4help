import {config as enableDotenv} from 'dotenv';
import { Octokit } from '@octokit/rest';

import { ZenHub } from './zenhub';

enableDotenv();

const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ZENHUB_TOKEN = process.env.ZENHUB_TOKEN;

const REPO_EXTRACT = /^([^\/]+)\/([^\/]+)$/;

const START_BOUNDARY_COMMENT = `\n\n<!--zenhub info:`
const END_BOUNDARY_COMMENT = `<!--zenhub info end-->`

interface Epic {
  issues: number[];
}

interface GitHubUser {
  login: string;
}

interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  state: string;
  labels: Array<{
    name: string;
  }>;
  assignees: GitHubUser[];
  html_url: string;
  pull_request?: {};
}

interface IssueInfo {
  /**
   * Set if the issue is an epic
   */
  epic?: Epic;
  data?: GitHubIssue;
  parentEpics: number[];
  blocking: number[];
  blockedBy: number[];
}

(async () => {
  if (!GITHUB_REPOSITORY) {
    console.error('Environment variable GITHUB_REPO must be defined');
    process.exit(1);
  }
  if (!GITHUB_TOKEN) {
    console.error('Environment variable GITHUB_TOKEN must be defined');
    process.exit(1);
  }
  if (!ZENHUB_TOKEN) {
    console.error('Environment variable ZENHUB_TOKEN must be defined');
    process.exit(1);
  }

  const repoExtract = REPO_EXTRACT.exec(GITHUB_REPOSITORY);
  if (!repoExtract) {
    console.error('Invalid repo GITHUB_REPO');
    process.exit(1);
  }
  const repoInfo = {
    owner: repoExtract[1],
    repo: repoExtract[2]
  }

  // Instantiate APIs

  const octokit = new Octokit({
    auth: GITHUB_TOKEN
  });
  const zenhub = new ZenHub(ZENHUB_TOKEN);

  // Define data to collect

  const issueData = new Map<number, IssueInfo>();
  const getIssue = (issue: number) => {
    let i = issueData.get(issue);
    if (!i) {
      i = {
        parentEpics: [],
        blockedBy: [],
        blocking: []
      };
      issueData.set(issue, i);
    }
    return i;
  }

  // Start collecting data

  const repo = (await octokit.repos.get(repoInfo)).data;
  let workspaceId: string | null = null;

  /** IDs of all issues in repo that are epics */
  const epicIssues = (await zenhub.getEpics(repo.id)).epic_issues
    // Filter only epics for this repo
    .filter(epic => epic.repo_id === repo.id)
    // Map to ID
    .map(epic => epic.issue_number);

  for (const epicIssue of epicIssues) {
    console.log(`fetching info for EPIC: ${epicIssue}`);
    const epic = await zenhub.getEpic(repo.id, epicIssue);
    if (!workspaceId) {
      workspaceId = epic.pipeline.workspace_id;
    } else if (workspaceId !== epic.pipeline.workspace_id) {
      console.error('Unsupported, repo belongs to multiple workspaces')
      process.exit(1);
    }
    const issues = epic.issues
      .filter(i => i.repo_id === repo.id)
      .map(i => i.issue_number);
    getIssue(epicIssue).epic = { issues };
    // Update the parents array for each of the included issues
    for (const issue of issues) {
      getIssue(issue).parentEpics.push(epicIssue);
    }
  }

  const dependencies = (await zenhub.getDependencies(repo.id)).dependencies
    .filter(d => d.blocked.repo_id === repo.id && d.blocking.repo_id === repo.id);
  for (const dep of dependencies) {
    getIssue(dep.blocked.issue_number).blockedBy.push(dep.blocking.issue_number);
    getIssue(dep.blocking.issue_number).blocking.push(dep.blocked.issue_number);
  }

  // Get all github issues
  let nextPage: number | null = 1;
  while (nextPage !== null) {
    console.log(`Getting page ${nextPage} of issues from GitHub`);
    const getIssues = await octokit.issues.listForRepo({
      ...repoInfo,
      page: nextPage,
      state: 'all',
      per_page: 100
    });
    const hasNext = (getIssues.headers.link || '').indexOf('rel="next"') > -1;
    nextPage = hasNext ? ( nextPage + 1 ) : null;
    for (const issue of getIssues.data) {
      getIssue(issue.number).data = issue;
    }
  }

  const getIssueGitHubData = (issueNumber: number, issue: IssueInfo | null = null): GitHubIssue => {
    if (!issue)
      issue = getIssue(issueNumber);
    if (issue.data) {
      return issue.data;
    } else {
      console.error(`Missing data for issue: ${issueNumber}`);
      process.exit(1);
    }
  }

  const issueString = (issueId: number, issue: IssueInfo) => {
    const githubData = getIssueGitHubData(issueId, issue);
    const open = githubData.state === 'open';
    const assignments = githubData.assignees
      .map(a => `[@${a.login}](https://github.com/${a.login})`);
    const blocking = issue.blocking
      .map(i => getIssueGitHubData(i))
      .map(i => `[#${i.number}](${i.html_url})`);
    const blockers = issue.blockedBy
      .map(i => getIssueGitHubData(i))
      .filter(i => i.state === 'open')
      .map(i => `[#${i.number}](${i.html_url})`);
    return (
      (open ? '' : '~~') +
      (issue.epic ? `**[EPIC]** ` : '') +
      (open ? (
        (blocking.length > 0 ? `**[BLOCKING: ${blocking.join(', ')}]** ` : '') +
        (blockers.length > 0 ? `[BLOCKED BY: ${blockers.join(', ')}] ` : '') +
        (assignments.length > 0 ? `[${assignments.join(', ')}] ` : (
          // Highlight unassigned tasks that are also blocking
          blocking.length > 0 ? '**[UNASSIGNED]** ' : ''
        ))
      ) : '') +
      `[#${issueId} - ${githubData.title}](${githubData.html_url})` +
      (open ? '' : '~~')
    );
  }

  const getEpicTree = (epic: Epic, indent: number): string => {
    let tree = '';
    for (const issueId of epic.issues) {
      const issue = getIssue(issueId);
      const githubData = getIssueGitHubData(issueId, issue);
      tree += (
        '  '.repeat(indent) +
        `* [${githubData.state === 'closed' ? 'x' : ' '}] ` +
        issueString(issueId, issue) +
        `\n`
      );
      if (issue.epic) {
        tree += getEpicTree(issue.epic, indent + 1);
      }
    }

    return tree;
  }

  for (const i of issueData.entries()) {
    const issueId = i[0];
    const issue = i[1];
    // Don't add information to PRs
    if (issue.data?.pull_request) {
      continue;
    }
    const githubData =getIssueGitHubData(issueId, issue);
    let extraBody = (`
--------
### [ZenHub Information](https://app.zenhub.com/workspaces/${repoInfo.owner}-${workspaceId}/issues/${repoInfo.owner}/${repoInfo.repo}/${issueId})

*This information is updated automatically. To modify it, please use ZenHub.*
`
    );
    if (issue.parentEpics.length > 0) {
      extraBody += `\n**Belonging to Epics:**\n`;
      for (const epicId of issue.parentEpics) {
        extraBody += (
          `\n* ${issueString(epicId, getIssue(epicId))}`
        );
      }
      extraBody += '\n';
    }
    if (issue.blockedBy.length > 0) {
      extraBody += `\n**Blocked By:**\n`;
      for (const blockerId of issue.blockedBy) {
        extraBody += (
          `\n* ${issueString(issueId, getIssue(blockerId)) }`
        );
      }
      extraBody += '\n';
    }
    if (issue.blocking.length > 0) {
      extraBody += `\n**Blocking:**\n`;
      for (const blockeeId of issue.blocking) {
        extraBody += (
          `\n* ${ issueString(issueId, getIssue(blockeeId)) }`
        );
      }
      extraBody += '\n';
    }
    if (issue.epic) {
      extraBody += `\n**Children:**\n\n${getEpicTree(issue.epic, 0)}`;
    }

    let before: string;
    let after: string;
    const startBoundary = githubData.body.indexOf(START_BOUNDARY_COMMENT);
    if (startBoundary === -1) {
      before = githubData.body;
      after = '';
    } else {
      before = githubData.body.substr(0, startBoundary);
      const endBoundary = githubData.body.indexOf(END_BOUNDARY_COMMENT);
      if (endBoundary === -1) {
        after = '';
      } else {
        after = githubData.body.substr(endBoundary + END_BOUNDARY_COMMENT.length);
      }
    }
    const newBody = (
      before +
      START_BOUNDARY_COMMENT +
      ' do not edit anything after this line, ' +
      'it will be automatically changed-->\n' +
      extraBody +
      '\n' +
      END_BOUNDARY_COMMENT
    );
    if (newBody !== githubData.body) {
      console.log(`Updating description for issue ${issueId}`);
      await octokit.issues.update({
        ...repoInfo,
        issue_number: issueId,
        body: newBody
      });
    }
  }

})();
