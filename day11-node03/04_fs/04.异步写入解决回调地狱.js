const fs = require('fs');
const path = require('path');

//得到文件路径
const filePath = path.resolve(__dirname, 'text.txt');

function open() {
  return new Promise((resolve, rejects) => {
    fs.open(filePath, 'a', (err, fd) => {
      if (err) {
        rejects(err);
        return;
      }
      resolve(fd);
    });
  });
}
function write(fd) {
  return new Promise((resolve, rejects) => {
    fs.write(fd, 'ccccccccccccc', (err) => {
      if (err) {
        rejects(err);
        return;
      }
      resolve();
    });
  });
}
function close(fd) {
  return new Promise((resolve, rejects) => {
    fs.close(fd, (err) => {
      if (err) {
        rejects(err);
        return;
      }
      resolve('已完成所有操作');
    });
  });
}
(async () => {
  const fd = await open();
  await write(fd);
  const re = await close(fd);
  return re;
})()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
