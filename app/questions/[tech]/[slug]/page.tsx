import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const technologies = ['javascript', 'typescript', 'nodejs', 'reactjs'];

async function getQuestion(tech: string, slug: string) {
  const filePath = path.join(process.cwd(), 'questions', tech, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || content.split('\n')[0].replace('#', '').trim(),
    content,
  };
}

export default async function QuestionPage({
  params,
}: {
  params: { tech: string; slug: string };
}) {
  const { tech, slug } = params;

  if (!technologies.includes(tech)) {
    notFound();
  }

  const question = await getQuestion(tech, slug);

  if (!question) {
    notFound();
  }

  const techName = tech.charAt(0).toUpperCase() + tech.slice(1).replace('js', '.js');

  return (
    <div className="container">
      <Link href={`/questions/${tech}`} className="back-button">
        ← Back to {techName} Questions
      </Link>
      
      <div className="card">
        <div className="question-content">
          <ReactMarkdown>{question.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

