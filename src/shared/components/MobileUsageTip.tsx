import React, { useState, useEffect } from 'react';
import { useWindowSize } from '@/shared';

const MobileUsageTip: React.FC = () => {
  const { isMobile } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side after mount
    setIsClient(true);

    // Check if user has dismissed the tip before
    const dismissed = localStorage.getItem('mobile-tip-dismissed');
    if (dismissed) {
      setHasBeenDismissed(true);
      return;
    }

    // Show tip after a short delay on mobile
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasBeenDismissed(true);
    localStorage.setItem('mobile-tip-dismissed', 'true');
  };

  // Don't render anything during SSR or if conditions aren't met
  if (!isClient || !isMobile || !isVisible || hasBeenDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-blue-600 text-white p-3 rounded-lg shadow-lg flex items-start space-x-3">
        <div className="flex-1">
          <div className="text-sm font-medium mb-1">💡 Tip for Mobile</div>
          <div className="text-xs opacity-90">
            Tap section headers to collapse/expand content. This helps save
            screen space!
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white hover:text-blue-200 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileUsageTip;
