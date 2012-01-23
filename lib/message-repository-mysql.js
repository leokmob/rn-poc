// Used: npm install mysql
// https://github.com/felixge/node-mysql
// This may be not the best or bug-free library. Simple one, though and actively developed
var mysql = require('mysql');

MessageRepository = function(dbOptions){
	this.dbOptions = dbOptions;
	if (!this.dbOptions.client){
		console.log('MessageRepository initializing db client');
		this.dbOptions.client = mysql.createClient(dbOptions);		
	}
};

var baseMessageQuery = ' select m.* from Message m';

MessageRepository.prototype.findAll = function(callback) {
	var _client = this.dbOptions.client;
	_client.query(baseMessageQuery,
	    function selectCb(err, results, fields) {
		    if (err) {
				console.log('... Database error:');
				console.log(err);
				console.log('... ');
				callback({errorCode: '1', errorMessage: 'Database error'});
		    }
			else {
				callback(null, results);
			}
	    }
	);
};

MessageRepository.prototype.findById = function(id, callback) {
	var _client = this.dbOptions.client;
	_client.query(baseMessageQuery + ' where m.MessageID=' + id,
	    function selectCb(err, results, fields) {
		    if (err) {
				console.log('... Database error:');
				console.log(err);
				console.log('... ');
				callback({errorCode: '1', errorMessage: 'Database error'});
		    }
			else {
				callback(null, results);
			}
	    }
	);
};

MessageRepository.prototype.save = function(message, callback) {
	this.dbOptions.client.query(
	  	'INSERT INTO Message ' +
		' (RedNoteID, ' +
		' OriginPartnerID, ' +
		' State, ' +
		' ModifiedDate, ' +
		' FromAddress, ' +
		' ToAddress, ' +
		' Text, ' +
		' DateSent, ' +
		' IsSponsorMessage, ' +
		' CreatedByUserID, ' +
		' EndUserID) ' +
		' VALUES (?, ?, ?, NOW(), ?, ?, ?, NOW(), ?, ?, ?); ',
	    [   message.RedNoteID, 
			message.OriginPartnerID, 
			message.State, 
			message.FromAddress, 
			message.ToAddress, 
			message.Text, 
			message.IsSponsorMessage, 
			message.CreatedByUserID,
			message.EndUserID
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

MessageRepository.prototype.changeState = function(messageID, state, callback) {
	this.dbOptions.client.query(
	  	'UPDATE Message SET State=? WHERE MessageID=?',
	    [   state, 
			messageID
		], 
		function selectCb(err, results) {
		    if (err) {
				callback({errorCode: '1', errorMessage: 'Database error'});
		    }
			else {
				callback(null, messageID);
			}
	    }
	);
};

exports.MessageRepository = MessageRepository;






