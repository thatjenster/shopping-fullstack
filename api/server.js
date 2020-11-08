const express = require('express');
const bodyParser = require('body-parser')
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// initiate an empty express app 
const app = express();
// add middleware to parse the BODY of the request 
app.use(bodyParser.json());
// { header: 'abc', pat: '/carts', data: Represents all the information that was passed in the 'body'}
// req.body = {}


// app.get('*', (req, res) => {
//     console.log('are we making this request');
// })
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);


app.listen(4000, () => {
    console.log('server running on port 4000');
});