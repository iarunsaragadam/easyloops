import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedText from '../AnimatedText';

describe('AnimatedText', () => {
  const words = ['Programming', 'Logic'];

  it('renders the first word initially', () => {
    render(<AnimatedText words={words} />);
    expect(screen.getByText('Programming')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AnimatedText words={words} className="custom-class" />);
    const element = screen.getByText('Programming');
    expect(element).toHaveClass('custom-class');
  });

  it('handles single word array', () => {
    render(<AnimatedText words={['Single']} />);
    expect(screen.getByText('Single')).toBeInTheDocument();
  });

  it('renders with correct structure', () => {
    render(<AnimatedText words={words} />);
    const element = screen.getByText('Programming');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass(
      'inline-block',
      'transition-all',
      'duration-600'
    );
  });
});
