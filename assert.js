define([], function () {
  "use strict";
  
  function fail(actual, expected, message, operator) {
//    debugger;
    
    var stacktrace = "";
    try {
      throw new Error();
    } catch (ex) {
      if (ex.stack !== undefined) {
        var lines = ex.stack.split("\n");
        stacktrace = lines.join("\n");
      }
    }
    
    throw new Error(message);
  };
  
  function isDeepEqual(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }
    
    if (typeof obj1 === typeof obj2) {
      switch (typeof obj1) {
      case "undefined":
      case "boolean":
      case "number":
      case "string":
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
          
        } else if (obj1 instanceof Error) {
          if (obj2 instanceof Error) {
            // TODO: implement me.
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
      }
    }
    
    return false;
  }
  
  function ok(value, opt_message) {
    if (!!! value) {
      fail(value, true, opt_message || "(no assert message)", "==");
    }
  };
  
  function equal(actual, expected, opt_message) {
    if (actual != expected) {
      fail(actual, expected, opt_message || "(no assert message)", "==");
    }
  };
  
  function notEqual(actual, expected, opt_message) {
    if (actual == expected) {
      fail(actual, expected, opt_message || "(no assert message)", "!=");
    }
  };
  
  function deepEqual(actual, expected, opt_message) {
    if (! isDeepEqual(actual, expected)) {
      fail(actual, expected, opt_message || "(no assert message)", "deepEqual");
    }
  };
  
  function notDeepEqual(actual, expected, opt_message) {
    if (isDeepEqual(actual, expected)) {
      fail(actual, expected, opt_message || "(no assert message)", "notDeepEqual");
    }
  };
  
  function strictEqual(actual, expected, opt_message) {
    if (actual !== expected) {
      fail(actual, expected, opt_message || "(no assert message)", "===");
    }
  };
  
  function notStrictEqual(actual, expected, opt_message) {
    if (actual === expected) {
      fail(actual, expected, opt_message || "(no assert message)", "!==");
    }
  };
  
  function throws(block, opt_error, opt_message) {
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
    
    if (! ok) {
      fail(ok, true, opt_message || "(no assert message)");
    }
  };
  
  
  function assert(value, message) {
    ok(value, message);
  };
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
