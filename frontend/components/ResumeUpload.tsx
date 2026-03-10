'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import {
  parseResumeFile,
  validateFile,
  formatFileSize,
  ParseResult,
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE,
} from '@/lib/resumeImportService';

export type UploadStatus = 'idle' | 'validating' | 'uploading' | 'parsing' | 'success' | 'error';

interface ResumeUploadProps {
  onSuccess: (result: ParseResult) => void;
  onError?: (error: string) => void;
  locale?: string;
  className?: string;
}

export default function ResumeUpload({
  onSuccess,
  onError,
  locale = 'en',
  className = '',
}: ResumeUploadProps) {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    setStatus('idle');
    setError(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const processFile = useCallback(async (file: File) => {
    // Validate
    setStatus('validating');
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      setStatus('error');
      onError?.(validation.error || 'Invalid file');
      return;
    }

    setSelectedFile(file);
    setStatus('uploading');

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    setStatus('parsing');

    // Parse the resume
    const result = await parseResumeFile(file, locale);

    if (result.success) {
      setStatus('success');
      onSuccess(result);
    } else {
      setError(result.error || 'Failed to parse resume');
      setStatus('error');
      onError?.(result.error || 'Failed to parse resume');
    }
  }, [locale, onSuccess, onError]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    if (status === 'idle' || status === 'error') {
      fileInputRef.current?.click();
    }
  }, [status]);

  // Status messages
  const statusMessages: Record<UploadStatus, string> = {
    idle: 'Drag and drop your resume here',
    validating: 'Validating file...',
    uploading: 'Uploading...',
    parsing: 'AI is analyzing your resume...',
    success: 'Resume imported successfully!',
    error: error || 'Something went wrong',
  };

  const isProcessing = ['validating', 'uploading', 'parsing'].includes(status);

  return (
    <div className={className}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_EXTENSIONS.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Drop zone */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200
          ${isDragOver
            ? 'border-accent-green bg-accent-green/10'
            : status === 'error'
            ? 'border-red-500/50 bg-red-500/5'
            : status === 'success'
            ? 'border-accent-green bg-accent-green/5'
            : 'border-gray-300 bg-gray-50 hover:border-gray-300 hover:bg-white'
          }
          ${isProcessing ? 'cursor-wait' : 'cursor-pointer'}
        `}
      >
        {/* Icon */}
        <div className="mb-4">
          {status === 'idle' && (
            <div className={`
              w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-colors
              ${isDragOver ? 'bg-accent-green/20' : 'bg-gray-100'}
            `}>
              <Upload className={isDragOver ? 'text-accent-green' : 'text-gray-500'} size={32} />
            </div>
          )}

          {isProcessing && (
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-green/20 flex items-center justify-center">
              <Loader2 className="text-accent-green animate-spin" size={32} />
            </div>
          )}

          {status === 'success' && (
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-green/20 flex items-center justify-center">
              <CheckCircle className="text-accent-green" size={32} />
            </div>
          )}

          {status === 'error' && (
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="text-red-400" size={32} />
            </div>
          )}
        </div>

        {/* Status text */}
        <p className={`
          text-lg font-medium mb-2
          ${status === 'error' ? 'text-red-400' : status === 'success' ? 'text-accent-green' : 'text-gray-700'}
        `}>
          {statusMessages[status]}
        </p>

        {/* Selected file info */}
        {selectedFile && status !== 'idle' && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-3">
            <FileText size={16} />
            <span>{selectedFile.name}</span>
            <span className="text-gray-400">({formatFileSize(selectedFile.size)})</span>
          </div>
        )}

        {/* Instructions */}
        {(status === 'idle' || status === 'error') && (
          <>
            <p className="text-gray-500 text-sm mb-4">
              or <span className="text-accent-green hover:underline">browse files</span>
            </p>
            <p className="text-gray-400 text-xs">
              PDF or DOCX (max {formatFileSize(MAX_FILE_SIZE)})
            </p>
          </>
        )}

        {/* Retry button for errors */}
        {status === 'error' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetState();
            }}
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-lg transition-colors"
          >
            Try Again
          </button>
        )}
      </div>

      {/* Processing steps */}
      {isProcessing && (
        <div className="mt-4 flex justify-center gap-2">
          {['validating', 'uploading', 'parsing'].map((step, index) => {
            const steps = ['validating', 'uploading', 'parsing'];
            const currentIndex = steps.indexOf(status);
            const isComplete = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div
                key={step}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${isComplete || isCurrent ? 'bg-accent-green' : 'bg-gray-200'}
                  ${isCurrent ? 'animate-pulse' : ''}
                `}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
