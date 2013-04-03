define([], function () {
  "use strict";
  
  function isDeepEqual(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }
    
    if (typeof obj1 === typeof obj2) {
      switch (typeof obj1) {
      case "function":
        return obj1 === obj2;
        
      case "object":
        if (obj1 === null) {
          return obj2 === null;
          
        } else if (Array.isArray(obj1)) {
          if (Array.isArray(obj2)) {
            if (obj1.length === obj2.length) {
              for (var i = 0; i < obj1.length; i++) {
                if (! isDeepEqual(obj1[i], obj2[i])) {
                  return false;
                }
              }
              return true;
            }
          }
          
        } else if (obj1 instanceof Date) {
          if (obj2 instanceof Date) {
            return obj1.getTime() === obj2.getTime();
          }
          
        } else if (obj1 instanceof RegExp) {
          if (obj2 instanceof RegExp) {
            return ["global", "ignoreCase", "lastIndex", "multiline", "source"].every(function(prop) {
              return isDeepEqual(obj1[prop], obj2[prop]);
            });
          }
          
        } else {
          if (obj1.constructor === obj2.constructor) {
            var keys1 = Object.keys(obj1).sort(), keys2 = Object.keys(obj2).sort();
            if (isDeepEqual(keys1, keys2)) {
              return keys1.every(function (key) {
                return isDeepEqual(obj1[key], obj2[key]);
              });
            }
          }
        }
        break;
        
      case "undefined":
      case "boolean":
      case "number":
      case "string":
        // Won't reach here.
        // These types could have been compared by strict equal(===) at the beginning of ths function.
        break;
      
      default:
        // Unexpected object type.
        break;
      }
    }
    
    return false;
  }
  
  function ok(value, opt_message) {
    assert(value, opt_message);
  };
  
  function equal(actual, expected, opt_message) {
    assert(actual == expected, opt_message);
  };
  
  function notEqual(actual, expected, opt_message) {
    assert(actual != expected, opt_message);
  };
  
  function deepEqual(actual, expected, opt_message) {
    assert(isDeepEqual(actual, expected), opt_message);
  };
  
  function notDeepEqual(actual, expected, opt_message) {
    assert(! isDeepEqual(actual, expected), opt_message);
  };
  
  function strictEqual(actual, expected, opt_message) {
    assert(actual === expected, opt_message);
  };
  
  function notStrictEqual(actual, expected, opt_message) {
    assert(actual !== expected, opt_message);
  };
  
  function throws(block, opt_error, opt_message) {  // "throws" is not reserved keyword in ECMAScript version 5.
    if (arguments.length === 2) {
      opt_message = opt_error;
    }
    
    var ok = false;
    
    var exception = null;
    try {
      block();
    } catch (ex) {
      exception = ex;
    }
    
    if (exception !== null) {
      if (opt_error !== undefined) {
        if (opt_error instanceof RegExp) {
          var regexp = opt_error;
          ok = regexp.test(exception);
        } else if (exception instanceof opt_error) {
          ok = true;
        } else if (opt_error instanceof Function) {
          var func = opt_error;
          ok = func(exception) === true;
        }
      } else {
        ok = true;
      }
    }
    
    assert(ok === true, opt_message);
  };
  
  
  var options = {
    breakOnError: false,
    useConsole: false,
    failOnError: true
  };
  
  function assert(value, opt_message) {
    var message = opt_message !== undefined ? opt_message : "(no assert message)";
    
    if (!!! value) {
      if (options.breakOnError) {
        debugger;
      }
      
      if (options.useConsole && window && window.console) {
        if (console.assert) {
          console.assert(value, message);
        } else if (console.error) {
          console.error(message);
        }
      }
      
      if (options.failOnError) {
        throw new Error(message);
      }
    }
  };
  assert.options = options;
  assert.ok = ok;
  assert.equal = equal;
  assert.notEqual = notEqual;
  assert.deepEqual = deepEqual;
  assert.notDeepEqual = notDeepEqual;
  assert.strictEqual = strictEqual;
  assert.notStrictEqual = notStrictEqual;
  assert.throws = throws;
  
  return assert;
});
