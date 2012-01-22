// Used: npm install mysql
// https://github.com/felixge/node-mysql
// This may be not the best or bug-free library. Simple one, though and actively developed
var mysql = require('mysql');

ClickEventRepository = function(dbOptions){
	this.dbOptions = dbOptions;
	if (!this.dbOptions.client){
		console.log('ClickEventRepository initializing db client');
		this.dbOptions.client = mysql.createClient(dbOptions);		
	}
};

var selectLastID = 'SELECT LAST_INSERT_ID() LAST_ID;';
var insertClickEventQuery
ClickEventRepository.prototype.dummyData = [];

ClickEventRepository.prototype.save = function(clickEvent, callback) {
	this.dbOptions.client.query(
	  	'INSERT INTO ClickEvent ' +
		' (DateTime, ' +
		' EventType, ' +
		' EndUserID, ' +
		' MessageID, ' +
		' RedNoteID, ' +
		' PartnerID, ' +
		' Hostname, ' +
		' SomeRequestParams, ' +
		' CustomerID, ' +
		' IPAddress, ' +
		' UserAgent) ' +
		' VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ',
	    [   clickEvent.EventType, 
			clickEvent.EndUserID, 
			clickEvent.MessageID, 
			clickEvent.RedNoteID, 
			clickEvent.PartnerID, 
			clickEvent.Hostname, 
			clickEvent.SomeRequestParams, 
			clickEvent.CustomerID, 
			clickEvent.IPAddress, 
			clickEvent.UserAgent
		], 
		function selectCb(err, results) {
		    if (err) {
				callback({errorCode: '1', errorMessage: 'Database error'});
		    }
			else {
				callback(null, results.insertId);
			}
	    }
	);
};

exports.ClickEventRepository = ClickEventRepository;