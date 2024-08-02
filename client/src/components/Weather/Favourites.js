const Favourite = require('../models/Favourites');
const jwt = require('jsonwebtoken');

// Create a new favourite entry
exports.createFavourite = async (req, res) => {
    try {
        // Log the headers and request body
        console.log('Request Headers:', req.headers);
        console.log('Request Body:', req.body);

        // Decode the token to get the user info
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            console.log('No token provided');
            return res.sendStatus(401);
        }

        // Verify the token and extract the user
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                console.log('Token verification failed:', err);
                return res.sendStatus(403);
            }

            // Log the decoded user information
            console.log('Decoded User:', user);

            // Create a new Favourite entry
            const favourite = new Favourite({
                username: user.username,
                savedCities: req.body.savedCities
            });

            // Save the favourite to the database
            await favourite.save();

            // Send the response
            res.status(201).send(favourite);
        });
    } catch (error) {
        console.error('Error:', error);  // Log the error
        res.status(400).send(error);
    }
};
