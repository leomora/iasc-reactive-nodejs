var rx = require("rx");

var DEFAULT_PAGE_SIZE = 200;

var pages = function(service) {
  return rx.Observable.create(function(observer) {
    // TO-DO
  });
}

var tweets = function(service) {
  // TO-DO
  return rx.Observable.from([]);
};

module.exports = {
  pageSize: function() { return DEFAULT_PAGE_SIZE },
  pages: pages,
  tweets: tweets
}
