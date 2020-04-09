import {config as enableDotenv} from 'dotenv';
import { Octokit } from '@octokit/rest';

import { ZenHub } from './zenhub';

enableDotenv();

const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ZENHUB_TOKEN = process.env.ZENHUB_TOKEN;

const REPO_EXTRACT = /^([^\/]+)\/([^\/]+)$/;

interface Epic {
  issues: number[];
}

(async () => {
  if (!GITHUB_REPO) {
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

  const repoExtract = REPO_EXTRACT.exec(GITHUB_REPO);
  if (!repoExtract) {
    console.error('Invalid repo GITHUB_REPO');
    process.exit(1);
  }
  const repoInfo = {
    owner: repoExtract[1],
    repo: repoExtract[2]
  }

  const octokit = new Octokit({
    auth: GITHUB_TOKEN
  });

  const zenhub = new ZenHub(ZENHUB_TOKEN);

  const repo = (await octokit.repos.get(repoInfo)).data;
  console.log(repo.id);

  /** IDs of all issues in repo that are epics */
  const epicIssues = (await zenhub.getEpics(repo.id)).epic_issues
    // Filter only epics for this repo
    .filter(epic => epic.repo_id === repo.id)
    // Map to ID
    .map(epic => epic.issue_number);

  const epics = new Map<number, Epic>();
  /** Map from issues to the epics they're contained within */
  const parents = new Map<number, number[]>();
  for (const epicIssue of epicIssues) {
    console.log(`fetching info for EPIC: ${epicIssue}`);
    const epic = await zenhub.getEpic(repo.id, epicIssue);
    const issues = epic.issues
      .filter(i => i.repo_id === repo.id)
      .map(i => i.issue_number);
    epics.set(epicIssue, { issues });
    // Update the parents array for each of the included issues
    for (const issue of issues) {
      let p = parents.get(issue);
      if (!p) {
        p = [];
        parents.set(issue, p);
      }
      p.push(epicIssue);
    }
    // TODO: remove
    if (epics.size > 3) break;
  }

  

  console.log(parents);

})();
