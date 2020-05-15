if (!process.version.startsWith('v10.')) {
  console.error('This command is not compatible with node version: ' + process.version);
  console.error('Please run this command using node version 10');
  console.error('Perhaps you forgot to run: nvm use 10');
  process.exit(1);
}
