const fs = require('fs')
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

const createMenu = (win) => {
    const template = [{
            label: 'File',
            submenu: [{
                label: 'Open...',
                accelerator: 'CmdOrCtrl+O',
                click: async() =>
                    dialog
                    /**
                     * ダイアログをモーダルにしたい場合は
                     * 第1引数に BrowserWindow インスタンスを渡す（省略可）
                     */
                    .showOpenDialog(win, {
                        /**
                         * 'openFile' - 単一のファイル
                         * 'openDirectory' - 単一のディレクトリ
                         * 'multiSelections' - 複数選択可にする
                         * 'showHiddenFiles' - ドットファイルも選択可にする
                         */
                        properties: ['openFile', 'showHiddenFiles'],
                        title: 'ファイルを選択する',
                        filters: [{
                            name: '画像ファイル',
                            extensions: ['png', 'jpg', 'jpeg'],
                        }, ],
                        /**
                         * result: Electron.OpenDialogReturnValue
                         *
                         * result.canceled: boolean
                         * result.filePaths: string[]
                         *
                         */
                    })
                    .then((result) => {
                        // キャンセルボタンが押されたとき
                        if (result.canceled) return;

                        // レンダラープロセスへファイルのフルパスを送信
                        win.webContents.send('menu-open', result.filePaths[0]);
                    })
                    .catch((err) => console.log(`Error: ${err}`)),
            }, ],
        },
        { role: 'editMenu' },
        { role: 'viewMenu' },
        { role: 'windowMenu' },
        { role: 'help', submenu: [{ role: 'about' }] },
    ];

    if (process.platform === 'darwin') template.unshift({ role: 'appMenu' });

    return Menu.buildFromTemplate(template);
};

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // v12からのデフォルト値（記述不要）
            contextIsolation: true, // 〃
            preload: path.join(__dirname, 'preload.js') // ★ここがポイント★
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    createMenu(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('file-save', async(event, label) => {
    // 場所とファイル名を選択
    const path = dialog.showSaveDialogSync(null, {
        buttonLabel: label,
        filters: [
            { name: 'Text', extensions: ['json'] },
        ],
        properties: [
            'createDirectory', // ディレクトリの作成を許可 (macOS)
        ]
    });

    // キャンセルで閉じた場合
    if (path === undefined) {
        return ({ status: undefined });
    }

    // ファイルの内容を返却
    try {
        return ({ status: true, path: path });
    } catch (error) {
        return ({ status: false, message: error.message });
    }
});

ipcMain.handle('file-open', async(event, label) => {
    // 場所とファイル名を選択
    const path = dialog.showOpenDialogSync(null, {
        buttonLabel: label,
        filters: [
            { name: 'Text', extensions: ['json'] },
        ],
        properties: [
            'createDirectory', // ディレクトリの作成を許可 (macOS)
        ]
    });

    // キャンセルで閉じた場合
    if (path === undefined) {
        return ({ status: undefined });
    }

    // ファイルの内容を返却
    try {
        return ({ status: true, path: path });
    } catch (error) {
        return ({ status: false, message: error.message });
    }
});