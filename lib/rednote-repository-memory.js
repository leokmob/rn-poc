var redNoteCounter = 1;

RedNoteRepository = function(){};

RedNoteRepository.prototype.dummyData = [];

RedNoteRepository.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

RedNoteRepository.prototype.findById = function(id, callback) {
  var result = null;
  for(var i = 0; i < this.dummyData.length && result == null; i++)
    if( this.dummyData[i].RedNoteID == id )
      result = this.dummyData[i];
  callback(null, [result]);
};

RedNoteRepository.prototype._save = function(notes, callback) {
  if( !(notes instanceof Array) ) notes = [notes];
  for( var i = 0; i < notes.length; i++ ) {
	notes[i].RedNoteID = redNoteCounter++;
    this.dummyData[this.dummyData.length] = notes[i];
  }
  callback(null, notes);
};

/* Lets bootstrap with dummy data */
new RedNoteRepository()._save([
  {Name: 'Memory 1', Lyrics: 'Memory lyrics 1', Mood: 'Memory mood 1', SubMood: 'Memory submood 1', TimeMS: '1000', FileURL: 'http://memory.com/fid=1', Genre:'Memory', PurchaseURL: 'http://purchase-memory.com/sid=1&pid=1'},
  {Name: 'Memory 2', Lyrics: 'Memory lyrics 2', Mood: 'Memory mood 2', SubMood: 'Memory submood 2', TimeMS: '2000', FileURL: 'http://memory.com/fid=2', Genre:'Memory', PurchaseURL: 'http://purchase-memory.com/sid=2&pid=1'},
  {Name: 'Memory 3', Lyrics: 'Memory lyrics 3', Mood: 'Memory mood 3', SubMood: 'Memory submood 3', TimeMS: '3000', FileURL: 'http://memory.com/fid=3', Genre:'Memory', PurchaseURL: 'http://purchase-memory.com/sid=3&pid=1'},
], function(error, notes){});

exports.RedNoteRepository = RedNoteRepository;






