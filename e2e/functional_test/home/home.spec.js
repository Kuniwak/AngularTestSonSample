'use strict';

describe('home (order list)', function() {
  var page={};
  function fail(){
    expect("Not fail").toBe("but fail.");
  }

  beforeEach(function() {
    browser.get('/orderlist/index.HTML');
    page.home = require('../../components/home/home.po');
  });

  it('カートに商品を1つ追加', function(done) {
    page.home.addCart('1').then(function(){
      // TODO: 表示する内容のテストはNG
      expect(page.home.viewcartBtnEl.getText()).toBe('カートを見る (1)');
      done();
    });
  });

  it('カートに商品を2つ追加', function(done) {
    page.home.addCart('1').then(function(){
      return page.home.addCart('2');
    }).then(function(){
      expect(page.home.viewcartBtnEl.getText()).toBe('カートを見る (2)');
      done();
    });
  });

  it('Must not press without adding to cart', function(done) {
    page.home.viewcartBtnEl.getAttribute('disabled').then(function(isDisabled){
      // When fail "Expected null to be 'true'."
      expect(isDisabled).not.toBe(null);
      done();
    },
    function(res){
      fail();
      done();
    });
  });
});
