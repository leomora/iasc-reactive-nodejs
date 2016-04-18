var _ = require('lodash');
var Chance = require('chance');

var generator = new Chance();

function fakeDate() {
  var lowerBound = new Date(2006,6,1).getTime();
  var upperBound = new Date().getTime();
  var timestamp =  lowerBound + Math.random() * (upperBound - lowerBound);
  return new Date(timestamp);
}

function fakeTweet(tags) {
  var text = generator.sentence({words:5});
  var tags = _.sampleSize([
              "#nodejs",
              "#rxjs",
              "#iasc",
              "#async",
              "#reactiveFTW"
            ], 3);

  return {
    date: fakeDate(),
    author: generator.twitter(),
    country: generator.country(),
    retweets: generator.integer({min: 0, max: 100}),
    text: _.concat([text], tags).join(' ')
  }
}

function buildDataset(size) {
  var tweets =  _.range(size).map(fakeTweet);
  return _.sortBy(tweets, 'date');
}

module.exports = buildDataset(1000);
