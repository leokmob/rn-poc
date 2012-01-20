/**
 * Module dependencies.
 */

var express = require('express');

var googl = require('goo.gl');

var TwilioClient = require('twilio').Client,
    Twiml = require('twilio').Twiml,
    creds = require('./config').Credentials,
    client = new TwilioClient(creds.sid, creds.authToken, creds.hostname, {port:3002});

console.log(TwilioClient);
console.log(Twiml);
console.log(creds);
console.log(client);

var RedNoteRepository = require('./lib/rednote-repository-memory').RedNoteRepository;

// Used: npm install mysql
// https://github.com/felixge/node-mysql
// This may be not the best or bug-free library. Simple one, though and actively developed

var Client = require('mysql').Client;
var client = new Client();

client.host = '184.72.83.204';
client.user = 'rednotemaster';
client.password = 'RedNotePassword';
client.database = "RedNoteDatabase";

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
// Used: npm install mysql
// https://github.com/felixge/node-mysql
// This may be not the best or bug-free library. Simple one, though and actively developed

var Client = require('mysql').Client;
var client = new Client();

client.host = '184.72.83.204';
client.user = 'rednotemaster';
client.password = 'RedNotePassword';
client.database = "RedNoteDatabase";

app.get('/dbtest', function(req, res){
	client.query(
	  '	select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre from RedNote rn '+
		    ' join MusicClip mc on rn.MusicClipID = mc.MusicClipID' +
		    ' join OriginalSong os on mc.OriginalSongID = os.OriginalSongID;',
	  function selectCb(err, results, fields) {
	    if (err) {
	      res.end("Error" + err);
	    }
		console.log("====================================");
		console.log("== List RedNotes with data =========");
		console.log("====================================");
	    console.log(results);
		console.log("=============================");
		console.log("=== Field Meta Data =========");
		console.log("=============================");
	    console.log(fields);
	    client.end();
	    res.end("Success");
	  }
	);
});



var redNoteRepo = new RedNoteRepository('localhost', '3306')

app.get('/', function(req, res){
  	res.render('index', {
    	title: 'Send Music SMS Demo',
		from: "+16175555555",
		to: "+1617",
		text: "Demo musical message"
	});
});

app.get('/select', function(req, res){
	redNoteRepo.findAll(function(error, redNotes){
		res.render('selectpage',{
			title: "Select Red Note",
			redNotes: redNotes
		});
	});
});

app.get('/selectdb', function(req, res){
	client.query(
	  '	select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre from RedNote rn '+
		    ' join MusicClip mc on rn.MusicClipID = mc.MusicClipID' +
		    ' join OriginalSong os on mc.OriginalSongID = os.OriginalSongID;',
	    function selectCb(err, results, fields) {
		    if (err) {
		      res.end("Error" + err);
		    }
			else {
				res.render('selectpagedb',{
					title: "Select Red Note",
					redNotes: results
				});
			}
		    client.end();
	    }
	);
});


app.get('/playPage/:text/:from', function(req, res){
	console.log(req.params);
  	res.render('playpage', {
    	title: 'Musical Message ',
		text: req.params.text,
		from: req.params.from,
		source_mp3: 'http://' + req.headers.host + '/audio/clip1.mp3'
	});
});

// Our numbers list. Add more numbers here and they'll get the message

app.post('/sendSMS', function(req, res){
	var numbers = [],
	    message = 'Demo sent you a musical message. Click this link to listen.',
	    numToSend = numbers.length,
	    numSent = 0;

	var text = req.param('textText');
	
	var toNumber = req.param('toText');
	numbers.push(toNumber);
	numToSend = numbers.length;
	
	var playUrl = 'http://' + req.headers.host + '/playPage/' + encodeURIComponent(text) + '/' + encodeURIComponent(creds.outgoing);
	console.log(playUrl);
	
	googl.shorten(playUrl, function (playShort) {	
		var phone = client.getPhoneNumber(creds.outgoing);
		phone.setup(function() {
		    for(var i = 0; i < numbers.length; i++) {
		        phone.sendSms(numbers[i], message + '   ' + playShort.id, null, function(sms) {
		            sms.once('processed', function(reqParams, response) {
		                console.log('Message processed, request params follow');
		                console.log(reqParams);
		                numSent += 1;
		                if(numSent == numToSend) {
		                    // We're done!
		                    console.log("All SMS messages are sent.");
							res.redirect("/");
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
