export interface IElectronAPI {
    readJSON: (filePath: string) => Promise<any>;
    writeJSON: (filePath: string, data: any) => Promise<{ success: boolean }>;
    appendQuizLog: (logEntry: any) => Promise<{ success: boolean }>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}
