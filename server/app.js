// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');
var locwrapper = require('./modules/locwrapper.js');
var bodyParser = require('body-parser');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
//var cfenv = require('cfenv');

// create a new express server
var app = express();

// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*
var hostname = appEnv.bind;
var hostport = appEnv.port || 3000;
*/

var hostname = 'localhost';
var hostport = 3100;


// NODE server should not exit in case of any failure/crash
process.on('uncaughtException', function (error) {
   console.log(error.stack);
});

// start server on the specified port and binding host
app.listen(hostport, hostname, function() {
	// print a message when the server starts listening
  console.log( 'server started... on ' + hostname + ',' + hostport);
});


app.get('/', function(req, res){
	res.redirect('index.html');
});

app.post( '/initiate_loc', function(req, res){
  console.log( 'Into initiate Loc API: ' + JSON.stringify(req.body));
  locwrapper.initiateLoc( req.body, function(result){
		res.send(result).end();
	});
});
