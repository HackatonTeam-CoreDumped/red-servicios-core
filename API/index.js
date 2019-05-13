// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const mongoose = require('mongoose');
const Parser = require('rss-parser');
const app = require('./app');

const parser = new Parser();
let feed = null;

(async () => {
  feed = await parser.parseURL('https://coredumped.es/rss');
  console.log(feed.title);

  feed.items.forEach((item) => {
    console.log(`${item.title}:${item.link}`);
  });
})();

app.get('/rss', (req, res) => {
  res.send(feed);
});

// Conexión a la base de datos y en el puerto 3000
const port = process.env.port || 3000;

// eslint-disable-next-line consistent-return
mongoose.connect('mongodb://localhost/RedCore', { useNewUrlParser: true }, (err) => {
  if (err) {
    return console.log(`ERROR AL CONECTAR A LA BASE DE DATOS ${err}`.red);
  }
  console.log('Conexión con la base de datos establecida'.green);
  app.listen(port, () => {
    console.log(`El servidor esta siendo utilizado en el puerto ${port}`.green);
  });
});
