const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Path to your local_data folder
const DATA_DIR = path.join(__dirname, '..', 'local_data');
const CONFIG_PATH = path.join(DATA_DIR, 'config.json');
const QUESTIONS_PATH = path.join(DATA_DIR, 'question_bank.json');
const LOGS_PATH = path.join(DATA_DIR, 'quiz_log.json');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false, // Neo-glass look requires removing the default frame
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        backgroundColor: '#F5F5F7', // Apple-like light grey background
        show: false
    });

    // 1. Force Maximize/Full Screen on Launch
    mainWindow.maximize();
    mainWindow.show();

    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
    } else {
        mainWindow.loadURL('http://localhost:5173');
    }
}

app.whenReady().then(() => {
    createWindow();

    // --- IPC HANDLERS (The Logic) ---

    // 1. Read Config
    ipcMain.handle('load-config', async () => {
        if (!fs.existsSync(CONFIG_PATH)) return { theme: 'dark' };
        return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    });

    // 2. Read Questions
    ipcMain.handle('load-questions', async () => {
        if (!fs.existsSync(QUESTIONS_PATH)) return [];
        return JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf-8'));
    });

    // 3. Save Attempt Log
    ipcMain.handle('save-attempt', async (event, logData) => {
        let logs = [];
        if (fs.existsSync(LOGS_PATH)) {
            logs = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf-8'));
        }
        logs.push({ ...logData, timestamp: new Date().toISOString() });
        fs.writeFileSync(LOGS_PATH, JSON.stringify(logs, null, 2));
        return true;
    });

    // 4. Import Questions (Append mode)
    ipcMain.handle('import-questions', async (event, newQuestions) => {
        let currentDB = [];
        if (fs.existsSync(QUESTIONS_PATH)) {
            currentDB = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf-8'));
        }
        // Simple deduplication based on Question Text could be added here
        const updatedDB = [...currentDB, ...newQuestions];
        fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(updatedDB, null, 2));
        return updatedDB.length;
    });

    // Get logs for dashboard analytics
    ipcMain.handle('get-logs', async () => {
        if (!fs.existsSync(LOGS_PATH)) return [];
        return JSON.parse(fs.readFileSync(LOGS_PATH, 'utf-8'));
    });

    // 5. Window Controls
    ipcMain.on('minimize-window', () => mainWindow.minimize());
    ipcMain.on('close-window', () => app.quit());
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
