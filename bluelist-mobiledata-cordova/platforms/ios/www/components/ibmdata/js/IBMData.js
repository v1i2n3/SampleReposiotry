/*!
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2014. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 *  IBM Mobile Cloud Services, 
 *  IBMData Service JavaScript SDK v1.0.0.20140626-1346
 *
 */

 
// Generated by IBMData SDK v0.6.18 - template: 'combined' 
// Combined template optimized with RequireJS/r.js v2.1.14 & almond.
(function (global, window){
  
var __isAMD = !!(typeof define === 'function' && define.amd),
    __isNode = (typeof exports === 'object'),
    __isWeb = !__isNode;

  var __nodeRequire = (__isNode ? require :
      function(dep){
        throw new Error("IBMData SDK detected missing dependency: '" + dep + "' - in a non-nodejs runtime. All it's binding variables were 'undefined'.")
      });
var bundleFactory = function() {/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

define('ibm/mobile/service/_IBMData', ['require','exports','module'],function (require, exports, module) {
  

var logger = IBMLogger.getLogger();
  var _IBMData = {
      VERSION: "1.0.0.20140626-1346",
      version: "1.0.0.20140626-1346",
      service: null,
      initializeService: function (req) {
        if (!IBMBluemix && !Q && !IBMHttpRequest) {
          throw new Error("IBMBluemix,Q,IBMHttpReqest are undefined.");
        }
        logger.debug("IBMData: initializing version: " + this.getVersion());
        return this._init(req);
      },
      _init: function () {
        var msg = "_IBMData._init() not overwritten.";
        console.error(msg);
        throw Error(msg);
      },
      getVersion: function () {
        return this.version;
      },
      getService: function () {
        if (!this.service) {
          throw new IBMError("Data Service not initialized. Call initializeService()");
        }
        return this.service;
      }
    };
  return _IBMData;


});
define('ibm/mobile/utils', ['require','exports','module'],function (require, exports, module) {
  

function toQueryString(obj) {
    var str = "";
    for (prop in obj) {
      var val = obj[prop];
      if (!_.isUndefined(val) && !_.isNull(val)) {
        str = str + prop + "=" + val + "&";
      }
    }
    return str.substring(0, str.length - 1);
  }
  function hasFields(obj, fields) {
    if (!_.isObject(obj))
      return false;
    if (!_.isArray(fields))
      fields = [fields];
    return fields.every(function (field) {
      var val = obj[field];
      if (_.isNull(val) || _.isUndefined(val)) {
        console.warn("Object %o is missing field: %s", obj, field);
        return false;
      }
      return true;
    });
  }
  function inherit(parent, ctor, properties) {
    var props = properties || {};
    if (!_.isFunction(ctor)) {
      props = ctor;
      ctor = props.constructor;
      delete props.constructor;
    }
    ctor.prototype = Object.create(parent.prototype);
    Object.defineProperty(ctor.prototype, "constructor", {
      enumerable: false,
      value: ctor
    });
    _.extend(ctor.prototype, props);
    return ctor;
  }
  return {
    inherit: inherit,
    hasFields: hasFields,
    toQueryString: toQueryString
  };


});
define('ibm/mobile/service/data/error/IBMError', ['require', 'exports', 'module', '../../../utils'], function (require, exports, module, utils) {
  

function IBMError(err) {
    var error = err || {};
    if (_.isString(error)) {
      error = { message: err };
    }
    error.message = error.message || "";
    var _error = new Error(error.message);
    if (_error && _error.stack) {
      error.stack = _error.stack;
    }
    Object.keys(error).forEach(function (key) {
      this[key] = error[key];
    }.bind(this));
  }
  IBMError.inherit = function (properties) {
    function createDefaultCtor(name) {
      return function IBMNamedError() {
        IBMError.apply(this, _.toArray(arguments));
        this.name = name;
      };
    }
    var props = properties || {}, ctor;
    if (_.isFunction(props)) {
      ctor = props;
      props = arguments[1] || {};
      props.constructor = ctor;
    } else {
      ctor = props.constructor;
    }
    if (ctor === Object) {
      ctor = props.constructor = createDefaultCtor(props.name || IBMError.name);
    } else if (!props.name) {
      if (ctor.name && ctor.name !== "Object" && ctor.name !== "Function") {
        props.name = ctor.name;
      } else {
        props.name = IBMError.name;
      }
    }
    return utils.inherit(IBMError, ctor, props);
  };
  return utils.inherit(Error, IBMError, {
    name: "IBMError",
    toString: function () {
      return this.name + " - " + this.message;
    }
  });


});
define('ibm/mobile/service/data/error/IBMDataError', ['require', 'exports', 'module', './IBMError'], function (require, exports, module, IBMError) {
  

var IBMDataError = IBMError.inherit({
      constructor: function IBMDataError() {
        IBMError.apply(this, _.toArray(arguments));
      }
    });
  return IBMDataError;


});
define('ibm/mobile/service/data/request/_RequestMixin', ['require','exports','module'],function (require, exports, module) {
  

var _RequestMixinInit = {
      init: function (dst) {
        var requester = IBMData.getService().requester, mixin = {
            OP: requester.OP,
            send: requester.send.bind(requester)
          };
        _.extend(dst, mixin);
        return mixin;
      }
    };
  return _RequestMixinInit;


});
define('ibm/mobile/service/data/IBMObject', ['require', 'exports', 'module', '../../utils', './error/IBMDataError', './request/_RequestMixin'], function (require, exports, module, utils, IBMDataError, _RequestMixin) {
  

var TAG = "IBMObject";
  var unimplementedMethod = function (method) {
    return new IBMDataError({
      name: "UnimplementedMethod",
      message: "Method (" + method + ") not yet implemented"
    });
  };
  var unexpectedError = function (message) {
    return new IBMDataError({
      name: "UnexpectedError",
      message: message
    });
  };
  var invalidOperation = function (op, message, isDeleted) {
    return new IBMDataError({
      message: "Unable to perform operation(" + op + "): " + message,
      isDeleted: isDeleted === true ? true : false
    });
  };
  var invalidServerObject = function () {
    return unexpectedError("Invalid or null object returned from server.");
  };
  function IBMObject(className) {
    this._meta = {
      className: className,
      objectId: null,
      version: null,
      createdAt: null,
      modifiedAt: null,
      deleted: false
    };
    this.attributes = {};
    this.initialize();
    _RequestMixin.init(this);
  }
  IBMObject.createObjectFromServerVersion = function (serverVersion, service) {
    var className = serverVersion.className, Specialization = null, obj;
    if (service) {
      Specialization = service.getSpecializationFor(className);
    }
    if (Specialization) {
      obj = new Specialization();
      obj._updateWithServerVersion(serverVersion);
    } else {
      obj = new IBMObject(serverVersion.className);
      obj._updateWithServerVersion(serverVersion);
    }
    return obj;
  };
  _.extend(IBMObject.prototype, {
    _meta: {},
    attributes: {},
    constructor: IBMObject,
    initialize: function () {
    },
    save: function () {
      var op = this.OP.UPDATE;
      if (!this.getId()) {
        op = this.OP.CREATE;
      }
      return this._asyncOp(op);
    },
    del: function () {
      return this._asyncOp(this.OP.DELETE);
    },
    read: function () {
      if (!this.getId()) {
        var reason = "Object must have id.";
        if (this.isDeleted) {
          reason = "Object has been deleted";
        }
        return Q.reject(invalidOperation(this.OP.READ, reason, this.isDeleted()));
      }
      return this._asyncOp(this.OP.READ);
    },
    set: function (field, value) {
      if (_.isObject(field)) {
        var fieldMap = field;
        for (var prop in fieldMap) {
          this._set(prop, fieldMap[prop]);
        }
      } else {
        this._set(field, value);
      }
    },
    _set: function (field, value) {
      if (field.indexOf(" ") >= 0 || field.indexOf(".") >= 0) {
        throw new TypeError("Field names can not contain spaces or periods");
      }
      this.attributes[field] = value;
    },
    get: function (field) {
      return _.isString(field) ? this.attributes[field] : this.attributes;
    },
    getId: function () {
      return this.getMetadata("objectId");
    },
    getClassName: function () {
      return this.getMetadata("className");
    },
    getMetadata: function (field) {
      return _.isString(field) ? this._meta[field] : this._meta;
    },
    isDeleted: function () {
      return this.getMetadata("deleted");
    },
    _asyncOp: function (op) {
      if (this.isDeleted()) {
        return Q.reject(op, "Object has been deleted.", true);
      }
      return this._handlePromise(this.send(this, op).then(this._onOpSuccess(op)));
    },
    _handlePromise: function (promise) {
      var defer = Q.defer();
      try {
        promise.done(function () {
          defer.resolve.apply(defer, _.toArray(arguments));
        }, function () {
          defer.reject.apply(defer, _.toArray(arguments));
        });
      } catch (ex) {
        defer.reject(ex);
      }
      return defer.promise;
    },
    _onOpSuccess: function (op) {
      var onOpCallback, OP = this.OP;
      switch (op) {
      case OP.CREATE:
        onOpCallback = this._onCreate;
        break;
      case OP.UPDATE:
        onOpCallback = this._onUpdate;
        break;
      case OP.DELETE:
        onOpCallback = this._onDelete;
        break;
      case OP.READ:
        onOpCallback = this._onRead;
        break;
      default:
        onOpCallback = function () {
          return Q.reject(unexpectedError("Unhandled op: " + op));
        };
      }
      return onOpCallback.bind(this);
    },
    _onCreate: function (createdObject) {
      this._updateWithServerVersion(createdObject);
      return Q.resolve(this);
    },
    _onRead: function (readObject) {
      this._updateWithServerVersion(readObject);
      return Q.resolve(this);
    },
    _onUpdate: function (updateObject) {
      this._updateWithServerVersion(updateObject);
      return Q.resolve(this);
    },
    _onDelete: function () {
      _.keys(this._meta).forEach(function (key) {
        this._meta[key] = null;
      }.bind(this));
      this._meta["deleted"] = true;
      this.attributes = {};
      return Q.resolve(this);
    },
    _updateWithServerVersion: function (obj) {
      var meta = this._meta;
      if (!utils.hasFields(obj, [
          "objectId",
          "version",
          "attributes"
        ])) {
        throw invalidServerObject();
      }
      this.attributes = obj.attributes;
      this._meta.version = obj.version;
      this._meta.objectId = obj.objectId;
      if (obj.createdAt)
        this._meta.createdAt = obj.createdAt;
      if (obj.modifiedAt)
        this._meta.modifiedAt = obj.modifiedAt;
    }
  });
  return IBMObject;


});
define('ibm/mobile/service/data/IBMQuery', ['require', 'exports', 'module', './IBMObject', '../../utils', './error/IBMDataError', './request/_RequestMixin'], function (require, exports, module, IBMObject, utils, IBMDataError, _RequestMixin) {
  

function IBMQuery(queryRequest, service) {
    if (!_.isEmpty(queryRequest)) {
      if (_.isString(queryRequest)) {
        this.queryRequest.className = queryRequest;
      } else if (_.isObject(queryRequest)) {
        this.queryRequest = queryRequest;
      }
    }
    this.service = service;
    this._createObjectFromServerVersion = function (serviceVersion) {
      return IBMObject.createObjectFromServerVersion(serviceVersion, service);
    };
    _RequestMixin.init(this);
  }
  _.extend(IBMQuery.prototype, {
    constructor: IBMQuery,
    service: null,
    queryRequest: {
      query: {},
      options: {
        limit: 0,
        offset: 0
      }
    },
    find: function (criteria, options) {
      var queryRequest = _.clone(this.queryRequest);
      if (_.isObject(criteria)) {
        queryRequest.criteria = criteria;
      }
      if (_.isObject(options)) {
        queryRequest.options = options;
      }
      return this._doQuery(queryRequest).then(function (queryResult) {
        var result = queryResult.map(this._createObjectFromServerVersion.bind(this));
        return Q.resolve(result);
      }.bind(this));
    },
    findById: function (objectId) {
      var _self = this;
      return this._doQuery({ objectId: objectId }).then(function (queryResult) {
        if (queryResult.length > 1) {
          console.warn("Possible server error. More than one object returned with Id: " + objectId);
        }
        if (queryResult.length === 1) {
          return Q.when(_self._createObjectFromServerVersion(queryResult[0]));
        } else {
          return Q.reject({ reason: "Object with id " + objectId + " not found." });
        }
      });
    },
    _doQuery: function (queryRequest) {
      return this.send(queryRequest, this.OP.QUERY);
    }
  });
  return IBMQuery;


});
define('ibm/mobile/service/data/request/_DataServiceRequest', ['require', 'exports', 'module', '../error/IBMError'], function (require, exports, module, IBMError) {
  

var Messages = {
      invalidOp: "Invalid operation provided: ",
      unimplementedRequest: "Request hasn't been implemented"
    };
  var _DataServiceRequest = {
      OP: {
        UPDATE: "UPDATE",
        READ: "READ",
        DELETE: "DELETE",
        CREATE: "CREATE",
        QUERY: "QUERY"
      },
      send: function (obj, op) {
        console.error("Request send method not implemented");
        return Q.reject(Messages.unimplementedRequest);
      }
    };
  return _DataServiceRequest;


});
define('ibm/mobile/service/data/request/RestRequest', ['require', 'exports', 'module', '../../../utils', './_DataServiceRequest', '../error/IBMError'], function (require, exports, module, utils, _DataServiceRequest, IBMError) {
  

var TAG = "RestRequest", timeout = 5000;
  var RestRequestError = IBMError.inherit({
      constructor: function RestRequestError(message, status, data) {
        var err = { message: message };
        if (status)
          err.status = status;
        if (data)
          err.data = data;
        IBMError.call(this, err);
      }
    });
  function RestRequest(serviceUrl, appId) {
    this.serviceUrl = serviceUrl;
    this.restUrl = this.serviceUrl.append("rest").append("v1").append("apps").append(appId).toString();
    this.bjax = IBMHttpRequest;
  }
  _.extend(RestRequest.prototype, _DataServiceRequest, {
    bjax: null,
    send: function (obj, op) {
      if (this._isValidObject(obj, op)) {
        switch (op) {
        case this.OP.CREATE:
          return this._createRequest(obj);
        case this.OP.UPDATE:
          return this._updateRequest(obj);
        case this.OP.DELETE:
          return this._deleteRequest(obj);
        case this.OP.READ:
          return this._readRequest(obj);
        case this.OP.QUERY:
          return this._queryRequest(obj);
        default:
          return Q.reject(new RestRequestError("Invalid operation provided: " + op));
        }
      } else {
        return Q.reject(new RestRequestError("Object is invalid for given operation"));
      }
    },
    setExpressReq: function (req) {
      this.expressReq = req;
    },
    _meetsCriteria: function (obj, criteria) {
      criteria = criteria || {};
      var attr = obj.attributes || {};
      return Object.keys(criteria).every(function (key) {
        return attr[key] === criteria[key];
      });
    },
    _onRequestDone: function (defer, isError) {
      isError = isError === true || false;
      var METHOD_TAG = TAG + "._onRequestDone";
      function onSuccess(data, status) {
        console.dir(data);
        if (data) {
          if (data.status === "success") {
            defer.resolve(data);
          } else {
            defer.reject(new RestRequestError("Unhandled status", data.status, data));
          }
        } else {
          defer.reject(new RestRequestError("No data returned"));
        }
      }
      ;
      function onError(err) {
        defer.reject(new RestRequestError("Unexpected error when communicating with server", err));
      }
      return isError ? onError : onSuccess;
    },
    _request: function (request) {
      var defer = Q.defer();
      var url = this.restUrl + "/" + request.endpoint;
      var xhrOptions = {
          url: url,
          timeout: timeout,
          method: request.method,
          handleAs: "json"
        };
      if (request.payload) {
        xhrOptions.data = JSON.stringify(request.payload);
        xhrOptions.contentType = "json";
      }
      this.bjax(xhrOptions, this.expressReq).then(this._onRequestDone(defer).bind(this), this._onRequestDone(defer, true).bind(this));
      return defer.promise;
    },
    _createRequest: function (obj) {
      var request = {
          payload: [obj.get()],
          method: "POST",
          endpoint: "injections?classname=" + obj.getClassName()
        };
      return this._request(request).then(this._getObjectFromResponse);
    },
    _getObjectFromResponse: function (result) {
      var responseObj = result && result.object;
      if (_.isArray(responseObj))
        responseObj = result.object[0];
      if (responseObj) {
        return Q.resolve(responseObj);
      } else {
        return Q.reject(new RestRequestError("Response is missing created object", null, result));
      }
    },
    _updateRequest: function (obj) {
      var meta = obj.getMetadata();
      var objId = obj.getId();
      var request = {
          payload: {
            objectId: objId,
            version: meta.version,
            updates: obj.get()
          },
          method: "PUT",
          endpoint: "objects/" + objId
        };
      return this._request(request).then(this._getObjectFromResponse);
    },
    _deleteRequest: function (obj) {
      var objId = obj.getId();
      var request = {
          method: "DELETE",
          endpoint: "objects/" + objId
        };
      return this._request(request);
    },
    _readRequest: function (obj) {
      var objId = obj.getId();
      var request = {
          method: "GET",
          endpoint: "objects/" + objId
        };
      return this._request(request).then(this._getObjectFromResponse);
    },
    _queryRequest: function (query) {
      var req = {
          endpoint: "objects",
          method: "GET"
        };
      if (query.objectId) {
        req.endpoint += "/" + query.objectId;
      } else {
        var queryStr = { classname: query.className };
        req.endpoint += "?" + utils.toQueryString(queryStr);
      }
      return this._request(req).then(function (res) {
        var matched = res.object;
        if (query.criteria) {
          matched = res.object.filter(function (obj) {
            return this._meetsCriteria(obj, query.criteria) && this._isValidServerVersionObject(obj);
          }.bind(this));
        }
        return Q.resolve(matched);
      }.bind(this));
    },
    _isValidObject: function (obj, op) {
      if (op == this.OP.QUERY) {
        return true;
      }
      var meta = obj.getMetadata(), requiredFields = ["className"];
      if (op == this.OP.UPDATE) {
        requiredFields.concat([
          "objectId",
          "version"
        ]);
      }
      if (op == this.OP.DELETE) {
        requiredFields.push("objectId");
      }
      return utils.hasFields(meta, requiredFields);
    },
    _isValidServerVersionObject: function (obj) {
      return utils.hasFields(obj, [
        "objectId",
        "className",
        "version",
        "attributes"
      ]);
    }
  });
  return RestRequest;


});
define('ibm/mobile/service/data/IBMDataService', ['require', 'exports', 'module', './IBMObject', './IBMQuery', './request/_DataServiceRequest', './request/RestRequest'], function (require, exports, module, IBMObject, IBMQuery, _DataServiceRequest, RestRequest) {
  

function IBMDataService(requester) {
    this.requester = requester;
    this.Object = createMyObject(this);
    this.Query = createMyQuery(this);
  }
  function createMyObject(instance) {
    return {
      service: instance,
      extend: function (className, prototype) {
        function Specialization() {
          IBMObject.call(this, className);
        }
        Specialization.prototype = new IBMObject();
        _.extend(Specialization.prototype, prototype, { constructor: Specialization });
        this.service.specializations[className] = Specialization;
        return Specialization;
      },
      ofType: function (className, initArgs) {
        var obj = new IBMObject(className);
        if (_.isObject(initArgs)) {
          obj.set(initArgs);
        }
        return obj;
      },
      withId: function (objectId) {
        return new IBMQuery({}, this.service).findById(objectId);
      }
    };
  }
  function createMyQuery(instance) {
    return {
      service: instance,
      forAll: function () {
        return new IBMQuery(undefined, this.service);
      },
      ofType: function (className) {
        return new IBMQuery(className, this.service);
      },
      forObjectId: function (objectId) {
        return new IBMQuery({ objectId: objectId }, this.service);
      }
    };
  }
  IBMDataService.prototype = {
    requester: null,
    specializations: {},
    getSpecializationFor: function (className) {
      return this.specializations[className];
    },
    "Object": null,
    "Query": null
  };
  return IBMDataService;


});
define('ibm/mobile/service/IBMData', ['require', 'exports', 'module', './_IBMData', './data/IBMDataService', './data/request/RestRequest'], function (require, exports, module, _IBMData, IBMDataService, RestRequest) {
  var __umodule__ = (function (require, exports, module, _IBMData, IBMDataService, RestRequest) {
  

var IBMData = _.extend(_IBMData, {
      _init: function (req) {
        var endpoint = new IBMUriBuilder(IBMBluemix.config.getBaaSURL()).append("data");
        appId = IBMBluemix.config.getApplicationId(), isNode = typeof __isNode === "boolean" ? __isNode : typeof exports === "object";
        var requester = new RestRequest(endpoint, appId), service = new IBMDataService(requester);
        if (isNode && _.isObject(req)) {
          requester.setExpressReq(req);
        }
        this.service = service;
        this.requester = requester;
        return this.service;
      }
    });
  return IBMData;


}).call(this, require, exports, module, _IBMData, IBMDataService, RestRequest);
var __old__ibmdata0 = window['IBMData'];
window['IBMData'] = __umodule__;

__umodule__.noConflict = function () {
  window['IBMData'] = __old__ibmdata0;
return __umodule__;
};
return __umodule__;
});
    return require('ibm/mobile/service/IBMData');
  };
if (__isAMD) {
  return define(bundleFactory);
} else {
    if (__isNode) {
        return module.exports = bundleFactory();
    } else {
        return bundleFactory();
    }
}
}).call(this, (typeof exports === 'object' ? global : window),
              (typeof exports === 'object' ? global : window))