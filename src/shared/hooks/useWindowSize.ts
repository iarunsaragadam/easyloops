import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

export const useWindowSize = (): WindowSize => {
  // Use consistent initial values to prevent hydration mismatch
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 1024, // Default desktop width
    height: 768, // Default desktop height
    isMobile: false, // Default to desktop
  });

  // Track if we're on the client to prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side after mount
    setIsClient(true);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Return consistent values during SSR, actual values after hydration
  if (!isClient) {
    return {
      width: 1024,
      height: 768,
      isMobile: false,
    };
  }

  return windowSize;
};
