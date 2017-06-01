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
				{ resultsidSQL = ("Error " + err); response.write(resultsidSQL); }
			else
			{ 
				testSQlValue1 = JSON.stringify(result.rows.length);
				//response.write(testSQlValue1 + "...Test_Results");
				//response.end();
			}
			done();
		});
		response.write(testSQlValue1 + "...Test_Results");
		response.end();
		if (testSQlValue1 > 0)
		{
			
			var postSqlCustom2 = "INSERT INTO user_table (name, email, password) VALUES ('"+userName+"', '"+userEmail+"', '"+userPass+"')";
			client.query(postSqlCustom2, function(err, result) 
			{
				if (err)
					{ resultsidSQL = ("Error " + err); response.write("error");  }
				else
				{ 
					response.write("if");
				}
				
				done();
			});
		}
		//response.end();
		// else
		// {
			// response.write("else");
			// response.redirect('http://trademybook.herokuapp.com/signup');
		// }
		// response.end();	
	});
	
});
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