
const express = require('express');
const router = express.Router();

const echantillonCtrl = require('../controllers/echantillonController');

router.get('/', echantillonCtrl.getAllEchantillons);
router.post('/', echantillonCtrl.createEchantillon);

module.exports = router;
