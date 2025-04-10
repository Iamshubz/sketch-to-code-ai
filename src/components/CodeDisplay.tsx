
import { useState } from 'react';
import { Check, Clipboard, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface CodeDisplayProps {
  code: string;
  htmlCode?: string;
  cssCode?: string;
}

const CodeDisplay = ({ code, htmlCode, cssCode }: CodeDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy code');
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center">
          <Code className="mr-2 h-5 w-5" />
          Generated Code
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(code)}
          className="flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="react" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="react">React</TabsTrigger>
            <TabsTrigger value="html" disabled={!htmlCode}>HTML</TabsTrigger>
            <TabsTrigger value="css" disabled={!cssCode}>CSS</TabsTrigger>
          </TabsList>
          <TabsContent value="react" className="mt-0">
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[500px] text-sm">
              <code>{code}</code>
            </pre>
          </TabsContent>
          <TabsContent value="html" className="mt-0">
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[500px] text-sm">
              <code>{htmlCode || "No HTML code available"}</code>
            </pre>
          </TabsContent>
          <TabsContent value="css" className="mt-0">
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[500px] text-sm">
              <code>{cssCode || "No CSS code available"}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodeDisplay;
