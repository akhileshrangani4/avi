'use client';

import { cn } from 'lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export interface PhotoGridSectionProps {
  photos?: Photo[];
  className?: string;
  columns?: number;
}

export function PhotoGridSection({
  photos = [],
  className,
  columns = 3,
}: PhotoGridSectionProps) {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const gridColsClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    }[columns] || 'grid-cols-3';

  const validPhotos = photos.filter(
    photo => photo.src.trim() !== '' && photo.alt.trim() !== ''
  );

  if (validPhotos.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        `grid ${gridColsClass} gap-3 mb-12 animate-enter animate-enter-3`,
        className
      )}
    >
      {validPhotos.map((photo, index) => (
        <div key={index} className="relative group">
          {!failedImages.has(index) ? (
            <Image
              alt={photo.alt}
              src={photo.src}
              className="rounded-lg object-cover w-full aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-500 ease-out"
              width={400}
              height={300}
              onError={() =>
                setFailedImages(prev => new Set(prev).add(index))
              }
            />
          ) : (
            <div className="w-full aspect-[4/3] bg-neutral-50 dark:bg-neutral-900 rounded-lg" />
          )}
          {photo.caption && (
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
              {photo.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
