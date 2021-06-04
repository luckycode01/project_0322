const fs = require('fs');
const path = require('path');

//得到文件路径
const filePath = path.resolve(__dirname, 'text.txt');

(async () => {
  const fd = await new Promise((resolve, rejects) => {
    fs.open(filePath, 'a', (err, fd) => {
      if (err) {
        rejects(err);
        return;
      }
      resolve(fd);
    });
  });
  await new Promise((resolve, rejects) => {
    fs.write(fd, 'bbbbbbbbbbbbbbbbbbb', (err) => {
      if (err) {
        rejects(err);
        return;
      }
      resolve();
    });
  });
  const re = await new Promise((resolve, rejects) => {
    fs.close(fd, (err) => {
      if (err) {
        rejects(err);
        return;
      }
      resolve('文件操作完毕，已关闭');
    });
  });
  return re;
})()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
