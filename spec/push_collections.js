var assert = require("assert");
var rx = require("rx");

describe("collection-like API", function() {

  before(function() {
    Array.prototype.flatMap = function(f) {
      return this.reduce(function(ret, x) { return ret.concat(f(x)) }, []);
    }
  });

  var PRODUCTS = [
      { category: "Sports", price: 1000.0, title: "Camiseta de Boca" },
      { category: "Audio",  price: 3000.0, title: "Pasacasette para auto como nuevo" },
      { category: "Sports", price: 20.0,   title: "Pelota de tennis" },
    ];

  it("can be transformed with common collection operators", function(done) {
    rx.Observable.from(PRODUCTS)
                 .filter(function(p) { return p.category === "Sports"; })
                 .map(function(p)    { return p.price; })
                 .sum()
                 .subscribe(function(result) {
                   assert.equal(1020.0, result);
                   done();
                 });
  });

  it("can be transformed with common collection operators (cont.)", function(done) {

    function questions(product) {
      return [
        `¿Cuánto cuesta ese ${product.title}?`,
        `¿Te sirven ${product.price * 0.8} en mano?`,
      ];
    }

    var expectedQuestions = PRODUCTS.flatMap(questions)

    rx.Observable.from(PRODUCTS)
                 .flatMap(questions)
                 .toArray()
                 .subscribe(function(allQuestions) {
                   assert.deepEqual(expectedQuestions, allQuestions);
                   done();
                 });
  });

});

