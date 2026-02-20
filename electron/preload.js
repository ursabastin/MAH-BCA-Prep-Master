const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // 1. Load User Config (Theme, Name)
    loadConfig: () => ipcRenderer.invoke('load-config'),

    // 2. Load Question Bank
    loadQuestions: () => ipcRenderer.invoke('load-questions'),

    // 3. Save Quiz Result
    saveAttempt: (logData) => ipcRenderer.invoke('save-attempt', logData),

    // 4. Import New Questions (Raw JSON content)
    importQuestions: (jsonData) => ipcRenderer.invoke('import-questions', jsonData),

    // Get all analytics/logs
    getLogs: () => ipcRenderer.invoke('get-logs'),

    // 5. App Window Controls
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window')
});
