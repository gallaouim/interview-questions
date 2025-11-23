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
                
                // Map language aliases - Prism supports jsx, typescript, javascript
                const language = match[1].toLowerCase();
                const languageMap: { [key: string]: string } = {
                  'ts': 'typescript',
                  'tsx': 'tsx',
                  'jsx': 'jsx',
                  'js': 'javascript',
                  'javascript': 'javascript',
                  'typescript': 'typescript',
                };
                
                const mappedLanguage = languageMap[language] || language;
                
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
  items: Array<{ title: string; content: string; slug: string; tag: string }>;
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const tags = ['basic', 'intermediate', 'advanced'];
  const filteredItems = selectedTag
    ? items.filter((item) => item.tag === selectedTag)
    : items;

  const handleItemToggle = (slug: string) => {
    const index = items.findIndex((item) => item.slug === slug);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="filter-buttons">
        <button
          className={`filter-btn ${selectedTag === null ? 'active' : ''}`}
          onClick={() => {
            setSelectedTag(null);
            setOpenIndex(null);
          }}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => {
              setSelectedTag(tag);
              setOpenIndex(null);
            }}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>
      <div className="accordion">
        {filteredItems.map((item) => {
          const index = items.findIndex((i) => i.slug === item.slug);
          return (
            <div key={item.slug} className="accordion-wrapper">
              <span className={`question-tag tag-${item.tag}`}>
                {item.tag}
              </span>
              <AccordionItem
                title={item.title}
                content={item.content}
                isOpen={openIndex === index}
                onToggle={() => handleItemToggle(item.slug)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

