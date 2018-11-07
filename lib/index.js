'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var propInfo = require('property-information');

var h = require('snabbdom/h').default;

var own = Object.prototype.hasOwnProperty;

var divWrapper = function divWrapper(children) {
  return {
    type: 'element',
    tagName: 'div',
    properties: {},
    children: children
  };
};

var toSnabbdom = function toSnabbdom(uTree) {
  if (_typeof(uTree) !== 'object' || Array.isArray(uTree)) {
    throw new TypeError('uTree must be an object');
  }

  if (uTree.type === 'root') {
    var c = uTree.children;

    if (!Array.isArray(c) || c.length === 0) {
      return null;
    }

    uTree = c.length === 1 ? c[0] : divWrapper(c);
  } else if (uTree.type === 'comment') {
    return null;
  }

  return convert(uTree);
};

var convert = function convert(node) {
  if (node.type === 'text') {
    return node.value;
  } // Ignoring `comment` and `doctype` nodes


  if (node.type !== 'element') {
    return null;
  }

  var data = {};
  var attrs = {};
  var props = node.properties || {};

  if (typeof props.style === 'string' && props.style) {
    attrs.style = props.style;
  } else if (_typeof(props.style) === 'object' && !Array.isArray(props.style)) {
    data.style = props.style;
  }

  for (var prop in props) {
    /* istanbul ignore else - Doesn’t matter */
    if (own.call(props, prop)) {
      var val = props[prop];
      var info = propInfo.find(propInfo.html, prop); // ignore nully, `false`, `NaN` and falsey known booleans

      if (val === null || val === undefined || val === false || Number.isNaN(val) || info.boolean && !val) {
        continue;
      }

      if (Array.isArray(val)) {
        val = info.commaSeparated ? val.join(', ') : val.join(' ');
      }

      attrs[info.attribute] = val;
    }
  }

  var children = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;
      var res = convert(child);

      if (res !== null && res !== undefined) {
        children.push(res);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (Object.keys(attrs).length > 0) {
    data.attrs = attrs;
  }

  return h(node.tagName, data, children);
};

module.exports = toSnabbdom;