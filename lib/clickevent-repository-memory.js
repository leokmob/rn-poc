ClickEventRepository = function(){};

ClickEventRepository.prototype.dummyData = [];

ClickEventRepository.prototype.save = function(events, callback) {
  callback(null, events);
};

exports.ClickEventRepository = ClickEventRepository;






