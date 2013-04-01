require(["assert.js"], function(assert) {
  
  function testOK(func) {
    func();
  }
  
  function testFail(func) {
    try {
      func();
    } catch (ex) {
      return;
    }
    
    throw new Error("Exception was not thrown.");
  }
  
  // assert
  testOK(function(){ assert(true); });
  testFail(function(){ assert(false); });
  
  // ok
  testOK(function(){ assert.ok(true); });
  testOK(function(){ assert.ok(1); });
  testOK(function(){ assert.ok("abc"); });
  testOK(function(){ assert.ok({}); });
  testFail(function(){ assert.ok(false); });
  testFail(function(){ assert.ok(0); });
  testFail(function(){ assert.ok(""); });
  testFail(function(){ assert.ok(null); });
  
  // equal
  testOK(function(){ assert.equal(undefined, undefined); });
  testOK(function(){ assert.equal(true, true); });
  testOK(function(){ assert.equal(false, false); });
  testFail(function(){ assert.equal(false, true); });
  testOK(function(){ assert.equal(1, 1); });
  testOK(function(){ assert.equal(0, 0); });
  testFail(function(){ assert.equal(0, 1); });
  testOK(function(){ assert.equal("abc", "abc"); });
  testOK(function(){ assert.equal("", ""); });
  testFail(function(){ assert.equal("", "abc"); });
  testOK(function(){ var func1 = func2 = function(){}; assert.equal(func1, func2); });
  testFail(function(){ var func1 = function(){}, func2 = function(){}; assert.equal(func1, func2); });
  testOK(function(){ assert.equal(null, null); });
  testFail(function(){ assert.equal(null, {}); });
  testOK(function(){ var arr1 = arr2 = [1,2]; assert.equal(arr1, arr2); });
  testFail(function(){ var arr1 = [1,2], arr2 = [1,2]; assert.equal(arr1, arr2); });
  testOK(function(){ var date1 = date2 = new Date(); assert.equal(date1, date2); });
  testFail(function(){ var date1 = new Date(), date2 = new Date(); assert.equal(date1, date2); });
  testOK(function(){ var err1 = err2 = new Error("error"); assert.equal(err1, err2); });
  testFail(function(){ var err1 = new Error("error"), err2 = new Error("error"); assert.equal(err1, err2); });
  testOK(function(){ var regexp1 = regexp2 = /abc/gim; assert.equal(regexp1, regexp2); });
  testFail(function(){ var regexp1 = /abc/gim, regexp2 = /abc/gim; assert.equal(regexp1, regexp2); });
  testOK(function(){ var obj1 = obj2 = {a: 1, b: 2}; assert.equal(obj1, obj2); });
  testFail(function(){ var obj1 = {a: 1, b: 2}, obj2 = {a: 1, b: 2}; assert.equal(obj1, obj2); });
  // implicit type conversion.
  testOK(function(){ assert.equal(null, undefined); });
  testOK(function(){ assert.equal(1, "1"); });
  testOK(function(){ assert.equal(0, "0"); });
  testFail(function(){ assert.equal(0, "1"); });
  testOK(function(){ assert.equal(true, 1); });
  testOK(function(){ assert.equal(false, 0); });
  testFail(function(){ assert.equal(false, 1); });
  testOK(function(){ assert.equal({}, "[object Object]"); });
  testOK(function(){ assert.equal({toString: function(){return "test";}}, "test"); });
  testOK(function(){ assert.equal({valueOf: function(){return 123;}}, 123); });
  
  // not equal
  testFail(function(){ assert.notEqual(true, true); });
  testFail(function(){ assert.notEqual(false, false); });
  testOK(function(){ assert.notEqual(false, true); });
  testFail(function(){ assert.notEqual(1, 1); });
  testFail(function(){ assert.notEqual(0, 0); });
  testOK(function(){ assert.notEqual(0, 1); });
  testFail(function(){ assert.notEqual("abc", "abc"); });
  testFail(function(){ assert.notEqual("", ""); });
  testOK(function(){ assert.notEqual("", "abc"); });
  testFail(function(){ var a = {}; assert.notEqual(a, a); });
  testOK(function(){ var a = {}, b = {}; assert.notEqual(a, b); });
  testFail(function(){ assert.notEqual(null, null); });
  testOK(function(){ assert.notEqual(null, {}); });
  testFail(function(){ assert.notEqual(true, 1); });
  testFail(function(){ assert.notEqual(false, 0); });
  testOK(function(){ assert.notEqual(false, 1); });
  testFail(function(){ assert.notEqual(1, "1"); });
  testFail(function(){ assert.notEqual(0, "0"); });
  testOK(function(){ assert.notEqual(0, "1"); });
  
  // deep equal
  testOK(function(){ assert.deepEqual(true, true); });
  testOK(function(){ assert.deepEqual(false, false); });
  testFail(function(){ assert.deepEqual(false, true); });
  testOK(function(){ assert.deepEqual(1, 1); });
  testOK(function(){ assert.deepEqual(0, 0); });
  testFail(function(){ assert.deepEqual(0, 1); });
  testOK(function(){ assert.deepEqual("abc", "abc"); });
  testOK(function(){ assert.deepEqual("", ""); });
  testFail(function(){ assert.deepEqual("", "abc"); });
//  testOK(function(){ var a = {}; assert.deepEqual(a, a); });
//  testFail(function(){ var a = {}, b = {}; assert.deepEqual(a, b); });
  testOK(function(){ assert.deepEqual(null, null); });
  testFail(function(){ assert.deepEqual(null, {}); });
  testFail(function(){ assert.deepEqual(true, 1); });
  testFail(function(){ assert.deepEqual(false, 0); });
  testFail(function(){ assert.deepEqual(false, 1); });
  testFail(function(){ assert.deepEqual(1, "1"); });
  testFail(function(){ assert.deepEqual(0, "0"); });
  testFail(function(){ assert.deepEqual(0, "1"); });
  
  testOK(function(){ assert.deepEqual(undefined, undefined); });
  testOK(function(){ assert.deepEqual([], []); });
  testOK(function(){ assert.deepEqual([1,2], [1,2]); });
  testFail(function(){ assert.deepEqual("ab", ["a", "b"]); });
  testOK(function(){ var a = new Date(), b = new Date(); assert.deepEqual(a, b); });
  testFail(function(){ var a = new Date(0), b = new Date(); assert.deepEqual(a, b); });
  testOK(function(){ assert.deepEqual(/abc/, /abc/); });
  testOK(function(){ var obj1 = {a: 1, b: 2}, obj2 = {a: 1, b: 2}; assert.deepEqual(obj1, obj2); });
  
  // not deep equal
  
  // strict equal
  testOK(function(){ assert.strictEqual(true, true); });
  testOK(function(){ assert.strictEqual(false, false); });
  testFail(function(){ assert.strictEqual(false, true); });
  testOK(function(){ assert.strictEqual(1, 1); });
  testOK(function(){ assert.strictEqual(0, 0); });
  testFail(function(){ assert.strictEqual(0, 1); });
  testOK(function(){ assert.strictEqual("abc", "abc"); });
  testOK(function(){ assert.strictEqual("", ""); });
  testFail(function(){ assert.strictEqual("", "abc"); });
  testOK(function(){ var a = {}; assert.strictEqual(a, a); });
  testFail(function(){ var a = {}, b = {}; assert.strictEqual(a, b); });
  testOK(function(){ assert.strictEqual(null, null); });
  testFail(function(){ assert.strictEqual(null, {}); });
  testFail(function(){ assert.strictEqual(true, 1); });
  testFail(function(){ assert.strictEqual(false, 0); });
  testFail(function(){ assert.strictEqual(false, 1); });
  testFail(function(){ assert.strictEqual(1, "1"); });
  testFail(function(){ assert.strictEqual(0, "0"); });
  testFail(function(){ assert.strictEqual(0, "1"); });
  
  // not strict equal
  testFail(function(){ assert.notStrictEqual(true, true); });
  testFail(function(){ assert.notStrictEqual(false, false); });
  testOK(function(){ assert.notStrictEqual(false, true); });
  testFail(function(){ assert.notStrictEqual(1, 1); });
  testFail(function(){ assert.notStrictEqual(0, 0); });
  testOK(function(){ assert.notStrictEqual(0, 1); });
  testFail(function(){ assert.notStrictEqual("abc", "abc"); });
  testFail(function(){ assert.notStrictEqual("", ""); });
  testOK(function(){ assert.notStrictEqual("", "abc"); });
  testFail(function(){ var a = {}; assert.notStrictEqual(a, a); });
  testOK(function(){ var a = {}, b = {}; assert.notStrictEqual(a, b); });
  testFail(function(){ assert.notStrictEqual(null, null); });
  testOK(function(){ assert.notStrictEqual(null, {}); });
  testOK(function(){ assert.notStrictEqual(true, 1); });
  testOK(function(){ assert.notStrictEqual(false, 0); });
  testOK(function(){ assert.notStrictEqual(false, 1); });
  testOK(function(){ assert.notStrictEqual(1, "1"); });
  testOK(function(){ assert.notStrictEqual(0, "0"); });
  testOK(function(){ assert.notStrictEqual(0, "1"); });
  
  // throws
  testOK(function(){ assert.throws(function(){throw "error";}); });
  testFail(function(){ assert.throws(function(){}); });
  testOK(function(){ assert.throws(function(){throw "not found error";}, /found/); });
  testFail(function(){ assert.throws(function(){throw "not login error";}, /found/); });
  testOK(function(){ assert.throws(function(){throw new TypeError("error");}, TypeError); });
  testFail(function(){ assert.throws(function(){throw new SyntaxError("error");}, TypeError); });
  
  console.log(new Date().toString());
});
