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
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSpinning(true);

      // Simulate gambling wheel effect with multiple rapid changes
      const spinDuration = 800; // Total spin duration
      const spinInterval = 50; // How fast to cycle through words during spin
      const totalSpins = spinDuration / spinInterval;

      let spinCounter = 0;
      const spinTimer = setInterval(() => {
        spinCounter++;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);

        if (spinCounter >= totalSpins) {
          clearInterval(spinTimer);
          setIsSpinning(false);
        }
      }, spinInterval);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  // Calculate the maximum width needed for all words
  const maxWidth = Math.max(...words.map((word) => word.length));

  return (
    <span
      className={`inline-block transition-all duration-300 ease-in-out ${className} ${
        isSpinning ? 'animate-spin' : 'transform-none'
      }`}
      style={{
        minWidth: `${maxWidth * 0.6}em`, // Approximate character width
        textAlign: 'center', // Center the text within the container
        display: 'inline-block',
      }}
    >
      {words[currentIndex]}
    </span>
  );
};

export default AnimatedText;
