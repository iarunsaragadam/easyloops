import { marked } from 'marked';
import React from 'react';

export type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  const html = React.useMemo(() => marked(content), [content]);
  return (
    <div
      className={`markdown-content prose prose-sm max-w-none ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
