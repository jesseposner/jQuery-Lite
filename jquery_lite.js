/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var dnc = __webpack_require__(1);
	var qArr = [];

	document.addEventListener('DOMContentLoaded', readyQ, false);

	function readyQ() {
	  qArr.forEach(function (fn) {
	    fn();
	  });
	}

	window.$l = function (argument) {
	  if (argument instanceof HTMLElement) {
	    return new dnc([argument]);
	  } else if (typeof argument === "function") {
	    qArr.push(argument);
	  } else {
	    var nl = document.querySelectorAll(argument);
	    var nodesArray = Array.prototype.slice.call(nl);
	    return new dnc(nodesArray);
	  }
	};

	window.$l.extend = function () {
	  var argsArr = [].slice.call(arguments);
	  var result = {};
	  argsArr.forEach(function (obj) {
	    for (var prop in obj) {
	      if( obj.hasOwnProperty( prop ) ) {
	        result[prop] = obj[prop];
	      }
	    }
	  });
	  return result;
	};

	window.$l.ajax = function (opt) {
	  var defaults = {
	    type: "GET",
	    contentType: "application/json",
	    url: document.URL,
	    success: function() {},
	    error: function() {},
	    data: "JSON"
	  };
	  var mergedOpt = window.$l.extend(defaults, opt);
	  var promise = new Promise( function(resolve, reject) {
	    var xhr = new XMLHttpRequest();

	    xhr.open(mergedOpt["type"], mergedOpt["url"]);

	    xhr.onload = function () {
	      if (xhr.status >= 200 && xhr.status < 300) {
	        if (opt.success)
	          mergedOpt.success(xhr.response);
	        else
	          resolve(xhr.response);
	      } else {
	        if (opt.error)
	          mergedOpt.error(xhr.status);
	        else
	          reject(xhr.error);
	      }
	    };

	    xhr.send();

	  });

	  return promise;
	};

	window.$l(function () {
	  window.$l.ajax({
	    type: 'GET',
	    url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b"
	  })
	  .then(function(data) {
	    console.log("this uses promises");
	    console.log(data);
	  })
	  .catch(function() {
	    console.error("An error occured.");
	  });

	  window.$l.ajax({
	    type: 'GET',
	    url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
	    success: function(data) {
	      console.log("We have your weather!");
	      console.log(data);
	    },
	    error: function() {
	      console.error("An error occured.");
	    }
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var DomNodeCollection = function (nodesArray) {
	  this.nodesArray = nodesArray;
	};

	DomNodeCollection.prototype.html = function (string) {
	  if (string !== undefined) {
	    this.nodesArray.forEach (function (elem)  {
	      elem.innerHTML = string;
	    });
	  } else {
	    return this.nodesArray[0].innerHTML;
	  }
	};

	DomNodeCollection.prototype.empty = function () {
	  this.html("");
	};

	DomNodeCollection.prototype.append = function (argument) {
	  if (typeof argument === "string") {
	    this.html(argument);
	  } else if (argument instanceof HTMLElement) {
	    this.nodesArray.forEach(function (node) {
	      node.appendChild(argument);
	    });
	  } else if (argument instanceof DomNodeCollection) {
	    this.nodesArray.forEach(function (thisNode) {
	      argument.nodesArray.forEach(function (argNode) {
	        thisNode.appendChild(argNode);
	      });
	    });
	  }
	};

	DomNodeCollection.prototype.attr = function (tag, value) {
	  if (value !== undefined) {
	    this.nodesArray.forEach (function (node) {
	      node.setAttribute(tag, value);
	    });
	  } else {
	    return this.nodesArray[0].getAttribute(tag);
	  }
	};

	DomNodeCollection.prototype.addClass = function (klass) {
	  this.nodesArray.forEach (function (node) {
	    var classes = node.getAttribute('class');
	    node.setAttribute('class', classes + klass);
	  });
	};

	DomNodeCollection.prototype.removeClass = function (klass) {
	  this.nodesArray.forEach (function (node) {
	    var classes = node.getAttribute('class');
	    var classArr = classes.split(' ');
	    var newClasses = classArr.splice(classArr.indexOf(klass), 1).join(' ');
	    node.setAttribute('class', newClasses);
	  });
	};

	DomNodeCollection.prototype.on = function (type, callback) {
	  this.nodesArray.forEach (function (node) {
	    node.addEventListener(type, callback);
	  });
	};

	DomNodeCollection.prototype.off = function (type, callback) {
	  this.nodesArray.forEach (function (node) {
	    node.removeEventListener(type, callback);
	  });
	};

	module.exports = DomNodeCollection;


/***/ }
/******/ ]);