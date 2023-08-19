process.env.PORT = '9494';

(async () => {
	const { app, BrowserWindow } = await import('electron');
	await import('../build/index.js');

	const createWindow = () => {
		const mainWindow = new BrowserWindow({
			width: 1200,
			height: 800,
			webPreferences: {
				nodeIntegration: true
			}
		});

		mainWindow.loadURL('http://localhost:9494');
	};

	app.whenReady().then(() => {
		createWindow();

		app.on('activate', () => {
			// On macOS it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (BrowserWindow.getAllWindows().length === 0) createWindow();
		});
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});
})();

// const { app, BrowserWindow } = require('electron');
// (async () => {
// 	await import('../build/index.js');
// })();
// // require('../build/index.js')(module);
// // await import('../build/index.js');

// const createWindow = () => {
// 	const mainWindow = new BrowserWindow({
// 		width: 1200,
// 		height: 800,
// 		webPreferences: {
// 			nodeIntegration: true
// 		}
// 	});

// 	mainWindow.loadURL('http://localhost:9494');
// };

// app.whenReady().then(() => {
// 	createWindow();

// 	app.on('activate', () => {
// 		// On macOS it's common to re-create a window in the app when the
// 		// dock icon is clicked and there are no other windows open.
// 		if (BrowserWindow.getAllWindows().length === 0) createWindow();
// 	});
// });

// app.on('window-all-closed', () => {
// 	if (process.platform !== 'darwin') app.quit();
// });
