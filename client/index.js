document.getElementById('get').addEventListener('click', async function(event){
    try{
      let response = await fetch('http://localhost:8090/posts');
      let body = await response.text();
      let body_obj = JSON.parse(body)
      let content = ""

      for (i=0; i<body_obj.length; i++){
        content += "<div id="+i+">"+body_obj[i]+"<button id='post"+i+"'>Get data</button></div><br><br>";
        
      }

      document.getElementById('content').innerHTML=content

      for (i=0; i<body_obj.length; i++){
        addbuttontopost(i);
      }
    } catch(e) {
      alert(e);
    }
  });

function addbuttontopost(i){
  document.getElementById('post'+i).addEventListener('click', async function(event){
    try{
      let response = await fetch('http://localhost:8090/post?id='+i);
      let body = await response.text();
      let body_obj = JSON.parse(body)
      let content = "<h2>"+body_obj[0]+"</h2><p>"+body_obj[1]+"</p>"

      

      

      document.getElementById('postviewer').innerHTML=content


    } catch(e) {
      alert(e);
    }
  });
}