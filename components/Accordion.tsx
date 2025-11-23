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

interface AccordionItemWithTagProps extends AccordionItemProps {
  tag?: string;
}

function AccordionItem({ title, content, isOpen, onToggle, tag }: AccordionItemWithTagProps) {
  // Extract only the Answer section from content (skip the "## Answer" heading)
  const lines = content.split('\n');
  let answerStartIndex = -1;
  
  // Find the "## Answer" section
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Look for "## Answer" or "##Answer" (with or without space)
    if (line.match(/^##\s*Answer/i)) {
      answerStartIndex = i + 1; // Start after the Answer heading
      break;
    }
  }
  
  // If Answer section found, extract everything after it (excluding the "## Answer" heading)
  // Otherwise, remove the first H1 (question title) and show the rest
  const processedContent = answerStartIndex >= 0
    ? lines.slice(answerStartIndex).join('\n').trim()
    : content
        .split('\n')
        .filter((line, index) => {
          // Skip the first line if it's an H1 (starts with #)
          const trimmed = line.trim();
          if (index === 0 && trimmed.startsWith('# ')) {
            return false;
          }
          // Skip "## Answer" heading if present
          if (trimmed.match(/^##\s*Answer/i)) {
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
        <div className="accordion-header-right">
          {tag && (
            <span className={`question-tag tag-${tag}`}>
              {tag}
            </span>
          )}
          <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
        </div>
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
            <AccordionItem
              key={item.slug}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onToggle={() => handleItemToggle(item.slug)}
              tag={item.tag}
            />
          );
        })}
      </div>
    </div>
  );
}

