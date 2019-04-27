





async function load_groups(){

  let response = await fetch('http://localhost:8090/api/groups');
  let body = await response.text();

  let groups = JSON.parse(body);

  for(let i = 0; i < groups.length; i++){
    document.getElementById('groups').innerHTML += '<button type=button" class="btn btn-secondary">'+groups[i]+'</button><br><br>';
  }
}

load_groups()


document.getElementById('group').collapse
document.getElementById('new').collapse



document.getElementById('meal_butt').addEventListener('click', function(event){
  document.getElementById("meal_butt").disabled = true;
  document.getElementById("shop_butt").disabled = false;

  document.getElementById("meal_form_div").style="display:block;";
  document.getElementById("shop_form_div").style="display:none;";


});

document.getElementById('shop_butt').addEventListener('click', function(event){
  document.getElementById("shop_butt").disabled = true;
  document.getElementById("meal_butt").disabled = false;

  document.getElementById("shop_form_div").style="display:block;";
  document.getElementById("meal_form_div").style="display:none;";


});