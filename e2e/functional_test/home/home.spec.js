'use strict';

describe('home (order list)', function() {
  var page={};
  function fail(){
    expect("Not fail").toBe("but fail.");
  }

  beforeEach(function() {
    browser.get('/orderlist/index.HTML');
    page.home = require('../../components/home/home.po.js');
  });

  it('Add item in cart', function(done) {
    page.home.addCartByItemRowNo('1').then(function(){
      expect(page.home.viewcartBtnEl.getText()).toMatch(/\d+/);
      done();
    });
  });

  it('Must not press without adding to cart', function(done) {
    page.home.viewcartBtnEl.isPresent().then(function(isPresent) {
      expect(isPresent).toBe(true);
    }).then(function() {
      return page.home.viewcartBtnEl.getAttribute('disabled');
    }).then(function(isDisabled){
      // When fail "Expected null to be 'true'."
      expect(isDisabled).not.toBe(null);
      done();
    });
  });
});
