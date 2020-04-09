import {config as enableDotenv} from 'dotenv';
import { Octokit } from '@octokit/rest';

enableDotenv();

const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ZENHUB_TOKEN = process.env.ZENHUB_TOKEN;

const REPO_EXTRACT = /^([^\/]+)\/([^\/]+)$/;

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

  const repo = (await octokit.repos.get(repoInfo)).data;
  console.log(repo.id);

})();
