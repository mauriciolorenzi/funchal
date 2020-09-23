const { hostname } = require('os');

const express = require('express'),
app = express(),
port = process.env.PORT || 4000,
fs = require('fs');

//app.use('/almoco.pdf', express.static(__dirname + '/almoco.pdf'));

app.get('/almoco', function (req, res) {
    res.redirect('/web/viewer.html?file=almoco.pdf');
  });

  app.get('/pizzaria', function (req, res) {
    res.sendFile(`${__dirname}/pizzaria.html`);
  });
  
 /*  app.get('/almoco', function (req, res) {
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

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });