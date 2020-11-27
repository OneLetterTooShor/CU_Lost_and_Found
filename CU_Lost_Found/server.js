/////MODULES//////
var http = require('http');
var express = require('express'); //Ensure our express framework has been added
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.text());
app.use(cookieParser());
app.use(session({secret: "shhhhh", saveUninitialized: true,resave: true}));
//////////////////

// set the view engine to ejs
app.set('view engine', 'ejs');
//use relative paths and access our resources directory (for the GETS and POSTS)
app.use(express.static(__dirname + '/'));

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
const { equal, notDeepEqual } = require('assert');
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
////////////////////////


//Render Login page (this is the first page users see, they must login before gaining access to the site)
app.get('/', function(req, res) {
	res.render( __dirname + "/" + "views/login", {message:''});
});

app.post('/', function(req, res) { //when user logs in, their data is checked against the database 
	
	var email = req.body.emailLoginInput;
	var password = req.body.passwordLoginInput;

	// loop through all User table [Email] and see if equal to var
	// 	if it is, check corresponding password
	// 		if those equal, redirect to home
	// 	if not equal, invalid alert

	var query = "SELECT Email, Password FROM User WHERE Email='" + email + "' AND Password='" + password + "';";

	connection.query(query, function(err, data) {
		if(err) {
			throw err;
		}
		if(data.length == 0)
		{
			//alert("Invalid Credentials! Please try again.");
			res.render(__dirname + "/" + "views/login", {message: 'Invalid Credentials! Please try again.'});
		}
		else
		{
			var currentUserDataQuery = "SELECT * FROM User WHERE Email='" + email + "';";
			connection.query(currentUserDataQuery, function(err, currUserData){

				console.log(currUserData[0].User_ID);
				req.session.currentUserID = currUserData[0].User_ID;
				req.session.currentUserPassword = currUserData[0].Password;
				req.session.currentUserEmail = currUserData[0].Email;
				req.session.currentUserName = currUserData[0].Name;
				req.session.currentUserPhone = currUserData[0].Phone;
				req.session.currentUserAdmin = currUserData[0].Admin;

				// console.log(req.session.currentUserID);
				// console.log(req.session.currentUserPassword);
				// console.log(req.session.currentUserEmail);
				// console.log(req.session.currentUserName);
				// console.log(req.session.currentUserPhone);
				// console.log(req.session.currentUserAdmin);
				res.redirect('/home');
			});
			
		}
   });

});

app.post('/register', function(req, res){

	var email = req.body.registerEmail;
	var name = req.body.registerName;
	var phone = req.body.registerPhone;
	var pass = req.body.registerPassword;

	var uniqueEmail = "SELECT Email FROM User WHERE Email='" + email + "';";
	connection.query(uniqueEmail, function(err, data) {
		if(err) {
			throw err;
		}
		if(data.length == 0)
		{
			console.log("email unique");	
			var insertQuery = "INSERT INTO User(Password, Email, Name, Phone, Admin) VALUES('" + pass + "','" + email + "','" + name + "','" + phone + "', '0');";

			connection.query(insertQuery, function(err, result) {
				if(err) {
					throw err;
				}
				console.log("new user added");
			});
			//res.redirect('/');//login with your new credentials
			res.render(__dirname + "/" + "views/login", {message: 'Your account has been created. Please login with your new credentials.'});
		}
		else
		{
			console.log("email not unique - abort");
			//alert("Email already in use! Please try again.");
			res.render(__dirname + "/" + "views/login", {message: 'Email already in use! Please try again.'});
		}
   });

});

//Render Lost & Found home page
app.get('/home', function(req, res) {
	if (!req.session.currentUserName) //only logged  in users can go to other pages
	{
		res.render(__dirname + "/" + "views/login", {message: 'You must login to use this service!'});
	}

	var select_statement = "SELECT * FROM Found_Listing ORDER BY Listing_ID;"
	
	

 	connection.query(select_statement, function(err, data) {
 		if(err) {
 			throw err;
		 }
	 res.render( __dirname + "/" + "views/Lost_and_Found_test", {db_data:data, message: req.session.currentUserName});

	 //console.log(data[1].Type);
	 });
});

app.post('/home', function(req, res) {

	var select_statement = "SELECT * FROM Found_Listing ORDER BY Listing_ID;"
	
 	connection.query(select_statement, function(err, data) {
 		if(err) {
 			throw err;
 		}
	 res.render( __dirname + "/" + "views/Lost_and_Found_test", {db_data:data, message: req.session.currentUserName});
	 //console.log(data[1].Type);
	 });
});

//Render search results on Lost & Found page
app.post('/search', function(req, res) {
	var searchTerm = req.body.searchBox;
	console.log(searchTerm);

	var select_statement = "SELECT * FROM Found_Listing WHERE Type LIKE '%" + searchTerm + "%' OR Item_Description LIKE'%" + searchTerm + "%' OR Date_Found LIKE '%" + searchTerm + "%' OR Location_Found LIKE '%" + searchTerm + "%' ORDER BY Listing_ID;"

	
 	connection.query(select_statement, function(err, data) {
 		if(err) {
 			throw err;
		 }
	console.log(data);
	 res.render( __dirname + "/" + "views/Lost_and_Found_test", {db_data:data, message: req.session.currentUserName});
	 });
});

//Render About Us page
app.get('/about', function(req, res) {
	if (!req.session.currentUserName) //only logged  in users can go to other pages
	{
		res.render(__dirname + "/" + "views/login", {message: 'You must login to use this service!'});
	}
	var select_statement = "SELECT Name from User;"
	
 	connection.query(select_statement, function(err, data) {
 		if(err) {
 			throw err;
 		}
	 res.render( __dirname + "/" + "views/about", {db_data:data, message: req.session.currentUserName});
	});
});

//Render Account page
app.get('/account', function(req, res) {
	if (!req.session.currentUserName) //only logged  in users can go to other pages
	{
		res.render(__dirname + "/" + "views/login", {message: 'You must login to use this service!'});
	}

	if(req.session.currentUserAdmin == 0) { 
		var select_active = "SELECT * FROM Found_Listing, User WHERE Found_Listing.User_ID = User.User_ID AND User.User_ID ='" + req.session.currentUserID + "' AND Active='1' ORDER BY Listing_ID;"
		var select_inactive = "SELECT * FROM Found_Listing, User WHERE Found_Listing.User_ID = User.User_ID AND User.User_ID ='" + req.session.currentUserID + "'  AND Active='0' ORDER BY Listing_ID;"

		connection.query(select_active, function(err, data) {
			connection.query(select_inactive, function(err2, data2) {
				if(err) {
					throw err;
				}
				if(err2) {
					throw err;
				}

				res.render( __dirname + "/" + "views/account", {db_data:data, db_data2:data2, userAdmin: req.session.currentUserAdmin, message: req.session.currentUserName, message2: req.session.currentUserEmail, message3: req.session.currentUserPhone, message4: req.session.currentUserPassword}); //render this page with the results of the query as the parameter
			});
		});
	}

	else if(req.session.currentUserAdmin == 1) {
		var select_active = "SELECT * FROM Found_Listing, User WHERE Found_Listing.User_ID = User.User_ID AND Active='1' ORDER BY Listing_ID;"
		var select_inactive = "SELECT * FROM Found_Listing, User WHERE Found_Listing.User_ID = User.User_ID AND Active='0' ORDER BY Listing_ID;"

		connection.query(select_active, function(err, data) {
			connection.query(select_inactive, function(err2, data2) {
				if(err) {
					throw err;
				}
				if(err2) {
					throw err;
				}

				res.render( __dirname + "/" + "views/account", {db_data:data, db_data2:data2, userAdmin: req.session.currentUserAdmin, message: req.session.currentUserName, message2: req.session.currentUserEmail, message3: req.session.currentUserPhone, message4: req.session.currentUserPassword}); //render this page with the results of the query as the parameter
			});
		});

	}
});

app.post('/edit_type', function(req, res) {
	var listingID = req.body.listingID_Type;
	var newItemName = req.body.itemName;

	console.log(listingID, newItemName);

	var select_listing = "UPDATE Found_Listing SET Type='" + newItemName + "' WHERE Listing_ID='" + listingID + "';"

	connection.query(select_listing, function(err, data) {
		if(err) {
			throw err;
		}
		console.log(data);
	});

	res.redirect('/account');
});

app.post('/edit_description', function(req, res) {
	var listingID = req.body.listingID_Desc;
	var newItemDesc = req.body.itemDesc;

	console.log(listingID, newItemDesc);

	var select_listing = "UPDATE Found_Listing SET Item_Description ='" + newItemDesc + "' WHERE Listing_ID='" + listingID + "';"

	connection.query(select_listing, function(err, data) {
		if(err) {
			throw err;
		}
		console.log(data);
	});

	res.redirect('/account');
});

app.post('/edit_date_found', function(req, res) {
	var listingID = req.body.listingID_DateFound;
	var newItemDateFound = req.body.dateFound;

	console.log(listingID, newItemDateFound);

	var select_listing = "UPDATE Found_Listing SET Date_Found ='" + newItemDateFound + "' WHERE Listing_ID='" + listingID + "';"

	connection.query(select_listing, function(err, data) {
		if(err) {
			throw err;
		}
		console.log(data);
	});

	res.redirect('/account');
});

app.post('/edit_location_found', function(req, res) {
	var listingID = req.body.listingID_LocFound;
	var newItemLocFound = req.body.locFound;

	console.log(listingID, newItemLocFound);

	var select_listing = "UPDATE Found_Listing SET Location_Found ='" + newItemLocFound + "' WHERE Listing_ID='" + listingID + "';"

	connection.query(select_listing, function(err, data) {
		if(err) {
			throw err;
		}
		console.log(data);
	});

	res.redirect('/account');
});

app.post('/edit_date_returned', function(req, res) {
	var listingID = req.body.listingID_DateRet;
	var newDateReturned = req.body.dateReturned;

	console.log(listingID, newDateReturned);

	var select_listing = "UPDATE Found_Listing SET Date_Returned ='" + newDateReturned + "' WHERE Listing_ID='" + listingID + "';"

	connection.query(select_listing, function(err, data) {
		if(err) {
			throw err;
		}
		console.log(data);
	});

	res.redirect('/account');
});

app.post('/edit_location_returned', function(req, res) {
	var listingID = req.body.listingID_LocRet;
	var newLocRet = req.body.locationReturned;

	console.log(listingID, newLocRet);

	var select_listing = "UPDATE Found_Listing SET Location_Returned ='" + newLocRet + "' WHERE Listing_ID='" + listingID + "';"

	connection.query(select_listing, function(err, data) {
		if(err) {
			throw err;
		}
		console.log(data);
	});

	res.redirect('/account');
});

app.post('/item_claimed', function(req, res) {
	var listingID = req.body.inactiveItem;

	console.log(listingID);

	var select_listing = "UPDATE Found_Listing SET Active ='0' WHERE Listing_ID='" + listingID + "';"
	var addToClaimedItems = "INSERT INTO Closed_Item(Listing_ID, Claimant_ID) VALUES('" + listingID + "', '123');"

	connection.query(select_listing, function(err, result) {
		if(err) {
			throw err;
		}
	});

	connection.query(addToClaimedItems, function(err, result) {
		if(err) {
			throw err;
		}
	});

	res.redirect('/account');
});

app.post('/restore_item', function(req, res) {
	var listingID = req.body.restoreItem;

	console.log(listingID);

	var restoreThis = "UPDATE Found_Listing SET Active ='1' WHERE Listing_ID='" + listingID + "';"
	var removeClaimedStatus = "DELETE FROM Closed_Item WHERE Listing_ID='" + listingID + "';"

	connection.query(restoreThis, function(err, result) {
		if(err) {
			throw err;
		}
	});

	connection.query(removeClaimedStatus, function(err, result) {
		if(err) {
			throw err;
		}
	});

	res.redirect('/account');
});

app.post('/delete_item', function(req, res) {
	var listingID = req.body.deleteItem;

	console.log(listingID);

	var select_listing = "DELETE FROM Found_Listing WHERE Listing_ID='" + listingID + "';"

	connection.query(select_listing, function(err, result) {
		if(err) {
			throw err;
		}
	});

	res.redirect('/account');
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

app.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/');
});




app.listen(8000, function () {
    console.log('Server is running.. on Port 8000');
}); //Keep listening on port 8080