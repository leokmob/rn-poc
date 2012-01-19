var redNoteCounter = 1;

RedNoteRepository = function(host, port){};

RedNoteRepository.prototype.dummyData = [];

RedNoteRepository.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

RedNoteRepository.prototype.findById = function(id, callback) {
  var result = null;
  for(var i = 0; i < this.dummyData.length && result == null; i++)
    if( this.dummyData[i]._id.value == id )
      result = this.dummyData[i];
  callback(null, result);
};

RedNoteRepository.prototype.save = function(deals, callback) {
  if( !(deals instanceof Array) ) deals = [deals];
  for( var i = 0; i < deals.length; i++ ) {
    deals[i]._id = {};
	deals[i]._id.value = redNoteCounter++;
	deals[i]._id.toHexString = function () { return this.value; }
    deals[i].created_at = new Date();
	deals[i].openInfos = [];
    this.dummyData[this.dummyData.length] = deals[i];
  }
  callback(null, deals);
};

/* Lets bootstrap with dummy data */
new RedNoteRepository().save([
  {title: 'Save $1 on Crest Toothpaste', body: 'Save $1 on Crest Toothpaste, because you always need toothpaste.', fileName: ''},
  {title: 'Save $2 on Crest Toothpaste', body: 'Save $2 on Crest Toothpaste when you need on for home and one to leave at your significant others place.', fileName: ''},
  {title: 'Save $5 on Crest Toothpaste', body: 'Save $5 on Crest Toothpaste when you stock up your mountain retreat house.  $5 off when you buy 10!', fileName: ''}
], function(error, deals){});

exports.RedNoteRepository = RedNoteRepository;






