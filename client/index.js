let apiUrl = "http://localhost:8090"

var auth0 = new window.auth0.WebAuth({
	clientID: "jdfBWYz21i4sCE0Cs1cZxkxCptc1JkJM",
	domain: "frizlette.eu.auth0.com",
	responseType: "token id_token",
	audience: "http://localhost:8090",
	redirectUri: "http://localhost:8090",
	scope: "openid profile",
});



function auth() {
	var hash = window.location.hash;
	if (hash === "") {
		auth0.authorize();
		return;
	}

	auth0.parseHash(handleParseHash);
	function handleParseHash(err, authResult) {
		if (authResult && authResult.accessToken && authResult.idToken) {
			let accessToken = authResult.accessToken;
			let idToken = authResult.idToken;

			load_groups(accessToken);


		}
	}
}

auth();



async function callApi(endpoint, accessToken){
	let url = apiUrl + endpoint;
	console.log("sending request")
	let response = await fetch(url, {headers: {"Authorization": "Bearer " + accessToken}});
	let body = await response.text();
	let err = response.status;
	if (err != 200){
		return err;
	}


	let data = JSON.parse(body);
	console.log("recieved" + data)
	return data;
}

function load_group(group, accessToken){
	
	
	callApi("/api/transactions/"+group, accessToken).then(transactions => {
		document.getElementById("group").innerHTML = "";

		for(let i = 0; i < transactions.length; i++){
			document.getElementById("group").innerHTML += "<button type=\"button\" class=\"btn btn-secondary\">"+transactions[i]+"</button><br><br>";
		}
		$("#group").collapse("show");
		$("#new").collapse("show");
		document.getElementById("groupname").innerHTML = group;	
	})
	

}

function load_groups(accessToken){

	callApi("/api/groups", accessToken).then(groups => {

		for(let i = 0; i < groups.length; i++){
			document.getElementById("groups").innerHTML += "<button type=\"button\" id=\"group_butt_"+groups[i]+"\" class=\"btn btn-secondary\">"+groups[i]+"</button><br><br>";
	
			document.getElementById("group_butt_"+groups[i]).addEventListener("click", function(){
				load_group(groups[i], accessToken);
			
			});
		}

	})
	
}



$("#group").collapse("hide");



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