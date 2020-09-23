const { hostname } = require('os');

const express = require('express'),
app = express(),
port = process.env.PORT || 4000;

app.use('/almoco.pdf', express.static(`${__dirname}/almoco.pdf`));
app.use('/pizzaria.pdf', express.static(`${__dirname}/pizzaria.pdf`));
app.use('/render-pdf-almoco.js', express.static(`${__dirname}/render-pdf-almoco.js`));
app.use('/render-pdf-pizzaria.js', express.static(`${__dirname}/render-pdf-pizzaria.js`));

app.get('/almoco', function (req, res) {
    res.sendFile(`${__dirname}/almoco.html`);
  });

  app.get('/pizzaria', function (req, res) {
    res.sendFile(`${__dirname}/pizzaria.html`);
  });

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });