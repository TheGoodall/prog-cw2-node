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
	audience: "http://localhost:8090",
	issuer: "https://frizlette.eu.auth0.com/",
	algorithms: [ "RS256" ],
});

const checkAdmin = jwtAuthz([ "administrate:food" ]);

var cors = require("cors");
app.use(cors({credentials: true, origin: true}));

app.use(express.static("client"));
app.use("/admin", checkJwt, checkAdmin, express.static("admin"));

let groups = [["Test Group", ["5cc5d97b0bd2550ebbe36d2c"]], ["Other Test Group", ["5cc5d97b0bd2550ebbe36d2c"]], ["more test groups", ["5cc5d97b0bd2550ebbe36d2c"]]];



let transactions = [[15, "5cc5d97b0bd2550ebbe36d2c", "Test Group"], [25, "5cc5d97b0bd2550ebbe36d2c", "Test Group"], [-17, "5cc5d97b0bd2550ebbe36d2c", "Test Group"], [15, "5cc5d97b0bd2550ebbe36d2c", "Other Test Group"], [15, "5cc5d97b0bd2550ebbe36d2c", "Other Test Group"]];


function getToken(callback){

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
		callback(body)
	});
	
}

app.get("/api/groups/byUser/:userid", checkJwt, function (req, resp){

	//get id from request and strip the start
	let id = req.user.sub;
	id = id.substring(id.indexOf("|")+1);

	//ensure that the user is trying to access their own groups
	if (req.params.userid == id){
		
		let groups_to_send = [];
		for(let i = 0; i < groups.length; i++){
			if (groups[i][1].includes(req.params.userid)){
				groups_to_send.push(groups[i][0]);
			}
		}
		resp.send(groups_to_send);
	}

});
app.get("/api/users/byGroup/:groupid",  checkJwt, function (req, resp){
	resp.send("Not Implemented Yet");
});
app.get("/api/users/byQuery/:query",  checkJwt, function (req, resp){
	resp.send("Not Implemented Yet");
});
app.get("/api/users/byid/:userid",  checkJwt, function (req, resp){
	resp.send("Not Implemented Yet");
});
app.get("/api/transactions/byUser/:userid",  checkJwt, function (req, resp){
	resp.send("Not Implemented Yet");
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
