import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2 } from 'lucide-react';
export default function App() {
    const [url, setUrl] = useState('');
    const [timestamps, setTimestamps] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // Handles input change for the YouTube URL field
    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };
    // Submits the YouTube URL to the API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTimestamps(''); // Clear previous timestamps on new submission
        try {
            const response = await fetch('https://yt-back-five.vercel.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoUrl: url }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate timestamps');
            }
            setTimestamps(data.timestamps);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    // Downloads the generated timestamps as a text file
    const handleDownload = () => {
        const blob = new Blob([timestamps], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'timestamps.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    return (_jsx("div", { className: "container mx-auto p-4 max-w-2xl", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: _jsx("div", { className: "font-bold mb-6 text-xl", children: "YouTube Timestamp Generator" }) }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "url", value: url, onChange: handleInputChange, placeholder: "Paste YouTube URL here", required: true, className: "flex-1 px-2 py-1 border border-gray-600 shadow-sm rounded-md focus:outline-none focus:ring" }), _jsx("button", { className: 'text-white bg-black px-2 py-1 border-gray-400 rounded-md shadow-sm hover:shadow-lg ', type: "submit", disabled: loading || !url.trim(), children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Generating"] })) : ('Generate') })] }), error && _jsx("div", { className: "text-red-500 text-sm", children: error }), timestamps ? (_jsxs("div", { className: "space-y-4", children: [_jsx("pre", { className: "bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm", children: timestamps }), _jsx("button", { className: 'text-white bg-black px-2 py-1 border-gray-400 rounded-md shadow-sm hover:shadow-lg ', onClick: handleDownload, children: "Download Timestamps" })] })) : (!loading && (_jsx("div", { className: "text-gray-500 text-sm", children: "Enter a YouTube URL and click \"Generate\" to create timestamps." })))] }) })] }) }));
}
