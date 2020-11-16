/////MODULES//////
var http = require('http');
var express = require('express'); //Ensure our express framework has been added
var app = new express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//////////////////


//Create a server object:
// http.createServer(function  (req, res) {
//   res.writeHead(200,  {'Content-Type': 'text/html'}); // tells client it is HTML
//   res.write('Server is running!'); //write a response to the client
//   //res.write('Hello 3308 World!</br>'); //write a response to the client
//   res.write(req.url); //url is like.. http://localhost:8080/ (the "/" means homepage)
//   res.end(); //end the response

// }).listen(8080); //the server object listens on port 8080

// console.log('Server running at http://127.0.0.1:8080');
//////////////////
//^This code was not working with our html pages. I think that the above it just a basic example that Asa showed us
//for very basic outputs, but something else is needed to fully render existing HTML pages - NF

app.set('port', process.env.PORT || 8080); //Need this to start listening on port 8080


//Create Database Connection:
//Make sure to change this section depending on what your local database 
//connection settings are (database, user, password will be different for everyone's local machine)
var mysql = require('mysql'); //Ensure our MySQL node has been added
var connection = mysql.createConnection ({ //connection variable
	host: 'localhost',
	//port: 5432, //port not needed for MySQL connection (used for PostgreSQL connection)
	database: 'mydb',
	user: 'root',
	password: 'HeRm10n3124?!'
});

connection.connect(function(err) { //now connect to MySQL database
	if(err) { //if unsuccessful
		return console.error('error: ' + err.message);
	}
	console.log('Connected to MySQL server.'); //successful
}); 


/////TEST QUERY//////
//var query = 'SELECT * FROM User;'; //query can be anything
connection.query('SELECT Password FROM User WHERE user_id="12345"', function(error, results, fields) {
	if (error) {
		throw error;
	}

	console.log(results[0].Password);
});
//////////////////

// set the view engine to ejs
app.set('view engine', 'ejs');
//use relative paths and access our resources directory (for the GETS and POSTS)
app.use(express.static(__dirname + '/'));

//Render Lost & Found home page
app.get('/', function(req, res) {
	res.sendFile( __dirname + "/" + "views/Lost_and_Found.html" );
});

//Render About Us page
app.get('/about', function(req, res) {
	res.sendFile( __dirname + "/" + "views/about.html" );
});

//Render About Us page
app.get('/login', function(req, res) {
	res.sendFile( __dirname + "/" + "views/login.html" );
});

//Render About Us page
app.get('/about', function(req, res) {
	res.sendFile( __dirname + "/" + "views/about.html" );
});

// // lost_and_found page post found items
// app.get('/', function(req, res) {
// 	res.render('lost_and_found',{
// 		local_css:"lost_found.css", 
// 		my_title:"Lost and Found"
// 	});
// });

app.listen(8080, function () {
    console.log('Server is running.. on Port 8080');
}); //Keep listening on port 8080