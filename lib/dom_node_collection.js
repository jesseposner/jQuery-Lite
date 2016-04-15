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
