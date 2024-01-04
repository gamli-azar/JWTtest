const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('login')
});

app.get('/api', (req, res) => {
  res.json({
    text: 'my api'
  });
});


app.post('/api/login', (req, res) => {
  const user = { id: 3 };
  const token = jwt.sign({ user }, 'my_secret_key', { expiresIn: '1d' });
  res.cookie('access_token', token);
  res.redirect('/api/protected');
});

app.get('/api/verify', (req, res) => {
  jwt.verify(req.cookies.token, 'my_secret_key', (err, data) => {
    if (!err) {
      res.json({
        status: 'success'
      });
      res.end()
      return
    }
    res.sendStatus(403);
  });
});

app.get('/api/protected', (req, res) => {
  const token = req.cookies.token;
  res.render('api', {"data":token})
});

app.listen(3000);