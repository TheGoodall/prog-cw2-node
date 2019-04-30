let apiUrl = "http://localhost:8090";

var auth0 = new window.auth0.WebAuth({
	clientID: "jdfBWYz21i4sCE0Cs1cZxkxCptc1JkJM",
	domain: "frizlette.eu.auth0.com",
	responseType: "token id_token",
	audience: apiUrl,
	redirectUri: apiUrl,
	scope: "openid profile name",
});

let accessToken = ""

function auth() {
	var hash = window.location.hash;
	if (hash === "") {
		auth0.authorize();
		return;
	}

	auth0.parseHash(handleParseHash);
	function handleParseHash(err, authResult) {
		if (err) {
			auth0.authorize();
		} else if (!authResult) {
			auth0.checkSession({}, handleParseHash);
		} else if (authResult) {
			accessToken = authResult.accessToken;
			load_groups();
		}
	}
}



async function callApi(endpoint){
	let url = apiUrl + encodeURI(endpoint);
	let response = await fetch(url, {headers: {"Authorization": "Bearer " + accessToken}});
	let body = await response.text();
	let err = response.status;
	if (err != 200){
		return err;
	}


	let data = JSON.parse(body);

	return data;
}

function load_group(group){
	
	//Fill out transactions collumn
	callApi("/api/transactions/byGroup/"+group).then(transactions => {

		//use the data to fill in the group column

		callApi("/api/users/byGroup/"+group).then(data => {
			document.getElementById("balances").innerHTML = "<tr><td>Name</td><td>Balance</td></tr>";
			for (let i = 0; i < data.length; i++){
				callApi("/api/users/byid/"+data[i]).then(user_profile => {
					let name = user_profile.name;
					let balance = 0;
					for (let i = 0; i < transactions.length; i++){
						if (transactions[i][1] == user_profile.user_id){
							balance += transactions[i][0];
						}
					}

					document.getElementById("balances").innerHTML += "<tr><td>"+name+"</td><td>"+balance+"</td></tr>";
				});
			}
			
		});

		//back to filling in the transactions collumn

		document.getElementById("transactions").innerHTML = "<tr><td>Amount</td><td>Name</td></tr>";
		for(let i = 0; i < transactions.length; i++){
			document.getElementById("transactions").innerHTML += "<tr><td>"+transactions[i][0]+"</td><td class="+transactions[i][1]+"></td></tr>";
			callApi("/api/users/byid/"+transactions[i][1]).then(data => {

				let fields = document.getElementsByClassName(transactions[i][1])

				for (let i = 0; i < fields.length; i++){
					fields[i].innerHTML = data.name;
				} 
			});
			
		}
		
	});

	

	$("#transactions_collapse").collapse("show");
	$("#group_collapse").collapse("show");
	$("#new").collapse("show");
	document.getElementById("groupname").innerHTML = group;	

}

function load_groups(){

	auth0.client.userInfo(accessToken, function(err, profile) {

		callApi("/api/groups/byUser/"+profile.sub).then(groups => {

			for(let i = 0; i < groups.length; i++){
				document.getElementById("groups").innerHTML += "<button type=\"button\" id=\"group_butt_"+groups[i]+"\" class=\"btn btn-secondary\">"+groups[i]+"</button><br><br>";
			}
			for(let i = 0; i < groups.length; i++){
				document.getElementById("group_butt_"+groups[i]).addEventListener("click", function(){
					load_group(groups[i]);
				});
			}
		});
	});
	
}


function load_users(){
	console.log("loading users")
}
document.getElementById("add_to_group_button").addEventListener("click", function(){
	load_users()
})

auth();
$("#group").collapse("hide");