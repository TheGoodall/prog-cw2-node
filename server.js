const express = require("express");
const app = express();



app.use(express.static("client"));
app.use("/admin", express.static("admin"));

let groups = ["Test Group", "Other Test Group"];

let users = [["James", "Test user"]];

let transactions = [[15, "James", "Test Group"], [25, "James", "Test Group"], [-17, "James", "Test Group"], [15, "James", "Other Test Group"], [15, "James", "Other Test Group"]];




app.get("/api/groups", function (req, resp){
	resp.send(groups);
});
app.get("/api/transactions", function (req, resp){
	resp.send(transactions);
})
app.get("/api/transactions/:groupid", function (req, resp){
	let group_transactions = [];
	for(let i = 0; i < transactions.length; i++){
		if (transactions[i][2] == req.params.groupid){
			group_transactions.push(transactions[i]);
		}
	}
	resp.send(group_transactions);
	
});



app.listen(8090);
