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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsVisible(true);
      }, 300); // Half of the transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className={`inline-block transition-all duration-600 ease-in-out ${className} ${
        isVisible
          ? 'opacity-100 transform translate-y-0'
          : 'opacity-0 transform -translate-y-2'
      }`}
    >
      {words[currentIndex]}
    </span>
  );
};

export default AnimatedText;
