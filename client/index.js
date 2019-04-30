let apiUrl = "http://localhost:8090";

var auth0 = new window.auth0.WebAuth({
	clientID: "jdfBWYz21i4sCE0Cs1cZxkxCptc1JkJM",
	domain: "frizlette.eu.auth0.com",
	responseType: "token id_token",
	audience: apiUrl,
	redirectUri: apiUrl,
	scope: "openid profile name",
});



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
			load_groups(authResult.accessToken);
		}
	}
}

auth();

async function callApi(endpoint, accessToken){
	let url = apiUrl + endpoint;
	let response = await fetch(url, {headers: {"Authorization": "Bearer " + accessToken}});
	let body = await response.text();
	let err = response.status;
	if (err != 200){
		return err;
	}


	let data = JSON.parse(body);

	return data;
}

function load_group(group, accessToken){
	
	
	callApi("/api/transactions/byGroup/"+group, accessToken).then(transactions => {
		document.getElementById("transactions").innerHTML = "<tr><td>Amount</td><td>Name</td></tr>";
		for(let i = 0; i < transactions.length; i++){
			document.getElementById("transactions").innerHTML += "<tr><td>"+transactions[i][0]+"</td><td id="+transactions[i][1]+"></td></tr>";
			callApi("/api/users/byid/"+transactions[i][1], accessToken).then(data => {
				document.getElementById(data.user_id).innerHTML = data.nickname;
			})
			
		}
		$("#transactions_collapse").collapse("show");
		$("#group_collapse").collapse("show");
		$("#new").collapse("show");
		document.getElementById("groupname").innerHTML = group;	
	})
	

}

function load_groups(accessToken){

	auth0.client.userInfo(accessToken, function(err, profile) {

		callApi("/api/groups/byUser/"+profile.sub.substring(profile.sub.indexOf("|")+1), accessToken).then(groups => {

			for(let i = 0; i < groups.length; i++){
				document.getElementById("groups").innerHTML += "<button type=\"button\" id=\"group_butt_"+groups[i]+"\" class=\"btn btn-secondary\">"+groups[i]+"</button><br><br>";
			}
			for(let i = 0; i < groups.length; i++){
				document.getElementById("group_butt_"+groups[i]).addEventListener("click", function(){
					load_group(groups[i], accessToken);
				});
			}
		});
	});
	
}

$("#group").collapse("hide");