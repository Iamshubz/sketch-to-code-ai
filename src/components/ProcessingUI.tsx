
import { Loader, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProcessingUIProps {
  status: 'idle' | 'analyzing' | 'generating' | 'complete' | 'error';
  message?: string;
}

const ProcessingUI = ({ status, message }: ProcessingUIProps) => {
  if (status === 'idle') return null;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          {status === 'error' ? (
            <div className="text-red-500 text-lg font-medium">
              Error: {message || 'Something went wrong. Please try again.'}
            </div>
          ) : (
            <>
              <div className="relative">
                <div className="animate-spin-slow">
                  <Cpu size={48} className="text-brand-blue" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader size={24} className="animate-spin text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">
                  {status === 'analyzing' && 'Analyzing your sketch...'}
                  {status === 'generating' && 'Generating code...'}
                  {status === 'complete' && 'Processing complete!'}
                </p>
                <p className="text-sm text-gray-500 mt-1 animate-pulse-slow">
                  {message || 'Please wait while we process your request.'}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingUI;
