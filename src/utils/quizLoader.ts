export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    category?: string;
}

export interface QuizResult {
    score: number;
    total: number;
    date: string;
    category: string;
}

export const loadQuestionBank = async (): Promise<Question[]> => {
    try {
        // @ts-ignore - electronAPI is injected via preload
        return await window.electronAPI.readJSON('local_data/question_bank.json');
    } catch (error) {
        console.error('Failed to load question bank:', error);
        return [];
    }
};

export const saveQuizLog = async (result: QuizResult) => {
    try {
        // @ts-ignore
        await window.electronAPI.appendQuizLog(result);
    } catch (error) {
        console.error('Failed to save quiz log:', error);
    }
};
