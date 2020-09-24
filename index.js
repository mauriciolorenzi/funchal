const express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  fs = require('fs'),
  formidable = require('formidable');

/* app.use('/files/almoco.pdf', express.static(`${__dirname}/files/almoco.pdf`));
app.use('/files/pizzaria.pdf', express.static(`${__dirname}/files/pizzaria.pdf`)); */
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/files', express.static('files'));

//app.use('/render-pdf.js', express.static(`${__dirname}/render-pdf.js`));

app.get('/almoco', function (req, res) {
  res.sendFile(`${__dirname}/html/almoco.html`);
});

app.get('/pizzaria', function (req, res) {
  res.sendFile(`${__dirname}/html/pizzaria.html`);

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

    for (var i = 0; i < files.length; i++) {
      let oldpath = files[i].path, newpath = `${__dirname}/files/${files[i].name}`;
      fs.rename(oldpath, newpath, function (err) {
        if (err) {
          throw err;
        }
      });
    }
    res.redirect('/alterpizzadocuments');
    res.end();
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});