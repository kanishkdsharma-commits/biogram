#!/usr/bin/env node
// Wrapper to run Django server through npm
const { spawn } = require('child_process');

console.log('Starting Django server on port 5000...');

const django = spawn('python', ['manage.py', 'runserver', '0.0.0.0:5000'], {
  stdio: 'inherit',
  shell: true
});

django.on('error', (err) => {
  console.error('Failed to start Django server:', err);
  process.exit(1);
});

django.on('exit', (code) => {
  console.log(`Django server exited with code ${code}`);
  process.exit(code);
});

// Handle termination
process.on('SIGTERM', () => {
  django.kill('SIGTERM');
});

process.on('SIGINT', () => {
  django.kill('SIGINT');
});