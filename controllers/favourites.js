const Favourite = require('../models/Favourites');

// Create a new favourite entry
exports.createFavourite = async (req, res) => {
    try {
        const favourite = new Favourite(req.body);
        await favourite.save();
        res.status(201).send(favourite);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all favourites
exports.getFavourites = async (req, res) => {
    try {
        const favourites = await Favourite.find();
        res.send(favourites);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single favourite by ID
exports.getFavourite = async (req, res) => {
    try {
        const favourite = await Favourite.findById(req.params.id);
        if (!favourite) return res.status(404).send();
        res.send(favourite);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a favourite by ID
exports.updateFavourite = async (req, res) => {
    try {
        const favourite = await Favourite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!favourite) return res.status(404).send();
        res.send(favourite);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a favourite by ID
exports.deleteFavourite = async (req, res) => {
    try {
        const favourite = await Favourite.findByIdAndDelete(req.params.id);
        if (!favourite) return res.status(404).send();
        res.send({ message: "Delete successful" });
    } catch (error) {
        res.status(500).send(error);
    }
};