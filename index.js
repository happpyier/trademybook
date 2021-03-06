var express = require('express'); 
var app = express();
var pg = require('pg');
const https = require('https');
const fs = require('fs');
var path = require("path");
var url = require("url");
var testSQlValue1 = "";
var randid_vote = "";
var alertVar = "";
var endValue = "";
var endDirect = "";
var resultsidSQL = "";
var userCookie = "";
var passCookie = "";
var testData1 = "";
var testData2 = "";
var resultFrame = "";
var endBookValue = "";
var BookPassValue = 0;
var image_link = "";
var BookPassValue_val = "";
var books = require('google-books-search');
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
app.get(['/addBook/:id'], function(request, response) {
	if (userCookie.length > 0)
	{
		var preloginVals = request.params.id;
		var loginVals = preloginVals.split(",");
		var bookName = loginVals[0];
		var userEmail = userCookie;
		var options = 
		{
			key: "AIzaSyBO5IZ8i0lpF9I0eMwZ9E4nNV3jXkyUuHM",
			field: 'title',
			offset: 0,
			limit: 1,
			type: 'books',
			order: 'relevance',
			lang: 'en'
		};
		books.search(preloginVals, options, function(error, results) 
		{
			if ( ! error ) {
				BookPassValue_val = results[0]["thumbnail"];
			} else {
				BookPassValue_val = "";
			}
		});
		if (BookPassValue_val.length > 0 && BookPassValue_val != "undefined")
		{	
			pg.connect(process.env.DATABASE_URL, function(err, client, done) 
			{
				var postSqlCustom2 = "INSERT INTO book_table (book, email, imagelink, trade, checkedin) VALUES ('"+bookName+"', '"+userEmail+"', '"+BookPassValue_val+"', '0', '1')";
				client.query(postSqlCustom2, function(err, result) 
				{
					if (err)
						{ endValue = ("Error " + err);  }
					else
					{ 
						endDirect = 'http://trademybook.herokuapp.com/mybooks';
						response.redirect(endDirect);
					}
				});
			});
		}
		else 
		{
			endDirect = "http://trademybook.herokuapp.com/addBook/" + preloginVals;
			response.redirect(endDirect);
		}
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
});
app.get(['/allbooks'], function(request, response) {
	if (userCookie.length > 0)
	{
		fs.readFile('allbooks.html', 'utf8', function (err,data) {
			//use a for loop and the iframe in mybooks.html
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
app.get(['/changePass/:id'], function(request, response) {
	if (userCookie.length > 0)
	{
		var preloginVals = request.params.id;
		var loginVals = preloginVals.split(",");
		var userEmail = userCookie;
		var newUserPass = loginVals[0];
		pg.connect(process.env.DATABASE_URL, function(err, client, done) 
		{
			var postSqlCustom3 = "UPDATE user_table set password = '"+newUserPass+"' WHERE email = '"+userEmail+"'";
			userCookie = newUserPass;
			client.query(postSqlCustom3, function(err, result) 
			{
				if (err)
				{ endValue = ("Error " + err); }
				else
				{ 
					endDirect = 'http://trademybook.herokuapp.com';
					response.redirect(endDirect);
				}
				done();
			});
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
app.get(['/changeProfile/:id'], function(request, response) {
	if (userCookie.length > 0)
	{
		var preloginVals = request.params.id;
		var loginVals = preloginVals.split(",");
		var userEmail = userCookie;
		var newUserName = loginVals[0];
		var newUserCity = loginVals[1];
		var newUserState = loginVals[2];
		pg.connect(process.env.DATABASE_URL, function(err, client, done) 
		{
			var postSqlCustom3 = "UPDATE user_table set name = '"+newUserName+"', city = '"+newUserCity+"', state = '"+newUserState+"' WHERE email = '"+userEmail+"'";
			client.query(postSqlCustom3, function(err, result) 
			{
				if (err)
				{ endValue = ("Error " + err); }
				else
				{ 
					endDirect = 'http://trademybook.herokuapp.com';
					response.redirect(endDirect);
				}
				done();
			});
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
app.get(['/iframe/loadData'], function(request, response) {
	if (userCookie.length > 0)
	{	
		var _name = "";
		var _snippet = "";
		var _image_url = "";

		pg.connect(process.env.DATABASE_URL, function(err, client, done) 
		{
			var postSqlCustomIframe = "select * from book_table where email = '"+userCookie+"'";
			client.query(postSqlCustomIframe, function(err, result) 
			{
				
				if (err)
				{ endValue = ("Error " + err);}
				else
				{ 
				alertVar = result.rows;
				randid_vote = "";
				alertVar.forEach(function(value)
				{
					randid_vote = randid_vote + value["book"]+",";
					image_link = image_link + value["imagelink"]+",";
				});
				}
				done();
			});
		});
		var pre_image_link = image_link.substring(0, image_link.length - 1)
		var pre_randid_vote = randid_vote.substring(0, randid_vote.length - 1)
		var image_link_split = pre_image_link.split(',');
		var randId_split = pre_randid_vote.split(',');
		var randId_length = randId_split.length;
		for (var i=0; i<randId_length; i++)
		{
		response.write("<div style='display: inline-block;'>'" + randId_split[i] + "'<img src='" + image_link_split[i] + "'></img></div>");	
		}
		response.end();
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
					testData2 = result.rows[0]["password"]+","+result.rows[0]["name"]+","+result.rows[0]["city"]+","+result.rows[0]["state"];
				}
				done();
			});
		});
		fs.readFile('usersettings.html', 'utf8', function (err,data) {
			response.write(data+"<div id='userPassCookieHidden' class='hidden'>" + testData2 + "</div>");		
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