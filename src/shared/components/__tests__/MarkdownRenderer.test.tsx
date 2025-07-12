import React from 'react';
import { render, screen } from '@testing-library/react';
import MarkdownRenderer from '../MarkdownRenderer';

// Mock the marked library to actually parse markdown
jest.mock('marked', () => ({
  marked: jest.fn((content: string) => {
    // Simple markdown to HTML conversion for testing
    return content
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }),
}));

describe('MarkdownRenderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Wiki Links', () => {
    it('should convert valid wiki links to markdown links', () => {
      const content = 'Check out [[wiki:recursion]] for more information.';
      render(<MarkdownRenderer content={content} />);

      expect(screen.getByText('recursion')).toBeInTheDocument();
      expect(screen.getByText('recursion').closest('a')).toHaveAttribute(
        'href',
        '/wiki/recursion'
      );
    });

    it('should handle multiple wiki links in the same content', () => {
      const content = 'Learn about [[wiki:data-types]] and [[wiki:functions]].';
      render(<MarkdownRenderer content={content} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', '/wiki/data-types');
      expect(links[1]).toHaveAttribute('href', '/wiki/functions');
    });

    it('should show invalid wiki links in red', () => {
      const content = 'This [[wiki:invalid-slug]] should be red.';
      render(<MarkdownRenderer content={content} />);

      const invalidLink = screen.getByText('[[wiki:invalid-slug]]');
      expect(invalidLink).toHaveClass('text-red-500', 'font-semibold');
    });

    it('should handle wiki links with hyphens', () => {
      const content = 'Check [[wiki:data-structures]] for details.';
      render(<MarkdownRenderer content={content} />);

      expect(screen.getByText('data-structures')).toBeInTheDocument();
      expect(screen.getByText('data-structures').closest('a')).toHaveAttribute(
        'href',
        '/wiki/data-structures'
      );
    });
  });

  describe('Question Links', () => {
    it('should convert valid question links to markdown links', () => {
      const content = 'Try [[question:01-variable-declaration]] for practice.';
      render(<MarkdownRenderer content={content} />);

      expect(screen.getByText('01-variable-declaration')).toBeInTheDocument();
      expect(
        screen.getByText('01-variable-declaration').closest('a')
      ).toHaveAttribute('href', '/questions/01-variable-declaration');
    });

    it('should handle multiple question links in the same content', () => {
      const content =
        'Complete [[question:02-data-types]] and [[question:03-arithmetic-operators]].';
      render(<MarkdownRenderer content={content} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', '/questions/02-data-types');
      expect(links[1]).toHaveAttribute(
        'href',
        '/questions/03-arithmetic-operators'
      );
    });

    it('should show invalid question links in red', () => {
      const content = 'This [[question:invalid-question]] should be red.';
      render(<MarkdownRenderer content={content} />);

      const invalidLink = screen.getByText('[[question:invalid-question]]');
      expect(invalidLink).toHaveClass('text-red-500', 'font-semibold');
    });

    it('should handle question links with complex slugs', () => {
      const content = 'Try [[question:14-do-while-loops-where-applicable]].';
      render(<MarkdownRenderer content={content} />);

      expect(
        screen.getByText('14-do-while-loops-where-applicable')
      ).toBeInTheDocument();
      expect(
        screen.getByText('14-do-while-loops-where-applicable').closest('a')
      ).toHaveAttribute(
        'href',
        '/questions/14-do-while-loops-where-applicable'
      );
    });
  });

  describe('Mixed Link Types', () => {
    it('should handle both wiki and question links in the same content', () => {
      const content =
        'Learn about [[wiki:recursion]] and practice with [[question:15-nested-loops]].';
      render(<MarkdownRenderer content={content} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', '/wiki/recursion');
      expect(links[1]).toHaveAttribute('href', '/questions/15-nested-loops');
    });

    it('should handle valid and invalid links mixed', () => {
      const content =
        'Valid: [[wiki:recursion]], Invalid: [[wiki:invalid]], Valid: [[question:01-variable-declaration]].';
      render(<MarkdownRenderer content={content} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', '/wiki/recursion');
      expect(links[1]).toHaveAttribute(
        'href',
        '/questions/01-variable-declaration'
      );

      const invalidLink = screen.getByText('[[wiki:invalid]]');
      expect(invalidLink).toHaveClass('text-red-500', 'font-semibold');
    });
  });

  describe('Unknown Link Types', () => {
    it('should show unknown link types in red', () => {
      const content = 'This [[tutorial:some-tutorial]] should be red.';
      render(<MarkdownRenderer content={content} />);

      const invalidLink = screen.getByText('[[tutorial:some-tutorial]]');
      expect(invalidLink).toHaveClass('text-red-500', 'font-semibold');
    });

    it('should handle malformed link syntax', () => {
      const content = 'This [[invalid-syntax]] should be red.';
      render(<MarkdownRenderer content={content} />);

      // Should not match the pattern and remain unchanged
      expect(
        screen.getByText('This [[invalid-syntax]] should be red.')
      ).toBeInTheDocument();
    });
  });

  describe('Regular Markdown', () => {
    it('should render regular markdown links unchanged', () => {
      const content = 'Check out [Python docs](https://docs.python.org/3/).';
      render(<MarkdownRenderer content={content} />);

      expect(screen.getByText('Python docs')).toBeInTheDocument();
      expect(screen.getByText('Python docs').closest('a')).toHaveAttribute(
        'href',
        'https://docs.python.org/3/'
      );
    });

    it('should render regular markdown content unchanged', () => {
      const content = '# Heading\n\nThis is **bold** and *italic* text.';
      render(<MarkdownRenderer content={content} />);

      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
    });

    it('should handle content with no special links', () => {
      const content = 'Just regular text with no special syntax.';
      render(<MarkdownRenderer content={content} />);

      expect(
        screen.getByText('Just regular text with no special syntax.')
      ).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      render(<MarkdownRenderer content="" />);
      const container = screen.getByTestId('markdown-container');
      expect(container).toBeInTheDocument();
    });

    it('should handle content with only whitespace', () => {
      render(<MarkdownRenderer content="   \n\t  " />);
      const container = screen.getByTestId('markdown-container');
      expect(container).toBeInTheDocument();
    });

    it('should handle content with special characters in slugs', () => {
      const content = 'This [[wiki:slug-with-special-chars]] should be red.';
      render(<MarkdownRenderer content={content} />);

      const invalidLink = screen.getByText('[[wiki:slug-with-special-chars]]');
      expect(invalidLink).toHaveClass('text-red-500', 'font-semibold');
    });

    it('should handle content with multiple consecutive links', () => {
      const content =
        '[[wiki:recursion]][[question:01-variable-declaration]][[wiki:data-types]]';
      render(<MarkdownRenderer content={content} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute('href', '/wiki/recursion');
      expect(links[1]).toHaveAttribute(
        'href',
        '/questions/01-variable-declaration'
      );
      expect(links[2]).toHaveAttribute('href', '/wiki/data-types');
    });
  });

  describe('Props', () => {
    it('should apply custom className', () => {
      render(
        <MarkdownRenderer content="Test content" className="custom-class" />
      );

      const container = screen.getByText('Test content').closest('div');
      expect(container).toHaveClass('custom-class');
    });

    it('should work without className prop', () => {
      render(<MarkdownRenderer content="Test content" />);

      const container = screen.getByText('Test content').closest('div');
      expect(container).toHaveClass(
        'markdown-content',
        'prose',
        'prose-sm',
        'max-w-none'
      );
    });
  });

  describe('Integration with marked library', () => {
    it('should call marked with processed content', () => {
      const marked = jest.requireMock('marked').marked;
      const content = 'Check [[wiki:recursion]] for details.';

      render(<MarkdownRenderer content={content} />);

      expect(marked).toHaveBeenCalledWith(
        'Check [recursion](/wiki/recursion) for details.'
      );
    });

    it('should handle marked returning HTML', () => {
      const marked = jest.requireMock('marked').marked;
      marked.mockReturnValue(
        '<p>Check <a href="/wiki/recursion">recursion</a> for details.</p>'
      );

      const content = 'Check [[wiki:recursion]] for details.';
      render(<MarkdownRenderer content={content} />);

      expect(screen.getByText('recursion')).toBeInTheDocument();
      expect(screen.getByText('recursion').closest('a')).toHaveAttribute(
        'href',
        '/wiki/recursion'
      );
    });
  });
});
