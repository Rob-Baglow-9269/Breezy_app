const express = require('express');
const { createFavourite, getFavourites, getFavourite, updateFavourite, deleteFavourite } = require('../controllers/favourites');
const router = express.Router();

router.post('/', createFavourite);
router.get('/', getFavourites);
router.get('/:id', getFavourite);
router.put('/:id', updateFavourite);
router.delete('/:id', deleteFavourite);

module.exports = router;