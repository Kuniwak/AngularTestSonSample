'use strict';
describe('home', function() {
  var page={};

  beforeEach(function(done) {
    browser.get('/orderlist/index.HTML');
    page.cart = require('../../components/cart/cart.po.js');
    page.home = require('../../components/home/home.po.js');
    // 商品を2つ追加しておく
    page.home.addCartByItemRowNo('0').then(function(){
      return page.home.addCartByItemRowNo('1');
    }).then(function(){
      done();
    });
  });

  it('カートの商品を1つ削除', function(done) {
    // カードを見る
    page.home.moveCartView().then(function(){
      // カート画面に移動したら１番上の商品を削除する
      return page.cart.removeCart('0');
    }).then(function(){
      // 商品の現在数確認
      return page.cart.cartItemEl.isPresent();
    }).then(function(){
      // カートの現在数確認
      expect(page.cart.cartItemRowsEl.count()).toEqual(1);
      done();
    });
  });

  //it('should add additional amount for the product', function (done) {
  //  var purchase = page.cart.purchases.toString();
  //  var count = Number(purchase.splice(purchase.indexOf(":"), purchase.length));
  //
  //  page.home.addCartByItemRowNo('1').then(function () {
  //    return page.cart.addCart('1');
  //  }).then(function () {
  //    expect(page.cart.purchases).toBeGreaterThan(count);
  //  });
  //});

  it('should clear the items in the cart', function(done) {

    page.home.addCartByItemRowNo('1').then(function () {
      return page.home.moveCartView();
    }).then(function () {
      return page.cart.clearBtnEl;
    }).then(function (cartBtn) {
      expect(cartBtn.isPresent()).toBe(true);
      return cartBtn.click();
    }).then(function () {
      expect(page.cart.cartItemRowsEl.count()).toEqual(0);
      done();
    });

  });

});
