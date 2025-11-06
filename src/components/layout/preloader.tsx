'use client';

import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000); // Start fade-out after 2s

    const hideTimer = setTimeout(() => {
        setIsHidden(true);
    }, 3000); // Completely hide after 3s (2s wait + 1s fade)

    return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
    };

  }, []);

  if (!isMounted || isHidden) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000',
        isFadingOut ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  );
}
