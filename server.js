const express = require('express');
const app = express();



app.use(express.static('client'));



let posts = [['Hello','goodbye'], ['testing','stop testing'], ['more testing','less testing']];



app.get('/posts', function (req, resp){
    resp.send(posts);
});
app.get('/post', function(req, resp){
    post_id = req.query.id
    if (post_id != {}){
        console.log(post_id);
        console.log(typeof(post_id))
        resp.send(posts)

    } else {
        resp.status(400)
        resp.send({})
    }
    
})



app.listen(8090);
