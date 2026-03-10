'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const ZOOM_STEP = 0.25;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

export function ResumeViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(el);
    setContainerWidth(el.clientWidth);

    return () => observer.disconnect();
  }, []);

  const zoomIn = useCallback(
    () => setScale((s) => Math.min(s + ZOOM_STEP, MAX_ZOOM)),
    []
  );
  const zoomOut = useCallback(
    () => setScale((s) => Math.max(s - ZOOM_STEP, MIN_ZOOM)),
    []
  );
  const resetZoom = useCallback(() => setScale(1), []);

  const isZoomed = scale > 1;
  const pageWidth = containerWidth * scale;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isZoomed) return;
      const el = containerRef.current;
      if (!el) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setScrollStart({ x: el.scrollLeft, y: el.scrollTop });
      el.setPointerCapture(e.pointerId);
    },
    [isZoomed]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const el = containerRef.current;
      if (!el) return;
      el.scrollLeft = scrollStart.x - (e.clientX - dragStart.x);
      el.scrollTop = scrollStart.y - (e.clientY - dragStart.y);
    },
    [isDragging, dragStart, scrollStart]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
          {numPages > 0 ? `${numPages} page${numPages > 1 ? 's' : ''}` : ''}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={scale <= MIN_ZOOM}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Zoom out"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button
            onClick={resetZoom}
            className="text-xs text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 tabular-nums min-w-[3rem] text-center"
            aria-label="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={zoomIn}
            disabled={scale >= MAX_ZOOM}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Zoom in"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="overflow-auto"
        style={{
          maxHeight: '80vh',
          cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: isDragging ? 'none' : 'auto',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Document
          file="/resume.pdf"
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="flex items-center justify-center py-20">
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                loading resume...
              </p>
            </div>
          }
        >
          {containerWidth > 0 &&
            Array.from({ length: numPages }, (_, i) => (
              <Page
                key={i + 1}
                pageNumber={i + 1}
                width={pageWidth}
              />
            ))}
        </Document>
      </div>
    </div>
  );
}
