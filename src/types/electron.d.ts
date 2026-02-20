export interface IElectronAPI {
    loadConfig: () => Promise<any>;
    loadQuestions: () => Promise<any>;
    saveAttempt: (logData: any) => Promise<boolean>;
    importQuestions: (jsonData: any) => Promise<number>;
    minimize: () => void;
    close: () => void;
}

declare global {
    interface Window {
        api: IElectronAPI;
    }
}
