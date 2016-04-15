var dnc = require('./dom_node_collection.js');
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
