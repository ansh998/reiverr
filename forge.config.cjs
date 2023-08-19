const fs = require('fs');
const path = require('path');

module.exports = {
	packagerConfig: {
		asar: true
	},
	rebuildConfig: {},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {}
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin']
		},
		{
			name: '@electron-forge/maker-deb',
			config: {}
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {}
		}
	],
	plugins: [
		{
			name: '@electron-forge/plugin-auto-unpack-natives',
			config: {}
		}
	],
	hooks: {
		packageAfterPrune: async (forgeConfig, buildPath, electronVersion, platform, arch) => {
			if (platform === 'darwin') {
				console.log('We need to remove the problematic link file on macOS');
				console.log(`Build path ${buildPath}`);
				try {
					fs.unlinkSync(path.join(buildPath, 'node_modules/sqlite3/build/node_gyp_bins/python3'));
				} catch (err) {
					console.error(err);
				}
			}
		}
	}
};
