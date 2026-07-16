/**
 * Frees a TCP port before starting dev servers (Windows-friendly).
 * Usage: node scripts/free-port.js 3000
 */

const { execSync } = require('child_process');

const port = process.argv[2];

if (!port) {
  process.exit(0);
}

try {
  const output = execSync(`netstat -ano | findstr ":${port}"`, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore'],
  });

  const pids = new Set();

  for (const line of output.split('\n')) {
    if (!line.includes('LISTENING')) continue;
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && /^\d+$/.test(pid)) {
      pids.add(pid);
    }
  }

  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
      console.log(`Freed port ${port} (stopped PID ${pid})`);
    } catch {
      // Process may have already exited.
    }
  }
} catch {
  // Port is already free.
}
