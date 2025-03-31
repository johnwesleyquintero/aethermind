const semver = require('semver');
const { engines } = require('../package.json');

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
    console.log('\x1b[31m%s\x1b[0m', `❌ Required node version ${version} not satisfied with current version ${process.version}`);
    console.log('\x1b[36m%s\x1b[0m', '\n💡 Tip: Use nvm to manage Node.js versions:');
    console.log(`  nvm install ${version.replace('>=', '')}`);
    console.log(`  nvm use ${version.replace('>=', '')}\n`);
    process.exit(1);
}
