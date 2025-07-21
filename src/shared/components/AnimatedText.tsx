'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  words,
  interval = 2000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsTransitioning(false);
      }, 150); // Shorter transition time to reduce flicker
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className={`inline-block transition-all duration-300 ease-in-out ${className} ${
        isTransitioning
          ? 'opacity-70 transform scale-95'
          : 'opacity-100 transform scale-100'
      }`}
    >
      {words[currentIndex]}
    </span>
  );
};

export default AnimatedText;
