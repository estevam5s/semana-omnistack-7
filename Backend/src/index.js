const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose
  .connect(
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    // Conectado
    console.log('\x1b[32m[ BANCO DE DADOS ] \x1b[0mBanco de dados conectado');
  })
  .catch(() => {
    // Erro
    console.log(
      '\x1b[31m[ BANCO DE DADOS ] \x1b[0mErro na conexao ao Banco de dados ',
    );
  });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'localhost');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  req.io = io;

  next();
});

app.use(cors());

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized')),
);

app.use(require('./routes'));

server.listen(3333, () =>
  console.log('\x1b[32m[ BACK END ] \x1b[0mServidor rodando na porta 3333'),
);
