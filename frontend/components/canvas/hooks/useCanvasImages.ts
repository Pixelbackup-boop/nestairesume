'use client';

import { useState, useEffect } from 'react';
import { AnyCanvasElement, ImageElement, ShapeElement } from '@/store/useCanvasStore';

/**
 * Custom hook for loading and caching images used in canvas elements
 */
export function useCanvasImages(elements: AnyCanvasElement[]) {
  const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});
  const [loadedShapeImages, setLoadedShapeImages] = useState<Record<string, HTMLImageElement>>({});

  // Load images for ImageElements
  useEffect(() => {
    const imageElements = elements.filter(
      (el): el is ImageElement => el.type === 'image' && !!el.src
    );

    imageElements.forEach((el) => {
      if (!loadedImages[el.id] && el.src) {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [el.id]: img }));
        };
        img.src = el.src;
      }
    });
  }, [elements, loadedImages]);

  // Load images for ShapeElements with imageSrc
  useEffect(() => {
    const shapeElements = elements.filter(
      (el): el is ShapeElement => el.type === 'shape' && !!el.imageSrc
    );

    shapeElements.forEach((el) => {
      if (!loadedShapeImages[el.id] && el.imageSrc) {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setLoadedShapeImages((prev) => ({ ...prev, [el.id]: img }));
        };
        img.src = el.imageSrc;
      }
    });
  }, [elements, loadedShapeImages]);

  return { loadedImages, loadedShapeImages };
}
