
import { useState } from 'react';
import { Cpu, Code, ScreenShare, Share2, Download } from 'lucide-react';
import { toast } from 'sonner';

import ImageUploader from '@/components/ImageUploader';
import CodeDisplay from '@/components/CodeDisplay';
import PreviewDisplay from '@/components/PreviewDisplay';
import ProcessingUI from '@/components/ProcessingUI';
import ConfigOptions from '@/components/ConfigOptions';

import { processSketch } from '@/services/sketchService';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'analyzing' | 'generating' | 'complete' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  
  // Configuration options
  const [framework, setFramework] = useState<string>('react');
  const [cssFramework, setCssFramework] = useState<string>('tailwind');
  const [responsiveMode, setResponsiveMode] = useState<boolean>(true);
  const [complexity, setComplexity] = useState<string>('simple');

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    
    // Generate preview for display
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset any previous code
    setProcessingStatus('idle');
    setGeneratedCode('');
  };

  const handleProcessSketch = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      // Start analysis
      setProcessingStatus('analyzing');
      setStatusMessage('Analyzing components in your sketch...');

      // Wait for the AI to analyze the sketch
      const analysisStep = setTimeout(() => {
        setStatusMessage('Identifying UI components and layout');
      }, 2000);

      // After AI analysis, start code generation
      const generationStep = setTimeout(() => {
        setProcessingStatus('generating');
        setStatusMessage('Generating responsive code based on detected components');
      }, 4000);

      // Process the sketch
      const result = await processSketch(uploadedImage, {
        framework,
        cssFramework,
        complexity,
        responsive: responsiveMode
      });

      // Clear the timeouts in case the API responds quickly
      clearTimeout(analysisStep);
      clearTimeout(generationStep);

      if (result.success) {
        setGeneratedCode(result.code);
        setProcessingStatus('complete');
        setStatusMessage('Code generation complete!');
        toast.success('UI code successfully generated!');
      } else {
        setProcessingStatus('error');
        setStatusMessage(result.error || 'An unknown error occurred');
        toast.error('Failed to generate code. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setProcessingStatus('error');
      setStatusMessage('An unexpected error occurred. Please try again.');
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleDownloadCode = () => {
    if (!generatedCode) {
      toast.error('No code to download');
      return;
    }

    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-ui.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Code downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Cpu className="h-8 w-8 text-brand-blue" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">SketchCraft</h1>
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">BETA</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                onClick={() => toast.info('Sharing coming soon!')}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <a 
                href="https://github.com/your-repo/sketchcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-brand-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              >
                <Code className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Turn your sketches into code
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Upload a wireframe sketch or UI mockup, and our AI will transform it into React components.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Upload and config */}
          <div className="lg:col-span-1 space-y-6">
            <ImageUploader onImageUpload={handleImageUpload} />
            
            <ConfigOptions 
              framework={framework}
              setFramework={setFramework}
              cssFramework={cssFramework}
              setCssFramework={setCssFramework}
              responsiveMode={responsiveMode}
              setResponsiveMode={setResponsiveMode}
              complexity={complexity}
              setComplexity={setComplexity}
            />

            <div className="flex flex-col space-y-4">
              <button
                onClick={handleProcessSketch}
                disabled={!uploadedImage || processingStatus === 'analyzing' || processingStatus === 'generating'}
                className={`w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue
                  ${(!uploadedImage || processingStatus === 'analyzing' || processingStatus === 'generating') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Cpu className="mr-2 h-5 w-5" />
                Generate Code
              </button>

              {generatedCode && (
                <button
                  onClick={handleDownloadCode}
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Code
                </button>
              )}
            </div>
            
            {(processingStatus === 'analyzing' || processingStatus === 'generating' || processingStatus === 'error') && (
              <ProcessingUI status={processingStatus} message={statusMessage} />
            )}
          </div>

          {/* Right column - Preview and code */}
          <div className="lg:col-span-2 space-y-6">
            {uploadedImage && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
                <PreviewDisplay code={generatedCode} originalImage={imagePreview || undefined} />
                {generatedCode ? (
                  <CodeDisplay code={generatedCode} />
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg flex items-center justify-center p-6">
                    <div className="text-center">
                      <ScreenShare className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Code will appear here</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Click "Generate Code" to convert your sketch to React components
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!uploadedImage && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-10">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How It Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-brand-blue mb-3">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-md font-medium text-gray-900">1. Upload</h3>
                      <p className="mt-2 text-sm text-gray-500 text-center">Upload your hand-drawn sketch or UI mockup</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-brand-blue mb-3">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-md font-medium text-gray-900">2. AI Processing</h3>
                      <p className="mt-2 text-sm text-gray-500 text-center">Our AI detects components and layout in your design</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-brand-blue mb-3">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-md font-medium text-gray-900">3. Code Generation</h3>
                      <p className="mt-2 text-sm text-gray-500 text-center">Get clean, responsive code ready to use in your project</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            SketchCraft &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
