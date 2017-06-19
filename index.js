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
var userCookie = "";
var passCookie = "";
var testData = "";
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get([''], function(request, response) {
	if (userCookie.length > 0)
	{
		fs.readFile('homeLogged.html', 'utf8', function (err,data) {
			response.write(data);
			response.end();
		});
	}
	else
	{
		fs.readFile('home.html', 'utf8', function (err,data) {
			response.write(data);
			response.end();
		});
	}
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
				var pretestSQlValue1 = result.rows.length;
				testSQlValue1 = parseInt(pretestSQlValue1);
				if (testSQlValue1 < 1)
				{
					var postSqlCustom2 = "INSERT INTO user_table (name, email, password) VALUES ('"+userName+"', '"+userEmail+"', '"+userPass+"')";
					client.query(postSqlCustom2, function(err, result) 
					{
						if (err)
							{ endValue = ("Error " + err);  }
						else
						{ 
							endDirect = 'http://trademybook.herokuapp.com/login';
							response.redirect(endDirect);
						}
					});
				}
				else
				{
					endDirect = 'http://trademybook.herokuapp.com/signup';
					response.redirect(endDirect);
				}
			}
			done();
		});
		

	});
	//response.end();
});




//Your Trade Requests and Trade Requests for You will be loaded from the Database. 
app.get(['/allbooks'], function(request, response) {
	if (userCookie.length > 0)
	{
		fs.readFile('allbooks.html', 'utf8', function (err,data) {
			response.write(data);
			response.end();
		});
	}
	else
	{
		fs.readFile('home.html', 'utf8', function (err,data) {
			response.write(data);
			response.end();
		});
	}
});
app.get(['/mybooks'], function(request, response) {
	if (userCookie.length > 0)
	{
		fs.readFile('mybooks.html', 'utf8', function (err,data) {
			response.write(data);
			response.end();
		});
	}
	else
	{
		fs.readFile('home.html', 'utf8', function (err,data) {
			response.write(data);
			response.end();
		});
	}
});





app.get(['/login'], function(request, response) {
	fs.readFile('login.html', 'utf8', function (err,data) {
		response.write(data);
		response.end();
	});
});
app.get(['/logmein/:id'], function(request, response) {
	var preloginVals = request.params.id;
	var loginVals = preloginVals.split(",");
	var userEmail = loginVals[0];
	var userPass= loginVals[1];
	
    pg.connect(process.env.DATABASE_URL, function(err, client, done) 
	{
		var postSqlCustom3 = "Select name from user_table WHERE email = '"+userEmail+"' and password = '"+userPass+"'" ;
		client.query(postSqlCustom3, function(err, result) 
		{
			if (err)
			{ endValue = ("Error " + err); }
			else
			{ 
				var pretestSQlValue1 = result.rows.length;
				testSQlValue1 = parseInt(pretestSQlValue1);
				if (testSQlValue1 < 1)
				{
					endDirect = 'http://trademybook.herokuapp.com/login';
					response.redirect(endDirect);
				}
				else
				{
					userCookie = userEmail;
					passCookie = userPass;
					endDirect = 'http://trademybook.herokuapp.com';
					response.redirect(endDirect);
				}
			}
			done();
		});
		

	});
});
app.get(['/logout'], function(request, response) {
		userCookie = "";
		passCookie = "";
		endDirect = 'http://trademybook.herokuapp.com';
		response.redirect(endDirect);
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
app.get(['/usersettings'], function(request, response) {
	if (userCookie.length > 0)
	{
		var postSqlCustom1 = "SELECT * FROM user_table where email = '"+userCookie+"'";
		pg.connect(process.env.DATABASE_URL, function(err, client, done) 
		{
			client.query(postSqlCustom1, function(err, result) 
			{
				if (err)
					{ resultsidSQL = ("Error " + err); }
				else
				{
					testData = userCookie + "..." + result.rows[0]["email"];
					response.write("<div class='testData'>Hello..." + testData + "...Goodbye</div>");					
				}
				done();
			});
		});
		fs.readFile('usersettings.html', 'utf8', function (err,data) {
			
			response.write(data);
			response.end();
		});
		 
		
	}
	else
	{
		fs.readFile('home.html', 'utf8', function (err,data) {
			response.write(data);
			response.end();
		});
	}
	 
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});