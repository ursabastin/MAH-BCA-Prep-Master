import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const isDev = !app.isPackaged;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#0a0a0c',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#0a0a0c',
            symbolColor: '#ffffff',
            height: 30
        }
    });

    const startUrl = isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, '../dist/index.html')}`;

    mainWindow.loadURL(startUrl);

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers for File System Access
ipcMain.handle('read-json', async (event, filePath) => {
    try {
        const fullPath = path.isAbsolute(filePath)
            ? filePath
            : path.join(app.getAppPath(), filePath);

        const data = await fs.readFile(fullPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON:', error);
        throw error;
    }
});

ipcMain.handle('write-json', async (event, { filePath, data }) => {
    try {
        const fullPath = path.isAbsolute(filePath)
            ? filePath
            : path.join(app.getAppPath(), filePath);

        // Ensure directory exists
        await fs.mkdir(path.dirname(fullPath), { recursive: true });

        await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8');
        return { success: true };
    } catch (error) {
        console.error('Error writing JSON:', error);
        throw error;
    }
});

ipcMain.handle('append-quiz-log', async (event, logEntry) => {
    try {
        const logPath = path.join(app.getAppPath(), 'local_data/quiz_log.json');
        let logs = [];
        try {
            const data = await fs.readFile(logPath, 'utf8');
            logs = JSON.parse(data);
        } catch (e) {
            // If file doesn't exist or is invalid, start with empty array
        }

        logs.push({
            ...logEntry,
            timestamp: new Date().toISOString()
        });

        await fs.writeFile(logPath, JSON.stringify(logs, null, 2), 'utf8');
        return { success: true };
    } catch (error) {
        console.error('Error appending quiz log:', error);
        throw error;
    }
});
