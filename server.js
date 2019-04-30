const express = require("express");
const app = express();

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const request = require("request");

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://frizlette.eu.auth0.com/.well-known/jwks.json",
	}),
	audience: "http://localhost:8090",
	issuer: "https://frizlette.eu.auth0.com/",
	algorithms: [ "RS256" ],
});


var cors = require("cors");
app.use(cors({credentials: true, origin: true}));

app.use(express.static("client"));

let groups = [
	["Test Group", [
		["google-oauth2|114880290605117536405", true],
		["auth0|5cc5d97b0bd2550ebbe36d2c", true]
	]],
	["Other Test Group", [
		["google-oauth2|114880290605117536405", false]
	]],
	["more test groups", [
		["auth0|5cc5d97b0bd2550ebbe36d2c", true]
	]]
];



let transactions = [[15, "auth0|5cc5d97b0bd2550ebbe36d2c", "Test Group"], [25, "google-oauth2|114880290605117536405", "Test Group"], [-17, "google-oauth2|114880290605117536405", "Test Group"], [15, "google-oauth2|114880290605117536405", "Other Test Group"], [15, "google-oauth2|114880290605117536405", "Other Test Group"]];


function getToken(callback){

	

	var options = { method: "POST",
		url: "https://frizlette.eu.auth0.com/oauth/token",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		form: 
		{
			grant_type: "client_credentials",
			client_id: "xGj40aZOgwwkdPCYzGsRqek3rnnr08lk",
			client_secret: "3402emeVq4cRzRLiWzkt1Q2h2NmBN4uOjcCsZe4DCE48L3U_sSY_v_zPOZdeb2Fd",
			audience: "https://frizlette.eu.auth0.com/api/v2/" 
		}
	};
	
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		callback(JSON.parse(body));
	});
	
}

function getData(endpoint, token, callback){

	var options = { method: "GET",
		url: endpoint,
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"Authorization":"Bearer "+token["access_token"]
		}
	};
	
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		callback(body);
	});
	
}

app.get("/api/groups/byUser/:userid", checkJwt, function (req, resp){

	let groups_to_send = [];
	for(let i = 0; i < groups.length; i++){
		if (groups[i][1][0].includes(req.params.userid)){
			groups_to_send.push(groups[i][0]);
		}
	}
	resp.send(groups_to_send);
	

});
app.get("/api/users/byGroup/:groupid",  checkJwt, function (req, resp){
	let group_to_send = [];
	for(let i = 0; i < groups.length; i++){
		if (groups[i][0] == req.params.groupid){
			group_to_send = groups[i][1];
		}
	}
	
	//check user is in group to be returned
	let userfound = false;


	for(let i = 0; i < group_to_send.length; i++){
		if (group_to_send[i][0] == req.user.sub){
			userfound = true;
		}
	}
	
	if (userfound == true){
		resp.send(group_to_send);
	} else {
		resp.sendStatus(403);
	}
	
	
});
app.get("/api/users/byQuery/:query",  checkJwt, function (req, resp){
	getToken(token => {
		getData("https://frizlette.eu.auth0.com/api/v2/users?per_page=10&q="+req.params.query, token, data => {
			resp.send(data);
		});
	});
});
app.get("/api/users/byid/:userid",  checkJwt, function (req, resp){
	getToken(token => {
		getData("https://frizlette.eu.auth0.com/api/v2/users/"+req.params.userid, token, data => {
			resp.send(data);
		});
	});
});
app.get("/api/transactions/byGroup/:groupid",  checkJwt, function (req, resp){
	let group_transactions = [];
	for(let i = 0; i < transactions.length; i++){
		if (transactions[i][2] == req.params.groupid){
			group_transactions.push(transactions[i]);
		}
	}
	resp.send(group_transactions);
	
});



app.listen(8090);
