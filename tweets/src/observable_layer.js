var _ = require('lodash');

var rx = require("rx");

var DEFAULT_PAGE_SIZE = 200;

var pages = function(service) {
  return rx.Observable.create(function(observer) {
    service.getAllTweets().then(function(tweets) {

          for (i=0; i < tweets.length ; i = i + DEFAULT_PAGE_SIZE ){
            sliced_tweets = _.slice(tweets, i, i + DEFAULT_PAGE_SIZE);
            observer.onNext(sliced_tweets);
          }

          observer.onCompleted();
    });
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
