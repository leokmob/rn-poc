var messageCounter = 1;

MessageRepository = function(){};

MessageRepository.prototype.dummyData = [];

MessageRepository.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

MessageRepository.prototype.findById = function(id, callback) {
  var result = null;
  for(var i = 0; i < this.dummyData.length && result == null; i++)
    if( this.dummyData[i].MessageID == id )
      result = this.dummyData[i];
  callback(null, [result]);
};

MessageRepository.prototype.save = function(messages, callback) {
  if( !(messages instanceof Array) ) messages = [messages];
  for( var i = 0; i < messages.length; i++ ) {
	messages[i].MessageID = messageCounter++;
    this.dummyData[this.dummyData.length] = messages[i];
  }
  callback(null, notes);
};

/* Lets bootstrap with dummy data */
new MessageRepository().save([
  {RedNoteID: 1, OriginalPartnerID: 1, State: 'sent', ModifiedDate: new Date(), FromAddress: '+16171112233', ToAddress: '+16174445566', Text:'TEST MESSAGE', DateSent: new Date()},
  {RedNoteID: 2, OriginalPartnerID: 1, State: 'sent', ModifiedDate: new Date(), FromAddress: '+16171112233', ToAddress: '+16174445566', Text:'TEST MESSAGE', DateSent: new Date()},
  {RedNoteID: 3, OriginalPartnerID: 1, State: 'sent', ModifiedDate: new Date(), FromAddress: '+16171112233', ToAddress: '+16174445566', Text:'TEST MESSAGE', DateSent: new Date()},
], function(error, notes){});

exports.MessageRepository = MessageRepository;






