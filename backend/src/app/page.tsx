export const metadata = {
  title: 'HIREZY API',
  description: 'HIREZY backend API server',
};

export default function ApiHomePage() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>HIREZY Backend API</h1>
      <p>API server is running on port 3001.</p>
      <p>
        Health check: <a href="/api/health">/api/health</a>
      </p>
    </main>
  );
}
