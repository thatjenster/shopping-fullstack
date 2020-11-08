// use express router to handle my /product routes 

const express = require('express');
const router = express.Router();

const products = require('./../data');

/// Create a GET route for the products
router.get('/', (req, res) => {
    // a bunch of logic to get stuff from the database
    res.json(products);
})

module.exports = router;