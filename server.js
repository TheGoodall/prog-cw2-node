const express = require('express');
const app = express();



app.use(express.static('client'));



let instruments = [ 'Hello', 'testing', 'more testing'];



app.get('/home', function (req, resp){
    resp.send(instruments);
});



app.listen(8090);
