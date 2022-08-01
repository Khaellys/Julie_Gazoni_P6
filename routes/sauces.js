const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// const sauceCtrl = require('../controllers/sauces');

router.get('/', auth/* , sauceCtrl.getAllStuff */);
router.post('/', auth, multer/* , stuffCtrl.createThing */);
router.get('/:id', auth/* , stuffCtrl.getOneThing */);
router.put('/:id', auth, multer/* , stuffCtrl.modifyThing */);
router.delete('/:id', auth/* , stuffCtrl.deleteThing */);

// TODO: revoir nom des routes

module.exports = router;