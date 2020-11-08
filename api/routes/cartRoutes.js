const express = require('express');
// package create unique IDS
const uuid = require('uuid');
const router = express.Router();
const products = require('../data');
const carts = [];
// Add an item to a cart 
// Post Route, create a cart AND add an item to that cart

router.post('/', (req, res) => {
    const cartId = uuid.v4();
    // productId
    // need to have body-parser installed for this to work 
    const { productId } = req.body;

    const productsToAdd = products.filter((product) =>
    productId === product.id
    ).map((item) => {
      return {...item, count: 1 }
    })
    const cart = {
        id: cartId,
        products: productsToAdd,
    };
    carts.push(cart);
})

// add an item to an existing cart 

module.exports = router;