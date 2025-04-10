
import { useState, useEffect } from 'react';
import { Eye, RotateCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PreviewDisplayProps {
  code: string;
  originalImage?: string;
}

const PreviewDisplay = ({ code, originalImage }: PreviewDisplayProps) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);

  // Create a combined HTML with React rendered inside
  const previewHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { 
          margin: 0;
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }
        #root {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">
        ${code}
        
        // Render the component
        const rootElement = document.getElementById('root');
        const root = ReactDOM.createRoot(rootElement);
        root.render(<App />);
      </script>
    </body>
    </html>
  `;

  const refreshPreview = () => {
    setRefreshKey(prev => prev + 1);
  };

  const toggleView = () => {
    setShowOriginal(!showOriginal);
  };

  useEffect(() => {
    refreshPreview();
  }, [code]);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          {showOriginal ? "Original Sketch" : "Preview"}
        </CardTitle>
        <div className="flex gap-2">
          {originalImage && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleView}
            >
              {showOriginal ? "Show Preview" : "Show Original"}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={refreshPreview}
            className="flex items-center gap-1"
          >
            <RotateCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-0 relative">
        {showOriginal && originalImage ? (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={originalImage} 
              alt="Original sketch" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <iframe
            key={refreshKey}
            srcDoc={previewHtml}
            title="Generated UI Preview"
            className="w-full h-full border-0 rounded-b-lg"
            sandbox="allow-scripts"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PreviewDisplay;
