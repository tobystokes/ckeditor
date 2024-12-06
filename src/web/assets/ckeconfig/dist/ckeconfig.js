/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ConfigOptions.js":
/*!**************************!*\
  !*** ./ConfigOptions.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ckeconfig_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ckeconfig.css */ "./ckeconfig.css");
/* harmony import */ var _ckeconfig_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ckeconfig_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license GPL-3.0-or-later
 */

/** global: CKEditor5, Garnish */


/* harmony default export */ __webpack_exports__["default"] = (Garnish.Base.extend({
  jsonSchemaUri: null,
  language: null,
  $container: null,
  $jsonContainer: null,
  $jsContainer: null,
  jsonEditor: null,
  jsEditor: null,
  defaults: null,
  init: function init(id, jsonSchemaUri) {
    var _this = this;
    this.jsonSchemaUri = jsonSchemaUri;
    this.$container = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#".concat(id));
    this.$jsonContainer = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#".concat(id, "-json-container"));
    this.$jsContainer = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#".concat(id, "-js-container"));
    this.jsonEditor = window.monacoEditorInstances["".concat(id, "-json")];
    this.jsEditor = window.monacoEditorInstances["".concat(id, "-js")];
    var $languagePicker = this.$container.children('.btngroup');
    if (this.$jsonContainer.hasClass('hidden')) {
      this.language = 'js';
    } else {
      this.language = 'json';
    }
    this.defaults = {};
    var lastJsValue = null;
    new Craft.Listbox($languagePicker, {
      onChange: function onChange($selectedOption) {
        _this.language = $selectedOption.data('language');
        switch (_this.language) {
          case 'json':
            // get the js value
            lastJsValue = _this.jsEditor.getModel().getValue();
            // check if the js value has any functions in it
            if (_this.jsContainsFunctions(lastJsValue)) {
              // if it does - show the confirmation dialogue
              if (!confirm(Craft.t('ckeditor', 'Your JavaScript config contains functions. If you switch to JSON, they will be lost. Would you like to continue?'))) {
                // if user cancels - go back to the previous option (js)
                var listbox = $languagePicker.data('listbox');
                listbox.$options.not('[data-language="json"]').trigger('click');
                break;
              }
            }
            // if user confirms that they want to proceed, or we don't have functions in the js value,
            // go ahead and switch
            _this.$jsonContainer.removeClass('hidden');
            _this.$jsContainer.addClass('hidden');
            var json = _this.js2json(lastJsValue);
            lastJsValue = null;
            _this.jsonEditor.getModel().setValue(json || '{\n  \n}');
            _this.jsEditor.getModel().setValue('');
            break;
          case 'js':
            _this.$jsonContainer.addClass('hidden');
            _this.$jsContainer.removeClass('hidden');
            var js;
            // if we have the last remembered js value, it means we're switching back after cancelled confirmation,
            // so let's use it
            if (lastJsValue !== null) {
              js = lastJsValue;
              lastJsValue = null;
            } else {
              js = _this.json2js(_this.jsonEditor.getModel().getValue());
            }
            _this.jsEditor.getModel().setValue(js || 'return {\n  \n}');
            _this.jsonEditor.getModel().setValue('');
            break;
        }
      }
    });

    // Handle Paste
    this.jsonEditor.onDidPaste(function (ev) {
      var pastedContent = _this.jsonEditor.getModel().getValueInRange(ev.range);
      var config;
      try {
        eval("config = {".concat(pastedContent, "}"));
      } catch (e) {
        // oh well
        return;
      }
      var json = JSON.stringify(config, null, 2);
      var trimmed = Craft.trim(json.substring(1, json.length - 1));
      if (!trimmed) {
        return;
      }
      _this.jsonEditor.executeEdits('', [{
        range: ev.range,
        text: trimmed
      }]);
    });
  },
  getConfig: function getConfig() {
    var json;
    if (this.language === 'json') {
      json = Craft.trim(this.jsonEditor.getModel().getValue()) || '{}';
    } else {
      var value = Craft.trim(this.jsEditor.getModel().getValue());
      json = value ? this.js2json(value) : '{}';
      if (json === false) {
        return false;
      }
    }
    try {
      var config = JSON.parse(json);
      return jquery__WEBPACK_IMPORTED_MODULE_1___default().isPlainObject(config) ? config : false;
    } catch (e) {
      return false;
    }
  },
  setConfig: function setConfig(config) {
    var json = this.config2json(config);
    if (this.language === 'json') {
      this.jsonEditor.getModel().setValue(json);
    } else {
      var js = this.json2js(json);
      this.jsEditor.getModel().setValue(js || 'return {\n  \n}');
    }
  },
  addSetting: function addSetting(setting) {
    var config = this.getConfig();
    if (!config) {
      return;
    }

    // already present?
    if (typeof config[setting] !== 'undefined') {
      return;
    }
    if (typeof this.defaults[setting] === 'undefined') {
      this.populateDefault(setting);
      if (typeof this.defaults[setting] === 'undefined') {
        return;
      }
    }
    config[setting] = this.defaults[setting];
    this.setConfig(config);
  },
  removeSetting: function removeSetting(setting) {
    var config = this.getConfig();
    if (!config) {
      return;
    }

    // not present?
    if (typeof config[setting] === 'undefined') {
      return;
    }

    // keep track of the value in case the setting needs to be added back later
    this.defaults[setting] = config[setting];
    delete config[setting];
    this.setConfig(config);
  },
  populateDefault: function populateDefault(setting) {
    var _this2 = this;
    var schema;
    try {
      schema = window.monaco.languages.json.jsonDefaults.diagnosticsOptions.schemas.find(function (s) {
        return s.uri === _this2.jsonSchemaUri;
      }).schema;
    } catch (e) {
      console.warn('Couldn’t get config options JSON schema.', e);
      return;
    }
    if (!schema.$defs || !schema.$defs.EditorConfig || !schema.$defs.EditorConfig.properties) {
      console.warn('Config options JSON schema is missing $defs.EditorConfig.properties');
      return;
    }
    if (!schema.$defs.EditorConfig.properties[setting]) {
      return;
    }
    var property = schema.$defs.EditorConfig.properties[setting];
    if (property["default"]) {
      this.defaults[setting] = property["default"];
      return;
    }
    if (!property.$ref) {
      return;
    }
    var m = property.$ref.match(/^#\/\$defs\/(\w+)/);
    if (!m) {
      return;
    }
    var defName = m[1];
    if (!schema.$defs[defName] || !schema.$defs[defName]["default"]) {
      return;
    }
    this.defaults[setting] = schema.$defs[defName]["default"];
  },
  replacer: function replacer(key, value) {
    if (typeof value === 'function') {
      return '__HAS__FUNCTION__';
    }
    return value;
  },
  jsContainsFunctions: function jsContainsFunctions(js) {
    var config = this.getValidJsonConfig(js);
    if (config === false) {
      return true;
    }
    var json = JSON.stringify(config, this.replacer, 2);
    if (json.match(/__HAS__FUNCTION__/)) {
      return true;
    }
    return false;
  },
  config2json: function config2json(config) {
    var json = JSON.stringify(config, null, 2);
    if (json === '{}') {
      json = '{\n  \n}';
    }
    return json;
  },
  getValidJsonConfig: function getValidJsonConfig(js) {
    var m = (js || '').match(/return\s*(\{[\w\W]*})/);
    if (!m) {
      return false;
    }
    var config;
    // See if it's valid JSON
    try {
      eval("config = ".concat(m[1], ";"));
    } catch (e) {
      // oh well
      return false;
    }
    return config;
  },
  js2json: function js2json(js) {
    var config = this.getValidJsonConfig(js);
    if (config === false) {
      return false;
    }
    return this.config2json(config);
  },
  json2js: function json2js(json) {
    var config;
    try {
      config = JSON.parse(json);
    } catch (e) {
      return false;
    }
    if (!jquery__WEBPACK_IMPORTED_MODULE_1___default().isPlainObject(config)) {
      return false;
    }
    var js = this.jsify(config, '');
    if (js === '{\n}') {
      js = '{\n  \n}';
    }
    return "return ".concat(js);
  },
  jsify: function jsify(value, indent) {
    var js;
    if (jquery__WEBPACK_IMPORTED_MODULE_1___default().isArray(value)) {
      js = '[\n';
      var _iterator = _createForOfIteratorHelper(value),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          js += "".concat(indent, "  ").concat(this.jsify(v, indent + '  '), ",\n");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      js += "".concat(indent, "]");
    } else if (jquery__WEBPACK_IMPORTED_MODULE_1___default().isPlainObject(value)) {
      js = '{\n';
      for (var _i = 0, _Object$entries = Object.entries(value); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          _v = _Object$entries$_i[1];
        js += "".concat(indent, "  ").concat(k, ": ").concat(this.jsify(_v, indent + '  '), ",\n");
      }
      js += "".concat(indent, "}");
    } else if (typeof value === 'string' && !value.match(/[\r\n']/)) {
      js = "'".concat(value, "'");
    } else {
      js = JSON.stringify(value);
    }
    return js;
  }
}));

/***/ }),

/***/ "./ToolbarBuilder.js":
/*!***************************!*\
  !*** ./ToolbarBuilder.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ckeconfig_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ckeconfig.css */ "./ckeconfig.css");
/* harmony import */ var _ckeconfig_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ckeconfig_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license GPL-3.0-or-later
 */

/** global: CKEditor5, Garnish */


/* harmony default export */ __webpack_exports__["default"] = (Garnish.Base.extend({
  $sourceContainer: null,
  $targetContainer: null,
  $input: null,
  value: null,
  components: null,
  drag: null,
  $items: null,
  draggingSourceItem: null,
  draggingSeparator: null,
  $insertion: null,
  showingInsertion: false,
  closestItem: null,
  init: function init(id, containerId, configOptions, namespace) {
    var _this = this;
    this.$sourceContainer = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#".concat(id, " .ckeditor-tb--source .ck-toolbar__items"));
    this.$targetContainer = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#".concat(id, " .ckeditor-tb--target .ck-toolbar__items"));
    this.$input = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#".concat(id, " input"));
    this.value = JSON.parse(this.$input.val());
    var editorContainer = document.createElement('DIV');
    var editorElement = document.createElement('DIV');
    editorContainer.appendChild(editorElement);
    CKEditor5.craftcms.create(editorElement, {
      linkOptions: [{
        elementType: 'craft\\elements\\Asset'
      }],
      assetSources: ['*'],
      entryTypeOptions: [{
        label: 'fake',
        value: 'fake'
      }]
    }).then(function (editor) {
      var cf = editor.ui.componentFactory;
      var names = Array.from(cf.names());
      _this.components = {};
      for (var _i = 0, _names = names; _i < _names.length; _i++) {
        var name = _names[_i];
        _this.components[name] = cf.create(name);
      }
      var items = CKEditor5.craftcms.toolbarItems;

      // Flatten any groups that are only partially selected
      var _loop = function _loop(_i2) {
        var group = items[_i2];
        if (group.length > 1) {
          var index = _this.value.findIndex(function (name) {
            return group.some(function (item) {
              return item.button === name;
            });
          });
          if (index !== -1) {
            for (var j = 0; j < group.length; j++) {
              if (_this.value[index + j] !== group[j].button) {
                items.splice.apply(items, [_i2, 1].concat(_toConsumableArray(group.map(function (item) {
                  return [item];
                }))));
                _i2 += group.length - 1;
                break;
              }
            }
          }
        }
        i = _i2;
      };
      for (var i = 0; i < items.length; i++) {
        _loop(i);
      }
      _this.drag = new Garnish.DragDrop({
        dropTargets: _this.$targetContainer,
        helper: function helper($item) {
          var $outerContainer = jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="offset-drag-helper ck ck-reset_all ck-editor ck-rounded-corners"/>');
          var $innerContainer = jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="ck ck-toolbar"/>').appendTo($outerContainer);
          $item.appendTo($innerContainer);
          return $outerContainer;
        },
        moveHelperToCursor: true,
        onDragStart: function onDragStart() {
          Garnish.$bod.addClass('dragging');
          var $draggee = _this.drag.$draggee;
          _this.draggingSourceItem = jquery__WEBPACK_IMPORTED_MODULE_1___default().contains(_this.$sourceContainer[0], $draggee[0]);
          _this.draggingSeparator = $draggee.hasClass('ckeditor-tb--separator');
          _this.$insertion = jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="ckeditor-tb--insertion"/>').css({
            width: $draggee.outerWidth()
          });
          if (_this.draggingSourceItem) {
            if (_this.draggingSeparator) {
              // don't hide the draggee as we're just going to duplicate it
              $draggee.css('visibility', '');
            } else {
              var property = Craft.orientation === 'ltr' ? 'margin-right' : 'margin-left';
              var margin = -1 * $draggee.outerWidth();
              $draggee.stop().velocity(_defineProperty({}, property, margin), 200, function () {
                $draggee.addClass('hidden');
              });
            }
          } else {
            $draggee.addClass('hidden');
            _this.$insertion.insertBefore($draggee);
            _this.showingInsertion = true;
          }
          _this.setMidpoints();
        },
        onDrag: function onDrag() {
          _this.checkForNewClosestItem();
        },
        onDragStop: function onDragStop() {
          Garnish.$bod.removeClass('dragging');
          var $draggee = _this.drag.$draggee;
          _this.checkForNewClosestItem();
          if (_this.showingInsertion) {
            if (_this.draggingSourceItem) {
              // clone the source item into the toolbar
              var $item;
              if (_this.draggingSeparator) {
                $item = _this.renderSeparator();
              } else {
                var componentNames = $draggee.data('componentNames');
                $item = _this.renderComponentGroup(componentNames);
                // add any config settings
                var _iterator = _createForOfIteratorHelper(componentNames),
                  _step;
                try {
                  var _loop2 = function _loop2() {
                    var name = _step.value;
                    var item = items.flat().find(function (_ref) {
                      var button = _ref.button;
                      return button === name;
                    });
                    if (item && item.configOption) {
                      configOptions.addSetting(item.configOption);
                    }
                  };
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop2();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
              $item.data('sourceItem', $draggee[0]);
              $item.css('visibility', 'hidden');
              _this.$insertion.replaceWith($item);
              _this.drag.$draggee = $item;
            } else {
              _this.$insertion.replaceWith($draggee);
              $draggee.removeClass('hidden');
            }
          } else {
            if (!_this.draggingSourceItem) {
              var $sourceItem = jquery__WEBPACK_IMPORTED_MODULE_1___default()($draggee.data('sourceItem'));
              $draggee.remove();
              _this.drag.$draggee = $draggee = $sourceItem;
              if (!_this.draggingSeparator) {
                // remove any config settings
                var _iterator2 = _createForOfIteratorHelper($sourceItem.data('componentNames')),
                  _step2;
                try {
                  var _loop3 = function _loop3() {
                    var name = _step2.value;
                    var item = items.flat().find(function (_ref2) {
                      var button = _ref2.button;
                      return button === name;
                    });
                    if (item && item.configOption) {
                      configOptions.removeSetting(item.configOption);
                    }
                  };
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    _loop3();
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
            }
            if (!_this.draggingSeparator) {
              $draggee.removeClass('hidden');
              var property = Craft.orientation === 'ltr' ? 'margin-right' : 'margin-left';
              var currentMargin = $draggee.css(property);
              $draggee.css(property, '');
              var targetMargin = $draggee.css(property);
              $draggee.css(property, currentMargin);
              $draggee.stop().velocity(_defineProperty({}, property, targetMargin), 200, function () {
                $draggee.css(property, '');
              });
            }
          }
          _this.drag.returnHelpersToDraggees();

          // reset the items
          _this.$items = _this.$targetContainer.children();
          _this.value = [];
          var _iterator3 = _createForOfIteratorHelper(_this.$items.toArray()),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var item = _step3.value;
              var _$item = jquery__WEBPACK_IMPORTED_MODULE_1___default()(item);
              if (_$item.hasClass('ckeditor-tb--separator')) {
                _this.value.push('|');
              } else {
                var _this$value;
                (_this$value = _this.value).push.apply(_this$value, _toConsumableArray(_$item.data('componentNames')));
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          _this.$input.val(JSON.stringify(_this.value));
        }
      });
      var sourceItems = {};
      var _iterator4 = _createForOfIteratorHelper(items),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var group = _step4.value;
          var $item = _this.renderComponentGroup(group);
          if (!$item) {
            continue;
          }
          $item.appendTo(_this.$sourceContainer);
          sourceItems[group.map(function (item) {
            return item.button;
          }).join(',')] = $item[0];
          if (_this.value.includes(group[0].button)) {
            $item.addClass('hidden');
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      sourceItems['|'] = _this.renderSeparator().appendTo(_this.$sourceContainer)[0];
      _this.$items = jquery__WEBPACK_IMPORTED_MODULE_1___default()();
      var _loop4 = function _loop4(_i4) {
          var name = _this.value[_i4];
          var $item, key;
          if (name === '|') {
            $item = _this.renderSeparator().appendTo(_this.$targetContainer);
            key = '|';
          } else {
            var _group = items.find(function (group) {
              return group.some(function (item) {
                return item.button === name;
              });
            });
            if (!_group) {
              _i3 = _i4;
              // must no longer be a valid item
              return 0; // continue
            }
            $item = _this.renderComponentGroup(_group);
            if (!$item) {
              _i3 = _i4;
              return 0; // continue
            }
            $item.appendTo(_this.$targetContainer);
            key = _group.map(function (item) {
              return item.button;
            }).join(',');
            _i4 += _group.length - 1;
          }
          $item.data('sourceItem', sourceItems[key]);
          _this.$items = _this.$items.add($item);
          _i3 = _i4;
        },
        _ret;
      for (var _i3 = 0; _i3 < _this.value.length; _i3++) {
        _ret = _loop4(_i3);
        if (_ret === 0) continue;
      }
    });
  },
  renderSeparator: function renderSeparator() {
    var $separator = jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="ckeditor-tb--item ckeditor-tb--separator" data-cke-tooltip-text="Separator"><span class="ck ck-toolbar__separator"/></div>');
    this.drag.addItems($separator);
    return $separator;
  },
  renderComponentGroup: function renderComponentGroup(group) {
    group = group.map(function (item) {
      return typeof item === 'string' ? item : item.button;
    });
    var elements = [];
    var tooltips = [];
    var _iterator5 = _createForOfIteratorHelper(group),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var name = _step5.value;
        var $element = void 0;
        try {
          $element = this.renderComponent(name);
        } catch (e) {
          console.warn(e);
          continue;
        }
        elements.push($element);
        var tooltip = ($element.is('[data-cke-tooltip-text]') ? $element : $element.find('[data-cke-tooltip-text]')).attr('data-cke-tooltip-text');
        tooltips.push(tooltip ? tooltip.replace(/ \(.*\)$/, '') : "".concat(name[0].toUpperCase()).concat(name.slice(1)));
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    if (!elements.length) {
      return false;
    }
    var $item = jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="ckeditor-tb--item"/>').append(elements);
    $item.attr('data-cke-tooltip-text', tooltips.join(', '));
    $item.data('componentNames', group);
    this.drag.addItems($item);
    return $item;
  },
  renderComponent: function renderComponent(name) {
    var component = this.components[name];
    if (!component) {
      throw "Missing component: ".concat(name);
    }
    if (!component.isRendered) {
      component.render();
    }
    var $element = jquery__WEBPACK_IMPORTED_MODULE_1___default()(component.element.outerHTML);
    $element.data('componentName', name);
    return $element;
  },
  getClosestItem: function getClosestItem() {
    var _this2 = this;
    if (!Garnish.hitTest(this.drag.mouseX, this.drag.mouseY, this.$targetContainer)) {
      return false;
    }
    if (!this.$items.length) {
      return null;
    }
    var items = this.$items.toArray();
    if (this.showingInsertion) {
      items.push(this.$insertion[0]);
    }
    var mouseDiffs = items.map(function (item) {
      var midpoint = jquery__WEBPACK_IMPORTED_MODULE_1___default().data(item, 'midpoint');
      return Garnish.getDist(midpoint.left, midpoint.top, _this2.drag.mouseX, _this2.drag.mouseY);
    });
    var minMouseDiff = Math.min.apply(Math, _toConsumableArray(mouseDiffs));
    var index = mouseDiffs.indexOf(minMouseDiff);
    return items[index];
  },
  checkForNewClosestItem: function checkForNewClosestItem() {
    // Is there a new closest item?
    var closestItem = this.getClosestItem();
    if (closestItem === false) {
      if (this.showingInsertion) {
        this.$insertion.remove();
        this.showingInsertion = false;
      }
      return;
    }
    if (closestItem === this.$insertion[0]) {
      return;
    }
    if (!closestItem) {
      this.$insertion.appendTo(this.$targetContainer);
    } else if (this.drag.mouseX < jquery__WEBPACK_IMPORTED_MODULE_1___default().data(closestItem, 'midpoint').left) {
      this.$insertion.insertBefore(closestItem);
    } else {
      this.$insertion.insertAfter(closestItem);
    }
    this.showingInsertion = true;
    this.setMidpoints();
  },
  setMidpoints: function setMidpoints() {
    var items = this.$items.toArray();
    if (this.showingInsertion) {
      items.push(this.$insertion[0]);
    }
    var _iterator6 = _createForOfIteratorHelper(items),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var item = _step6.value;
        var $item = jquery__WEBPACK_IMPORTED_MODULE_1___default()(item);
        var offset = $item.offset();
        var left = offset.left + $item.outerWidth() / 2;
        var top = offset.top + $item.outerHeight() / 2;
        $item.data('midpoint', {
          left: left,
          top: top
        });
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }
}));

/***/ }),

/***/ "../../../../../node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[4]!./ckeconfig.css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../../node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[4]!./ckeconfig.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./ckeconfig.css":
/*!***********************!*\
  !*** ./ckeconfig.css ***!
  \***********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../../../node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[4]!./ckeconfig.css */ "../../../../../node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[4]!./ckeconfig.css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "../../../../../node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("4690113c", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "../../../../../node_modules/vue-style-loader/lib/addStylesClient.js":
/*!***************************************************************************!*\
  !*** ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ addStylesClient; }
/* harmony export */ });
/* harmony import */ var _listToStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listToStyles */ "../../../../../node_modules/vue-style-loader/lib/listToStyles.js");
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = (0,_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = (0,_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "../../../../../node_modules/vue-style-loader/lib/listToStyles.js":
/*!************************************************************************!*\
  !*** ../../../../../node_modules/vue-style-loader/lib/listToStyles.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ listToStyles; }
/* harmony export */ });
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./ckeconfig.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolbarBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolbarBuilder */ "./ToolbarBuilder.js");
/* harmony import */ var _ConfigOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigOptions */ "./ConfigOptions.js");
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license GPL-3.0-or-later
 */



window.CKEditor5.craftcms.ToolbarBuilder = _ToolbarBuilder__WEBPACK_IMPORTED_MODULE_0__["default"];
window.CKEditor5.craftcms.ConfigOptions = _ConfigOptions__WEBPACK_IMPORTED_MODULE_1__["default"];
}();
/******/ })()
;
//# sourceMappingURL=ckeconfig.js.map