const Visite = require('../models/visite');
const expressAsyncHandler = require('express-async-handler');

exports.createVisite = expressAsyncHandler(async (req, res) => {
    const visite = new Visite({
        date_visite: req.body.date_visite,
        commentaire: req.body.commentaire,
        visiteur: req.body.visiteur,
        praticien: req.body.praticien,
        motif: req.body.motif
    });

    try {
    await visite.save();
    await praticien.findBy({ _id: req.body.praticien }, (err, praticien) => {
        praticien.push(visite._id);
    });
    await visiteur.findBy({ _id: req.body.visiteur }, (err, visiteur) => {
        visiteur.push(visite._id);
    });
    await motif.findBy({ _id: req.body.motif }, (err, motif) => {
        motif.push(visite._id);
    });
    }
    catch (error) {
        res.status(400).json({ error });
        return;
    }
}
);

exports.getOneVisite = expressAsyncHandler(async (req, res) => {
    const visite = await Visite.findOne({ _id: req.params.id });
    if (!visite) {
        res.status(404).json({ message: 'Visite not found' });
        return;
    }
    res.status(200).json(visite);
});

exports.getOneVisiteByPraticien = expressAsyncHandler(async (req, res) => {
    const visite = await Visite.find({ praticien: req.params.id });
    if (!visite) {
        res.status(404).json({ message: 'Visite not found' });
        return;
    }
    res.status(200).json(visite);
});

exports.modifyVisite = expressAsyncHandler(async (req, res) => {
    const visite = new Visite({
        _id: req.params.id,
        date_visite: req.body.date_visite,
        commentaire: req.body.commentaire,
        visiteur: req.body.visiteur,
        praticien: req.body.praticien,
        motif: req.body.motif
    });

    await Visite.updateOne({_id: req.params.id}, visite);
    res.status(201).json({ message: 'Visite updated successfully!' });
});

exports.deleteVisite = expressAsyncHandler(async (req, res) => {
    await Visite.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted!' });
});

exports.getAllVisites = expressAsyncHandler(async (req, res) => {
    const visites = await Visite.find();
    res.status(200).json(visites);
});
