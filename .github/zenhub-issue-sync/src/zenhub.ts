import fetch from 'node-fetch';

interface Epics {
  epic_issues: Array<{
    issue_number: number;
    repo_id: number;
    issue_url: string;
  }>;
}

interface Pipeline {
  workspace_id: string;
  name: string;
  pipeline_id: string;
}

interface Issue {
  issue_number: number;
  is_epic: boolean;
  repo_id: number;
  estimate: {
    value: number;
  };
  pipeline: Pipeline;
  pipelines: Pipeline[];
}

interface Epic {
  total_epic_estimates: {
    value: number;
  };
  estimate: {
    value: number;
  };
  pipeline: Pipeline;
  pipelines: Pipeline[];
  issues: Issue[];
}

export class ZenHub {
  private readonly token: string;

  public constructor(token: string) {
    this.token = token;
  }

  public async get(path: string) {
    const result = await fetch(`https://api.zenhub.com${path}`, {
      headers: {
        'X-Authentication-Token': this.token
      }
    });
    return result.json();
  }

  public getEpics(repoId: number): Promise<Epics> {
    return this.get(`/p1/repositories/${repoId}/epics`);
  }

  public getEpic(repoId: number, issueId: number): Promise<Epic> {
    return this.get(`/p1/repositories/${repoId}/epics/${issueId}`);
  }
}
