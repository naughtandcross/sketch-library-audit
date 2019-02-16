var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/audit.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/audit.js":
/*!**********************!*\
  !*** ./src/audit.js ***!
  \**********************/
/*! exports provided: runAudit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runAudit", function() { return runAudit; });
/* harmony import */ var _delegate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegate.js */ "./src/delegate.js");
/* harmony import */ var _delegate_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_delegate_js__WEBPACK_IMPORTED_MODULE_0__);
/* TODO
- More info about symbols (# overrides vs # layers) and styles (color, line weight, opacity)
- Remember previously selected library
*/


var sketch = __webpack_require__(/*! sketch/dom */ "sketch/dom");

var Library = __webpack_require__(/*! sketch/dom */ "sketch/dom").Library;

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var libraries = Library.getLibraries();
var currentSelection = 0;
var checkBoxes = [];
var libraryData = [];
var fileData = '';
function runAudit(context) {
  if (libraries.length == 0) {
    showError("Sorry, no libraries were found.");
  } else {
    libraryData = getLibraryData();

    if (libraryData.length == 0) {
      showError("Sorry, no valid libraries were found.");
    } else {
      showDialog();
    }
  }
}

function getLibraryData() {
  var data = [];

  for (var i = 0; i < libraries.length; i++) {
    if (libraries[i].valid) {
      var document = libraries[i].getDocument();
      var obj = {
        name: libraries[i].name,
        symbol: document.getSymbols(),
        layerStyle: document.sharedLayerStyles,
        textStyle: document.sharedTextStyles,
        path: ''
      };

      if (libraries[i].libraryType != "Remote") {
        obj['path'] = document.path;
      }

      data.push(obj);
    }
  }

  return data;
}

function showError(message) {
  var iconPath = context.plugin.urlForResourceNamed("icon.png").path();
  var icon = NSImage.alloc().initByReferencingFile(iconPath);
  var alert = NSAlert.alloc().init();
  alert.setIcon(icon);
  alert.setMessageText("Library Audit");
  alert.setInformativeText(message);
  alert.addButtonWithTitle("Ok");

  if (alert.runModal() == NSAlertFirstButtonReturn) {
    return;
  }
}

function showDialog() {
  var iconPath = context.plugin.urlForResourceNamed("icon.png").path();
  var icon = NSImage.alloc().initByReferencingFile(iconPath);
  var dialog = NSAlert.alloc().init();
  dialog.setIcon(icon);
  dialog.titlebarAppearsTransparent = true;
  dialog.setMessageText("Library Audit");
  dialog.setInformativeText("Export Symbol and Shared Style data from any Library to CSV.");
  dialog.addButtonWithTitle("Export");
  dialog.addButtonWithTitle("Cancel");
  var libraryLabel = createBoldLabel("Library", 12, NSMakeRect(0, 113, 100, 28));
  var librarySelect = createCombobox(getLibraryNames(), currentSelection, NSMakeRect(120, 118, 220, 28));
  var divider1 = createDivider(NSMakeRect(0, 104, 350, 1));
  var valuesLabel = createBoldLabel("Export Options", 12, NSMakeRect(0, 61, 100, 28));
  var symbolsCheck = createCheckbox(NSMakeRect(120, 66, 220, 28), "Symbols", "symbol", true, true);
  var layersCheck = createCheckbox(NSMakeRect(120, 38, 220, 28), "Layer Styles", "layer", true, true);
  var textCheck = createCheckbox(NSMakeRect(120, 10, 220, 28), "Text Styles", "text", true, true);
  var divider2 = createDivider(NSMakeRect(0, 0, 350, 1));
  checkBoxes = [symbolsCheck, layersCheck, textCheck];
  updateLabels();
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 350, 150));
  view.addSubview(libraryLabel);
  view.addSubview(librarySelect);
  view.addSubview(divider1);
  view.addSubview(valuesLabel);
  view.addSubview(symbolsCheck);
  view.addSubview(layersCheck);
  view.addSubview(textCheck);
  view.addSubview(divider2);
  dialog.setAccessoryView(view);
  var librarySelectDelegate = new _delegate_js__WEBPACK_IMPORTED_MODULE_0___default.a({
    "comboBoxSelectionDidChange:": function comboBoxSelectionDidChange() {
      currentSelection = librarySelect.indexOfSelectedItem();
      updateLabels();
    }
  });
  librarySelect.setDelegate(librarySelectDelegate.getClassInstance());

  if (dialog.runModal() != NSAlertFirstButtonReturn) {
    return;
  } else {
    createCSV();
    showSavePanel();
  }
}

function getLibraryNames() {
  var libraryNames = [];

  for (var i = 0; i < libraryData.length; i++) {
    libraryNames.push(libraryData[i].name);
  }

  return libraryNames;
}

function updateLabels() {
  checkBoxes[0].setTitle(libraryData[currentSelection].symbol.length + " Symbols");
  checkBoxes[1].setTitle(libraryData[currentSelection].layerStyle.length + " Layer Styles");
  checkBoxes[2].setTitle(libraryData[currentSelection].textStyle.length + " Text Styles");
}

function createCSV() {
  var columnNames = "Name,Instances,URI\n";
  var emptyRow = ",,\n";
  var symbolValues = [];

  if (checkBoxes[0].state()) {
    for (var i = 0; i < libraryData[currentSelection].symbol.length; i++) {
      var data = libraryData[currentSelection].symbol[i].name.replace(/,/g, '') + "," + libraryData[currentSelection].symbol[i].getAllInstances().length + ",";

      if (libraryData[currentSelection].path != '') {
        data += "sketch://" + libraryData[currentSelection].path + "?centerOnLayer=" + libraryData[currentSelection].symbol[i].id + "&zoom=1\n";
      }

      symbolValues.push(data);
    }

    symbolValues.sort();
    symbolValues.unshift("Symbols," + libraryData[currentSelection].symbol.length + "," + "\n");
    symbolValues.push(emptyRow);
  }

  var layerValues = [];

  if (checkBoxes[1].state()) {
    for (var i = 0; i < libraryData[currentSelection].layerStyle.length; i++) {
      var data = libraryData[currentSelection].layerStyle[i].name + "," + libraryData[currentSelection].layerStyle[i].getAllInstances().length + ",\n";
      layerValues.push(data);
    }

    layerValues.sort();
    layerValues.unshift("Layer Styles," + libraryData[currentSelection].layerStyle.length + "," + "\n");
    layerValues.push(emptyRow);
  }

  var textValues = [];

  if (checkBoxes[2].state()) {
    for (var i = 0; i < libraryData[currentSelection].textStyle.length; i++) {
      var data = libraryData[currentSelection].textStyle[i].name + "," + libraryData[currentSelection].textStyle[i].getAllInstances().length + ",\n";
      textValues.push(data);
    }

    textValues.sort();
    textValues.unshift("Text Styles," + libraryData[currentSelection].textStyle.length + "," + "\n");
  }

  var exportItems = symbolValues.concat(layerValues, textValues);
  exportItems.unshift(emptyRow);
  exportItems.unshift(columnNames);
  fileData = exportItems.join('');
}

function showSavePanel() {
  var savePanel = NSSavePanel.savePanel();
  savePanel.setNameFieldStringValue("audit.csv");
  savePanel.setAllowsOtherFileTypes(false);
  savePanel.setExtensionHidden(false);

  if (savePanel.runModal() != NSFileHandlingPanelOKButton) {
    UI.message('📓 Export canceled.');
    return;
  } else {
    var filePath = savePanel.URL().path();
    var file = NSString.stringWithString(fileData);
    file.writeToFile_atomically_encoding_error(filePath, true, NSUTF8StringEncoding, null);
    UI.message('📓 Export of ' + filePath + " complete!");
  }
}

function createBoldLabel(text, size, frame) {
  var label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);
  label.setFont(NSFont.boldSystemFontOfSize(size));
  label.setBezeled(false);
  label.setDrawsBackground(false);
  label.setEditable(false);
  label.setSelectable(false);
  return label;
}

function createCheckbox(frame, name, value, onstate, enabled) {
  var checkbox = NSButton.alloc().initWithFrame(frame);
  checkbox.setButtonType(NSSwitchButton);
  checkbox.setTitle(name);
  checkbox.setTag(value);
  checkbox.setState(onstate ? NSOnState : NSOffState);
  checkbox.setEnabled(enabled);
  return checkbox;
}

function createCombobox(items, selectedItemIndex, frame) {
  var comboBox = NSComboBox.alloc().initWithFrame(frame),
      selectedItemIndex = selectedItemIndex > -1 ? selectedItemIndex : 0;
  comboBox.addItemsWithObjectValues(items);
  comboBox.selectItemAtIndex(selectedItemIndex);
  comboBox.setNumberOfVisibleItems(16);
  comboBox.setCompletes(1);
  return comboBox;
}

function createDivider(frame) {
  var divider = NSView.alloc().initWithFrame(frame);
  divider.setWantsLayer(1);
  divider.layer().setBackgroundColor(CGColorCreateGenericRGB(204 / 255, 204 / 255, 204 / 255, 1.0));
  return divider;
}

/***/ }),

/***/ "./src/delegate.js":
/*!*************************!*\
  !*** ./src/delegate.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var MochaJSDelegate = function MochaJSDelegate(selectorHandlerDict) {
  var uniqueClassName = "MochaJSDelegate_DynamicClass_" + NSUUID.UUID().UUIDString();
  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, NSObject);
  delegateClassDesc.registerClass();
  var handlers = {};

  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = selectorString in handlers;
    var selector = NSSelectorFromString(selectorString);
    handlers[selectorString] = func;

    if (!handlerHasBeenSet) {
      var dynamicHandler = function dynamicHandler() {
        var functionToCall = handlers[selectorString];
        if (!functionToCall) return;
        return functionToCall.apply(delegateClassDesc, arguments);
      };

      var args = [],
          match = '',
          regex = /:/g;

      while (match = regex.exec(selectorString)) {
        args.push("arg" + args.length);
      }

      var dynamicFunction = eval("(function(" + args.join(",") + "){ return dynamicHandler.apply(this, arguments); })");
      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction);
    }
  };

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString];
  };

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString];
  };

  this.getAllHandlers = function () {
    return handlers;
  };

  this.getClass = function () {
    return NSClassFromString(uniqueClassName);
  };

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new();
  };

  if (_typeof(selectorHandlerDict) == "object") {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString]);
    }
  }
};

module.exports = MochaJSDelegate;

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['runAudit'] = __skpm_run.bind(this, 'runAudit');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=audit.js.map