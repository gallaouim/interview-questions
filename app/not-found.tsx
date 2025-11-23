import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#667eea' }}>
          404
        </h1>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="back-button">
          Go back home
        </Link>
      </div>
    </div>
  );
}

