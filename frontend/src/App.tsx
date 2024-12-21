import React, { useState, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState<string>('');
  const [timestamps, setTimestamps] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimestamps(''); 

    try {
      // const response = await fetch('https://youtube-timestamp-generator-production.up.railway.app/api/generate-timestamps', {
      const response = await fetch('http://localhost:3000/api/generate-summary', {
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

      setTimestamps(data.summary);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (): void => {
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

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className='w-full'>
            <div className="font-bold mb-6 text-xl w-full text-center ">YouTube Timestamp Generator</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 px-2 ">
            <div className="flex gap-2 flex-wrap">
              <input
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="Paste YouTube URL here"
                required
                className="flex-1 min-w-12 px-2 py-1 border border-gray-600 shadow-sm rounded-md focus:outline-none focus:ring"
              />
              <button className='text-white bg-black px-2 py-1 border-gray-400 rounded-md shadow-sm hover:shadow-lg ' type="submit" disabled={loading || !url.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    
                  </>
                ) : (
                  'Generate'
                )}
              </button>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {timestamps ? (
              <div className="space-y-4">
                <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
                  {timestamps}
                </pre>
                <button className='text-white bg-black px-2 py-1 border-gray-400 rounded-md shadow-sm hover:shadow-lg ' onClick={handleDownload}>Download Timestamps</button>
              </div>
            ) : (
              !loading && (
                <div className="text-gray-500 text-sm">
                  Enter a YouTube URL and click "Generate" to create timestamps.
                </div>
              )
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
