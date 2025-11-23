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
      return {
        slug: file.replace('.md', ''),
        title: data.title || content.split('\n')[0].replace('#', '').trim(),
        content,
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
          }))}
        />
      </div>
    </div>
  );
}

