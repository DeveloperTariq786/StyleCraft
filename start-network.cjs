// Script to run StyleCraft on network IP
console.log('Starting StyleCraft on network IP...');
console.log('Network URL will be: http://192.168.43.181:5000');

// Set environment variables
process.env.NODE_ENV = 'development';

// Run the server
require('child_process').spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
}); 