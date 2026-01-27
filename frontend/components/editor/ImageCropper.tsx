'use client';

import { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Check, RotateCcw, Circle, Square, RectangleHorizontal } from 'lucide-react';

export type ImageShape = 'circle' | 'rounded' | 'square';

interface ImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedImage: string, shape: ImageShape) => void;
    onCancel: () => void;
    initialShape?: ImageShape;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel, initialShape = 'circle' }: ImageCropperProps) {
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [selectedShape, setSelectedShape] = useState<ImageShape>(initialShape);
    const imgRef = useRef<HTMLImageElement>(null);

    const shapes: { id: ImageShape; label: string; icon: typeof Circle }[] = [
        { id: 'circle', label: 'Circle', icon: Circle },
        { id: 'rounded', label: 'Rounded', icon: RectangleHorizontal },
        { id: 'square', label: 'Square', icon: Square },
    ];

    const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, 1));
    }, []);

    const getCroppedImg = useCallback(async (): Promise<string> => {
        if (!imgRef.current || !completedCrop) {
            return imageSrc;
        }

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const pixelRatio = window.devicePixelRatio;
        const outputSize = 400; // Fixed output size for consistency

        canvas.width = outputSize * pixelRatio;
        canvas.height = outputSize * pixelRatio;

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = 'high';

        const cropX = completedCrop.x * scaleX;
        const cropY = completedCrop.y * scaleY;
        const cropWidth = completedCrop.width * scaleX;
        const cropHeight = completedCrop.height * scaleY;

        ctx.drawImage(
            image,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            outputSize,
            outputSize,
        );

        return canvas.toDataURL('image/jpeg', 0.9);
    }, [completedCrop, imageSrc]);

    const handleConfirm = async () => {
        try {
            const croppedImage = await getCroppedImg();
            onCropComplete(croppedImage, selectedShape);
        } catch (e) {
            console.error('Error cropping image:', e);
        }
    };

    const handleReset = () => {
        if (imgRef.current) {
            const { width, height } = imgRef.current;
            setCrop(centerAspectCrop(width, height, 1));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-bg-card border border-border-subtle rounded-2xl max-w-2xl w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border-subtle">
                    <h3 className="text-lg font-semibold text-gray-900">Crop & Style Photo</h3>
                    <button
                        onClick={onCancel}
                        className="p-2 text-gray-400 hover:text-gray-900 transition rounded-lg hover:bg-white/5"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cropper */}
                <div className="p-6">
                    <div className="flex justify-center mb-6 bg-black/20 rounded-xl p-4">
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={1}
                            circularCrop={selectedShape === 'circle'}
                            className="max-h-[400px]"
                        >
                            <img
                                ref={imgRef}
                                src={imageSrc}
                                alt="Crop preview"
                                onLoad={onImageLoad}
                                className="max-h-[400px] object-contain"
                                crossOrigin="anonymous"
                            />
                        </ReactCrop>
                    </div>

                    {/* Shape Selection */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 mb-3 block">Photo Shape</label>
                        <div className="flex gap-3">
                            {shapes.map((shape) => (
                                <button
                                    key={shape.id}
                                    onClick={() => setSelectedShape(shape.id)}
                                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition ${
                                        selectedShape === shape.id
                                            ? 'border-accent-green bg-accent-green/10 text-accent-green'
                                            : 'border-border-subtle text-gray-400 hover:border-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <shape.icon size={24} />
                                    <span className="text-sm font-medium">{shape.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview of shapes */}
                    <div className="flex items-center justify-center gap-6 mb-6 p-4 bg-white/5 rounded-xl">
                        <div className="text-center">
                            <div
                                className={`w-16 h-16 bg-gradient-to-br from-accent-green to-accent-teal mb-2 mx-auto ${
                                    selectedShape === 'circle' ? 'rounded-full' :
                                    selectedShape === 'rounded' ? 'rounded-xl' : 'rounded-none'
                                }`}
                            />
                            <span className="text-xs text-gray-400">Preview</span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between p-4 border-t border-border-subtle bg-bg-card-light">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-900 transition"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="px-6 py-2 text-gray-700 hover:text-gray-900 transition rounded-lg border border-border-subtle hover:border-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex items-center gap-2 px-6 py-2 bg-accent-green text-bg-primary rounded-lg font-semibold hover:bg-accent-teal transition"
                        >
                            <Check size={16} />
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
