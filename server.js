const express = require("express");
const app = express();

const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

let fetch = require("node-fetch");

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://frizlette.eu.auth0.com/.well-known/jwks.json",
	}),
	audience: "http://pc.d.frizlette.me:8090",
	issuer: "https://frizlette.eu.auth0.com/",
	algorithms: [ "RS256" ],
});

const checkAdmin = jwtAuthz([ "administrate:food" ]);

var cors = require("cors");
app.use(cors({credentials: true, origin: true}));

app.use(express.static("client"));
app.use("/admin", checkJwt, checkAdmin, express.static("admin"));

let groups = ["Test Group", "Other Test Group", "more test groups"];



let transactions = [[15, "James", "Test Group"], [25, "James", "Test Group"], [-17, "James", "Test Group"], [15, "James", "Other Test Group"], [15, "James", "Other Test Group"]];



function getToken(){

	var request = require("request");

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
		console.log(body);
	});
	
}

app.get("/api/groups", checkJwt, function (req, resp){
	console.log(req.user.sub);
	getToken()
	
	resp.send(groups);
});
app.get("/api/transactions",  checkJwt, function (req, resp){
	console.log(req.user.sub);
	resp.send(transactions);
});
app.get("/api/transactions/:groupid",  checkJwt, function (req, resp){
	console.log(req.user.sub);
	let group_transactions = [];
	for(let i = 0; i < transactions.length; i++){
		if (transactions[i][2] == req.params.groupid){
			group_transactions.push(transactions[i]);
		}
	}
	resp.send(group_transactions);
	
});



app.listen(8090);
