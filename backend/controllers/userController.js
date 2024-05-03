const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');
const visiteur = require('../models/visiteur');


require('dotenv').config();




// Signup user
exports.signup = [
    // Validate and sanitize fields.
    body('email').isEmail().withMessage('Veuillez entrer un email valide.').normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('Le mot de passe doit contenir au moins 5 caractères.').trim(),


    asyncHandler(async (req, res, next) => {
        // Check for errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Send back the first error message
            return res.status(400).json({ error: errors.array()[0].msg });
        }


        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new visiteur({
            email: req.body.email,
            password: hash,
            nom: req.body.nom,
            prenom: req.body.prenom,
            tel: req.body.tel,
            date_embauche: req.body.date_embauche,
            visite: req.body.visite,
            Responsable: req.body.Responsable
        });
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé !', userId: user._id, email: user.email});
    })
];


//Login user


exports.login = asyncHandler(async (req, res, next) => {
    const user = await visiteur.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }
    res.status(200).json({
        userId: user._id,
        Responsable: user.Responsable,
        token: jwt.sign(
            { userId: user._id },
            { Responsable: user.Responsable},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
    });
});
