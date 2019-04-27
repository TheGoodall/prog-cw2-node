

async function load_group(group){

	
	let response = await fetch("http://localhost:8090/api/transactions/"+group);
	let body = await response.text();

	let transactions = JSON.parse(body);
	
	document.getElementById("group").innerHTML = "";




	for(let i = 0; i < transactions.length; i++){
		document.getElementById("group").innerHTML += "<button type=\"button\" class=\"btn btn-secondary\">"+transactions[i]+"</button><br><br>";
	}
	$("#group").collapse("show");
	$("#new").collapse("show");
	
	
	
}




async function load_groups(){

	let response = await fetch("http://localhost:8090/api/groups");
	let body = await response.text();

	let groups = JSON.parse(body);


	for(let i = 0; i < groups.length; i++){
		document.getElementById("groups").innerHTML += "<button type=\"button\" id=\"group_butt_"+groups[i]+"\" class=\"btn btn-secondary\">"+groups[i]+"</button><br><br>";

		document.getElementById("group_butt_"+groups[i]).addEventListener("click", function(){
			load_group(groups[i]);
		
		});
		console.log("adding event listener to "+groups[i])
	}
}

load_groups()

$("#group").collapse("hide")





document.getElementById("meal_butt").addEventListener("click", function(event){
/* 	document.getElementById("meal_butt").disabled = true;
	document.getElementById("shop_butt").disabled = false; */

	document.getElementById("meal_form_div").style="display:block;";
	document.getElementById("shop_form_div").style="display:none;";


});

document.getElementById("shop_butt").addEventListener("click", function(event){
/* 	document.getElementById("shop_butt").disabled = true;
	document.getElementById("meal_butt").disabled = false; */

	document.getElementById("shop_form_div").style="display:block;";
	document.getElementById("meal_form_div").style="display:none;";


});