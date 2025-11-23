import Link from 'next/link';

const technologies = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Core JavaScript concepts and fundamentals',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'TypeScript features and best practices',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Server-side JavaScript and Node.js concepts',
  },
  {
    id: 'reactjs',
    name: 'React.js',
    description: 'React library concepts and patterns',
  },
];

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Interview Questions Platform</h1>
      <p className="subtitle">Choose a technology to explore interview questions</p>
      
      <div className="tech-grid">
        {technologies.map((tech) => (
          <Link key={tech.id} href={`/questions/${tech.id}`}>
            <div className="tech-card">
              <h2>{tech.name}</h2>
              <p>{tech.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
