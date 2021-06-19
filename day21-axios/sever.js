const express = require('express');

const app = express();

app.get('/login', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  setTimeout(() => {
    console.log(req.query);
    if (req.query.name === 'aa' && req.query.pass === '123') {
      return res.json({
        code: 10000,
        mes: 'successful',
        data: {
          name: 'aa',
        },
      });
    }
    res.json({
      code: 10001,
      mes: 'fail',
    });
  }, 3000);
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('http://127.0.0.1:3000');
});
