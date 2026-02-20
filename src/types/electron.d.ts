export interface IElectronAPI {
    loadConfig: () => Promise<any>;
    loadQuestions: () => Promise<any>;
    saveAttempt: (logData: any) => Promise<boolean>;
    importQuestions: (jsonData: any) => Promise<number>;
    getLogs: () => Promise<any[]>;
    minimize: () => void;
    close: () => void;
}

declare global {
    interface Window {
        api: IElectronAPI;
    }
}
