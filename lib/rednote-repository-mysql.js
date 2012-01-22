// Used: npm install mysql
// https://github.com/felixge/node-mysql
// This may be not the best or bug-free library. Simple one, though and actively developed
var mysql = require('mysql');

RedNoteRepository = function(dbOptions){
	this.dbOptions = dbOptions;
	if (!this.dbOptions.client){
		console.log('RedNoteRepository initializing db client');
		this.dbOptions.client = mysql.createClient(dbOptions);		
	}
};

var baseRednoteQuery = ' select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre, ss.PurchaseURL' +
					   ' from RedNote rn' +
						    ' join MusicClip mc on rn.MusicClipID = mc.MusicClipID' +
						    ' join OriginalSong os on mc.OriginalSongID = os.OriginalSongID' +
						    ' join SongStore ss on ss.OriginalSongID = mc.OriginalSongID';
RedNoteRepository.prototype.findAll = function(callback) {
	var _client = this.dbOptions.client;
	_client.query(baseRednoteQuery,
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

RedNoteRepository.prototype.findById = function(id, callback) {
	var _client = this.dbOptions.client;
	_client.query(baseRednoteQuery + ' where rn.RedNoteID=' + id,
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

exports.RedNoteRepository = RedNoteRepository;






