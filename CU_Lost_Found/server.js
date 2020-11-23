/////MODULES//////
var http = require('http');
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.text());
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
//for very basic outputs, but something else (the below line) is needed to fully render existing HTML pages - NF

app.set('port', process.env.PORT || 8000); //Need this to start listening on port 8080
//Can change the port number depending on your local machine


//Create Database Connection:
//Make sure to change this section depending on what your local database 
//connection settings are (database, user, password will be different for everyone's local machine)
var mysql = require('mysql'); //Ensure our MySQL node has been added
var connection = mysql.createConnection ({ //connection variable
	host: 'localhost',
	database: 'mydb', //Change database, user, and password based on your local machine settings
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
// connection.query('SELECT Password FROM User WHERE user_id="12345"', function(error, results, fields) {
// 	if (error) {
// 		throw error;
// 	}

// 	console.log(results[0].Password);
// });
//////////////////


// set the view engine to ejs
app.set('view engine', 'ejs');
//use relative paths and access our resources directory (for the GETS and POSTS)
app.use(express.static(__dirname + '/'));


//Render Login page (this is the first page users see, they must login before gaining access to the site)
app.get('/', function(req, res) {
	res.sendFile( __dirname + "/" + "views/login.html" );
});

//Render Lost & Found home page
app.get('/home', function(req, res) {
	var select_statement = "SELECT * FROM Found_Listing, User WHERE Found_Listing.User_ID = User.User_ID ORDER BY Listing_ID;"
	//var data = {

	//}
	//console.log(select_statement);
	
 	connection.query(select_statement, function(err, data) {
 		if(err) {
 			throw err;
 		}
	 res.render( __dirname + "/" + "views/Lost_and_Found_test", {db_data:data});
	 //console.log(data[1].Type);
	 });
});

app.post('/home', function(req, res) {
	
	//placeholder function, currently just redirects to home page
	//still need to add user validation
	res.redirect('/home');

});

//Render About Us page
app.get('/about', function(req, res) {
	var select_statement = "SELECT Name from User;"
	
 	connection.query(select_statement, function(err, data) {
 		if(err) {
 			throw err;
 		}
	 res.render( __dirname + "/" + "views/about", {db_data:data});
	});
});

//Render Account page
app.get('/account', function(req, res) {
	var select_active = "SELECT * FROM Found_Listing, User WHERE Found_Listing.User_ID = User.User_ID AND Active='1' AND Found_Listing.User_ID='1' ORDER BY Listing_ID;"
	var select_inactive = "SELECT * FROM Found_Listing, User WHERE Found_Listing.User_ID = User.User_ID AND Active='0' AND Found_Listing.User_ID='1' ORDER BY Listing_ID;"

 	connection.query(select_active, function(err, data) {
		connection.query(select_inactive, function(err2, data2) {
			if(err) {
				throw err;
			}
			if(err2) {
				throw err;
			}

			res.render( __dirname + "/" + "views/account", {db_data:data, db_data2:data2}); //render this page with the results of the query as the parameter
		});
	});
});

app.post('/edit_item', function(req, res) {


});

//Post listed item to database
app.post('/post_item', function(req, res) {
		var itemName = req.body.itemName;
		var itemDescription = req.body.itemDescription;
		var dateFound = req.body.dateFound;
		var locFound = req.body.locationFound;
		var dateReturned = req.body.dateReturned;
		var locReturned = req.body.locationReturned;
		var datePosted = new Date();
		var month = datePosted.getMonth();
		var day = datePosted.getDate();
		var year = datePosted.getFullYear();
		var hour = datePosted.getHours();
		var minute = datePosted.getMinutes();
		var ampm = "AM MST";
		if(hour > 12) {
			ampm = "PM MST"
			hour = hour - 12;
		}
		else if(hour == 12) {
			ampm = "PM MST";
		}
		if(minute < 10) {
			minute = "0" + minute;
		}
		var date = month + "/" + day + "/" + year + " " + hour + ":" + minute + ampm;
		//var imgLink

		var insert_statement = "INSERT INTO Found_Listing(User_ID, Type, Item_Description, Date_Found, Location_Found, Date_Returned, Location_Returned, Date_Posted) VALUES('1', '" + itemName + "','" +
		itemDescription + "','" + dateFound + "','" + locFound + "', '" + dateReturned + "', '" + locReturned + "', '" + date + "');";
		
		connection.query(insert_statement, function(err, result) {
			if(err) {
				throw err;
			}
			console.log("1 record inserted");
		});

		res.redirect('/home'); //redirects to app.get('/home' and reloads the page with the new data)
});





app.listen(8000, function () {
    console.log('Server is running.. on Port 8000');
}); //Keep listening on port 8080