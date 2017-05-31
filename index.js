var express = require('express'); 
var app = express();
var pg = require('pg');
const https = require('https');
const fs = require('fs');
var path = require("path");
var url = require("url");
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get([''], function(request, response) {
	fs.readFile('home.html', 'utf8', function (err,data) {
		response.write(data);
		response.end();
	});
});
app.get(['/addLogin/:id'], function(request, response) {
	preloginVals = request.params.id;
	//var loginVals = preloginVals.split(",");
	//user,email,pass is the setup
	//var userName = loginVals[0];
	//var userEmail = loginVals[1];
	//var userPass = loginVals[2];
	//response.write(userName + "..." + userEmail + "..." + userPass);
	response.end();
});
//test,test,test
:id/'], function(request, response) {
	
app.get(['/signup'], function(request, response) {
	fs.readFile('signup.html', 'utf8', function (err,data) {
		response.write(data);
		response.end();
	});
});
app.get(['/reloadPage'], function(request, response) {
	fs.readFile('reloadPage.html', 'utf8', function (err,data) {
		response.write(data);
		response.end();
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});