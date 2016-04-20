var assert = require("assert");
var Promise = require("bluebird");
var rx = require('rx');

var Service = require("../src/service");
var dataset = require("../src/fake_dataset");
var ObservableLayer = require("../src/observable_layer");


describe("Observable layer", function() {

  var service = new Service({
    delayResponse: false,
    successRate: 1.0
  });

  describe("Pages observable", function() {

    it("eventually returns all tweets", function(done) {
      var result = []
      var pages = ObservableLayer.pages(service);

      pages.subscribe(
        // onNext
        function(page) {
          assert.equal(200, page.length);
          result = result.concat(page);
        },
        // onError
        function(error) {
          assert.fail(error)
        },
        // onCompleted
        function(result) {
          //assert.deepEqual(dataset, result);
          done();
        }
      )
    });

  });
/*
  describe("Tweets observable", function() {

    it("eventually returns all tweets", function(done) {
      var result = []
      var tweets = ObservableLayer.tweets(service);

      tweets.subscribe(
        // onNext
        function(tweet) {
          result.push(tweet);
        },
        // onError
        function(error) {
          assert.fail(error)
        },
        // onCompleted
        function() {
          assert.deepEqual(dataset, result);
          done();
        }
      )
    });

    it("allows to count tweets by hashtag", function(done) {
      // TO-DO: operar con el observable de tweets para averiguar
      // la cantidad de tweets por hashtag.

      // Hacerlo con transformaciones funcinoales, no utilizar
      // estado global.
      assert.fail();
    });
  });
*/
});
