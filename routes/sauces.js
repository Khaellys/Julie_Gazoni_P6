const express = require('express');
const router = express.Router();
const Sauce = require('../models/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauce');


router.post('/', multer, (req, res, next) => {
    const sauceData = JSON.parse(req.body.sauce);
    const imgURL = 'http://localhost:3000/images/' + req.file.filename;
    sauceData.imageURL = imgURL;
    console.log(sauceData);
    delete req.body._id;
    const sauce = new Sauce({
      ...sauceData
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
    });
  
  router.get('/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
  });
  
  router.get('/', (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  });
  

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce );
router.delete('/:id', auth, saucesCtrl.deleteSauce);
//router.post('/:id/like', auth, saucesCtrl.likeSauce );

module.exports = router;