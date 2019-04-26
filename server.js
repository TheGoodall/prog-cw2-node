const express = require('express');
const app = express();



app.use(express.static('client'));
app.use('/admin', express.static('admin'))

let groups = [["Test Group", ]]

let users = ["James"]

let transactions = []




app.get('/api/groups', function (req, resp){
    resp.send(groups);
});
app.get('/api/transactions', function (req, resp){
    resp.send(transactions)
})
app.get('/api/transactions/:groupid')



app.listen(8090);
