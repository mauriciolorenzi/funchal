const { hostname } = require('os');

const express = require('express'),
app = express(),
port = process.env.PORT || 8080,
fs = require('fs');

app.use('/almoco', express.static(__dirname + '/almoco.pdf'));
app.use('/pizzaria', express.static(__dirname + '/pizzaria.pdf'));

/* app.get('/almoco', function (req, res) {
    const data = fs.readFileSync('./almoco.pdf');
        if (data) {
              res.end(data);
        }
        else{
            console.log(data);
        }
  });

  app.get('/pizzaria', function (req, res) {
    const data = fs.readFileSync('./pizzaria.pdf');
        if (data) {
              res.end(data);
        }
        else{
            console.log(data);
        }
  }); */

app.listen(port, hostname, () => {
    console.log(`app listening at http://${hostname}:${port}`)
  });