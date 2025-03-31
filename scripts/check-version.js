// Simple version check without external dependencies
const requiredVersion = '18.18.0';
const currentVersion = process.version.slice(1); // Remove the 'v' prefix

function compareVersions(current, required) {
    const currentParts = current.split('.').map(Number);
    const requiredParts = required.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
        if (currentParts[i] > requiredParts[i]) return true;
        if (currentParts[i] < requiredParts[i]) return false;
    }
    return true;
}

if (!compareVersions(currentVersion, requiredVersion)) {
    console.log('\x1b[31m%s\x1b[0m', `❌ Required node version ${requiredVersion} not satisfied with current version ${process.version}`);
    console.log('\x1b[36m%s\x1b[0m', '\n💡 Tip: Use nvm to manage Node.js versions:');
    console.log(`  nvm install ${requiredVersion}`);
    console.log(`  nvm use ${requiredVersion}\n`);
    process.exit(1);
}
