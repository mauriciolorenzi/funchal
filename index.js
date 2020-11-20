const amazons3 = require('./amazons3');

const express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  fs = require('fs'),
  formidable = require('formidable');

if (app.get('env') == 'development') {
  const result = require('dotenv').config();

  if (result.error) {
    throw result.error
  }
}

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

app.get('/almoco', function (req, res) {
  res.sendFile(`${__dirname}/html/almoco.html`);
});

app.get('/pizzaria', function (req, res) {
  res.sendFile(`${__dirname}/html/pizzaria.html`);
});

app.get('/getFileUrl', function (req, res) {
  res.send(amazons3.getFileUrl(req.query.fileName));
});

app.get('/alterpizzadocuments', function (req, res) {
  res.sendFile(`${__dirname}/html/manage-files.html`);
});

app.post('/sendfiles', function (req, res) {
  var form = formidable({ multiples: true });
  form.parse(req, function (err, fields, files) {

    files = files.files;

    if (err) {
      next(err);
      return;
    }

    if (!files.length) {
      let fileStream = fs.createReadStream(files.path);
      fileStream.on('error', function (err) {
        console.log('File Error', err);
      });

      amazons3.uploadFile(fileStream, files.name);
    }
    else {
      for (var i = 0; i < files.length; i++) {
        let fileStream = fs.createReadStream(files[i].path);
        fileStream.on('error', function (err) {
          console.log('File Error', err);
        });

        amazons3.uploadFile(fileStream, files[i].name);
      }
    }

    res.redirect('/alterpizzadocuments');
    res.end();
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});