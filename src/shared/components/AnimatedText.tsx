'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  words,
  interval = 3000,
  className = '',
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animationDuration = interval;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % animationDuration) / animationDuration;

      // Smooth continuous scrolling - one word height per cycle
      const wordHeight = 1.2; // em units
      const totalScroll = wordHeight * words.length;
      const currentScroll = progress * totalScroll;

      setScrollPosition(currentScroll);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [words.length, interval]);

  // Calculate the maximum width needed for all words
  const maxWidth = Math.max(...words.map((word) => word.length));

  // Create a continuous loop of words (3 sets for smooth infinite scrolling)
  const continuousWords = [...words, ...words, ...words];

  return (
    <span
      className={`inline-block overflow-hidden ${className}`}
      style={{
        minWidth: `${maxWidth * 0.6}em`,
        textAlign: 'center',
        display: 'inline-block',
        height: '1.2em',
        lineHeight: '1.2em',
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: `translateY(-${scrollPosition}em)`,
          transition: 'none', // No transition for smooth continuous motion
        }}
      >
        {continuousWords.map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="text-center"
            style={{
              height: '1.2em',
              lineHeight: '1.2em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </span>
  );
};

export default AnimatedText;
