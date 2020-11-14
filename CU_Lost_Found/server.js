var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

//Make sure to change this section depending on what your local database connection settings are (should be different for everyone's local machine)
const dbConfig = {
	host: '127.0.0.1',
	port: 3306,
	database: 'my_db',
	user: 'root',
	password: 'root'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// lost_and_found page post found items
app.get('/', function(req, res) {
	res.render('lost_and_found',{
		local_css:"lost_found.css", 
		my_title:"Lost and Found"
	});
});