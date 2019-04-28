const express = require("express");
const app = express();

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://frizlette.eu.auth0.com/.well-known/jwks.json`,
	}),
	audience: 'http://localhost:8090',
	issuer: 'https://frizlette.eu.auth0.com/',
	algorithms: [ 'RS256' ],
  });

//app.use("/api/*", checkJwt)

var cors = require("cors");
app.use(cors({credentials: true, origin: true}));

app.use(express.static("client"));
app.use("/admin", express.static("admin"));

let groups = ["Test Group", "Other Test Group"];

let users = [["James", "Test user"]];

let transactions = [[15, "James", "Test Group"], [25, "James", "Test Group"], [-17, "James", "Test Group"], [15, "James", "Other Test Group"], [15, "James", "Other Test Group"]];



app.get("/api/groups", checkJwt, function (req, resp){
	console.log(req.user);
	resp.send(groups);
});
app.get("/api/transactions",  checkJwt, function (req, resp){
	resp.send(transactions);
})
app.get("/api/transactions/:groupid",  checkJwt, function (req, resp){
	let group_transactions = [];
	for(let i = 0; i < transactions.length; i++){
		if (transactions[i][2] == req.params.groupid){
			group_transactions.push(transactions[i]);
		}
	}
	resp.send(group_transactions);
	
});



app.listen(8090);
