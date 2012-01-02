/**
 * Module dependencies.
 */

var express = require('express');

var googl = require('goo.gl');

var TwilioClient = require('twilio').Client,
    Twiml = require('twilio').Twiml,
    creds = require('./config').Credentials,
    client = new TwilioClient(creds.sid, creds.authToken, creds.hostname, {port:3002});

//var phone1 = client.getPhoneNumber('+16173910669');
//
//phone1.setup(function() {
//	phone.on('incomingSms', function(smsParams, response) {
//		console.log('SMS Received:');
//		console.log(smsParams)
//	});
//});

console.log(TwilioClient);
console.log(Twiml);
console.log(creds);
console.log(client);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

	// Set a developer key (see http://goo.gl/4DvFk for more info.)
	// My API Project: https://code.google.com/apis/console/b/2/#project:579090106582:access
	googl.setKey('AIzaSyA17gZAYe1yKH88jtsQDP3SXxHF7vEu_uo');
});

app.configure('production', function(){
  app.use(express.errorHandler()); 

	// Set a developer key (see http://goo.gl/4DvFk for more info.)
	// My API Project: https://code.google.com/apis/console/b/2/#project:579090106582:access
	googl.setKey('AIzaSyA17gZAYe1yKH88jtsQDP3SXxHF7vEu_uo');
});

// Routes

app.get('/', function(req, res){
  	// Shorten a long url and output the result
	googl.shorten('https://github.com/kaimallea/node-googl', function (googleShort) {
		googl.shorten('http://' + req.headers.host + '/', function (localShort) {
		  	res.render('index', {
		    	title: 'Short URLS',
				googleShort: googleShort.id,
				localShort: localShort.id
			});
		});
	});	
});

app.get('/playPage', function(req, res){
  	res.render('playpage', {
    	title: 'Musical Message ',
		googleShort: "googleShort.id",
		localShort: "localShort.id"
	});
});


// Our numbers list. Add more numbers here and they'll get the message
var numbers = ['+16173598359'],
    message = 'Leo sent you a musical message ',
    numToSend = numbers.length,
    numSent = 0;

app.get('/sendSMS', function(req, res){
	var phone = client.getPhoneNumber(creds.outgoing);	
	googl.shorten('http://' + req.headers.host + '/playPage', function (playShort) {	
		phone.setup(function() {
		    // We'll SMS each of the numbers in 'numbers', sending them the message
		    for(var i = 0; i < numbers.length; i++) {
			    console.log("URL: " + playShort.id);
		        phone.sendSms(numbers[i], message + '   ' + playShort.id, null, function(sms) {
					console.log("sending SMS");
		            sms.once('processed', function(reqParams, response) {
		                console.log('Message processed, request params follow');
		                console.log(reqParams);
		                numSent += 1;
		                if(numSent == numToSend) {
		                    // We're done!
		                    console.log("All SMS messages are sent.");
		                }
		            });
		        });
		    }
		});	
	});	
});

app.post('/receiveSMS', function(req, res){
	console.log("POST ------------------");
	console.log("incoming SMS !!!");
	console.log("From: " + req.body.From);
	console.log("To:   " + req.body.To);
	console.log("Text: " + req.body.Body);
	console.log("POST ------------------");	
});

app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
