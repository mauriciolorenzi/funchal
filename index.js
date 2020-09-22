const app = require('express')(),
port = 3000,
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

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });