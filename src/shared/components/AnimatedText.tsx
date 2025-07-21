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
  const [spinOffset, setSpinOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSpinning(true);

      // Slot machine effect with vertical scrolling
      const spinDuration = 1000; // Total spin duration
      const spinInterval = 60; // How fast to cycle through words during spin
      const totalSpins = spinDuration / spinInterval;

      let spinCounter = 0;
      const spinTimer = setInterval(() => {
        spinCounter++;

        // Create vertical scrolling effect
        const progress = spinCounter / totalSpins;
        const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        const offset = Math.floor(easeOut * words.length * 3); // Scroll through words multiple times

        setSpinOffset(offset);

        if (spinCounter >= totalSpins) {
          clearInterval(spinTimer);
          setIsSpinning(false);
          setSpinOffset(0);
          // Move to the next word in the sequence
          setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }, spinInterval);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  // Calculate the maximum width needed for all words
  const maxWidth = Math.max(...words.map((word) => word.length));

  // Create a repeating sequence of words for the slot machine effect
  // Start with the current word, then alternate through the sequence
  const currentWord = words[currentIndex];
  const nextWord = words[(currentIndex + 1) % words.length];

  // Create sequence: current word, next word, current word (for smooth scrolling)
  const slotWords = isSpinning
    ? [currentWord, nextWord, currentWord, nextWord, currentWord, nextWord]
    : [currentWord];

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
        className="transition-transform duration-75 ease-out"
        style={{
          transform: isSpinning
            ? `translateY(-${spinOffset * 1.2}em)`
            : 'translateY(0)',
          transition: isSpinning ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {slotWords.map((word, index) => (
          <div
            key={`${word}-${index}-${currentIndex}`}
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
