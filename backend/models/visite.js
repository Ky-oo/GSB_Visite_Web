const mongoose = require('mongoose');
const echantillon = require('./echantillon');

const visiteSchema = mongoose.Schema({
  date_visite: { type: Date, required: true },
  commentaire: { type: String, required: true },
  visiteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Visiteur', required: true },
  praticien: { type: mongoose.Schema.Types.ObjectId, ref: 'Praticien', required: true },
  motif: { type: mongoose.Schema.Types.ObjectId, ref: 'Motif', required: true },
  echantillons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Echantillon' }]
});

module.exports = mongoose.model('Visite', visiteSchema);
