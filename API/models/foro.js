const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = Schema({
  username: { type: String, required: true },
  picture: String,
});

const respuesta = Schema({
  user,
  text: { type: String, required: true },
  published: { type: Date, default: Date.now() },
});

const pregunta = Schema({
  user,
  title: String,
  text: String,
  published: { type: Date, default: Date.now() },
  solved: { type: Boolean, default: false },
  respuestas: [respuesta],
  datewhenSolved: Date,
});

const foro = Schema({
  title: { type: String, unique: true },
  description: String,
  members: [user],
  preguntas: [pregunta],
  created: { type: Date, default: Date.now() },
  admins: [String], // Se guardan los emails de los admins
});

module.exports = mongoose.model('foro', foro);
