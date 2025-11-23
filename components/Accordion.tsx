'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, content, isOpen, onToggle }: AccordionItemProps) {
  // Remove the first H1 line (question title) from content since it's already in the header
  const processedContent = content
    .split('\n')
    .filter((line, index) => {
      // Skip the first line if it's an H1 (starts with #)
      if (index === 0 && line.trim().startsWith('# ')) {
        return false;
      }
      return true;
    })
    .join('\n')
    .trim();

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          <ReactMarkdown
            components={{
              code(props: any) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                
                if (isInline) {
                  return (
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  );
                }
                
                // Map language aliases
                const languageMap: { [key: string]: string } = {
                  'jsx': 'javascript',
                  'ts': 'typescript',
                  'tsx': 'typescript',
                };
                
                const language = match[1];
                const mappedLanguage = languageMap[language.toLowerCase()] || language;
                
                return (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={mappedLanguage}
                    PreTag="div"
                    {...rest}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  items: Array<{ title: string; content: string; slug: string }>;
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={item.slug}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

