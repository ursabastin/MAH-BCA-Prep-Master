import React, { useState, ChangeEvent } from 'react';
import { Upload, FileJson, AlertCircle, Check } from 'lucide-react';
import { validateQuestionBank } from '../utils/schema';

interface ImportWidgetProps {
    onImportSuccess?: () => void;
}

const ImportWidget: React.FC<ImportWidgetProps> = ({ onImportSuccess }) => {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;
        const file = fileList[0];

        setStatus('processing');
        setMessage('Reading file...');

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const result = event.target?.result as string;
                const json = JSON.parse(result);

                // 1. Validate Schema
                const validation = validateQuestionBank(json);
                if (!validation.valid) {
                    throw new Error(validation.error);
                }

                // 2. Send to Electron Backend
                const count = await window.api.importQuestions(json);

                setStatus('success');
                setMessage(`Successfully imported ${json.length} questions! Total Bank: ${count}`);
                if (onImportSuccess) onImportSuccess(); // Refresh parent

            } catch (err: any) {
                setStatus('error');
                setMessage(err.message || "Invalid JSON file");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileJson className="text-blue-400" />
                    Import Question Bank
                </h3>
                {status === 'success' && <Check className="text-emerald-400" />}
                {status === 'error' && <AlertCircle className="text-red-400" />}
            </div>

            <p className="text-sm text-slate-400 mb-4">
                Upload a JSON file exported from NotebookLM to expand your local database.
            </p>

            <div className="relative">
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:bg-slate-700/30 transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-slate-500 mb-2" />
                    <span className="text-sm text-slate-300">Click to upload JSON</span>
                </div>
            </div>

            {message && (
                <div className={`mt-4 text-sm p-3 rounded ${status === 'error' ? 'bg-red-900/30 text-red-200' :
                        status === 'success' ? 'bg-emerald-900/30 text-emerald-200' : 'text-blue-200'
                    }`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ImportWidget;
