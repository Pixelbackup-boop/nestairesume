/**
 * Canvas Utility Functions
 */

import { SNAP_THRESHOLD } from './constants';
import { AnyCanvasElement } from '@/store/useCanvasStore';

/**
 * Calculate image scale for 'cover' fit (like CSS object-fit: cover)
 */
export const calculateCoverScale = (
  imgWidth: number,
  imgHeight: number,
  containerWidth: number,
  containerHeight: number
): { scaleX: number; scaleY: number; offsetX: number; offsetY: number } => {
  const imgRatio = imgWidth / imgHeight;
  const containerRatio = containerWidth / containerHeight;

  let scale: number;
  if (imgRatio > containerRatio) {
    // Image is wider - fit by height
    scale = containerHeight / imgHeight;
  } else {
    // Image is taller - fit by width
    scale = containerWidth / imgWidth;
  }

  const scaledWidth = imgWidth * scale;
  const scaledHeight = imgHeight * scale;

  return {
    scaleX: scale,
    scaleY: scale,
    offsetX: (scaledWidth - containerWidth) / 2 / scale,
    offsetY: (scaledHeight - containerHeight) / 2 / scale,
  };
};

export interface SnapLine {
  points: number[];
  orientation: 'H' | 'V';
}

export interface NodeBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculate snap guides during element drag
 */
export function calculateSnapGuides(
  nodeBox: NodeBox,
  elements: AnyCanvasElement[],
  currentElementId: string,
  canvasWidth: number,
  canvasHeight: number
): { guides: SnapLine[]; snappedX: number; snappedY: number } {
  const guides: SnapLine[] = [];
  let snappedX = nodeBox.x;
  let snappedY = nodeBox.y;

  // Canvas edges and center
  const canvasGuides = {
    vertical: [0, canvasWidth / 2, canvasWidth],
    horizontal: [0, canvasHeight / 2, canvasHeight],
  };

  // Add other elements' edges
  elements.forEach((el) => {
    if (el.id === currentElementId) return;
    canvasGuides.vertical.push(el.x, el.x + el.width / 2, el.x + el.width);
    canvasGuides.horizontal.push(el.y, el.y + el.height / 2, el.y + el.height);
  });

  // Check vertical snaps (x-axis)
  const nodeEdgesX = [nodeBox.x, nodeBox.x + nodeBox.width / 2, nodeBox.x + nodeBox.width];
  for (const guideX of canvasGuides.vertical) {
    for (let i = 0; i < nodeEdgesX.length; i++) {
      const diff = guideX - nodeEdgesX[i];
      if (Math.abs(diff) < SNAP_THRESHOLD) {
        snappedX = nodeBox.x + diff;
        guides.push({
          points: [guideX, 0, guideX, canvasHeight],
          orientation: 'V',
        });
        break;
      }
    }
  }

  // Check horizontal snaps (y-axis)
  const nodeEdgesY = [nodeBox.y, nodeBox.y + nodeBox.height / 2, nodeBox.y + nodeBox.height];
  for (const guideY of canvasGuides.horizontal) {
    for (let i = 0; i < nodeEdgesY.length; i++) {
      const diff = guideY - nodeEdgesY[i];
      if (Math.abs(diff) < SNAP_THRESHOLD) {
        snappedY = nodeBox.y + diff;
        guides.push({
          points: [0, guideY, canvasWidth, guideY],
          orientation: 'H',
        });
        break;
      }
    }
  }

  return { guides, snappedX, snappedY };
}
