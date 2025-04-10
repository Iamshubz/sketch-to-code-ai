
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

const ImageUploader = ({ onImageUpload, className }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const file = acceptedFiles[0];
      onImageUpload(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeImage = () => {
    setPreview(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-10 transition-all cursor-pointer backdrop-blur-sm",
            isDragActive 
              ? "border-brand-blue bg-blue-50/50 shadow-lg scale-102 transform duration-200" 
              : "border-gray-300 hover:border-brand-blue hover:bg-blue-50/30",
            "flex flex-col items-center justify-center text-center"
          )}
        >
          <input {...getInputProps()} />
          <div className={cn(
            "relative mb-6 flex items-center justify-center",
            isDragActive ? "animate-bounce" : ""
          )}>
            <div className="absolute inset-0 bg-blue-100 rounded-full opacity-30 scale-150 animate-pulse-slow"></div>
            <Upload className="h-12 w-12 text-brand-blue relative" />
          </div>
          <p className="mb-2 text-xl font-medium text-gray-700">
            {isDragActive ? "Drop it here!" : "Drag & drop your sketch here"}
          </p>
          <p className="mb-4 text-sm text-gray-500">
            or click to browse files (PNG, JPG)
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" className="group relative overflow-hidden font-medium bg-white">
              <span className="absolute top-0 left-0 w-0 h-full bg-brand-blue opacity-20 transition-all duration-300 group-hover:w-full"></span>
              <FileUp className="h-4 w-4 mr-2" />
              Select Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border-2 border-brand-blue/20 shadow-lg group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            src={preview}
            alt="Uploaded sketch"
            className="w-full h-auto object-contain"
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 shadow-lg opacity-80 hover:opacity-100"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center text-white">
              <Image className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Your sketch is ready for processing</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
