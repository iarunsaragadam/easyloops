import { marked } from 'marked';
import React from 'react';
import { wikiSlugs, questionSlugs } from '@/constants/wikiSlugs';

export type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const processLinks = (markdown: string) => {
  // Handle [[type:slug]] patterns for different link types
  return markdown.replace(/\[\[([\w-]+):([\w-]+)\]\]/g, (_, type, slug) => {
    switch (type) {
      case 'wiki':
        if (wikiSlugs.includes(slug)) {
          return `[${slug}](/wiki/${slug})`;
        } else {
          return `<span class="text-red-500 font-semibold">[[wiki:${slug}]]</span>`;
        }
      case 'question':
        if (questionSlugs.includes(slug)) {
          return `[${slug}](/questions/${slug})`;
        } else {
          return `<span class="text-red-500 font-semibold">[[question:${slug}]]</span>`;
        }
      default:
        return `<span class="text-red-500 font-semibold">[[${type}:${slug}]]</span>`;
    }
  });
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  const processedContent = React.useMemo(() => {
    // Preprocess content to handle [[slug]] patterns
    return processLinks(content);
  }, [content]);

  const html = React.useMemo(
    () => marked(processedContent),
    [processedContent]
  );

  return (
    <div
      data-testid="markdown-container"
      className={`markdown-content prose prose-sm max-w-none ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
