const Visiteur = require('../models/visiteur');
const expressAsyncHandler = require('express-async-handler');
const { body , validationResult } = require('express-validator');

exports.getOneVisiteur = expressAsyncHandler(async (req, res) => {
  const visiteur = await Visiteur.findOne({ _id: req.params.id }).populate('visites').populate('porteFeuillePraticiens').exec();
  if (!visiteur) {
    res.status(404).json({ message: 'Visiteur non trouvé' });
    return;
  }
  res.status(200).json(visiteur);
});

exports.modifyVisiteur = expressAsyncHandler(async (req, res) => {
  const visiteur = new Visiteur({
    _id: req.params.id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    tel: req.body.tel,
    email: req.body.email,
    date_embauche: req.body.date_embauche,
    visites: req.body.visites
  });

  await Visiteur.updateOne({ _id: req.params.id }, visiteur);
  res.status(201).json({ message: 'Visiteur mis à jour avec succès !' });
});

exports.deleteVisiteur = expressAsyncHandler(async (req, res) => {
  await Visiteur.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'Supprimé !' });
});

exports.getAllVisiteurs = expressAsyncHandler(async (req, res) => {
  const visiteurs = await Visiteur.find();
  res.status(200).json(visiteurs);
});

exports.createVisiteur = expressAsyncHandler(async (req, res) => {
  await body('email').isEmail().withMessage('L\'email doit être au format approprié').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const visiteur = new Visiteur({
    nom: req.body.nom,
    prenom: req.body.prenom,
    tel: req.body.tel,
    email: req.body.email,
    date_embauche: req.body.date_embauche,
    visites: req.body.visites
  });

  await visiteur.save();
  res.status(201).json({ message: 'Visiteur enregistré avec succès !', visiteur_id: visiteur._id });
});

exports.addPraticienToPorteFeuille = expressAsyncHandler(async (req, res) => {
  const visiteurId = req.params.id;
  const praticienId = req.body.praticien_id; 
  
  const visiteur = await Visiteur.findById(visiteurId);

  if (visiteur.porteFeuillePraticiens.includes(praticienId)) {
    return res.status(400).json({ message: 'Ce praticien est déjà dans la liste !' });
  }

  await Visiteur.updateOne({ _id: visiteurId }, { $push: { porteFeuillePraticiens: praticienId }});

  Visiteur.findById(visiteurId).populate('porteFeuillePraticiens').exec();

  res.status(201).json({ message: 'Praticien ajouté avec succès !'});
});
