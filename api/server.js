const express = require('express');
const productRoutes = require('./routes/productRoutes');

// initiate an empty express app 
const app = express();

// app.get('*', (req, res) => {
//     console.log('are we making this request');
// })
app.use('/products', productRoutes);


app.listen(4000, () => {
    console.log('server running on port 4000');
});