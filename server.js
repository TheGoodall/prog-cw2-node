const express = require('express');
const app = express();



app.use(express.static('client'));



let posts = [['Hello','goodbye'], ['testing','stop testing'], ['more testing','less testing']];



app.get('/posts', function (req, resp){
    let post_titles = []
    for (i=0; i<posts.length; i++){
        post_titles.push(posts[i][0])
      }
    resp.send(post_titles);
});
app.get('/post', function(req, resp){
    post_id = req.query.id
    if (post_id != {}){
        let post_id_number = parseInt(post_id)
        if (typeof(post_id) == "string" && !isNaN(post_id_number)) {
            if (post_id_number < posts.length && post_id_number >= 0) {
                resp.send(posts[post_id_number])  

            } else {
                resp.status(400)
                resp.send({})
            }       
        } else {
            resp.status(400)
            resp.send({})
        }
    } else {
        resp.status(400)
        resp.send({})
    }
    
    
})



app.listen(8090);
