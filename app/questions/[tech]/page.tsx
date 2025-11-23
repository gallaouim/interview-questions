import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Accordion from '@/components/Accordion';

const technologies = ['javascript', 'typescript', 'nodejs', 'reactjs'];

interface Question {
  slug: string;
  title: string;
  content: string;
  tag: string;
}

async function getQuestions(tech: string): Promise<Question[]> {
  const questionsDir = path.join(process.cwd(), 'questions', tech);
  
  if (!fs.existsSync(questionsDir)) {
    return [];
  }

  const files = fs.readdirSync(questionsDir);
  const questions = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(questionsDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Extract title from content if not in frontmatter
      let title = data.title;
      if (!title) {
        const lines = content.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('# ')) {
            title = trimmed.replace(/^#+\s*/, '').trim();
            break;
          }
        }
      }
      
      // Fallback to slug if no title found
      if (!title) {
        title = file.replace('.md', '').split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      }
      
      return {
        slug: file.replace('.md', ''),
        title,
        content,
        tag: data.tag || 'basic',
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return questions;
}

export default async function QuestionsPage({
  params,
}: {
  params: { tech: string };
}) {
  const { tech } = params;

  if (!technologies.includes(tech)) {
    notFound();
  }

  const questions = await getQuestions(tech);
  const techName = tech.charAt(0).toUpperCase() + tech.slice(1).replace('js', '.js');

  return (
    <div className="container">
      <Link href="/" className="back-button">
        ← Back to Home
      </Link>
      
      <div className="card">
        <h1 style={{ marginBottom: '2rem', color: '#333' }}>
          {techName} Interview Questions
        </h1>
        
        <Accordion
          items={questions.map((q) => ({
            title: q.title,
            content: q.content,
            slug: q.slug,
            tag: q.tag,
          }))}
        />
      </div>
    </div>
  );
}

