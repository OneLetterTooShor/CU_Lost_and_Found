var http = require('http');

//create a server object:
http.createServer(function  (req, res) {
  res.writeHead(200,  {'Content-Type': 'text/html'}); // tells client it is HTML
  res.write('Hello 3308 World!</br>'); //write a response to the client
  res.write('Hello 3308 World!</br>'); //write a response to the client
  res.write(req.url);
  res.end(); //end the response

}).listen(8000); //the server object listens on port 8080

console.log('Server running at http://127.0.0.1:8000');


var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var mysql = require('mysql');

//Make sure to change this section depending on what your local database connection settings are (should be different for everyone's local machine)
var con = mysql.createConnection ({
	host: '127.0.0.1',
	//port: 5432,
	database: 'mydb',
	user: 'root',
	password: 'HeRm10n3124?!'
});

//var db = mysql(dbConfig);
//var query = 'SELECT * FROM User;'; //query can be anything
con.connect();

con.query('SELECT Password FROM User WHERE user_id="12345"', function(error, results, fields) {
	if (error) throw error;
	//console.log(results);
	console.log(results[0].Password);
});

// set the view engine to ejs
// app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// // lost_and_found page post found items
// app.get('/', function(req, res) {
// 	res.render('lost_and_found',{
// 		local_css:"lost_found.css", 
// 		my_title:"Lost and Found"
// 	});
// });