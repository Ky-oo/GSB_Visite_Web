const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const motifRoutes = require('./routes/motif');
const praticienRoutes = require('./routes/praticien');
const visiteRoutes = require('./routes/visite');
const visiteurRoutes = require('./routes/visiteur');
const userRoutes = require('./routes/user');
const jwt = require('./middleware/auth');
const echantillonRoutes = require('./routes/echantillon');

const app = express();

mongoose.connect('mongodb+srv://kylianpatry:YMvhH4HWsJbGrGj@kyliandatabaseexpressjs.fshpelw.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/motif', jwt, motifRoutes);
app.use('/api/praticien', jwt, praticienRoutes);
app.use('/api/visite', jwt, visiteRoutes);
app.use('/api/visiteur',jwt,  visiteurRoutes);
app.use('/api/auth',  userRoutes);
app.use('/api/echantillon', jwt, echantillonRoutes);

module.exports = app;