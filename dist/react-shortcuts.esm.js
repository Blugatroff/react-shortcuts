import React from 'react';

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var KeysState = /*#__PURE__*/function () {
  function KeysState() {
    this.keys = new Map();
  }

  var _proto = KeysState.prototype;

  _proto.isPressed = function isPressed(key) {
    var _this$keys$get;

    return (_this$keys$get = this.keys.get(key)) != null ? _this$keys$get : false;
  };

  _proto.update = function update(e, state) {
    this.keys.set(e.key, state);
  };

  return KeysState;
}();

var listeners = /*#__PURE__*/new Map();

var addListener = function addListener(key, listener) {
  var _listeners$get;

  var listenersOnKey = (_listeners$get = listeners.get(key)) != null ? _listeners$get : [];
  listeners.set(key, [].concat(listenersOnKey, [listener]));
  return function () {
    var listenersOnKey = listeners.get(key);
    if (listenersOnKey === undefined) return;
    listeners.set(key, listenersOnKey.filter(function (f) {
      return f !== listener;
    }));
  };
};

var keysState = /*#__PURE__*/new KeysState();

document.body.onkeydown = function (e) {
  keysState.update(e, true);

  for (var _iterator = _createForOfIteratorHelperLoose((_listeners$get2 = listeners.get(e.key)) != null ? _listeners$get2 : []), _step; !(_step = _iterator()).done;) {
    var _listeners$get2;

    var listener = _step.value;
    listener(keysState);
  }
};

document.body.onkeyup = function (e) {
  return keysState.update(e, false);
};

var useKey = function useKey(key, listener) {
  return React.useEffect(function () {
    return addListener(key, listener);
  }, [listener, key]);
};

var createShortcutHook = function createShortcutHook(keys) {
  return function (listener) {
    useKey(keys[keys.length - 1], React.useMemo(function () {
      return function (state) {
        for (var i = 0; i < keys.length - 1; i++) {
          if (!state.isPressed(keys[i])) return;
        }

        listener();
      };
    }, [listener]));
  };
};
var anyShortcut = function anyShortcut() {
  for (var _len = arguments.length, hooks = new Array(_len), _key = 0; _key < _len; _key++) {
    hooks[_key] = arguments[_key];
  }

  return function (listener) {
    return hooks.forEach(function (h) {
      return h(listener);
    });
  };
};

export { anyShortcut, createShortcutHook };
//# sourceMappingURL=react-shortcuts.esm.js.map
