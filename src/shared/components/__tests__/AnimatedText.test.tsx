import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedText from '../AnimatedText';

describe('AnimatedText', () => {
  const words = ['Programming', 'Logic'];

  it('renders the first word initially', () => {
    render(<AnimatedText words={words} />);
    expect(screen.getAllByText('Programming')[0]).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AnimatedText words={words} className="custom-class" />);
    const container = screen.getAllByText('Programming')[0].closest('span');
    expect(container).toHaveClass('custom-class');
  });

  it('handles single word array', () => {
    render(<AnimatedText words={['Single']} />);
    expect(screen.getAllByText('Single')[0]).toBeInTheDocument();
  });

  it('renders with correct structure', () => {
    render(<AnimatedText words={words} />);
    const container = screen.getAllByText('Programming')[0].closest('span');
    expect(container?.tagName).toBe('SPAN');
    expect(container).toHaveClass('inline-block', 'overflow-hidden');
  });
});
