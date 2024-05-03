
const Echantillon = require('../models/echantillon');
const expressAsyncHandler = require('express-async-handler');

exports.createEchantillon = expressAsyncHandler(async (req, res) => {
    if(!req.auth.Responsable){
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const echantillon = new Echantillon({  
        nom_commercial: req.body.nom_commercial,
        date_fabrication: req.body.date_fabrication,
        date_peremption: req.body.date_peremption,
        visite: null
    });
    await echantillon.save();
    res.status(201).json({ 
        message: "Echantillon saved successfully!",
        echantillon_id: echantillon._id 
    });
});

exports.getAllEchantillons = expressAsyncHandler(async (req, res) => {
    const echantillons = await Echantillon.find();
    res.status(200).json(echantillons);
});
