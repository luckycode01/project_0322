const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "text.txt");

//简单写入
fs.writeFile(filePath, '我是简单写入', (err) => {
    if (err) {
        return;
    }
    console.log('我写完了');
})