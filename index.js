var express = require('express'); 
var app = express();
var pg = require('pg');
const https = require('https');
const fs = require('fs');
var path = require("path");
var url = require("url");
var testSQlValue1 = "";
var endValue = "";
var endDirect = "";
var resultsidSQL = "";
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get([''], function(request, response) {
	fs.readFile('home.html', 'utf8', function (err,data) {
		response.write(data);
		response.end();
	});
});

app.get(['/addLogin/:id'], function(request, response) {
	var preloginVals = request.params.id;
	var loginVals = preloginVals.split(",");
	var userName = loginVals[0];
	var userEmail = loginVals[1];
	var userPass = loginVals[2];
	
    pg.connect(process.env.DATABASE_URL, function(err, client, done) 
	{
		var postSqlCustom3 = "Select name from user_table WHERE email = '"+userEmail+"'";
		client.query(postSqlCustom3, function(err, result) 
		{
			 if (err)
				{ endValue = ("Error " + err); }
			else
			{ 
				testSQlValue1 = parseFloat(result.rows.length);
			}
			done();
		});
		if (testSQlValue1 < 1 && testSQlValue1 != "")
		{
			var postSqlCustom2 = "INSERT INTO user_table (name, email, password) VALUES ('"+userName+"', '"+userEmail+"', '"+userPass+"')";
			client.query(postSqlCustom2, function(err, result) 
			{
				if (err)
					{ endValue = ("Error " + err);  }
				else
				{ 
					//endValue = "if";
					endDirect = 'http://trademybook.herokuapp.com/login';
					response.redirect(endDirect);
				}
				done();
			});
		}
		else
		{
			//endValue = "else";
			endDirect = 'http://trademybook.herokuapp.com/signup';
			response.redirect(endDirect);
		}

	});
	//response.end();
});
app.get(['/login'], function(request, response) {
	fs.readFile('login.html', 'utf8', function (err,data) {
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
app.get(['/signup'], function(request, response) {
	fs.readFile('signup.html', 'utf8', function (err,data) {
		response.write(data);
		response.end();
	});
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});