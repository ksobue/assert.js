require(["assert.js"], function(assert) {
  
  function fail(msg) {
    document.body.style.backgroundColor = "red";
    document.body.innerHTML = msg;
    
    if (window.console && window.console.error) {
      console.error(msg);
    } else {
      throw new Error(msg);
    }
  }
  
  function testOK(func) {
    try {
      func();
    } catch (ex) {
      fail("Exception was thrown unexpectedly.");
    }
  }
  
  function testFail(func) {
    try {
      func();
    } catch (ex) {
      return;
    }
    
    fail("Exception was not thrown unexpectedly.");
  }
  
  function testMessage(failingFunc, expectedMsg) {
    try {
      failingFunc();
    } catch (ex) {
      if (ex.message !== expectedMsg) {
        fail("Assertion message was different from the expected.");
      }
      return;
    }
    
    fail("Exception was not thrown unexpectedly.");
  }
  
  // assert
  testOK(function(){ assert(true); });
  testFail(function(){ assert(false); });
  // (message)
  testMessage(function(){ assert(false); }, "(no assert message)");
  testMessage(function(){ assert(false, "test message"); }, "test message");
  
  // ok
  testOK(function(){ assert.ok(true); });
  testOK(function(){ assert.ok(1); });
  testOK(function(){ assert.ok("abc"); });
  testOK(function(){ assert.ok({}); });
  testFail(function(){ assert.ok(false); });
  testFail(function(){ assert.ok(0); });
  testFail(function(){ assert.ok(""); });
  testFail(function(){ assert.ok(null); });
  // (message)
  testMessage(function(){ assert.ok(false); }, "(no assert message)");
  testMessage(function(){ assert.ok(false, "test message"); }, "test message");
  
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
  // (implicit type conversions)
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
  // (message)
  testMessage(function(){ assert.equal(1, 2); }, "(no assert message)");
  testMessage(function(){ assert.equal(1, 2, "test message"); }, "test message");
  
  // not equal
  testFail(function(){ assert.notEqual(undefined, undefined); });
  testFail(function(){ assert.notEqual(true, true); });
  testFail(function(){ assert.notEqual(false, false); });
  testOK(function(){ assert.notEqual(false, true); });
  testFail(function(){ assert.notEqual(1, 1); });
  testFail(function(){ assert.notEqual(0, 0); });
  testOK(function(){ assert.notEqual(0, 1); });
  testFail(function(){ assert.notEqual("abc", "abc"); });
  testFail(function(){ assert.notEqual("", ""); });
  testOK(function(){ assert.notEqual("", "abc"); });
  testFail(function(){ var func1 = func2 = function(){}; assert.notEqual(func1, func2); });
  testOK(function(){ var func1 = function(){}, func2 = function(){}; assert.notEqual(func1, func2); });
  testFail(function(){ assert.notEqual(null, null); });
  testOK(function(){ assert.notEqual(null, {}); });
  testFail(function(){ var arr1 = arr2 = [1,2]; assert.notEqual(arr1, arr2); });
  testOK(function(){ var arr1 = [1,2], arr2 = [1,2]; assert.notEqual(arr1, arr2); });
  testFail(function(){ var date1 = date2 = new Date(); assert.notEqual(date1, date2); });
  testOK(function(){ var date1 = new Date(), date2 = new Date(); assert.notEqual(date1, date2); });
  testFail(function(){ var err1 = err2 = new Error("error"); assert.notEqual(err1, err2); });
  testOK(function(){ var err1 = new Error("error"), err2 = new Error("error"); assert.notEqual(err1, err2); });
  testFail(function(){ var regexp1 = regexp2 = /abc/gim; assert.notEqual(regexp1, regexp2); });
  testOK(function(){ var regexp1 = /abc/gim, regexp2 = /abc/gim; assert.notEqual(regexp1, regexp2); });
  testFail(function(){ var obj1 = obj2 = {a: 1, b: 2}; assert.notEqual(obj1, obj2); });
  testOK(function(){ var obj1 = {a: 1, b: 2}, obj2 = {a: 1, b: 2}; assert.notEqual(obj1, obj2); });
  // (implicit type conversions)
  testFail(function(){ assert.notEqual(null, undefined); });
  testFail(function(){ assert.notEqual(1, "1"); });
  testFail(function(){ assert.notEqual(0, "0"); });
  testOK(function(){ assert.notEqual(0, "1"); });
  testFail(function(){ assert.notEqual(true, 1); });
  testFail(function(){ assert.notEqual(false, 0); });
  testOK(function(){ assert.notEqual(false, 1); });
  testFail(function(){ assert.notEqual({}, "[object Object]"); });
  testFail(function(){ assert.notEqual({toString: function(){return "test";}}, "test"); });
  testFail(function(){ assert.notEqual({valueOf: function(){return 123;}}, 123); });
  // (message)
  testMessage(function(){ assert.notEqual(1, 1); }, "(no assert message)");
  testMessage(function(){ assert.notEqual(1, 1, "test message"); }, "test message");
  
  // deep equal
  testOK(function(){ assert.deepEqual(undefined, undefined); });
  testOK(function(){ assert.deepEqual(true, true); });
  testOK(function(){ assert.deepEqual(false, false); });
  testFail(function(){ assert.deepEqual(false, true); });
  testOK(function(){ assert.deepEqual(1, 1); });
  testOK(function(){ assert.deepEqual(0, 0); });
  testFail(function(){ assert.deepEqual(0, 1); });
  testOK(function(){ assert.deepEqual("abc", "abc"); });
  testOK(function(){ assert.deepEqual("", ""); });
  testFail(function(){ assert.deepEqual("", "abc"); });
  testOK(function(){ var func1 = func2 = function(){}; assert.deepEqual(func1, func2); });
  testFail(function(){ var func1 = function(){}, func2 = function(){}; assert.deepEqual(func1, func2); });
  testOK(function(){ assert.deepEqual(null, null); });
  testFail(function(){ assert.deepEqual(null, {}); });
  testOK(function(){ var arr1 = arr2 = [1,2]; assert.deepEqual(arr1, arr2); });
  testOK(function(){ var arr1 = [1,2], arr2 = [1,2]; assert.deepEqual(arr1, arr2); });
  testOK(function(){ var date1 = date2 = new Date(); assert.deepEqual(date1, date2); });
  testOK(function(){ var date1 = new Date(), date2 = new Date(); assert.deepEqual(date1, date2); });
  testOK(function(){ var err1 = err2 = new Error("error"); assert.deepEqual(err1, err2); });
  testOK(function(){ var err1 = new Error("error"), err2 = new Error("error"); assert.deepEqual(err1, err2); });
  testOK(function(){ var regexp1 = regexp2 = /abc/gim; assert.deepEqual(regexp1, regexp2); });
  testOK(function(){ var regexp1 = /abc/gim, regexp2 = /abc/gim; assert.deepEqual(regexp1, regexp2); });
  testOK(function(){ var obj1 = obj2 = {a: 1, b: 2}; assert.deepEqual(obj1, obj2); });
  testOK(function(){ var obj1 = {a: 1, b: 2}, obj2 = {a: 1, b: 2}; assert.deepEqual(obj1, obj2); });
  // (implicit type conversions)
  testFail(function(){ assert.deepEqual(null, undefined); });
  testFail(function(){ assert.deepEqual(1, "1"); });
  testFail(function(){ assert.deepEqual(0, "0"); });
  testFail(function(){ assert.deepEqual(0, "1"); });
  testFail(function(){ assert.deepEqual(true, 1); });
  testFail(function(){ assert.deepEqual(false, 0); });
  testFail(function(){ assert.deepEqual(false, 1); });
  testFail(function(){ assert.deepEqual({}, "[object Object]"); });
  testFail(function(){ assert.deepEqual({toString: function(){return "test";}}, "test"); });
  testFail(function(){ assert.deepEqual({valueOf: function(){return 123;}}, 123); });
  // (message)
  testMessage(function(){ assert.deepEqual(1, 2); }, "(no assert message)");
  testMessage(function(){ assert.deepEqual(1, 2, "test message"); }, "test message");
  
  // not deep equal
  testFail(function(){ assert.notDeepEqual(undefined, undefined); });
  testFail(function(){ assert.notDeepEqual(true, true); });
  testFail(function(){ assert.notDeepEqual(false, false); });
  testOK(function(){ assert.notDeepEqual(false, true); });
  testFail(function(){ assert.notDeepEqual(1, 1); });
  testFail(function(){ assert.notDeepEqual(0, 0); });
  testOK(function(){ assert.notDeepEqual(0, 1); });
  testFail(function(){ assert.notDeepEqual("abc", "abc"); });
  testFail(function(){ assert.notDeepEqual("", ""); });
  testOK(function(){ assert.notDeepEqual("", "abc"); });
  testFail(function(){ var func1 = func2 = function(){}; assert.notDeepEqual(func1, func2); });
  testOK(function(){ var func1 = function(){}, func2 = function(){}; assert.notDeepEqual(func1, func2); });
  testFail(function(){ assert.notDeepEqual(null, null); });
  testOK(function(){ assert.notDeepEqual(null, {}); });
  testFail(function(){ var arr1 = arr2 = [1,2]; assert.notDeepEqual(arr1, arr2); });
  testFail(function(){ var arr1 = [1,2], arr2 = [1,2]; assert.notDeepEqual(arr1, arr2); });
  testFail(function(){ var date1 = date2 = new Date(); assert.notDeepEqual(date1, date2); });
  testFail(function(){ var date1 = new Date(), date2 = new Date(); assert.notDeepEqual(date1, date2); });
  testFail(function(){ var err1 = err2 = new Error("error"); assert.notDeepEqual(err1, err2); });
  testFail(function(){ var err1 = new Error("error"), err2 = new Error("error"); assert.notDeepEqual(err1, err2); });
  testFail(function(){ var regexp1 = regexp2 = /abc/gim; assert.notDeepEqual(regexp1, regexp2); });
  testFail(function(){ var regexp1 = /abc/gim, regexp2 = /abc/gim; assert.notDeepEqual(regexp1, regexp2); });
  testFail(function(){ var obj1 = obj2 = {a: 1, b: 2}; assert.notDeepEqual(obj1, obj2); });
  testFail(function(){ var obj1 = {a: 1, b: 2}, obj2 = {a: 1, b: 2}; assert.notDeepEqual(obj1, obj2); });
  // (implicit type conversions)
  testOK(function(){ assert.notDeepEqual(null, undefined); });
  testOK(function(){ assert.notDeepEqual(1, "1"); });
  testOK(function(){ assert.notDeepEqual(0, "0"); });
  testOK(function(){ assert.notDeepEqual(0, "1"); });
  testOK(function(){ assert.notDeepEqual(true, 1); });
  testOK(function(){ assert.notDeepEqual(false, 0); });
  testOK(function(){ assert.notDeepEqual(false, 1); });
  testOK(function(){ assert.notDeepEqual({}, "[object Object]"); });
  testOK(function(){ assert.notDeepEqual({toString: function(){return "test";}}, "test"); });
  testOK(function(){ assert.notDeepEqual({valueOf: function(){return 123;}}, 123); });
  // (message)
  testMessage(function(){ assert.notDeepEqual(1, 1); }, "(no assert message)");
  testMessage(function(){ assert.notDeepEqual(1, 1, "test message"); }, "test message");
  
  // strict equal
  testOK(function(){ assert.strictEqual(undefined, undefined); });
  testOK(function(){ assert.strictEqual(true, true); });
  testOK(function(){ assert.strictEqual(false, false); });
  testFail(function(){ assert.strictEqual(false, true); });
  testOK(function(){ assert.strictEqual(1, 1); });
  testOK(function(){ assert.strictEqual(0, 0); });
  testFail(function(){ assert.strictEqual(0, 1); });
  testOK(function(){ assert.strictEqual("abc", "abc"); });
  testOK(function(){ assert.strictEqual("", ""); });
  testFail(function(){ assert.strictEqual("", "abc"); });
  testOK(function(){ var func1 = func2 = function(){}; assert.strictEqual(func1, func2); });
  testFail(function(){ var func1 = function(){}, func2 = function(){}; assert.strictEqual(func1, func2); });
  testOK(function(){ assert.strictEqual(null, null); });
  testFail(function(){ assert.strictEqual(null, {}); });
  testOK(function(){ var arr1 = arr2 = [1,2]; assert.strictEqual(arr1, arr2); });
  testFail(function(){ var arr1 = [1,2], arr2 = [1,2]; assert.strictEqual(arr1, arr2); });
  testOK(function(){ var date1 = date2 = new Date(); assert.strictEqual(date1, date2); });
  testFail(function(){ var date1 = new Date(), date2 = new Date(); assert.strictEqual(date1, date2); });
  testOK(function(){ var err1 = err2 = new Error("error"); assert.strictEqual(err1, err2); });
  testFail(function(){ var err1 = new Error("error"), err2 = new Error("error"); assert.strictEqual(err1, err2); });
  testOK(function(){ var regexp1 = regexp2 = /abc/gim; assert.strictEqual(regexp1, regexp2); });
  testFail(function(){ var regexp1 = /abc/gim, regexp2 = /abc/gim; assert.strictEqual(regexp1, regexp2); });
  testOK(function(){ var obj1 = obj2 = {a: 1, b: 2}; assert.strictEqual(obj1, obj2); });
  testFail(function(){ var obj1 = {a: 1, b: 2}, obj2 = {a: 1, b: 2}; assert.strictEqual(obj1, obj2); });
  // (implicit type conversions)
  testFail(function(){ assert.strictEqual(null, undefined); });
  testFail(function(){ assert.strictEqual(1, "1"); });
  testFail(function(){ assert.strictEqual(0, "0"); });
  testFail(function(){ assert.strictEqual(0, "1"); });
  testFail(function(){ assert.strictEqual(true, 1); });
  testFail(function(){ assert.strictEqual(false, 0); });
  testFail(function(){ assert.strictEqual(false, 1); });
  testFail(function(){ assert.strictEqual({}, "[object Object]"); });
  testFail(function(){ assert.strictEqual({toString: function(){return "test";}}, "test"); });
  testFail(function(){ assert.strictEqual({valueOf: function(){return 123;}}, 123); });
  // (message)
  testMessage(function(){ assert.strictEqual(1, 2); }, "(no assert message)");
  testMessage(function(){ assert.strictEqual(1, 2, "test message"); }, "test message");
  
  // not strict equal
  testFail(function(){ assert.notStrictEqual(undefined, undefined); });
  testFail(function(){ assert.notStrictEqual(true, true); });
  testFail(function(){ assert.notStrictEqual(false, false); });
  testOK(function(){ assert.notStrictEqual(false, true); });
  testFail(function(){ assert.notStrictEqual(1, 1); });
  testFail(function(){ assert.notStrictEqual(0, 0); });
  testOK(function(){ assert.notStrictEqual(0, 1); });
  testFail(function(){ assert.notStrictEqual("abc", "abc"); });
  testFail(function(){ assert.notStrictEqual("", ""); });
  testOK(function(){ assert.notStrictEqual("", "abc"); });
  testFail(function(){ var func1 = func2 = function(){}; assert.notStrictEqual(func1, func2); });
  testOK(function(){ var func1 = function(){}, func2 = function(){}; assert.notStrictEqual(func1, func2); });
  testFail(function(){ assert.notStrictEqual(null, null); });
  testOK(function(){ assert.notStrictEqual(null, {}); });
  testFail(function(){ var arr1 = arr2 = [1,2]; assert.notStrictEqual(arr1, arr2); });
  testOK(function(){ var arr1 = [1,2], arr2 = [1,2]; assert.notStrictEqual(arr1, arr2); });
  testFail(function(){ var date1 = date2 = new Date(); assert.notStrictEqual(date1, date2); });
  testOK(function(){ var date1 = new Date(), date2 = new Date(); assert.notStrictEqual(date1, date2); });
  testFail(function(){ var err1 = err2 = new Error("error"); assert.notStrictEqual(err1, err2); });
  testOK(function(){ var err1 = new Error("error"), err2 = new Error("error"); assert.notStrictEqual(err1, err2); });
  testFail(function(){ var regexp1 = regexp2 = /abc/gim; assert.notStrictEqual(regexp1, regexp2); });
  testOK(function(){ var regexp1 = /abc/gim, regexp2 = /abc/gim; assert.notStrictEqual(regexp1, regexp2); });
  testFail(function(){ var obj1 = obj2 = {a: 1, b: 2}; assert.notStrictEqual(obj1, obj2); });
  testOK(function(){ var obj1 = {a: 1, b: 2}, obj2 = {a: 1, b: 2}; assert.notStrictEqual(obj1, obj2); });
  // (implicit type conversions)
  testOK(function(){ assert.notStrictEqual(null, undefined); });
  testOK(function(){ assert.notStrictEqual(1, "1"); });
  testOK(function(){ assert.notStrictEqual(0, "0"); });
  testOK(function(){ assert.notStrictEqual(0, "1"); });
  testOK(function(){ assert.notStrictEqual(true, 1); });
  testOK(function(){ assert.notStrictEqual(false, 0); });
  testOK(function(){ assert.notStrictEqual(false, 1); });
  testOK(function(){ assert.notStrictEqual({}, "[object Object]"); });
  testOK(function(){ assert.notStrictEqual({toString: function(){return "test";}}, "test"); });
  testOK(function(){ assert.notStrictEqual({valueOf: function(){return 123;}}, 123); });
  // (message)
  testMessage(function(){ assert.notStrictEqual(1, 1); }, "(no assert message)");
  testMessage(function(){ assert.notStrictEqual(1, 1, "test message"); }, "test message");
  
  // throws
  testOK(function(){ assert.throws(function(){throw "error";}); });
  testFail(function(){ assert.throws(function(){}); });
  testOK(function(){ assert.throws(function(){throw "not found error";}, /found/); });
  testFail(function(){ assert.throws(function(){throw "not login error";}, /found/); });
  testOK(function(){ assert.throws(function(){throw new TypeError("error");}, TypeError); });
  testFail(function(){ assert.throws(function(){throw new SyntaxError("error");}, TypeError); });
  // (message)
  testMessage(function(){ assert.throws(function(){}); }, "(no assert message)");
  testMessage(function(){ assert.throws(function(){}, "test message"); }, "test message");
});
