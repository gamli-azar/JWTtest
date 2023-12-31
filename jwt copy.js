



const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.set('view-engine', 'ejs');


app.get('/api', (req, res) => {
  res.json({
    text: 'my api'
  });
});


app.post('/api/login', (req, res) => {
  const user = { id: 3 };
  const token = jwt.sign({ user }, 'my_secret_key', { expiresIn: '1d' });

  res.cookie('token', token);
  res.redirect('/api/protected');
});


app.get('/api/protected', (req, res) => {

  const token = req.cookies.token;

  jwt.verify(token, 'my_secret_key', (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        text: 'this is protected',
        data: data
      });
    }
  });
});

app.listen(3000);




