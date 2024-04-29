const Visite = require('../models/visite');
const Praticien  = require('../models/praticien');
const Visiteur = require('../models/visiteur');
const Motif = require('../models/motif');
const expressAsyncHandler = require('express-async-handler');
const e = require('express');

exports.createVisite = expressAsyncHandler(async (req, res) => {
    console.log(req.body);

    let motif = await Motif.findOne({libelle: req.body.motif});
    if(!motif) {
        motif = new Motif({
            libelle: req.body.motif
        });
        await motif.save();
    }

    const visite = new Visite({
        date_visite: new Date(req.body.date_visite),
        commentaire: req.body.commentaire,
        visiteur: req.body.visiteur,
        praticien: req.body.praticien,
        motif: motif._id
    });
    try {
        await visite.save();
        await Praticien.findOneAndUpdate({ _id: req.body.praticien }, {
            $push: { visites: visite._id }
        }, {new: true, useFindAndModify: false});
        console.log('praticien updated');
        await Visiteur.findOneAndUpdate({ _id: req.body.visiteur }, {
            $push: { visites: visite._id }
        }, {new: true, useFindAndModify: false});
        console.log('visiteur updated');
        res.status(201).json({ message: 'Visite created successfully!'});
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error });
        return;
    }
});

exports.getOneVisite = expressAsyncHandler(async (req, res) => {
    const visite = await Visite.findOne({ _id: req.params.id }).populate('visiteur').populate('praticien').populate('motif');
    if (!visite) {
        res.status(404).json({ message: 'Visite not found' });
        return;
    }
    res.status(200).json(visite);
});

exports.getOneVisiteByPraticien = expressAsyncHandler(async (req, res) => {
    const visite = await Visite.find({ praticien: req.params.id }).populate('motif').populate('visiteur').populate('praticien').exec();
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
    const visites = await Visite.find().populate('visiteur').populate('praticien').populate('motif').exec();
    res.status(200).json(visites);
});
