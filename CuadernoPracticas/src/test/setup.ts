/**
 * Test setup file
 * Runs before each test file to configure the testing environment
 */

import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock URL.createObjectURL and URL.revokeObjectURL
Object.defineProperty(URL, "createObjectURL", {
  value: vi.fn(() => "mock-object-url"),
});

Object.defineProperty(URL, "revokeObjectURL", {
  value: vi.fn(),
});

// Mock Blob constructor
global.Blob = class MockBlob extends Blob {
  constructor(parts?: BlobPart[], options?: BlobPropertyBag) {
    super(parts, options);
  }
} as any;

// Mock FileReader
class MockFileReader {
  result: string | ArrayBuffer | null = null;
  onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
  onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;

  readAsText(blob: Blob) {
    // Simulate async file reading
    setTimeout(() => {
      if (this.onload) {
        this.result = "mock file content";
        this.onload({ target: this } as any);
      }
    }, 0);
  }
}

Object.defineProperty(window, "FileReader", {
  value: MockFileReader,
});

// Mock HTMLCanvasElement methods for signature canvas
HTMLCanvasElement.prototype.getContext = vi.fn(() => {
  return {
    fillStyle: "",
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn(() => ({
      data: new Uint8ClampedArray(4),
    })),
    putImageData: vi.fn(),
    createImageData: vi.fn(),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
    transform: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn(),
  } as any;
});

HTMLCanvasElement.prototype.toDataURL = vi.fn(() => "data:image/png;base64,mock");
