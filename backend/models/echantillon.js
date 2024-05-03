
const mongoose = require('mongoose');

const echantillonSchema = mongoose.Schema({
  nom_commercial: { type: String, required: true },
  date_fabrication: { type: Date, required: true },
  date_peremption: { type: Date, required: true },
  visite: { type: mongoose.Schema.Types.ObjectId, ref: 'Visite' }
});

module.exports = mongoose.model('Echantillon', echantillonSchema);
