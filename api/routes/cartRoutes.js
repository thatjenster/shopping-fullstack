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
    // THIS WILL BE DATABASE LOGIC eventually:
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
    res.json(cart);
})

// add an item to an existing cart 
router.patch('/:cartId/', (req, res) => {
  // we know what cart we are editing
  if (!req.params.cartId) {
    res.status(400).json({
      message: 'please provide a cartId'
    })
  }
  // get the productId from the body
  const newItemId = req.body.productId;
  // Find cart index from carts array:
  const cartToEditIndex = carts.findIndex(
    (cart) => cart.id === req.params.cartId
  );
  // If it's not a valid cart id, do not continue:
  if (cartToEditIndex === -1) {
    res.status(404).json({ message: "please provide a valid cartId" });
  }
  // get cart object
  const cartToEdit = carts[cartToEditIndex];
  let newProducts = [];
  // check if item already exists in the cart:
  const alreadyInCart = cartToEdit.products.filter((p) => p.id === newItemId).length !== 0;
  if (alreadyInCart) {
      // if item already in cart, update the count
      newProducts = cartToEdit.products.map((product) => {
        if (product.id === newItemId) {
            return {...product, count: product.count + 1}
        }
        return product;
      })
  } else {
      // if a new item, add it to the cart
    const newItem = products.find((product) => product.id === newItemId);
    cartToEdit.products.push({...newItem, count: 1});
    newProducts = cartToEdit.products;
  }
  // replace products array with new array we just created:
  carts[cartToEditIndex].products = newProducts;

  // response to the request: 
  res.json(carts[cartToEditIndex]);
});
module.exports = router;