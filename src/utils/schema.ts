export const EXAM_SECTIONS = [
    "English Language",
    "Reasoning",
    "General Knowledge",
    "Computer Basics"
];

// Simple validation function to check if imported JSON is safe
export const validateQuestionBank = (data: any) => {
    if (!Array.isArray(data)) return { valid: false, error: "Root must be an array." };

    const requiredKeys = ["question", "options", "answer", "subject"];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        // Check keys
        for (let key of requiredKeys) {
            if (!item.hasOwnProperty(key)) {
                return { valid: false, error: `Item ${i + 1} missing '${key}' field.` };
            }
        }
        // Check options array
        if (!Array.isArray(item.options) || item.options.length < 2) {
            return { valid: false, error: `Item ${i + 1} options must be an array of at least 2.` };
        }
        // Check answer existence
        if (!item.options.includes(item.answer)) {
            return { valid: false, error: `Item ${i + 1}: Answer not found in options.` };
        }
    }

    return { valid: true };
};
