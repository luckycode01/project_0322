const { exec } = require('child_process');

function open(url, port) {
  // 获取系统标识
  const platFrom = process.platform;

  let cmd = '';
  switch (platFrom) {
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
  exec(`${cmd} ${url}:${port}`);
}

module.exports = open;
