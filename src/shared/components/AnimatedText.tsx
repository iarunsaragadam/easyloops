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
    const pauseDuration = 2500; // 2.5 seconds pause at each word
    const scrollDuration = 1000; // 1 second to scroll between words
    const totalDuration = pauseDuration + scrollDuration;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const cycleTime = elapsed % (totalDuration * words.length);
      const wordIndex = Math.floor(cycleTime / totalDuration);
      const timeInWord = cycleTime % totalDuration;

      // Calculate scroll position with pause at each word
      const wordHeight = 1.2; // em units
      let currentScroll;

      if (timeInWord < pauseDuration) {
        // Pause phase - stay at current word
        currentScroll = wordIndex * wordHeight;
      } else {
        // Scroll phase - smooth transition to next word
        const scrollProgress = (timeInWord - pauseDuration) / scrollDuration;
        const easeInOut =
          scrollProgress < 0.5
            ? 2 * scrollProgress * scrollProgress
            : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2;
        currentScroll = wordIndex * wordHeight + easeInOut * wordHeight;
      }

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
