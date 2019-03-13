window.addEventListener('click', async function(event){
    try{
      let response = await fetch('http://pc.d.frizlette.me:8090/home');
      let body = await response.text();
      document.getElementById('content').innerHTML=body;
    } catch(e) {
      alert(e);
    }
  });
