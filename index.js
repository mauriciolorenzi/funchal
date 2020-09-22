const { hostname } = require('os');

const app = require('express')(),
port = process.env.PORT || 8080,
fs = require('fs');

function readFile(filename)
{

}

app.get('/almoco', function (req, res) {
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
  });

app.listen(port, hostname, () => {
    console.log(`app listening at http://${hostname}:${port}`)
  });