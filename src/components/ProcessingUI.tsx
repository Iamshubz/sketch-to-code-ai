
import { Loader, Cpu, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProcessingUIProps {
  status: 'idle' | 'analyzing' | 'generating' | 'complete' | 'error';
  message?: string;
}

const ProcessingUI = ({ status, message }: ProcessingUIProps) => {
  if (status === 'idle') return null;

  return (
    <Card className="w-full overflow-hidden border border-brand-blue/20 shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          {status === 'error' ? (
            <div className="text-red-500 text-lg font-medium p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
                {message || 'Something went wrong. Please try again.'}
              </div>
            </div>
          ) : status === 'complete' ? (
            <div className="flex flex-col items-center">
              <div className="bg-green-50 rounded-full p-3 mb-2">
                <Zap size={36} className="text-green-500" />
              </div>
              <p className="text-lg font-medium text-green-700">Processing complete!</p>
              <p className="text-sm text-gray-500 mt-1">
                {message || 'Your code is ready to use.'}
              </p>
            </div>
          ) : (
            <>
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                  <Cpu size={52} className="text-brand-blue opacity-70" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 rounded-full p-1">
                    <Loader size={24} className="animate-spin text-brand-blue" />
                  </div>
                </div>
              </div>
              <div className="text-center max-w-xs mx-auto">
                <p className="text-lg font-medium bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                  {status === 'analyzing' && 'Analyzing your sketch...'}
                  {status === 'generating' && 'Generating code...'}
                </p>
                <p className="text-sm text-gray-500 mt-2 animate-pulse-slow">
                  {message || 'Please wait while we process your request.'}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4 overflow-hidden">
                  <div className="bg-brand-blue h-1.5 rounded-full animate-pulse-slow" style={{ width: status === 'analyzing' ? '40%' : '80%' }}></div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingUI;
