"use strict";

const request = require("supertest");
const app = require("./app");

// log in to the site (http://frizlette.me) and copy the access token from the url, (but not the stuff that comes after)

let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VUTNSa0V4TWpWQk16a3dSRGszTkROQ1JEWTNPVVkwTVRaQlFVRTVORUpHTnpNd09UZ3dSUSJ9.eyJpc3MiOiJodHRwczovL2ZyaXpsZXR0ZS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWNjNWQ5N2IwYmQyNTUwZWJiZTM2ZDJjIiwiYXVkIjpbImh0dHA6Ly9mcml6bGV0dGUubWUiLCJodHRwczovL2ZyaXpsZXR0ZS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTU2NzkyNjc1LCJleHAiOjE1NTY3OTk4NzUsImF6cCI6ImpkZkJXWXoyMWk0c0NFMENzMWNaeGt4Q3B0YzFKa0pNIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSJ9.cyuCtZHW7UWrmtkV-qViNYKrtcf5ZMhYgilxcTyfXNo9D6Vu5esSxei7nlXjcvfThhKaXuNnR6GXPllO-hG8mblmeo76g5dPenKijMNQPy7Kh7Nu50ckxGjylGb4xI4sjJrr1KMLFSSRhFJTWG1Kh1NDl2GthyM1ad0V_lIgJ9uvG1sLLFvnmQImwjI4OLQ7ZvOzsa6jKAcC7uaaSzcMM6c9_eXOkMX6B8B8Fk1m7_1uwW4QNqbe3ztL6tbsv2a_CwxveHh44gASol5m-C7__Ob_jWz14TQ2LGrIE5TKexNTmsFFPbb3C28Fy5N9SJ6NbmVQChHoJngc8M66rEGhZA";


describe("Test the server", () => {
	test("GET / succeeds", () => {
		return request(app)
	    .get("/")
	    .expect(200);
	});

	test("GET /api/ returns 404", () => {
		return request(app)
	    .get("/api")
	    .expect(404);
	});

	test("GET /api/groups/byUser/afakeuserid returns 401 error", () => {
		return request(app)
	    .get("/api/groups/byUser/afakeuserid")
	    .expect(401);
	});

	test("GET /api/groups/byUser/<a real user id> succeeds", () => {
		return request(app)
		.get("/api/groups/byUser/auth0|5cc5d97b0bd2550ebbe36d2c")
		.set("Authorization", "Bearer "+token)
	    .expect(200);
	});

	test("GET /api/groups/byUser/<a real user id> returns json", () => {
		return request(app)
		.get("/api/groups/byUser/auth0|5cc5d97b0bd2550ebbe36d2c")
		.set("Authorization", "Bearer "+token)
	    .expect(200)
	    .expect("Content-type", /json/);
	});

});