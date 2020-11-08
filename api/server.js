const express = require('express');

// initiate an empty express app 
const app = express();

app.listen(4000, () => {
    console.log('server running on port 4000');
});