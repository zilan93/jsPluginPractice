/**
 * Created by Administrator on 2016/12/6.
 */
(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
})([function(module, exports, __webpack_require__) {
    'use strict';
    __webpack_require__(18);
    var _store = __webpack_require__(315);
    var _reducers = __webpack_require__(316);
    var _resource = __webpack_require__(323);
    var _detail = __webpack_require__(351);
    var detailData = window.pageData;
    var store = (0,
        _store.createStore)(_reducers.reducers, {
        status: detailData.status,
        isLogin: detailData.isLogin,
        detail: detailData,
        productId: detailData.productId,
        productType: detailData.productType,
        productName: detailData.productName,
        proMode: detailData.proMode,
        tagType: detailData.tagType,
        bookCityCode: detailData.bookCityCode,
        departCityCode: detailData.departCityCode,
        backCityCode: detailData.backCityCode,
        coupon: detailData.coupon,
        isSupportMultipleJourney: detailData.isSupportMultipleJourney,
        journeyDays: detailData.journeyDays,
        multiTab: detailData.multiTab,
        journey: detailData.journey,
        calendar: null ,
        departDate: '',
        retailCity: detailData.signInfo && detailData.signInfo.company,
        adult: 2,
        child: 0,
        freeChild: 0,
        departCity: {
            code: detailData.departCityCode,
            name: detailData.departCityName
        },
        backCity: {
            code: detailData.backCityCode,
            name: detailData.backCityName
        },
        hotDepartCities: detailData.recCityInfo,
        allDepartCities: detailData.departCityInfo,
        allBackCities: detailData.backCityInfo,
        combinedTransportCities: detailData.combinedTransportCities
    });
    _resource.resourceModule.init();
    _detail.detailModule.init();
}
    , function(module, exports, __webpack_require__) {
        var require;
        var require;
        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        "use strict";
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
            }
                : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }
            ;
        !function(e) {
            if ("object" == (false ? "undefined" : _typeof(exports)) && "undefined" != typeof module)
                module.exports = e();
            else if (true)
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [],
                    __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
                    __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            else {
                var f;
                "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self),
                    f.ejs = e();
            }
        }(function() {
            var define, module, exports;
            return function e(t, n, r) {
                function s(o, u) {
                    if (!n[o]) {
                        if (!t[o]) {
                            var a = typeof require == "function" && require;
                            if (!u && a)
                                return require(o, !0);
                            if (i)
                                return i(o, !0);
                            var f = new Error("Cannot find module '" + o + "'");
                            throw f.code = "MODULE_NOT_FOUND",
                                f;
                        }
                        var l = n[o] = {
                            exports: {}
                        };
                        t[o][0].call(l.exports, function(e) {
                            var n = t[o][1][e];
                            return s(n ? n : e);
                        }, l, l.exports, e, t, n, r);
                    }
                    return n[o].exports;
                }
                var i = typeof require == "function" && require;
                for (var o = 0; o < r.length; o++) {
                    s(r[o]);
                }
                return s;
            }({
                1: [function(require, module, exports) {
                    'use strict';
                    var fs = require('fs');
                    var path = require('path');
                    var utils = require('./utils');
                    var scopeOptionWarned = false;
                    var _VERSION_STRING = require('../package.json').version;
                    var _DEFAULT_DELIMITER = '%';
                    var _DEFAULT_LOCALS_NAME = 'locals';
                    var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
                    var _OPTS = ['cache', 'filename', 'delimiter', 'scope', 'context', 'debug', 'compileDebug', 'client', '_with', 'root', 'rmWhitespace', 'strict', 'localsName'];
                    var _TRAILING_SEMCOL = /;\s*$/;
                    var _BOM = /^\uFEFF/;
                    exports.cache = utils.cache;
                    exports.localsName = _DEFAULT_LOCALS_NAME;
                    exports.resolveInclude = function(name, filename, isDir) {
                        var dirname = path.dirname;
                        var extname = path.extname;
                        var resolve = path.resolve;
                        var includePath = resolve(isDir ? filename : dirname(filename), name);
                        var ext = extname(name);
                        if (!ext) {
                            includePath += '.ejs';
                        }
                        return includePath;
                    }
                    ;
                    function getIncludePath(path, options) {
                        var includePath;
                        if (path.charAt(0) == '/') {
                            includePath = exports.resolveInclude(path.replace(/^\/*/, ''), options.root || '/', true);
                        } else {
                            if (!options.filename) {
                                throw new Error('`include` use relative path requires the \'filename\' option.');
                            }
                            includePath = exports.resolveInclude(path, options.filename);
                        }
                        return includePath;
                    }
                    function handleCache(options, template) {
                        var func;
                        var filename = options.filename;
                        var hasTemplate = arguments.length > 1;
                        if (options.cache) {
                            if (!filename) {
                                throw new Error('cache option requires a filename');
                            }
                            func = exports.cache.get(filename);
                            if (func) {
                                return func;
                            }
                            if (!hasTemplate) {
                                template = fs.readFileSync(filename).toString().replace(_BOM, '');
                            }
                        } else if (!hasTemplate) {
                            if (!filename) {
                                throw new Error('Internal EJS error: no file name or template ' + 'provided');
                            }
                            template = fs.readFileSync(filename).toString().replace(_BOM, '');
                        }
                        func = exports.compile(template, options);
                        if (options.cache) {
                            exports.cache.set(filename, func);
                        }
                        return func;
                    }
                    function includeFile(path, options) {
                        var opts = utils.shallowCopy({}, options);
                        opts.filename = getIncludePath(path, opts);
                        return handleCache(opts);
                    }
                    function includeSource(path, options) {
                        var opts = utils.shallowCopy({}, options);
                        var includePath;
                        var template;
                        includePath = getIncludePath(path, opts);
                        template = fs.readFileSync(includePath).toString().replace(_BOM, '');
                        opts.filename = includePath;
                        var templ = new Template(template,opts);
                        templ.generateSource();
                        return {
                            source: templ.source,
                            filename: includePath,
                            template: template
                        };
                    }
                    function rethrow(err, str, filename, lineno) {
                        var lines = str.split('\n');
                        var start = Math.max(lineno - 3, 0);
                        var end = Math.min(lines.length, lineno + 3);
                        var context = lines.slice(start, end).map(function(line, i) {
                            var curr = i + start + 1;
                            return (curr == lineno ? ' >> ' : '    ') + curr + '| ' + line;
                        }).join('\n');
                        err.path = filename;
                        err.message = (filename || 'ejs') + ':' + lineno + '\n' + context + '\n\n' + err.message;
                        throw err;
                    }
                    function cpOptsInData(data, opts) {
                        _OPTS.forEach(function(p) {
                            if (typeof data[p] != 'undefined') {
                                opts[p] = data[p];
                            }
                        });
                    }
                    exports.compile = function compile(template, opts) {
                        var templ;
                        if (opts && opts.scope) {
                            if (!scopeOptionWarned) {
                                console.warn('`scope` option is deprecated and will be removed in EJS 3');
                                scopeOptionWarned = true;
                            }
                            if (!opts.context) {
                                opts.context = opts.scope;
                            }
                            delete opts.scope;
                        }
                        templ = new Template(template,opts);
                        return templ.compile();
                    }
                    ;
                    exports.render = function(template, d, o) {
                        var data = d || {};
                        var opts = o || {};
                        if (arguments.length == 2) {
                            cpOptsInData(data, opts);
                        }
                        return handleCache(opts, template)(data);
                    }
                    ;
                    exports.renderFile = function() {
                        var args = Array.prototype.slice.call(arguments);
                        var filename = args.shift();
                        var cb = args.pop();
                        var data = args.shift() || {};
                        var opts = args.pop() || {};
                        var result;
                        opts = utils.shallowCopy({}, opts);
                        if (arguments.length == 3) {
                            if (data.settings && data.settings['view options']) {
                                cpOptsInData(data.settings['view options'], opts);
                            } else {
                                cpOptsInData(data, opts);
                            }
                        }
                        opts.filename = filename;
                        try {
                            result = handleCache(opts)(data);
                        } catch (err) {
                            return cb(err);
                        }
                        return cb(null , result);
                    }
                    ;
                    exports.clearCache = function() {
                        exports.cache.reset();
                    }
                    ;
                    function Template(text, opts) {
                        opts = opts || {};
                        var options = {};
                        this.templateText = text;
                        this.mode = null ;
                        this.truncate = false;
                        this.currentLine = 1;
                        this.source = '';
                        this.dependencies = [];
                        options.client = opts.client || false;
                        options.escapeFunction = opts.escape || utils.escapeXML;
                        options.compileDebug = opts.compileDebug !== false;
                        options.debug = !!opts.debug;
                        options.filename = opts.filename;
                        options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
                        options.strict = opts.strict || false;
                        options.context = opts.context;
                        options.cache = opts.cache || false;
                        options.rmWhitespace = opts.rmWhitespace;
                        options.root = opts.root;
                        options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
                        if (options.strict) {
                            options._with = false;
                        } else {
                            options._with = typeof opts._with != 'undefined' ? opts._with : true;
                        }
                        this.opts = options;
                        this.regex = this.createRegex();
                    }
                    Template.modes = {
                        EVAL: 'eval',
                        ESCAPED: 'escaped',
                        RAW: 'raw',
                        COMMENT: 'comment',
                        LITERAL: 'literal'
                    };
                    Template.prototype = {
                        createRegex: function createRegex() {
                            var str = _REGEX_STRING;
                            var delim = utils.escapeRegExpChars(this.opts.delimiter);
                            str = str.replace(/%/g, delim);
                            return new RegExp(str);
                        },
                        compile: function compile() {
                            var src;
                            var fn;
                            var opts = this.opts;
                            var prepended = '';
                            var appended = '';
                            var escape = opts.escapeFunction;
                            if (!this.source) {
                                this.generateSource();
                                prepended += '  var __output = [], __append = __output.push.bind(__output);' + '\n';
                                if (opts._with !== false) {
                                    prepended += '  with (' + opts.localsName + ' || {}) {' + '\n';
                                    appended += '  }' + '\n';
                                }
                                appended += '  return __output.join("");' + '\n';
                                this.source = prepended + this.source + appended;
                            }
                            if (opts.compileDebug) {
                                src = 'var __line = 1' + '\n' + '  , __lines = ' + JSON.stringify(this.templateText) + '\n' + '  , __filename = ' + (opts.filename ? JSON.stringify(opts.filename) : 'undefined') + ';' + '\n' + 'try {' + '\n' + this.source + '} catch (e) {' + '\n' + '  rethrow(e, __lines, __filename, __line);' + '\n' + '}' + '\n';
                            } else {
                                src = this.source;
                            }
                            if (opts.debug) {
                                console.log(src);
                            }
                            if (opts.client) {
                                src = 'escape = escape || ' + escape.toString() + ';' + '\n' + src;
                                if (opts.compileDebug) {
                                    src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
                                }
                            }
                            if (opts.strict) {
                                src = '"use strict";\n' + src;
                            }
                            try {
                                fn = new Function(opts.localsName + ', escape, include, rethrow',src);
                            } catch (e) {
                                if (e instanceof SyntaxError) {
                                    if (opts.filename) {
                                        e.message += ' in ' + opts.filename;
                                    }
                                    e.message += ' while compiling ejs';
                                }
                                throw e;
                            }
                            if (opts.client) {
                                fn.dependencies = this.dependencies;
                                return fn;
                            }
                            var returnedFn = function returnedFn(data) {
                                    var include = function include(path, includeData) {
                                            var d = utils.shallowCopy({}, data);
                                            if (includeData) {
                                                d = utils.shallowCopy(d, includeData);
                                            }
                                            return includeFile(path, opts)(d);
                                        }
                                        ;
                                    return fn.apply(opts.context, [data || {}, escape, include, rethrow]);
                                }
                                ;
                            returnedFn.dependencies = this.dependencies;
                            return returnedFn;
                        },
                        generateSource: function generateSource() {
                            var opts = this.opts;
                            if (opts.rmWhitespace) {
                                this.templateText = this.templateText.replace(/\r/g, '').replace(/^\s+|\s+$/gm, '');
                            }
                            this.templateText = this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');
                            var self = this;
                            var matches = this.parseTemplateText();
                            var d = this.opts.delimiter;
                            if (matches && matches.length) {
                                matches.forEach(function(line, index) {
                                    var opening;
                                    var closing;
                                    var include;
                                    var includeOpts;
                                    var includeObj;
                                    var includeSrc;
                                    if (line.indexOf('<' + d) === 0 && line.indexOf('<' + d + d) !== 0) {
                                        closing = matches[index + 2];
                                        if (!(closing == d + '>' || closing == '-' + d + '>' || closing == '_' + d + '>')) {
                                            throw new Error('Could not find matching close tag for "' + line + '".');
                                        }
                                    }
                                    if (include = line.match(/^\s*include\s+(\S+)/)) {
                                        opening = matches[index - 1];
                                        if (opening && (opening == '<' + d || opening == '<' + d + '-' || opening == '<' + d + '_')) {
                                            includeOpts = utils.shallowCopy({}, self.opts);
                                            includeObj = includeSource(include[1], includeOpts);
                                            if (self.opts.compileDebug) {
                                                includeSrc = '    ; (function(){' + '\n' + '      var __line = 1' + '\n' + '      , __lines = ' + JSON.stringify(includeObj.template) + '\n' + '      , __filename = ' + JSON.stringify(includeObj.filename) + ';' + '\n' + '      try {' + '\n' + includeObj.source + '      } catch (e) {' + '\n' + '        rethrow(e, __lines, __filename, __line);' + '\n' + '      }' + '\n' + '    ; }).call(this)' + '\n';
                                            } else {
                                                includeSrc = '    ; (function(){' + '\n' + includeObj.source + '    ; }).call(this)' + '\n';
                                            }
                                            self.source += includeSrc;
                                            self.dependencies.push(exports.resolveInclude(include[1], includeOpts.filename));
                                            return;
                                        }
                                    }
                                    self.scanLine(line);
                                });
                            }
                        },
                        parseTemplateText: function parseTemplateText() {
                            var str = this.templateText;
                            var pat = this.regex;
                            var result = pat.exec(str);
                            var arr = [];
                            var firstPos;
                            while (result) {
                                firstPos = result.index;
                                if (firstPos !== 0) {
                                    arr.push(str.substring(0, firstPos));
                                    str = str.slice(firstPos);
                                }
                                arr.push(result[0]);
                                str = str.slice(result[0].length);
                                result = pat.exec(str);
                            }
                            if (str) {
                                arr.push(str);
                            }
                            return arr;
                        },
                        scanLine: function scanLine(line) {
                            var self = this;
                            var d = this.opts.delimiter;
                            var newLineCount = 0;
                            function _addOutput() {
                                if (self.truncate) {
                                    line = line.replace(/^(?:\r\n|\r|\n)/, '');
                                    self.truncate = false;
                                } else if (self.opts.rmWhitespace) {
                                    line = line.replace(/^\n/, '');
                                }
                                if (!line) {
                                    return;
                                }
                                line = line.replace(/\\/g, '\\\\');
                                line = line.replace(/\n/g, '\\n');
                                line = line.replace(/\r/g, '\\r');
                                line = line.replace(/"/g, '\\"');
                                self.source += '    ; __append("' + line + '")' + '\n';
                            }
                            newLineCount = line.split('\n').length - 1;
                            switch (line) {
                                case '<' + d:
                                case '<' + d + '_':
                                    this.mode = Template.modes.EVAL;
                                    break;
                                case '<' + d + '=':
                                    this.mode = Template.modes.ESCAPED;
                                    break;
                                case '<' + d + '-':
                                    this.mode = Template.modes.RAW;
                                    break;
                                case '<' + d + '#':
                                    this.mode = Template.modes.COMMENT;
                                    break;
                                case '<' + d + d:
                                    this.mode = Template.modes.LITERAL;
                                    this.source += '    ; __append("' + line.replace('<' + d + d, '<' + d) + '")' + '\n';
                                    break;
                                case d + d + '>':
                                    this.mode = Template.modes.LITERAL;
                                    this.source += '    ; __append("' + line.replace(d + d + '>', d + '>') + '")' + '\n';
                                    break;
                                case d + '>':
                                case '-' + d + '>':
                                case '_' + d + '>':
                                    if (this.mode == Template.modes.LITERAL) {
                                        _addOutput();
                                    }
                                    this.mode = null ;
                                    this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
                                    break;
                                default:
                                    if (this.mode) {
                                        switch (this.mode) {
                                            case Template.modes.EVAL:
                                            case Template.modes.ESCAPED:
                                            case Template.modes.RAW:
                                                if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
                                                    line += '\n';
                                                }
                                        }
                                        switch (this.mode) {
                                            case Template.modes.EVAL:
                                                this.source += '    ; ' + line + '\n';
                                                break;
                                            case Template.modes.ESCAPED:
                                                this.source += '    ; __append(escape(' + line.replace(_TRAILING_SEMCOL, '').trim() + '))' + '\n';
                                                break;
                                            case Template.modes.RAW:
                                                this.source += '    ; __append(' + line.replace(_TRAILING_SEMCOL, '').trim() + ')' + '\n';
                                                break;
                                            case Template.modes.COMMENT:
                                                break;
                                            case Template.modes.LITERAL:
                                                _addOutput();
                                                break;
                                        }
                                    } else {
                                        _addOutput();
                                    }
                            }
                            if (self.opts.compileDebug && newLineCount) {
                                this.currentLine += newLineCount;
                                this.source += '    ; __line = ' + this.currentLine + '\n';
                            }
                        }
                    };
                    exports.escapeXML = utils.escapeXML;
                    exports.__express = exports.renderFile;
                    if (require.extensions) {
                        require.extensions['.ejs'] = function(module, flnm) {
                            var filename = flnm || module.filename;
                            var options = {
                                filename: filename,
                                client: true
                            };
                            var template = fs.readFileSync(filename).toString();
                            var fn = exports.compile(template, options);
                            module._compile('module.exports = ' + fn.toString() + ';', filename);
                        }
                        ;
                    }
                    exports.VERSION = _VERSION_STRING;
                    if (typeof window != 'undefined') {
                        window.ejs = exports;
                    }
                }
                    , {
                        "../package.json": 6,
                        "./utils": 2,
                        "fs": 3,
                        "path": 4
                    }],
                2: [function(require, module, exports) {
                    'use strict';
                    var regExpChars = /[|\\{}()[\]^$+*?.]/g;
                    exports.escapeRegExpChars = function(string) {
                        if (!string) {
                            return '';
                        }
                        return String(string).replace(regExpChars, '\\$&');
                    }
                    ;
                    var _ENCODE_HTML_RULES = {
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&#34;',
                        "'": '&#39;'
                    }
                        , _MATCH_HTML = /[&<>\'"]/g;
                    function encode_char(c) {
                        return _ENCODE_HTML_RULES[c] || c;
                    }
                    ;var escapeFuncStr = 'var _ENCODE_HTML_RULES = {\n' + '      "&": "&amp;"\n' + '    , "<": "&lt;"\n' + '    , ">": "&gt;"\n' + '    , \'"\': "&#34;"\n' + '    , "\'": "&#39;"\n' + '    }\n' + '  , _MATCH_HTML = /[&<>\'"]/g;\n' + 'function encode_char(c) {\n' + '  return _ENCODE_HTML_RULES[c] || c;\n' + '};\n';
                    exports.escapeXML = function(markup) {
                        return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
                    }
                    ;
                    exports.escapeXML.toString = function() {
                        return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
                    }
                    ;
                    exports.shallowCopy = function(to, from) {
                        from = from || {};
                        for (var p in from) {
                            to[p] = from[p];
                        }
                        return to;
                    }
                    ;
                    exports.cache = {
                        _data: {},
                        set: function set(key, val) {
                            this._data[key] = val;
                        },
                        get: function get(key) {
                            return this._data[key];
                        },
                        reset: function reset() {
                            this._data = {};
                        }
                    };
                }
                    , {}],
                3: [function(require, module, exports) {}
                    , {}],
                4: [function(require, module, exports) {
                    (function(process) {
                            function normalizeArray(parts, allowAboveRoot) {
                                var up = 0;
                                for (var i = parts.length - 1; i >= 0; i--) {
                                    var last = parts[i];
                                    if (last === '.') {
                                        parts.splice(i, 1);
                                    } else if (last === '..') {
                                        parts.splice(i, 1);
                                        up++;
                                    } else if (up) {
                                        parts.splice(i, 1);
                                        up--;
                                    }
                                }
                                if (allowAboveRoot) {
                                    for (; up--; up) {
                                        parts.unshift('..');
                                    }
                                }
                                return parts;
                            }
                            var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                            var splitPath = function splitPath(filename) {
                                    return splitPathRe.exec(filename).slice(1);
                                }
                                ;
                            exports.resolve = function() {
                                var resolvedPath = ''
                                    , resolvedAbsolute = false;
                                for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                                    var path = i >= 0 ? arguments[i] : process.cwd();
                                    if (typeof path !== 'string') {
                                        throw new TypeError('Arguments to path.resolve must be strings');
                                    } else if (!path) {
                                        continue;
                                    }
                                    resolvedPath = path + '/' + resolvedPath;
                                    resolvedAbsolute = path.charAt(0) === '/';
                                }
                                resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
                                    return !!p;
                                }), !resolvedAbsolute).join('/');
                                return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
                            }
                            ;
                            exports.normalize = function(path) {
                                var isAbsolute = exports.isAbsolute(path)
                                    , trailingSlash = substr(path, -1) === '/';
                                path = normalizeArray(filter(path.split('/'), function(p) {
                                    return !!p;
                                }), !isAbsolute).join('/');
                                if (!path && !isAbsolute) {
                                    path = '.';
                                }
                                if (path && trailingSlash) {
                                    path += '/';
                                }
                                return (isAbsolute ? '/' : '') + path;
                            }
                            ;
                            exports.isAbsolute = function(path) {
                                return path.charAt(0) === '/';
                            }
                            ;
                            exports.join = function() {
                                var paths = Array.prototype.slice.call(arguments, 0);
                                return exports.normalize(filter(paths, function(p, index) {
                                    if (typeof p !== 'string') {
                                        throw new TypeError('Arguments to path.join must be strings');
                                    }
                                    return p;
                                }).join('/'));
                            }
                            ;
                            exports.relative = function(from, to) {
                                from = exports.resolve(from).substr(1);
                                to = exports.resolve(to).substr(1);
                                function trim(arr) {
                                    var start = 0;
                                    for (; start < arr.length; start++) {
                                        if (arr[start] !== '')
                                            break;
                                    }
                                    var end = arr.length - 1;
                                    for (; end >= 0; end--) {
                                        if (arr[end] !== '')
                                            break;
                                    }
                                    if (start > end)
                                        return [];
                                    return arr.slice(start, end - start + 1);
                                }
                                var fromParts = trim(from.split('/'));
                                var toParts = trim(to.split('/'));
                                var length = Math.min(fromParts.length, toParts.length);
                                var samePartsLength = length;
                                for (var i = 0; i < length; i++) {
                                    if (fromParts[i] !== toParts[i]) {
                                        samePartsLength = i;
                                        break;
                                    }
                                }
                                var outputParts = [];
                                for (var i = samePartsLength; i < fromParts.length; i++) {
                                    outputParts.push('..');
                                }
                                outputParts = outputParts.concat(toParts.slice(samePartsLength));
                                return outputParts.join('/');
                            }
                            ;
                            exports.sep = '/';
                            exports.delimiter = ':';
                            exports.dirname = function(path) {
                                var result = splitPath(path)
                                    , root = result[0]
                                    , dir = result[1];
                                if (!root && !dir) {
                                    return '.';
                                }
                                if (dir) {
                                    dir = dir.substr(0, dir.length - 1);
                                }
                                return root + dir;
                            }
                            ;
                            exports.basename = function(path, ext) {
                                var f = splitPath(path)[2];
                                if (ext && f.substr(-1 * ext.length) === ext) {
                                    f = f.substr(0, f.length - ext.length);
                                }
                                return f;
                            }
                            ;
                            exports.extname = function(path) {
                                return splitPath(path)[3];
                            }
                            ;
                            function filter(xs, f) {
                                if (xs.filter)
                                    return xs.filter(f);
                                var res = [];
                                for (var i = 0; i < xs.length; i++) {
                                    if (f(xs[i], i, xs))
                                        res.push(xs[i]);
                                }
                                return res;
                            }
                            var substr = 'ab'.substr(-1) === 'b' ? function(str, start, len) {
                                    return str.substr(start, len);
                                }
                                    : function(str, start, len) {
                                    if (start < 0)
                                        start = str.length + start;
                                    return str.substr(start, len);
                                }
                                ;
                        }
                    ).call(this, require('_process'));
                }
                    , {
                        "_process": 5
                    }],
                5: [function(require, module, exports) {
                    var process = module.exports = {};
                    var queue = [];
                    var draining = false;
                    function drainQueue() {
                        if (draining) {
                            return;
                        }
                        draining = true;
                        var currentQueue;
                        var len = queue.length;
                        while (len) {
                            currentQueue = queue;
                            queue = [];
                            var i = -1;
                            while (++i < len) {
                                currentQueue[i]();
                            }
                            len = queue.length;
                        }
                        draining = false;
                    }
                    process.nextTick = function(fun) {
                        queue.push(fun);
                        if (!draining) {
                            setTimeout(drainQueue, 0);
                        }
                    }
                    ;
                    process.title = 'browser';
                    process.browser = true;
                    process.env = {};
                    process.argv = [];
                    process.version = '';
                    process.versions = {};
                    function noop() {}
                    process.on = noop;
                    process.addListener = noop;
                    process.once = noop;
                    process.off = noop;
                    process.removeListener = noop;
                    process.removeAllListeners = noop;
                    process.emit = noop;
                    process.binding = function(name) {
                        throw new Error('process.binding is not supported');
                    }
                    ;
                    process.cwd = function() {
                        return '/';
                    }
                    ;
                    process.chdir = function(dir) {
                        throw new Error('process.chdir is not supported');
                    }
                    ;
                    process.umask = function() {
                        return 0;
                    }
                    ;
                }
                    , {}],
                6: [function(require, module, exports) {
                    module.exports = {
                        "name": "ejs",
                        "description": "Embedded JavaScript templates",
                        "keywords": ["template", "engine", "ejs"],
                        "version": "2.5.2",
                        "author": "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
                        "contributors": ["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"],
                        "license": "Apache-2.0",
                        "main": "./lib/ejs.js",
                        "repository": {
                            "type": "git",
                            "url": "git://github.com/mde/ejs.git"
                        },
                        "bugs": "https://github.com/mde/ejs/issues",
                        "homepage": "https://github.com/mde/ejs",
                        "dependencies": {},
                        "devDependencies": {
                            "browserify": "^13.0.1",
                            "eslint": "^3.0.0",
                            "istanbul": "~0.4.3",
                            "jake": "^8.0.0",
                            "jsdoc": "^3.4.0",
                            "lru-cache": "^4.0.1",
                            "mocha": "^3.0.2",
                            "rimraf": "^2.2.8",
                            "uglify-js": "^2.6.2"
                        },
                        "engines": {
                            "node": ">=0.10.0"
                        },
                        "scripts": {
                            "test": "mocha",
                            "coverage": "istanbul cover node_modules/mocha/bin/_mocha",
                            "doc": "rimraf out && jsdoc -c jsdoc.json lib/* docs/jsdoc/*",
                            "devdoc": "rimraf out && jsdoc -p -c jsdoc.json lib/* docs/jsdoc/*"
                        }
                    };
                }
                    , {}]
            }, {}, [1])(1);
        });
    }
    , , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.journey4Module = undefined;
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
            }
                : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }
            ;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _fixer = __webpack_require__(5);
        var _taber = __webpack_require__(6);
        var _scrollTaber = __webpack_require__(7);
        var _Map = __webpack_require__(8);
        var _dialog = __webpack_require__(10);
        var _layer = __webpack_require__(11);
        var _ejs = __webpack_require__(1);
        var ejs = _interopRequireWildcard(_ejs);
        var _spotDetail = __webpack_require__(13);
        var _ = __webpack_require__(14);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var $win = $(window);
        var $doc = $(document);
        var bigMapQueue = [];
        var smallMapQueue = [];
        var mapInitialized = false;
        var spotDetailRender = ejs.compile(_spotDetail.spotDetailTemplate, {
            client: true
        });
        function showDetail() {}
        function hideDetail() {}
        function initializeMap() {
            if (mapInitialized) {
                return;
            }
            window.initializeMapModule = function() {
                mapInitialized = true;
                window.initializeMapModule = null ;
                if (smallMapQueue.length) {
                    while (smallMapQueue.length) {
                        var map = smallMapQueue.pop();
                        map.callback(getSmallMap(map.$element));
                    }
                }
                if (smallMapQueue.length) {
                    while (smallMapQueue.length) {
                        var _map = smallMapQueue.pop();
                        _map.callback(getSmallMap(_map.$element));
                    }
                }
            }
            ;
            $('<script src="http://maps.google.cn/maps/api/js?sensor=false&callback=initializeMapModule" defer sync></script>').appendTo('head');
        }
        function getSmallMap($element, callback) {
            if (mapInitialized) {
                if ($element && $element[0]) {
                    return new _Map.Map($element[0]);
                }
            } else {
                smallMapQueue.push({
                    $element: $element,
                    callback: callback
                });
                initializeMap();
                return null ;
            }
        }
        function removeSmallMap($element) {
            for (var i = smallMapQueue.length - 1; i >= 0; i--) {
                if (smallMapQueue[i] && smallMapQueue[i].$element === $element) {
                    smallMapQueue.splice(i, 1);
                }
            }
        }
        function getAllMapSpotData(journeyData) {
            var spotGroups = [];
            if (journeyData.scheduleType == 1) {
                (journeyData.detail || []).reduce(function(list, dayItem) {
                    var spotList = (dayItem.data || []).reduce(function(list, moduleItem) {
                        if (moduleItem.moduleTypeValue == 1) {
                            (moduleItem.data || []).reduce(function(list, resource) {
                                if (resource.latitude && resource.longitude) {
                                    list.push(resource);
                                }
                                return list;
                            }, list);
                        }
                        return list;
                    }, []);
                    list.push({
                        day: dayItem.day,
                        cid: dayItem.cid,
                        list: spotList
                    });
                    return list;
                }, spotGroups);
            }
            return spotGroups.filter(function(item) {
                return item.list.length;
            });
        }
        var Journey = function() {
            function Journey($element, data, options) {
                _classCallCheck(this, Journey);
                this.valid = data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? true : false;
                this.$element = $element;
                this.data = data || {};
                this.options = Object.assign({
                    tabHeight: 0
                }, options);
                this.isResourceType = this.data.scheduleType == 2;
                this.currentDayId = null ;
                this.inited = false;
                this.resList = null ;
            }
            _createClass(Journey, [{
                key: 'init',
                value: function init() {
                    if (!this.valid) {
                        return;
                    }
                    this.inited = true;
                    this.resList = this.data.detail.reduce(function(sum, dayItem) {
                        sum[dayItem.cid] = dayItem;
                        (dayItem.data || []).forEach(function(moduleItem) {
                            sum[moduleItem.cid] = moduleItem;
                            (moduleItem.data || []).forEach(function(resItem) {
                                sum[resItem.cid] = resItem;
                            });
                        });
                        return sum;
                    }, {});
                    this.smallMapData = getAllMapSpotData(this.data);
                    var $journeyNav = this.$element.find('.J_JourneyNav');
                    var $journey = this.$element.find('.J_DetailJourney');
                    var navMainTaber = (0,
                        _scrollTaber.createScrollTaber)($journeyNav, Object.assign({
                        ctx: this.$element,
                        offset: this.options.tabHeight
                    }, this.options.scrollTaber));
                    if (!this.isResourceType) {
                        var navSubTaber = (0,
                            _scrollTaber.createScrollTaber)($journeyNav, {
                            ctx: this.$element,
                            offset: this.options.tabHeight,
                            attr: 'data-sub-rel'
                        });
                    }
                    var navFixer = (0,
                        _fixer.createFixer)($journeyNav, Object.assign({
                        range: {
                            top: $journey,
                            bottom: $journey,
                            left: this.$element,
                            right: this.$element
                        },
                        offset: {
                            top: this.options.tabHeight + 32
                        },
                        ctx: this.$element
                    }, this.options.fixer));
                    if (!this.isResourceType) {
                        var $routeTab = this.$element.find('.J_Journey4RouteTab');
                        var routeTaber = (0,
                            _taber.createTaber)($routeTab, {
                            ctx: this.$element
                        });
                        var $brief = this.$element.find('.J_DetailRouteBrief');
                        var $briefBox = $brief.find('.J_DetailRouteBriefBox');
                        var $briefInner = $brief.find('.J_DetailRouteBriefInner');
                        var minHeight = $briefBox.height();
                        var maxHeight = $briefInner.height();
                        if (minHeight < maxHeight) {
                            $brief.addClass('fold');
                        }
                        this.briefMinHeight = minHeight;
                        this.briefMaxHeight = maxHeight;
                        this.$brief = $brief;
                        this.$briefBox = $briefBox;
                        this.$briefInner = $briefInner;
                        if (this.smallMapData && this.smallMapData.length) {
                            this.$mapDay = this.$element.find('.J_DetailJourneyMapDay');
                            this.$mapSmall = this.$element.find('.J_DetailJourneyMapSmall');
                            this.setSmallMap(getSmallMap(this.$mapSmall, this.setSmallMap.bind(this)));
                        }
                    }
                    this.$element.find('img').each(function() {
                        var $img = $(this);
                        var src = $img.data('src');
                        lazyloader.on($img, function() {
                            var $image = new Image();
                            $image.onload = function() {
                                $img.prop('src', src).parent().addClass('loaded');
                                lazyloader.off($img);
                                $win.trigger('resize');
                            }
                            ;
                            $image.onerror = function() {
                                $img.parent().addClass('loaded');
                                lazyloader.off($img);
                                $win.trigger('resize');
                            }
                            ;
                            $image.src = src;
                            $img.src = src;
                        });
                    });
                    this.bind();
                }
            }, {
                key: 'bind',
                value: function bind() {
                    var _this = this;
                    this.$element.on('click', '.J_ViewMap', function() {}).on('click', '.J_ViewDetail', function(e) {
                        var cid = $(e.currentTarget).data('id');
                        if (cid) {
                            var data = _this.getResDataByCid(cid);
                            if (data) {
                                _this.openDetailDialog(data);
                            }
                        }
                    }).on('click', '.J_DetailRouteBriefMore', function() {
                        _this.$briefBox.height(_this.briefMaxHeight);
                        _this.$brief.addClass('expand');
                        $win.trigger('resize');
                    }).on('click', '.J_DetailRouteBriefLess', function() {
                        _this.$briefBox.height(_this.briefMinHeight);
                        _this.$brief.removeClass('expand');
                        $win.trigger('resize');
                    }).on('click', '.J_DetailJourneyMapPrev', function() {
                        _this.prevMapDay();
                    }).on('click', '.J_DetailJourneyMapNext', function() {
                        _this.nextMapDay();
                    }).on('click', '.J_DetailJourneyMapView', function() {
                        if (mapInitialized) {
                            (0,
                                _dialog.openBigMap)(_this.data, _this.resList, _this.currentDayId);
                        }
                    });
                }
            }, {
                key: 'setSmallMap',
                value: function setSmallMap(map) {
                    if (!map) {
                        return;
                    }
                    this.$mapSmall.removeClass('loading');
                    this.map = map;
                    this.loadMap();
                }
            }, {
                key: 'loadMap',
                value: function loadMap(dayData) {
                    dayData = dayData || this.getCurrentDay();
                    if (dayData) {
                        var mapData = this.getDayResForMap(dayData);
                        this.currentDayId = dayData.cid;
                        this.map.load(mapData);
                        this.updateMapTab(dayData);
                    }
                }
            }, {
                key: 'getResDataByCid',
                value: function getResDataByCid(cid) {
                    var data = null ;
                    if (this.resList) {
                        data = this.resList[cid] || null ;
                    }
                    return data;
                }
            }, {
                key: 'getDayResForMap',
                value: function getDayResForMap(dayData) {
                    if (dayData && dayData.list) {
                        return dayData.list.map(function(item) {
                            return {
                                moduleType: 'spot',
                                title: item.title,
                                latitude: item.latitude,
                                longitude: item.longitude
                            };
                        });
                    }
                    return [];
                }
            }, {
                key: 'getCurrentDay',
                value: function getCurrentDay(dayId) {
                    var dayData = void 0;
                    dayId = dayId || this.currentDayId;
                    if (dayId) {
                        dayData = this.smallMapData.filter(function(item) {
                            return item.cid == dayId;
                        })[0];
                    } else {
                        dayData = this.smallMapData[0];
                    }
                    return dayData;
                }
            }, {
                key: 'getCurrentDayIndex',
                value: function getCurrentDayIndex() {
                    var _this2 = this;
                    var index = 0;
                    if (this.currentDayId) {
                        this.smallMapData.some(function(item, i) {
                            if (item.cid === _this2.currentDayId) {
                                index = i;
                                return true;
                            }
                        });
                    }
                    return index;
                }
            }, {
                key: 'getDayDataByIndex',
                value: function getDayDataByIndex(index) {
                    return this.smallMapData[index || 0];
                }
            }, {
                key: 'updateMapTab',
                value: function updateMapTab(dayData) {
                    dayData = dayData || this.getCurrentDay();
                    this.$mapDay.text('第' + dayData.day + '天');
                }
            }, {
                key: 'prevMapDay',
                value: function prevMapDay() {
                    var index = this.getCurrentDayIndex();
                    if (index <= 0) {
                        return;
                    }
                    var dayData = this.getDayDataByIndex(index - 1);
                    if (dayData) {
                        this.loadMap(dayData);
                    }
                }
            }, {
                key: 'nextMapDay',
                value: function nextMapDay() {
                    var index = this.getCurrentDayIndex();
                    if (index >= this.smallMapData.length - 1) {
                        return;
                    }
                    var dayData = this.getDayDataByIndex(index + 1);
                    if (dayData) {
                        this.loadMap(dayData);
                    }
                }
            }, {
                key: 'enable',
                value: function enable() {
                    if (!this.inited) {
                        this.init();
                    } else if (!this.isResourceType && !this.map) {
                        this.setSmallMap(getSmallMap(this.$mapSmall, this.setSmallMap.bind(this)));
                    }
                }
            }, {
                key: 'disable',
                value: function disable() {
                    if (!this.isResourceType && !this.map) {
                        removeSmallMap(this.$mapSmall);
                    }
                }
            }, {
                key: 'openDetailDialog',
                value: function openDetailDialog(data) {
                    var dialog = _layer.layer.open({
                        title: false,
                        type: 1,
                        content: spotDetailRender({
                            data: data
                        }),
                        closeBtn: false,
                        btns: 0,
                        btn: false,
                        area: ['830px', '440px'],
                        success: function success(container) {
                            setTimeout(function() {
                                new _.Gallery(container.find('.J_DialogGallery'),{
                                    autoChange: true
                                });
                            }, 1);
                            container.find('.J_DialogClose').click(function() {
                                _layer.layer.close(dialog);
                            });
                        }
                    });
                }
            }]);
            return Journey;
        }();
        var journey4Module = {
            init: function init($element, data, options) {
                return new Journey($element,data,options);
            }
        };
        exports.journey4Module = journey4Module;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var DELAY = 150;
        var $win = $(window);
        var empty = true;
        var winHeight = void 0;
        var targets = [];
        var updateTimer = void 0
            , checkTimer = void 0;
        function bind(target, callback) {
            targets.push({
                target: target,
                callback: callback
            });
            if (empty) {
                empty = false;
                $win.on('resize', update).on('resize scroll', check);
                update();
                check();
            }
        }
        function unbind(target) {
            var index = -1;
            targets.some(function(item, i) {
                if (item.target === target) {
                    index = i;
                    return true;
                }
            });
            if (index !== -1) {
                targets.splice(index, 1);
            }
            if (targets.length === 0) {
                empty = true;
                $win.off('resize', update).off('resize scroll', check);
            }
        }
        function update() {
            clearTimeout(updateTimer);
            updateTimer = setTimeout(_update, DELAY);
        }
        function _update() {
            winHeight = $win.height();
            targets.forEach(function(item) {
                item.visible = item.target.is(':visible');
                item.offset = item.target.offset();
                item.width = item.target.width();
                item.height = item.target.height();
            });
        }
        function check() {
            clearTimeout(checkTimer);
            checkTimer = setTimeout(_check, DELAY);
        }
        function _check() {
            var scrollTop = $win.scrollTop();
            var aimed = false;
            targets.filter(function(item) {
                if (item.visible && item.offset) {
                    if (item.offset.top < winHeight + scrollTop && item.offset.top + item.height > scrollTop) {
                        aimed = true;
                        return true;
                    }
                }
                return false;
            }).forEach(function(item) {
                if (item.callback) {
                    item.callback();
                }
            });
            if (aimed) {
                $win.trigger('resize');
            }
        }
        exports.bind = bind;
        exports.unbind = unbind;
        exports.on = bind;
        exports.off = unbind;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var options = {
            range: {
                left: '',
                right: '',
                top: self,
                bottom: ''
            },
            offset: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        };
        var $win = $(window);
        var defaultCtx = $('body');
        var instances = [];
        function getElementRectInfo($element) {
            var offset = $element.offset() || {
                    left: 0,
                    top: 0
                }
                , width = $element.width() || 0
                , height = $element.height() || 0;
            return {
                left: offset.left,
                right: offset.left + width,
                top: offset.top,
                bottom: offset.top + height,
                width: width,
                height: height
            };
        }
        var Fixer = function() {
            function Fixer($element) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                _classCallCheck(this, Fixer);
                $element = $($element);
                this.fixed = false;
                this.inited = false;
                this.disabled = false;
                this.range = null ;
                this.$element = $element;
                this.$target = $element.children(':first-child');
                this.originPosition = getElementRectInfo($element);
                this.originStyle = {
                    position: this.$target.css('position'),
                    left: this.$target.css('left'),
                    top: this.$target.css('top')
                };
                this.rangeRef = Object.assign({
                    left: $element,
                    right: $element,
                    top: $element,
                    bottom: $element
                }, options.range);
                this.ctx = options.ctx || defaultCtx;
                this.offset = options.offset || {};
                this.rangeOffset = options.rangeOffset || {};
                if (this.offset.left === void 0) {
                    this.offset.left = this.originPosition.left - getElementRectInfo(this.rangeRef.left).left;
                }
                this.offset = Object.assign({
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, this.offset);
                this.rangeOffset = Object.assign({
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, this.rangeOffset);
                if ($element.is(':visible')) {
                    this.position();
                }
            }
            _createClass(Fixer, [{
                key: '_updateOriginPosition',
                value: function _updateOriginPosition() {
                    this.originPosition = getElementRectInfo(this.$element);
                }
            }, {
                key: '_updateRange',
                value: function _updateRange() {
                    var _this = this;
                    var range = {};
                    ['left', 'right', 'top', 'bottom'].forEach(function(edge) {
                        range[edge] = getElementRectInfo(_this.rangeRef[edge])[edge] + _this.rangeOffset[edge];
                    });
                    this.range = range;
                    return range;
                }
            }, {
                key: '_update',
                value: function _update() {
                    this._updateOriginPosition();
                    this._updateRange();
                    this.inited = true;
                }
            }, {
                key: 'update',
                value: function update() {
                    this._update();
                    this.position();
                }
            }, {
                key: 'position',
                value: function position(scrollTop, scrollLeft) {
                    if (this.disabled) {
                        return;
                    }
                    if (this.inited === false) {
                        this._update();
                    }
                    scrollTop = scrollTop === void 0 ? $win.scrollTop() : scrollTop;
                    scrollLeft = scrollLeft === void 0 ? $win.scrollLeft() : scrollLeft;
                    var origin = this.originPosition;
                    var range = this.range;
                    var offsetTop = this.offset.top;
                    scrollTop += offsetTop;
                    if (scrollTop > range.top && scrollTop <= range.bottom) {
                        this.$target.css({
                            position: 'fixed',
                            left: range.left + this.offset.left - scrollLeft,
                            top: Math.min(offsetTop, range.bottom - (scrollTop - offsetTop + origin.height))
                        }).addClass('fixed');
                    } else {
                        if (!this.fixed) {
                            this.fixed = false;
                            this.$target.css(this.originStyle).removeClass('fixed');
                        }
                    }
                }
            }, {
                key: 'disable',
                value: function disable() {
                    this.disabled = true;
                }
            }, {
                key: 'enable',
                value: function enable() {
                    this.disabled = false;
                }
            }]);
            return Fixer;
        }();
        function createFixer($element, options) {
            var fixer = new Fixer($element,options);
            instances.push(fixer);
            return fixer;
        }
        function updateFixer(instance) {
            if (instance && instance instanceof Fixer) {
                instance.update();
            } else {
                instances.forEach(function(instance) {
                    instance.update();
                });
            }
        }
        var updateSizeTimer = void 0;
        function updateSize() {
            clearTimeout(updateSizeTimer);
            updateSizeTimer = setTimeout(_updateSize, 150);
        }
        function _updateSize() {
            instances.forEach(function(instance) {
                instance.update();
            });
        }
        var updatePositionTimer = void 0;
        function updatePosition() {
            clearTimeout(updatePositionTimer);
            updatePositionTimer = setTimeout(_updatePosition, 10);
        }
        function _updatePosition() {
            var scrollTop = $win.scrollTop();
            var scrollLeft = $win.scrollLeft();
            instances.forEach(function(instance) {
                instance.position(scrollTop, scrollLeft);
            });
        }
        $win.on('resize', function(e, targetType) {
            if (targetType !== 'FIXER') {
                updateSize();
            }
        }).on('scroll', function(e, targetType) {
            if (targetType !== 'FIXER') {
                updatePosition();
            }
        });
        exports.createFixer = createFixer;
        exports.updateFixer = updateFixer;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var instances = [];
        var defaultCtx = $('body');
        var $win = $(window);
        var Taber = function() {
            function Taber($element, options) {
                _classCallCheck(this, Taber);
                $element = $($element);
                this.disabled = false;
                this.options = Object.assign({
                    selectFirst: true,
                    ctx: defaultCtx
                }, options);
                var ctx = this.options.ctx;
                this.$element = $element;
                this.tabs = $element.find('[data-rel]').toArray().map(function($tab) {
                    $tab = $($tab);
                    return {
                        $tab: $tab,
                        $target: ctx.find($tab.data('rel'))
                    };
                }).filter(function(tab) {
                    return tab.$target.length;
                });
                if (this.options.selectFirst) {
                    this.active(this.tabs[0]);
                }
                this.bind();
            }
            _createClass(Taber, [{
                key: 'bind',
                value: function bind() {
                    var _this = this;
                    this.tabs.forEach(function(tab) {
                        tab.$tab.click(function() {
                            if (!tab.active) {
                                this.active(tab);
                            }
                        }
                            .bind(_this));
                    });
                }
            }, {
                key: 'active',
                value: function active(activeTab) {
                    if (activeTab) {
                        this.tabs.forEach(function(tab) {
                            if (activeTab === tab) {
                                tab.$tab.addClass('active');
                                tab.$target.addClass('active');
                                tab.active = true;
                            } else {
                                tab.$tab.removeClass('active');
                                tab.$target.removeClass('active');
                                tab.active = false;
                            }
                        });
                        if ($.isFunction(this.options.onactive)) {
                            this.options.onactive(activeTab);
                        }
                        $win.trigger('resize');
                    }
                }
            }]);
            return Taber;
        }();
        function createTaber($element, options) {
            var taber = new Taber($element,options);
            instances.push(taber);
            return taber;
        }
        exports.createTaber = createTaber;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var $win = $(window);
        var defaultCtx = $('body');
        var instances = [];
        var ScrollTaber = function() {
            function ScrollTaber($element, options) {
                _classCallCheck(this, ScrollTaber);
                $element = $($element);
                this.inited = false;
                this.disabled = false;
                this.visible = false;
                this.options = Object.assign({
                    offset: 0,
                    ctx: defaultCtx,
                    attr: 'data-rel',
                    firstDefault: true
                }, options);
                this.firstDefault = this.options.firstDefault;
                this.$element = $element;
                var ctx = this.options.ctx;
                var attr = this.options.attr;
                this.tabs = $element.find('[' + attr + ']').toArray().map(function($tab) {
                    $tab = $($tab);
                    return {
                        $tab: $tab,
                        $target: ctx.find($tab.attr(attr)),
                        offset: {
                            left: 0,
                            top: 0,
                            width: 0,
                            height: 0
                        }
                    };
                }).filter(function(tab) {
                    if (tab.$target.length) {
                        return true;
                    } else {
                        tab.$tab.remove();
                    }
                });
                this.update();
                this.bind();
            }
            _createClass(ScrollTaber, [{
                key: 'bind',
                value: function bind() {
                    var offset = this.options.offset;
                    this.tabs.forEach(function(tab) {
                        tab.$tab.click(function() {
                            if (!tab.active) {
                                $win.scrollTop(tab.offset.top - offset);
                            }
                        });
                    });
                }
            }, {
                key: 'isAvailable',
                value: function isAvailable() {
                    return !this.disabled && this.visible;
                }
            }, {
                key: '_updateVisibility',
                value: function _updateVisibility() {
                    this.visible = this.$element.is(':visible');
                }
            }, {
                key: '_updateTabs',
                value: function _updateTabs() {
                    if (this.isAvailable()) {
                        this.tabs = this.tabs.filter(function(tab) {
                            if (tab.$target && tab.$target[0].parentNode) {
                                return true;
                            } else {
                                tab.$tab.remove();
                                return false;
                            }
                        });
                    }
                }
            }, {
                key: '_update',
                value: function _update() {
                    if (this.isAvailable()) {
                        this.tabs.forEach(function(tab) {
                            Object.assign(tab.offset, tab.$target.offset());
                            tab.offset.width = tab.$target.outerWidth();
                            tab.offset.height = tab.$target.outerHeight();
                            tab.offset.right = tab.offset.left + tab.offset.width;
                            tab.offset.bottom = tab.offset.top + tab.offset.height;
                        });
                        this.tabs.sort(function(prev, next) {
                            return prev.offset.top - next.offset.top;
                        });
                        this.inited = true;
                    }
                }
            }, {
                key: '_position',
                value: function _position(scrollTop) {
                    var _this = this;
                    if (!this.isAvailable()) {
                        return;
                    }
                    var offset = this.options.offset;
                    scrollTop = scrollTop === void 0 ? $win.scrollTop() : scrollTop;
                    var res = this.tabs.reduce(function(prevBottom, tab) {
                        if (prevBottom === true) {
                            return true;
                        }
                        prevBottom = prevBottom || tab.offset.top;
                        if (scrollTop + offset > prevBottom && scrollTop + offset <= tab.offset.bottom) {
                            _this.active(tab);
                            return true;
                        } else {
                            return tab.offset.bottom;
                        }
                    }, 0);
                    if (res !== true) {
                        if (this.firstDefault) {
                            this.active(this.tabs[0]);
                        } else {
                            this.deactive();
                        }
                    }
                }
            }, {
                key: 'update',
                value: function update() {
                    this._updateVisibility();
                    this._updateTabs();
                    this._update();
                    this._position();
                }
            }, {
                key: 'position',
                value: function position(scrollTop) {
                    if (this.inited === false) {
                        this._updateVisibility();
                        this._updateTabs();
                        this._update();
                    }
                    this._position(scrollTop);
                }
            }, {
                key: 'active',
                value: function active(activeTab) {
                    if (activeTab) {
                        this.tabs.forEach(function(tab) {
                            if (activeTab === tab) {
                                tab.$tab.addClass('active');
                                tab.active = true;
                            } else {
                                tab.$tab.removeClass('active');
                                tab.active = false;
                            }
                        });
                    }
                }
            }, {
                key: 'deactive',
                value: function deactive() {
                    this.tabs.forEach(function(tab) {
                        tab.$tab.removeClass('active');
                        tab.active = false;
                    });
                }
            }, {
                key: 'disable',
                value: function disable() {
                    this.disabled = true;
                }
            }, {
                key: 'enable',
                value: function enable() {
                    this.disabled = false;
                }
            }]);
            return ScrollTaber;
        }();
        function createScrollTaber($element, options) {
            var taber = new ScrollTaber($element,options);
            instances.push(taber);
            return taber;
        }
        function updateScrollTaber(taber) {
            if (instance && instance instanceof Fixer) {
                instance.update();
            } else {
                instances.forEach(function(instance) {
                    instance.update();
                });
            }
        }
        $win.on('resize', function() {
            instances.forEach(function(instance) {
                instance.update();
            });
        }).on('scroll resize', function() {
            var scrollTop = $win.scrollTop();
            instances.forEach(function(instance) {
                instance.position(scrollTop);
            });
        });
        exports.createScrollTaber = createScrollTaber;
        exports.updateScrollTaber = updateScrollTaber;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Map = undefined;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        var _marker = __webpack_require__(9);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var LAT_PROPERTY_NAME = 'latitude';
        var LNG_PROPERTY_NAME = 'longitude';
        var Map = function() {
            function Map(element, option) {
                _classCallCheck(this, Map);
                this.element = element;
                this.map = null ;
                this.visible = false;
                this.activedMarker = null ;
                this.markers = [];
                this.option = option || {};
            }
            _createClass(Map, [{
                key: 'createMap',
                value: function createMap() {
                    return new google.maps.Map(this.element,{
                        zoom: 1,
                        maxZoom: 16,
                        minZoom: 1,
                        mapTypeControl: false,
                        streetViewControl: false,
                        scaleControl: true
                    });
                }
            }, {
                key: 'getMap',
                value: function getMap() {
                    if (!this.map) {
                        this.map = this.createMap();
                    }
                    return this.map;
                }
            }, {
                key: 'getBound',
                value: function getBound() {
                    var resList = this.resList
                        , north = 0
                        , south = 90
                        , east = -180
                        , west = 180;
                    if (!resList || !resList) {
                        return;
                    }
                    resList.forEach(function(res) {
                        north = Math.max(res[LAT_PROPERTY_NAME], north);
                        south = Math.min(res[LAT_PROPERTY_NAME], south);
                        west = Math.min(res[LNG_PROPERTY_NAME], west);
                        east = Math.max(res[LNG_PROPERTY_NAME], east);
                    });
                    return new google.maps.LatLngBounds(new google.maps.LatLng(south,west),new google.maps.LatLng(north,east));
                }
            }, {
                key: 'resize',
                value: function resize() {
                    var bound = this.getBound();
                    google.maps.event.trigger(this.map, 'resize');
                    this.map.setCenter(bound.getCenter());
                    this.map.fitBounds(bound);
                }
            }, {
                key: 'renderMarker',
                value: function renderMarker(data) {
                    var marker = (0,
                        _marker.createMarker)({
                        serial: 1,
                        type: data.moduleType,
                        name: data.title,
                        latitude: data.latitude,
                        longitude: data.longitude
                    });
                    marker.id = data.id;
                    marker.setMap(this.map);
                    this.markers.push(marker);
                    return marker;
                }
            }, {
                key: 'bindMarkerEvent',
                value: function bindMarkerEvent(marker, data) {
                    var _this = this;
                    marker.addListener('click', function() {
                        _this.activateMarker(marker);
                        _this.option && _this.option.onMarkerActive && _this.option.onMarkerActive(data);
                    });
                    marker.addListener('mouseenter', function() {
                        this.hightlight();
                        this.moveToTop();
                    });
                    marker.addListener('mouseleave', function() {
                        this.removeHightlight();
                        this.restoreZIndex();
                    });
                }
            }, {
                key: 'clearAllMarker',
                value: function clearAllMarker() {
                    var markers = this.markers, marker;
                    while (markers.length) {
                        marker = markers.pop();
                        marker.setMap(null );
                    }
                }
            }, {
                key: 'activateMarker',
                value: function activateMarker(marker) {
                    if (this.activedMarker) {
                        this.activedMarker.deactivate();
                        this.activedMarker = null ;
                    }
                    if (marker) {
                        this.activedMarker = marker;
                        marker.activate();
                    }
                }
            }, {
                key: 'activateMarkerById',
                value: function activateMarkerById(id) {
                    var marker = this.getMarkerById(id);
                    if (marker) {
                        this.activateMarker(marker);
                    }
                }
            }, {
                key: 'getMarkerById',
                value: function getMarkerById(id) {
                    return this.markers.filter(function(marker) {
                        return marker.id == id;
                    })[0];
                }
            }, {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var resList = this.resList, hasSpot = false, activeSpot = this.activeSpot, activeSpot, data;
                    if (!resList || !resList) {
                        return;
                    }
                    this.getMap();
                    this.clearAllMarker();
                    this.map.fitBounds(this.getBound());
                    resList.forEach(function(res, index) {
                        _this2.bindMarkerEvent(_this2.renderMarker(Object.assign({}, res, {
                            serial: index + 1
                        })), res);
                    });
                }
            }, {
                key: 'load',
                value: function load(resList) {
                    this.resList = resList;
                    this.render();
                }
            }]);
            return Map;
        }();
        exports.Map = Map;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        exports.createMarker = createMarker;
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null ) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var ICON_WIDTH = 43;
        var ICON_HEIGHT = 43;
        var LAT_PROPERTY_NAME = 'latitude';
        var LNG_PROPERTY_NAME = 'longitude';
        var MarkeClass = void 0;
        function createClass() {
            if (MarkeClass) {
                return MarkeClass;
            }
            MarkeClass = function(_google$maps$OverlayV) {
                _inherits(Marker, _google$maps$OverlayV);
                function Marker(data) {
                    _classCallCheck(this, Marker);
                    var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this));
                    _this.data = data;
                    _this.active = data.active ? true : false;
                    data.active = false;
                    _this.element = null ;
                    _this.typeClassName = 'jmap-spot-' + data.type;
                    _this.hightlightClassName = 'jmap-spot-' + data.type + '-hightlight';
                    _this.activeClassName = 'jmap-spot-' + _this.data.type + '-active';
                    return _this;
                }
                _createClass(Marker, [{
                    key: 'onAdd',
                    value: function onAdd() {
                        var self = this
                            , html = '<div class="jmap-spot ' + this.typeClassName + '">' + '<div class="jmap-win-box">' + '<i class="jmap-win-arrow"></i>' + '<div class="jmap-win-content">' + this.data.name + '</div>' + '</div>' + '<div class="jmap-marker"></div>' + '</div>'
                            , panes = this.getPanes()
                            , element = $(html)
                            , mask = element.clone().css({
                            'opacity': 0,
                            'filter': 'alpha(opacity=0)'
                        });
                        this.element = element;
                        this.mask = mask;
                        mask.find('.jmap-win-box, .jmap-marker').on('click', function() {
                            google.maps.event.trigger(self, 'click');
                        }).on('mouseenter', function() {
                            google.maps.event.trigger(self, 'mouseenter');
                        }).on('mouseleave', function() {
                            google.maps.event.trigger(self, 'mouseleave');
                        });
                        if (this.active) {
                            this.activateBySelf();
                        }
                        panes.markerLayer.appendChild(element[0]);
                        panes.floatPane.appendChild(mask[0]);
                    }
                }, {
                    key: 'draw',
                    value: function draw() {
                        this.setPosition(this.data[LAT_PROPERTY_NAME], this.data[LNG_PROPERTY_NAME]);
                    }
                }, {
                    key: 'onRemove',
                    value: function onRemove() {
                        this.element.remove();
                        this.mask.remove();
                        this.element = null ;
                        this.mask = null ;
                    }
                }, {
                    key: 'setZIndex',
                    value: function setZIndex(zIndex) {
                        if (!this.element) {
                            return;
                        }
                        zIndex = zIndex || 1;
                        this.element.css('z-index', zIndex);
                        this.mask.css('z-index', zIndex);
                    }
                }, {
                    key: 'moveToTop',
                    value: function moveToTop() {
                        this.setZIndex(999);
                    }
                }, {
                    key: 'restoreZIndex',
                    value: function restoreZIndex() {
                        this.setZIndex(1);
                    }
                }, {
                    key: 'setPosition',
                    value: function setPosition(lat, lng) {
                        if (!this.element) {
                            return;
                        }
                        var projection = this.getProjection()
                            , positionInPixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(lat,lng))
                            , position = {
                            top: positionInPixel.y - ICON_HEIGHT - 28 + 'px',
                            left: positionInPixel.x - this.element.width() / 2 + ICON_WIDTH / 2 - 1 + 'px'
                        };
                        this.element.css(position);
                        this.mask.css(position);
                    }
                }, {
                    key: 'activate',
                    value: function activate() {
                        this.active = true;
                        this.element && this.element.addClass(this.activeClassName);
                        this.moveToTop();
                    }
                }, {
                    key: 'activateBySelf',
                    value: function activateBySelf() {
                        this.activate();
                        $(window).trigger('mapMarkerActivated', this.data);
                    }
                }, {
                    key: 'deactivate',
                    value: function deactivate() {
                        this.active = false;
                        this.element && this.element.removeClass(this.activeClassName);
                        this.restoreZIndex();
                    }
                }, {
                    key: 'deactivateBySelf',
                    value: function deactivateBySelf() {
                        this.deactivate();
                        $(window).trigger('mapMarkerDeactivated', this.data);
                    }
                }, {
                    key: 'hightlight',
                    value: function hightlight() {
                        this.element && this.element.addClass(this.hightlightClassName);
                    }
                }, {
                    key: 'removeHightlight',
                    value: function removeHightlight() {
                        this.element && this.element.removeClass(this.hightlightClassName);
                        ;
                    }
                }]);
                return Marker;
            }(google.maps.OverlayView);
            return MarkeClass;
        }
        function createMarker(data) {
            return new (createClass())(data);
        }
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.openBigMap = openBigMap;
        var _Map = __webpack_require__(8);
        var _layer = __webpack_require__(11);
        var _ejs = __webpack_require__(1);
        var ejs = _interopRequireWildcard(_ejs);
        var _dialog = __webpack_require__(12);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var render = ejs.compile(_dialog.mapDialogTemplate, {
            client: true
        });
        var journeyListData = void 0
            , resList = void 0
            , currentId = void 0
            , scheduleType = void 0
            , dialog = void 0
            , $journeyList = void 0;
        function getSelectedJourney(cid) {
            var selectedJourney;
            journeyListData.some(function(item) {
                if (item.cid == cid || item.data && item.data.some(function(item) {
                        return item.cid == cid;
                    })) {
                    selectedJourney = item;
                    return true;
                }
            });
            return selectedJourney;
        }
        function getMapData(dayData) {
            if (dayData) {
                return (dayData.data || []).reduce(function(sum, item) {
                    (item.data || []).forEach(function(res) {
                        if (res.latitude && res.longitude) {
                            sum.push({
                                moduleType: 'spot',
                                cid: res.cid,
                                id: res.cid,
                                dayId: dayData.cid,
                                title: res.title,
                                latitude: res.latitude,
                                longitude: res.longitude
                            });
                        }
                    });
                    return sum;
                }, []);
            }
            return [];
        }
        function getFirstJourneyId() {
            return $journeyList.find('.map-sub-item').data('nav-id');
        }
        function getFirstHotel(cid, resList) {
            var resData = resList[cid];
            if (resData && resData.data && resData.data.length) {
                return resData.data[0];
            }
        }
        function isHotelHasSubHotel(cid, resList) {
            var firstHotel = getFirstHotel(cid, resList);
            return !!(firstHotel && (firstHotel.latitude || firstHotel.longitude));
        }
        function initialize($container) {
            var map = new _Map.Map($container.find('.J_MapDetail')[0],{
                onMarkerActive: selectJourneyByMap
            });
            $journeyList = $container.find('.J_MapDetailJourney');
            function updateJourney(id, subId) {
                if (!id) {
                    return;
                }
                var selectedJourney = getSelectedJourney(id);
                if (selectedJourney) {
                    var listData = getMapData(selectedJourney);
                    if (listData.length) {
                        map.load(listData);
                        if (!subId) {
                            subId = listData[0].cid;
                        }
                        setJourneySelect(id, subId);
                        map.activateMarkerById(subId);
                        return;
                    }
                }
                setJourneySelect(id, subId);
            }
            function setJourneySelect(id, subId) {
                $journeyList.find('.map-nav-active').removeClass('map-nav-active').end().find('.map-nav-sub').hide();
                var $subList = $journeyList.find('.map-main-item[data-nav-id=' + id + ']').addClass('map-nav-active').siblings('.map-nav-sub').show();
                $subList.find('.map-sub-item').removeClass('map-nav-active').filter('[data-sub-id=' + subId + ']').addClass('map-nav-active');
                $subList.end().closest('.map-nav-sub').show();
            }
            function selectJourneyByMap(data) {
                if (data && data.cid && data.dayId) {
                    updateJourney(data.dayId, data.cid);
                }
            }
            $container.on('click', '.map-nav-item', function() {
                updateJourney($(this).data('nav-id'));
            }).on('click', '.map-sub-item', function() {
                updateJourney($(this).data('nav-id'), $(this).data('sub-id'));
            }).on('click', '.J_MapDetailClose', function() {
                _layer.layer.close(dialog);
            });
            if (currentId) {
                if (!$journeyList.find('.map-sub-item[data-nav-id=' + currentId + ']').length) {
                    currentId = null ;
                }
            }
            updateJourney(currentId || getFirstJourneyId());
        }
        function openBigMap(journeyData, resData, initId) {
            journeyListData = journeyData.detail;
            resList = resData;
            currentId = initId;
            dialog = _layer.layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                content: render({
                    data: journeyListData,
                    scheduleType: journeyData.scheduleType
                }),
                area: ['1000px', '600px'],
                btn: false,
                success: initialize
            });
        }
    }
    , function(module, exports) {
        /*!

         @Name：layer v2.4 弹层组件
         @Author：贤心
         @Site：http://layer.layui.com
         @License：LGPL

         */
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
            }
                : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }
            ;
        var $, win, _ready = {
            getPath: function() {
                var js = document.scripts
                    , script = js[js.length - 1]
                    , jsPath = script.src;
                if (script.getAttribute('merge'))
                    return;
                return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
            }(),
            enter: function enter(e) {
                if (e.keyCode === 13)
                    e.preventDefault();
            },
            config: {},
            end: {},
            btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
            type: ['dialog', 'page', 'iframe', 'loading', 'tips']
        };
        var layer = {
            v: '2.4',
            ie6: !!window.ActiveXObject && !window.XMLHttpRequest,
            index: 0,
            path: _ready.getPath,
            config: function config(options, fn) {
                var item = 0;
                options = options || {};
                layer.cache = _ready.config = $.extend(_ready.config, options);
                layer.path = _ready.config.path || layer.path;
                typeof options.extend === 'string' && (options.extend = [options.extend]);
                layer.use('skin/layer.css', options.extend && options.extend.length > 0 ? function loop() {
                    var ext = options.extend;
                    layer.use(ext[ext[item] ? item : item - 1], item < ext.length ? function() {
                        ++item;
                        return loop;
                    }() : fn);
                }() : fn);
                return this;
            },
            use: function use(module, fn, readyMethod) {
                var i = 0
                    , head = $('head')[0];
                var module = module.replace(/\s/g, '');
                var iscss = /\.css$/.test(module);
                var node = document.createElement(iscss ? 'link' : 'script');
                var id = 'layui_layer_' + module.replace(/\.|\//g, '');
                if (!layer.path)
                    return;
                if (iscss) {
                    node.rel = 'stylesheet';
                }
                node[iscss ? 'href' : 'src'] = /^http:\/\//.test(module) ? module : layer.path + module;
                node.id = id;
                if (!$('#' + id)[0]) {
                    head.appendChild(node);
                }
                ;(function poll() {
                    ;(iscss ? parseInt($('#' + id).css('width')) === 1989 : layer[readyMethod || id]) ? function() {
                        fn && fn();
                        try {
                            iscss || head.removeChild(node);
                        } catch (e) {}
                        ;
                    }() : setTimeout(poll, 100);
                })();
                return this;
            },
            ready: function ready(path, fn) {
                var type = typeof path === 'function';
                if (type)
                    fn = path;
                layer.config($.extend(_ready.config, function() {
                    return type ? {} : {
                        path: path
                    };
                }()), fn);
                return this;
            },
            alert: function alert(content, options, yes) {
                var type = typeof options === 'function';
                if (type)
                    yes = options;
                return layer.open($.extend({
                    content: content,
                    yes: yes
                }, type ? {} : options));
            },
            confirm: function confirm(content, options, yes, cancel) {
                var type = typeof options === 'function';
                if (type) {
                    cancel = yes;
                    yes = options;
                }
                return layer.open($.extend({
                    content: content,
                    btn: _ready.btn,
                    yes: yes,
                    btn2: cancel
                }, type ? {} : options));
            },
            msg: function msg(content, options, end) {
                var type = typeof options === 'function'
                    , rskin = _ready.config.skin;
                var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '') || 'layui-layer-msg';
                var shift = doms.anim.length - 1;
                if (type)
                    end = options;
                return layer.open($.extend({
                    content: content,
                    time: 3000,
                    shade: false,
                    skin: skin,
                    title: false,
                    closeBtn: false,
                    btn: false,
                    end: end
                }, type && !_ready.config.skin ? {
                    skin: skin + ' layui-layer-hui',
                    shift: shift
                } : function() {
                    options = options || {};
                    if (options.icon === -1 || options.icon === undefined && !_ready.config.skin) {
                        options.skin = skin + ' ' + (options.skin || 'layui-layer-hui');
                    }
                    return options;
                }()));
            },
            load: function load(icon, options) {
                return layer.open($.extend({
                    type: 3,
                    icon: icon || 0,
                    shade: 0.01
                }, options));
            },
            tips: function tips(content, follow, options) {
                return layer.open($.extend({
                    type: 4,
                    content: [content, follow],
                    closeBtn: false,
                    time: 3000,
                    shade: false,
                    fix: false,
                    maxWidth: 210
                }, options));
            }
        };
        var Class = function Class(setings) {
                var that = this;
                that.index = ++layer.index;
                that.config = $.extend({}, that.config, _ready.config, setings);
                that.creat();
            }
            ;
        Class.pt = Class.prototype;
        var doms = ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'];
        doms.anim = ['layer-anim', 'layer-anim-01', 'layer-anim-02', 'layer-anim-03', 'layer-anim-04', 'layer-anim-05', 'layer-anim-06'];
        Class.pt.config = {
            type: 0,
            shade: 0.3,
            fix: true,
            move: doms[1],
            title: '&#x4FE1;&#x606F;',
            offset: 'auto',
            area: 'auto',
            closeBtn: 1,
            time: 0,
            zIndex: 19891014,
            maxWidth: 360,
            shift: 0,
            icon: -1,
            scrollbar: true,
            tips: 2
        };
        Class.pt.vessel = function(conType, callback) {
            var that = this
                , times = that.index
                , config = that.config;
            var zIndex = config.zIndex + times
                , titype = _typeof(config.title) === 'object';
            var ismax = config.maxmin && (config.type === 1 || config.type === 2);
            var titleHTML = config.title ? '<div class="layui-layer-title" style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</div>' : '';
            config.zIndex = zIndex;
            callback([config.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + times + '" times="' + times + '" style="' + ('z-index:' + (zIndex - 1) + '; background-color:' + (config.shade[1] || '#000') + '; opacity:' + (config.shade[0] || config.shade) + '; filter:alpha(opacity=' + (config.shade[0] * 100 || config.shade * 100) + ');') + '"></div>' : '', '<div class="' + doms[0] + (' layui-layer-' + _ready.type[config.type]) + ((config.type == 0 || config.type == 2) && !config.shade ? ' layui-layer-border' : '') + ' ' + (config.skin || '') + '" id="' + doms[0] + times + '" type="' + _ready.type[config.type] + '" times="' + times + '" showtime="' + config.time + '" conType="' + (conType ? 'object' : 'string') + '" style="z-index: ' + zIndex + '; width:' + config.area[0] + ';height:' + config.area[1] + (config.fix ? '' : ';position:absolute;') + '">' + (conType && config.type != 2 ? '' : titleHTML) + '<div id="' + (config.id || '') + '" class="layui-layer-content' + (config.type == 0 && config.icon !== -1 ? ' layui-layer-padding' : '') + (config.type == 3 ? ' layui-layer-loading' + config.icon : '') + '">' + (config.type == 0 && config.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + config.icon + '"></i>' : '') + (config.type == 2 || config.type == 4 || config.type == 1 && conType ? '' : config.content || '') + '</div>' + '<span class="layui-layer-setwin">' + function() {
                var closebtn = ismax ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '';
                config.closeBtn && (closebtn += '<a class="layui-layer-ico ' + doms[7] + ' ' + doms[7] + (config.title ? config.closeBtn : config.type == 4 ? '1' : '2') + '" href="javascript:;"></a>');
                return closebtn;
            }() + '</span>' + (config.btn ? function() {
                var button = '';
                typeof config.btn === 'string' && (config.btn = [config.btn]);
                for (var i = 0, len = config.btn.length; i < len; i++) {
                    button += '<a class="' + doms[6] + '' + i + '">' + config.btn[i] + '</a>';
                }
                return '<div class="' + doms[6] + '">' + button + '</div>';
            }() : '') + '</div>'], titleHTML);
            return that;
        }
        ;
        Class.pt.creat = function() {
            var that = this, config = that.config, times = that.index, nodeIndex;
            var content = config.content
                , conType = (typeof content === "undefined" ? "undefined" : _typeof(content)) === 'object';
            if ($('#' + config.id)[0])
                return;
            if (typeof config.area === 'string') {
                config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
            }
            switch (config.type) {
                case 0:
                    config.btn = 'btn'in config ? config.btn : _ready.btn[0];
                    layer.closeAll('dialog');
                    break;
                case 2:
                    var content = config.content = conType ? config.content : [config.content || 'http://layer.layui.com', 'auto'];
                    config.content = '<iframe scrolling="' + (config.content[1] || 'auto') + '" allowtransparency="true" id="' + doms[4] + '' + times + '" name="' + doms[4] + '' + times + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
                    break;
                case 3:
                    config.title = false;
                    config.closeBtn = false;
                    config.icon === -1 && config.icon === 0;
                    layer.closeAll('loading');
                    break;
                case 4:
                    conType || (config.content = [config.content, 'body']);
                    config.follow = config.content[1];
                    config.content = $('<div />').append(config.content[0], '<i class="layui-layer-TipsG"></i>')[0];
                    config.title = false;
                    config.tips = _typeof(config.tips) === 'object' ? config.tips : [config.tips, true];
                    config.tipsMore || layer.closeAll('tips');
                    break;
            }
            that.vessel(conType, function(html, titleHTML) {
                $('body').append(html[0]);
                conType ? function() {
                    config.type == 2 || config.type == 4 ? function() {
                        var $html = $(html[1]);
                        $html.find('.layui-layer-content').append(config.content);
                        $('body').append($html);
                    }() : function() {
                        if (!content.parents('.' + doms[0])[0]) {
                            content.show().addClass('layui-layer-wrap').wrap(html[1]);
                            $('#' + doms[0] + times).find('.' + doms[5]).before(titleHTML);
                        }
                    }();
                }() : $('body').append(html[1]);
                that.layero = $('#' + doms[0] + times);
                config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);
            }).auto(times);
            config.type == 2 && layer.ie6 && that.layero.find('iframe').attr('src', content[0]);
            $(document).off('keydown', _ready.enter).on('keydown', _ready.enter);
            that.layero.on('keydown', function(e) {
                $(document).off('keydown', _ready.enter);
            });
            config.type == 4 ? that.tips() : that.offset();
            if (config.fix) {
                win.on('resize', function() {
                    that.offset();
                    (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
                    config.type == 4 && that.tips();
                });
            }
            config.time <= 0 || setTimeout(function() {
                layer.close(that.index);
            }, config.time);
            that.move().callback();
            if (doms.anim[config.shift]) {
                that.layero.addClass(doms.anim[config.shift]);
            }
            ;
        }
        ;
        Class.pt.auto = function(index) {
            var that = this
                , config = that.config
                , layero = $('#' + doms[0] + index);
            if (config.area[0] === '' && config.maxWidth > 0) {
                if (/MSIE 7/.test(navigator.userAgent) && config.btn) {
                    layero.width(layero.innerWidth());
                }
                layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
            }
            var area = [layero.innerWidth(), layero.innerHeight()];
            var titHeight = layero.find(doms[1]).outerHeight() || 0;
            var btnHeight = layero.find('.' + doms[6]).outerHeight() || 0;
            function setHeight(elem) {
                elem = layero.find(elem);
                elem.height(area[1] - titHeight - btnHeight - 2 * (parseFloat(elem.css('padding')) | 0));
            }
            switch (config.type) {
                case 2:
                    setHeight('iframe');
                    break;
                default:
                    if (config.area[1] === '') {
                        if (config.fix && area[1] >= win.height()) {
                            area[1] = win.height();
                            setHeight('.' + doms[5]);
                        }
                    } else {
                        setHeight('.' + doms[5]);
                    }
                    break;
            }
            return that;
        }
        ;
        Class.pt.offset = function() {
            var that = this
                , config = that.config
                , layero = that.layero;
            var area = [layero.outerWidth(), layero.outerHeight()];
            var type = _typeof(config.offset) === 'object';
            that.offsetTop = (win.height() - area[1]) / 2;
            that.offsetLeft = (win.width() - area[0]) / 2;
            if (type) {
                that.offsetTop = config.offset[0];
                that.offsetLeft = config.offset[1] || that.offsetLeft;
            } else if (config.offset !== 'auto') {
                that.offsetTop = config.offset;
                if (config.offset === 'rb') {
                    that.offsetTop = win.height() - area[1];
                    that.offsetLeft = win.width() - area[0];
                }
            }
            if (!config.fix) {
                that.offsetTop = /%$/.test(that.offsetTop) ? win.height() * parseFloat(that.offsetTop) / 100 : parseFloat(that.offsetTop);
                that.offsetLeft = /%$/.test(that.offsetLeft) ? win.width() * parseFloat(that.offsetLeft) / 100 : parseFloat(that.offsetLeft);
                that.offsetTop += win.scrollTop();
                that.offsetLeft += win.scrollLeft();
            }
            layero.css({
                top: that.offsetTop,
                left: that.offsetLeft
            });
        }
        ;
        Class.pt.tips = function() {
            var that = this
                , config = that.config
                , layero = that.layero;
            var layArea = [layero.outerWidth(), layero.outerHeight()]
                , follow = $(config.follow);
            if (!follow[0])
                follow = $('body');
            var goal = {
                width: follow.outerWidth(),
                height: follow.outerHeight(),
                top: follow.offset().top,
                left: follow.offset().left
            }
                , tipsG = layero.find('.layui-layer-TipsG');
            var guide = config.tips[0];
            config.tips[1] || tipsG.remove();
            var tipsOffset = config.tipsOffset
                , arrowOffset = config.arrowOffset || [0, 0]
                , verticalOffset = 10
                , horizontalOffset = 10;
            if (tipsOffset) {
                if (typeof tipsOffset === 'number') {
                    verticalOffset = tipsOffset;
                } else if (tipsOffset && tipsOffset.length) {
                    verticalOffset = tipsOffset[0] === undefined ? verticalOffset : tipsOffset[0];
                    horizontalOffset = tipsOffset[1] === undefined ? horizontalOffset : tipsOffset[1];
                }
            }
            goal.autoLeft = function() {
                if (config.disableAutoLeft !== true && goal.left + layArea[0] - win.width() > 0) {
                    goal.tipLeft = goal.left + goal.width - layArea[0];
                    tipsG.css({
                        right: 12,
                        left: 'auto'
                    });
                } else {
                    goal.tipLeft = goal.left + horizontalOffset;
                }
                ;
            }
            ;
            goal.where = [function() {
                goal.autoLeft();
                goal.tipTop = goal.top - layArea[1] - verticalOffset;
                tipsG.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
            }
                , function() {
                    goal.tipLeft = goal.left + goal.width + horizontalOffset;
                    goal.tipTop = goal.top;
                    tipsG.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]);
                }
                , function() {
                    goal.autoLeft();
                    goal.tipTop = goal.top + goal.height + verticalOffset;
                    tipsG.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css({
                        'border-right-color': config.tips[1],
                        'left': goal.left + goal.width / 2 - goal.tipLeft + arrowOffset[0]
                    });
                }
                , function() {
                    goal.tipLeft = goal.left - layArea[0] - horizontalOffset;
                    goal.tipTop = goal.top;
                    tipsG.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
                }
            ];
            goal.where[guide - 1]();
            layero.find('.' + doms[5]).css({
                'background-color': config.tips[1],
                'padding-right': config.closeBtn ? '30px' : ''
            });
            layero.css({
                left: goal.tipLeft - (config.fix ? win.scrollLeft() : 0),
                top: goal.tipTop - (config.fix ? win.scrollTop() : 0)
            });
        }
        ;
        Class.pt.move = function() {
            var that = this
                , config = that.config
                , conf = {
                setY: 0,
                moveLayer: function moveLayer() {
                    var layero = conf.layero
                        , mgleft = parseInt(layero.css('margin-left'));
                    var lefts = parseInt(conf.move.css('left'));
                    mgleft === 0 || (lefts = lefts - mgleft);
                    if (layero.css('position') !== 'fixed') {
                        lefts = lefts - layero.parent().offset().left;
                        conf.setY = 0;
                    }
                    layero.css({
                        left: lefts,
                        top: parseInt(conf.move.css('top')) - conf.setY
                    });
                }
            };
            var movedom = that.layero.find(config.move);
            config.move && movedom.attr('move', 'ok');
            movedom.css({
                cursor: config.move ? 'move' : 'auto'
            });
            $(config.move).on('mousedown', function(M) {
                M.preventDefault();
                if ($(this).attr('move') === 'ok') {
                    conf.ismove = true;
                    conf.layero = $(this).parents('.' + doms[0]);
                    var xx = conf.layero.offset().left
                        , yy = conf.layero.offset().top
                        , ww = conf.layero.outerWidth() - 6
                        , hh = conf.layero.outerHeight() - 6;
                    if (!$('#layui-layer-moves')[0]) {
                        $('body').append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:' + xx + 'px; top:' + yy + 'px; width:' + ww + 'px; height:' + hh + 'px; z-index:2147483584"></div>');
                    }
                    conf.move = $('#layui-layer-moves');
                    config.moveType && conf.move.css({
                        visibility: 'hidden'
                    });
                    conf.moveX = M.pageX - conf.move.position().left;
                    conf.moveY = M.pageY - conf.move.position().top;
                    conf.layero.css('position') !== 'fixed' || (conf.setY = win.scrollTop());
                }
            });
            $(document).mousemove(function(M) {
                if (conf.ismove) {
                    var offsetX = M.pageX - conf.moveX
                        , offsetY = M.pageY - conf.moveY;
                    M.preventDefault();
                    if (!config.moveOut) {
                        conf.setY = win.scrollTop();
                        var setRig = win.width() - conf.move.outerWidth()
                            , setTop = conf.setY;
                        offsetX < 0 && (offsetX = 0);
                        offsetX > setRig && (offsetX = setRig);
                        offsetY < setTop && (offsetY = setTop);
                        offsetY > win.height() - conf.move.outerHeight() + conf.setY && (offsetY = win.height() - conf.move.outerHeight() + conf.setY);
                    }
                    conf.move.css({
                        left: offsetX,
                        top: offsetY
                    });
                    config.moveType && conf.moveLayer();
                    offsetX = offsetY = setRig = setTop = null ;
                }
            }).mouseup(function() {
                try {
                    if (conf.ismove) {
                        conf.moveLayer();
                        conf.move.remove();
                        config.moveEnd && config.moveEnd();
                    }
                    conf.ismove = false;
                } catch (e) {
                    conf.ismove = false;
                }
            });
            return that;
        }
        ;
        Class.pt.callback = function() {
            var that = this
                , layero = that.layero
                , config = that.config;
            that.openLayer();
            if (config.success) {
                if (config.type == 2) {
                    layero.find('iframe').on('load', function() {
                        config.success(layero, that.index);
                    });
                } else {
                    config.success(layero, that.index);
                }
            }
            layer.ie6 && that.IE6(layero);
            layero.find('.' + doms[6]).children('a').on('click', function() {
                var index = $(this).index();
                if (index === 0) {
                    if (config.yes) {
                        config.yes(that.index, layero);
                    } else if (config['btn1']) {
                        config['btn1'](that.index, layero);
                    } else {
                        layer.close(that.index);
                    }
                } else {
                    var close = config['btn' + (index + 1)] && config['btn' + (index + 1)](that.index, layero);
                    close === false || layer.close(that.index);
                }
            });
            function cancel() {
                var close = config.cancel && config.cancel(that.index, layero);
                close === false || layer.close(that.index);
            }
            layero.find('.' + doms[7]).on('click', cancel);
            if (config.shadeClose) {
                $('#layui-layer-shade' + that.index).on('click', function() {
                    layer.close(that.index);
                });
            }
            layero.find('.layui-layer-min').on('click', function() {
                var min = config.min && config.min(layero);
                min === false || layer.min(that.index, config);
            });
            layero.find('.layui-layer-max').on('click', function() {
                if ($(this).hasClass('layui-layer-maxmin')) {
                    layer.restore(that.index);
                    config.restore && config.restore(layero);
                } else {
                    layer.full(that.index, config);
                    setTimeout(function() {
                        config.full && config.full(layero);
                    }, 100);
                }
            });
            config.end && (_ready.end[that.index] = config.end);
        }
        ;
        _ready.reselect = function() {
            $.each($('select'), function(index, value) {
                var sthis = $(this);
                if (!sthis.parents('.' + doms[0])[0]) {
                    sthis.attr('layer') == 1 && $('.' + doms[0]).length < 1 && sthis.removeAttr('layer').show();
                }
                sthis = null ;
            });
        }
        ;
        Class.pt.IE6 = function(layero) {
            var that = this
                , _ieTop = layero.offset().top;
            function ie6Fix() {
                layero.css({
                    top: _ieTop + (that.config.fix ? win.scrollTop() : 0)
                });
            }
            ;ie6Fix();
            win.scroll(ie6Fix);
            $('select').each(function(index, value) {
                var sthis = $(this);
                if (!sthis.parents('.' + doms[0])[0]) {
                    sthis.css('display') === 'none' || sthis.attr({
                        'layer': '1'
                    }).hide();
                }
                sthis = null ;
            });
        }
        ;
        Class.pt.openLayer = function() {
            var that = this;
            layer.zIndex = that.config.zIndex;
            layer.setTop = function(layero) {
                var setZindex = function setZindex() {
                        layer.zIndex++;
                        layero.css('z-index', layer.zIndex + 1);
                    }
                    ;
                layer.zIndex = parseInt(layero[0].style.zIndex);
                layero.on('mousedown', setZindex);
                return layer.zIndex;
            }
            ;
        }
        ;
        _ready.record = function(layero) {
            var area = [layero.width(), layero.height(), layero.position().top, layero.position().left + parseFloat(layero.css('margin-left'))];
            layero.find('.layui-layer-max').addClass('layui-layer-maxmin');
            layero.attr({
                area: area
            });
        }
        ;
        _ready.rescollbar = function(index) {
            if (doms.html.attr('layer-full') == index) {
                if (doms.html[0].style.removeProperty) {
                    doms.html[0].style.removeProperty('overflow');
                } else {
                    doms.html[0].style.removeAttribute('overflow');
                }
                doms.html.removeAttr('layer-full');
            }
        }
        ;
        window.layer = layer;
        layer.getChildFrame = function(selector, index) {
            index = index || $('.' + doms[4]).attr('times');
            return $('#' + doms[0] + index).find('iframe').contents().find(selector);
        }
        ;
        layer.getFrameIndex = function(name) {
            return $('#' + name).parents('.' + doms[4]).attr('times');
        }
        ;
        layer.iframeAuto = function(index) {
            if (!index)
                return;
            var heg = layer.getChildFrame('html', index).outerHeight();
            var layero = $('#' + doms[0] + index);
            var titHeight = layero.find(doms[1]).outerHeight() || 0;
            var btnHeight = layero.find('.' + doms[6]).outerHeight() || 0;
            layero.css({
                height: heg + titHeight + btnHeight
            });
            layero.find('iframe').css({
                height: heg
            });
        }
        ;
        layer.iframeSrc = function(index, url) {
            $('#' + doms[0] + index).find('iframe').attr('src', url);
        }
        ;
        layer.style = function(index, options) {
            var layero = $('#' + doms[0] + index)
                , type = layero.attr('type');
            var titHeight = layero.find(doms[1]).outerHeight() || 0;
            var btnHeight = layero.find('.' + doms[6]).outerHeight() || 0;
            if (type === _ready.type[1] || type === _ready.type[2]) {
                layero.css(options);
                if (type === _ready.type[2]) {
                    layero.find('iframe').css({
                        height: parseFloat(options.height) - titHeight - btnHeight
                    });
                }
            }
        }
        ;
        layer.min = function(index, options) {
            var layero = $('#' + doms[0] + index);
            var titHeight = layero.find(doms[1]).outerHeight() || 0;
            _ready.record(layero);
            layer.style(index, {
                width: 180,
                height: titHeight,
                overflow: 'hidden'
            });
            layero.find('.layui-layer-min').hide();
            layero.attr('type') === 'page' && layero.find(doms[4]).hide();
            _ready.rescollbar(index);
        }
        ;
        layer.restore = function(index) {
            var layero = $('#' + doms[0] + index)
                , area = layero.attr('area').split(',');
            var type = layero.attr('type');
            layer.style(index, {
                width: parseFloat(area[0]),
                height: parseFloat(area[1]),
                top: parseFloat(area[2]),
                left: parseFloat(area[3]),
                overflow: 'visible'
            });
            layero.find('.layui-layer-max').removeClass('layui-layer-maxmin');
            layero.find('.layui-layer-min').show();
            layero.attr('type') === 'page' && layero.find(doms[4]).show();
            _ready.rescollbar(index);
        }
        ;
        layer.full = function(index) {
            var layero = $('#' + doms[0] + index), timer;
            _ready.record(layero);
            if (!doms.html.attr('layer-full')) {
                doms.html.css('overflow', 'hidden').attr('layer-full', index);
            }
            clearTimeout(timer);
            timer = setTimeout(function() {
                var isfix = layero.css('position') === 'fixed';
                layer.style(index, {
                    top: isfix ? 0 : win.scrollTop(),
                    left: isfix ? 0 : win.scrollLeft(),
                    width: win.width(),
                    height: win.height()
                });
                layero.find('.layui-layer-min').hide();
            }, 100);
        }
        ;
        layer.title = function(name, index) {
            var title = $('#' + doms[0] + (index || layer.index)).find(doms[1]);
            title.html(name);
        }
        ;
        layer.close = function(index) {
            var layero = $('#' + doms[0] + index)
                , type = layero.attr('type');
            if (!layero[0])
                return;
            if (type === _ready.type[1] && layero.attr('conType') === 'object') {
                layero.children(':not(.' + doms[5] + ')').remove();
                for (var i = 0; i < 2; i++) {
                    layero.find('.layui-layer-wrap').unwrap().hide();
                }
            } else {
                if (type === _ready.type[2]) {
                    try {
                        var iframe = $('#' + doms[4] + index)[0];
                        iframe.contentWindow.document.write('');
                        iframe.contentWindow.close();
                        layero.find('.' + doms[5])[0].removeChild(iframe);
                    } catch (e) {}
                }
                layero[0].innerHTML = '';
                layero.remove();
            }
            $('#layui-layer-moves, #layui-layer-shade' + index).remove();
            layer.ie6 && _ready.reselect();
            _ready.rescollbar(index);
            $(document).off('keydown', _ready.enter);
            typeof _ready.end[index] === 'function' && _ready.end[index]();
            delete _ready.end[index];
        }
        ;
        layer.closeAll = function(type) {
            $.each($('.' + doms[0]), function() {
                var othis = $(this);
                var is = type ? othis.attr('type') === type : 1;
                is && layer.close(othis.attr('times'));
                is = null ;
            });
        }
        ;
        var cache = layer.cache || {}
            , skin = function skin(type) {
                return cache.skin ? ' ' + cache.skin + ' ' + cache.skin + '-' + type : '';
            }
            ;
        layer.prompt = function(options, _yes) {
            options = options || {};
            if (typeof options === 'function')
                _yes = options;
            var prompt, content = options.formType == 2 ? '<textarea class="layui-layer-input">' + (options.value || '') + '</textarea>' : function() {
                return '<input type="' + (options.formType == 1 ? 'password' : 'text') + '" class="layui-layer-input" value="' + (options.value || '') + '">';
            }();
            return layer.open($.extend({
                btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
                content: content,
                skin: 'layui-layer-prompt' + skin('prompt'),
                success: function success(layero) {
                    prompt = layero.find('.layui-layer-input');
                    prompt.focus();
                },
                yes: function yes(index) {
                    var value = prompt.val();
                    if (value === '') {
                        prompt.focus();
                    } else if (value.length > (options.maxlength || 500)) {
                        layer.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + (options.maxlength || 500) + '&#x4E2A;&#x5B57;&#x6570;', prompt, {
                            tips: 1
                        });
                    } else {
                        _yes && _yes(value, index, prompt);
                    }
                }
            }, options));
        }
        ;
        layer.tab = function(options) {
            options = options || {};
            var tab = options.tab || {};
            return layer.open($.extend({
                type: 1,
                skin: 'layui-layer-tab' + skin('tab'),
                title: function() {
                    var len = tab.length
                        , ii = 1
                        , str = '';
                    if (len > 0) {
                        str = '<span class="layui-layer-tabnow">' + tab[0].title + '</span>';
                        for (; ii < len; ii++) {
                            str += '<span>' + tab[ii].title + '</span>';
                        }
                    }
                    return str;
                }(),
                content: '<ul class="layui-layer-tabmain">' + function() {
                    var len = tab.length
                        , ii = 1
                        , str = '';
                    if (len > 0) {
                        str = '<li class="layui-layer-tabli xubox_tab_layer">' + (tab[0].content || 'no content') + '</li>';
                        for (; ii < len; ii++) {
                            str += '<li class="layui-layer-tabli">' + (tab[ii].content || 'no  content') + '</li>';
                        }
                    }
                    return str;
                }() + '</ul>',
                success: function success(layero) {
                    var btn = layero.find('.layui-layer-title').children();
                    var main = layero.find('.layui-layer-tabmain').children();
                    btn.on('mousedown', function(e) {
                        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                        var othis = $(this)
                            , index = othis.index();
                        othis.addClass('layui-layer-tabnow').siblings().removeClass('layui-layer-tabnow');
                        main.eq(index).show().siblings().hide();
                        typeof options.change === 'function' && options.change(index);
                    });
                }
            }, options));
        }
        ;
        layer.photos = function(options, loop, key) {
            var dict = {};
            options = options || {};
            if (!options.photos)
                return;
            var type = options.photos.constructor === Object;
            var photos = type ? options.photos : {}
                , data = photos.data || [];
            var start = photos.start || 0;
            dict.imgIndex = (start | 0) + 1;
            options.img = options.img || 'img';
            if (!type) {
                var parent = $(options.photos)
                    , pushData = function pushData() {
                        data = [];
                        parent.find(options.img).each(function(index) {
                            var othis = $(this);
                            othis.attr('layer-index', index);
                            data.push({
                                alt: othis.attr('alt'),
                                pid: othis.attr('layer-pid'),
                                src: othis.attr('layer-src') || othis.attr('src'),
                                thumb: othis.attr('src')
                            });
                        });
                    }
                    ;
                pushData();
                if (data.length === 0)
                    return;
                loop || parent.on('click', options.img, function() {
                    var othis = $(this)
                        , index = othis.attr('layer-index');
                    layer.photos($.extend(options, {
                        photos: {
                            start: index,
                            data: data,
                            tab: options.tab
                        },
                        full: options.full
                    }), true);
                    pushData();
                });
                if (!loop)
                    return;
            } else if (data.length === 0) {
                return layer.msg('&#x6CA1;&#x6709;&#x56FE;&#x7247;');
            }
            dict.imgprev = function(key) {
                dict.imgIndex--;
                if (dict.imgIndex < 1) {
                    dict.imgIndex = data.length;
                }
                dict.tabimg(key);
            }
            ;
            dict.imgnext = function(key, errorMsg) {
                dict.imgIndex++;
                if (dict.imgIndex > data.length) {
                    dict.imgIndex = 1;
                    if (errorMsg) {
                        return;
                    }
                    ;
                }
                dict.tabimg(key);
            }
            ;
            dict.keyup = function(event) {
                if (!dict.end) {
                    var code = event.keyCode;
                    event.preventDefault();
                    if (code === 37) {
                        dict.imgprev(true);
                    } else if (code === 39) {
                        dict.imgnext(true);
                    } else if (code === 27) {
                        layer.close(dict.index);
                    }
                }
            }
            ;
            dict.tabimg = function(key) {
                if (data.length <= 1)
                    return;
                photos.start = dict.imgIndex - 1;
                layer.close(dict.index);
                layer.photos(options, true, key);
            }
            ;
            dict.event = function() {
                dict.bigimg.hover(function() {
                    dict.imgsee.show();
                }, function() {
                    dict.imgsee.hide();
                });
                dict.bigimg.find('.layui-layer-imgprev').on('click', function(event) {
                    event.preventDefault();
                    dict.imgprev();
                });
                dict.bigimg.find('.layui-layer-imgnext').on('click', function(event) {
                    event.preventDefault();
                    dict.imgnext();
                });
                $(document).on('keyup', dict.keyup);
            }
            ;
            function loadImage(url, callback, error) {
                var img = new Image();
                img.src = url;
                if (img.complete) {
                    return callback(img);
                }
                img.onload = function() {
                    img.onload = null ;
                    callback(img);
                }
                ;
                img.onerror = function(e) {
                    img.onerror = null ;
                    error(e);
                }
                ;
            }
            ;dict.loadi = layer.load(1, {
                shade: 'shade'in options ? false : 0.9,
                scrollbar: false
            });
            loadImage(data[start].src, function(img) {
                layer.close(dict.loadi);
                dict.index = layer.open($.extend({
                    type: 1,
                    area: function() {
                        var imgarea = [img.width, img.height];
                        var winarea = [$(window).width() - 50, $(window).height() - 50];
                        if (!options.full && imgarea[0] > winarea[0]) {
                            imgarea[0] = winarea[0];
                            imgarea[1] = imgarea[0] * img.height / img.width;
                        }
                        return [imgarea[0] + 'px', imgarea[1] + 'px'];
                    }(),
                    title: false,
                    shade: 0.9,
                    shadeClose: true,
                    closeBtn: false,
                    move: '.layui-layer-phimg img',
                    moveType: 1,
                    scrollbar: false,
                    moveOut: true,
                    shift: Math.random() * 5 | 0,
                    skin: 'layui-layer-photos' + skin('photos'),
                    content: '<div class="layui-layer-phimg">' + '<img src="' + data[start].src + '" alt="' + (data[start].alt || '') + '" layer-pid="' + data[start].pid + '">' + '<div class="layui-layer-imgsee">' + (data.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : '') + '<div class="layui-layer-imgbar" style="display:' + (key ? 'block' : '') + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (data[start].alt || '') + '</a><em>' + dict.imgIndex + '/' + data.length + '</em></span></div>' + '</div>' + '</div>',
                    success: function success(layero, index) {
                        dict.bigimg = layero.find('.layui-layer-phimg');
                        dict.imgsee = layero.find('.layui-layer-imguide,.layui-layer-imgbar');
                        dict.event(layero);
                        options.tab && options.tab(data[start], layero);
                    },
                    end: function end() {
                        dict.end = true;
                        $(document).off('keyup', dict.keyup);
                    }
                }, options));
            }, function() {
                layer.close(dict.loadi);
                layer.msg('&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;', {
                    time: 30000,
                    btn: ['&#x4E0B;&#x4E00;&#x5F20;', '&#x4E0D;&#x770B;&#x4E86;'],
                    yes: function yes() {
                        data.length > 1 && dict.imgnext(true, true);
                    }
                });
            });
        }
        ;
        _ready.run = function() {
            $ = jQuery;
            win = $(window);
            doms.html = $('html');
            layer.open = function(deliver) {
                var o = new Class(deliver);
                return o.index;
            }
            ;
        }
        ;
        _ready.run();
        exports.layer = layer;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var mapDialogTemplate = exports.mapDialogTemplate = "\n<div class=\"map-detail\">\n    <div class=\"J_MapDetailClose map-detail-close\"></div>\n    <div class=\"J_MapDetail map-detail-map\"></div>\n    <div class=\"map-detail-journey\">\n    <div class=\"J_MapDetailJourney map-nav\">\n      <ul class=\"map-nav-main\">\n        <% if (scheduleType == 1) { %>\n          <% for (var journeyIndex = 0, list; journeyIndex < data.length; journeyIndex++) { %>\n            <% if (data[journeyIndex] && (list = data[journeyIndex]['data']) && list.length) { %>\n                <% for (var isBlank = true, moduleIndex = 0; moduleIndex < list.length; moduleIndex++) {\n                    var moduleData = list[moduleIndex];\n                    if (moduleData.data && moduleData.data.length) {\n                        isBlank = !moduleData.data.filter(function(resData) {\n                            return resData && resData.latitude && resData.longitude\n                        }).length;\n                        if (!isBlank) {\n                            break;\n                        }\n                    }\n                } %>\n                <% if (!isBlank) { %>\n                    <li>\n                        <div class=\"map-nav-item map-main-item\" data-nav-id=\"<%= data[journeyIndex]['cid'] %>\">\n                          <div class=\"map-nav-label\" title=\"\u7B2C<%= data[journeyIndex]['day'] %>\u5929\">\u7B2C<%= data[journeyIndex]['day'] %>\u5929</div>\n                          <i class=\"map-nav-icon-serial\"><span>D<%= data[journeyIndex]['day'] %></span></i>\n                        </div>\n                        <ul class=\"map-nav-sub\">\n                          <% var itemIndex = 1;%>\n                          <% for (var moduleIndex = 0; moduleIndex < list.length; moduleIndex++) { %>\n                              <% var moduleData = list[moduleIndex] %>\n                              <% if (moduleData) { %>\n                                  <% if (moduleData.data && moduleData.data.length) { %>\n                                      <% for(var resIndex = 0; resIndex <  moduleData.data.length; resIndex++) { %>\n                                          <% var resData = moduleData.data[resIndex] %>\n                                          <% if (resData && resData.latitude && resData.longitude) { %>\n                                              <li>\n                                                <div class=\"map-nav-item map-sub-item\" data-nav-id=\"<%= data[journeyIndex]['cid'] %>\" data-sub-id=\"<%= resData['cid'] %>\">\n                                                  <div class=\"map-nav-label\" title=\"<%= resData['title'] %>\"><%= resData['title'] %></div>\n                                                  <i class=\"map-nav-icon-serial\"><span><%= itemIndex++ %></span></i>\n                                                </div>\n                                              </li>\n                                          <% } %>\n                                      <% } %>\n                                  <% } %>\n                              <% } %>\n                          <% } %>\n                        </ul>\n                    </li>\n                <% } %>\n            <% } %>\n          <% } %>\n        <% } %>\n      </ul>\n    </div>\n    </div>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var spotDetailTemplate = exports.spotDetailTemplate = "\n<div class=\"detail-dialog\">\n    <!-- dialog head S -->\n    <div class=\"detail-dialog-head\">\n        <div class=\"detail-dialog-title\"><%= data.title %></div>\n        <div class=\"J_DialogClose detail-dialog-close\"></div>\n    </div>\n    <!-- dialog head E -->\n    <div class=\"detail-dialog-body\">\n        <div class=\"detail-dialog-gallery\">\n            <% if (data.picture && data.picture.length) { %>\n                <div class=\"J_DialogGallery gallery\">\n                    <div class=\"gallery-display\">\n                        <ul class=\"gallery-display-box\">\n                            <% if (data.picture && data.picture.length) { %>\n                                <% for(var i = 0, len = data.picture.length, item; i < data.picture.length && (item = data.picture[i]); i++) { %>\n                                <li class=\"gallery-photo<% if (i === 0) { %> gallery-photo-active<% } %>\" data-src=\"<%= item.url %>\" data-thumb=\"<%= item.url %>\">\n                                    <img src=\"<%= item.url %>\" alt=\"<%= item.title %>\">\n                                </li>\n                                <% } %>\n                            <% } %>\n                        </ul>\n                    </div>\n                    <div class=\"gallery-nav\">\n                        <div class=\"gallery-prev\"><i class=\"icon\"></i></div>\n                        <div class=\"gallery-next\"><i class=\"icon\"></i></div>\n                        <div class=\"gallery-thumbs\">\n                            <div class=\"gallery-mask\"></div>\n                            <div class=\"gallery-nav-box\">\n                                <ul class=\"gallery-nav-list\">\n                                    <% if (data.picture && data.picture.length) { %>\n                                        <% for(var i = 0, len = data.picture.length, item; i < data.picture.length && (item = data.picture[i]); i++) { %>\n                                        <li class=\"gallery-thumb\"><img src=\"<%= item.url %>\" alt=\"<%= item.title %>\"></li>\n                                        <% } %>\n                                    <% } %>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            <% } %>\n        </div>\n\n        <div class=\"detail-dialog-info\">\n            <div class=\"detail-dialog-info-box\">\n                <div class=\"detail-dialog-info-title\">\n                    \u666F\u70B9\u4ECB\u7ECD<i class=\"icon detail-content-icon-note\"></i>\n                </div>\n                <% if (data.beenCount && data.beenCount != 0) { %>\n                    <div class=\"detail-dialog-info-item\">\n                        <i class=\"icon detail-content-icon-person\"></i>\n                        <strong class=\"detail-dialog-info-strong\"><%= data.beenCount %></strong>\u4EBA\u53BB\u8FC7\n                    </div>\n                <% } %>\n                <% if (data.times != 0) { %>\n                    <div class=\"detail-dialog-info-item\">\n                        <i class=\"icon detail-content-icon-clock\"></i> \u6E38\u73A9\u65F6\u957F:\n                        <%= data.times %>\n                    </div>\n                <% } %>\n                <% if (data.opened) { %>\n                    <div class=\"detail-dialog-info-item\">\n                        <i class=\"icon detail-content-icon-calendar\"></i> \u5F00\u653E\u65F6\u95F4:\n                        <%= data.opened %>\n                    </div>\n                <% } %>\n                <% if (data.telephone) { %>\n                    <div class=\"detail-dialog-info-item\">\n                        <i class=\"icon detail-content-icon-telphone\"></i> \u7535\u8BDD\u53F7\u7801:\n                        <%= data.telephone %>\n                    </div>\n                <% } %>\n                <% if (data.address) { %>\n                    <div class=\"detail-dialog-info-item\">\n                        <i class=\"icon detail-content-icon-location\"></i> \u666F\u70B9\u5730\u5740:\n                        <%= data.address %>\n                    </div>\n                <% } %>\n                <% if (data.content) { %>\n                    <div class=\"detail-dialog-info-desc\">\n                        <%= data.content %>\n                    </div>\n                <% } %>\n            </div>\n        </div>\n    </div>\n</div>\n";
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var HORIZONTAL_DIRECTION = 1;
        var VERTICAL_DIRECTION = 2;
        var galleryInstances = [];
        var defaultOption = {
            showNav: true,
            direction: HORIZONTAL_DIRECTION,
            navDirection: HORIZONTAL_DIRECTION,
            thumbWidth: 108,
            thumbHeight: 50,
            galleryWidth: 500,
            galleryHeight: 282,
            navOffset: 4,
            navAmountInView: 4,
            navMinLimit: 1
        };
        var delay = 5000;
        var speed = 700;
        var SELECTOR_DISPLAY_BOX = '.gallery-display-box';
        var SELECTOR_PHOTO_ITEM = '.gallery-photo';
        var SELECTOR_VIDEO_COVER = '.gallery-video-cover';
        var SELECTOR_VIDEO_BUTTON = '.gallery-video-button';
        var SELECTOR_NAV_CONTAINER = '.gallery-nav';
        var SELECTOR_NAV_PREV = '.gallery-prev';
        var SELECTOR_NAV_NEXT = '.gallery-next';
        var SELECTOR_NAV_MASK = '.gallery-mask';
        var SELECTOR_NAV_LIST = '.gallery-nav-list';
        var CLASSNAME_PHOTO_ACTIVE = 'gallery-photo-active';
        function addInstance(instance) {
            galleryInstances.push(instance);
        }
        function removeInstance(instance) {
            var index = galleryInstances.indexOf(instance);
            if (~index) {
                galleryInstances.splice(index, 1);
            }
        }
        var Gallery = function() {
            function Gallery(selector) {
                var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                _classCallCheck(this, Gallery);
                this.option = Object.assign({}, defaultOption, option);
                this.container = $(selector);
                if (this.container.length === 0) {
                    return;
                }
                if (this.option.pictures) {
                    this.pictures = this.option.pictures.slice();
                } else {
                    this.pictures = this.collectPictures();
                }
                this.length = this.pictures.length;
                if (this.length <= 1) {
                    return;
                }
                this.containerWidth = this.option.galleryWidth;
                this.containerHeight = this.option.galleryHeight;
                this.currentIndex = 0;
                this.nextIndex = 0;
                this.timer = null ;
                this.navVisible = false;
                this.navChanging = false;
                this.displayChanging = false;
                this.changing = false;
                this.hovering = false;
                if (this.option.direction == HORIZONTAL_DIRECTION) {
                    this.positionProperty = 'left';
                    this.displayChangeStep = this.option.galleryWidth;
                } else {
                    this.positionProperty = 'top';
                    this.displayChangeStep = this.option.galleryHeight;
                }
                if (this.option.navDirection == HORIZONTAL_DIRECTION) {
                    this.navPositionProperty = 'left';
                    this.thumbChangeStep = this.option.thumbWidth;
                } else {
                    this.navPositionProperty = 'top';
                    this.thumbChangeStep = this.option.thumbHeight;
                }
                this.initialize();
                this.initializeDisplay();
                if (this.length > this.option.navMinLimit && this.option.showNav) {
                    this.initializeNav();
                }
                if (this.option.autoChange) {
                    this.startAutoChange();
                }
                addInstance(this);
            }
            _createClass(Gallery, [{
                key: 'initialize',
                value: function initialize() {
                    var self = this;
                    this.container.hover(function() {
                        self.hovering = true;
                        self.stopAutoChange();
                    }, function() {
                        self.hovering = false;
                        self.startAutoChange();
                    });
                }
            }, {
                key: 'collectPictures',
                value: function collectPictures() {
                    return this.container.find(SELECTOR_PHOTO_ITEM).map(function() {
                        var item = $(this);
                        return {
                            picture: item.data('src'),
                            thumb: item.data('thumb'),
                            type: item.data('type'),
                            video: item.data('video'),
                            loaded: false,
                            element: item
                        };
                    }).toArray();
                }
            }, {
                key: 'getPicture',
                value: function getPicture() {
                    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                    return this.pictures[index];
                }
            }, {
                key: 'getNextIndex',
                value: function getNextIndex() {
                    return (this.currentIndex + 1) % this.length;
                }
            }, {
                key: 'getPrevIndex',
                value: function getPrevIndex() {
                    return (this.length + this.currentIndex - 1) % this.length;
                }
            }, {
                key: 'startAutoChange',
                value: function startAutoChange() {
                    this.stopAutoChange();
                    this.autoChange();
                }
            }, {
                key: 'stopAutoChange',
                value: function stopAutoChange() {
                    clearTimeout(this.timer);
                }
            }, {
                key: 'autoChange',
                value: function autoChange() {
                    var _this = this;
                    this.timer = setTimeout(function() {
                        _this.change(_this.getNextIndex());
                    }, delay);
                }
            }, {
                key: 'change',
                value: function change(index, direction) {
                    if (this.changing || index == this.currentIndex) {
                        return;
                    }
                    if (!direction) {
                        direction = index < this.currentIndex ? -1 : 1;
                    }
                    this.nextIndex = index;
                    this.changing = true;
                    this.changeDisplay(direction);
                    if (this.option.showNav) {
                        this.changeNav();
                    }
                    this.currentIndex = this.nextIndex;
                }
            }, {
                key: 'endChange',
                value: function endChange() {
                    if (!this.displayChanging && !this.navChanging) {
                        this.changing = false;
                        if (!this.hovering) {
                            this.autoChange();
                        }
                    }
                }
            }, {
                key: 'initializeNav',
                value: function initializeNav() {
                    var _this2 = this;
                    var self = this, navList, thumbList;
                    if (!this.container.find(SELECTOR_NAV_CONTAINER).length) {
                        return;
                    }
                    navList = this.container.find(SELECTOR_NAV_LIST);
                    thumbList = navList.children();
                    if (this.option.navDirection == HORIZONTAL_DIRECTION) {
                        navList.width(this.length * this.option.thumbWidth);
                    } else {
                        navList.height(this.length * this.option.thumbHeight);
                    }
                    this.pictures.forEach(function(picture, index) {
                        thumbList.eq(index).click(function() {
                            this.change(index);
                        }
                            .bind(_this2));
                    });
                    this.container.find(SELECTOR_NAV_PREV).click(function() {
                        self.change(self.getPrevIndex(), -1);
                    });
                    this.container.find(SELECTOR_NAV_NEXT).click(function() {
                        self.change(self.getNextIndex(), 1);
                    });
                }
            }, {
                key: 'changeNav',
                value: function changeNav() {
                    var self = this, navList = this.container.find(SELECTOR_NAV_LIST), navOutline = this.container.find(SELECTOR_NAV_MASK), nextPosition, outlineNextPosition;
                    nextPosition = Math.max(0, Math.min(this.length - this.option.navAmountInView, this.nextIndex)) * this.thumbChangeStep;
                    outlineNextPosition = this.thumbChangeStep * this.nextIndex - nextPosition;
                    self.navChanging = true;
                    navOutline.animate(_defineProperty({}, this.navPositionProperty, outlineNextPosition + this.option.navOffset), speed);
                    navList.animate(_defineProperty({}, this.navPositionProperty, -nextPosition), speed, function() {
                        self.navChanging = false;
                        self.endChange();
                    });
                }
            }, {
                key: 'initializeDisplay',
                value: function initializeDisplay() {
                    var _this3 = this;
                    var self = this
                        , currentIndex = this.currentIndex
                        , containerWidth = this.containerWidth;
                    this.container.find(SELECTOR_PHOTO_ITEM).each(function(index) {
                        $(this).css(self.positionProperty, currentIndex == index ? 0 : -containerWidth);
                    });
                    this.pictures.forEach(function(item) {
                        switch (item.type) {
                            case 'video':
                                _this3.initializeVideo(item);
                                break;
                        }
                    });
                }
            }, {
                key: 'createVideo',
                value: function createVideo(videoUrl, videoWidth, videoHeight) {
                    return $('<iframe />').attr({
                        frameborder: 0,
                        scrolling: 'no',
                        width: videoWidth,
                        height: videoHeight,
                        src: videoUrl
                    });
                }
            }, {
                key: 'initializeVideo',
                value: function initializeVideo(item) {
                    var videoWidth = this.option.galleryWidth
                        , videoHeight = this.option.galleryHeight
                        , self = this
                        , videoCover = item.element.find(SELECTOR_VIDEO_COVER)
                        , videoButton = item.element.find(SELECTOR_VIDEO_BUTTON)
                        , videoContainer = $('<div />').width(videoWidth).height(videoHeight);
                    videoContainer.hide().appendTo(item.element);
                    item.videoContainer = videoContainer;
                    item.videoCover = videoCover;
                    videoButton.click(function() {
                        if (item.videoObject) {
                            item.videoObject.remove();
                        }
                        item.videoObject = self.createVideo(item.video, videoWidth, videoHeight);
                        item.videoObject.appendTo(videoContainer);
                        videoCover.hide();
                        videoContainer.show();
                    });
                }
            }, {
                key: 'resetVideo',
                value: function resetVideo(item) {
                    item.videoCover.show();
                    item.videoContainer.hide();
                    if (item.videoObject) {
                        item.videoObject.remove();
                    }
                }
            }, {
                key: 'changeDisplay',
                value: function changeDisplay() {
                    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                    var self = this
                        , positionProperty = this.positionProperty
                        , current = this.getPicture(this.currentIndex)
                        , next = this.getPicture(this.nextIndex);
                    this.displayChanging = true;
                    next.element.css(positionProperty, direction * this.containerWidth);
                    if (current.type === 'video') {
                        this.resetVideo(current);
                    }
                    current.element.addClass(CLASSNAME_PHOTO_ACTIVE);
                    next.element.addClass(CLASSNAME_PHOTO_ACTIVE);
                    this.container.find(SELECTOR_DISPLAY_BOX).stop(true, true).animate(_defineProperty({}, positionProperty, -this.containerWidth * direction), speed, function() {
                        $(this).css(positionProperty, 0);
                        next.element.css(positionProperty, 0);
                        current.element.css(positionProperty, -self.containerWidth).removeClass(CLASSNAME_PHOTO_ACTIVE);
                        self.displayChanging = false;
                        self.endChange();
                    });
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    removeInstance(this);
                }
            }]);
            return Gallery;
        }();
        ;Gallery.create = function() {
            return new (Function.prototype.bind.apply(Gallery.apply, [null ].concat(Array.prototype.slice.call(arguments))))();
        }
        ;
        exports.Gallery = Gallery;
    }
    , , , , function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            __webpack_require__(19);
            __webpack_require__(310);
            __webpack_require__(312);
            if (global._babelPolyfill) {
                throw new Error("only one instance of babel-polyfill is allowed");
            }
            global._babelPolyfill = true;
            var DEFINE_PROPERTY = "defineProperty";
            function define(O, key, value) {
                O[key] || Object[DEFINE_PROPERTY](O, key, {
                    writable: true,
                    configurable: true,
                    value: value
                });
            }
            define(String.prototype, "padLeft", "".padStart);
            define(String.prototype, "padRight", "".padEnd);
            "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(key) {
                [][key] && define(Array, key, Function.call.bind([][key]));
            });
        }
            .call(exports, (function() {
                return this;
            }())))
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(20);
        __webpack_require__(69);
        __webpack_require__(70);
        __webpack_require__(71);
        __webpack_require__(72);
        __webpack_require__(74);
        __webpack_require__(77);
        __webpack_require__(78);
        __webpack_require__(79);
        __webpack_require__(80);
        __webpack_require__(81);
        __webpack_require__(82);
        __webpack_require__(83);
        __webpack_require__(84);
        __webpack_require__(85);
        __webpack_require__(87);
        __webpack_require__(89);
        __webpack_require__(91);
        __webpack_require__(93);
        __webpack_require__(96);
        __webpack_require__(97);
        __webpack_require__(98);
        __webpack_require__(102);
        __webpack_require__(104);
        __webpack_require__(106);
        __webpack_require__(109);
        __webpack_require__(110);
        __webpack_require__(111);
        __webpack_require__(112);
        __webpack_require__(114);
        __webpack_require__(115);
        __webpack_require__(116);
        __webpack_require__(117);
        __webpack_require__(118);
        __webpack_require__(119);
        __webpack_require__(120);
        __webpack_require__(122);
        __webpack_require__(123);
        __webpack_require__(124);
        __webpack_require__(126);
        __webpack_require__(127);
        __webpack_require__(128);
        __webpack_require__(130);
        __webpack_require__(131);
        __webpack_require__(132);
        __webpack_require__(133);
        __webpack_require__(134);
        __webpack_require__(135);
        __webpack_require__(136);
        __webpack_require__(137);
        __webpack_require__(138);
        __webpack_require__(139);
        __webpack_require__(140);
        __webpack_require__(141);
        __webpack_require__(142);
        __webpack_require__(143);
        __webpack_require__(148);
        __webpack_require__(149);
        __webpack_require__(153);
        __webpack_require__(154);
        __webpack_require__(155);
        __webpack_require__(156);
        __webpack_require__(158);
        __webpack_require__(159);
        __webpack_require__(160);
        __webpack_require__(161);
        __webpack_require__(162);
        __webpack_require__(163);
        __webpack_require__(164);
        __webpack_require__(165);
        __webpack_require__(166);
        __webpack_require__(167);
        __webpack_require__(168);
        __webpack_require__(169);
        __webpack_require__(170);
        __webpack_require__(171);
        __webpack_require__(172);
        __webpack_require__(173);
        __webpack_require__(174);
        __webpack_require__(176);
        __webpack_require__(177);
        __webpack_require__(183);
        __webpack_require__(184);
        __webpack_require__(186);
        __webpack_require__(187);
        __webpack_require__(188);
        __webpack_require__(192);
        __webpack_require__(193);
        __webpack_require__(194);
        __webpack_require__(195);
        __webpack_require__(196);
        __webpack_require__(198);
        __webpack_require__(199);
        __webpack_require__(200);
        __webpack_require__(201);
        __webpack_require__(204);
        __webpack_require__(206);
        __webpack_require__(207);
        __webpack_require__(208);
        __webpack_require__(210);
        __webpack_require__(212);
        __webpack_require__(214);
        __webpack_require__(215);
        __webpack_require__(216);
        __webpack_require__(218);
        __webpack_require__(219);
        __webpack_require__(220);
        __webpack_require__(221);
        __webpack_require__(228);
        __webpack_require__(231);
        __webpack_require__(232);
        __webpack_require__(234);
        __webpack_require__(235);
        __webpack_require__(238);
        __webpack_require__(239);
        __webpack_require__(241);
        __webpack_require__(242);
        __webpack_require__(243);
        __webpack_require__(244);
        __webpack_require__(245);
        __webpack_require__(246);
        __webpack_require__(247);
        __webpack_require__(248);
        __webpack_require__(249);
        __webpack_require__(250);
        __webpack_require__(251);
        __webpack_require__(252);
        __webpack_require__(253);
        __webpack_require__(254);
        __webpack_require__(255);
        __webpack_require__(256);
        __webpack_require__(257);
        __webpack_require__(258);
        __webpack_require__(259);
        __webpack_require__(261);
        __webpack_require__(262);
        __webpack_require__(263);
        __webpack_require__(264);
        __webpack_require__(265);
        __webpack_require__(266);
        __webpack_require__(268);
        __webpack_require__(269);
        __webpack_require__(270);
        __webpack_require__(271);
        __webpack_require__(272);
        __webpack_require__(273);
        __webpack_require__(274);
        __webpack_require__(275);
        __webpack_require__(277);
        __webpack_require__(278);
        __webpack_require__(280);
        __webpack_require__(281);
        __webpack_require__(282);
        __webpack_require__(283);
        __webpack_require__(286);
        __webpack_require__(287);
        __webpack_require__(288);
        __webpack_require__(289);
        __webpack_require__(290);
        __webpack_require__(291);
        __webpack_require__(292);
        __webpack_require__(293);
        __webpack_require__(295);
        __webpack_require__(296);
        __webpack_require__(297);
        __webpack_require__(298);
        __webpack_require__(299);
        __webpack_require__(300);
        __webpack_require__(301);
        __webpack_require__(302);
        __webpack_require__(303);
        __webpack_require__(304);
        __webpack_require__(305);
        __webpack_require__(308);
        __webpack_require__(309);
        module.exports = __webpack_require__(26);
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var global = __webpack_require__(21)
            , has = __webpack_require__(22)
            , DESCRIPTORS = __webpack_require__(23)
            , $export = __webpack_require__(25)
            , redefine = __webpack_require__(35)
            , META = __webpack_require__(39).KEY
            , $fails = __webpack_require__(24)
            , shared = __webpack_require__(40)
            , setToStringTag = __webpack_require__(41)
            , uid = __webpack_require__(36)
            , wks = __webpack_require__(42)
            , wksExt = __webpack_require__(43)
            , wksDefine = __webpack_require__(44)
            , keyOf = __webpack_require__(46)
            , enumKeys = __webpack_require__(59)
            , isArray = __webpack_require__(62)
            , anObject = __webpack_require__(29)
            , toIObject = __webpack_require__(49)
            , toPrimitive = __webpack_require__(33)
            , createDesc = __webpack_require__(34)
            , _create = __webpack_require__(63)
            , gOPNExt = __webpack_require__(66)
            , $GOPD = __webpack_require__(68)
            , $DP = __webpack_require__(28)
            , $keys = __webpack_require__(47)
            , gOPD = $GOPD.f
            , dP = $DP.f
            , gOPN = gOPNExt.f
            , $Symbol = global.Symbol
            , $JSON = global.JSON
            , _stringify = $JSON && $JSON.stringify
            , PROTOTYPE = 'prototype'
            , HIDDEN = wks('_hidden')
            , TO_PRIMITIVE = wks('toPrimitive')
            , isEnum = {}.propertyIsEnumerable
            , SymbolRegistry = shared('symbol-registry')
            , AllSymbols = shared('symbols')
            , OPSymbols = shared('op-symbols')
            , ObjectProto = Object[PROTOTYPE]
            , USE_NATIVE = typeof $Symbol == 'function'
            , QObject = global.QObject;
        var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
        var setSymbolDesc = DESCRIPTORS && $fails(function() {
            return _create(dP({}, 'a', {
                    get: function() {
                        return dP(this, 'a', {
                            value: 7
                        }).a;
                    }
                })).a != 7;
        }) ? function(it, key, D) {
            var protoDesc = gOPD(ObjectProto, key);
            if (protoDesc)
                delete ObjectProto[key];
            dP(it, key, D);
            if (protoDesc && it !== ObjectProto)
                dP(ObjectProto, key, protoDesc);
        }
            : dP;
        var wrap = function(tag) {
                var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
                sym._k = tag;
                return sym;
            }
            ;
        var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it) {
                return typeof it == 'symbol';
            }
                : function(it) {
                return it instanceof $Symbol;
            }
            ;
        var $defineProperty = function defineProperty(it, key, D) {
                if (it === ObjectProto)
                    $defineProperty(OPSymbols, key, D);
                anObject(it);
                key = toPrimitive(key, true);
                anObject(D);
                if (has(AllSymbols, key)) {
                    if (!D.enumerable) {
                        if (!has(it, HIDDEN))
                            dP(it, HIDDEN, createDesc(1, {}));
                        it[HIDDEN][key] = true;
                    } else {
                        if (has(it, HIDDEN) && it[HIDDEN][key])
                            it[HIDDEN][key] = false;
                        D = _create(D, {
                            enumerable: createDesc(0, false)
                        });
                    }
                    return setSymbolDesc(it, key, D);
                }
                return dP(it, key, D);
            }
            ;
        var $defineProperties = function defineProperties(it, P) {
                anObject(it);
                var keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length, key;
                while (l > i)
                    $defineProperty(it, key = keys[i++], P[key]);
                return it;
            }
            ;
        var $create = function create(it, P) {
                return P === undefined ? _create(it) : $defineProperties(_create(it), P);
            }
            ;
        var $propertyIsEnumerable = function propertyIsEnumerable(key) {
                var E = isEnum.call(this, key = toPrimitive(key, true));
                if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))
                    return false;
                return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
            }
            ;
        var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
                it = toIObject(it);
                key = toPrimitive(key, true);
                if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))
                    return;
                var D = gOPD(it, key);
                if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))
                    D.enumerable = true;
                return D;
            }
            ;
        var $getOwnPropertyNames = function getOwnPropertyNames(it) {
                var names = gOPN(toIObject(it)), result = [], i = 0, key;
                while (names.length > i) {
                    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)
                        result.push(key);
                }
                return result;
            }
            ;
        var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
                var IS_OP = it === ObjectProto, names = gOPN(IS_OP ? OPSymbols : toIObject(it)), result = [], i = 0, key;
                while (names.length > i) {
                    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))
                        result.push(AllSymbols[key]);
                }
                return result;
            }
            ;
        if (!USE_NATIVE) {
            $Symbol = function Symbol() {
                if (this instanceof $Symbol)
                    throw TypeError('Symbol is not a constructor!');
                var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
                var $set = function(value) {
                        if (this === ObjectProto)
                            $set.call(OPSymbols, value);
                        if (has(this, HIDDEN) && has(this[HIDDEN], tag))
                            this[HIDDEN][tag] = false;
                        setSymbolDesc(this, tag, createDesc(1, value));
                    }
                    ;
                if (DESCRIPTORS && setter)
                    setSymbolDesc(ObjectProto, tag, {
                        configurable: true,
                        set: $set
                    });
                return wrap(tag);
            }
            ;
            redefine($Symbol[PROTOTYPE], 'toString', function toString() {
                return this._k;
            });
            $GOPD.f = $getOwnPropertyDescriptor;
            $DP.f = $defineProperty;
            __webpack_require__(67).f = gOPNExt.f = $getOwnPropertyNames;
            __webpack_require__(61).f = $propertyIsEnumerable;
            __webpack_require__(60).f = $getOwnPropertySymbols;
            if (DESCRIPTORS && !__webpack_require__(45)) {
                redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
            }
            wksExt.f = function(name) {
                return wrap(wks(name));
            }
        }
        $export($export.G + $export.W + $export.F * !USE_NATIVE, {
            Symbol: $Symbol
        });
        for (var symbols = ('hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables').split(','), i = 0; symbols.length > i; )
            wks(symbols[i++]);
        for (var symbols = $keys(wks.store), i = 0; symbols.length > i; )
            wksDefine(symbols[i++]);
        $export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
            'for': function(key) {
                return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
            },
            keyFor: function keyFor(key) {
                if (isSymbol(key))
                    return keyOf(SymbolRegistry, key);
                throw TypeError(key + ' is not a symbol!');
            },
            useSetter: function() {
                setter = true;
            },
            useSimple: function() {
                setter = false;
            }
        });
        $export($export.S + $export.F * !USE_NATIVE, 'Object', {
            create: $create,
            defineProperty: $defineProperty,
            defineProperties: $defineProperties,
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
            getOwnPropertyNames: $getOwnPropertyNames,
            getOwnPropertySymbols: $getOwnPropertySymbols
        });
        $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function() {
                var S = $Symbol();
                return _stringify([S]) != '[null]' || _stringify({
                        a: S
                    }) != '{}' || _stringify(Object(S)) != '{}';
            })), 'JSON', {
            stringify: function stringify(it) {
                if (it === undefined || isSymbol(it))
                    return;
                var args = [it], i = 1, replacer, $replacer;
                while (arguments.length > i)
                    args.push(arguments[i++]);
                replacer = args[1];
                if (typeof replacer == 'function')
                    $replacer = replacer;
                if ($replacer || !isArray(replacer))
                    replacer = function(key, value) {
                        if ($replacer)
                            value = $replacer.call(this, key, value);
                        if (!isSymbol(value))
                            return value;
                    }
                    ;
                args[1] = replacer;
                return _stringify.apply($JSON, args);
            }
        });
        $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(27)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
        setToStringTag($Symbol, 'Symbol');
        setToStringTag(Math, 'Math', true);
        setToStringTag(global.JSON, 'JSON', true);
    }
    , function(module, exports) {
        var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
        if (typeof __g == 'number')
            __g = global;
    }
    , function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        module.exports = !__webpack_require__(24)(function() {
            return Object.defineProperty({}, 'a', {
                    get: function() {
                        return 7;
                    }
                }).a != 7;
        });
    }
    , function(module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec();
            } catch (e) {
                return true;
            }
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var global = __webpack_require__(21)
            , core = __webpack_require__(26)
            , hide = __webpack_require__(27)
            , redefine = __webpack_require__(35)
            , ctx = __webpack_require__(37)
            , PROTOTYPE = 'prototype';
        var $export = function(type, name, source) {
                var IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE], exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}), key, own, out, exp;
                if (IS_GLOBAL)
                    source = name;
                for (key in source) {
                    own = !IS_FORCED && target && target[key] !== undefined;
                    out = (own ? target : source)[key];
                    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
                    if (target)
                        redefine(target, key, out, type & $export.U);
                    if (exports[key] != out)
                        hide(exports, key, exp);
                    if (IS_PROTO && expProto[key] != out)
                        expProto[key] = out;
                }
            }
            ;
        global.core = core;
        $export.F = 1;
        $export.G = 2;
        $export.S = 4;
        $export.P = 8;
        $export.B = 16;
        $export.W = 32;
        $export.U = 64;
        $export.R = 128;
        module.exports = $export;
    }
    , function(module, exports) {
        var core = module.exports = {
            version: '2.4.0'
        };
        if (typeof __e == 'number')
            __e = core;
    }
    , function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(28)
            , createDesc = __webpack_require__(34);
        module.exports = __webpack_require__(23) ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
        }
            : function(object, key, value) {
            object[key] = value;
            return object;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(29)
            , IE8_DOM_DEFINE = __webpack_require__(31)
            , toPrimitive = __webpack_require__(33)
            , dP = Object.defineProperty;
        exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE)
                try {
                    return dP(O, P, Attributes);
                } catch (e) {}
            if ('get'in Attributes || 'set'in Attributes)
                throw TypeError('Accessors not supported!');
            if ('value'in Attributes)
                O[P] = Attributes.value;
            return O;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30);
        module.exports = function(it) {
            if (!isObject(it))
                throw TypeError(it + ' is not an object!');
            return it;
        }
        ;
    }
    , function(module, exports) {
        module.exports = function(it) {
            return typeof it === 'object' ? it !== null : typeof it === 'function';
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        module.exports = !__webpack_require__(23) && !__webpack_require__(24)(function() {
                return Object.defineProperty(__webpack_require__(32)('div'), 'a', {
                        get: function() {
                            return 7;
                        }
                    }).a != 7;
            });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , document = __webpack_require__(21).document
            , is = isObject(document) && isObject(document.createElement);
        module.exports = function(it) {
            return is ? document.createElement(it) : {};
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30);
        module.exports = function(it, S) {
            if (!isObject(it))
                return it;
            var fn, val;
            if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))
                return val;
            if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))
                return val;
            if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))
                return val;
            throw TypeError("Can't convert object to primitive value");
        }
        ;
    }
    , function(module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(bitmap & 1),
                configurable: !(bitmap & 2),
                writable: !(bitmap & 4),
                value: value
            };
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var global = __webpack_require__(21)
            , hide = __webpack_require__(27)
            , has = __webpack_require__(22)
            , SRC = __webpack_require__(36)('src')
            , TO_STRING = 'toString'
            , $toString = Function[TO_STRING]
            , TPL = ('' + $toString).split(TO_STRING);
        __webpack_require__(26).inspectSource = function(it) {
            return $toString.call(it);
        }
        ;
        (module.exports = function(O, key, val, safe) {
                var isFunction = typeof val == 'function';
                if (isFunction)
                    has(val, 'name') || hide(val, 'name', key);
                if (O[key] === val)
                    return;
                if (isFunction)
                    has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
                if (O === global) {
                    O[key] = val;
                } else {
                    if (!safe) {
                        delete O[key];
                        hide(O, key, val);
                    } else {
                        if (O[key])
                            O[key] = val;
                        else
                            hide(O, key, val);
                    }
                }
            }
        )(Function.prototype, TO_STRING, function toString() {
            return typeof this == 'function' && this[SRC] || $toString.call(this);
        });
    }
    , function(module, exports) {
        var id = 0
            , px = Math.random();
        module.exports = function(key) {
            return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var aFunction = __webpack_require__(38);
        module.exports = function(fn, that, length) {
            aFunction(fn);
            if (that === undefined)
                return fn;
            switch (length) {
                case 1:
                    return function(a) {
                        return fn.call(that, a);
                    }
                        ;
                case 2:
                    return function(a, b) {
                        return fn.call(that, a, b);
                    }
                        ;
                case 3:
                    return function(a, b, c) {
                        return fn.call(that, a, b, c);
                    }
                        ;
            }
            return function() {
                return fn.apply(that, arguments);
            }
                ;
        }
        ;
    }
    , function(module, exports) {
        module.exports = function(it) {
            if (typeof it != 'function')
                throw TypeError(it + ' is not a function!');
            return it;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var META = __webpack_require__(36)('meta')
            , isObject = __webpack_require__(30)
            , has = __webpack_require__(22)
            , setDesc = __webpack_require__(28).f
            , id = 0;
        var isExtensible = Object.isExtensible || function() {
                    return true;
                }
            ;
        var FREEZE = !__webpack_require__(24)(function() {
            return isExtensible(Object.preventExtensions({}));
        });
        var setMeta = function(it) {
                setDesc(it, META, {
                    value: {
                        i: 'O' + ++id,
                        w: {}
                    }
                });
            }
            ;
        var fastKey = function(it, create) {
                if (!isObject(it))
                    return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
                if (!has(it, META)) {
                    if (!isExtensible(it))
                        return 'F';
                    if (!create)
                        return 'E';
                    setMeta(it);
                }
                return it[META].i;
            }
            ;
        var getWeak = function(it, create) {
                if (!has(it, META)) {
                    if (!isExtensible(it))
                        return true;
                    if (!create)
                        return false;
                    setMeta(it);
                }
                return it[META].w;
            }
            ;
        var onFreeze = function(it) {
                if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META))
                    setMeta(it);
                return it;
            }
            ;
        var meta = module.exports = {
            KEY: META,
            NEED: false,
            fastKey: fastKey,
            getWeak: getWeak,
            onFreeze: onFreeze
        };
    }
    , function(module, exports, __webpack_require__) {
        var global = __webpack_require__(21)
            , SHARED = '__core-js_shared__'
            , store = global[SHARED] || (global[SHARED] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {});
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var def = __webpack_require__(28).f
            , has = __webpack_require__(22)
            , TAG = __webpack_require__(42)('toStringTag');
        module.exports = function(it, tag, stat) {
            if (it && !has(it = stat ? it : it.prototype, TAG))
                def(it, TAG, {
                    configurable: true,
                    value: tag
                });
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var store = __webpack_require__(40)('wks')
            , uid = __webpack_require__(36)
            , Symbol = __webpack_require__(21).Symbol
            , USE_SYMBOL = typeof Symbol == 'function';
        var $exports = module.exports = function(name) {
                return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
            }
            ;
        $exports.store = store;
    }
    , function(module, exports, __webpack_require__) {
        exports.f = __webpack_require__(42);
    }
    , function(module, exports, __webpack_require__) {
        var global = __webpack_require__(21)
            , core = __webpack_require__(26)
            , LIBRARY = __webpack_require__(45)
            , wksExt = __webpack_require__(43)
            , defineProperty = __webpack_require__(28).f;
        module.exports = function(name) {
            var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
            if (name.charAt(0) != '_' && !(name in $Symbol))
                defineProperty($Symbol, name, {
                    value: wksExt.f(name)
                });
        }
        ;
    }
    , function(module, exports) {
        module.exports = false;
    }
    , function(module, exports, __webpack_require__) {
        var getKeys = __webpack_require__(47)
            , toIObject = __webpack_require__(49);
        module.exports = function(object, el) {
            var O = toIObject(object), keys = getKeys(O), length = keys.length, index = 0, key;
            while (length > index)
                if (O[key = keys[index++]] === el)
                    return key;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $keys = __webpack_require__(48)
            , enumBugKeys = __webpack_require__(58);
        module.exports = Object.keys || function keys(O) {
                return $keys(O, enumBugKeys);
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var has = __webpack_require__(22)
            , toIObject = __webpack_require__(49)
            , arrayIndexOf = __webpack_require__(53)(false)
            , IE_PROTO = __webpack_require__(57)('IE_PROTO');
        module.exports = function(object, names) {
            var O = toIObject(object), i = 0, result = [], key;
            for (key in O)
                if (key != IE_PROTO)
                    has(O, key) && result.push(key);
            while (names.length > i)
                if (has(O, key = names[i++])) {
                    ~arrayIndexOf(result, key) || result.push(key);
                }
            return result;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var IObject = __webpack_require__(50)
            , defined = __webpack_require__(52);
        module.exports = function(it) {
            return IObject(defined(it));
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var cof = __webpack_require__(51);
        module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
            return cof(it) == 'String' ? it.split('') : Object(it);
        }
        ;
    }
    , function(module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1);
        }
        ;
    }
    , function(module, exports) {
        module.exports = function(it) {
            if (it == undefined)
                throw TypeError("Can't call method on  " + it);
            return it;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var toIObject = __webpack_require__(49)
            , toLength = __webpack_require__(54)
            , toIndex = __webpack_require__(56);
        module.exports = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
                var O = toIObject($this), length = toLength(O.length), index = toIndex(fromIndex, length), value;
                if (IS_INCLUDES && el != el)
                    while (length > index) {
                        value = O[index++];
                        if (value != value)
                            return true;
                    }
                else
                    for (; length > index; index++)
                        if (IS_INCLUDES || index in O) {
                            if (O[index] === el)
                                return IS_INCLUDES || index || 0;
                        }
                return !IS_INCLUDES && -1;
            }
                ;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(55)
            , min = Math.min;
        module.exports = function(it) {
            return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
        }
        ;
    }
    , function(module, exports) {
        var ceil = Math.ceil
            , floor = Math.floor;
        module.exports = function(it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(55)
            , max = Math.max
            , min = Math.min;
        module.exports = function(index, length) {
            index = toInteger(index);
            return index < 0 ? max(index + length, 0) : min(index, length);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(40)('keys')
            , uid = __webpack_require__(36);
        module.exports = function(key) {
            return shared[key] || (shared[key] = uid(key));
        }
        ;
    }
    , function(module, exports) {
        module.exports = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf').split(',');
    }
    , function(module, exports, __webpack_require__) {
        var getKeys = __webpack_require__(47)
            , gOPS = __webpack_require__(60)
            , pIE = __webpack_require__(61);
        module.exports = function(it) {
            var result = getKeys(it)
                , getSymbols = gOPS.f;
            if (getSymbols) {
                var symbols = getSymbols(it), isEnum = pIE.f, i = 0, key;
                while (symbols.length > i)
                    if (isEnum.call(it, key = symbols[i++]))
                        result.push(key);
            }
            return result;
        }
        ;
    }
    , function(module, exports) {
        exports.f = Object.getOwnPropertySymbols;
    }
    , function(module, exports) {
        exports.f = {}.propertyIsEnumerable;
    }
    , function(module, exports, __webpack_require__) {
        var cof = __webpack_require__(51);
        module.exports = Array.isArray || function isArray(arg) {
                return cof(arg) == 'Array';
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(29)
            , dPs = __webpack_require__(64)
            , enumBugKeys = __webpack_require__(58)
            , IE_PROTO = __webpack_require__(57)('IE_PROTO')
            , Empty = function() {}
            , PROTOTYPE = 'prototype';
        var createDict = function() {
                var iframe = __webpack_require__(32)('iframe'), i = enumBugKeys.length, lt = '<', gt = '>', iframeDocument;
                iframe.style.display = 'none';
                __webpack_require__(65).appendChild(iframe);
                iframe.src = 'javascript:';
                iframeDocument = iframe.contentWindow.document;
                iframeDocument.open();
                iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
                iframeDocument.close();
                createDict = iframeDocument.F;
                while (i--)
                    delete createDict[PROTOTYPE][enumBugKeys[i]];
                return createDict();
            }
            ;
        module.exports = Object.create || function create(O, Properties) {
                var result;
                if (O !== null ) {
                    Empty[PROTOTYPE] = anObject(O);
                    result = new Empty;
                    Empty[PROTOTYPE] = null ;
                    result[IE_PROTO] = O;
                } else
                    result = createDict();
                return Properties === undefined ? result : dPs(result, Properties);
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(28)
            , anObject = __webpack_require__(29)
            , getKeys = __webpack_require__(47);
        module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties) {
            anObject(O);
            var keys = getKeys(Properties), length = keys.length, i = 0, P;
            while (length > i)
                dP.f(O, P = keys[i++], Properties[P]);
            return O;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(21).document && document.documentElement;
    }
    , function(module, exports, __webpack_require__) {
        var toIObject = __webpack_require__(49)
            , gOPN = __webpack_require__(67).f
            , toString = {}.toString;
        var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        var getWindowNames = function(it) {
                try {
                    return gOPN(it);
                } catch (e) {
                    return windowNames.slice();
                }
            }
            ;
        module.exports.f = function getOwnPropertyNames(it) {
            return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $keys = __webpack_require__(48)
            , hiddenKeys = __webpack_require__(58).concat('length', 'prototype');
        exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
                return $keys(O, hiddenKeys);
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var pIE = __webpack_require__(61)
            , createDesc = __webpack_require__(34)
            , toIObject = __webpack_require__(49)
            , toPrimitive = __webpack_require__(33)
            , has = __webpack_require__(22)
            , IE8_DOM_DEFINE = __webpack_require__(31)
            , gOPD = Object.getOwnPropertyDescriptor;
        exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P) {
            O = toIObject(O);
            P = toPrimitive(P, true);
            if (IE8_DOM_DEFINE)
                try {
                    return gOPD(O, P);
                } catch (e) {}
            if (has(O, P))
                return createDesc(!pIE.f.call(O, P), O[P]);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
        $export($export.S, 'Object', {
            create: __webpack_require__(63)
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S + $export.F * !__webpack_require__(23), 'Object', {
            defineProperty: __webpack_require__(28).f
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S + $export.F * !__webpack_require__(23), 'Object', {
            defineProperties: __webpack_require__(64)
        });
    }
    , function(module, exports, __webpack_require__) {
        var toIObject = __webpack_require__(49)
            , $getOwnPropertyDescriptor = __webpack_require__(68).f;
        __webpack_require__(73)('getOwnPropertyDescriptor', function() {
            return function getOwnPropertyDescriptor(it, key) {
                return $getOwnPropertyDescriptor(toIObject(it), key);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , core = __webpack_require__(26)
            , fails = __webpack_require__(24);
        module.exports = function(KEY, exec) {
            var fn = (core.Object || {})[KEY] || Object[KEY]
                , exp = {};
            exp[KEY] = exec(fn);
            $export($export.S + $export.F * fails(function() {
                    fn(1);
                }), 'Object', exp);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var toObject = __webpack_require__(75)
            , $getPrototypeOf = __webpack_require__(76);
        __webpack_require__(73)('getPrototypeOf', function() {
            return function getPrototypeOf(it) {
                return $getPrototypeOf(toObject(it));
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var defined = __webpack_require__(52);
        module.exports = function(it) {
            return Object(defined(it));
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var has = __webpack_require__(22)
            , toObject = __webpack_require__(75)
            , IE_PROTO = __webpack_require__(57)('IE_PROTO')
            , ObjectProto = Object.prototype;
        module.exports = Object.getPrototypeOf || function(O) {
                O = toObject(O);
                if (has(O, IE_PROTO))
                    return O[IE_PROTO];
                if (typeof O.constructor == 'function' && O instanceof O.constructor) {
                    return O.constructor.prototype;
                }
                return O instanceof Object ? ObjectProto : null ;
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var toObject = __webpack_require__(75)
            , $keys = __webpack_require__(47);
        __webpack_require__(73)('keys', function() {
            return function keys(it) {
                return $keys(toObject(it));
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(73)('getOwnPropertyNames', function() {
            return __webpack_require__(66).f;
        });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , meta = __webpack_require__(39).onFreeze;
        __webpack_require__(73)('freeze', function($freeze) {
            return function freeze(it) {
                return $freeze && isObject(it) ? $freeze(meta(it)) : it;
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , meta = __webpack_require__(39).onFreeze;
        __webpack_require__(73)('seal', function($seal) {
            return function seal(it) {
                return $seal && isObject(it) ? $seal(meta(it)) : it;
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , meta = __webpack_require__(39).onFreeze;
        __webpack_require__(73)('preventExtensions', function($preventExtensions) {
            return function preventExtensions(it) {
                return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30);
        __webpack_require__(73)('isFrozen', function($isFrozen) {
            return function isFrozen(it) {
                return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30);
        __webpack_require__(73)('isSealed', function($isSealed) {
            return function isSealed(it) {
                return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30);
        __webpack_require__(73)('isExtensible', function($isExtensible) {
            return function isExtensible(it) {
                return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S + $export.F, 'Object', {
            assign: __webpack_require__(86)
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var getKeys = __webpack_require__(47)
            , gOPS = __webpack_require__(60)
            , pIE = __webpack_require__(61)
            , toObject = __webpack_require__(75)
            , IObject = __webpack_require__(50)
            , $assign = Object.assign;
        module.exports = !$assign || __webpack_require__(24)(function() {
            var A = {}
                , B = {}
                , S = Symbol()
                , K = 'abcdefghijklmnopqrst';
            A[S] = 7;
            K.split('').forEach(function(k) {
                B[k] = k;
            });
            return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
        }) ? function assign(target, source) {
            var T = toObject(target)
                , aLen = arguments.length
                , index = 1
                , getSymbols = gOPS.f
                , isEnum = pIE.f;
            while (aLen > index) {
                var S = IObject(arguments[index++]), keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S), length = keys.length, j = 0, key;
                while (length > j)
                    if (isEnum.call(S, key = keys[j++]))
                        T[key] = S[key];
            }
            return T;
        }
            : $assign;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Object', {
            is: __webpack_require__(88)
        });
    }
    , function(module, exports) {
        module.exports = Object.is || function is(x, y) {
                return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Object', {
            setPrototypeOf: __webpack_require__(90).set
        });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , anObject = __webpack_require__(29);
        var check = function(O, proto) {
                anObject(O);
                if (!isObject(proto) && proto !== null )
                    throw TypeError(proto + ": can't set as prototype!");
            }
            ;
        module.exports = {
            set: Object.setPrototypeOf || ('__proto__'in {} ? function(test, buggy, set) {
                try {
                    set = __webpack_require__(37)(Function.call, __webpack_require__(68).f(Object.prototype, '__proto__').set, 2);
                    set(test, []);
                    buggy = !(test instanceof Array);
                } catch (e) {
                    buggy = true;
                }
                return function setPrototypeOf(O, proto) {
                    check(O, proto);
                    if (buggy)
                        O.__proto__ = proto;
                    else
                        set(O, proto);
                    return O;
                }
                    ;
            }({}, false) : undefined),
            check: check
        };
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var classof = __webpack_require__(92)
            , test = {};
        test[__webpack_require__(42)('toStringTag')] = 'z';
        if (test + '' != '[object z]') {
            __webpack_require__(35)(Object.prototype, 'toString', function toString() {
                return '[object ' + classof(this) + ']';
            }, true);
        }
    }
    , function(module, exports, __webpack_require__) {
        var cof = __webpack_require__(51)
            , TAG = __webpack_require__(42)('toStringTag')
            , ARG = cof(function() {
                return arguments;
            }()) == 'Arguments';
        var tryGet = function(it, key) {
                try {
                    return it[key];
                } catch (e) {}
            }
            ;
        module.exports = function(it) {
            var O, T, B;
            return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.P, 'Function', {
            bind: __webpack_require__(94)
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var aFunction = __webpack_require__(38)
            , isObject = __webpack_require__(30)
            , invoke = __webpack_require__(95)
            , arraySlice = [].slice
            , factories = {};
        var construct = function(F, len, args) {
                if (!(len in factories)) {
                    for (var n = [], i = 0; i < len; i++)
                        n[i] = 'a[' + i + ']';
                    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
                }
                return factories[len](F, args);
            }
            ;
        module.exports = Function.bind || function bind(that) {
                var fn = aFunction(this)
                    , partArgs = arraySlice.call(arguments, 1);
                var bound = function() {
                        var args = partArgs.concat(arraySlice.call(arguments));
                        return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
                    }
                    ;
                if (isObject(fn.prototype))
                    bound.prototype = fn.prototype;
                return bound;
            }
        ;
    }
    , function(module, exports) {
        module.exports = function(fn, args, that) {
            var un = that === undefined;
            switch (args.length) {
                case 0:
                    return un ? fn() : fn.call(that);
                case 1:
                    return un ? fn(args[0]) : fn.call(that, args[0]);
                case 2:
                    return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                case 3:
                    return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                case 4:
                    return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
            }
            return fn.apply(that, args);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(28).f
            , createDesc = __webpack_require__(34)
            , has = __webpack_require__(22)
            , FProto = Function.prototype
            , nameRE = /^\s*function ([^ (]*)/
            , NAME = 'name';
        var isExtensible = Object.isExtensible || function() {
                    return true;
                }
            ;
        NAME in FProto || __webpack_require__(23) && dP(FProto, NAME, {
            configurable: true,
            get: function() {
                try {
                    var that = this
                        , name = ('' + that).match(nameRE)[1];
                    has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
                    return name;
                } catch (e) {
                    return '';
                }
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var isObject = __webpack_require__(30)
            , getPrototypeOf = __webpack_require__(76)
            , HAS_INSTANCE = __webpack_require__(42)('hasInstance')
            , FunctionProto = Function.prototype;
        if (!(HAS_INSTANCE in FunctionProto))
            __webpack_require__(28).f(FunctionProto, HAS_INSTANCE, {
                value: function(O) {
                    if (typeof this != 'function' || !isObject(O))
                        return false;
                    if (!isObject(this.prototype))
                        return O instanceof this;
                    while (O = getPrototypeOf(O))
                        if (this.prototype === O)
                            return true;
                    return false;
                }
            });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $parseInt = __webpack_require__(99);
        $export($export.G + $export.F * (parseInt != $parseInt), {
            parseInt: $parseInt
        });
    }
    , function(module, exports, __webpack_require__) {
        var $parseInt = __webpack_require__(21).parseInt
            , $trim = __webpack_require__(100).trim
            , ws = __webpack_require__(101)
            , hex = /^[\-+]?0[xX]/;
        module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
            var string = $trim(String(str), 3);
            return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
        }
            : $parseInt;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , defined = __webpack_require__(52)
            , fails = __webpack_require__(24)
            , spaces = __webpack_require__(101)
            , space = '[' + spaces + ']'
            , non = '\u200b\u0085'
            , ltrim = RegExp('^' + space + space + '*')
            , rtrim = RegExp(space + space + '*$');
        var exporter = function(KEY, exec, ALIAS) {
                var exp = {};
                var FORCE = fails(function() {
                    return !!spaces[KEY]() || non[KEY]() != non;
                });
                var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
                if (ALIAS)
                    exp[ALIAS] = fn;
                $export($export.P + $export.F * FORCE, 'String', exp);
            }
            ;
        var trim = exporter.trim = function(string, TYPE) {
                string = String(defined(string));
                if (TYPE & 1)
                    string = string.replace(ltrim, '');
                if (TYPE & 2)
                    string = string.replace(rtrim, '');
                return string;
            }
            ;
        module.exports = exporter;
    }
    , function(module, exports) {
        module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $parseFloat = __webpack_require__(103);
        $export($export.G + $export.F * (parseFloat != $parseFloat), {
            parseFloat: $parseFloat
        });
    }
    , function(module, exports, __webpack_require__) {
        var $parseFloat = __webpack_require__(21).parseFloat
            , $trim = __webpack_require__(100).trim;
        module.exports = 1 / $parseFloat(__webpack_require__(101) + '-0') !== -Infinity ? function parseFloat(str) {
            var string = $trim(String(str), 3)
                , result = $parseFloat(string);
            return result === 0 && string.charAt(0) == '-' ? -0 : result;
        }
            : $parseFloat;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var global = __webpack_require__(21)
            , has = __webpack_require__(22)
            , cof = __webpack_require__(51)
            , inheritIfRequired = __webpack_require__(105)
            , toPrimitive = __webpack_require__(33)
            , fails = __webpack_require__(24)
            , gOPN = __webpack_require__(67).f
            , gOPD = __webpack_require__(68).f
            , dP = __webpack_require__(28).f
            , $trim = __webpack_require__(100).trim
            , NUMBER = 'Number'
            , $Number = global[NUMBER]
            , Base = $Number
            , proto = $Number.prototype
            , BROKEN_COF = cof(__webpack_require__(63)(proto)) == NUMBER
            , TRIM = 'trim'in String.prototype;
        var toNumber = function(argument) {
                var it = toPrimitive(argument, false);
                if (typeof it == 'string' && it.length > 2) {
                    it = TRIM ? it.trim() : $trim(it, 3);
                    var first = it.charCodeAt(0), third, radix, maxCode;
                    if (first === 43 || first === 45) {
                        third = it.charCodeAt(2);
                        if (third === 88 || third === 120)
                            return NaN;
                    } else if (first === 48) {
                        switch (it.charCodeAt(1)) {
                            case 66:
                            case 98:
                                radix = 2;
                                maxCode = 49;
                                break;
                            case 79:
                            case 111:
                                radix = 8;
                                maxCode = 55;
                                break;
                            default:
                                return +it;
                        }
                        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
                            code = digits.charCodeAt(i);
                            if (code < 48 || code > maxCode)
                                return NaN;
                        }
                        return parseInt(digits, radix);
                    }
                }
                return +it;
            }
            ;
        if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
            $Number = function Number(value) {
                var it = arguments.length < 1 ? 0 : value
                    , that = this;
                return that instanceof $Number && (BROKEN_COF ? fails(function() {
                    proto.valueOf.call(that);
                }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
            }
            ;
            for (var keys = __webpack_require__(23) ? gOPN(Base) : ('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + 'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
                if (has(Base, key = keys[j]) && !has($Number, key)) {
                    dP($Number, key, gOPD(Base, key));
                }
            }
            $Number.prototype = proto;
            proto.constructor = $Number;
            __webpack_require__(35)(global, NUMBER, $Number);
        }
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , setPrototypeOf = __webpack_require__(90).set;
        module.exports = function(that, target, C) {
            var P, S = target.constructor;
            if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
                setPrototypeOf(that, P);
            }
            return that;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toInteger = __webpack_require__(55)
            , aNumberValue = __webpack_require__(107)
            , repeat = __webpack_require__(108)
            , $toFixed = 1..toFixed
            , floor = Math.floor
            , data = [0, 0, 0, 0, 0, 0]
            , ERROR = 'Number.toFixed: incorrect invocation!'
            , ZERO = '0';
        var multiply = function(n, c) {
                var i = -1
                    , c2 = c;
                while (++i < 6) {
                    c2 += n * data[i];
                    data[i] = c2 % 1e7;
                    c2 = floor(c2 / 1e7);
                }
            }
            ;
        var divide = function(n) {
                var i = 6
                    , c = 0;
                while (--i >= 0) {
                    c += data[i];
                    data[i] = floor(c / n);
                    c = (c % n) * 1e7;
                }
            }
            ;
        var numToString = function() {
                var i = 6
                    , s = '';
                while (--i >= 0) {
                    if (s !== '' || i === 0 || data[i] !== 0) {
                        var t = String(data[i]);
                        s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
                    }
                }
                return s;
            }
            ;
        var pow = function(x, n, acc) {
                return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
            }
            ;
        var log = function(x) {
                var n = 0
                    , x2 = x;
                while (x2 >= 4096) {
                    n += 12;
                    x2 /= 4096;
                }
                while (x2 >= 2) {
                    n += 1;
                    x2 /= 2;
                }
                return n;
            }
            ;
        $export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128..toFixed(0) !== '1000000000000000128') || !__webpack_require__(24)(function() {
                $toFixed.call({});
            })), 'Number', {
            toFixed: function toFixed(fractionDigits) {
                var x = aNumberValue(this, ERROR), f = toInteger(fractionDigits), s = '', m = ZERO, e, z, j, k;
                if (f < 0 || f > 20)
                    throw RangeError(ERROR);
                if (x != x)
                    return 'NaN';
                if (x <= -1e21 || x >= 1e21)
                    return String(x);
                if (x < 0) {
                    s = '-';
                    x = -x;
                }
                if (x > 1e-21) {
                    e = log(x * pow(2, 69, 1)) - 69;
                    z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
                    z *= 0x10000000000000;
                    e = 52 - e;
                    if (e > 0) {
                        multiply(0, z);
                        j = f;
                        while (j >= 7) {
                            multiply(1e7, 0);
                            j -= 7;
                        }
                        multiply(pow(10, j, 1), 0);
                        j = e - 1;
                        while (j >= 23) {
                            divide(1 << 23);
                            j -= 23;
                        }
                        divide(1 << j);
                        multiply(1, 1);
                        divide(2);
                        m = numToString();
                    } else {
                        multiply(0, z);
                        multiply(1 << -e, 0);
                        m = numToString() + repeat.call(ZERO, f);
                    }
                }
                if (f > 0) {
                    k = m.length;
                    m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
                } else {
                    m = s + m;
                }
                return m;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var cof = __webpack_require__(51);
        module.exports = function(it, msg) {
            if (typeof it != 'number' && cof(it) != 'Number')
                throw TypeError(msg);
            return +it;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var toInteger = __webpack_require__(55)
            , defined = __webpack_require__(52);
        module.exports = function repeat(count) {
            var str = String(defined(this))
                , res = ''
                , n = toInteger(count);
            if (n < 0 || n == Infinity)
                throw RangeError("Count can't be negative");
            for (; n > 0; (n >>>= 1) && (str += str))
                if (n & 1)
                    res += str;
            return res;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $fails = __webpack_require__(24)
            , aNumberValue = __webpack_require__(107)
            , $toPrecision = 1..toPrecision;
        $export($export.P + $export.F * ($fails(function() {
                return $toPrecision.call(1, undefined) !== '1';
            }) || !$fails(function() {
                $toPrecision.call({});
            })), 'Number', {
            toPrecision: function toPrecision(precision) {
                var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
                return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Number', {
            EPSILON: Math.pow(2, -52)
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , _isFinite = __webpack_require__(21).isFinite;
        $export($export.S, 'Number', {
            isFinite: function isFinite(it) {
                return typeof it == 'number' && _isFinite(it);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Number', {
            isInteger: __webpack_require__(113)
        });
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , floor = Math.floor;
        module.exports = function isInteger(it) {
            return !isObject(it) && isFinite(it) && floor(it) === it;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Number', {
            isNaN: function isNaN(number) {
                return number != number;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , isInteger = __webpack_require__(113)
            , abs = Math.abs;
        $export($export.S, 'Number', {
            isSafeInteger: function isSafeInteger(number) {
                return isInteger(number) && abs(number) <= 0x1fffffffffffff;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Number', {
            MAX_SAFE_INTEGER: 0x1fffffffffffff
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Number', {
            MIN_SAFE_INTEGER: -0x1fffffffffffff
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $parseFloat = __webpack_require__(103);
        $export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {
            parseFloat: $parseFloat
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $parseInt = __webpack_require__(99);
        $export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {
            parseInt: $parseInt
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , log1p = __webpack_require__(121)
            , sqrt = Math.sqrt
            , $acosh = Math.acosh;
        $export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710 && $acosh(Infinity) == Infinity), 'Math', {
            acosh: function acosh(x) {
                return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
            }
        });
    }
    , function(module, exports) {
        module.exports = Math.log1p || function log1p(x) {
                return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $asinh = Math.asinh;
        function asinh(x) {
            return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
        }
        $export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {
            asinh: asinh
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $atanh = Math.atanh;
        $export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
            atanh: function atanh(x) {
                return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , sign = __webpack_require__(125);
        $export($export.S, 'Math', {
            cbrt: function cbrt(x) {
                return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
            }
        });
    }
    , function(module, exports) {
        module.exports = Math.sign || function sign(x) {
                return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            clz32: function clz32(x) {
                return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , exp = Math.exp;
        $export($export.S, 'Math', {
            cosh: function cosh(x) {
                return (exp(x = +x) + exp(-x)) / 2;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $expm1 = __webpack_require__(129);
        $export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {
            expm1: $expm1
        });
    }
    , function(module, exports) {
        var $expm1 = Math.expm1;
        module.exports = (!$expm1 || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 || $expm1(-2e-17) != -2e-17) ? function expm1(x) {
            return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
        }
            : $expm1;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , sign = __webpack_require__(125)
            , pow = Math.pow
            , EPSILON = pow(2, -52)
            , EPSILON32 = pow(2, -23)
            , MAX32 = pow(2, 127) * (2 - EPSILON32)
            , MIN32 = pow(2, -126);
        var roundTiesToEven = function(n) {
                return n + 1 / EPSILON - 1 / EPSILON;
            }
            ;
        $export($export.S, 'Math', {
            fround: function fround(x) {
                var $abs = Math.abs(x), $sign = sign(x), a, result;
                if ($abs < MIN32)
                    return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
                a = (1 + EPSILON32 / EPSILON) * $abs;
                result = a - (a - $abs);
                if (result > MAX32 || result != result)
                    return $sign * Infinity;
                return $sign * result;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , abs = Math.abs;
        $export($export.S, 'Math', {
            hypot: function hypot(value1, value2) {
                var sum = 0, i = 0, aLen = arguments.length, larg = 0, arg, div;
                while (i < aLen) {
                    arg = abs(arguments[i++]);
                    if (larg < arg) {
                        div = larg / arg;
                        sum = sum * div * div + 1;
                        larg = arg;
                    } else if (arg > 0) {
                        div = arg / larg;
                        sum += div * div;
                    } else
                        sum += arg;
                }
                return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $imul = Math.imul;
        $export($export.S + $export.F * __webpack_require__(24)(function() {
                return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
            }), 'Math', {
            imul: function imul(x, y) {
                var UINT16 = 0xffff
                    , xn = +x
                    , yn = +y
                    , xl = UINT16 & xn
                    , yl = UINT16 & yn;
                return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            log10: function log10(x) {
                return Math.log(x) / Math.LN10;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            log1p: __webpack_require__(121)
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            log2: function log2(x) {
                return Math.log(x) / Math.LN2;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            sign: __webpack_require__(125)
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , expm1 = __webpack_require__(129)
            , exp = Math.exp;
        $export($export.S + $export.F * __webpack_require__(24)(function() {
                return !Math.sinh(-2e-17) != -2e-17;
            }), 'Math', {
            sinh: function sinh(x) {
                return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , expm1 = __webpack_require__(129)
            , exp = Math.exp;
        $export($export.S, 'Math', {
            tanh: function tanh(x) {
                var a = expm1(x = +x)
                    , b = expm1(-x);
                return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            trunc: function trunc(it) {
                return (it > 0 ? Math.floor : Math.ceil)(it);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , toIndex = __webpack_require__(56)
            , fromCharCode = String.fromCharCode
            , $fromCodePoint = String.fromCodePoint;
        $export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
            fromCodePoint: function fromCodePoint(x) {
                var res = [], aLen = arguments.length, i = 0, code;
                while (aLen > i) {
                    code = +arguments[i++];
                    if (toIndex(code, 0x10ffff) !== code)
                        throw RangeError(code + ' is not a valid code point');
                    res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
                }
                return res.join('');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , toIObject = __webpack_require__(49)
            , toLength = __webpack_require__(54);
        $export($export.S, 'String', {
            raw: function raw(callSite) {
                var tpl = toIObject(callSite.raw)
                    , len = toLength(tpl.length)
                    , aLen = arguments.length
                    , res = []
                    , i = 0;
                while (len > i) {
                    res.push(String(tpl[i++]));
                    if (i < aLen)
                        res.push(String(arguments[i]));
                }
                return res.join('');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(100)('trim', function($trim) {
            return function trim() {
                return $trim(this, 3);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $at = __webpack_require__(144)(true);
        __webpack_require__(145)(String, 'String', function(iterated) {
            this._t = String(iterated);
            this._i = 0;
        }, function() {
            var O = this._t, index = this._i, point;
            if (index >= O.length)
                return {
                    value: undefined,
                    done: true
                };
            point = $at(O, index);
            this._i += point.length;
            return {
                value: point,
                done: false
            };
        });
    }
    , function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(55)
            , defined = __webpack_require__(52);
        module.exports = function(TO_STRING) {
            return function(that, pos) {
                var s = String(defined(that)), i = toInteger(pos), l = s.length, a, b;
                if (i < 0 || i >= l)
                    return TO_STRING ? '' : undefined;
                a = s.charCodeAt(i);
                return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
            }
                ;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var LIBRARY = __webpack_require__(45)
            , $export = __webpack_require__(25)
            , redefine = __webpack_require__(35)
            , hide = __webpack_require__(27)
            , has = __webpack_require__(22)
            , Iterators = __webpack_require__(146)
            , $iterCreate = __webpack_require__(147)
            , setToStringTag = __webpack_require__(41)
            , getPrototypeOf = __webpack_require__(76)
            , ITERATOR = __webpack_require__(42)('iterator')
            , BUGGY = !([].keys && 'next'in [].keys())
            , FF_ITERATOR = '@@iterator'
            , KEYS = 'keys'
            , VALUES = 'values';
        var returnThis = function() {
                return this;
            }
            ;
        module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var getMethod = function(kind) {
                    if (!BUGGY && kind in proto)
                        return proto[kind];
                    switch (kind) {
                        case KEYS:
                            return function keys() {
                                return new Constructor(this,kind);
                            }
                                ;
                        case VALUES:
                            return function values() {
                                return new Constructor(this,kind);
                            }
                                ;
                    }
                    return function entries() {
                        return new Constructor(this,kind);
                    }
                        ;
                }
                ;
            var TAG = NAME + ' Iterator', DEF_VALUES = DEFAULT == VALUES, VALUES_BUG = false, proto = Base.prototype, $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined, $anyNative = NAME == 'Array' ? proto.entries || $native : $native, methods, key, IteratorPrototype;
            if ($anyNative) {
                IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
                if (IteratorPrototype !== Object.prototype) {
                    setToStringTag(IteratorPrototype, TAG, true);
                    if (!LIBRARY && !has(IteratorPrototype, ITERATOR))
                        hide(IteratorPrototype, ITERATOR, returnThis);
                }
            }
            if (DEF_VALUES && $native && $native.name !== VALUES) {
                VALUES_BUG = true;
                $default = function values() {
                    return $native.call(this);
                }
                ;
            }
            if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
                hide(proto, ITERATOR, $default);
            }
            Iterators[NAME] = $default;
            Iterators[TAG] = returnThis;
            if (DEFAULT) {
                methods = {
                    values: DEF_VALUES ? $default : getMethod(VALUES),
                    keys: IS_SET ? $default : getMethod(KEYS),
                    entries: $entries
                };
                if (FORCED)
                    for (key in methods) {
                        if (!(key in proto))
                            redefine(proto, key, methods[key]);
                    }
                else
                    $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            }
            return methods;
        }
        ;
    }
    , function(module, exports) {
        module.exports = {};
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var create = __webpack_require__(63)
            , descriptor = __webpack_require__(34)
            , setToStringTag = __webpack_require__(41)
            , IteratorPrototype = {};
        __webpack_require__(27)(IteratorPrototype, __webpack_require__(42)('iterator'), function() {
            return this;
        });
        module.exports = function(Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, {
                next: descriptor(1, next)
            });
            setToStringTag(Constructor, NAME + ' Iterator');
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $at = __webpack_require__(144)(false);
        $export($export.P, 'String', {
            codePointAt: function codePointAt(pos) {
                return $at(this, pos);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toLength = __webpack_require__(54)
            , context = __webpack_require__(150)
            , ENDS_WITH = 'endsWith'
            , $endsWith = ''[ENDS_WITH];
        $export($export.P + $export.F * __webpack_require__(152)(ENDS_WITH), 'String', {
            endsWith: function endsWith(searchString) {
                var that = context(this, searchString, ENDS_WITH)
                    , endPosition = arguments.length > 1 ? arguments[1] : undefined
                    , len = toLength(that.length)
                    , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
                    , search = String(searchString);
                return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var isRegExp = __webpack_require__(151)
            , defined = __webpack_require__(52);
        module.exports = function(that, searchString, NAME) {
            if (isRegExp(searchString))
                throw TypeError('String#' + NAME + " doesn't accept regex!");
            return String(defined(that));
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , cof = __webpack_require__(51)
            , MATCH = __webpack_require__(42)('match');
        module.exports = function(it) {
            var isRegExp;
            return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var MATCH = __webpack_require__(42)('match');
        module.exports = function(KEY) {
            var re = /./;
            try {
                '/./'[KEY](re);
            } catch (e) {
                try {
                    re[MATCH] = false;
                    return !'/./'[KEY](re);
                } catch (f) {}
            }
            return true;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , context = __webpack_require__(150)
            , INCLUDES = 'includes';
        $export($export.P + $export.F * __webpack_require__(152)(INCLUDES), 'String', {
            includes: function includes(searchString) {
                return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.P, 'String', {
            repeat: __webpack_require__(108)
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toLength = __webpack_require__(54)
            , context = __webpack_require__(150)
            , STARTS_WITH = 'startsWith'
            , $startsWith = ''[STARTS_WITH];
        $export($export.P + $export.F * __webpack_require__(152)(STARTS_WITH), 'String', {
            startsWith: function startsWith(searchString) {
                var that = context(this, searchString, STARTS_WITH)
                    , index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
                    , search = String(searchString);
                return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('anchor', function(createHTML) {
            return function anchor(name) {
                return createHTML(this, 'a', 'name', name);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , fails = __webpack_require__(24)
            , defined = __webpack_require__(52)
            , quot = /"/g;
        var createHTML = function(string, tag, attribute, value) {
                var S = String(defined(string))
                    , p1 = '<' + tag;
                if (attribute !== '')
                    p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
                return p1 + '>' + S + '</' + tag + '>';
            }
            ;
        module.exports = function(NAME, exec) {
            var O = {};
            O[NAME] = exec(createHTML);
            $export($export.P + $export.F * fails(function() {
                    var test = ''[NAME]('"');
                    return test !== test.toLowerCase() || test.split('"').length > 3;
                }), 'String', O);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('big', function(createHTML) {
            return function big() {
                return createHTML(this, 'big', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('blink', function(createHTML) {
            return function blink() {
                return createHTML(this, 'blink', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('bold', function(createHTML) {
            return function bold() {
                return createHTML(this, 'b', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('fixed', function(createHTML) {
            return function fixed() {
                return createHTML(this, 'tt', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('fontcolor', function(createHTML) {
            return function fontcolor(color) {
                return createHTML(this, 'font', 'color', color);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('fontsize', function(createHTML) {
            return function fontsize(size) {
                return createHTML(this, 'font', 'size', size);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('italics', function(createHTML) {
            return function italics() {
                return createHTML(this, 'i', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('link', function(createHTML) {
            return function link(url) {
                return createHTML(this, 'a', 'href', url);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('small', function(createHTML) {
            return function small() {
                return createHTML(this, 'small', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('strike', function(createHTML) {
            return function strike() {
                return createHTML(this, 'strike', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('sub', function(createHTML) {
            return function sub() {
                return createHTML(this, 'sub', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(157)('sup', function(createHTML) {
            return function sup() {
                return createHTML(this, 'sup', '', '');
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Date', {
            now: function() {
                return new Date().getTime();
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toObject = __webpack_require__(75)
            , toPrimitive = __webpack_require__(33);
        $export($export.P + $export.F * __webpack_require__(24)(function() {
                return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
                        toISOString: function() {
                            return 1;
                        }
                    }) !== 1;
            }), 'Date', {
            toJSON: function toJSON(key) {
                var O = toObject(this)
                    , pv = toPrimitive(O);
                return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , fails = __webpack_require__(24)
            , getTime = Date.prototype.getTime;
        var lz = function(num) {
                return num > 9 ? num : '0' + num;
            }
            ;
        $export($export.P + $export.F * (fails(function() {
                return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
            }) || !fails(function() {
                new Date(NaN).toISOString();
            })), 'Date', {
            toISOString: function toISOString() {
                if (!isFinite(getTime.call(this)))
                    throw RangeError('Invalid time value');
                var d = this
                    , y = d.getUTCFullYear()
                    , m = d.getUTCMilliseconds()
                    , s = y < 0 ? '-' : y > 9999 ? '+' : '';
                return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var DateProto = Date.prototype
            , INVALID_DATE = 'Invalid Date'
            , TO_STRING = 'toString'
            , $toString = DateProto[TO_STRING]
            , getTime = DateProto.getTime;
        if (new Date(NaN) + '' != INVALID_DATE) {
            __webpack_require__(35)(DateProto, TO_STRING, function toString() {
                var value = getTime.call(this);
                return value === value ? $toString.call(this) : INVALID_DATE;
            });
        }
    }
    , function(module, exports, __webpack_require__) {
        var TO_PRIMITIVE = __webpack_require__(42)('toPrimitive')
            , proto = Date.prototype;
        if (!(TO_PRIMITIVE in proto))
            __webpack_require__(27)(proto, TO_PRIMITIVE, __webpack_require__(175));
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var anObject = __webpack_require__(29)
            , toPrimitive = __webpack_require__(33)
            , NUMBER = 'number';
        module.exports = function(hint) {
            if (hint !== 'string' && hint !== NUMBER && hint !== 'default')
                throw TypeError('Incorrect hint');
            return toPrimitive(anObject(this), hint != NUMBER);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Array', {
            isArray: __webpack_require__(62)
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var ctx = __webpack_require__(37)
            , $export = __webpack_require__(25)
            , toObject = __webpack_require__(75)
            , call = __webpack_require__(178)
            , isArrayIter = __webpack_require__(179)
            , toLength = __webpack_require__(54)
            , createProperty = __webpack_require__(180)
            , getIterFn = __webpack_require__(181);
        $export($export.S + $export.F * !__webpack_require__(182)(function(iter) {
                Array.from(iter);
            }), 'Array', {
            from: function from(arrayLike) {
                var O = toObject(arrayLike), C = typeof this == 'function' ? this : Array, aLen = arguments.length, mapfn = aLen > 1 ? arguments[1] : undefined, mapping = mapfn !== undefined, index = 0, iterFn = getIterFn(O), length, result, step, iterator;
                if (mapping)
                    mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
                if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
                    for (iterator = iterFn.call(O),
                             result = new C; !(step = iterator.next()).done; index++) {
                        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
                    }
                } else {
                    length = toLength(O.length);
                    for (result = new C(length); length > index; index++) {
                        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
                    }
                }
                result.length = index;
                return result;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(29);
        module.exports = function(iterator, fn, value, entries) {
            try {
                return entries ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (e) {
                var ret = iterator['return'];
                if (ret !== undefined)
                    anObject(ret.call(iterator));
                throw e;
            }
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var Iterators = __webpack_require__(146)
            , ITERATOR = __webpack_require__(42)('iterator')
            , ArrayProto = Array.prototype;
        module.exports = function(it) {
            return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $defineProperty = __webpack_require__(28)
            , createDesc = __webpack_require__(34);
        module.exports = function(object, index, value) {
            if (index in object)
                $defineProperty.f(object, index, createDesc(0, value));
            else
                object[index] = value;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(92)
            , ITERATOR = __webpack_require__(42)('iterator')
            , Iterators = __webpack_require__(146);
        module.exports = __webpack_require__(26).getIteratorMethod = function(it) {
            if (it != undefined)
                return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var ITERATOR = __webpack_require__(42)('iterator')
            , SAFE_CLOSING = false;
        try {
            var riter = [7][ITERATOR]();
            riter['return'] = function() {
                SAFE_CLOSING = true;
            }
            ;
            Array.from(riter, function() {
                throw 2;
            });
        } catch (e) {}
        module.exports = function(exec, skipClosing) {
            if (!skipClosing && !SAFE_CLOSING)
                return false;
            var safe = false;
            try {
                var arr = [7]
                    , iter = arr[ITERATOR]();
                iter.next = function() {
                    return {
                        done: safe = true
                    };
                }
                ;
                arr[ITERATOR] = function() {
                    return iter;
                }
                ;
                exec(arr);
            } catch (e) {}
            return safe;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , createProperty = __webpack_require__(180);
        $export($export.S + $export.F * __webpack_require__(24)(function() {
                function F() {}
                return !(Array.of.call(F)instanceof F);
            }), 'Array', {
            of: function of() {
                var index = 0
                    , aLen = arguments.length
                    , result = new (typeof this == 'function' ? this : Array)(aLen);
                while (aLen > index)
                    createProperty(result, index, arguments[index++]);
                result.length = aLen;
                return result;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toIObject = __webpack_require__(49)
            , arrayJoin = [].join;
        $export($export.P + $export.F * (__webpack_require__(50) != Object || !__webpack_require__(185)(arrayJoin)), 'Array', {
            join: function join(separator) {
                return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var fails = __webpack_require__(24);
        module.exports = function(method, arg) {
            return !!method && fails(function() {
                    arg ? method.call(null , function() {}, 1) : method.call(null );
                });
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , html = __webpack_require__(65)
            , cof = __webpack_require__(51)
            , toIndex = __webpack_require__(56)
            , toLength = __webpack_require__(54)
            , arraySlice = [].slice;
        $export($export.P + $export.F * __webpack_require__(24)(function() {
                if (html)
                    arraySlice.call(html);
            }), 'Array', {
            slice: function slice(begin, end) {
                var len = toLength(this.length)
                    , klass = cof(this);
                end = end === undefined ? len : end;
                if (klass == 'Array')
                    return arraySlice.call(this, begin, end);
                var start = toIndex(begin, len)
                    , upTo = toIndex(end, len)
                    , size = toLength(upTo - start)
                    , cloned = Array(size)
                    , i = 0;
                for (; i < size; i++)
                    cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
                return cloned;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , aFunction = __webpack_require__(38)
            , toObject = __webpack_require__(75)
            , fails = __webpack_require__(24)
            , $sort = [].sort
            , test = [1, 2, 3];
        $export($export.P + $export.F * (fails(function() {
                test.sort(undefined);
            }) || !fails(function() {
                test.sort(null );
            }) || !__webpack_require__(185)($sort)), 'Array', {
            sort: function sort(comparefn) {
                return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $forEach = __webpack_require__(189)(0)
            , STRICT = __webpack_require__(185)([].forEach, true);
        $export($export.P + $export.F * !STRICT, 'Array', {
            forEach: function forEach(callbackfn) {
                return $forEach(this, callbackfn, arguments[1]);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var ctx = __webpack_require__(37)
            , IObject = __webpack_require__(50)
            , toObject = __webpack_require__(75)
            , toLength = __webpack_require__(54)
            , asc = __webpack_require__(190);
        module.exports = function(TYPE, $create) {
            var IS_MAP = TYPE == 1
                , IS_FILTER = TYPE == 2
                , IS_SOME = TYPE == 3
                , IS_EVERY = TYPE == 4
                , IS_FIND_INDEX = TYPE == 6
                , NO_HOLES = TYPE == 5 || IS_FIND_INDEX
                , create = $create || asc;
            return function($this, callbackfn, that) {
                var O = toObject($this), self = IObject(O), f = ctx(callbackfn, that, 3), length = toLength(self.length), index = 0, result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined, val, res;
                for (; length > index; index++)
                    if (NO_HOLES || index in self) {
                        val = self[index];
                        res = f(val, index, O);
                        if (TYPE) {
                            if (IS_MAP)
                                result[index] = res;
                            else if (res)
                                switch (TYPE) {
                                    case 3:
                                        return true;
                                    case 5:
                                        return val;
                                    case 6:
                                        return index;
                                    case 2:
                                        result.push(val);
                                }
                            else if (IS_EVERY)
                                return false;
                        }
                    }
                return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
            }
                ;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var speciesConstructor = __webpack_require__(191);
        module.exports = function(original, length) {
            return new (speciesConstructor(original))(length);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(30)
            , isArray = __webpack_require__(62)
            , SPECIES = __webpack_require__(42)('species');
        module.exports = function(original) {
            var C;
            if (isArray(original)) {
                C = original.constructor;
                if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
                    C = undefined;
                if (isObject(C)) {
                    C = C[SPECIES];
                    if (C === null )
                        C = undefined;
                }
            }
            return C === undefined ? Array : C;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $map = __webpack_require__(189)(1);
        $export($export.P + $export.F * !__webpack_require__(185)([].map, true), 'Array', {
            map: function map(callbackfn) {
                return $map(this, callbackfn, arguments[1]);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $filter = __webpack_require__(189)(2);
        $export($export.P + $export.F * !__webpack_require__(185)([].filter, true), 'Array', {
            filter: function filter(callbackfn) {
                return $filter(this, callbackfn, arguments[1]);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $some = __webpack_require__(189)(3);
        $export($export.P + $export.F * !__webpack_require__(185)([].some, true), 'Array', {
            some: function some(callbackfn) {
                return $some(this, callbackfn, arguments[1]);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $every = __webpack_require__(189)(4);
        $export($export.P + $export.F * !__webpack_require__(185)([].every, true), 'Array', {
            every: function every(callbackfn) {
                return $every(this, callbackfn, arguments[1]);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $reduce = __webpack_require__(197);
        $export($export.P + $export.F * !__webpack_require__(185)([].reduce, true), 'Array', {
            reduce: function reduce(callbackfn) {
                return $reduce(this, callbackfn, arguments.length, arguments[1], false);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var aFunction = __webpack_require__(38)
            , toObject = __webpack_require__(75)
            , IObject = __webpack_require__(50)
            , toLength = __webpack_require__(54);
        module.exports = function(that, callbackfn, aLen, memo, isRight) {
            aFunction(callbackfn);
            var O = toObject(that)
                , self = IObject(O)
                , length = toLength(O.length)
                , index = isRight ? length - 1 : 0
                , i = isRight ? -1 : 1;
            if (aLen < 2)
                for (; ; ) {
                    if (index in self) {
                        memo = self[index];
                        index += i;
                        break;
                    }
                    index += i;
                    if (isRight ? index < 0 : length <= index) {
                        throw TypeError('Reduce of empty array with no initial value');
                    }
                }
            for (; isRight ? index >= 0 : length > index; index += i)
                if (index in self) {
                    memo = callbackfn(memo, self[index], index, O);
                }
            return memo;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $reduce = __webpack_require__(197);
        $export($export.P + $export.F * !__webpack_require__(185)([].reduceRight, true), 'Array', {
            reduceRight: function reduceRight(callbackfn) {
                return $reduce(this, callbackfn, arguments.length, arguments[1], true);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $indexOf = __webpack_require__(53)(false)
            , $native = [].indexOf
            , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
        $export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(185)($native)), 'Array', {
            indexOf: function indexOf(searchElement) {
                return NEGATIVE_ZERO ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toIObject = __webpack_require__(49)
            , toInteger = __webpack_require__(55)
            , toLength = __webpack_require__(54)
            , $native = [].lastIndexOf
            , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
        $export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(185)($native)), 'Array', {
            lastIndexOf: function lastIndexOf(searchElement) {
                if (NEGATIVE_ZERO)
                    return $native.apply(this, arguments) || 0;
                var O = toIObject(this)
                    , length = toLength(O.length)
                    , index = length - 1;
                if (arguments.length > 1)
                    index = Math.min(index, toInteger(arguments[1]));
                if (index < 0)
                    index = length + index;
                for (; index >= 0; index--)
                    if (index in O)
                        if (O[index] === searchElement)
                            return index || 0;
                return -1;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.P, 'Array', {
            copyWithin: __webpack_require__(202)
        });
        __webpack_require__(203)('copyWithin');
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var toObject = __webpack_require__(75)
            , toIndex = __webpack_require__(56)
            , toLength = __webpack_require__(54);
        module.exports = [].copyWithin || function copyWithin(target, start) {
                var O = toObject(this)
                    , len = toLength(O.length)
                    , to = toIndex(target, len)
                    , from = toIndex(start, len)
                    , end = arguments.length > 2 ? arguments[2] : undefined
                    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
                    , inc = 1;
                if (from < to && to < from + count) {
                    inc = -1;
                    from += count - 1;
                    to += count - 1;
                }
                while (count-- > 0) {
                    if (from in O)
                        O[to] = O[from];
                    else
                        delete O[to];
                    to += inc;
                    from += inc;
                }
                return O;
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var UNSCOPABLES = __webpack_require__(42)('unscopables')
            , ArrayProto = Array.prototype;
        if (ArrayProto[UNSCOPABLES] == undefined)
            __webpack_require__(27)(ArrayProto, UNSCOPABLES, {});
        module.exports = function(key) {
            ArrayProto[UNSCOPABLES][key] = true;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.P, 'Array', {
            fill: __webpack_require__(205)
        });
        __webpack_require__(203)('fill');
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var toObject = __webpack_require__(75)
            , toIndex = __webpack_require__(56)
            , toLength = __webpack_require__(54);
        module.exports = function fill(value) {
            var O = toObject(this)
                , length = toLength(O.length)
                , aLen = arguments.length
                , index = toIndex(aLen > 1 ? arguments[1] : undefined, length)
                , end = aLen > 2 ? arguments[2] : undefined
                , endPos = end === undefined ? length : toIndex(end, length);
            while (endPos > index)
                O[index++] = value;
            return O;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $find = __webpack_require__(189)(5)
            , KEY = 'find'
            , forced = true;
        if (KEY in [])
            Array(1)[KEY](function() {
                forced = false;
            });
        $export($export.P + $export.F * forced, 'Array', {
            find: function find(callbackfn) {
                return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
            }
        });
        __webpack_require__(203)(KEY);
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $find = __webpack_require__(189)(6)
            , KEY = 'findIndex'
            , forced = true;
        if (KEY in [])
            Array(1)[KEY](function() {
                forced = false;
            });
        $export($export.P + $export.F * forced, 'Array', {
            findIndex: function findIndex(callbackfn) {
                return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
            }
        });
        __webpack_require__(203)(KEY);
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(209)('Array');
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var global = __webpack_require__(21)
            , dP = __webpack_require__(28)
            , DESCRIPTORS = __webpack_require__(23)
            , SPECIES = __webpack_require__(42)('species');
        module.exports = function(KEY) {
            var C = global[KEY];
            if (DESCRIPTORS && C && !C[SPECIES])
                dP.f(C, SPECIES, {
                    configurable: true,
                    get: function() {
                        return this;
                    }
                });
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var addToUnscopables = __webpack_require__(203)
            , step = __webpack_require__(211)
            , Iterators = __webpack_require__(146)
            , toIObject = __webpack_require__(49);
        module.exports = __webpack_require__(145)(Array, 'Array', function(iterated, kind) {
            this._t = toIObject(iterated);
            this._i = 0;
            this._k = kind;
        }, function() {
            var O = this._t
                , kind = this._k
                , index = this._i++;
            if (!O || index >= O.length) {
                this._t = undefined;
                return step(1);
            }
            if (kind == 'keys')
                return step(0, index);
            if (kind == 'values')
                return step(0, O[index]);
            return step(0, [index, O[index]]);
        }, 'values');
        Iterators.Arguments = Iterators.Array;
        addToUnscopables('keys');
        addToUnscopables('values');
        addToUnscopables('entries');
    }
    , function(module, exports) {
        module.exports = function(done, value) {
            return {
                value: value,
                done: !!done
            };
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var global = __webpack_require__(21)
            , inheritIfRequired = __webpack_require__(105)
            , dP = __webpack_require__(28).f
            , gOPN = __webpack_require__(67).f
            , isRegExp = __webpack_require__(151)
            , $flags = __webpack_require__(213)
            , $RegExp = global.RegExp
            , Base = $RegExp
            , proto = $RegExp.prototype
            , re1 = /a/g
            , re2 = /a/g
            , CORRECT_NEW = new $RegExp(re1) !== re1;
        if (__webpack_require__(23) && (!CORRECT_NEW || __webpack_require__(24)(function() {
                re2[__webpack_require__(42)('match')] = false;
                return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
            }))) {
            $RegExp = function RegExp(p, f) {
                var tiRE = this instanceof $RegExp
                    , piRE = isRegExp(p)
                    , fiU = f === undefined;
                return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p,f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
            }
            ;
            var proxy = function(key) {
                    key in $RegExp || dP($RegExp, key, {
                        configurable: true,
                        get: function() {
                            return Base[key];
                        },
                        set: function(it) {
                            Base[key] = it;
                        }
                    });
                }
                ;
            for (var keys = gOPN(Base), i = 0; keys.length > i; )
                proxy(keys[i++]);
            proto.constructor = $RegExp;
            $RegExp.prototype = proto;
            __webpack_require__(35)(global, 'RegExp', $RegExp);
        }
        __webpack_require__(209)('RegExp');
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var anObject = __webpack_require__(29);
        module.exports = function() {
            var that = anObject(this)
                , result = '';
            if (that.global)
                result += 'g';
            if (that.ignoreCase)
                result += 'i';
            if (that.multiline)
                result += 'm';
            if (that.unicode)
                result += 'u';
            if (that.sticky)
                result += 'y';
            return result;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(215);
        var anObject = __webpack_require__(29)
            , $flags = __webpack_require__(213)
            , DESCRIPTORS = __webpack_require__(23)
            , TO_STRING = 'toString'
            , $toString = /./[TO_STRING];
        var define = function(fn) {
                __webpack_require__(35)(RegExp.prototype, TO_STRING, fn, true);
            }
            ;
        if (__webpack_require__(24)(function() {
                return $toString.call({
                        source: 'a',
                        flags: 'b'
                    }) != '/a/b';
            })) {
            define(function toString() {
                var R = anObject(this);
                return '/'.concat(R.source, '/', 'flags'in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
            });
        } else if ($toString.name != TO_STRING) {
            define(function toString() {
                return $toString.call(this);
            });
        }
    }
    , function(module, exports, __webpack_require__) {
        if (__webpack_require__(23) && /./g.flags != 'g')
            __webpack_require__(28).f(RegExp.prototype, 'flags', {
                configurable: true,
                get: __webpack_require__(213)
            });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(217)('match', 1, function(defined, MATCH, $match) {
            return [function match(regexp) {
                'use strict';
                var O = defined(this)
                    , fn = regexp == undefined ? undefined : regexp[MATCH];
                return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
            }
                , $match];
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var hide = __webpack_require__(27)
            , redefine = __webpack_require__(35)
            , fails = __webpack_require__(24)
            , defined = __webpack_require__(52)
            , wks = __webpack_require__(42);
        module.exports = function(KEY, length, exec) {
            var SYMBOL = wks(KEY)
                , fns = exec(defined, SYMBOL, ''[KEY])
                , strfn = fns[0]
                , rxfn = fns[1];
            if (fails(function() {
                    var O = {};
                    O[SYMBOL] = function() {
                        return 7;
                    }
                    ;
                    return ''[KEY](O) != 7;
                })) {
                redefine(String.prototype, KEY, strfn);
                hide(RegExp.prototype, SYMBOL, length == 2 ? function(string, arg) {
                        return rxfn.call(string, this, arg);
                    }
                        : function(string) {
                        return rxfn.call(string, this);
                    }
                );
            }
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(217)('replace', 2, function(defined, REPLACE, $replace) {
            return [function replace(searchValue, replaceValue) {
                'use strict';
                var O = defined(this)
                    , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
                return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
            }
                , $replace];
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(217)('search', 1, function(defined, SEARCH, $search) {
            return [function search(regexp) {
                'use strict';
                var O = defined(this)
                    , fn = regexp == undefined ? undefined : regexp[SEARCH];
                return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
            }
                , $search];
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(217)('split', 2, function(defined, SPLIT, $split) {
            'use strict';
            var isRegExp = __webpack_require__(151)
                , _split = $split
                , $push = [].push
                , $SPLIT = 'split'
                , LENGTH = 'length'
                , LAST_INDEX = 'lastIndex';
            if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
                var NPCG = /()??/.exec('')[1] === undefined;
                $split = function(separator, limit) {
                    var string = String(this);
                    if (separator === undefined && limit === 0)
                        return [];
                    if (!isRegExp(separator))
                        return _split.call(string, separator, limit);
                    var output = [];
                    var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
                    var lastLastIndex = 0;
                    var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
                    var separatorCopy = new RegExp(separator.source,flags + 'g');
                    var separator2, match, lastIndex, lastLength, i;
                    if (!NPCG)
                        separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)',flags);
                    while (match = separatorCopy.exec(string)) {
                        lastIndex = match.index + match[0][LENGTH];
                        if (lastIndex > lastLastIndex) {
                            output.push(string.slice(lastLastIndex, match.index));
                            if (!NPCG && match[LENGTH] > 1)
                                match[0].replace(separator2, function() {
                                    for (i = 1; i < arguments[LENGTH] - 2; i++)
                                        if (arguments[i] === undefined)
                                            match[i] = undefined;
                                });
                            if (match[LENGTH] > 1 && match.index < string[LENGTH])
                                $push.apply(output, match.slice(1));
                            lastLength = match[0][LENGTH];
                            lastLastIndex = lastIndex;
                            if (output[LENGTH] >= splitLimit)
                                break;
                        }
                        if (separatorCopy[LAST_INDEX] === match.index)
                            separatorCopy[LAST_INDEX]++;
                    }
                    if (lastLastIndex === string[LENGTH]) {
                        if (lastLength || !separatorCopy.test(''))
                            output.push('');
                    } else
                        output.push(string.slice(lastLastIndex));
                    return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
                }
                ;
            } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
                $split = function(separator, limit) {
                    return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
                }
                ;
            }
            return [function split(separator, limit) {
                var O = defined(this)
                    , fn = separator == undefined ? undefined : separator[SPLIT];
                return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
            }
                , $split];
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var LIBRARY = __webpack_require__(45), global = __webpack_require__(21), ctx = __webpack_require__(37), classof = __webpack_require__(92), $export = __webpack_require__(25), isObject = __webpack_require__(30), aFunction = __webpack_require__(38), anInstance = __webpack_require__(222), forOf = __webpack_require__(223), speciesConstructor = __webpack_require__(224), task = __webpack_require__(225).set, microtask = __webpack_require__(226)(), PROMISE = 'Promise', TypeError = global.TypeError, process = global.process, $Promise = global[PROMISE], process = global.process, isNode = classof(process) == 'process', empty = function() {}
            , Internal, GenericPromiseCapability, Wrapper;
        var USE_NATIVE = !!function() {
            try {
                var promise = $Promise.resolve(1)
                    , FakePromise = (promise.constructor = {})[__webpack_require__(42)('species')] = function(exec) {
                        exec(empty, empty);
                    }
                    ;
                return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty)instanceof FakePromise;
            } catch (e) {}
        }();
        var sameConstructor = function(a, b) {
                return a === b || a === $Promise && b === Wrapper;
            }
            ;
        var isThenable = function(it) {
                var then;
                return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
            }
            ;
        var newPromiseCapability = function(C) {
                return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
            }
            ;
        var PromiseCapability = GenericPromiseCapability = function(C) {
                var resolve, reject;
                this.promise = new C(function($$resolve, $$reject) {
                        if (resolve !== undefined || reject !== undefined)
                            throw TypeError('Bad Promise constructor');
                        resolve = $$resolve;
                        reject = $$reject;
                    }
                );
                this.resolve = aFunction(resolve);
                this.reject = aFunction(reject);
            }
            ;
        var perform = function(exec) {
                try {
                    exec();
                } catch (e) {
                    return {
                        error: e
                    };
                }
            }
            ;
        var notify = function(promise, isReject) {
                if (promise._n)
                    return;
                promise._n = true;
                var chain = promise._c;
                microtask(function() {
                    var value = promise._v
                        , ok = promise._s == 1
                        , i = 0;
                    var run = function(reaction) {
                            var handler = ok ? reaction.ok : reaction.fail, resolve = reaction.resolve, reject = reaction.reject, domain = reaction.domain, result, then;
                            try {
                                if (handler) {
                                    if (!ok) {
                                        if (promise._h == 2)
                                            onHandleUnhandled(promise);
                                        promise._h = 1;
                                    }
                                    if (handler === true)
                                        result = value;
                                    else {
                                        if (domain)
                                            domain.enter();
                                        result = handler(value);
                                        if (domain)
                                            domain.exit();
                                    }
                                    if (result === reaction.promise) {
                                        reject(TypeError('Promise-chain cycle'));
                                    } else if (then = isThenable(result)) {
                                        then.call(result, resolve, reject);
                                    } else
                                        resolve(result);
                                } else
                                    reject(value);
                            } catch (e) {
                                reject(e);
                            }
                        }
                        ;
                    while (chain.length > i)
                        run(chain[i++]);
                    promise._c = [];
                    promise._n = false;
                    if (isReject && !promise._h)
                        onUnhandled(promise);
                });
            }
            ;
        var onUnhandled = function(promise) {
                task.call(global, function() {
                    var value = promise._v, abrupt, handler, console;
                    if (isUnhandled(promise)) {
                        abrupt = perform(function() {
                            if (isNode) {
                                process.emit('unhandledRejection', value, promise);
                            } else if (handler = global.onunhandledrejection) {
                                handler({
                                    promise: promise,
                                    reason: value
                                });
                            } else if ((console = global.console) && console.error) {
                                console.error('Unhandled promise rejection', value);
                            }
                        });
                        promise._h = isNode || isUnhandled(promise) ? 2 : 1;
                    }
                    promise._a = undefined;
                    if (abrupt)
                        throw abrupt.error;
                });
            }
            ;
        var isUnhandled = function(promise) {
                if (promise._h == 1)
                    return false;
                var chain = promise._a || promise._c, i = 0, reaction;
                while (chain.length > i) {
                    reaction = chain[i++];
                    if (reaction.fail || !isUnhandled(reaction.promise))
                        return false;
                }
                return true;
            }
            ;
        var onHandleUnhandled = function(promise) {
                task.call(global, function() {
                    var handler;
                    if (isNode) {
                        process.emit('rejectionHandled', promise);
                    } else if (handler = global.onrejectionhandled) {
                        handler({
                            promise: promise,
                            reason: promise._v
                        });
                    }
                });
            }
            ;
        var $reject = function(value) {
                var promise = this;
                if (promise._d)
                    return;
                promise._d = true;
                promise = promise._w || promise;
                promise._v = value;
                promise._s = 2;
                if (!promise._a)
                    promise._a = promise._c.slice();
                notify(promise, true);
            }
            ;
        var $resolve = function(value) {
                var promise = this, then;
                if (promise._d)
                    return;
                promise._d = true;
                promise = promise._w || promise;
                try {
                    if (promise === value)
                        throw TypeError("Promise can't be resolved itself");
                    if (then = isThenable(value)) {
                        microtask(function() {
                            var wrapper = {
                                _w: promise,
                                _d: false
                            };
                            try {
                                then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                            } catch (e) {
                                $reject.call(wrapper, e);
                            }
                        });
                    } else {
                        promise._v = value;
                        promise._s = 1;
                        notify(promise, false);
                    }
                } catch (e) {
                    $reject.call({
                        _w: promise,
                        _d: false
                    }, e);
                }
            }
            ;
        if (!USE_NATIVE) {
            $Promise = function Promise(executor) {
                anInstance(this, $Promise, PROMISE, '_h');
                aFunction(executor);
                Internal.call(this);
                try {
                    executor(ctx($resolve, this, 1), ctx($reject, this, 1));
                } catch (err) {
                    $reject.call(this, err);
                }
            }
            ;
            Internal = function Promise(executor) {
                this._c = [];
                this._a = undefined;
                this._s = 0;
                this._d = false;
                this._v = undefined;
                this._h = 0;
                this._n = false;
            }
            ;
            Internal.prototype = __webpack_require__(227)($Promise.prototype, {
                then: function then(onFulfilled, onRejected) {
                    var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
                    reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
                    reaction.fail = typeof onRejected == 'function' && onRejected;
                    reaction.domain = isNode ? process.domain : undefined;
                    this._c.push(reaction);
                    if (this._a)
                        this._a.push(reaction);
                    if (this._s)
                        notify(this, false);
                    return reaction.promise;
                },
                'catch': function(onRejected) {
                    return this.then(undefined, onRejected);
                }
            });
            PromiseCapability = function() {
                var promise = new Internal;
                this.promise = promise;
                this.resolve = ctx($resolve, promise, 1);
                this.reject = ctx($reject, promise, 1);
            }
            ;
        }
        $export($export.G + $export.W + $export.F * !USE_NATIVE, {
            Promise: $Promise
        });
        __webpack_require__(41)($Promise, PROMISE);
        __webpack_require__(209)(PROMISE);
        Wrapper = __webpack_require__(26)[PROMISE];
        $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
            reject: function reject(r) {
                var capability = newPromiseCapability(this)
                    , $$reject = capability.reject;
                $$reject(r);
                return capability.promise;
            }
        });
        $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
            resolve: function resolve(x) {
                if (x instanceof $Promise && sameConstructor(x.constructor, this))
                    return x;
                var capability = newPromiseCapability(this)
                    , $$resolve = capability.resolve;
                $$resolve(x);
                return capability.promise;
            }
        });
        $export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(182)(function(iter) {
                $Promise.all(iter)['catch'](empty);
            })), PROMISE, {
            all: function all(iterable) {
                var C = this
                    , capability = newPromiseCapability(C)
                    , resolve = capability.resolve
                    , reject = capability.reject;
                var abrupt = perform(function() {
                    var values = []
                        , index = 0
                        , remaining = 1;
                    forOf(iterable, false, function(promise) {
                        var $index = index++
                            , alreadyCalled = false;
                        values.push(undefined);
                        remaining++;
                        C.resolve(promise).then(function(value) {
                            if (alreadyCalled)
                                return;
                            alreadyCalled = true;
                            values[$index] = value;
                            --remaining || resolve(values);
                        }, reject);
                    });
                    --remaining || resolve(values);
                });
                if (abrupt)
                    reject(abrupt.error);
                return capability.promise;
            },
            race: function race(iterable) {
                var C = this
                    , capability = newPromiseCapability(C)
                    , reject = capability.reject;
                var abrupt = perform(function() {
                    forOf(iterable, false, function(promise) {
                        C.resolve(promise).then(capability.resolve, reject);
                    });
                });
                if (abrupt)
                    reject(abrupt.error);
                return capability.promise;
            }
        });
    }
    , function(module, exports) {
        module.exports = function(it, Constructor, name, forbiddenField) {
            if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
                throw TypeError(name + ': incorrect invocation!');
            }
            return it;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var ctx = __webpack_require__(37)
            , call = __webpack_require__(178)
            , isArrayIter = __webpack_require__(179)
            , anObject = __webpack_require__(29)
            , toLength = __webpack_require__(54)
            , getIterFn = __webpack_require__(181)
            , BREAK = {}
            , RETURN = {};
        var exports = module.exports = function(iterable, entries, fn, that, ITERATOR) {
                var iterFn = ITERATOR ? function() {
                    return iterable;
                }
                    : getIterFn(iterable), f = ctx(fn, that, entries ? 2 : 1), index = 0, length, step, iterator, result;
                if (typeof iterFn != 'function')
                    throw TypeError(iterable + ' is not iterable!');
                if (isArrayIter(iterFn))
                    for (length = toLength(iterable.length); length > index; index++) {
                        result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
                        if (result === BREAK || result === RETURN)
                            return result;
                    }
                else
                    for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
                        result = call(iterator, f, step.value, entries);
                        if (result === BREAK || result === RETURN)
                            return result;
                    }
            }
            ;
        exports.BREAK = BREAK;
        exports.RETURN = RETURN;
    }
    , function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(29)
            , aFunction = __webpack_require__(38)
            , SPECIES = __webpack_require__(42)('species');
        module.exports = function(O, D) {
            var C = anObject(O).constructor, S;
            return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var ctx = __webpack_require__(37), invoke = __webpack_require__(95), html = __webpack_require__(65), cel = __webpack_require__(32), global = __webpack_require__(21), process = global.process, setTask = global.setImmediate, clearTask = global.clearImmediate, MessageChannel = global.MessageChannel, counter = 0, queue = {}, ONREADYSTATECHANGE = 'onreadystatechange', defer, channel, port;
        var run = function() {
                var id = +this;
                if (queue.hasOwnProperty(id)) {
                    var fn = queue[id];
                    delete queue[id];
                    fn();
                }
            }
            ;
        var listener = function(event) {
                run.call(event.data);
            }
            ;
        if (!setTask || !clearTask) {
            setTask = function setImmediate(fn) {
                var args = []
                    , i = 1;
                while (arguments.length > i)
                    args.push(arguments[i++]);
                queue[++counter] = function() {
                    invoke(typeof fn == 'function' ? fn : Function(fn), args);
                }
                ;
                defer(counter);
                return counter;
            }
            ;
            clearTask = function clearImmediate(id) {
                delete queue[id];
            }
            ;
            if (__webpack_require__(51)(process) == 'process') {
                defer = function(id) {
                    process.nextTick(ctx(run, id, 1));
                }
                ;
            } else if (MessageChannel) {
                channel = new MessageChannel;
                port = channel.port2;
                channel.port1.onmessage = listener;
                defer = ctx(port.postMessage, port, 1);
            } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
                defer = function(id) {
                    global.postMessage(id + '', '*');
                }
                ;
                global.addEventListener('message', listener, false);
            } else if (ONREADYSTATECHANGE in cel('script')) {
                defer = function(id) {
                    html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
                        html.removeChild(this);
                        run.call(id);
                    }
                    ;
                }
                ;
            } else {
                defer = function(id) {
                    setTimeout(ctx(run, id, 1), 0);
                }
                ;
            }
        }
        module.exports = {
            set: setTask,
            clear: clearTask
        };
    }
    , function(module, exports, __webpack_require__) {
        var global = __webpack_require__(21)
            , macrotask = __webpack_require__(225).set
            , Observer = global.MutationObserver || global.WebKitMutationObserver
            , process = global.process
            , Promise = global.Promise
            , isNode = __webpack_require__(51)(process) == 'process';
        module.exports = function() {
            var head, last, notify;
            var flush = function() {
                    var parent, fn;
                    if (isNode && (parent = process.domain))
                        parent.exit();
                    while (head) {
                        fn = head.fn;
                        head = head.next;
                        try {
                            fn();
                        } catch (e) {
                            if (head)
                                notify();
                            else
                                last = undefined;
                            throw e;
                        }
                    }
                    last = undefined;
                    if (parent)
                        parent.enter();
                }
                ;
            if (isNode) {
                notify = function() {
                    process.nextTick(flush);
                }
                ;
            } else if (Observer) {
                var toggle = true
                    , node = document.createTextNode('');
                new Observer(flush).observe(node, {
                    characterData: true
                });
                notify = function() {
                    node.data = toggle = !toggle;
                }
                ;
            } else if (Promise && Promise.resolve) {
                var promise = Promise.resolve();
                notify = function() {
                    promise.then(flush);
                }
                ;
            } else {
                notify = function() {
                    macrotask.call(global, flush);
                }
                ;
            }
            return function(fn) {
                var task = {
                    fn: fn,
                    next: undefined
                };
                if (last)
                    last.next = task;
                if (!head) {
                    head = task;
                    notify();
                }
                last = task;
            }
                ;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var redefine = __webpack_require__(35);
        module.exports = function(target, src, safe) {
            for (var key in src)
                redefine(target, key, src[key], safe);
            return target;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var strong = __webpack_require__(229);
        module.exports = __webpack_require__(230)('Map', function(get) {
            return function Map() {
                return get(this, arguments.length > 0 ? arguments[0] : undefined);
            }
                ;
        }, {
            get: function get(key) {
                var entry = strong.getEntry(this, key);
                return entry && entry.v;
            },
            set: function set(key, value) {
                return strong.def(this, key === 0 ? 0 : key, value);
            }
        }, strong, true);
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var dP = __webpack_require__(28).f
            , create = __webpack_require__(63)
            , redefineAll = __webpack_require__(227)
            , ctx = __webpack_require__(37)
            , anInstance = __webpack_require__(222)
            , defined = __webpack_require__(52)
            , forOf = __webpack_require__(223)
            , $iterDefine = __webpack_require__(145)
            , step = __webpack_require__(211)
            , setSpecies = __webpack_require__(209)
            , DESCRIPTORS = __webpack_require__(23)
            , fastKey = __webpack_require__(39).fastKey
            , SIZE = DESCRIPTORS ? '_s' : 'size';
        var getEntry = function(that, key) {
                var index = fastKey(key), entry;
                if (index !== 'F')
                    return that._i[index];
                for (entry = that._f; entry; entry = entry.n) {
                    if (entry.k == key)
                        return entry;
                }
            }
            ;
        module.exports = {
            getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
                var C = wrapper(function(that, iterable) {
                    anInstance(that, C, NAME, '_i');
                    that._i = create(null );
                    that._f = undefined;
                    that._l = undefined;
                    that[SIZE] = 0;
                    if (iterable != undefined)
                        forOf(iterable, IS_MAP, that[ADDER], that);
                });
                redefineAll(C.prototype, {
                    clear: function clear() {
                        for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
                            entry.r = true;
                            if (entry.p)
                                entry.p = entry.p.n = undefined;
                            delete data[entry.i];
                        }
                        that._f = that._l = undefined;
                        that[SIZE] = 0;
                    },
                    'delete': function(key) {
                        var that = this
                            , entry = getEntry(that, key);
                        if (entry) {
                            var next = entry.n
                                , prev = entry.p;
                            delete that._i[entry.i];
                            entry.r = true;
                            if (prev)
                                prev.n = next;
                            if (next)
                                next.p = prev;
                            if (that._f == entry)
                                that._f = next;
                            if (that._l == entry)
                                that._l = prev;
                            that[SIZE]--;
                        }
                        return !!entry;
                    },
                    forEach: function forEach(callbackfn) {
                        anInstance(this, C, 'forEach');
                        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3), entry;
                        while (entry = entry ? entry.n : this._f) {
                            f(entry.v, entry.k, this);
                            while (entry && entry.r)
                                entry = entry.p;
                        }
                    },
                    has: function has(key) {
                        return !!getEntry(this, key);
                    }
                });
                if (DESCRIPTORS)
                    dP(C.prototype, 'size', {
                        get: function() {
                            return defined(this[SIZE]);
                        }
                    });
                return C;
            },
            def: function(that, key, value) {
                var entry = getEntry(that, key), prev, index;
                if (entry) {
                    entry.v = value;
                } else {
                    that._l = entry = {
                        i: index = fastKey(key, true),
                        k: key,
                        v: value,
                        p: prev = that._l,
                        n: undefined,
                        r: false
                    };
                    if (!that._f)
                        that._f = entry;
                    if (prev)
                        prev.n = entry;
                    that[SIZE]++;
                    if (index !== 'F')
                        that._i[index] = entry;
                }
                return that;
            },
            getEntry: getEntry,
            setStrong: function(C, NAME, IS_MAP) {
                $iterDefine(C, NAME, function(iterated, kind) {
                    this._t = iterated;
                    this._k = kind;
                    this._l = undefined;
                }, function() {
                    var that = this
                        , kind = that._k
                        , entry = that._l;
                    while (entry && entry.r)
                        entry = entry.p;
                    if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
                        that._t = undefined;
                        return step(1);
                    }
                    if (kind == 'keys')
                        return step(0, entry.k);
                    if (kind == 'values')
                        return step(0, entry.v);
                    return step(0, [entry.k, entry.v]);
                }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
                setSpecies(NAME);
            }
        };
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var global = __webpack_require__(21)
            , $export = __webpack_require__(25)
            , redefine = __webpack_require__(35)
            , redefineAll = __webpack_require__(227)
            , meta = __webpack_require__(39)
            , forOf = __webpack_require__(223)
            , anInstance = __webpack_require__(222)
            , isObject = __webpack_require__(30)
            , fails = __webpack_require__(24)
            , $iterDetect = __webpack_require__(182)
            , setToStringTag = __webpack_require__(41)
            , inheritIfRequired = __webpack_require__(105);
        module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
            var Base = global[NAME]
                , C = Base
                , ADDER = IS_MAP ? 'set' : 'add'
                , proto = C && C.prototype
                , O = {};
            var fixMethod = function(KEY) {
                    var fn = proto[KEY];
                    redefine(proto, KEY, KEY == 'delete' ? function(a) {
                            return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
                        }
                            : KEY == 'has' ? function has(a) {
                            return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
                        }
                            : KEY == 'get' ? function get(a) {
                            return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
                        }
                            : KEY == 'add' ? function add(a) {
                            fn.call(this, a === 0 ? 0 : a);
                            return this;
                        }
                            : function set(a, b) {
                            fn.call(this, a === 0 ? 0 : a, b);
                            return this;
                        }
                    );
                }
                ;
            if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function() {
                    new C().entries().next();
                }))) {
                C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
                redefineAll(C.prototype, methods);
                meta.NEED = true;
            } else {
                var instance = new C
                    , HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
                    , THROWS_ON_PRIMITIVES = fails(function() {
                    instance.has(1);
                })
                    , ACCEPT_ITERABLES = $iterDetect(function(iter) {
                    new C(iter);
                })
                    , BUGGY_ZERO = !IS_WEAK && fails(function() {
                        var $instance = new C()
                            , index = 5;
                        while (index--)
                            $instance[ADDER](index, index);
                        return !$instance.has(-0);
                    });
                if (!ACCEPT_ITERABLES) {
                    C = wrapper(function(target, iterable) {
                        anInstance(target, C, NAME);
                        var that = inheritIfRequired(new Base, target, C);
                        if (iterable != undefined)
                            forOf(iterable, IS_MAP, that[ADDER], that);
                        return that;
                    });
                    C.prototype = proto;
                    proto.constructor = C;
                }
                if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
                    fixMethod('delete');
                    fixMethod('has');
                    IS_MAP && fixMethod('get');
                }
                if (BUGGY_ZERO || HASNT_CHAINING)
                    fixMethod(ADDER);
                if (IS_WEAK && proto.clear)
                    delete proto.clear;
            }
            setToStringTag(C, NAME);
            O[NAME] = C;
            $export($export.G + $export.W + $export.F * (C != Base), O);
            if (!IS_WEAK)
                common.setStrong(C, NAME, IS_MAP);
            return C;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var strong = __webpack_require__(229);
        module.exports = __webpack_require__(230)('Set', function(get) {
            return function Set() {
                return get(this, arguments.length > 0 ? arguments[0] : undefined);
            }
                ;
        }, {
            add: function add(value) {
                return strong.def(this, value = value === 0 ? 0 : value, value);
            }
        }, strong);
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var each = __webpack_require__(189)(0), redefine = __webpack_require__(35), meta = __webpack_require__(39), assign = __webpack_require__(86), weak = __webpack_require__(233), isObject = __webpack_require__(30), getWeak = meta.getWeak, isExtensible = Object.isExtensible, uncaughtFrozenStore = weak.ufstore, tmp = {}, InternalMap;
        var wrapper = function(get) {
                return function WeakMap() {
                    return get(this, arguments.length > 0 ? arguments[0] : undefined);
                }
                    ;
            }
            ;
        var methods = {
            get: function get(key) {
                if (isObject(key)) {
                    var data = getWeak(key);
                    if (data === true)
                        return uncaughtFrozenStore(this).get(key);
                    return data ? data[this._i] : undefined;
                }
            },
            set: function set(key, value) {
                return weak.def(this, key, value);
            }
        };
        var $WeakMap = module.exports = __webpack_require__(230)('WeakMap', wrapper, methods, weak, true, true);
        if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
            InternalMap = weak.getConstructor(wrapper);
            assign(InternalMap.prototype, methods);
            meta.NEED = true;
            each(['delete', 'has', 'get', 'set'], function(key) {
                var proto = $WeakMap.prototype
                    , method = proto[key];
                redefine(proto, key, function(a, b) {
                    if (isObject(a) && !isExtensible(a)) {
                        if (!this._f)
                            this._f = new InternalMap;
                        var result = this._f[key](a, b);
                        return key == 'set' ? this : result;
                    }
                    return method.call(this, a, b);
                });
            });
        }
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var redefineAll = __webpack_require__(227)
            , getWeak = __webpack_require__(39).getWeak
            , anObject = __webpack_require__(29)
            , isObject = __webpack_require__(30)
            , anInstance = __webpack_require__(222)
            , forOf = __webpack_require__(223)
            , createArrayMethod = __webpack_require__(189)
            , $has = __webpack_require__(22)
            , arrayFind = createArrayMethod(5)
            , arrayFindIndex = createArrayMethod(6)
            , id = 0;
        var uncaughtFrozenStore = function(that) {
                return that._l || (that._l = new UncaughtFrozenStore);
            }
            ;
        var UncaughtFrozenStore = function() {
                this.a = [];
            }
            ;
        var findUncaughtFrozen = function(store, key) {
                return arrayFind(store.a, function(it) {
                    return it[0] === key;
                });
            }
            ;
        UncaughtFrozenStore.prototype = {
            get: function(key) {
                var entry = findUncaughtFrozen(this, key);
                if (entry)
                    return entry[1];
            },
            has: function(key) {
                return !!findUncaughtFrozen(this, key);
            },
            set: function(key, value) {
                var entry = findUncaughtFrozen(this, key);
                if (entry)
                    entry[1] = value;
                else
                    this.a.push([key, value]);
            },
            'delete': function(key) {
                var index = arrayFindIndex(this.a, function(it) {
                    return it[0] === key;
                });
                if (~index)
                    this.a.splice(index, 1);
                return !!~index;
            }
        };
        module.exports = {
            getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
                var C = wrapper(function(that, iterable) {
                    anInstance(that, C, NAME, '_i');
                    that._i = id++;
                    that._l = undefined;
                    if (iterable != undefined)
                        forOf(iterable, IS_MAP, that[ADDER], that);
                });
                redefineAll(C.prototype, {
                    'delete': function(key) {
                        if (!isObject(key))
                            return false;
                        var data = getWeak(key);
                        if (data === true)
                            return uncaughtFrozenStore(this)['delete'](key);
                        return data && $has(data, this._i) && delete data[this._i];
                    },
                    has: function has(key) {
                        if (!isObject(key))
                            return false;
                        var data = getWeak(key);
                        if (data === true)
                            return uncaughtFrozenStore(this).has(key);
                        return data && $has(data, this._i);
                    }
                });
                return C;
            },
            def: function(that, key, value) {
                var data = getWeak(anObject(key), true);
                if (data === true)
                    uncaughtFrozenStore(that).set(key, value);
                else
                    data[that._i] = value;
                return that;
            },
            ufstore: uncaughtFrozenStore
        };
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var weak = __webpack_require__(233);
        __webpack_require__(230)('WeakSet', function(get) {
            return function WeakSet() {
                return get(this, arguments.length > 0 ? arguments[0] : undefined);
            }
                ;
        }, {
            add: function add(value) {
                return weak.def(this, value, true);
            }
        }, weak, false, true);
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $typed = __webpack_require__(236)
            , buffer = __webpack_require__(237)
            , anObject = __webpack_require__(29)
            , toIndex = __webpack_require__(56)
            , toLength = __webpack_require__(54)
            , isObject = __webpack_require__(30)
            , ArrayBuffer = __webpack_require__(21).ArrayBuffer
            , speciesConstructor = __webpack_require__(224)
            , $ArrayBuffer = buffer.ArrayBuffer
            , $DataView = buffer.DataView
            , $isView = $typed.ABV && ArrayBuffer.isView
            , $slice = $ArrayBuffer.prototype.slice
            , VIEW = $typed.VIEW
            , ARRAY_BUFFER = 'ArrayBuffer';
        $export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {
            ArrayBuffer: $ArrayBuffer
        });
        $export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
            isView: function isView(it) {
                return $isView && $isView(it) || isObject(it) && VIEW in it;
            }
        });
        $export($export.P + $export.U + $export.F * __webpack_require__(24)(function() {
                return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
            }), ARRAY_BUFFER, {
            slice: function slice(start, end) {
                if ($slice !== undefined && end === undefined)
                    return $slice.call(anObject(this), start);
                var len = anObject(this).byteLength
                    , first = toIndex(start, len)
                    , final = toIndex(end === undefined ? len : end, len)
                    , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
                    , viewS = new $DataView(this)
                    , viewT = new $DataView(result)
                    , index = 0;
                while (first < final) {
                    viewT.setUint8(index++, viewS.getUint8(first++));
                }
                return result;
            }
        });
        __webpack_require__(209)(ARRAY_BUFFER);
    }
    , function(module, exports, __webpack_require__) {
        var global = __webpack_require__(21), hide = __webpack_require__(27), uid = __webpack_require__(36), TYPED = uid('typed_array'), VIEW = uid('view'), ABV = !!(global.ArrayBuffer && global.DataView), CONSTR = ABV, i = 0, l = 9, Typed;
        var TypedArrayConstructors = ('Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array').split(',');
        while (i < l) {
            if (Typed = global[TypedArrayConstructors[i++]]) {
                hide(Typed.prototype, TYPED, true);
                hide(Typed.prototype, VIEW, true);
            } else
                CONSTR = false;
        }
        module.exports = {
            ABV: ABV,
            CONSTR: CONSTR,
            TYPED: TYPED,
            VIEW: VIEW
        };
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var global = __webpack_require__(21)
            , DESCRIPTORS = __webpack_require__(23)
            , LIBRARY = __webpack_require__(45)
            , $typed = __webpack_require__(236)
            , hide = __webpack_require__(27)
            , redefineAll = __webpack_require__(227)
            , fails = __webpack_require__(24)
            , anInstance = __webpack_require__(222)
            , toInteger = __webpack_require__(55)
            , toLength = __webpack_require__(54)
            , gOPN = __webpack_require__(67).f
            , dP = __webpack_require__(28).f
            , arrayFill = __webpack_require__(205)
            , setToStringTag = __webpack_require__(41)
            , ARRAY_BUFFER = 'ArrayBuffer'
            , DATA_VIEW = 'DataView'
            , PROTOTYPE = 'prototype'
            , WRONG_LENGTH = 'Wrong length!'
            , WRONG_INDEX = 'Wrong index!'
            , $ArrayBuffer = global[ARRAY_BUFFER]
            , $DataView = global[DATA_VIEW]
            , Math = global.Math
            , RangeError = global.RangeError
            , Infinity = global.Infinity
            , BaseBuffer = $ArrayBuffer
            , abs = Math.abs
            , pow = Math.pow
            , floor = Math.floor
            , log = Math.log
            , LN2 = Math.LN2
            , BUFFER = 'buffer'
            , BYTE_LENGTH = 'byteLength'
            , BYTE_OFFSET = 'byteOffset'
            , $BUFFER = DESCRIPTORS ? '_b' : BUFFER
            , $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH
            , $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;
        var packIEEE754 = function(value, mLen, nBytes) {
                var buffer = Array(nBytes), eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0, i = 0, s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0, e, m, c;
                value = abs(value)
                if (value != value || value === Infinity) {
                    m = value != value ? 1 : 0;
                    e = eMax;
                } else {
                    e = floor(log(value) / LN2);
                    if (value * (c = pow(2, -e)) < 1) {
                        e--;
                        c *= 2;
                    }
                    if (e + eBias >= 1) {
                        value += rt / c;
                    } else {
                        value += rt * pow(2, 1 - eBias);
                    }
                    if (value * c >= 2) {
                        e++;
                        c /= 2;
                    }
                    if (e + eBias >= eMax) {
                        m = 0;
                        e = eMax;
                    } else if (e + eBias >= 1) {
                        m = (value * c - 1) * pow(2, mLen);
                        e = e + eBias;
                    } else {
                        m = value * pow(2, eBias - 1) * pow(2, mLen);
                        e = 0;
                    }
                }
                for (; mLen >= 8; buffer[i++] = m & 255,
                    m /= 256,
                    mLen -= 8)
                    ;
                e = e << mLen | m;
                eLen += mLen;
                for (; eLen > 0; buffer[i++] = e & 255,
                    e /= 256,
                    eLen -= 8)
                    ;
                buffer[--i] |= s * 128;
                return buffer;
            }
            ;
        var unpackIEEE754 = function(buffer, mLen, nBytes) {
                var eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = eLen - 7, i = nBytes - 1, s = buffer[i--], e = s & 127, m;
                s >>= 7;
                for (; nBits > 0; e = e * 256 + buffer[i],
                    i--,
                    nBits -= 8)
                    ;
                m = e & (1 << -nBits) - 1;
                e >>= -nBits;
                nBits += mLen;
                for (; nBits > 0; m = m * 256 + buffer[i],
                    i--,
                    nBits -= 8)
                    ;
                if (e === 0) {
                    e = 1 - eBias;
                } else if (e === eMax) {
                    return m ? NaN : s ? -Infinity : Infinity;
                } else {
                    m = m + pow(2, mLen);
                    e = e - eBias;
                }
                return (s ? -1 : 1) * m * pow(2, e - mLen);
            }
            ;
        var unpackI32 = function(bytes) {
                return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
            }
            ;
        var packI8 = function(it) {
                return [it & 0xff];
            }
            ;
        var packI16 = function(it) {
                return [it & 0xff, it >> 8 & 0xff];
            }
            ;
        var packI32 = function(it) {
                return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
            }
            ;
        var packF64 = function(it) {
                return packIEEE754(it, 52, 8);
            }
            ;
        var packF32 = function(it) {
                return packIEEE754(it, 23, 4);
            }
            ;
        var addGetter = function(C, key, internal) {
                dP(C[PROTOTYPE], key, {
                    get: function() {
                        return this[internal];
                    }
                });
            }
            ;
        var get = function(view, bytes, index, isLittleEndian) {
                var numIndex = +index
                    , intIndex = toInteger(numIndex);
                if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])
                    throw RangeError(WRONG_INDEX);
                var store = view[$BUFFER]._b
                    , start = intIndex + view[$OFFSET]
                    , pack = store.slice(start, start + bytes);
                return isLittleEndian ? pack : pack.reverse();
            }
            ;
        var set = function(view, bytes, index, conversion, value, isLittleEndian) {
                var numIndex = +index
                    , intIndex = toInteger(numIndex);
                if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])
                    throw RangeError(WRONG_INDEX);
                var store = view[$BUFFER]._b
                    , start = intIndex + view[$OFFSET]
                    , pack = conversion(+value);
                for (var i = 0; i < bytes; i++)
                    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
            }
            ;
        var validateArrayBufferArguments = function(that, length) {
                anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
                var numberLength = +length
                    , byteLength = toLength(numberLength);
                if (numberLength != byteLength)
                    throw RangeError(WRONG_LENGTH);
                return byteLength;
            }
            ;
        if (!$typed.ABV) {
            $ArrayBuffer = function ArrayBuffer(length) {
                var byteLength = validateArrayBufferArguments(this, length);
                this._b = arrayFill.call(Array(byteLength), 0);
                this[$LENGTH] = byteLength;
            }
            ;
            $DataView = function DataView(buffer, byteOffset, byteLength) {
                anInstance(this, $DataView, DATA_VIEW);
                anInstance(buffer, $ArrayBuffer, DATA_VIEW);
                var bufferLength = buffer[$LENGTH]
                    , offset = toInteger(byteOffset);
                if (offset < 0 || offset > bufferLength)
                    throw RangeError('Wrong offset!');
                byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
                if (offset + byteLength > bufferLength)
                    throw RangeError(WRONG_LENGTH);
                this[$BUFFER] = buffer;
                this[$OFFSET] = offset;
                this[$LENGTH] = byteLength;
            }
            ;
            if (DESCRIPTORS) {
                addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
                addGetter($DataView, BUFFER, '_b');
                addGetter($DataView, BYTE_LENGTH, '_l');
                addGetter($DataView, BYTE_OFFSET, '_o');
            }
            redefineAll($DataView[PROTOTYPE], {
                getInt8: function getInt8(byteOffset) {
                    return get(this, 1, byteOffset)[0] << 24 >> 24;
                },
                getUint8: function getUint8(byteOffset) {
                    return get(this, 1, byteOffset)[0];
                },
                getInt16: function getInt16(byteOffset) {
                    var bytes = get(this, 2, byteOffset, arguments[1]);
                    return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
                },
                getUint16: function getUint16(byteOffset) {
                    var bytes = get(this, 2, byteOffset, arguments[1]);
                    return bytes[1] << 8 | bytes[0];
                },
                getInt32: function getInt32(byteOffset) {
                    return unpackI32(get(this, 4, byteOffset, arguments[1]));
                },
                getUint32: function getUint32(byteOffset) {
                    return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
                },
                getFloat32: function getFloat32(byteOffset) {
                    return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
                },
                getFloat64: function getFloat64(byteOffset) {
                    return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
                },
                setInt8: function setInt8(byteOffset, value) {
                    set(this, 1, byteOffset, packI8, value);
                },
                setUint8: function setUint8(byteOffset, value) {
                    set(this, 1, byteOffset, packI8, value);
                },
                setInt16: function setInt16(byteOffset, value) {
                    set(this, 2, byteOffset, packI16, value, arguments[2]);
                },
                setUint16: function setUint16(byteOffset, value) {
                    set(this, 2, byteOffset, packI16, value, arguments[2]);
                },
                setInt32: function setInt32(byteOffset, value) {
                    set(this, 4, byteOffset, packI32, value, arguments[2]);
                },
                setUint32: function setUint32(byteOffset, value) {
                    set(this, 4, byteOffset, packI32, value, arguments[2]);
                },
                setFloat32: function setFloat32(byteOffset, value) {
                    set(this, 4, byteOffset, packF32, value, arguments[2]);
                },
                setFloat64: function setFloat64(byteOffset, value) {
                    set(this, 8, byteOffset, packF64, value, arguments[2]);
                }
            });
        } else {
            if (!fails(function() {
                    new $ArrayBuffer;
                }) || !fails(function() {
                    new $ArrayBuffer(.5);
                })) {
                $ArrayBuffer = function ArrayBuffer(length) {
                    return new BaseBuffer(validateArrayBufferArguments(this, length));
                }
                ;
                var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
                for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ) {
                    if (!((key = keys[j++])in $ArrayBuffer))
                        hide($ArrayBuffer, key, BaseBuffer[key]);
                }
                ;if (!LIBRARY)
                    ArrayBufferProto.constructor = $ArrayBuffer;
            }
            var view = new $DataView(new $ArrayBuffer(2))
                , $setInt8 = $DataView[PROTOTYPE].setInt8;
            view.setInt8(0, 2147483648);
            view.setInt8(1, 2147483649);
            if (view.getInt8(0) || !view.getInt8(1))
                redefineAll($DataView[PROTOTYPE], {
                    setInt8: function setInt8(byteOffset, value) {
                        $setInt8.call(this, byteOffset, value << 24 >> 24);
                    },
                    setUint8: function setUint8(byteOffset, value) {
                        $setInt8.call(this, byteOffset, value << 24 >> 24);
                    }
                }, true);
        }
        setToStringTag($ArrayBuffer, ARRAY_BUFFER);
        setToStringTag($DataView, DATA_VIEW);
        hide($DataView[PROTOTYPE], $typed.VIEW, true);
        exports[ARRAY_BUFFER] = $ArrayBuffer;
        exports[DATA_VIEW] = $DataView;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.G + $export.W + $export.F * !__webpack_require__(236).ABV, {
            DataView: __webpack_require__(237).DataView
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Int8', 1, function(init) {
            return function Int8Array(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        if (__webpack_require__(23)) {
            var LIBRARY = __webpack_require__(45)
                , global = __webpack_require__(21)
                , fails = __webpack_require__(24)
                , $export = __webpack_require__(25)
                , $typed = __webpack_require__(236)
                , $buffer = __webpack_require__(237)
                , ctx = __webpack_require__(37)
                , anInstance = __webpack_require__(222)
                , propertyDesc = __webpack_require__(34)
                , hide = __webpack_require__(27)
                , redefineAll = __webpack_require__(227)
                , toInteger = __webpack_require__(55)
                , toLength = __webpack_require__(54)
                , toIndex = __webpack_require__(56)
                , toPrimitive = __webpack_require__(33)
                , has = __webpack_require__(22)
                , same = __webpack_require__(88)
                , classof = __webpack_require__(92)
                , isObject = __webpack_require__(30)
                , toObject = __webpack_require__(75)
                , isArrayIter = __webpack_require__(179)
                , create = __webpack_require__(63)
                , getPrototypeOf = __webpack_require__(76)
                , gOPN = __webpack_require__(67).f
                , getIterFn = __webpack_require__(181)
                , uid = __webpack_require__(36)
                , wks = __webpack_require__(42)
                , createArrayMethod = __webpack_require__(189)
                , createArrayIncludes = __webpack_require__(53)
                , speciesConstructor = __webpack_require__(224)
                , ArrayIterators = __webpack_require__(210)
                , Iterators = __webpack_require__(146)
                , $iterDetect = __webpack_require__(182)
                , setSpecies = __webpack_require__(209)
                , arrayFill = __webpack_require__(205)
                , arrayCopyWithin = __webpack_require__(202)
                , $DP = __webpack_require__(28)
                , $GOPD = __webpack_require__(68)
                , dP = $DP.f
                , gOPD = $GOPD.f
                , RangeError = global.RangeError
                , TypeError = global.TypeError
                , Uint8Array = global.Uint8Array
                , ARRAY_BUFFER = 'ArrayBuffer'
                , SHARED_BUFFER = 'Shared' + ARRAY_BUFFER
                , BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT'
                , PROTOTYPE = 'prototype'
                , ArrayProto = Array[PROTOTYPE]
                , $ArrayBuffer = $buffer.ArrayBuffer
                , $DataView = $buffer.DataView
                , arrayForEach = createArrayMethod(0)
                , arrayFilter = createArrayMethod(2)
                , arraySome = createArrayMethod(3)
                , arrayEvery = createArrayMethod(4)
                , arrayFind = createArrayMethod(5)
                , arrayFindIndex = createArrayMethod(6)
                , arrayIncludes = createArrayIncludes(true)
                , arrayIndexOf = createArrayIncludes(false)
                , arrayValues = ArrayIterators.values
                , arrayKeys = ArrayIterators.keys
                , arrayEntries = ArrayIterators.entries
                , arrayLastIndexOf = ArrayProto.lastIndexOf
                , arrayReduce = ArrayProto.reduce
                , arrayReduceRight = ArrayProto.reduceRight
                , arrayJoin = ArrayProto.join
                , arraySort = ArrayProto.sort
                , arraySlice = ArrayProto.slice
                , arrayToString = ArrayProto.toString
                , arrayToLocaleString = ArrayProto.toLocaleString
                , ITERATOR = wks('iterator')
                , TAG = wks('toStringTag')
                , TYPED_CONSTRUCTOR = uid('typed_constructor')
                , DEF_CONSTRUCTOR = uid('def_constructor')
                , ALL_CONSTRUCTORS = $typed.CONSTR
                , TYPED_ARRAY = $typed.TYPED
                , VIEW = $typed.VIEW
                , WRONG_LENGTH = 'Wrong length!';
            var $map = createArrayMethod(1, function(O, length) {
                return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
            });
            var LITTLE_ENDIAN = fails(function() {
                return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
            });
            var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function() {
                    new Uint8Array(1).set({});
                });
            var strictToLength = function(it, SAME) {
                    if (it === undefined)
                        throw TypeError(WRONG_LENGTH);
                    var number = +it
                        , length = toLength(it);
                    if (SAME && !same(number, length))
                        throw RangeError(WRONG_LENGTH);
                    return length;
                }
                ;
            var toOffset = function(it, BYTES) {
                    var offset = toInteger(it);
                    if (offset < 0 || offset % BYTES)
                        throw RangeError('Wrong offset!');
                    return offset;
                }
                ;
            var validate = function(it) {
                    if (isObject(it) && TYPED_ARRAY in it)
                        return it;
                    throw TypeError(it + ' is not a typed array!');
                }
                ;
            var allocate = function(C, length) {
                    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
                        throw TypeError('It is not a typed array constructor!');
                    }
                    return new C(length);
                }
                ;
            var speciesFromList = function(O, list) {
                    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
                }
                ;
            var fromList = function(C, list) {
                    var index = 0
                        , length = list.length
                        , result = allocate(C, length);
                    while (length > index)
                        result[index] = list[index++];
                    return result;
                }
                ;
            var addGetter = function(it, key, internal) {
                    dP(it, key, {
                        get: function() {
                            return this._d[internal];
                        }
                    });
                }
                ;
            var $from = function from(source) {
                    var O = toObject(source), aLen = arguments.length, mapfn = aLen > 1 ? arguments[1] : undefined, mapping = mapfn !== undefined, iterFn = getIterFn(O), i, length, values, result, step, iterator;
                    if (iterFn != undefined && !isArrayIter(iterFn)) {
                        for (iterator = iterFn.call(O),
                                 values = [],
                                 i = 0; !(step = iterator.next()).done; i++) {
                            values.push(step.value);
                        }
                        O = values;
                    }
                    if (mapping && aLen > 2)
                        mapfn = ctx(mapfn, arguments[2], 2);
                    for (i = 0,
                             length = toLength(O.length),
                             result = allocate(this, length); length > i; i++) {
                        result[i] = mapping ? mapfn(O[i], i) : O[i];
                    }
                    return result;
                }
                ;
            var $of = function of() {
                    var index = 0
                        , length = arguments.length
                        , result = allocate(this, length);
                    while (length > index)
                        result[index] = arguments[index++];
                    return result;
                }
                ;
            var TO_LOCALE_BUG = !!Uint8Array && fails(function() {
                    arrayToLocaleString.call(new Uint8Array(1));
                });
            var $toLocaleString = function toLocaleString() {
                    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
                }
                ;
            var proto = {
                copyWithin: function copyWithin(target, start) {
                    return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
                },
                every: function every(callbackfn) {
                    return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
                },
                fill: function fill(value) {
                    return arrayFill.apply(validate(this), arguments);
                },
                filter: function filter(callbackfn) {
                    return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
                },
                find: function find(predicate) {
                    return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
                },
                findIndex: function findIndex(predicate) {
                    return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
                },
                forEach: function forEach(callbackfn) {
                    arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
                },
                indexOf: function indexOf(searchElement) {
                    return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
                },
                includes: function includes(searchElement) {
                    return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
                },
                join: function join(separator) {
                    return arrayJoin.apply(validate(this), arguments);
                },
                lastIndexOf: function lastIndexOf(searchElement) {
                    return arrayLastIndexOf.apply(validate(this), arguments);
                },
                map: function map(mapfn) {
                    return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
                },
                reduce: function reduce(callbackfn) {
                    return arrayReduce.apply(validate(this), arguments);
                },
                reduceRight: function reduceRight(callbackfn) {
                    return arrayReduceRight.apply(validate(this), arguments);
                },
                reverse: function reverse() {
                    var that = this, length = validate(that).length, middle = Math.floor(length / 2), index = 0, value;
                    while (index < middle) {
                        value = that[index];
                        that[index++] = that[--length];
                        that[length] = value;
                    }
                    return that;
                },
                some: function some(callbackfn) {
                    return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
                },
                sort: function sort(comparefn) {
                    return arraySort.call(validate(this), comparefn);
                },
                subarray: function subarray(begin, end) {
                    var O = validate(this)
                        , length = O.length
                        , $begin = toIndex(begin, length);
                    return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer,O.byteOffset + $begin * O.BYTES_PER_ELEMENT,toLength((end === undefined ? length : toIndex(end, length)) - $begin));
                }
            };
            var $slice = function slice(start, end) {
                    return speciesFromList(this, arraySlice.call(validate(this), start, end));
                }
                ;
            var $set = function set(arrayLike) {
                    validate(this);
                    var offset = toOffset(arguments[1], 1)
                        , length = this.length
                        , src = toObject(arrayLike)
                        , len = toLength(src.length)
                        , index = 0;
                    if (len + offset > length)
                        throw RangeError(WRONG_LENGTH);
                    while (index < len)
                        this[offset + index] = src[index++];
                }
                ;
            var $iterators = {
                entries: function entries() {
                    return arrayEntries.call(validate(this));
                },
                keys: function keys() {
                    return arrayKeys.call(validate(this));
                },
                values: function values() {
                    return arrayValues.call(validate(this));
                }
            };
            var isTAIndex = function(target, key) {
                    return isObject(target) && target[TYPED_ARRAY] && typeof key != 'symbol' && key in target && String(+key) == String(key);
                }
                ;
            var $getDesc = function getOwnPropertyDescriptor(target, key) {
                    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
                }
                ;
            var $setDesc = function defineProperty(target, key, desc) {
                    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
                        target[key] = desc.value;
                        return target;
                    } else
                        return dP(target, key, desc);
                }
                ;
            if (!ALL_CONSTRUCTORS) {
                $GOPD.f = $getDesc;
                $DP.f = $setDesc;
            }
            $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
                getOwnPropertyDescriptor: $getDesc,
                defineProperty: $setDesc
            });
            if (fails(function() {
                    arrayToString.call({});
                })) {
                arrayToString = arrayToLocaleString = function toString() {
                    return arrayJoin.call(this);
                }
            }
            var $TypedArrayPrototype$ = redefineAll({}, proto);
            redefineAll($TypedArrayPrototype$, $iterators);
            hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
            redefineAll($TypedArrayPrototype$, {
                slice: $slice,
                set: $set,
                constructor: function() {},
                toString: arrayToString,
                toLocaleString: $toLocaleString
            });
            addGetter($TypedArrayPrototype$, 'buffer', 'b');
            addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
            addGetter($TypedArrayPrototype$, 'byteLength', 'l');
            addGetter($TypedArrayPrototype$, 'length', 'e');
            dP($TypedArrayPrototype$, TAG, {
                get: function() {
                    return this[TYPED_ARRAY];
                }
            });
            module.exports = function(KEY, BYTES, wrapper, CLAMPED) {
                CLAMPED = !!CLAMPED;
                var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
                    , ISNT_UINT8 = NAME != 'Uint8Array'
                    , GETTER = 'get' + KEY
                    , SETTER = 'set' + KEY
                    , TypedArray = global[NAME]
                    , Base = TypedArray || {}
                    , TAC = TypedArray && getPrototypeOf(TypedArray)
                    , FORCED = !TypedArray || !$typed.ABV
                    , O = {}
                    , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
                var getter = function(that, index) {
                        var data = that._d;
                        return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
                    }
                    ;
                var setter = function(that, index, value) {
                        var data = that._d;
                        if (CLAMPED)
                            value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
                        data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
                    }
                    ;
                var addElement = function(that, index) {
                        dP(that, index, {
                            get: function() {
                                return getter(this, index);
                            },
                            set: function(value) {
                                return setter(this, index, value);
                            },
                            enumerable: true
                        });
                    }
                    ;
                if (FORCED) {
                    TypedArray = wrapper(function(that, data, $offset, $length) {
                        anInstance(that, TypedArray, NAME, '_d');
                        var index = 0, offset = 0, buffer, byteLength, length, klass;
                        if (!isObject(data)) {
                            length = strictToLength(data, true)
                            byteLength = length * BYTES;
                            buffer = new $ArrayBuffer(byteLength);
                        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
                            buffer = data;
                            offset = toOffset($offset, BYTES);
                            var $len = data.byteLength;
                            if ($length === undefined) {
                                if ($len % BYTES)
                                    throw RangeError(WRONG_LENGTH);
                                byteLength = $len - offset;
                                if (byteLength < 0)
                                    throw RangeError(WRONG_LENGTH);
                            } else {
                                byteLength = toLength($length) * BYTES;
                                if (byteLength + offset > $len)
                                    throw RangeError(WRONG_LENGTH);
                            }
                            length = byteLength / BYTES;
                        } else if (TYPED_ARRAY in data) {
                            return fromList(TypedArray, data);
                        } else {
                            return $from.call(TypedArray, data);
                        }
                        hide(that, '_d', {
                            b: buffer,
                            o: offset,
                            l: byteLength,
                            e: length,
                            v: new $DataView(buffer)
                        });
                        while (index < length)
                            addElement(that, index++);
                    });
                    TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
                    hide(TypedArrayPrototype, 'constructor', TypedArray);
                } else if (!$iterDetect(function(iter) {
                        new TypedArray(null );
                        new TypedArray(iter);
                    }, true)) {
                    TypedArray = wrapper(function(that, data, $offset, $length) {
                        anInstance(that, TypedArray, NAME);
                        var klass;
                        if (!isObject(data))
                            return new Base(strictToLength(data, ISNT_UINT8));
                        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
                            return $length !== undefined ? new Base(data,toOffset($offset, BYTES),$length) : $offset !== undefined ? new Base(data,toOffset($offset, BYTES)) : new Base(data);
                        }
                        if (TYPED_ARRAY in data)
                            return fromList(TypedArray, data);
                        return $from.call(TypedArray, data);
                    });
                    arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key) {
                        if (!(key in TypedArray))
                            hide(TypedArray, key, Base[key]);
                    });
                    TypedArray[PROTOTYPE] = TypedArrayPrototype;
                    if (!LIBRARY)
                        TypedArrayPrototype.constructor = TypedArray;
                }
                var $nativeIterator = TypedArrayPrototype[ITERATOR]
                    , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
                    , $iterator = $iterators.values;
                hide(TypedArray, TYPED_CONSTRUCTOR, true);
                hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
                hide(TypedArrayPrototype, VIEW, true);
                hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
                if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
                    dP(TypedArrayPrototype, TAG, {
                        get: function() {
                            return NAME;
                        }
                    });
                }
                O[NAME] = TypedArray;
                $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
                $export($export.S, NAME, {
                    BYTES_PER_ELEMENT: BYTES,
                    from: $from,
                    of: $of
                });
                if (!(BYTES_PER_ELEMENT in TypedArrayPrototype))
                    hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
                $export($export.P, NAME, proto);
                setSpecies(NAME);
                $export($export.P + $export.F * FORCED_SET, NAME, {
                    set: $set
                });
                $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
                $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {
                    toString: arrayToString
                });
                $export($export.P + $export.F * fails(function() {
                        new TypedArray(1).slice();
                    }), NAME, {
                    slice: $slice
                });
                $export($export.P + $export.F * (fails(function() {
                        return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
                    }) || !fails(function() {
                        TypedArrayPrototype.toLocaleString.call([1, 2]);
                    })), NAME, {
                    toLocaleString: $toLocaleString
                });
                Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
                if (!LIBRARY && !CORRECT_ITER_NAME)
                    hide(TypedArrayPrototype, ITERATOR, $iterator);
            }
            ;
        } else
            module.exports = function() {}
            ;
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Uint8', 1, function(init) {
            return function Uint8Array(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Uint8', 1, function(init) {
            return function Uint8ClampedArray(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        }, true);
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Int16', 2, function(init) {
            return function Int16Array(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Uint16', 2, function(init) {
            return function Uint16Array(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Int32', 4, function(init) {
            return function Int32Array(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Uint32', 4, function(init) {
            return function Uint32Array(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Float32', 4, function(init) {
            return function Float32Array(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(240)('Float64', 8, function(init) {
            return function Float64Array(data, byteOffset, length) {
                return init(this, data, byteOffset, length);
            }
                ;
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , aFunction = __webpack_require__(38)
            , anObject = __webpack_require__(29)
            , rApply = (__webpack_require__(21).Reflect || {}).apply
            , fApply = Function.apply;
        $export($export.S + $export.F * !__webpack_require__(24)(function() {
                rApply(function() {});
            }), 'Reflect', {
            apply: function apply(target, thisArgument, argumentsList) {
                var T = aFunction(target)
                    , L = anObject(argumentsList);
                return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , create = __webpack_require__(63)
            , aFunction = __webpack_require__(38)
            , anObject = __webpack_require__(29)
            , isObject = __webpack_require__(30)
            , fails = __webpack_require__(24)
            , bind = __webpack_require__(94)
            , rConstruct = (__webpack_require__(21).Reflect || {}).construct;
        var NEW_TARGET_BUG = fails(function() {
            function F() {}
            return !(rConstruct(function() {}, [], F)instanceof F);
        });
        var ARGS_BUG = !fails(function() {
            rConstruct(function() {});
        });
        $export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
            construct: function construct(Target, args) {
                aFunction(Target);
                anObject(args);
                var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
                if (ARGS_BUG && !NEW_TARGET_BUG)
                    return rConstruct(Target, args, newTarget);
                if (Target == newTarget) {
                    switch (args.length) {
                        case 0:
                            return new Target;
                        case 1:
                            return new Target(args[0]);
                        case 2:
                            return new Target(args[0],args[1]);
                        case 3:
                            return new Target(args[0],args[1],args[2]);
                        case 4:
                            return new Target(args[0],args[1],args[2],args[3]);
                    }
                    var $args = [null ];
                    $args.push.apply($args, args);
                    return new (bind.apply(Target, $args));
                }
                var proto = newTarget.prototype
                    , instance = create(isObject(proto) ? proto : Object.prototype)
                    , result = Function.apply.call(Target, instance, args);
                return isObject(result) ? result : instance;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(28)
            , $export = __webpack_require__(25)
            , anObject = __webpack_require__(29)
            , toPrimitive = __webpack_require__(33);
        $export($export.S + $export.F * __webpack_require__(24)(function() {
                Reflect.defineProperty(dP.f({}, 1, {
                    value: 1
                }), 1, {
                    value: 2
                });
            }), 'Reflect', {
            defineProperty: function defineProperty(target, propertyKey, attributes) {
                anObject(target);
                propertyKey = toPrimitive(propertyKey, true);
                anObject(attributes);
                try {
                    dP.f(target, propertyKey, attributes);
                    return true;
                } catch (e) {
                    return false;
                }
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , gOPD = __webpack_require__(68).f
            , anObject = __webpack_require__(29);
        $export($export.S, 'Reflect', {
            deleteProperty: function deleteProperty(target, propertyKey) {
                var desc = gOPD(anObject(target), propertyKey);
                return desc && !desc.configurable ? false : delete target[propertyKey];
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , anObject = __webpack_require__(29);
        var Enumerate = function(iterated) {
                this._t = anObject(iterated);
                this._i = 0;
                var keys = this._k = [], key;
                for (key in iterated)
                    keys.push(key);
            }
            ;
        __webpack_require__(147)(Enumerate, 'Object', function() {
            var that = this, keys = that._k, key;
            do {
                if (that._i >= keys.length)
                    return {
                        value: undefined,
                        done: true
                    };
            } while (!((key = keys[that._i++])in that._t));return {
                value: key,
                done: false
            };
        });
        $export($export.S, 'Reflect', {
            enumerate: function enumerate(target) {
                return new Enumerate(target);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var gOPD = __webpack_require__(68)
            , getPrototypeOf = __webpack_require__(76)
            , has = __webpack_require__(22)
            , $export = __webpack_require__(25)
            , isObject = __webpack_require__(30)
            , anObject = __webpack_require__(29);
        function get(target, propertyKey) {
            var receiver = arguments.length < 3 ? target : arguments[2], desc, proto;
            if (anObject(target) === receiver)
                return target[propertyKey];
            if (desc = gOPD.f(target, propertyKey))
                return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
            if (isObject(proto = getPrototypeOf(target)))
                return get(proto, propertyKey, receiver);
        }
        $export($export.S, 'Reflect', {
            get: get
        });
    }
    , function(module, exports, __webpack_require__) {
        var gOPD = __webpack_require__(68)
            , $export = __webpack_require__(25)
            , anObject = __webpack_require__(29);
        $export($export.S, 'Reflect', {
            getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
                return gOPD.f(anObject(target), propertyKey);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , getProto = __webpack_require__(76)
            , anObject = __webpack_require__(29);
        $export($export.S, 'Reflect', {
            getPrototypeOf: function getPrototypeOf(target) {
                return getProto(anObject(target));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Reflect', {
            has: function has(target, propertyKey) {
                return propertyKey in target;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , anObject = __webpack_require__(29)
            , $isExtensible = Object.isExtensible;
        $export($export.S, 'Reflect', {
            isExtensible: function isExtensible(target) {
                anObject(target);
                return $isExtensible ? $isExtensible(target) : true;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Reflect', {
            ownKeys: __webpack_require__(260)
        });
    }
    , function(module, exports, __webpack_require__) {
        var gOPN = __webpack_require__(67)
            , gOPS = __webpack_require__(60)
            , anObject = __webpack_require__(29)
            , Reflect = __webpack_require__(21).Reflect;
        module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
                var keys = gOPN.f(anObject(it))
                    , getSymbols = gOPS.f;
                return getSymbols ? keys.concat(getSymbols(it)) : keys;
            }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , anObject = __webpack_require__(29)
            , $preventExtensions = Object.preventExtensions;
        $export($export.S, 'Reflect', {
            preventExtensions: function preventExtensions(target) {
                anObject(target);
                try {
                    if ($preventExtensions)
                        $preventExtensions(target);
                    return true;
                } catch (e) {
                    return false;
                }
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(28)
            , gOPD = __webpack_require__(68)
            , getPrototypeOf = __webpack_require__(76)
            , has = __webpack_require__(22)
            , $export = __webpack_require__(25)
            , createDesc = __webpack_require__(34)
            , anObject = __webpack_require__(29)
            , isObject = __webpack_require__(30);
        function set(target, propertyKey, V) {
            var receiver = arguments.length < 4 ? target : arguments[3], ownDesc = gOPD.f(anObject(target), propertyKey), existingDescriptor, proto;
            if (!ownDesc) {
                if (isObject(proto = getPrototypeOf(target))) {
                    return set(proto, propertyKey, V, receiver);
                }
                ownDesc = createDesc(0);
            }
            if (has(ownDesc, 'value')) {
                if (ownDesc.writable === false || !isObject(receiver))
                    return false;
                existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
                existingDescriptor.value = V;
                dP.f(receiver, propertyKey, existingDescriptor);
                return true;
            }
            return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V),
                true);
        }
        $export($export.S, 'Reflect', {
            set: set
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , setProto = __webpack_require__(90);
        if (setProto)
            $export($export.S, 'Reflect', {
                setPrototypeOf: function setPrototypeOf(target, proto) {
                    setProto.check(target, proto);
                    try {
                        setProto.set(target, proto);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
            });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $includes = __webpack_require__(53)(true);
        $export($export.P, 'Array', {
            includes: function includes(el) {
                return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
            }
        });
        __webpack_require__(203)('includes');
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $at = __webpack_require__(144)(true);
        $export($export.P, 'String', {
            at: function at(pos) {
                return $at(this, pos);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $pad = __webpack_require__(267);
        $export($export.P, 'String', {
            padStart: function padStart(maxLength) {
                return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var toLength = __webpack_require__(54)
            , repeat = __webpack_require__(108)
            , defined = __webpack_require__(52);
        module.exports = function(that, maxLength, fillString, left) {
            var S = String(defined(that))
                , stringLength = S.length
                , fillStr = fillString === undefined ? ' ' : String(fillString)
                , intMaxLength = toLength(maxLength);
            if (intMaxLength <= stringLength || fillStr == '')
                return S;
            var fillLen = intMaxLength - stringLength
                , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
            if (stringFiller.length > fillLen)
                stringFiller = stringFiller.slice(0, fillLen);
            return left ? stringFiller + S : S + stringFiller;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , $pad = __webpack_require__(267);
        $export($export.P, 'String', {
            padEnd: function padEnd(maxLength) {
                return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(100)('trimLeft', function($trim) {
            return function trimLeft() {
                return $trim(this, 1);
            }
                ;
        }, 'trimStart');
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        __webpack_require__(100)('trimRight', function($trim) {
            return function trimRight() {
                return $trim(this, 2);
            }
                ;
        }, 'trimEnd');
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , defined = __webpack_require__(52)
            , toLength = __webpack_require__(54)
            , isRegExp = __webpack_require__(151)
            , getFlags = __webpack_require__(213)
            , RegExpProto = RegExp.prototype;
        var $RegExpStringIterator = function(regexp, string) {
                this._r = regexp;
                this._s = string;
            }
            ;
        __webpack_require__(147)($RegExpStringIterator, 'RegExp String', function next() {
            var match = this._r.exec(this._s);
            return {
                value: match,
                done: match === null
            };
        });
        $export($export.P, 'String', {
            matchAll: function matchAll(regexp) {
                defined(this);
                if (!isRegExp(regexp))
                    throw TypeError(regexp + ' is not a regexp!');
                var S = String(this)
                    , flags = 'flags'in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
                    , rx = new RegExp(regexp.source,~flags.indexOf('g') ? flags : 'g' + flags);
                rx.lastIndex = toLength(regexp.lastIndex);
                return new $RegExpStringIterator(rx,S);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(44)('asyncIterator');
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(44)('observable');
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , ownKeys = __webpack_require__(260)
            , toIObject = __webpack_require__(49)
            , gOPD = __webpack_require__(68)
            , createProperty = __webpack_require__(180);
        $export($export.S, 'Object', {
            getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
                var O = toIObject(object), getDesc = gOPD.f, keys = ownKeys(O), result = {}, i = 0, key;
                while (keys.length > i)
                    createProperty(result, key = keys[i++], getDesc(O, key));
                return result;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $values = __webpack_require__(276)(false);
        $export($export.S, 'Object', {
            values: function values(it) {
                return $values(it);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var getKeys = __webpack_require__(47)
            , toIObject = __webpack_require__(49)
            , isEnum = __webpack_require__(61).f;
        module.exports = function(isEntries) {
            return function(it) {
                var O = toIObject(it), keys = getKeys(O), length = keys.length, i = 0, result = [], key;
                while (length > i)
                    if (isEnum.call(O, key = keys[i++])) {
                        result.push(isEntries ? [key, O[key]] : O[key]);
                    }
                return result;
            }
                ;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $entries = __webpack_require__(276)(true);
        $export($export.S, 'Object', {
            entries: function entries(it) {
                return $entries(it);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toObject = __webpack_require__(75)
            , aFunction = __webpack_require__(38)
            , $defineProperty = __webpack_require__(28);
        __webpack_require__(23) && $export($export.P + __webpack_require__(279), 'Object', {
            __defineGetter__: function __defineGetter__(P, getter) {
                $defineProperty.f(toObject(this), P, {
                    get: aFunction(getter),
                    enumerable: true,
                    configurable: true
                });
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(45) || !__webpack_require__(24)(function() {
                var K = Math.random();
                __defineSetter__.call(null , K, function() {});
                delete __webpack_require__(21)[K];
            });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toObject = __webpack_require__(75)
            , aFunction = __webpack_require__(38)
            , $defineProperty = __webpack_require__(28);
        __webpack_require__(23) && $export($export.P + __webpack_require__(279), 'Object', {
            __defineSetter__: function __defineSetter__(P, setter) {
                $defineProperty.f(toObject(this), P, {
                    set: aFunction(setter),
                    enumerable: true,
                    configurable: true
                });
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toObject = __webpack_require__(75)
            , toPrimitive = __webpack_require__(33)
            , getPrototypeOf = __webpack_require__(76)
            , getOwnPropertyDescriptor = __webpack_require__(68).f;
        __webpack_require__(23) && $export($export.P + __webpack_require__(279), 'Object', {
            __lookupGetter__: function __lookupGetter__(P) {
                var O = toObject(this), K = toPrimitive(P, true), D;
                do {
                    if (D = getOwnPropertyDescriptor(O, K))
                        return D.get;
                } while (O = getPrototypeOf(O));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , toObject = __webpack_require__(75)
            , toPrimitive = __webpack_require__(33)
            , getPrototypeOf = __webpack_require__(76)
            , getOwnPropertyDescriptor = __webpack_require__(68).f;
        __webpack_require__(23) && $export($export.P + __webpack_require__(279), 'Object', {
            __lookupSetter__: function __lookupSetter__(P) {
                var O = toObject(this), K = toPrimitive(P, true), D;
                do {
                    if (D = getOwnPropertyDescriptor(O, K))
                        return D.set;
                } while (O = getPrototypeOf(O));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.P + $export.R, 'Map', {
            toJSON: __webpack_require__(284)('Map')
        });
    }
    , function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(92)
            , from = __webpack_require__(285);
        module.exports = function(NAME) {
            return function toJSON() {
                if (classof(this) != NAME)
                    throw TypeError(NAME + "#toJSON isn't generic");
                return from(this);
            }
                ;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var forOf = __webpack_require__(223);
        module.exports = function(iter, ITERATOR) {
            var result = [];
            forOf(iter, false, result.push, result, ITERATOR);
            return result;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.P + $export.R, 'Set', {
            toJSON: __webpack_require__(284)('Set')
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'System', {
            global: __webpack_require__(21)
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , cof = __webpack_require__(51);
        $export($export.S, 'Error', {
            isError: function isError(it) {
                return cof(it) === 'Error';
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            iaddh: function iaddh(x0, x1, y0, y1) {
                var $x0 = x0 >>> 0
                    , $x1 = x1 >>> 0
                    , $y0 = y0 >>> 0;
                return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            isubh: function isubh(x0, x1, y0, y1) {
                var $x0 = x0 >>> 0
                    , $x1 = x1 >>> 0
                    , $y0 = y0 >>> 0;
                return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            imulh: function imulh(u, v) {
                var UINT16 = 0xffff
                    , $u = +u
                    , $v = +v
                    , u0 = $u & UINT16
                    , v0 = $v & UINT16
                    , u1 = $u >> 16
                    , v1 = $v >> 16
                    , t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
                return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25);
        $export($export.S, 'Math', {
            umulh: function umulh(u, v) {
                var UINT16 = 0xffff
                    , $u = +u
                    , $v = +v
                    , u0 = $u & UINT16
                    , v0 = $v & UINT16
                    , u1 = $u >>> 16
                    , v1 = $v >>> 16
                    , t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
                return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , toMetaKey = metadata.key
            , ordinaryDefineOwnMetadata = metadata.set;
        metadata.exp({
            defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
                ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var Map = __webpack_require__(228)
            , $export = __webpack_require__(25)
            , shared = __webpack_require__(40)('metadata')
            , store = shared.store || (shared.store = new (__webpack_require__(232)));
        var getOrCreateMetadataMap = function(target, targetKey, create) {
                var targetMetadata = store.get(target);
                if (!targetMetadata) {
                    if (!create)
                        return undefined;
                    store.set(target, targetMetadata = new Map);
                }
                var keyMetadata = targetMetadata.get(targetKey);
                if (!keyMetadata) {
                    if (!create)
                        return undefined;
                    targetMetadata.set(targetKey, keyMetadata = new Map);
                }
                return keyMetadata;
            }
            ;
        var ordinaryHasOwnMetadata = function(MetadataKey, O, P) {
                var metadataMap = getOrCreateMetadataMap(O, P, false);
                return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
            }
            ;
        var ordinaryGetOwnMetadata = function(MetadataKey, O, P) {
                var metadataMap = getOrCreateMetadataMap(O, P, false);
                return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
            }
            ;
        var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P) {
                getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
            }
            ;
        var ordinaryOwnMetadataKeys = function(target, targetKey) {
                var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
                    , keys = [];
                if (metadataMap)
                    metadataMap.forEach(function(_, key) {
                        keys.push(key);
                    });
                return keys;
            }
            ;
        var toMetaKey = function(it) {
                return it === undefined || typeof it == 'symbol' ? it : String(it);
            }
            ;
        var exp = function(O) {
                $export($export.S, 'Reflect', O);
            }
            ;
        module.exports = {
            store: store,
            map: getOrCreateMetadataMap,
            has: ordinaryHasOwnMetadata,
            get: ordinaryGetOwnMetadata,
            set: ordinaryDefineOwnMetadata,
            keys: ordinaryOwnMetadataKeys,
            key: toMetaKey,
            exp: exp
        };
    }
    , function(module, exports, __webpack_require__) {
        var metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , toMetaKey = metadata.key
            , getOrCreateMetadataMap = metadata.map
            , store = metadata.store;
        metadata.exp({
            deleteMetadata: function deleteMetadata(metadataKey, target) {
                var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
                    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
                if (metadataMap === undefined || !metadataMap['delete'](metadataKey))
                    return false;
                if (metadataMap.size)
                    return true;
                var targetMetadata = store.get(target);
                targetMetadata['delete'](targetKey);
                return !!targetMetadata.size || store['delete'](target);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , getPrototypeOf = __webpack_require__(76)
            , ordinaryHasOwnMetadata = metadata.has
            , ordinaryGetOwnMetadata = metadata.get
            , toMetaKey = metadata.key;
        var ordinaryGetMetadata = function(MetadataKey, O, P) {
                var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
                if (hasOwn)
                    return ordinaryGetOwnMetadata(MetadataKey, O, P);
                var parent = getPrototypeOf(O);
                return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
            }
            ;
        metadata.exp({
            getMetadata: function getMetadata(metadataKey, target) {
                return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var Set = __webpack_require__(231)
            , from = __webpack_require__(285)
            , metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , getPrototypeOf = __webpack_require__(76)
            , ordinaryOwnMetadataKeys = metadata.keys
            , toMetaKey = metadata.key;
        var ordinaryMetadataKeys = function(O, P) {
                var oKeys = ordinaryOwnMetadataKeys(O, P)
                    , parent = getPrototypeOf(O);
                if (parent === null )
                    return oKeys;
                var pKeys = ordinaryMetadataKeys(parent, P);
                return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
            }
            ;
        metadata.exp({
            getMetadataKeys: function getMetadataKeys(target) {
                return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , ordinaryGetOwnMetadata = metadata.get
            , toMetaKey = metadata.key;
        metadata.exp({
            getOwnMetadata: function getOwnMetadata(metadataKey, target) {
                return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , ordinaryOwnMetadataKeys = metadata.keys
            , toMetaKey = metadata.key;
        metadata.exp({
            getOwnMetadataKeys: function getOwnMetadataKeys(target) {
                return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , getPrototypeOf = __webpack_require__(76)
            , ordinaryHasOwnMetadata = metadata.has
            , toMetaKey = metadata.key;
        var ordinaryHasMetadata = function(MetadataKey, O, P) {
                var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
                if (hasOwn)
                    return true;
                var parent = getPrototypeOf(O);
                return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
            }
            ;
        metadata.exp({
            hasMetadata: function hasMetadata(metadataKey, target) {
                return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , ordinaryHasOwnMetadata = metadata.has
            , toMetaKey = metadata.key;
        metadata.exp({
            hasOwnMetadata: function hasOwnMetadata(metadataKey, target) {
                return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var metadata = __webpack_require__(294)
            , anObject = __webpack_require__(29)
            , aFunction = __webpack_require__(38)
            , toMetaKey = metadata.key
            , ordinaryDefineOwnMetadata = metadata.set;
        metadata.exp({
            metadata: function metadata(metadataKey, metadataValue) {
                return function decorator(target, targetKey) {
                    ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
                }
                    ;
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , microtask = __webpack_require__(226)()
            , process = __webpack_require__(21).process
            , isNode = __webpack_require__(51)(process) == 'process';
        $export($export.G, {
            asap: function asap(fn) {
                var domain = isNode && process.domain;
                microtask(domain ? domain.bind(fn) : fn);
            }
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var $export = __webpack_require__(25)
            , global = __webpack_require__(21)
            , core = __webpack_require__(26)
            , microtask = __webpack_require__(226)()
            , OBSERVABLE = __webpack_require__(42)('observable')
            , aFunction = __webpack_require__(38)
            , anObject = __webpack_require__(29)
            , anInstance = __webpack_require__(222)
            , redefineAll = __webpack_require__(227)
            , hide = __webpack_require__(27)
            , forOf = __webpack_require__(223)
            , RETURN = forOf.RETURN;
        var getMethod = function(fn) {
                return fn == null ? undefined : aFunction(fn);
            }
            ;
        var cleanupSubscription = function(subscription) {
                var cleanup = subscription._c;
                if (cleanup) {
                    subscription._c = undefined;
                    cleanup();
                }
            }
            ;
        var subscriptionClosed = function(subscription) {
                return subscription._o === undefined;
            }
            ;
        var closeSubscription = function(subscription) {
                if (!subscriptionClosed(subscription)) {
                    subscription._o = undefined;
                    cleanupSubscription(subscription);
                }
            }
            ;
        var Subscription = function(observer, subscriber) {
                anObject(observer);
                this._c = undefined;
                this._o = observer;
                observer = new SubscriptionObserver(this);
                try {
                    var cleanup = subscriber(observer)
                        , subscription = cleanup;
                    if (cleanup != null ) {
                        if (typeof cleanup.unsubscribe === 'function')
                            cleanup = function() {
                                subscription.unsubscribe();
                            }
                            ;
                        else
                            aFunction(cleanup);
                        this._c = cleanup;
                    }
                } catch (e) {
                    observer.error(e);
                    return;
                }
                if (subscriptionClosed(this))
                    cleanupSubscription(this);
            }
            ;
        Subscription.prototype = redefineAll({}, {
            unsubscribe: function unsubscribe() {
                closeSubscription(this);
            }
        });
        var SubscriptionObserver = function(subscription) {
                this._s = subscription;
            }
            ;
        SubscriptionObserver.prototype = redefineAll({}, {
            next: function next(value) {
                var subscription = this._s;
                if (!subscriptionClosed(subscription)) {
                    var observer = subscription._o;
                    try {
                        var m = getMethod(observer.next);
                        if (m)
                            return m.call(observer, value);
                    } catch (e) {
                        try {
                            closeSubscription(subscription);
                        } finally {
                            throw e;
                        }
                    }
                }
            },
            error: function error(value) {
                var subscription = this._s;
                if (subscriptionClosed(subscription))
                    throw value;
                var observer = subscription._o;
                subscription._o = undefined;
                try {
                    var m = getMethod(observer.error);
                    if (!m)
                        throw value;
                    value = m.call(observer, value);
                } catch (e) {
                    try {
                        cleanupSubscription(subscription);
                    } finally {
                        throw e;
                    }
                }
                cleanupSubscription(subscription);
                return value;
            },
            complete: function complete(value) {
                var subscription = this._s;
                if (!subscriptionClosed(subscription)) {
                    var observer = subscription._o;
                    subscription._o = undefined;
                    try {
                        var m = getMethod(observer.complete);
                        value = m ? m.call(observer, value) : undefined;
                    } catch (e) {
                        try {
                            cleanupSubscription(subscription);
                        } finally {
                            throw e;
                        }
                    }
                    cleanupSubscription(subscription);
                    return value;
                }
            }
        });
        var $Observable = function Observable(subscriber) {
                anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
            }
            ;
        redefineAll($Observable.prototype, {
            subscribe: function subscribe(observer) {
                return new Subscription(observer,this._f);
            },
            forEach: function forEach(fn) {
                var that = this;
                return new (core.Promise || global.Promise)(function(resolve, reject) {
                        aFunction(fn);
                        var subscription = that.subscribe({
                            next: function(value) {
                                try {
                                    return fn(value);
                                } catch (e) {
                                    reject(e);
                                    subscription.unsubscribe();
                                }
                            },
                            error: reject,
                            complete: resolve
                        });
                    }
                );
            }
        });
        redefineAll($Observable, {
            from: function from(x) {
                var C = typeof this === 'function' ? this : $Observable;
                var method = getMethod(anObject(x)[OBSERVABLE]);
                if (method) {
                    var observable = anObject(method.call(x));
                    return observable.constructor === C ? observable : new C(function(observer) {
                            return observable.subscribe(observer);
                        }
                    );
                }
                return new C(function(observer) {
                        var done = false;
                        microtask(function() {
                            if (!done) {
                                try {
                                    if (forOf(x, false, function(it) {
                                            observer.next(it);
                                            if (done)
                                                return RETURN;
                                        }) === RETURN)
                                        return;
                                } catch (e) {
                                    if (done)
                                        throw e;
                                    observer.error(e);
                                    return;
                                }
                                observer.complete();
                            }
                        });
                        return function() {
                            done = true;
                        }
                            ;
                    }
                );
            },
            of: function of() {
                for (var i = 0, l = arguments.length, items = Array(l); i < l; )
                    items[i] = arguments[i++];
                return new (typeof this === 'function' ? this : $Observable)(function(observer) {
                        var done = false;
                        microtask(function() {
                            if (!done) {
                                for (var i = 0; i < items.length; ++i) {
                                    observer.next(items[i]);
                                    if (done)
                                        return;
                                }
                                observer.complete();
                            }
                        });
                        return function() {
                            done = true;
                        }
                            ;
                    }
                );
            }
        });
        hide($Observable.prototype, OBSERVABLE, function() {
            return this;
        });
        $export($export.G, {
            Observable: $Observable
        });
        __webpack_require__(209)('Observable');
    }
    , function(module, exports, __webpack_require__) {
        var global = __webpack_require__(21)
            , $export = __webpack_require__(25)
            , invoke = __webpack_require__(95)
            , partial = __webpack_require__(306)
            , navigator = global.navigator
            , MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent);
        var wrap = function(set) {
                return MSIE ? function(fn, time) {
                    return set(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
                }
                    : set;
            }
            ;
        $export($export.G + $export.B + $export.F * MSIE, {
            setTimeout: wrap(global.setTimeout),
            setInterval: wrap(global.setInterval)
        });
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        var path = __webpack_require__(307)
            , invoke = __webpack_require__(95)
            , aFunction = __webpack_require__(38);
        module.exports = function() {
            var fn = aFunction(this)
                , length = arguments.length
                , pargs = Array(length)
                , i = 0
                , _ = path._
                , holder = false;
            while (length > i)
                if ((pargs[i] = arguments[i++]) === _)
                    holder = true;
            return function() {
                var that = this, aLen = arguments.length, j = 0, k = 0, args;
                if (!holder && !aLen)
                    return invoke(fn, pargs, that);
                args = pargs.slice();
                if (holder)
                    for (; length > j; j++)
                        if (args[j] === _)
                            args[j] = arguments[k++];
                while (aLen > k)
                    args.push(arguments[k++]);
                return invoke(fn, args, that);
            }
                ;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(21);
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $task = __webpack_require__(225);
        $export($export.G + $export.B, {
            setImmediate: $task.set,
            clearImmediate: $task.clear
        });
    }
    , function(module, exports, __webpack_require__) {
        var $iterators = __webpack_require__(210)
            , redefine = __webpack_require__(35)
            , global = __webpack_require__(21)
            , hide = __webpack_require__(27)
            , Iterators = __webpack_require__(146)
            , wks = __webpack_require__(42)
            , ITERATOR = wks('iterator')
            , TO_STRING_TAG = wks('toStringTag')
            , ArrayValues = Iterators.Array;
        for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
            var NAME = collections[i], Collection = global[NAME], proto = Collection && Collection.prototype, key;
            if (proto) {
                if (!proto[ITERATOR])
                    hide(proto, ITERATOR, ArrayValues);
                if (!proto[TO_STRING_TAG])
                    hide(proto, TO_STRING_TAG, NAME);
                Iterators[NAME] = ArrayValues;
                for (key in $iterators)
                    if (!proto[key])
                        redefine(proto, key, $iterators[key], true);
            }
        }
    }
    , function(module, exports, __webpack_require__) {
        (function(global, process) {
            !(function(global) {
                "use strict";
                var hasOwn = Object.prototype.hasOwnProperty;
                var undefined;
                var $Symbol = typeof Symbol === "function" ? Symbol : {};
                var iteratorSymbol = $Symbol.iterator || "@@iterator";
                var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
                var inModule = typeof module === "object";
                var runtime = global.regeneratorRuntime;
                if (runtime) {
                    if (inModule) {
                        module.exports = runtime;
                    }
                    return;
                }
                runtime = global.regeneratorRuntime = inModule ? module.exports : {};
                function wrap(innerFn, outerFn, self, tryLocsList) {
                    var generator = Object.create((outerFn || Generator).prototype);
                    var context = new Context(tryLocsList || []);
                    generator._invoke = makeInvokeMethod(innerFn, self, context);
                    return generator;
                }
                runtime.wrap = wrap;
                function tryCatch(fn, obj, arg) {
                    try {
                        return {
                            type: "normal",
                            arg: fn.call(obj, arg)
                        };
                    } catch (err) {
                        return {
                            type: "throw",
                            arg: err
                        };
                    }
                }
                var GenStateSuspendedStart = "suspendedStart";
                var GenStateSuspendedYield = "suspendedYield";
                var GenStateExecuting = "executing";
                var GenStateCompleted = "completed";
                var ContinueSentinel = {};
                function Generator() {}
                function GeneratorFunction() {}
                function GeneratorFunctionPrototype() {}
                var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
                GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
                GeneratorFunctionPrototype.constructor = GeneratorFunction;
                GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
                function defineIteratorMethods(prototype) {
                    ["next", "throw", "return"].forEach(function(method) {
                        prototype[method] = function(arg) {
                            return this._invoke(method, arg);
                        }
                        ;
                    });
                }
                runtime.isGeneratorFunction = function(genFun) {
                    var ctor = typeof genFun === "function" && genFun.constructor;
                    return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
                }
                ;
                runtime.mark = function(genFun) {
                    if (Object.setPrototypeOf) {
                        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
                    } else {
                        genFun.__proto__ = GeneratorFunctionPrototype;
                        if (!(toStringTagSymbol in genFun)) {
                            genFun[toStringTagSymbol] = "GeneratorFunction";
                        }
                    }
                    genFun.prototype = Object.create(Gp);
                    return genFun;
                }
                ;
                runtime.awrap = function(arg) {
                    return new AwaitArgument(arg);
                }
                ;
                function AwaitArgument(arg) {
                    this.arg = arg;
                }
                function AsyncIterator(generator) {
                    function invoke(method, arg, resolve, reject) {
                        var record = tryCatch(generator[method], generator, arg);
                        if (record.type === "throw") {
                            reject(record.arg);
                        } else {
                            var result = record.arg;
                            var value = result.value;
                            if (value instanceof AwaitArgument) {
                                return Promise.resolve(value.arg).then(function(value) {
                                    invoke("next", value, resolve, reject);
                                }, function(err) {
                                    invoke("throw", err, resolve, reject);
                                });
                            }
                            return Promise.resolve(value).then(function(unwrapped) {
                                result.value = unwrapped;
                                resolve(result);
                            }, reject);
                        }
                    }
                    if (typeof process === "object" && process.domain) {
                        invoke = process.domain.bind(invoke);
                    }
                    var previousPromise;
                    function enqueue(method, arg) {
                        function callInvokeWithMethodAndArg() {
                            return new Promise(function(resolve, reject) {
                                    invoke(method, arg, resolve, reject);
                                }
                            );
                        }
                        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
                    }
                    this._invoke = enqueue;
                }
                defineIteratorMethods(AsyncIterator.prototype);
                runtime.async = function(innerFn, outerFn, self, tryLocsList) {
                    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
                    return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
                        return result.done ? result.value : iter.next();
                    });
                }
                ;
                function makeInvokeMethod(innerFn, self, context) {
                    var state = GenStateSuspendedStart;
                    return function invoke(method, arg) {
                        if (state === GenStateExecuting) {
                            throw new Error("Generator is already running");
                        }
                        if (state === GenStateCompleted) {
                            if (method === "throw") {
                                throw arg;
                            }
                            return doneResult();
                        }
                        while (true) {
                            var delegate = context.delegate;
                            if (delegate) {
                                if (method === "return" || (method === "throw" && delegate.iterator[method] === undefined)) {
                                    context.delegate = null ;
                                    var returnMethod = delegate.iterator["return"];
                                    if (returnMethod) {
                                        var record = tryCatch(returnMethod, delegate.iterator, arg);
                                        if (record.type === "throw") {
                                            method = "throw";
                                            arg = record.arg;
                                            continue;
                                        }
                                    }
                                    if (method === "return") {
                                        continue;
                                    }
                                }
                                var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
                                if (record.type === "throw") {
                                    context.delegate = null ;
                                    method = "throw";
                                    arg = record.arg;
                                    continue;
                                }
                                method = "next";
                                arg = undefined;
                                var info = record.arg;
                                if (info.done) {
                                    context[delegate.resultName] = info.value;
                                    context.next = delegate.nextLoc;
                                } else {
                                    state = GenStateSuspendedYield;
                                    return info;
                                }
                                context.delegate = null ;
                            }
                            if (method === "next") {
                                context.sent = context._sent = arg;
                            } else if (method === "throw") {
                                if (state === GenStateSuspendedStart) {
                                    state = GenStateCompleted;
                                    throw arg;
                                }
                                if (context.dispatchException(arg)) {
                                    method = "next";
                                    arg = undefined;
                                }
                            } else if (method === "return") {
                                context.abrupt("return", arg);
                            }
                            state = GenStateExecuting;
                            var record = tryCatch(innerFn, self, context);
                            if (record.type === "normal") {
                                state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                                var info = {
                                    value: record.arg,
                                    done: context.done
                                };
                                if (record.arg === ContinueSentinel) {
                                    if (context.delegate && method === "next") {
                                        arg = undefined;
                                    }
                                } else {
                                    return info;
                                }
                            } else if (record.type === "throw") {
                                state = GenStateCompleted;
                                method = "throw";
                                arg = record.arg;
                            }
                        }
                    }
                        ;
                }
                defineIteratorMethods(Gp);
                Gp[iteratorSymbol] = function() {
                    return this;
                }
                ;
                Gp[toStringTagSymbol] = "Generator";
                Gp.toString = function() {
                    return "[object Generator]";
                }
                ;
                function pushTryEntry(locs) {
                    var entry = {
                        tryLoc: locs[0]
                    };
                    if (1 in locs) {
                        entry.catchLoc = locs[1];
                    }
                    if (2 in locs) {
                        entry.finallyLoc = locs[2];
                        entry.afterLoc = locs[3];
                    }
                    this.tryEntries.push(entry);
                }
                function resetTryEntry(entry) {
                    var record = entry.completion || {};
                    record.type = "normal";
                    delete record.arg;
                    entry.completion = record;
                }
                function Context(tryLocsList) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }];
                    tryLocsList.forEach(pushTryEntry, this);
                    this.reset(true);
                }
                runtime.keys = function(object) {
                    var keys = [];
                    for (var key in object) {
                        keys.push(key);
                    }
                    keys.reverse();
                    return function next() {
                        while (keys.length) {
                            var key = keys.pop();
                            if (key in object) {
                                next.value = key;
                                next.done = false;
                                return next;
                            }
                        }
                        next.done = true;
                        return next;
                    }
                        ;
                }
                ;
                function values(iterable) {
                    if (iterable) {
                        var iteratorMethod = iterable[iteratorSymbol];
                        if (iteratorMethod) {
                            return iteratorMethod.call(iterable);
                        }
                        if (typeof iterable.next === "function") {
                            return iterable;
                        }
                        if (!isNaN(iterable.length)) {
                            var i = -1
                                , next = function next() {
                                    while (++i < iterable.length) {
                                        if (hasOwn.call(iterable, i)) {
                                            next.value = iterable[i];
                                            next.done = false;
                                            return next;
                                        }
                                    }
                                    next.value = undefined;
                                    next.done = true;
                                    return next;
                                }
                                ;
                            return next.next = next;
                        }
                    }
                    return {
                        next: doneResult
                    };
                }
                runtime.values = values;
                function doneResult() {
                    return {
                        value: undefined,
                        done: true
                    };
                }
                Context.prototype = {
                    constructor: Context,
                    reset: function(skipTempReset) {
                        this.prev = 0;
                        this.next = 0;
                        this.sent = this._sent = undefined;
                        this.done = false;
                        this.delegate = null ;
                        this.tryEntries.forEach(resetTryEntry);
                        if (!skipTempReset) {
                            for (var name in this) {
                                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                                    this[name] = undefined;
                                }
                            }
                        }
                    },
                    stop: function() {
                        this.done = true;
                        var rootEntry = this.tryEntries[0];
                        var rootRecord = rootEntry.completion;
                        if (rootRecord.type === "throw") {
                            throw rootRecord.arg;
                        }
                        return this.rval;
                    },
                    dispatchException: function(exception) {
                        if (this.done) {
                            throw exception;
                        }
                        var context = this;
                        function handle(loc, caught) {
                            record.type = "throw";
                            record.arg = exception;
                            context.next = loc;
                            return !!caught;
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            var record = entry.completion;
                            if (entry.tryLoc === "root") {
                                return handle("end");
                            }
                            if (entry.tryLoc <= this.prev) {
                                var hasCatch = hasOwn.call(entry, "catchLoc");
                                var hasFinally = hasOwn.call(entry, "finallyLoc");
                                if (hasCatch && hasFinally) {
                                    if (this.prev < entry.catchLoc) {
                                        return handle(entry.catchLoc, true);
                                    } else if (this.prev < entry.finallyLoc) {
                                        return handle(entry.finallyLoc);
                                    }
                                } else if (hasCatch) {
                                    if (this.prev < entry.catchLoc) {
                                        return handle(entry.catchLoc, true);
                                    }
                                } else if (hasFinally) {
                                    if (this.prev < entry.finallyLoc) {
                                        return handle(entry.finallyLoc);
                                    }
                                } else {
                                    throw new Error("try statement without catch or finally");
                                }
                            }
                        }
                    },
                    abrupt: function(type, arg) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                                var finallyEntry = entry;
                                break;
                            }
                        }
                        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                            finallyEntry = null ;
                        }
                        var record = finallyEntry ? finallyEntry.completion : {};
                        record.type = type;
                        record.arg = arg;
                        if (finallyEntry) {
                            this.next = finallyEntry.finallyLoc;
                        } else {
                            this.complete(record);
                        }
                        return ContinueSentinel;
                    },
                    complete: function(record, afterLoc) {
                        if (record.type === "throw") {
                            throw record.arg;
                        }
                        if (record.type === "break" || record.type === "continue") {
                            this.next = record.arg;
                        } else if (record.type === "return") {
                            this.rval = record.arg;
                            this.next = "end";
                        } else if (record.type === "normal" && afterLoc) {
                            this.next = afterLoc;
                        }
                    },
                    finish: function(finallyLoc) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.finallyLoc === finallyLoc) {
                                this.complete(entry.completion, entry.afterLoc);
                                resetTryEntry(entry);
                                return ContinueSentinel;
                            }
                        }
                    },
                    "catch": function(tryLoc) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.tryLoc === tryLoc) {
                                var record = entry.completion;
                                if (record.type === "throw") {
                                    var thrown = record.arg;
                                    resetTryEntry(entry);
                                }
                                return thrown;
                            }
                        }
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(iterable, resultName, nextLoc) {
                        this.delegate = {
                            iterator: values(iterable),
                            resultName: resultName,
                            nextLoc: nextLoc
                        };
                        return ContinueSentinel;
                    }
                };
            })(typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this);
        }
            .call(exports, (function() {
                return this;
            }()), __webpack_require__(311)))
    }
    , function(module, exports) {
        var process = module.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
        }
        function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
        }
        (function() {
            try {
                if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }())
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                return setTimeout(fun, 0);
            }
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null , fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                return clearTimeout(marker);
            }
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null , marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }
        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null ;
            draining = false;
            runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun,args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        }
        ;
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null , this.array);
        }
        ;
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = '';
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
            throw new Error('process.binding is not supported');
        }
        ;
        process.cwd = function() {
            return '/'
        }
        ;
        process.chdir = function(dir) {
            throw new Error('process.chdir is not supported');
        }
        ;
        process.umask = function() {
            return 0;
        }
        ;
    }
    , function(module, exports, __webpack_require__) {
        __webpack_require__(313);
        module.exports = __webpack_require__(26).RegExp.escape;
    }
    , function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(25)
            , $re = __webpack_require__(314)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
        $export($export.S, 'RegExp', {
            escape: function escape(it) {
                return $re(it);
            }
        });
    }
    , function(module, exports) {
        module.exports = function(regExp, replace) {
            var replacer = replace === Object(replace) ? function(part) {
                return replace[part];
            }
                : replace;
            return function(it) {
                return String(it).replace(regExp, replacer);
            }
                ;
        }
        ;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
            }
                : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }
            ;
        var created = false;
        var state = {};
        var events = {};
        var defaultEventType = 'all';
        var isDispatching = false;
        var currentReducer = function currentReducer() {
                return state;
            }
            ;
        var store = {
            getState: function getState(key) {
                return key ? state[key] : state;
            },
            subscribe: function subscribe(listener, eventType) {
                if (!eventType.startsWith('change:')) {
                    eventType = 'change:' + eventType;
                }
                if (typeof listener !== 'function') {
                    throw new Error('Expected listener to be a function.');
                }
                eventType = eventType || defaultEventType;
                events[eventType] = events[eventType] || [];
                if (!~events[eventType].indexOf(listener)) {
                    events[eventType].push(listener);
                }
            },
            unsubscribe: function unsubscribe(listener, eventType) {
                var index;
                if (typeof listener !== 'function') {
                    throw new Error('Expected listener to be a function.');
                }
                eventType = eventType || defaultEventType;
                if (events[eventType] && (index = events[eventType].indexOf(listener))) {
                    events[eventType].splice(index, 1);
                }
            },
            dispatch: function dispatch(action) {
                var currentState;
                var prevState;
                if (typeof action.type === 'undefined') {
                    throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
                }
                if (isDispatching) {
                    throw new Error('Reducers may not dispatch actions.');
                }
                try {
                    isDispatching = true;
                    currentState = currentReducer(state, action);
                } finally {
                    isDispatching = false;
                }
                if (currentState && currentState !== state) {
                    var changed = false;
                    prevState = state;
                    state = currentState;
                    Object.keys(state).forEach(function(key) {
                        if (prevState[key] !== state[key]) {
                            var currentEvents = events['change:' + key];
                            changed = changed || true;
                            if (currentEvents) {
                                currentEvents.forEach(function(listener) {
                                    listener();
                                });
                            }
                        }
                    });
                    if (changed) {
                        var currentEvents = events['change:' + defaultEventType];
                        if (currentEvents) {
                            currentEvents.forEach(function(listener) {
                                listener();
                            });
                        }
                    }
                }
                return action;
            },
            addRedecuer: function addRedecuer(reducer) {
                switch (typeof reducer === 'undefined' ? 'undefined' : _typeof(reducer)) {
                    case 'function':
                        currentReducer = reducer;
                        break;
                    case 'object':
                        currentReducer = combineReducer(reducer);
                        break;
                    default:
                        throw new Error('Expected reducer to be a function.');
                }
            }
        };
        function createStore(reducer, initState) {
            if (!created) {
                created = true;
                store.addRedecuer(reducer);
            }
            if (initState) {
                state = Object.assign({}, initState);
            }
            return store;
        }
        function getStore() {
            if (created) {
                return store;
            } else {
                throw new Error('store hasn\'t been created!');
            }
        }
        function combineReducer(reducers) {
            var reducerKeys = Object.keys(reducers);
            var finalReducers = {};
            for (var i = 0; i < reducerKeys.length; i++) {
                var key = reducerKeys[i];
                if (typeof reducers[key] === 'function') {
                    finalReducers[key] = reducers[key];
                }
            }
            var finalReducerKeys = Object.keys(finalReducers);
            return function() {
                var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var action = arguments[1];
                var hasChanged = false;
                var nextState = Object.assign({}, state);
                for (var i = 0; i < finalReducerKeys.length; i++) {
                    var key = finalReducerKeys[i];
                    var reducer = finalReducers[key];
                    var previousStateForKey = state[key];
                    var nextStateForKey = reducer(previousStateForKey, action);
                    nextState[key] = nextStateForKey;
                    hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
                }
                return hasChanged ? nextState : state;
            }
                ;
        }
        exports.createStore = createStore;
        exports.getStore = getStore;
        exports.combineReducer = combineReducer;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.reducers = undefined;
        var _store = __webpack_require__(315);
        var _common = __webpack_require__(317);
        var _resource = __webpack_require__(319);
        var _detail = __webpack_require__(321);
        var reducers = exports.reducers = (0,
            _store.combineReducer)(Object.assign({}, _common.commonReducers, _resource.resourceReducers, _detail.detailReducers));
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.commonReducers = undefined;
        var _common = __webpack_require__(318);
        var commonActions = _interopRequireWildcard(_common);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var commonReducers = exports.commonReducers = {
            isLogin: function isLogin(prevState, action) {
                if (action.type === commonActions['CHANGE_LOGIN_STATUS']) {
                    return action.data;
                }
                return prevState;
            }
        };
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var CHANGE_LOGIN_STATUS = exports.CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS';
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.resourceReducers = undefined;
        var _resource = __webpack_require__(320);
        var resourceActions = _interopRequireWildcard(_resource);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var resourceReducers = exports.resourceReducers = {
            calendar: function calendar(prevState, action) {
                if (action.type === resourceActions['LOAD_CALENDAR']) {
                    return action.data;
                }
                return prevState;
            },
            roomBudget: function roomBudget(prevState, action) {
                if (action.type === resourceActions['LOAD_CALENDAR_ROOM_BUDGET']) {
                    return action.data;
                }
                return prevState;
            },
            departDate: function departDate(prevState, action) {
                if (action.type === resourceActions['CHANGE_DEPART_DATE']) {
                    return action.data;
                }
                return prevState;
            },
            departCity: function departCity(prevState, action) {
                if (action.type === resourceActions['CHANGE_DEPART_CITY']) {
                    if (action.data && action.data.code && action.data.code !== prevState.code) {
                        return action.data;
                    }
                }
                return prevState;
            },
            backCity: function backCity(prevState, action) {
                if (action.type === resourceActions['CHANGE_BACK_CITY']) {
                    if (action.data && action.data.code) {
                        return action.data;
                    }
                }
                return prevState;
            },
            adult: function adult(prevState, action) {
                if (action.type === resourceActions['CHANGE_ADULT']) {
                    return action.data;
                }
                return prevState;
            },
            child: function child(prevState, action) {
                if (action.type === resourceActions['CHANGE_CHILD']) {
                    return action.data;
                }
                return prevState;
            },
            freeChild: function freeChild(prevState, action) {
                if (action.type === resourceActions['CHANGE_FREE_CHILD']) {
                    return action.data;
                }
                return prevState;
            },
            departDateTarget: function departDateTarget(prevState, action) {
                if (action.type === resourceActions['CHANGE_DEPART_DATE_TARGET']) {
                    return action.data;
                }
                return prevState;
            },
            status: function status(prevState, action) {
                if (action.type === resourceActions['CHANGE_PRODUCT_STATUS'] && prevState != action.data) {
                    return action.data;
                }
                return prevState;
            },
            currentJourney: function currentJourney(prevState, action) {
                debugger ;if (action.type === resourceActions['CHANG_DETAIL_JOURNEY']) {
                    return action.data;
                }
                return prevState;
            }
        };
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LOAD_CALENDAR = exports.LOAD_CALENDAR = 'LOAD_CALENDAR';
        var LOAD_CALENDAR_ROOM_BUDGET = exports.LOAD_CALENDAR_ROOM_BUDGET = 'LOAD_CALENDAR_ROOM_BUDGET';
        var CHANGE_DEPART_DATE = exports.CHANGE_DEPART_DATE = 'CHANGE_DEPART_DATE';
        var CHANGE_DEPART_CITY = exports.CHANGE_DEPART_CITY = 'CHANGE_DEPART_CITY';
        var CHANGE_BACK_CITY = exports.CHANGE_BACK_CITY = 'CHANGE_BACK_CITY';
        var CHANGE_ADULT = exports.CHANGE_ADULT = 'CHANGE_ADULT';
        var CHANGE_CHILD = exports.CHANGE_CHILD = 'CHANGE_CHILD';
        var CHANGE_FREE_CHILD = exports.CHANGE_FREE_CHILD = 'CHANGE_FREE_CHILD';
        var CHANGE_DEPART_DATE_TARGET = exports.CHANGE_DEPART_DATE_TARGET = 'CHANGE_DEPART_DATE_TARGET';
        var CHANGE_PRODUCT_STATUS = exports.CHANGE_PRODUCT_STATUS = 'CHANGE_PRODUCT_STATUS';
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.detailReducers = undefined;
        var _detail = __webpack_require__(322);
        var detailActions = _interopRequireWildcard(_detail);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var detailReducers = exports.detailReducers = {
            currentJourney: function currentJourney(prevState, action) {
                if (action.type === detailActions['CHANG_DETAIL_JOURNEY']) {
                    return action.data;
                }
                return prevState;
            }
        };
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LOAD_COMMENT = exports.LOAD_COMMENT = 'LOAD_COMMENT';
        var CHANGE_COMMENT_FILTER = exports.CHANGE_COMMENT_FILTER = 'CHANGE_COMMENT_FILTER';
        var CHANG_DETAIL_JOURNEY = exports.CHANG_DETAIL_JOURNEY = 'CHANG_DETAIL_JOURNEY';
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.resourceModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _layer = __webpack_require__(11);
        var _ = __webpack_require__(14);
        var _resource = __webpack_require__(320);
        var resourceActions = _interopRequireWildcard(_resource);
        var _config = __webpack_require__(325);
        var _tip = __webpack_require__(326);
        var _calendar = __webpack_require__(327);
        var _city = __webpack_require__(332);
        var _date = __webpack_require__(336);
        var _tourist = __webpack_require__(340);
        var _promotion = __webpack_require__(345);
        var _downpayment = __webpack_require__(346);
        var _favor = __webpack_require__(347);
        var _favorite = __webpack_require__(350);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var dialog = void 0
            , store = void 0;
        var dateQueue = [];
        var $calendar = void 0
            , $departDate = void 0
            , $form = void 0;
        var $win = $(window);
        var isFlying = false;
        var flyTargetOffset = void 0
            , $flyTarget = void 0;
        var FLY_STEP = 13;
        var FLY_DURATION = 700;
        var FLY_MIN_RATE = 0.5;
        var INIT_RATE = 0.9;
        var MIN_RATE = 0.5;
        function createFlyMask(data) {
            return $('<div />').append(data.html).addClass('calendar-mask').css(data.offset).css({
                '-webkit-transform': 'scale(' + INIT_RATE + ')',
                'transform': 'scale(' + INIT_RATE + ')'
            });
            ;
        }
        function startFly() {
            var time = 0
                , $mask = void 0
                , data = void 0
                , width = void 0
                , height = void 0
                , p0x = void 0
                , p0y = void 0
                , p1x = void 0
                , p1y = void 0
                , p2x = void 0
                , p2y = void 0
                , ax = void 0
                , bx = void 0
                , ay = void 0
                , by = void 0;
            function calcFlyPosition(time) {
                var rate = Math.min(time / FLY_DURATION, 1)
                    , x = ax * Math.pow(rate, 2) + bx * rate + p0x
                    , y = ay * Math.pow(rate, 2) + by * rate + p0y;
                if (rate === 1) {
                    return false;
                } else {
                    return {
                        left: x,
                        top: y
                    };
                }
            }
            function fly() {
                var offset = calcFlyPosition(time);
                var rate = Math.max(INIT_RATE - time / FLY_DURATION, MIN_RATE);
                if (offset) {
                    $mask.css(offset).width(width * rate).height(height * rate).children().css({
                        '-webkit-transform': 'scale(' + rate + ')',
                        'transform': 'scale(' + rate + ')'
                    });
                    time += FLY_STEP;
                    setTimeout(fly, FLY_STEP);
                } else {
                    afterFly();
                }
            }
            function afterFly() {
                $mask.remove();
                _calendar.calendarModule.enable();
                _date.dateModule.flash();
                _date.dateModule.update();
                isFlying = false;
                if (dateQueue.length) {
                    startFly();
                }
            }
            if (isFlying) {
                return;
            }
            data = dateQueue.shift();
            if (data && data.offset) {
                $mask = createFlyMask(data);
                $mask.appendTo('body');
                width = $mask.width();
                height = $mask.height();
                flyTargetOffset = $flyTarget.offset();
                p0x = data.offset.left;
                p0y = data.offset.top;
                p2x = flyTargetOffset.left + 70 + width;
                p2y = flyTargetOffset.top + 12 - height * FLY_MIN_RATE / 2;
                p1x = (p0x + p2x) / 2;
                p1y = Math.min(p0y, p2y) - 100;
                ax = p0x - 2 * p1x + p2x;
                bx = 2 * (p1x - p0x);
                ay = p0y - 2 * p1y + p2y;
                by = 2 * (p1y - p0y);
                isFlying = true;
                _calendar.calendarModule.disable();
                fly();
            }
        }
        function getCurrentDateData() {
            var date = store.getState('departDate')
                , calendarData = store.getState('calendar')
                , res = null ;
            if (calendarData && calendarData.length) {
                calendarData.some(function(item) {
                    if (item.departDate === date) {
                        res = item;
                        return true;
                    }
                });
            }
            return res;
        }
        function showDialogTip(msg, cb) {
            var currentDialog = _layer.layer.open({
                type: 1,
                title: false,
                content: '<div class="dialog-error"><div class="dialog-close"></div><i class="icon"></i>' + msg + '</div>',
                area: ['400px', 'auto'],
                btn: false,
                closeBtn: false,
                success: function success($wrap) {
                    $wrap.on('click', '.dialog-close', function() {
                        _layer.layer.close(currentDialog);
                    });
                },
                end: function end() {
                    cb && cb();
                }
            });
        }
        function getDepartDatePosition() {
            var offset = $departDate.offset();
            if (!offset) {
                return false;
            }
            var height = $departDate.height();
            var scrollTop = $win.scrollTop();
            var winHeight = $win.height();
            return Object.assign({}, offset, {
                inView: offset.top >= scrollTop && offset.top + height <= scrollTop + winHeight
            });
        }
        function scrollToDate() {
            var position = getDepartDatePosition();
            if (position) {
                if (!position.inView) {
                    $win.scrollTop(position.top - 50);
                }
                _date.dateModule.flash();
            }
        }
        var resourceModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                var status = store.getState('status');
                $calendar = $('#J_Calendar');
                $flyTarget = $('#J_ResourceDate');
                $departDate = $('#J_ResourceDate');
                $form = $('#J_Form');
                if (status != 2) {
                    this.initCalendar();
                    this.initCity();
                    this.initDate();
                    this.initTourist();
                    this.intDownpaymentTip();
                    this.initPriceTip();
                    _favor.favorModule.init();
                }
                this.initGallery();
                this.initPromotionTip();
                this.initJourney();
                this.initRecommend();
                this.initFeature();
                this.initQr();
                this.initFavorite();
                this.initService();
                this.bind();
            },
            bind: function bind() {
                store.subscribe(function() {
                    if (store.getState('departDateTarget') === 'calendar') {
                        var date = store.getState('departDate');
                        var $target = $calendar.find('[data-date="' + date + '"]');
                        dateQueue.push({
                            date: date,
                            offset: $target.offset(),
                            html: $target.clone()
                        });
                        startFly();
                    }
                }, 'change:departDate');
                store.subscribe(function() {
                    var calendarData = store.getState('calendar');
                    var departCities = store.getState('allDepartCities');
                    if (!calendarData || !calendarData.length) {
                        store.dispatch({
                            type: resourceActions['CHANGE_PRODUCT_STATUS'],
                            data: departCities && departCities.length > 1 ? 3 : 2
                        });
                    }
                }, 'change:calendar');
                store.subscribe(function() {
                    resourceModule.update();
                }, 'change:status');
                $('.J_Submit').click(function() {
                    return resourceModule.submit();
                });
                $('.J_SubmitDetail').click(function() {
                    return resourceModule.submit(true);
                });
            },
            submit: function submit(noDialog) {
                if (store.getState('status') != 0) {
                    return false;
                }
                var departDate = store.getState('departDate');
                if (!departDate) {
                    if (noDialog) {
                        scrollToDate();
                    } else {
                        showDialogTip('请选择日期', scrollToDate);
                    }
                    return false;
                }
                var map = {
                    'begin_date': 'departDate',
                    'user_num': 'adult',
                    'child_count': 'child'
                };
                function addField(field, value) {
                    $form.find('[name=' + field + ']').val(value);
                }
                for (var field in map) {
                    addField(field, store.getState(map[field]));
                }
                if (store.getState('proMode') == 2) {
                    addField('normalChildCount', store.getState('child'));
                    addField('freeChildCount', store.getState('freeChild'));
                }
                $form.find('[name=from_url]').val(location.href);
                $form.attr('action', _config.config.url.submit({
                    productId: store.getState('productId')
                }));
                $form.submit();
                return true;
            },
            update: function update() {
                var status = store.getState('status');
                var $priceContainer = $('#J_ResourcePrice');
                if (status == 3) {
                    $priceContainer.html('\n                <div class="resource-section-item resource-price-item resource-price-saleout">\n                    <div class="resource-price-empty"><strong>\u5F53\u524D\u51FA\u53D1\u57CE\u5E02\u6682\u65F6\u65E0\u6CD5\u9500\u552E~</strong></div>\n                    <div class="resource-price-other">\u770B\u770B\u5176\u4ED6\u51FA\u53D1\u57CE\u5E02\u5427</div>\n                </div>\n            ');
                    $('.J_Submit').addClass('disabled');
                } else if (status == 2) {
                    $priceContainer.html('\n                <div class="resource-section-item resource-price-item resource-price-saleout">\n                    <div class="resource-price-empty"><strong>\u5F53\u524D\u7EBF\u8DEF\u6682\u65F6\u65E0\u6CD5\u9500\u552E~</strong></div>\n                    <div class="resource-price-other">\u53EF\u4EE5\u770B\u770B\u5176\u4ED6\u76F8\u4F3C\u7EBF\u8DEF</div>\n                </div>\n            ');
                    $('.J_Submit').addClass('disabled');
                }
            },
            initGallery: function initGallery() {
                new _.Gallery('#J_Gallery',{
                    autoChange: true
                });
            },
            initCalendar: function initCalendar() {
                _calendar.calendarModule.init();
            },
            initCity: function initCity() {
                _city.cityModule.init();
            },
            initDate: function initDate() {
                _date.dateModule.init();
            },
            initTourist: function initTourist() {
                _tourist.touristModule.init();
            },
            initPriceTip: function initPriceTip() {
                var $priceTip = $('#J_ResourcePriceTip')
                    , $priceDetail = $('#' + $priceTip.data('for'))
                    , $promotionTip = $('#J_ResourcePromotionPriceTip')
                    , $promotionDetail = $('#' + $promotionTip.data('for'));
                new _tip.Tip($priceTip,{
                    content: $('<div />').append($priceDetail.removeClass('tip-content')).html(),
                    dialog: {
                        tipsOffset: [10, -27]
                    }
                });
                new _tip.Tip($promotionTip,{
                    content: $('<div />').append($promotionDetail.removeClass('tip-content')).html(),
                    dialog: {
                        area: ['380px', 'auto'],
                        tipsOffset: [10, -27]
                    }
                });
            },
            intDownpaymentTip: function intDownpaymentTip() {
                var downpaymentRender = _templateNative.template.compile(_downpayment.resourceDownpaymentTemplate);
                new _tip.Tip($('#J_ResourceDownpaymentTip'),{
                    content: function content() {
                        return downpaymentRender({
                            data: (store.getState('detail') || {}).firstPay || {}
                        });
                    },
                    dialog: {
                        tipsOffset: [10, -2]
                    }
                });
            },
            initPromotionTip: function initPromotionTip() {
                var promotionData = (store.getState('detail') || {}).activity;
                if (promotionData && promotionData.length) {
                    new _tip.Tip($('#J_ResourcePromotionTip'),{
                        type: 'click',
                        content: function content() {
                            return _templateNative.template.compile(_promotion.resourcePromotionTemplate)({
                                data: promotionData
                            });
                        },
                        dialog: {
                            area: ['290px', 'auto'],
                            tipsOffset: [0, -20]
                        }
                    });
                }
            },
            initRecommend: function initRecommend() {
                var $element = $('#J_ResourceRecommend')
                    , $box = $element.find('.resource-section-content')
                    , $outer = $element.find('.resource-recommend-content-outer')
                    , $inner = $element.find('.resource-recommend-content-inner')
                    , $arrow = $element.find('.resource-recommend-expand')
                    , boxHeight = 72
                    , innerHeight = $inner.height()
                    , expand = false;
                if ($outer.height() < innerHeight) {
                    $element.addClass('fixed').height(boxHeight);
                    $outer.height(boxHeight).css('max-height', 'none');
                    $arrow.show();
                    $box.hover(function() {
                        $outer.height(innerHeight);
                        $element.addClass('expanded');
                        expand = true;
                    }, function() {
                        $outer.height(boxHeight);
                        $element.removeClass('expanded');
                        expand = false;
                    });
                }
            },
            initJourney: function initJourney() {
                var $element = $('#J_ResourceJourney')
                    , $box = $element.find('.resource-section-content')
                    , $inner = $element.find('.resource-section-content-inner')
                    , spots = $inner.children().toArray()
                    , boxHeight = $box.height()
                    , innerHeight = $inner.height();
                if (boxHeight < innerHeight) {
                    $inner.clone().append('<a href="javascript:;" class="resource-journey-less">收起</a>').addClass('more').appendTo($box);
                    $inner.addClass('less');
                    $inner.append('<a href="javascript:;" class="resource-journey-more">...详细</a>');
                    do {
                        $(spots.pop()).remove();
                    } while (boxHeight < $inner.height());$element.on('click', '.resource-journey-less', function() {
                        $element.removeClass('expand');
                    }).on('click', '.resource-journey-more', function() {
                        $element.addClass('expand');
                    });
                }
            },
            initFeature: function initFeature() {
                var $element = $('#J_ResourceFeature')
                    , $inner = $element.find('.resource-feature-content-inner')
                    , $list = $element.find('.resource-feature-list')
                    , innerHeight = $inner.height()
                    , listHeight = $list.height()
                    , epxnaded = false
                    , foldHtml = '收起<i></i>'
                    , expandHtml = '更多<i></i>';
                if (innerHeight < listHeight) {
                    $('<div />').addClass('resource-feature-more').html(expandHtml).click(function() {
                        if (epxnaded) {
                            $inner.height(innerHeight);
                            $(this).html(expandHtml).removeClass('expand');
                            epxnaded = false;
                        } else {
                            $inner.height(listHeight);
                            $(this).html(foldHtml).addClass('expand');
                            epxnaded = true;
                        }
                    }).appendTo($inner);
                }
                $inner.find('.resource-feature-item').each(function() {
                    var $target = $(this)
                        , forId = $target.data('for')
                        , $for = void 0;
                    if (forId) {
                        $for = $('#' + forId);
                        new _tip.Tip($target,{
                            type: 'click',
                            content: $('<div />').append($for.removeClass('tip-content')).html(),
                            dialog: {
                                tipsOffset: [10, -27]
                            }
                        });
                    }
                });
            },
            initQr: function initQr() {
                $('.J_QR').hover(function() {
                    $(this).addClass('expand');
                }, function() {
                    $(this).removeClass('expand');
                });
            },
            initFavorite: function initFavorite() {
                _favorite.favoriteModule.init();
            },
            initService: function initService() {
                function toggleService(data) {
                    if (data && data.url) {
                        $('.J_Service').attr({
                            href: data.url,
                            target: '_blank'
                        }).show();
                        if (window.showHeadTuniuChat) {
                            window.showHeadTuniuChat(data);
                        } else {
                            window.showHeadTuniuChat = data;
                        }
                    }
                }
                if (window.getKefuData) {
                    window.getKefuData(toggleService);
                } else {
                    window.sidebarCallbacks = window.sidebarCallbacks || [];
                    window.sidebarCallbacks.push(toggleService);
                }
            }
        };
        exports.resourceModule = resourceModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
            }
                : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }
            ;
        /*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
        function a(a) {
            return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y);
        }
        function b(a) {
            return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
        }
        function c(c, d) {
            function e(a) {
                return m += a.split(/\n/).length - 1,
                k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
                a && (a = s[1] + b(a) + s[2] + "\n"),
                    a;
            }
            function f(b) {
                var c = m;
                if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function() {
                        return m++,
                        "$line=" + m + ";";
                    })),
                    0 === b.indexOf("=")) {
                    var e = l && !/^=[=#]/.test(b);
                    if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""),
                            e) {
                        var f = b.replace(/\s*\([^\)]+\)/, "");
                        n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")");
                    } else
                        b = "$string(" + b + ")";
                    b = s[1] + b + s[2];
                }
                return g && (b = "$line=" + c + ";" + b),
                    r(a(b), function(a) {
                        if (a && !p[a]) {
                            var b;
                            b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a,
                                w += a + "=" + b + ",",
                                p[a] = !0;
                        }
                    }),
                b + "\n";
            }
            var g = d.debug
                , h = d.openTag
                , i = d.closeTag
                , j = d.parser
                , k = d.compress
                , l = d.escape
                , m = 1
                , p = {
                $data: 1,
                $filename: 1,
                $utils: 1,
                $helpers: 1,
                $out: 1,
                $line: 1
            }
                , q = "".trim
                , s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"]
                , t = q ? "$out+=text;return $out;" : "$out.push(text);"
                , u = "function(){var text=''.concat.apply('',arguments);" + t + "}"
                , v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}"
                , w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : "")
                , x = s[0]
                , y = "return new String(" + s[3] + ");";
            r(c.split(h), function(a) {
                a = a.split(i);
                var b = a[0]
                    , c = a[1];
                1 === a.length ? x += e(b) : (x += f(b),
                c && (x += e(c)));
            });
            var z = w + x + y;
            g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
            try {
                var A = new Function("$data","$filename",z);
                return A.prototype = n,
                    A;
            } catch (B) {
                throw B.temp = "function anonymous($data,$filename) {" + z + "}",
                    B;
            }
        }
        var d = function d(a, b) {
                return "string" == typeof b ? q(b, {
                    filename: a
                }) : g(a, b);
            }
            ;
        d.version = "3.0.0",
            d.config = function(a, b) {
                e[a] = b;
            }
        ;
        var e = d.defaults = {
            openTag: "<%",
            closeTag: "%>",
            escape: !0,
            cache: !0,
            compress: !1,
            parser: null
        }
            , f = d.cache = {};
        d.render = function(a, b) {
            return q(a, b);
        }
        ;
        var g = d.renderFile = function(a, b) {
                var c = d.get(a) || p({
                        filename: a,
                        name: "Render Error",
                        message: "Template not found"
                    });
                return b ? c(b) : c;
            }
            ;
        d.get = function(a) {
            var b;
            if (f[a])
                b = f[a];
            else if ("object" == (typeof document === "undefined" ? "undefined" : _typeof(document))) {
                var c = document.getElementById(a);
                if (c) {
                    var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                    b = q(d, {
                        filename: a
                    });
                }
            }
            return b;
        }
        ;
        var h = function h(a, b) {
            return "string" != typeof a && (b = typeof a === "undefined" ? "undefined" : _typeof(a),
                "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""),
                a;
        }
            , i = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        }
            , j = function j(a) {
            return i[a];
        }
            , k = function k(a) {
            return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j);
        }
            , l = Array.isArray || function(a) {
                return "[object Array]" === {}.toString.call(a);
            }
            , m = function m(a, b) {
            var c, d;
            if (l(a))
                for (c = 0,
                         d = a.length; d > c; c++) {
                    b.call(a, a[c], c, a);
                }
            else
                for (c in a) {
                    b.call(a, a[c], c);
                }
        }
            , n = d.utils = {
            $helpers: {},
            $include: g,
            $string: h,
            $escape: k,
            $each: m
        };
        d.helper = function(a, b) {
            o[a] = b;
        }
        ;
        var o = d.helpers = n.$helpers;
        d.onerror = function(a) {
            var b = "Template Error\n\n";
            for (var c in a) {
                b += "<" + c + ">\n" + a[c] + "\n\n";
            }
            "object" == (typeof console === "undefined" ? "undefined" : _typeof(console)) && console.error(b);
        }
        ;
        var p = function p(a) {
            return d.onerror(a),
                function() {
                    return "{Template Error}";
                }
                ;
        }
            , q = d.compile = function(a, b) {
            function d(c) {
                try {
                    return new i(c,h) + "";
                } catch (d) {
                    return b.debug ? p(d)() : (b.debug = !0,
                        q(a, b)(c));
                }
            }
            b = b || {};
            for (var g in e) {
                void 0 === b[g] && (b[g] = e[g]);
            }
            var h = b.filename;
            try {
                var i = c(a, b);
            } catch (j) {
                return j.filename = h || "anonymous",
                    j.name = "Syntax Error",
                    p(j);
            }
            return d.prototype = i.prototype,
                d.toString = function() {
                    return i.toString();
                }
                ,
            h && b.cache && (f[h] = d),
                d;
        }
            , r = n.$each
            , s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined"
            , t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g
            , u = /[^\w$]+/g
            , v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"),"g")
            , w = /^\d[^,]*|,\d[^,]*/g
            , x = /^,+|,+$/g
            , y = /^$|,+/;
        var template = d;
        exports.template = template;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var REFRESH_QUERY = 'refresh=1';
        var siteHost = window.siteHost || 'http://www.tuniu.com';
        function isRefresh() {
            var url = location.href;
            return ( /\brefresh\b/.test(url)) ;
        }
        function packRefresh(url) {
            if (isRefresh()) {
                url += url.indexOf('?') === -1 ? '?' : '&';
                url += REFRESH_QUERY;
            }
            return url;
        }
        var config = exports.config = {
            host: siteHost,
            url: {
                submit: function submit(params) {
                    return siteHost + '/tours/' + params.productId + '/book/step1';
                },
                calendar: function calendar(params) {
                    var url = ['/papi/product/calendar'];
                    ['productId', 'bookCityCode', 'departCityCode', 'backCityCode'].every(function(key) {
                        if (params[key]) {
                            url.push('/' + params[key]);
                            return true;
                        }
                    });
                    return packRefresh(url.join(''));
                },
                visa: function visa(params) {
                    var url = ['/papi/product/visa'];
                    ['productId', 'bookCityCode', 'departCityCode'].every(function(key) {
                        if (params[key]) {
                            url.push('/' + params[key]);
                            return true;
                        }
                    });
                    return packRefresh(url.join(''));
                },
                upgrade: function upgrade(params) {
                    var url = ['/papi/product/upgrade'];
                    ['productId', 'bookCityCode', 'departCityCode'].every(function(key) {
                        if (params[key]) {
                            url.push('/' + params[key]);
                            return true;
                        }
                    });
                    return packRefresh(url.join(''));
                },
                visaSend: function visaSend() {
                    return packRefresh('/papi/product/visaSend');
                },
                visaPrint: function visaPrint(params) {
                    var query = Object.keys(params).map(function(key) {
                        var value = params[key];
                        if (value) {
                            if (Array.isArray(value)) {
                                return key + '=' + value.map(function(obj) {
                                        return obj.id + ':' + obj.name;
                                    }).join(',');
                            } else {
                                return key + '=' + value;
                            }
                        }
                        return false;
                    }).filter(function(val) {
                        return val;
                    }).join('&');
                    return siteHost + '/yii.php?r=visa/VisaDetail/ShowEmailTemplate&' + query;
                },
                couponReceive: function couponReceive(params) {
                    return packRefresh('/papi/product/couponReceive/' + params.couponId);
                },
                remarkStatus: function remarkStatus() {
                    return packRefresh('/papi/product/remarkStatus');
                },
                remarkList: function remarkList() {
                    return packRefresh('/papi/product/remarkList');
                },
                guide: function guide(params) {
                    return packRefresh(['/papi/product/guide', params.productId].join('/'));
                },
                retail: function retail(params) {
                    return packRefresh(['/papi/product/retail', params.bookCode].join('/'));
                },
                login: function login() {
                    return 'http://www.tuniu.com/u/login';
                },
                loginDialog: function loginDialog() {
                    var domain = location.host
                        , secDomain = domain.split('.')[0];
                    return 'https://passport.tuniu.com/login/iframe?origin=' + encodeURIComponent('http://www.tuniu.com/ssoConnect/Iframe?reload=detail&domain=' + secDomain);
                },
                ask: function ask(params) {
                    return packRefresh(['/papi/product/ask', params.productId].join('/'));
                },
                checkName: function checkName(params) {
                    return packRefresh(['/papi/product/checkName', params.identify].join('/'));
                },
                addAsk: function addAsk() {
                    return packRefresh('/papi/product/addAsk');
                },
                qa: function qa() {
                    return packRefresh('/papi/product/qa');
                },
                related: function related() {
                    return packRefresh('/papi/product/related');
                },
                checkFavoriteState: function checkFavoriteState() {
                    return packRefresh('/papi/product/checkFavoriteState');
                },
                addFavorite: function addFavorite() {
                    return packRefresh('/papi/product/addFavorite');
                },
                removeFavorite: function removeFavorite() {
                    return packRefresh('/papi/product/removeFavorite');
                }
            }
        };
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.createTip = exports.Tip = undefined;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        var _layer = __webpack_require__(11);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Tip = function() {
            function Tip(element, options) {
                _classCallCheck(this, Tip);
                this._id = new Date().getTime() + '' + Math.random();
                this.$target = element;
                this.options = Object.assign({
                    delay: 100,
                    type: 'hover'
                }, options);
                this.dialogOptions = Object.assign({
                    type: 4,
                    tips: 3,
                    shift: 0,
                    shade: false,
                    fix: false,
                    closeBtn: false,
                    skin: 'layui-layer-rim',
                    area: ['300px', 'auto'],
                    tipsOffset: [10, -27]
                }, this.options.dialog);
                this.dialogOptions.content = [this.getContent(), this.$target];
                if (this.options.delay && this.options.hoverIncludeTip) {
                    this.dialogOptions.success = function($dom) {
                        var _this = this;
                        $dom.hover(function() {
                            clearTimeout(_this.timer);
                        }, this.close.bind(this));
                    }
                        .bind(this);
                }
                if (this.options.type === 'click') {
                    this.dialogOptions.success = function($dom) {
                        $dom.click(function(e) {
                            e.stopPropagation();
                        });
                    }
                    ;
                }
                this.dialog = null ;
                this.timer = null ;
                this.visible = false;
                this.bind();
            }
            _createClass(Tip, [{
                key: 'bind',
                value: function bind() {
                    switch (this.options.type) {
                        case 'click':
                            this.$target.click(this.toggle.bind(this)).click(function(e) {
                                $(document).trigger('customclick', this._id);
                                e.stopPropagation();
                            }
                                .bind(this));
                            $(document).click(this.close.bind(this)).on('customclick', function(e, sourceType) {
                                if (sourceType !== this._id) {
                                    this.close();
                                }
                            }
                                .bind(this));
                            break;
                        case 'hover':
                        default:
                            this.$target.hover(this.open.bind(this), this.close.bind(this));
                            break;
                    }
                }
            }, {
                key: 'getContent',
                value: function getContent() {
                    if (typeof this.options.content === 'function') {
                        return this.options.content();
                    } else {
                        return this.options.content;
                    }
                }
            }, {
                key: 'toggle',
                value: function toggle() {
                    if (this.visible) {
                        this.close();
                    } else {
                        this.open();
                    }
                }
            }, {
                key: 'open',
                value: function open() {
                    var _this2 = this;
                    if ($.isFunction(this.options.width)) {
                        this.dialogOptions.area[0] = this.options.width() + 'px';
                    }
                    if (this.options.delay && this.options.type !== 'click') {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(function() {
                            if (!_this2.visible) {
                                _this2.dialog = _layer.layer.open(_this2.dialogOptions);
                                _this2.visible = true;
                            }
                        }, this.options.delay);
                    } else {
                        this.dialog = _layer.layer.open(this.dialogOptions);
                        this.$target.addClass('expand');
                        this.visible = true;
                    }
                }
            }, {
                key: 'close',
                value: function close() {
                    var _this3 = this;
                    if (this.options.delay && this.options.hoverIncludeTip) {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(function() {
                            _layer.layer.close(_this3.dialog);
                            _this3.visible = false;
                        }, this.options.delay);
                    } else {
                        _layer.layer.close(this.dialog);
                        this.$target.removeClass('expand');
                        clearTimeout(this.timer);
                        this.visible = false;
                    }
                }
            }]);
            return Tip;
        }();
        function createTip() {}
        exports.Tip = Tip;
        exports.createTip = createTip;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.calendarModule = undefined;
        var _store = __webpack_require__(315);
        var _resource = __webpack_require__(320);
        var resourceActions = _interopRequireWildcard(_resource);
        var _templateNative = __webpack_require__(324);
        var _layer = __webpack_require__(11);
        var _config = __webpack_require__(325);
        var _calendarMonth = __webpack_require__(328);
        var _calendarDate = __webpack_require__(329);
        var _calendarDetail = __webpack_require__(330);
        var _resourceCalendar = __webpack_require__(331);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var DATE_SEPERATOR = '-';
        var CALENDAR_VIEW_LENGTH = 6 * 7;
        var ONE_DAY_LENGTH = 24 * 60 * 60 * 1000;
        var TODAY = getYMDDate(new Date());
        var MONTH_NUMBER = 4;
        var calendarDetailRender = _templateNative.template.compile(_calendarDetail.calendarDetailTemplate);
        var DELAY = 200;
        var monthPattern = /^(\d{4})\-(\d{2})$/;
        var datePattern = /^(\d{4})\-(\d{2})\-(\d{2})$/;
        var store = void 0;
        var monthWithPriceList = void 0
            , nowMonth = void 0
            , groupStartMonth = void 0
            , currentMonth = void 0
            , minMonth = void 0
            , maxMonth = void 0;
        var promotionList = [];
        var container = void 0;
        var detailDialog = void 0
            , timer = void 0
            , disabled = false;
        function isMonth(month) {
            monthPattern.lastIndex = 0;
            return monthPattern.exec(String(month));
        }
        function isDate(date) {
            datePattern.lastIndex = 0;
            return datePattern.exec(String(date));
        }
        function isDateEnabled(date) {
            var dateList = store.getState('calendar');
            return dateList.some(function(item) {
                return item.departDate === date;
            });
        }
        function justifyDate(date) {
            return String(date).replace(/\-/g, '/');
        }
        function justifyNumber(number) {
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
            number = String(number);
            for (var i = Math.max(length - number.length, 0); i > 0; i--) {
                number = '0' + number;
            }
            return number;
        }
        function getYMDDate(dateObj) {
            return [dateObj.getFullYear(), justifyNumber(dateObj.getMonth() + 1), justifyNumber(dateObj.getDate())].join(DATE_SEPERATOR);
        }
        function getYMDate(dateObj) {
            if (typeof dateObj === 'string') {
                dateObj = new Date(justifyDate(dateObj));
            }
            return [dateObj.getFullYear(), justifyNumber(dateObj.getMonth() + 1)].join(DATE_SEPERATOR);
        }
        function isInCurrentMonth() {
            var date = store.getState('departDate')
                , range = getCurrentViewRange();
            return date <= range.end && date >= range.start;
        }
        function getCurrentViewRange() {
            var range = {}
                , allDate = []
                , monthStartDateStr = justifyDate(currentMonth + '-01')
                , monthViewStartDate = new Date(monthStartDateStr)
                , monthViewEndDate = new Date(monthStartDateStr)
                , tmpDate = void 0
                , fullDate = void 0;
            monthViewStartDate.setDate(monthViewStartDate.getDate() - monthViewStartDate.getDay());
            monthViewEndDate = new Date(monthViewStartDate.getTime());
            monthViewEndDate.setDate(monthViewEndDate.getDate() + CALENDAR_VIEW_LENGTH - 1);
            range.start = getYMDDate(monthViewStartDate);
            range.end = getYMDDate(monthViewEndDate);
            tmpDate = new Date(justifyDate(range.start));
            while (tmpDate <= monthViewEndDate) {
                fullDate = getYMDDate(tmpDate);
                allDate.push({
                    fullDate: fullDate,
                    year: tmpDate.getFullYear(),
                    month: tmpDate.getMonth(),
                    date: tmpDate.getDate(),
                    isInCurrentMonth: ~fullDate.indexOf(currentMonth)
                });
                tmpDate.setDate(tmpDate.getDate() + 1);
            }
            range.all = allDate;
            return range;
        }
        function getCurrentViewDates() {
            var range = getCurrentViewRange();
            var dateList = {};
            store.getState('calendar').filter(function(item) {
                return item.departDate >= range.start && item.departDate <= range.end;
            }).forEach(function(item) {
                dateList[item.departDate] = item;
            });
            return {
                all: range.all,
                date: dateList
            };
        }
        function collectMonthLowestPrice() {
            var calendarData = store.getState('calendar');
            monthWithPriceList = {};
            if (calendarData) {
                calendarData.forEach(function(item) {
                    var ymDate = getYMDate(item.departDate);
                    if (item.isRealTimePrice) {
                        if (!monthWithPriceList[ymDate]) {
                            monthWithPriceList[ymDate] = Infinity;
                        }
                    } else {
                        monthWithPriceList[ymDate] = Math.min(item.tuniuPrice, monthWithPriceList[ymDate] || Infinity);
                    }
                });
            }
            return monthWithPriceList;
        }
        function getFirstNoEmptyMonth() {
            var calendarData = store.getState('calendar');
            if (calendarData && calendarData.length) {
                return getYMDate(calendarData[0]['departDate']);
            }
        }
        function getMonthList() {
            var monthList = [], tmpDate = new Date(justifyDate(groupStartMonth + '-01')), month, i;
            for (i = 0; i < MONTH_NUMBER; i++) {
                month = getYMDate(tmpDate);
                if (month >= minMonth && month <= maxMonth) {
                    monthList.push({
                        month: month,
                        price: monthWithPriceList[month]
                    });
                }
                tmpDate.setMonth(tmpDate.getMonth() + 1);
            }
            return monthList;
        }
        function getNextGroupStartMonth(direction) {
            var firstDate = new Date(justifyDate(groupStartMonth + '-01'));
            firstDate.setMonth(firstDate.getMonth() + direction);
            return getYMDate(firstDate);
        }
        function getDeltaMonth(start, end) {
            var startMonthRes = isMonth(start)
                , endMonthRes = isMonth(end)
                , startYear = startMonthRes[1]
                , startMonth = startMonthRes[2]
                , endYear = endMonthRes[1]
                , endMonth = endMonthRes[2];
            return (startYear - endYear) * 12 + (startMonth - endMonth);
        }
        function getNextMonth(month) {
            var delta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var date = new Date(justifyDate(month + '-01'));
            date.setMonth(date.getMonth() + delta);
            return getYMDate(date);
        }
        function getStartGroupMonth(currentMonth) {
            var deltaMonth = getDeltaMonth(currentMonth, nowMonth)
                , groupNumber = Math.floor(deltaMonth / MONTH_NUMBER)
                , groupFirstDate = new Date(justifyDate(nowMonth + '-01'));
            groupFirstDate.setMonth(groupFirstDate.getMonth() + groupNumber * MONTH_NUMBER);
            return getYMDate(groupFirstDate);
        }
        function getCurrentMonth() {
            var departDate = store.getState('departDate');
            var selectedMonth = void 0;
            if (departDate && (selectedMonth = getYMDate(store.getState('departDate'))) && selectedMonth >= groupStartMonth && selectedMonth <= getNextMonth(groupStartMonth, 3)) {
                return selectedMonth;
            } else {
                return groupStartMonth;
            }
        }
        function getDataByDate(date) {
            var calendarData = store.getState('calendar')
                , res = null ;
            if (calendarData && calendarData.length) {
                calendarData.some(function(item) {
                    if (item.departDate === date) {
                        res = item;
                        return true;
                    }
                });
            }
            return res;
        }
        function getMinMonth() {
            var minDate = store.getState('calendar')[0];
            return minDate ? getYMDate(minDate.departDate) : null ;
        }
        function getMaxMonth() {
            var calendar = store.getState('calendar')
                , maxDate = calendar[calendar.length - 1];
            return maxDate ? getYMDate(maxDate.departDate) : getNextMonth(minMonth, 3);
        }
        function _changeMonth(month) {
            if (isMonth(month) && month >= minMonth && month <= maxMonth) {
                currentMonth = month;
                return true;
            }
            return false;
        }
        function hideLoading() {
            container.removeClass('loading').find('.calendar-loading-mask').remove();
        }
        function processCalendarData(calendarData) {
            if (calendarData) {
                calendarData.forEach(function(date) {
                    var index = date.strategyIndex
                        , strategy = (date.strategyDtos || [])[index] || {};
                    date.isPromotion = (strategy.promotionDtos || []).some(function(promotion) {
                        return promotion.promotionTypeId === 14;
                    });
                    date.promotionPrice = strategy.coupon;
                });
            }
            return calendarData;
        }
        function getPromotion(departDate) {
            return promotionList.filter(function(promotion) {
                if (promotion.planDate) {
                    return (promotion.planDate || []).some(function(date) {
                        return date == departDate;
                    });
                } else {
                    return true;
                }
            });
        }
        var calendarModule = {
            init: function init() {
                var _this = this;
                container = $('#J_Calendar');
                store = (0,
                    _store.getStore)();
                store.subscribe(function() {
                    _this.load();
                }, 'change:calendar');
                store.subscribe(function() {
                    if (!isInCurrentMonth()) {
                        currentMonth = getYMDate(new Date(justifyDate(store.getState('departDate'))));
                        groupStartMonth = getStartGroupMonth(currentMonth);
                    }
                    _this.render();
                }, 'change:departDate');
                nowMonth = getYMDate(new Date());
                this.fetch();
            },
            bind: function bind() {
                container.on('click', '.calendar-date-enabled', function() {
                    calendarModule.changeDepart($(this).data('date'));
                }).on('mouseenter', '.calendar-date-enabled', function() {
                    var target = $(this)
                        , date = target.data('date');
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        calendarModule.showDateDetail(date, target);
                    }, DELAY);
                }).on('mouseleave', '.calendar-date-enabled', function() {
                    clearTimeout(timer);
                    calendarModule.hideDateDetail($(this).data('date'));
                }).on('click', '.calendar-month', function() {
                    calendarModule.changeMonth($(this).data('month'));
                }).on('click', '.calendar-prev', function() {
                    calendarModule.goNextMonth(-1);
                }).on('click', '.calendar-next', function() {
                    calendarModule.goNextMonth();
                });
                if (getDeltaMonth(maxMonth, minMonth) <= 3) {
                    container.find('.calendar-prev, .calendar-next').remove();
                } else {
                    container.find('.calendar-prev, .calendar-next').show();
                }
            },
            fetch: function fetch(loop) {
                loop = loop || 0;
                $.ajax({
                    dataType: 'json',
                    url: _config.config.url.calendar({
                        productId: store.getState('productId'),
                        bookCityCode: store.getState('bookCityCode') || void 0,
                        departCityCode: store.getState('departCityCode') || void 0,
                        backCityCode: store.getState('backCityCode') || void 0
                    })
                }).done(function(res) {
                    var data = {};
                    if (res && res.success && res.data) {
                        data = res.data;
                    }
                    promotionList = data.promotion || [];
                    store.dispatch({
                        type: resourceActions['LOAD_CALENDAR_ROOM_BUDGET'],
                        data: data.roomAddBudget || {}
                    });
                    store.dispatch({
                        type: resourceActions['LOAD_CALENDAR'],
                        data: processCalendarData(data.calendar) || []
                    });
                }).fail(function() {
                    if (loop <= 5) {
                        this.fetch(loop + 1);
                    } else {
                        store.dispatch({
                            type: resourceActions['LOAD_CALENDAR'],
                            data: []
                        });
                    }
                }
                    .bind(this));
            },
            load: function load() {
                currentMonth = getFirstNoEmptyMonth() || nowMonth;
                groupStartMonth = getStartGroupMonth(currentMonth);
                monthWithPriceList = collectMonthLowestPrice();
                minMonth = getMinMonth() || nowMonth;
                maxMonth = getMaxMonth() || nowMonth;
                groupStartMonth = groupStartMonth < minMonth ? minMonth : groupStartMonth;
                container.removeClass('loading');
                this.bind();
                this.render();
                hideLoading();
                if (window.PERFORMANCE && window.d) {
                    window.PERFORMANCE.r = new Date().getTime() - window.d.getTime();
                }
            },
            changeMonth: function changeMonth(month) {
                if (_changeMonth(month)) {
                    this.render();
                }
            },
            goNextMonth: function goNextMonth() {
                var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                if (_changeMonth(getNextMonth(currentMonth, direction))) {
                    this.changeMonthGroup(direction);
                    this.render();
                }
            },
            changeMonthGroup: function changeMonthGroup() {
                var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                var delta = getDeltaMonth(currentMonth, groupStartMonth)
                    , nextGroupStartMonth = void 0;
                if (delta < 4 && delta >= 0) {
                    return;
                }
                nextGroupStartMonth = getNextGroupStartMonth(direction);
                if (nextGroupStartMonth < minMonth) {
                    nextGroupStartMonth = minMonth;
                }
                if (nextGroupStartMonth > maxMonth) {
                    nextGroupStartMonth = maxMonth;
                }
                groupStartMonth = nextGroupStartMonth;
            },
            changeDepart: function changeDepart(departDate) {
                if (!disabled && isDate(departDate) && isDateEnabled(departDate)) {
                    store.dispatch({
                        type: resourceActions['CHANGE_DEPART_DATE_TARGET'],
                        data: 'calendar'
                    });
                    store.dispatch({
                        type: resourceActions['CHANGE_DEPART_DATE'],
                        data: departDate
                    });
                }
            },
            render: function render() {
                this.renderMonth();
                this.renderDate();
            },
            renderMonth: function renderMonth() {
                if (currentMonth <= minMonth) {
                    container.find('.calendar-prev').addClass('calendar-prev-disabled');
                } else {
                    container.find('.calendar-prev').removeClass('calendar-prev-disabled');
                }
                if (currentMonth >= maxMonth) {
                    container.find('.calendar-next').addClass('calendar-next-disabled');
                } else {
                    container.find('.calendar-next').removeClass('calendar-next-disabled');
                }
                container.find('.calendar-months').html(_templateNative.template.compile(_calendarMonth.calendarMonthTemplate)({
                    list: getMonthList(),
                    current: currentMonth,
                    nonEmptyMonth: monthWithPriceList,
                    infinity: Infinity
                }));
            },
            renderDate: function renderDate() {
                var data = getCurrentViewDates();
                data.current = store.getState('departDate');
                data.today = TODAY;
                container.find('.calendar-dates').html(_templateNative.template.compile(_calendarDate.calendarDateTemplate)(data));
            },
            hideDateDetail: function hideDateDetail() {
                _layer.layer.close(detailDialog);
            },
            showDateDetail: function showDateDetail(date, target) {
                var data = getDataByDate(date);
                if (data) {
                    data.roomBudget = store.getState('roomBudget')[date];
                    calendarModule.openDateDetail(data, target);
                }
            },
            openDateDetail: function openDateDetail(data, target) {
                detailDialog = _layer.layer.open({
                    type: 4,
                    skin: 'layui-layer-rim',
                    area: ['auto', 'auto'],
                    content: [calendarDetailRender(Object.assign({}, data, {
                        promotions: getPromotion(data.departDate)
                    })), target],
                    tips: 3,
                    shade: false,
                    fix: false,
                    closeBtn: false,
                    tipsOffset: [-1, -1]
                });
            },
            disable: function disable() {
                disabled = true;
            },
            enable: function enable() {
                disabled = false;
            }
        };
        exports.calendarModule = calendarModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var calendarMonthTemplate = exports.calendarMonthTemplate = "\n<ul>\n    <% for (var i = 0; i < list.length; i++) { %>\n        <% var item = list[i] %>\n        <li data-month=\"<%= item.month %>\"\n            class=\"calendar-month\n            <% if (item.month === current) { %>calendar-month-active<% } %>\n            <% if (!item.price) { %>calendar-month-empty<% } %>\">\n            <div class=\"calendar-month-date\"><%= item.month.replace('-', '\u5E74') + '\u6708' %></div>\n            <% if (item.price) { %>\n                <% if (item.price < infinity) { %>\n                    <div class=\"calendar-month-price\">&yen;<%= item.price %>\u8D77</div>\n                <% } else { %>\n                    <div class=\"calendar-month-price\">\u5B9E\u65F6\u8BA1\u4EF7</div>\n                <% } %>\n            <% } else { %>\n                <div class=\"calendar-month-none-price\">\u65E0\u56E2\u671F</div>\n            <% } %>\n        </li>\n    <% } %>\n</ul>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var calendarDateTemplate = exports.calendarDateTemplate = "\n    <ul>\n        <% var weeks = ['sun', 'mon', 'tue', 'mon', 'thu', 'fri', 'sat']; %>\n        <% for(var i = 0; i < all.length; i++) { %>\n            <%\n                var currentDateObj = all[i];\n                var currentDate = currentDateObj.fullDate;\n                var dateObj = date[currentDate];\n            %>\n            <li data-date=\"<%= currentDate %>\"\n                class=\"calendar-date\n                    calendar-date-<%= weeks[i % 7] %>\n                    <%= (dateObj && currentDateObj.isInCurrentMonth) ? 'calendar-date-enabled' : ''%>\n                    <%= (currentDate === current && currentDateObj.isInCurrentMonth) ? 'calendar-date-active' : ''%>\n                    <%= currentDateObj.isInCurrentMonth ? '' : 'calendar-date-other'%>\">\n                <span class=\"calendar-date-number\">\n                    <%\n                    if (currentDate == today) {\n                        %>\u4ECA\u5929<%\n                    } else if (currentDate == backDate) {\n                        %>\u5F52\u6765<%\n                    } else { %>\n                        <%= currentDateObj.date %>\n                    <% } %>\n                </span>\n                <% if (currentDateObj.isInCurrentMonth) { %>\n                    <div class=\"calendar-date-tag\">\n                        <% if (dateObj && dateObj.isPromotion) { %>\n                            <span class=\"calendar-date-tag-item calendar-date-tag-promotion\"></span>\n                        <% } %>\n                        <% if (dateObj && dateObj.setGroupFlag) { %>\n                            <span class=\"calendar-date-tag-item calendar-date-tag-tie\"></span>\n                        <% } %>\n                    </div>\n\n                    <div class=\"calendar-date-content\">\n                        <% if (dateObj) { %>\n                            <div class=\"calendar-date-rest\">\n                                <% if (dateObj.flightTicketType == 2) { %>\n                                    <% if (dateObj.isRealTimePrice != 1) { %>\n                                        \u5B9E\u65F6\n                                    <% } else { %>\n                                        &nbsp;\n                                    <% } %>\n                                <% } else if (dateObj.stockInfo.stockNum > 0) { %>\n                                    <% if(dateObj.flightTicketType == 1) { %>\n                                        \u4F4D\u7F6E\u6709\n                                    <% } else if (dateObj.stockInfo.stockNum <= 9) { %>\n                                        \u4F59<%= dateObj.stockInfo.stockNum %>\n                                    <% } else { %>\n                                        \u5145\u8DB3\n                                    <% } %>\n                                <% } else { %>\n                                    &nbsp;\n                                <% } %>\n                            </div>\n                            <% if (dateObj.isRealTimePrice == 1) { %>\n                                <div class=\"calendar-date-price\">\u5B9E\u65F6\u8BA1\u4EF7</div>\n                            <% } else {%>\n                                <div class=\"calendar-date-price\">&yen;<%= dateObj.tuniuPrice %>\u8D77</div>\n                            <% } %>\n                        <% } %>\n                    </div>\n                <% } %>\n            </li>\n        <% } %>\n\n    </ul>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var calendarDetailTemplate = exports.calendarDetailTemplate = "\n<div class=\"calendar-detail\">\n    <div class=\"calendar-detail-price\">\n        <% if (isRealTimePrice) { %>\n            \u5B9E\u65F6\u8BA1\u4EF7\n        <% } else { %>\n            <% if (tuniuPrice) { %>\n                <span>\u6210\u4EBA\u4EF7\uFF1A<strong>&yen;<%= tuniuPrice %></strong></span>\n            <% } %>\n\n            <% if(excludeChildFlag) { %>\n                <span>\u4E0D\u652F\u6301\u513F\u7AE5\u9884\u8BA2</span>\n            <% } else if(tuniuChildPrice) { %>\n                <span>\u513F\u7AE5\u4EF7\uFF1A<strong>&yen;<%= tuniuChildPrice %></strong></span>\n            <% } %>\n\n            <% if (roomBudget) { %>\n                <span>\u5355\u623F\u5DEE\uFF1A<strong>&yen;<%= roomBudget %></strong></span>\n            <% } %>\n        <% } %>\n\n    </div>\n\n    <% if (isRealTimePrice != 1 && startPrice != tuniuPrice) { %>\n        <div class=\"calendar-detail-favor\">\n            *\u6700\u4F4E\u4F18\u60E0\u4EF7 <strong>&yen;<%= startPrice %></strong> = \u9014\u725B\u6210\u4EBA\u4EF7 &yen;<%= tuniuPrice %> - \u6700\u5927\u4F18\u60E0\u91D1\u989D &yen;<%= tuniuPrice - startPrice %>\n        </div>\n    <% } %>\n\n    <% if (isRealTimePrice != 1 && flightTicketType == 2) { %>\n        <div class=\"calendar-detail-real\">\n            \u672C\u8D77\u4EF7\u5BF9\u5E94\u7684\u673A\u7968\u4E3A\u5B9E\u65F6\u673A\u7968\uFF0C\u9884\u8BA2\u8FC7\u7A0B\u4E2D\u53EF\u80FD\u4F1A\u53D1\u751F\u4EF7\u683C\u6216\u4F4D\u7F6E\u7684\u53D8\u66F4\uFF0C\u8BF7\u4EE5\u5360\u4F4D\u4EF7\u683C\u4E3A\u51C6\u3002\n        </div>\n    <% } %>\n\n    <% if (isRealTimePrice == 1) { %>\n        <div class=\"calendar-detail-real\">\n            \u5F53\u524D\u56E2\u671F\u4E3A\u5B9E\u65F6\u8BA1\u4EF7\u56E2\u671F\uFF0C\u9884\u8BA2\u8FC7\u7A0B\u4E2D\u4F1A\u6839\u636E\u60A8\u6240\u9009\u62E9\u7684\u51FA\u6E38\u9879\u76EE\u548C\u4F18\u60E0\u6D3B\u52A8\u5B9E\u65F6\u8BA1\u7B97\u4EF7\u683C\u3002\n        </div>\n    <% } %>\n\n    <% if (promotions && promotions.length) { %>\n        <div class=\"calendar-detail-activity\">\n            <div class=\"calendar-detail-activity-title\">\u56E2\u671F\u53EF\u9009\u4F18\u60E0\u6D3B\u52A8\uFF1A</div>\n            <div class=\"calendar-detail-activity-list\">\n                <% for (var i = 0; i < promotions.length; i++) { %>\n                    <div class=\"calendar-detail-activity-item\"><span><%= promotions[i].name %></span></div>\n                <% } %>\n            </div>\n        </div>\n    <% } %>\n    <% if (deadLineTime) { %>\n        <div class=\"calendar-detail-deadline\">\n            \u672C\u56E2\u671F\u62A5\u540D\u622A\u6B62\u65F6\u95F4\uFF1A<%= deadLineTime %>\u524D\n        </div>\n    <% } %>\n    <% if (setGroupFlag) { %>\n        <div class=\"calendar-detail-tip\">\n        *\u672C\u56E2\u671F\u94C1\u5B9A\u6210\u56E2\uFF0C\u4E0D\u53D1\u56E2\u6709\u8D54\u507F\n        </div>\n    <% } %>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var calendarData = exports.calendarData = [{
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2016-09-21",
            "tuniuPrice": 7599,
            "tuniuChildPrice": 6899,
            "adultMarketPrice": 6799,
            "djPrice": 7599,
            "djChildPrice": 6899,
            "startPrice": 7599,
            "excludeChildFlag": 0,
            "childPrice": 6899,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 18,
            "deadLineTime": "2016-09-14 18:00:00",
            "setGroupFlag": 1,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 14
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 23221716,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2016-10-21",
            "tuniuPrice": 7299,
            "tuniuChildPrice": 6599,
            "adultMarketPrice": 6999,
            "djPrice": 7299,
            "djChildPrice": 6599,
            "startPrice": 7299,
            "excludeChildFlag": 0,
            "childPrice": 6599,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2016-10-14 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893519,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2016-11-04",
            "tuniuPrice": 7299,
            "tuniuChildPrice": 6599,
            "adultMarketPrice": 6999,
            "djPrice": 7299,
            "djChildPrice": 6599,
            "startPrice": 7299,
            "excludeChildFlag": 0,
            "childPrice": 6599,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2016-10-28 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893518,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2016-11-18",
            "tuniuPrice": 7299,
            "tuniuChildPrice": 6599,
            "adultMarketPrice": 6999,
            "djPrice": 7299,
            "djChildPrice": 6599,
            "startPrice": 7299,
            "excludeChildFlag": 0,
            "childPrice": 6599,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2016-11-11 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893523,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2016-12-02",
            "tuniuPrice": 7299,
            "tuniuChildPrice": 6599,
            "adultMarketPrice": 6999,
            "djPrice": 7299,
            "djChildPrice": 6599,
            "startPrice": 7299,
            "excludeChildFlag": 0,
            "childPrice": 6599,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2016-11-25 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893522,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2016-12-09",
            "tuniuPrice": 7299,
            "tuniuChildPrice": 6599,
            "adultMarketPrice": 6999,
            "djPrice": 7299,
            "djChildPrice": 6599,
            "startPrice": 7299,
            "excludeChildFlag": 0,
            "childPrice": 6599,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2016-12-02 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893521,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2016-12-23",
            "tuniuPrice": 7299,
            "tuniuChildPrice": 6599,
            "adultMarketPrice": 6999,
            "djPrice": 7299,
            "djChildPrice": 6599,
            "startPrice": 7299,
            "excludeChildFlag": 0,
            "childPrice": 6599,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2016-12-16 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893520,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2016-12-30",
            "tuniuPrice": 8199,
            "tuniuChildPrice": 7399,
            "adultMarketPrice": 7899,
            "djPrice": 8199,
            "djChildPrice": 7399,
            "startPrice": 8199,
            "excludeChildFlag": 0,
            "childPrice": 7399,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2016-12-23 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893526,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2017-01-06",
            "tuniuPrice": 7299,
            "tuniuChildPrice": 6599,
            "adultMarketPrice": 6999,
            "djPrice": 7299,
            "djChildPrice": 6599,
            "startPrice": 7299,
            "excludeChildFlag": 0,
            "childPrice": 6599,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2016-12-30 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893525,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }, {
            "sourceSystemId": 6,
            "bookCityCode": 102,
            "departCityCode": 2500,
            "backCityCode": null ,
            "planId": 0,
            "departDate": "2017-01-20",
            "tuniuPrice": 7299,
            "tuniuChildPrice": 6599,
            "adultMarketPrice": 6999,
            "djPrice": 7299,
            "djChildPrice": 6599,
            "startPrice": 7299,
            "excludeChildFlag": 0,
            "childPrice": 6599,
            "flightTicketType": 0,
            "strategyIndex": -1,
            "strategyDtos": null ,
            "roomGrapFlag": 0,
            "aheadDate": 0,
            "deadLineDate": 7,
            "deadLineHour": 12,
            "deadLineTime": "2017-01-13 12:00:00",
            "setGroupFlag": 0,
            "stockInfo": {
                "stockSign": 1,
                "stockNum": 6
            },
            "indexNo": 0,
            "calendarNo": 28270932,
            "batchId": 32893524,
            "vendorId": 2598,
            "isRealTimePrice": 0
        }];
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cityModule = undefined;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _layer = __webpack_require__(11);
        var _resource = __webpack_require__(320);
        var resourceActions = _interopRequireWildcard(_resource);
        var _tip = __webpack_require__(326);
        var _cityDropTab = __webpack_require__(333);
        var _cityDropCity = __webpack_require__(334);
        var _cityCombine = __webpack_require__(335);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var ALL_TABS = ['ABCDEFG', 'HIJKL', 'MNOPQRST', 'UVWXYZ'];
        var tabRender = _templateNative.template.compile(_cityDropTab.resourceCityTabTemplate)
            , dropRender = _templateNative.template.compile(_cityDropCity.resourceCityDropTemplate)
            , combineRender = _templateNative.template.compile(_cityCombine.resourceCityCombineTemplate);
        var store = void 0;
        function getBackCities() {
            var departCity = store.getState('departCity');
            var allBackCities = store.getState('allBackCities') || {};
            var currentBackCities = allBackCities[departCity.code];
            return currentBackCities || [];
        }
        function reload() {
            window.location = ['/tour', store.getState('productId'), store.getState('bookCityCode'), store.getState('departCity').code, store.getState('backCity').code].join('/');
        }
        var cityModule = {
            init: function init() {
                var $depart = $('#J_ResourceDepartCity')
                    , $back = $('#J_ResourceBackCity')
                    , $backRow = $('#J_ResourceBackCityRow')
                    , $combineTip = $('#J_ResourceCombine')
                    , combineTipDialog = void 0
                    , departCity = void 0
                    , backCity = void 0;
                store = (0,
                    _store.getStore)();
                if ($depart.length) {
                    departCity = new City($depart,{
                        selected: store.getState('departCity'),
                        data: function data() {
                            return store.getState('allDepartCities');
                        },
                        hotData: function hotData() {
                            return store.getState('hotDepartCities');
                        },
                        onchange: function onchange(cityData) {
                            store.dispatch({
                                type: resourceActions['CHANGE_DEPART_CITY'],
                                data: cityData
                            });
                        }
                    });
                }
                if ($back.length) {
                    backCity = new City($back,{
                        type: 'back',
                        data: function data() {
                            return getBackCities();
                        },
                        onchange: function onchange(cityData) {
                            store.dispatch({
                                type: resourceActions['CHANGE_BACK_CITY'],
                                data: cityData
                            });
                        }
                    });
                }
                new _tip.Tip($combineTip,{
                    type: 'click',
                    content: function content() {
                        return combineRender({
                            departCity: store.getState('departCity'),
                            data: store.getState('combinedTransportCities')
                        });
                    },
                    dialog: {
                        area: ['500px', 'auto'],
                        tipsOffset: [10, -265],
                        arrowOffset: [-75, 0],
                        disableAutoLeft: true
                    }
                });
                store.subscribe(function() {
                    var backCities = getBackCities();
                    if (departCity) {
                        departCity.set(store.getState('departCity'));
                    }
                    if (backCities && backCities.length) {
                        if (backCities.length === 1) {
                            store.dispatch({
                                type: resourceActions['CHANGE_BACK_CITY'],
                                data: backCities[0]
                            });
                            $backRow.hide();
                        } else {
                            backCity.updateTotal(backCities.length);
                            backCity.reload();
                            $backRow.show();
                        }
                    }
                }, 'change:departCity');
                store.subscribe(function() {
                    reload();
                }, 'change:backCity');
                var backCities = getBackCities();
                if (backCities && backCities.length > 1) {
                    backCity.updateTotal(backCities.length);
                    backCity.reload();
                    if (store.getState('backCity')) {
                        backCity.set(store.getState('backCity'));
                    }
                    $backRow.show();
                }
            }
        };
        function getCityData(cityCode, cityList) {
            var res = void 0;
            if (cityList) {
                res = cityList.filter(function(city) {
                    return city.code == cityCode;
                }).map(function(city) {
                    return Object.assign({}, city);
                });
                res = res[0];
            }
            return res || null ;
        }
        function isInCityGroup(groupType, city) {
            var res = false;
            if (groupType && city && city.pinyin) {
                res = ~groupType.indexOf(city.pinyin.slice(0, 1).toUpperCase());
            }
            return !!res;
        }
        var City = function() {
            function City(selector, options) {
                _classCallCheck(this, City);
                this.options = options || {};
                this.$container = $(selector);
                this.$drop = this.$container.find('.resource-city-drop');
                this.$selected = this.$container.find('.resource-city-more-selected'),
                    this.$dropTab = this.$drop.find('.resource-city-drop-head');
                this.$dropList = this.$drop.find('.resource-city-drop-list');
                this.dropInited = false;
                this.currentTab = this.getDefaultTab();
                this.value = options.selected ? Object.assign({}, options.selected) : null ;
                this.bind();
            }
            _createClass(City, [{
                key: 'bind',
                value: function bind() {
                    var self = this
                        , $doc = $(document);
                    $doc.click(function() {
                        self.hideDrop();
                    }).on('customclick', function(e, sourceType) {
                        if (sourceType !== 'city') {
                            self.hideDrop();
                        }
                    });
                    this.$container.on('click', function(e) {
                        $doc.trigger('customclick', 'city');
                        e.stopPropagation();
                    }).hover(function() {}, function() {}).on('click', '.resource-city-more-label', function() {
                        self.toggleDrop();
                    }).on('click', '.resource-city-drop-tab-item', function() {
                        self.changeTab($(this).data('tab'));
                    }).on('click', '.resource-city-drop-city-item', function() {
                        self.change($(this).data('code'));
                        self.hideDrop();
                    });
                }
            }, {
                key: 'set',
                value: function set(city) {
                    if (city && city.code && city.name) {
                        this.value = Object.assign({}, city);
                        this.update();
                    }
                }
            }, {
                key: 'reload',
                value: function reload() {
                    this.value = null ;
                    this.currentTab = this.getDefaultTab();
                    this.update();
                    this.render();
                }
            }, {
                key: 'getCityList',
                value: function getCityList() {
                    return this.options.data && this.options.data() || [];
                }
            }, {
                key: 'getHotList',
                value: function getHotList() {
                    return this.options.hotData && this.options.hotData() || [];
                }
            }, {
                key: 'getCityName',
                value: function getCityName() {
                    return this.value ? this.value.name : '请选择';
                }
            }, {
                key: 'getCurrentGroupData',
                value: function getCurrentGroupData() {
                    var _this = this;
                    var cityList = void 0;
                    if (this.currentTab === 'hot') {
                        cityList = this.getHotList();
                    } else {
                        cityList = this.getCityList().filter(function(city) {
                            return isInCityGroup(_this.currentTab, city);
                        }).sort(function(prev, next) {
                            return prev.pinyin > next.pinyin ? 1 : -1;
                        });
                    }
                    return cityList;
                }
            }, {
                key: 'render',
                value: function render() {
                    this.renderTab();
                    this.renderCity();
                }
            }, {
                key: 'getAllTabs',
                value: function getAllTabs() {
                    var tmp = {};
                    var cityList = this.getCityList();
                    var hotList = this.getHotList();
                    if (cityList) {
                        cityList.forEach(function(city) {
                            ALL_TABS.some(function(tab) {
                                if (isInCityGroup(tab, city)) {
                                    tmp[tab] = (tmp[tab] || 0) + 1;
                                    return true;
                                }
                            });
                        });
                    }
                    var tabs = ALL_TABS.filter(function(tab) {
                        return tmp[tab];
                    });
                    if (hotList && hotList.length) {
                        tabs = ['hot'].concat(tabs);
                    }
                    return tabs;
                }
            }, {
                key: 'getDefaultTab',
                value: function getDefaultTab() {
                    return this.getAllTabs()[0];
                }
            }, {
                key: 'renderTab',
                value: function renderTab() {
                    var allTabs = this.getAllTabs();
                    this.$dropTab.html(tabRender({
                        list: allTabs,
                        current: this.currentTab || allTabs[0]
                    }));
                }
            }, {
                key: 'renderCity',
                value: function renderCity() {
                    this.$dropList.html(dropRender({
                        list: this.getCurrentGroupData(),
                        current: this.value || {
                            code: -1
                        }
                    }));
                }
            }, {
                key: 'changeTab',
                value: function changeTab(tab) {
                    this.currentTab = tab;
                    this.render();
                }
            }, {
                key: 'change',
                value: function change(cityCode) {
                    if (this.options && this.options.onchange) {
                        this.options.onchange(getCityData(cityCode, this.getCityList()));
                    }
                }
            }, {
                key: 'update',
                value: function update() {
                    this.$selected.html(this.getCityName());
                }
            }, {
                key: 'updateTotal',
                value: function updateTotal(total) {
                    this.$container.find('.resource-city-more-total').text(total);
                }
            }, {
                key: 'toggleDrop',
                value: function toggleDrop() {
                    if (this.$container.hasClass('expand')) {
                        this.hideDrop();
                    } else {
                        this.showDrop();
                    }
                }
            }, {
                key: 'showDrop',
                value: function showDrop() {
                    this.render();
                    this.dropInited = true;
                    this.$container.addClass('expand');
                }
            }, {
                key: 'hideDrop',
                value: function hideDrop() {
                    this.$container.removeClass('expand');
                }
            }]);
            return City;
        }();
        exports.cityModule = cityModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var resourceCityTabTemplate = exports.resourceCityTabTemplate = "\n<ul class=\"resource-city-drop-tab\">\n    <% for (var i = 0; i < list.length; i++) { %>\n        <li class=\"resource-city-drop-tab-item <%= current == list[i] ? 'active' : ''%>\" data-tab=\"<%= list[i] %>\"><%= list[i] == 'hot' ? '\u63A8\u8350\u57CE\u5E02' : list[i] %></li>\n    <% } %>\n</ul>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var resourceCityDropTemplate = exports.resourceCityDropTemplate = "\n<ul class=\"resource-city-drop-city-city\">\n<% for (var i = 0; i < list.length; i++) {%>\n    <% var item = list[i]%>\n    <li class=\"resource-city-drop-city-item <%= current.code == item.code ? 'selected' : ''%>\" data-code=\"<%= item.code %>\">\n        <div class=\"resource-city-drop-city-name\"><%= item.name %></div>\n        <div class=\"resource-city-drop-city-price\"><strong>&yen;<%= item.price %></strong>\u8D77</div>\n    </li>\n<%}%>\n</ul>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var resourceCityCombineTemplate = exports.resourceCityCombineTemplate = "\n<div class=\"resource-combine-detail\">\n    <% if (departCity.code == 0) { %>\n        <div class=\"resource-combine-detail-head\">\u63D0\u4F9B\u6240\u5728\u5730\u5230\u76EE\u7684\u5730\u95F4\u7684\u53EF\u9009\u4EA4\u901A\u670D\u52A1\uFF1A</div>\n    <% } else { %>\n        <div class=\"resource-combine-detail-head\">\u63D0\u4F9B\u4EE5\u4E0B\u57CE\u5E02\u5230\u51FA\u53D1\u5730<%= departCity.name %>\u7684\u53EF\u9009\u4EA4\u901A\u670D\u52A1\uFF1A</div>\n    <% } %>\n    <div class=\"resource-combine-detail-body\">\n        <dl class=\"resource-combine-detail-cities\">\n            <% for (var area in data) { %>\n                <% var areaData = data[area] %>\n                <% if (areaData && areaData.length) { %>\n                    <dt><%= area%>\uFF1A</dt>\n                    <dd>\n                        <% for (var cityIndex = 0; cityIndex < areaData.length; cityIndex++) { %>\n                            <span><%= areaData[cityIndex].cityName %></span>\n                        <% } %>\n                    </dd>\n                <% } %>\n            <% } %>\n        </dl>\n        <div class=\"resouce-combine-detail-tip\">\n            \u53EF\u9009\u4EA4\u901A\u670D\u52A1\u662F\u6211\u4EEC\u63D0\u4F9B\u7684\u60A8\u6240\u5728\u57CE\u5E02\u5230\u7EBF\u8DEF\u5B9E\u9645\u51FA\u53D1\u57CE\u5E02\u95F4\u7684\u4EA4\u901A\u670D\u52A1\u3002\n        </div>\n        <div class=\"resouce-combine-detail-tip\">\n            * \u60A8\u53EF\u4EE5\u6839\u636E\u60A8\u7684\u5B9E\u9645\u9884\u8BA2\u57CE\u5E02\u5728\u4E0B\u5355\u65F6\u9009\u62E9\u4E0D\u540C\u7684\u53EF\u9009\u4EA4\u901A\u670D\u52A1\u3002\n        </div>\n    </div>\n</div>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.dateModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _actions = __webpack_require__(337);
        var _utils = __webpack_require__(338);
        var utils = _interopRequireWildcard(_utils);
        var _datePicker = __webpack_require__(339);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var NOW = utils.getYMDDate(new Date());
        var FLASH_TIMES = 4;
        var FLASH_DELAY = 200;
        var store = void 0;
        var datePickerVisible = false;
        var currentApplication = void 0;
        var $win = $(window);
        var $application = void 0;
        var container = void 0
            , labelElement = void 0;
        var datePicker = void 0;
        function getDatePickerOffset() {
            var offset = container.offset()
                , width = container.width()
                , winWidth = $win.width();
            offset.top += container.height() + 10;
            offset.arrowLeft = 28;
            if (offset.left + 650 > winWidth) {
                offset.arrowLeft = offset.arrowLeft + offset.left + 650 - winWidth;
                offset.left = offset.left - (offset.left + 650 - winWidth);
            }
            return offset;
        }
        function getDateList() {
            var dateList = {};
            store.getState('calendar').forEach(function(date) {
                dateList[date.departDate] = true;
            });
            return dateList;
        }
        function getFirstDateWithPrice() {
            return (store.getState('calendar')[0] || {}).departDate;
        }
        function getDataByDate(date) {
            var calendarData = store.getState('calendar')
                , res = null ;
            if (calendarData && calendarData.length) {
                calendarData.some(function(item) {
                    if (item.departDate === date) {
                        res = item;
                        return true;
                    }
                });
            }
            return res;
        }
        function getJourneyDays(departDate) {
            if (store.getState('isSupportMultipleJourney')) {
                var tab = (store.getState('multiTab') || []).filter(function(tab) {
                    return (tab.applyDateList || []).indexOf(departDate) !== -1;
                })[0];
                return tab ? tab.days : 0;
            } else {
                return store.getState('journeyDays');
            }
        }
        function getApplicationByDate(departDate) {
            var multiTab = store.getState('multiTab');
            return (multiTab || []).filter(function(journey) {
                return (journey.applyDateList || []).indexOf(departDate) !== -1;
            })[0];
        }
        var dateModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                container = $('#J_ResourceDate');
                $application = $('#J_ResourceApplication');
                labelElement = container.find('.resource-date-selected');
                datePicker = (0,
                    _datePicker.createDatePanel)();
                store.subscribe(function() {
                    dateModule.bind();
                    dateModule.update();
                }, 'change:calendar');
            },
            bind: function bind() {
                var $doc = $(document);
                $doc.click(function() {
                    dateModule.hideDatePicker();
                }).on('customclick', function(e, sourceType) {
                    if (sourceType !== 'date') {
                        dateModule.hideDatePicker();
                    }
                });
                container.click(function(e) {
                    dateModule.toggleDatePicker();
                    $doc.trigger('customclick', 'date');
                    e.stopPropagation();
                });
                $application.find('[data-role=button]').click(function() {
                    if (currentApplication) {
                        store.dispatch({
                            type: _actions.actions['CHANG_DETAIL_JOURNEY'],
                            data: currentApplication.journeyId
                        });
                        var offset = $('#J_DetailMultiRoute').offset();
                        offset && $win.scrollTop(offset.top);
                    }
                });
            },
            change: function change(date) {
                store.dispatch({
                    type: _actions.actions['CHANGE_DEPART_DATE_TARGET'],
                    data: 'date'
                });
                store.dispatch({
                    type: _actions.actions['CHANGE_DEPART_DATE'],
                    data: date
                });
                dateModule.update();
            },
            update: function update() {
                var data = getDataByDate(store.getState('departDate'));
                if (data) {
                    var departDate = data.departDate;
                    var nextDate = utils.getNextDate(departDate, getJourneyDays(departDate));
                    labelElement.html([utils.formateDate(departDate, 'MM/DD'), ' ', utils.getWeek(departDate), '出发', ' -- ', utils.formateDate(nextDate, 'MM/DD'), ' ', utils.getWeek(nextDate), '返回'].join(''));
                    if (store.getState('isSupportMultipleJourney')) {
                        currentApplication = getApplicationByDate(departDate);
                        if (currentApplication) {
                            $application.show().find('[data-role=label]').text(['行程', currentApplication.index, '-', currentApplication.name].join(''));
                        } else {
                            $application.hide().find('[data-role=label]').text('');
                        }
                    }
                }
            },
            toggleDatePicker: function toggleDatePicker() {
                if (datePickerVisible) {
                    dateModule.hideDatePicker();
                } else {
                    dateModule.showDatePicker();
                }
            },
            showDatePicker: function showDatePicker() {
                var departDate = store.getState('departDate') || getFirstDateWithPrice() || NOW
                    , departDateObj = new Date(utils.justifyDate(departDate));
                datePicker.open({
                    type: 2,
                    year: departDateObj.getFullYear(),
                    month: departDateObj.getMonth(),
                    current: store.getState('departDate'),
                    dateList: getDateList(),
                    min: utils.getNowDate(),
                    onChange: function onChange(date) {
                        dateModule.change(date);
                    }
                }, getDatePickerOffset());
                datePickerVisible = true;
            },
            hideDatePicker: function hideDatePicker() {
                datePicker.close();
                datePickerVisible = false;
            },
            flash: function flash() {
                var times = 1;
                function _toggle() {
                    if (times % 2) {
                        container.addClass('flashed');
                    } else {
                        container.removeClass('flashed');
                    }
                    if (times % 2 !== 0 || times < FLASH_TIMES) {
                        times++;
                        _flash();
                    }
                }
                function _flash() {
                    setTimeout(_toggle, FLASH_DELAY);
                }
                _toggle();
            }
        };
        exports.dateModule = dateModule;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.actions = undefined;
        var _resource = __webpack_require__(320);
        var resourceActions = _interopRequireWildcard(_resource);
        var _common = __webpack_require__(318);
        var commonActions = _interopRequireWildcard(_common);
        var _detail = __webpack_require__(322);
        var detailActions = _interopRequireWildcard(_detail);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var actions = exports.actions = Object.assign({}, commonActions, resourceActions, detailActions);
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var DATE_SEPERATOR = '-';
        var WEEKS = ['日', '一', '二', '三', '四', '五', '六'];
        function justifyDate(date) {
            return String(date).replace(/\-/g, '/');
        }
        function justifyNumber(number) {
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
            number = String(number);
            for (var i = Math.max(length - number.length, 0); i > 0; i--) {
                number = '0' + number;
            }
            return number;
        }
        function getYMDDate(dateObj) {
            return [dateObj.getFullYear(), justifyNumber(dateObj.getMonth() + 1), justifyNumber(dateObj.getDate())].join(DATE_SEPERATOR);
        }
        function getYMDate(dateObj) {
            if (typeof dateObj === 'string') {
                dateObj = new Date(justifyDate(dateObj));
            }
            return [dateObj.getFullYear(), justifyNumber(dateObj.getMonth() + 1)].join(DATE_SEPERATOR);
        }
        function getNowDate() {
            return getYMDDate(new Date());
        }
        function getWeek(date) {
            var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '周';
            if (typeof date === 'string') {
                date = new Date(justifyDate(date));
            }
            return prefix + WEEKS[date.getDay()];
        }
        function formateDate(date) {
            var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD';
            if (typeof date === 'string') {
                date = new Date(justifyDate(date));
            }
            return pattern.replace(/YYYY/g, date.getFullYear()).replace(/MM/g, justifyNumber(date.getMonth() + 1)).replace(/DD/g, justifyNumber(date.getDate()));
        }
        function getNextDate(date) {
            var delta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            if (typeof date === 'string') {
                date = new Date(justifyDate(date));
            }
            date.setDate(date.getDate() + delta - 1);
            return getYMDDate(date);
        }
        function str2Date(dateStr) {
            var date = void 0;
            if (typeof dateStr === 'string') {
                date = new Date(justifyDate(dateStr));
            } else {
                date = dateStr;
            }
            return date;
        }
        var steps = [{
            unit: 1000,
            property: 'millsecond'
        }, {
            unit: 60,
            property: 'second'
        }, {
            unit: 60,
            property: 'minute'
        }, {
            unit: 24,
            property: 'hour'
        }, {
            unit: 1,
            property: 'day'
        }];
        function getDeltaDate(start, end) {
            var delta = {};
            start = str2Date(start);
            end = str2Date(end);
            steps.reduce(function(prev, item) {
                delta[item.property] = prev % item.unit;
                return parseInt(prev / item.unit, 10);
            }, start - end || 0);
            return delta;
        }
        function checkEmail(email) {
            var pattern = /(?=^.{5,255}$)(^([\w\!\#\$\%\&\'\*\+\-\.\/\?\^\_\`\{\|\}\~]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-]+)$)/;
            return pattern.test(String(email));
        }
        exports.str2Date = str2Date;
        exports.justifyDate = justifyDate;
        exports.justifyNumber = justifyNumber;
        exports.getYMDate = getYMDate;
        exports.getYMDDate = getYMDDate;
        exports.getNowDate = getNowDate;
        exports.getWeek = getWeek;
        exports.formateDate = formateDate;
        exports.getNextDate = getNextDate;
        exports.getDeltaDate = getDeltaDate;
        exports.checkEmail = checkEmail;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        function isFunction(obj) {
            return typeof obj === 'function';
        }
        function once(func) {
            var ran = false, memo;
            return function() {
                if (ran)
                    return memo;
                ran = true;
                memo = func.apply(this, arguments);
                func = null ;
                return memo;
            }
                ;
        }
        ;function str2Date(str) {
            if (typeof str === 'string') {
                return new Date(str.replace(/\-/g, '/'));
            } else {
                return str;
            }
        }
        function justifyNum(num, digit) {
            digit = digit || 2;
            num = parseInt(num) + '';
            while (num.length < digit) {
                num = '0' + num;
            }
            return num;
        }
        function date2Str(date) {
            return date.getFullYear() + '-' + justifyNum(date.getMonth() + 1) + '-' + justifyNum(date.getDate());
        }
        function getDeltaDays(start, end) {
            if (typeof start === 'string') {
                start = str2Date(start);
            }
            if (typeof end === 'string') {
                end = str2Date(end);
            }
            return Math.floor((end - start) / 86400000);
        }
        function getCaleFirst(year, month) {
            var date = new Date(year,month,1);
            var day = date.getDay();
            if (day !== 0) {
                date.setDate(1 - day);
            } else {
                date.setDate(-6);
            }
            return date2Str(date);
        }
        function getCaleLast(year, month, first) {
            var date = new Date(year,month + 1,0);
            var day = date.getDay();
            if (day !== 6) {
                date.setDate(date.getDate() + 6 - day);
            }
            if (getDeltaDays(first, date) < 41) {
                date.setDate(date.getDate() + 7);
            }
            return date2Str(date);
        }
        function getMonthFirst(year, month) {
            var date = new Date(year,month,1);
            return date2Str(date);
        }
        function getMonthLast(year, month) {
            var date = new Date(year,month + 1,0);
            return date2Str(date);
        }
        function getNowDate() {
            return date2Str(new Date());
        }
        var PanelTemplate = '<div class="dp-panel">' + '<span class="dp-arrow"><i></i></span>' + '<div class="dp-btns">' + '<div class="dp-btn dp-prev">&lt;</div>' + '<div class="dp-btn dp-next">&gt;</div>' + '</div>' + '<div class="dp-wrap">' + '</div>' + '</div>';
        var PanelBoxTemplate = '<div class="dp-box">' + '<div class="dp-month">{month}</div>' + '<div class="dp-days">' + '<div class="dp-weeks">' + '<div class="dp-week dp-weekend">日</div>' + '<div class="dp-week">一</div>' + '<div class="dp-week">二</div>' + '<div class="dp-week">三</div>' + '<div class="dp-week">四</div>' + '<div class="dp-week">五</div>' + '<div class="dp-week dp-weekend">六</div>' + '</div>' + '<div class="dp-cale">{cale}</div>' + '</div>' + '</div>';
        var DefaultConfig = {
            type: 1,
            year: 2015,
            month: 6
        };
        function DatePanel() {
            this.init();
        }
        DatePanel.prototype = {
            init: function init() {
                var self = this;
                var wrap = $(PanelTemplate);
                this.hovered = false;
                this.prevBtn = wrap.find('.dp-prev');
                this.nextBtn = wrap.find('.dp-next');
                this.monthTit = wrap.find('.dp-month');
                this.caleWrap = wrap.find('.dp-wrap');
                this.wrap = wrap;
                this.config = {
                    type: 1,
                    year: 2015,
                    month: 6
                };
                wrap.on('click', '.dp-date-item', function(e) {
                    self.select($(e.currentTarget).data('date'));
                    self.hovered = false;
                    self.wrap.hide();
                });
                wrap.on('mousedown', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }).hover(function() {
                    self.hovered = true;
                }, function() {
                    self.hovered = false;
                });
                this.nextBtn.click(function() {
                    self.nextMonth();
                });
                this.prevBtn.click(function() {
                    self.prevMonth();
                });
                wrap.appendTo('body');
            },
            open: function open(config, offset) {
                this.set(config);
                this.render();
                this.show(offset);
            },
            show: function show(offset) {
                var width = 0;
                this.wrap.css({
                    left: offset.left,
                    top: offset.top
                }).show();
                this.wrap.find('.dp-arrow').css({
                    left: offset.arrowLeft
                });
                this.caleWrap.find('.dp-box').each(function(index) {
                    width += $(this).width();
                });
                this.caleWrap.width(width);
            },
            close: function close() {
                if (!this.hovered) {
                    this.wrap.hide();
                }
            },
            select: function select(date) {
                var dateObj, selectMonth, month, onChange;
                dateObj = str2Date(date);
                selectMonth = dateObj.getMonth();
                month = this.get('month');
                onChange = this.get('onChange');
                this.set('current', date);
                if (onChange && isFunction(onChange)) {
                    onChange(date);
                }
                if (selectMonth < month || selectMonth > month + this.get('type') - 1) {
                    this.goMonth(dateObj.getFullYear(), dateObj.getMonth());
                } else {
                    this.updateView();
                }
            },
            goMonth: function goMonth(year, month) {
                this.set('year', year);
                this.set('month', month);
                this.render();
            },
            prevMonth: function prevMonth() {
                var date = new Date(this.get('year'),this.get('month') - this.get('type'),1);
                this.goMonth(date.getFullYear(), date.getMonth());
            },
            nextMonth: function nextMonth() {
                var date = new Date(this.get('year'),this.get('month') + this.get('type'),1);
                this.goMonth(date.getFullYear(), date.getMonth());
            },
            set: function set(property, value) {
                if (typeof property === 'string' && value !== undefined) {
                    this.config[property] = value;
                } else {
                    this.config = $.extend({}, DefaultConfig, property);
                }
            },
            get: function get(property) {
                return this.config[property];
            },
            render: function render() {
                switch (this.get('type')) {
                    case 1:
                        this.renderSingleBox();
                        break;
                    default:
                        this.renderMultiBox();
                        break;
                }
            },
            getMonthTit: function getMonthTit(year, month) {
                return (year || this.get('year')) + '年' + ((month === undefined ? this.get('month') : month) + 1) + '月';
            },
            renderSingleBox: function renderSingleBox() {
                var year = this.get('year')
                    , month = this.get('month')
                    , min = getCaleFirst(year, month)
                    , max = getCaleLast(year, month, min)
                    , viewHtml = this.buildSingleView(min, max);
                this.caleWrap.removeClass('dp-multi').html(viewHtml);
            },
            buildSingleView: function buildSingleView(min, max) {
                var anchor = str2Date(min)
                    , nowDate = getNowDate()
                    , anchorStr = min
                    , minDate = this.get('min')
                    , maxDate = this.get('max')
                    , current = this.get('current')
                    , dateList = this.get('dateList')
                    , viewHtml = []
                    , index = 1
                    , boxHtml = PanelBoxTemplate;
                viewHtml.push('<div class="dp-dates">');
                while (anchorStr <= max) {
                    viewHtml.push('<div class="dp-date ');
                    if (anchorStr === nowDate) {
                        viewHtml.push(' dp-now');
                    }
                    if (anchorStr === current) {
                        viewHtml.push(' dp-selected');
                    }
                    viewHtml.push('">');
                    if (anchorStr < minDate || max && anchorStr > max || maxDate && anchorStr > maxDate || dateList && !dateList[anchorStr]) {
                        viewHtml.push('<span class="dp-date-disabled"><i>' + (anchorStr == nowDate ? '今天' : anchor.getDate()) + '</i></span>');
                    } else {
                        viewHtml.push('<a class="dp-date-item" data-date="' + anchorStr + '" href="javascript:;"><i>' + (anchorStr == nowDate ? '今天' : anchor.getDate()) + '</i></a>');
                    }
                    viewHtml.push('</div>');
                    anchor.setDate(anchor.getDate() + 1);
                    anchorStr = date2Str(anchor);
                    index++;
                }
                viewHtml.push('</div>');
                return boxHtml.replace(/\{month\}/, this.getMonthTit()).replace(/\{cale\}/, viewHtml.join(''));
            },
            renderMultiBox: function renderMultiBox() {
                var amount = this.get('type');
                this.caleWrap.empty();
                for (var i = 0; i < amount; i++) {
                    this.caleWrap.append(this.buildMultiSingleView(this.get('year'), this.get('month') + i));
                }
                this.caleWrap.addClass('dp-multi').children().first().addClass('dp-box-l').end().last().addClass('dp-box-r');
            },
            buildMultiSingleView: function buildMultiSingleView(year, month) {
                var min = getCaleFirst(year, month), max = getCaleLast(year, month, min), firstDate = getMonthFirst(year, month), lastDate = getMonthLast(year, month), currentViewFirstDate = str2Date(firstDate), currentViewYear = currentViewFirstDate.getFullYear(), currentViewMonth = currentViewFirstDate.getMonth(), current = this.get('current'), minDate = this.get('min'), maxDate = this.get('max'), dateList = this.get('dateList'), anchor = str2Date(min), nowDate = getNowDate(), anchorStr = min, viewHtml = [], index = 1, boxHtml = PanelBoxTemplate, isDisabled, isInCurrentMonth;
                viewHtml.push('<div class="dp-dates">');
                while (anchorStr <= max) {
                    isDisabled = anchorStr < minDate || max && anchorStr > max || maxDate && anchorStr > maxDate || dateList && !dateList[anchorStr];
                    isInCurrentMonth = anchorStr >= firstDate && anchorStr <= lastDate;
                    viewHtml.push('<div class="dp-date');
                    if (anchorStr === nowDate) {
                        viewHtml.push(' dp-now');
                    }
                    if (anchorStr === current && anchorStr >= firstDate && anchorStr <= lastDate) {
                        viewHtml.push(' dp-selected');
                    }
                    if (isDisabled) {
                        viewHtml.push(' dp-disabled');
                    } else {
                        viewHtml.push(' dp-enabled');
                    }
                    if (!isInCurrentMonth) {
                        viewHtml.push(' dp-other');
                    }
                    viewHtml.push('">');
                    if (isInCurrentMonth) {
                        if (isDisabled) {
                            viewHtml.push('<span class="dp-date-disabled"><i>' + (anchorStr == nowDate ? '今天' : anchor.getDate()) + '</i></span>');
                        } else {
                            viewHtml.push('<a class="dp-date-item" data-date="' + anchorStr + '" href="javascript:;"><i>' + (anchorStr == nowDate ? '今天' : anchor.getDate()) + '</i></a>');
                        }
                    } else {
                        viewHtml.push('<span class="dp-date-disabled"></span>');
                    }
                    viewHtml.push('</div>');
                    anchor.setDate(anchor.getDate() + 1);
                    anchorStr = date2Str(anchor);
                    index++;
                }
                viewHtml.push('</div>');
                return boxHtml.replace(/\{month\}/, this.getMonthTit(currentViewYear, currentViewMonth)).replace(/\{cale\}/, viewHtml.join(''));
            },
            updateView: function updateView() {
                this.caleWrap.find('.dp-selected').removeClass('dp-selected').end().find('[data-date=' + this.get('current') + ']').parent().addClass('dp-selected');
            }
        };
        var PickerDefaultConfig = {
            type: 2
        };
        function DatePicker(target, config) {
            var now = str2Date(config.current || new Date()), dateList;
            this.config = {};
            this.set($.extend({}, PickerDefaultConfig, config));
            this.__fullDate = date2Str(now);
            this.__year = now.getFullYear();
            this.__month = now.getMonth();
            this.__date = now.getDate();
            if (config.dateList && $.isArray(config.dateList)) {
                dateList = {};
                $.each(config.dateList, function(index, dateItem) {
                    dateList[dateItem] = true;
                });
                this.__dateList = dateList;
            }
            this.set('min', config.min || date2Str(new Date()));
            this.set('max', config.max);
            this.__panel = createDatePanel();
            this.__target = $(target);
            this.init();
        }
        DatePicker.prototype = {
            init: function init() {
                var self = this;
                this.__target.on('focus', function() {
                    self.open();
                }).on('blur', function() {
                    self.close();
                }).on('change', function() {
                    self.__fullDate = this.value;
                }).prop({
                    readonly: true
                });
            },
            open: function open() {
                var self = this;
                var offset = this.__target.offset()
                    , onChange = this.get('onChange') || function() {}
                    , min = this.get('min')
                    , max = this.get('max');
                offset.top = offset.top + this.__target.outerHeight();
                this.getSelected();
                this.__panel.open({
                    type: this.config.type,
                    year: this.__year,
                    month: this.__month,
                    current: this.__fullDate,
                    dateList: this.__dateList,
                    min: $.isFunction(min) ? min() : min,
                    max: $.isFunction(max) ? max() : max,
                    onChange: function onChange(date) {
                        self.select(date);
                    }
                }, offset);
            },
            close: function close() {
                this.__panel.close();
            },
            getSelected: function getSelected() {
                var dateStr = this.__target.val() || this.__fullDate
                    , date = str2Date(dateStr);
                this.__fullDate = dateStr;
                this.__year = date.getFullYear();
                this.__month = date.getMonth();
                this.__date = date.getDate();
            },
            select: function select(dateStr) {
                var date = str2Date(dateStr)
                    , onChange = this.get('onChange') || function() {}
                    ;
                if (date !== this.__fullDate) {
                    this.__fullDate = dateStr;
                    this.__year = date.getFullYear();
                    this.__month = date.getMonth();
                    this.__date = date.getDate();
                    this.__target.val(dateStr).trigger('change');
                    onChange(dateStr);
                }
                this.__target.blur();
                this.close();
            },
            set: function set(property, value) {
                if (typeof property === 'string') {
                    if (value) {
                        this.config[property] = value;
                    }
                } else {
                    this.config = $.extend({}, PickerDefaultConfig, property);
                }
            },
            get: function get(property) {
                return this.config[property];
            }
        };
        var createDatePanel = once(function() {
            return new DatePanel();
        });
        function createDatePicker(target, config) {
            return new DatePicker(target,config || {});
        }
        $.fn.datePicker = function() {
            var args = arguments;
            return this.each(function() {
                var picker, config = args[0];
                if (typeof config === 'string') {
                    picker = $(this).data('datePicker');
                    if (picker && $.isFunction(picker[config])) {
                        picker[config].apply(picker, Array.prototype.slice.call(args, 1));
                    }
                } else {
                    $(this).data('datePicker', createDatePicker($(this), config));
                }
            });
        }
        ;
        exports.createDatePicker = createDatePicker;
        exports.createDatePanel = createDatePanel;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.touristModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _layer = __webpack_require__(11);
        var _resource = __webpack_require__(320);
        var resourceActions = _interopRequireWildcard(_resource);
        var _numberSelect = __webpack_require__(341);
        var _tourist = __webpack_require__(342);
        var _touristChildNotSupported = __webpack_require__(343);
        var _touristChildTip = __webpack_require__(344);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var store = void 0;
        var container = void 0
            , customContainer = void 0;
        var adultSelect = void 0
            , childSelect = void 0
            , freeChildSelect = void 0;
        var render = _templateNative.template.compile(_tourist.touristTemplate)
            , notSupportedChildRender = _templateNative.template.compile(_touristChildNotSupported.touristChildNotSupportedTemplate)
            , childTipRender = _templateNative.template.compile(_touristChildTip.touristChildTipTemplate);
        function getChildTip() {
            var journey = store.getState('journey');
            var tip = '';
            var journeyId = void 0;
            function getTip(journeyData) {
                var defaultJourney = journeyData || {};
                var costInclude = defaultJourney.costInclude || {};
                return costInclude.childStdInfo || '';
            }
            if (store.getState('isSupportMultipleJourney') == 1) {
                var defaultTab = (store.getState('multiTab') || [])[0];
                if (defaultTab && (journeyId = defaultTab.journeyId)) {
                    Object.keys(journey || {}).some(function(itemId) {
                        if (itemId == journeyId) {
                            tip = getTip(journey[itemId]);
                            return true;
                        }
                    });
                }
            } else {
                tip = getTip(journey);
            }
            return tip;
        }
        function createItemElement(data) {
            return $(render(data)).appendTo(container.find('.resource-section-content'));
        }
        function createChildNotSupportedItem() {
            return $(notSupportedChildRender()).appendTo(container.find('.resource-section-content'));
        }
        function getDateData() {
            var date = store.getState('departDate');
            return store.getState('calendar').filter(function(item) {
                return item.departDate === date;
            })[0];
        }
        function getMinNumber(touristType) {
            var adult = store.getState('adult')
                , child = store.getState('child')
                , min = 0;
            switch (touristType) {
                case 'adult':
                    if (isYouXue()) {
                        if (adult + child > 1) {
                            min = 0;
                        } else {
                            min = adult;
                        }
                    } else {
                        min = 1;
                    }
                    break;
                case 'child':
                    if (isYouXue()) {
                        if (adult + child > 1) {
                            min = 0;
                        } else {
                            min = child;
                        }
                    } else {
                        min = 0;
                    }
                    break;
                case 'freeChild':
                    min = 0;
                    break;
            }
            return min;
        }
        function getMaxNumber(touristType) {
            var max = 0;
            switch (touristType) {
                case 'adult':
                    max = 99;
                    break;
                case 'child':
                    if (isTrainType()) {
                        max = 4 * store.getState('adult');
                    } else {
                        max = 20;
                    }
                    break;
                case 'freeChild':
                    if (isTrainType()) {
                        max = 1 * store.getState('adult');
                    } else {
                        max = 0;
                    }
                    break;
            }
            return max;
        }
        function isTrainType() {
            return store.getState('proMode') == 2;
        }
        function isYouXue() {
            return store.getState('tagType') == 11;
        }
        var touristModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                container = $('#J_ResourceTourist');
                customContainer = $('#J_ResourceCustom');
                store.subscribe(function() {
                    this.initSelect();
                }
                    .bind(this), 'change:calendar');
                store.subscribe(function() {
                    this.initSelect();
                }
                    .bind(this), 'change:departDate');
                store.subscribe(function() {
                    adultSelect && adultSelect.set(store.getState('adult'));
                    this.toggleCustom();
                    this.updateRelation();
                }
                    .bind(this), 'change:adult');
                store.subscribe(function() {
                    childSelect && childSelect.set(store.getState('child'));
                    this.updateRelation();
                }
                    .bind(this), 'change:child');
                store.subscribe(function() {
                    freeChildSelect && freeChildSelect.set(store.getState('freeChild'));
                    this.updateRelation();
                }
                    .bind(this), 'change:freeChild');
                if (store.getState('calendar')) {
                    this.initSelect();
                }
            },
            initSelect: function initSelect() {
                this.initAdult();
                this.initChild();
                this.initFreeChild();
            },
            initAdult: function initAdult() {
                if (adultSelect) {
                    adultSelect.remove();
                }
                container.find('.resource-tourist-adult').remove();
                var data = getDateData();
                var element = createItemElement({
                    type: 'adult',
                    price: data && data.tuniuPrice,
                    isReal: data && data.isRealTimePrice
                });
                adultSelect = (0,
                    _numberSelect.createNumberSelect)(element.find('.number-select'), {
                    min: getMinNumber('adult'),
                    max: getMaxNumber('adult'),
                    autoSet: false,
                    defaultValue: store.getState('adult'),
                    onchange: this.changeAdult.bind(this)
                });
            },
            initChild: function initChild() {
                if (childSelect) {
                    childSelect.remove();
                }
                container.find('.resource-tourist-child').remove();
                var data = getDateData();
                var element = void 0;
                if (data && data.excludeChildFlag) {
                    element = createChildNotSupportedItem();
                    childSelect = null ;
                } else {
                    element = createItemElement({
                        type: 'child',
                        price: data && data.tuniuChildPrice,
                        isTrain: isTrainType(),
                        isReal: data && data.isRealTimePrice,
                        childTip: getChildTip()
                    });
                    childSelect = (0,
                        _numberSelect.createNumberSelect)(element.find('.number-select'), {
                        min: getMinNumber('child'),
                        max: getMaxNumber('child'),
                        autoSet: false,
                        defaultValue: store.getState('child'),
                        onchange: this.changeChild.bind(this)
                    });
                }
                if (element) {
                    (function() {
                        var tipElement = element.find('.J_ResourceChildTip');
                        var dialog = void 0;
                        tipElement.hover(function() {
                            dialog = _layer.layer.open({
                                type: 4,
                                skin: 'layui-layer-rim',
                                area: ['200px', 'auto'],
                                content: [childTipRender({
                                    content: tipElement.data('tip')
                                }), tipElement],
                                tips: 3,
                                shade: false,
                                fix: false,
                                closeBtn: false,
                                tipsOffset: [10, -27]
                            });
                        }, function() {
                            _layer.layer.close(dialog);
                        });
                    })();
                }
            },
            initFreeChild: function initFreeChild() {
                if (freeChildSelect) {
                    freeChildSelect.remove();
                }
                container.find('.resource-tourist-freechild').remove();
                if (!isTrainType()) {
                    return;
                }
                var data = getDateData();
                var element = createItemElement({
                    type: 'freeChild',
                    price: 0
                });
                freeChildSelect = (0,
                    _numberSelect.createNumberSelect)(element.find('.number-select'), {
                    min: getMinNumber('freeChild'),
                    max: getMaxNumber('freeChild'),
                    autoSet: false,
                    defaultValue: store.getState('freeChild'),
                    onchange: this.changeFreeChild.bind(this)
                });
                if (element) {
                    (function() {
                        var tipElement = element.find('.J_ResourceFreeChildTip');
                        var dialog = void 0;
                        tipElement.hover(function() {
                            dialog = _layer.layer.open({
                                type: 4,
                                skin: 'layui-layer-rim',
                                area: ['200px', 'auto'],
                                content: [childTipRender({
                                    content: tipElement.data('tip')
                                }), tipElement],
                                tips: 3,
                                shade: false,
                                fix: false,
                                closeBtn: false,
                                tipsOffset: [10, -27]
                            });
                        }, function() {
                            _layer.layer.close(dialog);
                        });
                    })();
                }
            },
            changeAdult: function changeAdult(value) {
                store.dispatch({
                    type: resourceActions['CHANGE_ADULT'],
                    data: value
                });
            },
            changeChild: function changeChild(value) {
                store.dispatch({
                    type: resourceActions['CHANGE_CHILD'],
                    data: value
                });
            },
            changeFreeChild: function changeFreeChild(value) {
                store.dispatch({
                    type: resourceActions['CHANGE_FREE_CHILD'],
                    data: value
                });
            },
            updateRelation: function updateRelation() {
                if (isYouXue()) {
                    adultSelect && adultSelect.config({
                        min: getMinNumber('adult')
                    });
                    childSelect && childSelect.config({
                        min: getMinNumber('child')
                    });
                }
                if (isTrainType()) {
                    childSelect && childSelect.config({
                        max: getMaxNumber('child')
                    });
                    freeChildSelect && freeChildSelect.config({
                        max: getMaxNumber('freeChild')
                    });
                }
            },
            toggleCustom: function toggleCustom() {
                if (store.getState('adult') >= 10) {
                    this.showCustom();
                } else {
                    this.hideCustom();
                }
            },
            showCustom: function showCustom() {
                customContainer.show();
            },
            hideCustom: function hideCustom() {
                customContainer.hide();
            }
        };
        exports.touristModule = touristModule;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var defaultOptions = {
            min: -Infinity,
            max: Infinity,
            minus: true,
            plus: true,
            defaultValue: 1,
            autoSet: true,
            selectors: {
                minus: '.number-select-minus',
                plus: '.number-select-plus'
            }
        };
        var DISABLED_CLASSNAME = 'disabled';
        var NumberSelect = function() {
            function NumberSelect(selector, options) {
                _classCallCheck(this, NumberSelect);
                this.container = $(selector);
                this.options = Object.assign({}, defaultOptions, options);
                this.value = this.options.defaultValue;
                this.minusDisabled = false;
                this.plusDisabled = false;
                this.bind();
                this.update();
                this.updateView();
            }
            _createClass(NumberSelect, [{
                key: 'bind',
                value: function bind() {
                    this.container.on('click', this.options.selectors.minus, this.minus.bind(this)).on('click', this.options.selectors.plus, this.plus.bind(this)).on('change', 'input', function(e) {
                        this.change(e.target.value);
                    }
                        .bind(this));
                }
            }, {
                key: 'set',
                value: function set(value) {
                    this.value = value;
                    this.update();
                    this.updateView();
                }
            }, {
                key: 'changeNumber',
                value: function changeNumber(value) {
                    try {
                        this.options.onchange && this.options.onchange(value);
                    } catch (err) {}
                    if (this.options.autoSet) {
                        this.set(value);
                    }
                }
            }, {
                key: 'config',
                value: function config(property, value) {
                    var options = {};
                    if (value) {
                        options[property] = value;
                    } else {
                        options = property;
                    }
                    this.options = Object.assign({}, this.options, options);
                    this.update();
                    this.updateView();
                }
            }, {
                key: 'plus',
                value: function plus() {
                    if (!this.plusDisabled) {
                        this.changeNumber(this.value + 1);
                    }
                }
            }, {
                key: 'minus',
                value: function minus() {
                    if (!this.minusDisabled) {
                        this.changeNumber(this.value - 1);
                    }
                }
            }, {
                key: 'change',
                value: function change(value) {
                    value = parseInt(value, 10);
                    if (!isNaN(value) && value !== this.value && value >= this.options.min && value <= this.options.max) {
                        this.changeNumber(value);
                    } else {
                        this.updateView();
                    }
                }
            }, {
                key: 'update',
                value: function update() {
                    this.minusDisabled = this.value <= this.options.min ? true : false;
                    this.plusDisabled = this.value >= this.options.max ? true : false;
                    if (this.value < this.options.min) {
                        this.value = this.options.min;
                    }
                    if (this.value > this.options.max) {
                        this.value = this.options.max;
                    }
                }
            }, {
                key: 'updateView',
                value: function updateView() {
                    this.container.find(this.options.selectors.minus)[this.minusDisabled ? 'addClass' : 'removeClass'](DISABLED_CLASSNAME).end().find(this.options.selectors.plus)[this.plusDisabled ? 'addClass' : 'removeClass'](DISABLED_CLASSNAME).end().find('input').val(this.value);
                }
            }, {
                key: 'remove',
                value: function remove() {
                    if (this.container) {
                        this.container.remove();
                        this.container = null ;
                    }
                    this.options = null ;
                }
            }]);
            return NumberSelect;
        }();
        function createNumberSelect(selector, options) {
            return new NumberSelect(selector,options);
        }
        exports.NumberSelect = NumberSelect;
        exports.createNumberSelect = createNumberSelect;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var touristTemplate = exports.touristTemplate = "\n<div class=\"resource-tourist-item resource-tourist-<%= type.toLowerCase() %>\">\n    <div class=\"number-select\">\n        <div class=\"number-select-button number-select-minus\">\n            <i class=\"number-select-button-line-horizital\"></i>\n        </div>\n        <div class=\"number-select-button number-select-plus\">\n            <i class=\"number-select-button-line-vertical\"></i>\n            <i class=\"number-select-button-line-horizital\"></i>\n        </div>\n        <div class=\"number-select-input\">\n            <input type=\"text\" name=\"number-select\" value=\"<%= number %>\">\n        </div>\n    </div>\n    <% if (type === 'adult') { %>\n        <div class=\"resource-tourist-price\">\n            <% if (isReal) { %><span><strong>\u5B9E\u65F6\u8BA1\u4EF7</strong></span>/<% } else if (price) { %><span>&yen;<strong><%= price %></strong></span>/<% } %>\u6210\u4EBA\n        </div>\n    <% } %>\n\n    <% if (type === 'child') { %>\n        <div class=\"resource-tourist-price\">\n            <% if (isReal) { %><span><strong>\u5B9E\u65F6\u8BA1\u4EF7</strong></span>/<% } else if (price) { %><span>&yen;<strong><%= price %></strong></span>/<% } %>\n            <% if (isTrain) { %>\n                \u513F\u7AE5 <i class=\"J_ResourceChildTip\" data-tip=\"\u8EAB\u9AD8\u6807\u51C61.2-1.5\u7C73\uFF0C\u542B\u513F\u7AE5\u4EF7\u706B\u8F66\u7968\uFF0C\u542B\u5F53\u5730\u65C5\u6E38\u8F66\u4F4D\u8D39\u548C\u5BFC\u6E38\u670D\u52A1\u8D39\uFF0C\u4E0D\u5360\u5E8A\uFF0C\u4E0D\u542B\u4F4F\u5BBF\u8D39\u548C\u95E8\u7968\uFF1B\u8EAB\u9AD8\u6807\u51C60.8-1.19\u7C73\uFF0C\u514D\u706B\u8F66\u7968\uFF0C\u542B\u5F53\u5730\u65C5\u6E38\u8F66\u4F4D\u8D39\u548C\u5BFC\u6E38\u670D\u52A1\u8D39\uFF0C\u4E0D\u5360\u5E8A\uFF0C\u4E0D\u542B\u4F4F\u5BBF\u8D39\u548C\u95E8\u7968\u3002\">\u513F\u7AE5\u6807\u51C6</i>\n            <% } else { %>\n                \u513F\u7AE5 <i class=\"J_ResourceChildTip\" data-tip=\"<%= childTip %>\">\u513F\u7AE5\u6807\u51C6</i>\n            <% } %>\n        </div>\n    <% } %>\n\n    <% if (type === 'freeChild') { %>\n        <div class=\"resource-tourist-price\">\n            \u514D\u7968\u513F\u7AE5<i class=\"J_ResourceFreeChildTip\" data-tip=\"\u8EAB\u9AD8\u6807\u51C61.2-1.5\u7C73\uFF0C\u542B\u513F\u7AE5\u4EF7\u706B\u8F66\u7968\uFF0C\u542B\u5F53\u5730\u65C5\u6E38\u8F66\u4F4D\u8D39\u548C\u5BFC\u6E38\u670D\u52A1\u8D39\uFF0C\u4E0D\u5360\u5E8A\uFF0C\u4E0D\u542B\u4F4F\u5BBF\u8D39\u548C\u95E8\u7968\uFF1B\u8EAB\u9AD8\u6807\u51C60.8-1.19\u7C73\uFF0C\u514D\u706B\u8F66\u7968\uFF0C\u542B\u5F53\u5730\u65C5\u6E38\u8F66\u4F4D\u8D39\u548C\u5BFC\u6E38\u670D\u52A1\u8D39\uFF0C\u4E0D\u5360\u5E8A\uFF0C\u4E0D\u542B\u4F4F\u5BBF\u8D39\u548C\u95E8\u7968\u3002\">\uFF081.2\u7C73\u4EE5\u4E0B\u514D\u8F66\u7968\uFF09</i>\n        </div>\n    <% } %>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var touristChildNotSupportedTemplate = exports.touristChildNotSupportedTemplate = "\n<div class=\"resource-tourist-item resource-tourist-child\">\n    <div class=\"resource-tourist-price\">\n        <i class=\"J_ResourceChildTip\" data-tip=\"\u513F\u7AE5\u6807\u51C6\uFF1A\u8EAB\u9AD80.8~1.2\u7C73\uFF08\u542B\uFF09\uFF0C\u4E0D\u5360\u5E8A\uFF0C\u53EA\u5305\u542B\u5EA7\u4F4D\u8D39\uFF0C\u5176\u4F59\u4EA7\u751F\u8D39\u7528\u81EA\u7406\u3002\">\u6B64\u56E2\u671F\u4E0D\u652F\u6301\u513F\u7AE5\u51FA\u6E38</i>\n    </div>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var touristChildTipTemplate = exports.touristChildTipTemplate = "\n<div class=\"resource-tourist-child-tip\">\n    <%= content %>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var resourcePromotionTemplate = exports.resourcePromotionTemplate = "\n<div class=\"resource-promotion-detail\">\n    <div class=\"resource-promotion-detail-list\">\n        <% for (var i = 0; i < data.length; i++) { %>\n            <div class=\"resource-promotion-detail-item\"><%= data[i].name %></div>\n        <% } %>\n    </div>\n    <div class=\"resource-promotion-detail-rule\">\n        <a href=\"#activity\">\u67E5\u770B\u8BE6\u7EC6\u4F18\u60E0\u89C4\u5219&gt;</a>\n    </div>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var resourceDownpaymentTemplate = exports.resourceDownpaymentTemplate = "\n<div class=\"resource-downpayment-detail\">\n    <h4 class=\"resource-downpayment-detail-title\">\u53EF\u9009\u671F\u6570</h4>\n    <div class=\"resource-downpayment-detail-list\">\n    <% var period; %>\n    <% if (data.periods) { %>\n        <% for (var i = 0; i < data.periods.length && (period = data.periods[i]); i++) { %>\n            <div class=\"resource-downpayment-detail-item\">\n                <div class=\"resource-downpayment-detail-label\"><%= period.desc[0] %></div>\n                <div class=\"resource-downpayment-detail-plan\"><%= period.desc[1] %></div>\n                <div class=\"resource-downpayment-detail-fee\"><%= period.desc[2] %></div>\n            </div>\n        <% } %>\n    <% } %>\n    </div>\n    <div class=\"resource-downpayment-detail-tip\">*\u60A8\u53EF\u5728\u4E0B\u5355\u4ED8\u6B3E\u65F6\u9009\u62E9\u9996\u4ED8\u51FA\u53D1</div>\n</div>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.favorModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _layer = __webpack_require__(11);
        var _tip = __webpack_require__(326);
        var _config = __webpack_require__(325);
        var _favorDialog = __webpack_require__(348);
        var _login = __webpack_require__(349);
        var login = _interopRequireWildcard(_login);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var store = void 0;
        var dialog = void 0;
        var dialogRender = _templateNative.template.compile(_favorDialog.detailFavorDialogTemplate);
        var $dialogContainer = void 0;
        function getCouponById(couponId) {
            var coupons = store.getState('coupon') || [];
            return coupons.filter(function(coupon) {
                return coupon.id == couponId;
            })[0];
        }
        function selectCouponById(couponId) {
            var coupon = getCouponById(couponId);
            if (coupon) {
                coupon.selected = true;
            }
        }
        function openDialog(couponId) {
            dialog = _layer.layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                content: dialogRender({
                    data: store.getState('coupon')
                }),
                area: ['960px', 'auto'],
                btn: false,
                success: function success($container) {
                    initDialog($container, couponId);
                }
            });
        }
        function closeDialog() {
            _layer.layer.close(dialog);
        }
        function initDialog($container, couponId) {
            $dialogContainer = $container;
            $container.on('click', '.dialog-close', closeDialog).find('.J_CouponItem').each(function(couponIndex) {
                var $item = $(this);
                var couponId = $item.data('id');
                var $more = $item.find('.coupon-more');
                $item.on('click', '.coupon-button', function() {
                    receiveCoupon(couponId);
                });
            });
            var $mores = $container.find('.J_CouponMore');
            var $details = $container.find('.J_CouponDetail');
            $(document).click(function() {
                $mores.removeClass('expand');
                $details.hide();
            });
            $details.click(function(e) {
                e.stopPropagation();
            });
            $mores.click(function(e) {
                e.stopPropagation();
                var id = $(this).data('id');
                var $detail = $details.filter('[data-id=' + id + ']');
                if ($detail.is(':visible')) {
                    $(this).removeClass('expand');
                    $detail.hide();
                } else {
                    $mores.removeClass('expand');
                    $(this).addClass('expand');
                    $details.hide();
                    $detail.show();
                }
            });
            if (couponId) {
                receiveCoupon(couponId);
            }
        }
        function receiveCoupon(couponId) {
            var coupon = getCouponById(couponId);
            if (!coupon) {
                return;
            }
            if (login.isLogin()) {
                _receiveCoupon(couponId);
            } else {
                closeDialog();
                login.open(function() {
                    openDialog(couponId);
                });
            }
        }
        function _receiveCoupon(couponId) {
            $.ajax({
                url: _config.config.url.couponReceive({
                    couponId: couponId
                }),
                dataType: 'json',
                success: function success(res) {
                    if (res && res.success) {
                        showSendSuccess();
                        selectCoupon(couponId);
                    } else {
                        showSendError(res && res.message);
                    }
                },
                error: function error(res) {
                    showSendError(res && res.message);
                }
            });
        }
        function selectCoupon(couponId) {
            if ($dialogContainer && couponId) {
                selectCouponById(couponId);
                $dialogContainer.find('.J_CouponItem[data-id=' + couponId + ']').addClass('selected');
            }
        }
        function showSendSuccess(msg) {
            var currentDialog = _layer.layer.open({
                type: 1,
                title: false,
                time: 1500,
                content: '<div class="dialog-success"><div class="dialog-close"></div><i class="icon"></i>' + (msg || '优惠券发放并绑定成功') + '</div>',
                area: ['400px', 'auto'],
                btn: false,
                closeBtn: false,
                success: function success($wrap) {
                    $wrap.on('click', '.dialog-close', function() {
                        _layer.layer.close(currentDialog);
                    });
                }
            });
        }
        function showSendError(msg) {
            var currentDialog = _layer.layer.open({
                type: 1,
                title: false,
                time: 1500,
                content: '<div class="dialog-error"><div class="dialog-close"></div><i class="icon"></i>' + (msg || '优惠券领取失败，请稍后重试。') + '</div>',
                area: ['400px', 'auto'],
                btn: false,
                closeBtn: false,
                success: function success($wrap) {
                    $wrap.on('click', '.dialog-close', function() {
                        _layer.layer.close(currentDialog);
                    });
                }
            });
        }
        var favorModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                $('.J_DetailCouponItem').click(openDialog);
            }
        };
        exports.favorModule = favorModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailFavorDialogTemplate = exports.detailFavorDialogTemplate = "\n<div class=\"dialog dialog-favor\">\n    <div class=\"dialog-close\"></div>\n    <div class=\"dialog-head\">\u9886\u53D6\u4F18\u60E0\u5238</div>\n    <div class=\"dialog-body\">\n        \n        <% var prev %>\n        <div class=\"coupon-list\">\n            <% for (var couponIndex = 0, couponLength = data.length; couponIndex < couponLength; couponIndex++) { %>\n                <% var coupon = data[couponIndex] %>\n                \n                <div class=\"J_CouponItem coupon-item<%= coupon.selected ? ' selected' : '' %>\"\n                    <% if (!coupon.selected) { %>data-id=\"<%= coupon.id %>\"<% } %>>\n                    <div class=\"coupon-box\">\n                        <div class=\"coupon-row coupon-name\" title=\"<%= coupon.translatedRule.join('\uFF1B') %>\">\n                            <strong class=\"coupon-type\"><%= coupon.translatedFaceValue.value %><span><%= coupon.translatedFaceValue.unit %></span></strong>\n                            <%= coupon.translatedRule.join('\uFF1B') %>\n                        </div>\n                        <div class=\"coupon-row coupon-desc\" title=\"<%= coupon.name %>\">\n                            <%= coupon.name %>\n                        </div>\n                        <div class=\"coupon-row\">\n                        <span class=\"J_CouponMore coupon-more\" data-id=\"<%= coupon.id %>\">\u8BE6\u7EC6\u89C4\u5219<i class=\"icon\"></i></span>\n                            <span class=\"coupon-date\"><%= coupon.beginDate %> - <%= coupon.endDate %></span>\n                            <span class=\"icon icon-select\"></span>\n                        </div>\n                        <div class=\"coupon-button\">\u7ACB\u5373\u9886\u53D6</div>\n                    </div>\n                </div>\n                \n                <% if (couponIndex % 2 === 0 && couponIndex != couponLength - 1) { %>\n                    <% prev = coupon %>\n                <% } else { %>\n                    \n                    <% if (couponIndex % 2 === 0 && couponIndex == couponLength - 1) { %>\n                        <% prev = coupon; coupon = null; %>\n                    <% } %>\n                    \n                    <% var details = [prev, coupon] %>\n                    \n                    <% for (var detailIndex = 0; detailIndex < details.length; detailIndex++) { %>\n                        <% var detail = details[detailIndex] %>\n                        <% if (detail) { %>\n                            <div class=\"J_CouponDetail coupon-detail coupon-detail-<%= detailIndex % 2 === 0 ? 'left' : 'right' %>\" data-id=\"<%= detail.id %>\">\n                                <i class=\"coupon-detail-arrow\"></i>\n                                <div class=\"coupon-detail-inner\">\n                                    <% if (detail.themeName) { %>\n                                        <div class=\"coupon-detail-group\">\n                                            <div class=\"coupon-detail-title\">\u6D3B\u52A8\u4E3B\u9898\uFF1A</div>\n                                            <div class=\"coupon-detail-content\">\n                                                <%= detail.themeName %>\n                                            </div>\n                                        </div>\n                                    <% } %>\n                                    <div class=\"coupon-detail-group\">\n                                        <div class=\"coupon-detail-title\">\u9002\u7528\u56E2\u671F\uFF1A</div>\n                                        <div class=\"coupon-detail-content\">\n                                            <% if (detail.planDate && detail.planDate.length) { %>\n                                                <%= detail.planDate.join('\u3001') %>\n                                            <% } else { %>\n                                                \u56E2\u671F\u4E0D\u9650\n                                            <% }%>\n                                        </div>\n                                    </div>\n                                    <div class=\"coupon-detail-group\">\n                                        <div class=\"coupon-detail-title\">\u6D3B\u52A8\u89C4\u5219\uFF1A</div>\n                                        <div class=\"coupon-detail-content\">\n                                            <%=# detail.webHtml %>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        <% } %>\n                    <% } %>\n                    \n                    <% prev = null %>\n                <% } %>\n                \n                \n                \n            <% } %>\n        </div>\n    </div>\n</div>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.open = exports.login = exports.isLogin = undefined;
        var _store = __webpack_require__(315);
        var _layer = __webpack_require__(11);
        var _config = __webpack_require__(325);
        var _common = __webpack_require__(318);
        var commonActions = _interopRequireWildcard(_common);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        function isLogin() {
            var store = (0,
                _store.getStore)();
            return !!store.getState('isLogin');
        }
        function login(callback) {
            if (isLogin()) {
                callback();
            } else {
                open(callback);
            }
        }
        function open(callback) {
            window.detailLoginCallback = function() {
                window.detailLoginCallback = null ;
                (0,
                    _store.getStore)().dispatch({
                    type: commonActions.CHANGE_LOGIN_STATUS,
                    data: true
                });
                callback();
                _layer.layer.close(dialog);
            }
            ;
            var dialog = _layer.layer.open({
                type: 2,
                title: false,
                content: [_config.config.url.loginDialog(), 'no'],
                area: ['375px', '350px'],
                btn: false
            });
            return dialog;
        }
        exports.isLogin = isLogin;
        exports.login = login;
        exports.open = open;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.favoriteModule = undefined;
        var _store = __webpack_require__(315);
        var _layer = __webpack_require__(11);
        var _config = __webpack_require__(325);
        var $win = $(window);
        var store = void 0;
        var dialog = void 0;
        var $favorite = void 0;
        var actived = false;
        function collectParams() {
            return {
                productId: store.getState('productId'),
                productType: store.getState('productType'),
                bookCityCode: store.getState('bookCityCode')
            };
        }
        function ajax(options) {
            $.ajax({
                url: options.url,
                data: collectParams(),
                success: options.success,
                error: options.error
            });
        }
        function checkInitState() {
            ajax({
                url: _config.config.url.checkFavoriteState(),
                success: function success(res) {
                    if (res && res.data && res.data.isCollected) {
                        active();
                    } else {
                        deactive();
                    }
                },
                error: function error() {
                    deactive();
                }
            });
        }
        function add() {
            ajax({
                url: _config.config.url.addFavorite(),
                success: function success(res) {
                    if (res && res.data && res.data.isSuccess) {
                        active();
                        showMsg({
                            msg: '添加收藏成功'
                        });
                    } else {
                        showMsg({
                            type: 'error',
                            msg: '添加收藏失败，请重试'
                        });
                    }
                },
                error: function error() {
                    showMsg({
                        type: 'error',
                        msg: '添加收藏失败，请重试'
                    });
                }
            });
        }
        function remove() {
            ajax({
                url: _config.config.url.removeFavorite(),
                success: function success(res) {
                    if (res && res.data && res.data.isSuccess) {
                        deactive();
                        showMsg({
                            msg: '删除收藏成功'
                        });
                    } else {
                        showMsg({
                            type: 'error',
                            msg: '删除收藏失败，请重试'
                        });
                    }
                },
                error: function error() {
                    showMsg({
                        type: 'error',
                        msg: '删除收藏失败，请重试'
                    });
                }
            });
        }
        function active() {
            actived = true;
            $favorite.addClass('active');
        }
        function deactive() {
            actived = false;
            $favorite.removeClass('active');
        }
        function showMsg(options) {
            var currentDialog = _layer.layer.open({
                type: 1,
                title: false,
                time: options.time === undefined ? 1500 : options.time,
                content: '<div class="dialog-' + (options.type || 'success') + '"><div class="dialog-close"></div><i class="icon"></i>' + options.msg + '</div>',
                area: ['400px', 'auto'],
                btn: false,
                closeBtn: false,
                success: function success($wrap) {
                    $wrap.on('click', '.dialog-close', function() {
                        _layer.layer.close(currentDialog);
                    });
                }
            });
        }
        function showLogin() {
            showMsg({
                msg: '请先<a class="dialog-login-button" href="https://passport.tuniu.com/login?origin=' + encodeURIComponent(location.href) + '">登录</a><br>没有途牛账户？<a class="dialog-login-button" href="https://passport.tuniu.com/register" target="_blank">立即注册</a>',
                time: 0
            });
        }
        function bind() {
            $favorite.click(function() {
                if (store.getState('isLogin')) {
                    if (actived) {
                        remove();
                    } else {
                        add();
                    }
                } else {
                    showLogin();
                }
            });
        }
        var favoriteModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                $favorite = $('.J_Favorite');
                if (store.getState('isLogin')) {
                    checkInitState();
                }
                bind();
            }
        };
        exports.favoriteModule = favoriteModule;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.detailModule = undefined;
        var _store = __webpack_require__(315);
        var _fixer = __webpack_require__(5);
        var _scrollTaber = __webpack_require__(7);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _flight = __webpack_require__(352);
        var _upgrade = __webpack_require__(354);
        var _visa = __webpack_require__(356);
        var _guide = __webpack_require__(359);
        var _route = __webpack_require__(362);
        var _policy = __webpack_require__(363);
        var _comment = __webpack_require__(368);
        var _advisory = __webpack_require__(372);
        var _relative = __webpack_require__(375);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var detailModule = {
            init: function init() {
                var $tab = $('#J_DetailTab');
                var tabHeight = $tab.height();
                (0,
                    _fixer.createFixer)($tab, {
                    range: {
                        bottom: $('#J_Detail')
                    }
                });
                (0,
                    _scrollTaber.createScrollTaber)($tab, {
                    offset: tabHeight
                });
                this.initFavor();
                this.initRoute();
                this.initFlight();
                this.initUpgrade();
                this.initVisa();
                this.initGuide();
                _policy.policyModule.init();
                _comment.commentModule.init();
                _advisory.advisoryModule.init();
                _relative.relativeModule.init();
            },
            initFavor: function initFavor() {
                $('.J_DetailFavorItem').each(function() {
                    var $container = $(this);
                    var expanded = false;
                    $container.on('click', '.detail-favor-more', function() {
                        $container.addClass('expand');
                    }).on('click', '.detail-favor-less', function() {
                        $container.removeClass('expand');
                    });
                });
                $('.J_DetailFeature').find('img').each(function() {
                    var $img = $(this);
                    var src = $img.data('src');
                    lazyloader.on($img, function() {
                        var $image = new Image();
                        $image.onload = function() {
                            $img.prop('src', src).parent().addClass('loaded');
                            lazyloader.off($img);
                            $win.trigger('resize');
                        }
                        ;
                        $image.src = src;
                        $image.onerror = function() {
                            $img.parent().addClass('loaded');
                            lazyloader.off($img);
                            $win.trigger('resize');
                        }
                        ;
                    });
                });
                $('.J_DetailFeatureDeadline').each(function() {
                    var $more = $(this);
                    var $row = $more.parent();
                    var $deadline = $row.find('.detail-feature-deadline');
                    var $deadlineArrow = $row.find('.detail-feature-deadline-arrow');
                    $more.click(function(e) {
                        e.stopPropagation();
                        if ($row.hasClass('expand')) {
                            $row.removeClass('expand');
                        } else {
                            var position = $more.position() || {
                                    left: 0,
                                    top: 0
                                };
                            $deadline.css({
                                top: position.top + $row.height() + 7
                            });
                            $deadlineArrow.css({
                                left: position.left + $more.width() / 2
                            });
                            $row.addClass('expand');
                        }
                    });
                    $deadline.click(function(e) {
                        e.stopPropagation();
                    });
                    $(document).click(function() {
                        $row.removeClass('expand');
                    });
                });
            },
            initRoute: function initRoute() {
                _route.routeModule.init();
            },
            initFlight: function initFlight() {
                _flight.flightModule.init();
            },
            initUpgrade: function initUpgrade() {
                _upgrade.upgradeModule.init();
            },
            initVisa: function initVisa() {
                _visa.visaModule.init();
            },
            initGuide: function initGuide() {
                _guide.guideModule.init();
            }
        };
        exports.detailModule = detailModule;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.flightModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _tip = __webpack_require__(326);
        var _config = __webpack_require__(325);
        var _flight = __webpack_require__(353);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var $flights = void 0;
        var store = void 0;
        function lazyloadHandler() {
            $flights.forEach(function($flight) {
                lazyloader.off($flight);
            });
            fetch();
        }
        function fetch() {
            render();
        }
        function render() {
            var templateRender = _templateNative.template.compile(_flight.detailFlightTemplate);
            $flights.forEach(function($flight) {
                $flight.append(templateRender({}));
            });
            bind();
            $win.trigger('resize');
        }
        function bind() {}
        var flightModule = {
            init: function init() {
                return;
                store = (0,
                    _store.getStore)();
                $flights = $('.J_DetailFlight').toArray().map(function($ele) {
                    return $($ele);
                });
                $flights.forEach(function($flight) {
                    lazyloader.on($flight, lazyloadHandler);
                });
            }
        };
        exports.flightModule = flightModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailFlightTemplate = exports.detailFlightTemplate = "\n<div class=\"section-box-title\">\n    <h3>\u53C2\u8003\u822A\u73ED<span>* \u4EE5\u4E0B\u822A\u73ED\u4EC5\u4F9B\u53C2\u8003\uFF0C\u6700\u7EC8\u786E\u8BA4\u4EE5\u51FA\u56E2\u901A\u77E5\u4E66\u4E3A\u51C6\u3002</span></h3>\n</div>\n\n<div class=\"section-box-content\">\n    <div class=\"detail-route-flight\">\n        \n        <div class=\"detail-route-flight-item\">\n            <div class=\"detail-route-flight-col detail-route-flight-label\">\n                <span>\u53BB\u7A0B</span>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-date\">\n                <div class=\"up-content\">2016-05-11</div>\n                <div class=\"down-content\">\u4E0A\u6D77 \u2192 \u590F\u5A01\u5937</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-company\">\n                <div class=\"up-content\"><i class=\"icon\"></i>\u6D77\u5357\u822A\u7A7A</div>\n                <div class=\"down-content\">CZ6745 320</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-depart\">\n                <div class=\"up-content\">06:20</div>\n                <div class=\"down-content\">\u9996\u90FD\u56FD\u9645\u673A\u573A</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-tip\">\n                <div class=\"up-content\"><a href=\"javascript:;\">\u7ECF\u505C</a></div>\n                <div class=\"down-content\"><span class=\"tip-line\"><i class=\"tip-line-left\"></i><i class=\"tip-line-right\"></i></span></div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-dest\">\n                <div class=\"up-content\">06:20</div>\n                <div class=\"down-content\">\u9996\u90FD\u56FD\u9645\u673A\u573A</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-duration\">\n                <div class=\"full-content\">1\u5C0F\u65F630\u5206\u949F</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-seat\">\n                <div class=\"full-content\">\u7ECF\u6D4E\u8231</div>\n            </div>\n        </div>\n        \n        <div class=\"detail-route-flight-item detail-route-flight-last\">\n            <div class=\"detail-route-flight-col detail-route-flight-label\">\n                <span>\u56DE\u7A0B</span>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-date\">\n                <div class=\"up-content\">2016-05-11</div>\n                <div class=\"down-content\">\u4E0A\u6D77 \u2192 \u590F\u5A01\u5937</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-company\">\n                <div class=\"up-content\"><i class=\"icon\"></i>\u6D77\u5357\u822A\u7A7A</div>\n                <div class=\"down-content\">CZ6745 320</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-depart\">\n                <div class=\"up-content\">06:20</div>\n                <div class=\"down-content\">\u9996\u90FD\u56FD\u9645\u673A\u573A</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-tip\">\n                <div class=\"up-content\"><a href=\"javascript:;\">\u7ECF\u505C</a></div>\n                <div class=\"down-content\"><span class=\"tip-line\"><i class=\"tip-line-left\"></i><i class=\"tip-line-right\"></i></span></div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-dest\">\n                <div class=\"up-content\">06:20</div>\n                <div class=\"down-content\">\u9996\u90FD\u56FD\u9645\u673A\u573A</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-duration\">\n                <div class=\"full-content\">1\u5C0F\u65F630\u5206\u949F</div>\n            </div>\n            <div class=\"detail-route-flight-col detail-route-flight-seat\">\n                <div class=\"full-content\">\u7ECF\u6D4E\u8231</div>\n            </div>\n        </div>\n        \n    </div>\n</div>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.upgradeModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _tip = __webpack_require__(326);
        var _config = __webpack_require__(325);
        var _upgrade = __webpack_require__(355);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var $upgrades = void 0;
        var store = void 0;
        function lazyloadHandler() {
            $upgrades.forEach(function($upgrade) {
                lazyloader.off($upgrade);
            });
            fetch();
        }
        function fetch() {
            $.ajax({
                dataType: 'json',
                url: _config.config.url.upgrade({
                    productId: store.getState('productId'),
                    bookCityCode: store.getState('bookCityCode') || void 0,
                    departCityCode: store.getState('departCityCode') || void 0
                })
            }).done(function(res) {
                var data = {};
                if (res && res.success && res.data) {
                    render(res.data);
                } else {
                    remove();
                }
            }).fail(function() {
                remove();
            }
                .bind(this));
        }
        function render(data) {
            var templateRender = _templateNative.template.compile(_upgrade.detailUpgradeTemplate);
            $upgrades.forEach(function($upgrade) {
                var journeyId = $upgrade.data('id');
                var upgradeData = data[journeyId];
                if (upgradeData) {
                    $upgrade.append(templateRender({
                        data: upgradeData,
                        journeyId: journeyId
                    })).removeClass('section-loading');
                } else {
                    $upgrade.remove();
                }
            });
            bind();
            $win.trigger('resize');
        }
        function bind() {
            $upgrades.forEach(function($upgrade) {
                $upgrade.find('.J_UpgradeItem').each(function() {
                    var $upgrade = $(this);
                    var $parent = $upgrade.parent();
                    var $detail = $upgrade.siblings('.J_UpgradeDetail');
                    if ($detail.length) {
                        $detail.remove().show();
                        new _tip.Tip($upgrade,{
                            type: 'click',
                            content: $('<div />').append($detail[0]).html(),
                            dialog: {
                                tipsOffset: [0, -20]
                            },
                            width: function width() {
                                return $parent.outerWidth();
                            }
                        });
                    }
                });
            });
        }
        function remove() {
            $upgrades.forEach(function($upgrade) {
                return $upgrade.remove();
            });
            $win.trigger('resize');
        }
        var upgradeModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                $upgrades = $('.J_DetailUpgrade').toArray().map(function($ele) {
                    return $($ele);
                });
                $upgrades.forEach(function($upgrade) {
                    lazyloader.on($upgrade, lazyloadHandler);
                });
            }
        };
        exports.upgradeModule = upgradeModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailUpgradeTemplate = exports.detailUpgradeTemplate = "\n<% var upgrades = data %>\n<div class=\"section-box detail-upgrade\">\n    <div class=\"section-box-head\">\n        <h2>\u4EA7\u54C1\u5347\u7EA7</h2>\n    </div>\n    <div class=\"section-box-body\">\n        <div class=\"detail-upgrade-title\">\u4E0B\u5355\u65F6\u9009\u62E9\u60A8\u9700\u8981\u7684\u5347\u7EA7\u65B9\u6848\uFF1A</div>\n        <div class=\"section-box-content detail-upgrade-list\">\n            <table>\n                <thead>\n                    <tr>\n                        <th class=\"detail-upgrade-col-1\">\u65B9\u6848</th>\n                        <th class=\"detail-upgrade-col-2\">\u9879\u76EE</th>\n                        <th class=\"detail-upgrade-col-3\">\u8BF4\u660E</th>\n                        <th class=\"detail-upgrade-col-4\">\u4EF7\u683C</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <% for (var upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++) { %>\n                        <% var upgrade = upgrades[upgradeIndex] %>\n                        <tr<%= upgradeIndex % 2 == 1 ? 'class=\"even\"' : ''%>>\n                            <td>\u65B9\u6848<%= upgradeIndex + 1 %></td>\n                            <td><%= upgrade.type %></td>\n                            <td><%= upgrade.remark %></td>\n                            <td>\n                                <div class=\"J_UpgradeItem detail-upgrade-price\">\n                                    <% var first = upgrade.datePrices[0] %>\n                                    <span class=\"detail-upgrade-price-selected\">&yen;<%= first.price %>/\u6210\u4EBA <% if (first.excludeChildFlag != 1) { %>&yen;<%= first.childPrice %>/\u513F\u7AE5<% } else { %>&nbsp;\u4E0D\u652F\u6301\u513F\u7AE5<% } %></span>\n                                    <i class=\"icon\"></i>\n                                </div>\n                                    <div class=\"J_UpgradeDetail detail-upgrade-price-list\">\n                                    <% for (var priceIndex = 0; priceIndex < upgrade.datePrices.length; priceIndex++) { %>\n                                        <% var price = upgrade.datePrices[priceIndex] %>\n                                        <div class=\"detail-upgrade-price-item\"><span><%= price.departDate %></span> &yen;<%= price.price %>/\u6210\u4EBA<% if (price.excludeChildFlag != 1) { %>   &yen;<%= price.childPrice %>/\u513F\u7AE5  <% } else { %>&nbsp;&nbsp;\u4E0D\u652F\u6301\u513F\u7AE5<% } %></div>\n                                    <% } %>\n                                </div>\n                            </td>\n                        </tr>\n                    <% } %>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.visaModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _layer = __webpack_require__(11);
        var _taber = __webpack_require__(6);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _config = __webpack_require__(325);
        var _utils = __webpack_require__(338);
        var _visa = __webpack_require__(357);
        var _visaDialog = __webpack_require__(358);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var $visas = void 0;
        var dialog = void 0;
        var store = void 0;
        var resId = void 0
            , resName = void 0;
        var dialogRender = _templateNative.template.compile(_visaDialog.detailVisaDialogTemplate);
        var visaData = void 0;
        function lazyloadHandler() {
            $visas.forEach(function($visa) {
                lazyloader.off($visa);
            });
            fetch();
        }
        function fetch() {
            $.ajax({
                dataType: 'json',
                url: _config.config.url.visa({
                    productId: store.getState('productId'),
                    bookCityCode: store.getState('bookCityCode') || void 0,
                    departCityCode: store.getState('departCityCode') || void 0
                })
            }).done(function(res) {
                var data = {};
                if (res && res.success && res.data) {
                    visaData = res.data;
                    render(visaData);
                } else {
                    remove();
                }
            }).fail(function() {
                remove();
            }
                .bind(this));
        }
        function render(visaData) {
            var templateRender = _templateNative.template.compile(_visa.detailVisaTemplate)
                , retailCity = store.getState('retailCity')
                , retailName = void 0;
            if (Object.prototype.toString.call(retailCity) === '[object Array]' && retailCity.length) {
                retailName = retailCity[0].name;
            }
            $visas.forEach(function($visa) {
                var journeyId = $visa.data('id');
                var visas = visaData.filter(function(item) {
                    return (item.visaResIdAndJourneyId || []).some(function(id) {
                        return id.journeyId == journeyId;
                    });
                });
                $visa.append(templateRender({
                    data: visas,
                    journeyId: journeyId,
                    retailName: retailName
                })).removeClass('section-loading');
            });
            bind();
        }
        function bind() {
            $visas.forEach(function($visa) {
                $visa.find('.J_DetailVisaBlock').each(function() {
                    var $block = $(this);
                    $block.find('.J_VisaTab').each(function() {
                        (0,
                            _taber.createTaber)($(this), {
                            ctx: $block
                        });
                    }).end().find('.J_DetailVisaDeadline').each(function() {
                        var $more = $(this);
                        var $row = $more.parent();
                        var $deadline = $row.find('.detail-visa-deadline');
                        $more.click(function(e) {
                            e.stopPropagation();
                            if ($row.hasClass('expand')) {
                                $row.removeClass('expand');
                            } else {
                                $row.addClass('expand');
                            }
                        });
                        $deadline.click(function(e) {
                            e.stopPropagation();
                        });
                        $(document).click(function() {
                            $row.removeClass('expand');
                        });
                    }).end().find('.J_DetailVisaSend').click(function() {
                        resId = $(this).data('id');
                        resName = $(this).data('name');
                        openSendDialog();
                    }).end().find('.J_DetailVisaPrint').click(function() {
                        resId = $(this).data('id');
                        resName = $(this).data('name');
                        openPrintDialog();
                    });
                });
            });
        }
        function openDialog(callback, dialogType) {
            dialog = _layer.layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                content: dialogRender({
                    dialogType: dialogType
                }),
                area: ['700px', 'auto'],
                btn: false,
                success: callback
            });
        }
        function openSendDialog() {
            openDialog(initSendDialog, 'send');
        }
        function openPrintDialog() {
            openDialog(initPrintDialog, 'print');
        }
        function closeDialog() {
            _layer.layer.close(dialog);
        }
        function initSendDialog($container) {
            initDialog($container, 'send');
        }
        function initPrintDialog($container) {
            initDialog($container, 'print');
        }
        function initDialog($container, dialogType) {
            var $personTypes = $container.find('.J_VisaPersonType');
            var $email = $container.find('.J_VisaEmail');
            var $error = $container.find('.J_DialogError');
            var hasSend = false;
            function showError(messages) {
                $error.css('visibility', 'visible').find('strong').text(messages.join('；'));
            }
            function hideError() {
                $error.css('visibility', 'hidden').find('strong').text('');
            }
            function collectParams() {
                var personTypes = $personTypes.filter('.active').toArray().map(function($type) {
                    return {
                        id: $($type).data('id'),
                        name: $($type).data('name')
                    };
                });
                return {
                    groupCode: personTypes,
                    email: $email.val(),
                    productId: store.getState('productId'),
                    productName: resName,
                    resId: resId
                };
            }
            function checkError() {
                if (!hasSend) {
                    return;
                }
                var res = check(collectParams(), dialogType);
                if (res === true) {
                    hideError();
                } else {
                    showError(res);
                }
            }
            $personTypes.click(function() {
                var $this = $(this);
                if ($this.hasClass('active')) {
                    $this.removeClass('active');
                } else {
                    $this.addClass('active');
                }
                checkError();
            });
            $email.on('change', checkError);
            $container.on('click', '.J_VisaCancel, .J_VisaClose', closeDialog).on('click', '.J_VisaSend', function() {
                var params = collectParams();
                var res = check(params, dialogType);
                if (dialogType === 'send') {
                    hasSend = true;
                    $(this).attr({
                        href: 'javascript:;'
                    }).removeAttr('target');
                    if (res === true) {
                        sendVisa(params);
                    } else {
                        showError(res);
                    }
                } else {
                    if (res === true) {
                        hideError();
                        $(this).attr({
                            href: _config.config.url.visaPrint(params),
                            target: '_blank'
                        });
                    } else {
                        showError(res);
                    }
                }
            });
        }
        function check(params, dialogType) {
            var messages = [];
            if (!params.groupCode || params.groupCode.length == 0) {
                messages.push('请选择您的身份类型');
            }
            if (dialogType === 'send') {
                if (params.email) {
                    if ((0,
                            _utils.checkEmail)(params.email) === false) {
                        messages.push('请输入正确的邮箱');
                    }
                } else {
                    messages.push('请输入您常用的邮箱');
                }
            }
            return messages.length === 0 ? true : messages;
        }
        function sendVisa(params) {
            $.ajax({
                url: _config.config.url.visaSend(),
                dataType: 'json',
                data: {
                    d: JSON.stringify(params)
                },
                type: 'post',
                success: function success(res) {
                    if (res.success) {
                        showSendSuccess();
                    } else {
                        showSendError();
                    }
                },
                error: showSendError
            });
        }
        function showSendSuccess() {
            var currentDialog = _layer.layer.open({
                type: 1,
                title: false,
                time: 3000,
                content: '<div class="dialog-success"><div class="dialog-close"></div><i class="icon"></i>材料已经发送至您的邮箱，请注意查收。</div>',
                area: ['400px', 'auto'],
                btn: false,
                closeBtn: false,
                success: function success($wrap) {
                    $wrap.on('click', '.dialog-close', function() {
                        _layer.layer.close(currentDialog);
                    });
                },
                end: closeDialog
            });
        }
        function showSendError() {
            var currentDialog = _layer.layer.open({
                type: 1,
                title: false,
                content: '<div class="dialog-error"><div class="dialog-close"></div><i class="icon"></i>材料发送失败，请稍后重试。</div>',
                area: ['400px', 'auto'],
                btn: false,
                closeBtn: false,
                success: function success($wrap) {
                    $wrap.on('click', '.dialog-close', function() {
                        _layer.layer.close(currentDialog);
                    });
                }
            });
        }
        function remove() {
            $visas.forEach(function($visa) {
                return $visa.remove();
            });
            $win.trigger('resize');
        }
        var visaModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                $visas = $('.J_DetailVisa').toArray().map(function($ele) {
                    return $($ele);
                });
                $visas.forEach(function($visa) {
                    lazyloader.on($visa, lazyloadHandler);
                });
            }
        };
        exports.visaModule = visaModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailVisaTemplate = exports.detailVisaTemplate = "\n<% var materialTypeMap = {0: '\u539F\u4EF6',1: '\u590D\u5370\u4EF6',2: '\u626B\u63CF\u4EF6',3: '\u7535\u5B50\u4EF6'} %>\n<% var deadline %>\n<div class=\"section-box detail-visa\">\n    <div class=\"section-box-head\">\n        <h2>\u7B7E\u8BC1\u4FE1\u606F</h2>\n    </div>\n    <div class=\"section-box-body\">\n\n        <% for (var i = 0; i < data.length; i++) { %>\n            <div class=\"J_DetailVisaBlock\">\n                <% var visa = data[i]; %>\n                <% var visaInfo = visa.visaInfo; %>\n                <% var deadlines = (visa.deadline || {})[journeyId]; %>\n                <div class=\"section-box-title\">\n                    <h3><%= visaInfo.name %></h3>\n                </div>\n\n                <div class=\"section-box-content\">\n                    <div class=\"detail-visa-info\">\n\n                        <% if (visaInfo.visaCityName) { %>\n                            <div class=\"detail-visa-info-item\">\n                                \u6240\u5C5E\u9886\u533A\uFF1A<strong><%= visaInfo.visaCityName %></strong>\n                            </div>\n                        <% } %>\n                        <% if (visaInfo.enterCountryTimes) { %>\n                            <div class=\"detail-visa-info-item\">\n                                \u5165\u5883\u6B21\u6570\uFF1A<strong><%= visaInfo.enterCountryTimes %></strong>\n                            </div>\n                        <% } %>\n                        <% if (visaInfo.visaAvailableRange) { %>\n                            <div class=\"detail-visa-info-item\">\n                                \u505C\u7559\u5929\u6570\uFF1A<strong><%= visaInfo.visaAvailableRange %></strong>\n                            </div>\n                        <% } %>\n                        <% if (visaInfo.handleTimeDuration) { %>\n                            <div class=\"detail-visa-info-item\">\n                                \u529E\u7406\u65F6\u957F\uFF1A<strong><% if (visaInfo.handleTimeDuration == 0) { %>\u4EE5\u5B9E\u9645\u60C5\u51B5\u4E3A\u51C6<% } else { %><%= visaInfo.handleTimeDuration %>\u5929<% } %></strong>\n                            </div>\n                        <% } %>\n                        <% if (deadlines && deadlines.length && (deadline = deadlines[0])) { %>\n                            <div class=\"detail-visa-info-item single-row\">\n                                \u6750\u6599\u6536\u53D6\u622A\u6B62\u65F6\u95F4\uFF1A<strong>\u51FA\u53D1<%= deadline.visaEndDay ? '\u524D' + deadline.visaEndDay : '\u5F53'%>\u5929\u7684<%= deadline.visaEndOclock %>\u70B9</strong>\n                                <% if (deadlines.length > 1) { %>\n                                    <a class=\"J_DetailVisaDeadline detail-visa-time-more\" href=\"javascript:;\">\u67E5\u770B\u5168\u90E8\u622A\u6B62\u65F6\u95F4<i class=\"icon\"></i></a>\n                                    <div class=\"detail-visa-deadline\">\n                                        <i class=\"detail-visa-deadline-arrow\"></i>\n                                        <div class=\"detail-visa-deadline-inner\">\n                                            <div class=\"detail-visa-deadline-left\">\n                                                <div class=\"thead\">\n                                                    <table>\n                                                        <thead>\n                                                            <tr>\n                                                                <th class=\"col-1\">\u51FA\u53D1\u56E2\u671F</th>\n                                                                <th class=\"col-2\">\u6536\u53D6\u6750\u6599\u622A\u6B62\u65F6\u95F4</th>\n                                                            </tr>\n                                                        </thead>\n                                                    </table>\n                                                </div>\n                                                <div class=\"tbody\">\n                                                    <table>\n                                                        <tbody>\n                                                            <% for (var index = 0; index < deadlines.length; index++) { %>\n                                                                <% if (index % 2 === 0) { %>\n                                                                    <% deadline = deadlines[index] %>\n                                                                    <tr class=\"<%= index % 4 !== 0 ? 'even' : ''%>\">\n                                                                        <td class=\"col-1\"><%= deadline.departsDate %></td>\n                                                                        <td class=\"col-2\"><%= deadline.visaEndTime%>&nbsp;&nbsp;<%= deadline.visaEndOclock %>\u70B9\u4E4B\u524D</td>\n                                                                    </tr>\n                                                                <% } %>\n                                                            <% } %>\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                            <div class=\"detail-visa-deadline-right\">\n                                                <div class=\"thead\">\n                                                    <table>\n                                                        <thead>\n                                                            <tr>\n                                                                <th class=\"col-1\">\u51FA\u53D1\u56E2\u671F</th>\n                                                                <th class=\"col-2\">\u6536\u53D6\u6750\u6599\u622A\u6B62\u65F6\u95F4</th>\n                                                            </tr>\n                                                        </thead>\n                                                    </table>\n                                                </div>\n                                                <div class=\"tbody\">\n                                                    <table>\n                                                        <tbody>\n                                                        <% for (var index = 0; index < deadlines.length; index++) { %>\n                                                            <% if (index % 2 === 1) { %>\n                                                                <% deadline = deadlines[index] %>\n                                                                <tr class=\"<%= (index - 1) % 4 !== 0 ? 'even' : ''%>\">\n                                                                    <td class=\"col-1\"><%= deadline.departsDate %></td>\n                                                                    <td class=\"col-2\"><%= deadline.visaEndTime%>&nbsp;&nbsp;<%= deadline.visaEndOclock %>\u70B9\u4E4B\u524D</td>\n                                                                </tr>\n                                                            <% } %>\n                                                        <% } %>\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                <% } %>\n                            </div>\n                        <% } %>\n                        <% if (visaInfo.acceptanceScope) { %>\n                            <div class=\"detail-visa-info-item single-row\">\n                                \u53D7\u7406\u8303\u56F4\uFF1A<strong><%= visaInfo.acceptanceScope %></strong>\n                            </div>\n                        <% } %>\n                    </div>\n                </div>\n\n                <div class=\"J_VisaTab section-box-toolbar\">\n                    <ul class=\"section-box-tab\">\n                        <% for (var h = 0; h < visaInfo.customerPropertyNames.length; h++) { %>\n                            <li<% if (h === 0) { %> class=\"active\"<% } %> data-rel=\".J_DetailVisa<%= visaInfo.customerPropertyNames[h].code %>\">\n                                <a href=\"javascript:;\"><%= visaInfo.customerPropertyNames[h].name %></a>\n                            </li>\n                        <% } %>\n                    </ul>\n\n                    <div class=\"detail-visa-button\">\n                        <a class=\"J_DetailVisaSend detail-visa-button-mail\" data-id=\"<%= visaInfo.id %>\" data-name=\"<%= visaInfo.name %>\" href=\"javascript:;\"><i class=\"icon\"></i>\u53D1\u9001\u5230\u6211\u7684\u90AE\u7BB1</a>\n                        <a class=\"J_DetailVisaPrint detail-visa-button-print\" data-id=\"<%= visaInfo.id %>\" data-name=\"<%= visaInfo.name %>\" href=\"javascript:;\"><i class=\"icon\"></i>\u6253\u5370\u6750\u6599</a>\n                    </div>\n                </div>\n\n                <div class=\"section-box-content detail-visa-material\">\n                    <% var visaMaterial = visa.visaMaterial %>\n                    <% for (var h = 0; h < visaInfo.customerPropertyNames.length; h++) { %>\n                        <% var personType = visaInfo.customerPropertyNames[h].code %>\n\n                        <div class=\"J_DetailVisa<%= personType %> detail-visa-block<%= h == 0 ? ' active' : '' %>\">\n                            <div class=\"detail-visa-material-head\">\n                                <table>\n                                    <thead>\n                                        <tr>\n                                            <th class=\"col-1\">\u6240\u9700\u6750\u6599</th>\n                                            <th class=\"col-2\">\u6750\u6599\u7C7B\u578B</th>\n                                            <th class=\"col-3\">\u63CF\u8FF0</th>\n                                        </tr>\n                                    </thead>\n                                </table>\n                            </div>\n                            <div class=\"detail-visa-material-body\">\n                                <table>\n                                    <tbody>\n                                    <% for (var materialIndex = 0; materialIndex < visaMaterial.length; materialIndex++) { %>\n                                        <% var material = visaMaterial[materialIndex] %>\n                                        <% if (material.personnenlType == personType) { %>\n                                            <tr>\n                                                <td class=\"col-1\"><%= material.customName %></td>\n                                                <td class=\"col-2\"><%= materialTypeMap[material.materialType] %></td>\n                                                <td class=\"col-3\">\n                                                    <%=# material.materialDesc %>\n                                                    <% if (material.attachments && material.attachments.length) { %>\n                                                        <% for (var attachmentIndex = 0; attachmentIndex < material.attachments.length; attachmentIndex++) { %>\n                                                            <div class=\"detail-visa-material-attachment\">\n                                                                <a href=\"<%= material.attachments[attachmentIndex].attachmentPath %>\"><%= material.attachments[attachmentIndex].attachmentName %></a>\n                                                            </div>\n                                                        <% } %>\n                                                    <% } %>\n                                                </td>\n                                            </tr>\n                                        <% } %>\n                                    <% } %>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    <% } %>\n                </div>\n\n            </div>\n        <% } %>\n        \n        \n        <div class=\"section-box-title\">\n            <h3>\u7B7E\u8BC1\u987B\u77E5</h3>\n        </div>\n\n        <div class=\"section-box-content\">\n            <div class=\"item-with-title\">\n                <span class=\"dot\">\u2022</span>\n                <div class=\"item-title\"><strong>\u6CE8\u610F\u4E8B\u9879\uFF1A</strong></div>\n                <p>\n                    \u5F53\u60A8\u5728\u7EBF\u63D0\u4EA4\u8BA2\u5355\u6210\u529F\u540E\uFF0C\u53EF\u5728\u4F1A\u5458\u4E2D\u5FC3\u63D0\u4EA4\u6750\u6599\u626B\u63CF\u4EF6\u3002<br>\n                    \u8BF7\u786E\u4FDD\u62A4\u7167\u6709\u6548\u671F\uFF1A\u672C\u6B21\u65C5\u6E38\u5F52\u56FD\u81F3\u5C11\u8FD8\u67096\u4E2A\u6708\u4EE5\u4E0A\u6709\u6548\u671F\uFF0C\u4E14\u5C1A\u6709\u7B7E\u8BC1\u6240\u9700\u7A7A\u767D\u7B7E\u8BC1\u9875\u3002\n                </p>\n            </div>\n            <% for (var i = 0; i < data.length; i++) { %>\n                <% var visa = data[i]; %>\n                <% var visaInfo = visa.visaInfo; %>\n                <% if (visaInfo.bookNotice) { %>\n                    <div class=\"item-with-title\">\n                        <span class=\"dot\">\u2022</span>\n                        <div class=\"item-title\"><strong><%= visaInfo.customName %>\u529E\u7406\u987B\u77E5\uFF1A</strong></div>\n                        <p><%=# (visaInfo.bookNotice || '').replace(/[\\n\\r]+/g, '<br>') %></p>\n                    </div>\n                <% } %>\n            <% } %>\n        </div>\n\n\n        <div class=\"section-box-title\">\n            <h3>\u6750\u6599\u9012\u4EA4\u65B9\u5F0F</h3>\n        </div>\n\n        <div class=\"section-box-content\">\n\n            <div class=\"item-with-title\">\n                <span class=\"dot\">\u2022</span>\n                <div class=\"item-title\"><strong>\u5FEB\u9012\u6750\u6599\u81F3\u9014\u725B\u95E8\u5E02\uFF0C\u5177\u4F53\u95E8\u5E02\u8BF7\u5728\u4E0B\u5355\u65F6\u9009\u62E9</strong></div>\n            </div>\n            <% if (retailName) { %>\n                <div class=\"item-with-title\">\n                    <span class=\"dot\">\u2022</span>\n                    <div class=\"item-title\"><strong>\u4EB2\u81EA\u5230\u9014\u725B\u95E8\u5E02\u5F53\u9762\u9012\u4EA4\u6750\u6599</strong></div>\n                    <p>\u4E3A\u60A8\u63A8\u8350\u95E8\u5E02\uFF1A\n                        <a href=\"javascript:;\"><i class=\"icon detail-visa-retail-location\"></i>&nbsp;<span><%= retailName %></span></a>\n                        <a class=\"detail-visa-retail-view J_retailView\" href=\"javascript:;\">\u67E5\u770B\u5168\u90E8\u95E8\u5E02</a>\n                    </p>\n                </div>\n            <% } %>\n        </div>\n        \n    </div>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailVisaDialogTemplate = exports.detailVisaDialogTemplate = "\n<div class=\"dialog dialog-visa\">\n    <div class=\"J_VisaClose dialog-close\"></div>\n    <% if (dialogType == 'send') { %>\n        <div class=\"dialog-head\">\u5C06\u6750\u6599\u53D1\u9001\u5230\u60A8\u7684\u90AE\u7BB1</div>\n    <% } else { %>\n        <div class=\"dialog-head\">\u6253\u5370\u7B7E\u8BC1\u6750\u6599</div>\n    <% } %>\n    <div class=\"dialog-body\">\n        <div class=\"dialog-row\">\u8BF7\u9009\u62E9\u8EAB\u4EFD\u7C7B\u578B</div>\n        <div class=\"dialog-row\">\n            <div class=\"J_VisaPersonType dialog-checkbox\" data-id=\"2\" data-name=\"\u5728\u804C\u4EBA\u5458\"><i class=\"icon\"></i>\u5728\u804C\u4EBA\u5458</div>\n            <div class=\"J_VisaPersonType dialog-checkbox\" data-id=\"3\" data-name=\"\u9000\u4F11\u4EBA\u5458\"><i class=\"icon\"></i>\u9000\u4F11\u4EBA\u5458</div>\n            <div class=\"J_VisaPersonType dialog-checkbox\" data-id=\"4\" data-name=\"\u81EA\u7531\u804C\u4E1A\u8005\"><i class=\"icon\"></i>\u81EA\u7531\u804C\u4E1A\u8005</div>\n            <div class=\"J_VisaPersonType dialog-checkbox\" data-id=\"5\" data-name=\"\u5B66\u9F84\u524D\u513F\u7AE5\"><i class=\"icon\"></i>\u5B66\u9F84\u524D\u513F\u7AE5</div>\n            <div class=\"J_VisaPersonType dialog-checkbox\" data-id=\"6\" data-name=\"\u5728\u6821\u5B66\u751F\"><i class=\"icon\"></i>\u5728\u6821\u5B66\u751F</div>\n            <div class=\"J_VisaPersonType dialog-checkbox\" data-id=\"7\" data-name=\"\u65E0\u4E1A\u4EBA\u5458\"><i class=\"icon\"></i>\u65E0\u4E1A\u4EBA\u5458</div>\n        </div>\n        <% if (dialogType === 'send') { %>\n            <div class=\"dialog-row dialog-row-input\">\n                <div class=\"dialog-input\">\n                    <div class=\"dialog-label\">\u8BF7\u8F93\u5165\u60A8\u5E38\u7528\u7684\u90AE\u7BB1\uFF1A</div>\n                    <div class=\"dialog-input-ctrl\">\n                        <input class=\"J_VisaEmail\" type=\"text\" name=\"email\">\n                    </div>\n                </div>\n            </div>\n        <% } %>\n        <div class=\"J_DialogError dialog-row dialog-error-tip\">\n            <i class=\"icon\"></i>&nbsp;<strong></strong>\n        </div>\n        <div class=\"dialog-row dialog-buttons\">\n            <a class=\"J_VisaCancel dialog-button dialog-cancel\" href=\"javascript:;\">\u53D6\u6D88</a>\n            <% if (dialogType == 'send') { %>\n                <a class=\"J_VisaSend dialog-button dialog-send\" href=\"javascript:;\">\u53D1\u9001</a>\n            <% } else { %>\n                <a class=\"J_VisaSend dialog-button dialog-send\" href=\"javascript:;\">\u6253\u5370</a>\n            <% } %>\n        </div>\n        \n    </div>\n</div>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.guideModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _gallery = __webpack_require__(360);
        var _config = __webpack_require__(325);
        var _guide = __webpack_require__(361);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var $guides = void 0;
        var store = void 0;
        function lazyloadHandler() {
            $guides.forEach(function($guide) {
                lazyloader.off($guide);
            });
            fetch();
        }
        function fetch() {
            $.ajax({
                dataType: 'json',
                url: _config.config.url.guide({
                    productId: store.getState('productId')
                }),
                success: function success(res) {
                    if (res && res.success) {
                        render(res.data);
                    } else {
                        remove();
                    }
                },
                error: function error(res, status) {
                    remove();
                }
            });
        }
        function render(data) {
            var templateRender = _templateNative.template.compile(_guide.detailGuideTemplate);
            $guides.forEach(function($guide) {
                $guide.append(templateRender({
                    data: data
                })).removeClass('section-loading');
                bind($guide);
            });
            $win.trigger('resize');
        }
        function bind($guide) {
            (0,
                _gallery.createGallery)($guide.find('.J_GuideGallery'));
        }
        function remove() {
            $guides.forEach(function($guide) {
                return $guide.remove();
            });
            $win.trigger('resize');
        }
        var guideModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                $guides = $('#J_Guide').toArray().map(function($ele) {
                    return $($ele);
                });
                $guides.forEach(function($guide) {
                    lazyloader.on($guide, lazyloadHandler);
                });
            }
        };
        exports.guideModule = guideModule;
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var instances = [];
        var $win = $(window);
        function collectChildren($container, selector) {
            return $container.find('[data-role=item]').toArray().map(function($child) {
                $child = $($child);
                return {
                    $element: $child
                };
            });
        }
        function updateChildren(children) {
            children.forEach(function(child) {
                child.width = child.$element.outerWidth(true);
                child.height = child.$element.outerHeight(true);
            });
        }
        function changeToCssPosition(position) {
            position = Object.assign({}, position);
            for (var property in position) {
                if (position.hasOwnProperty(property)) {
                    position[property] = -position[property];
                }
            }
            return position;
        }
        var Gallery = function() {
            function Gallery($element, options) {
                _classCallCheck(this, Gallery);
                this.options = Object.assign({
                    direction: 'h'
                }, options);
                this.children = null ;
                this.size = null ;
                this.prevDisabled = true;
                this.nextDisabled = true;
                this.position = {
                    left: 0,
                    top: 0
                };
                this.$container = $element;
                this.$list = null ;
                this.$prev = null ;
                this.$next = null ;
                this.init();
                this.bind();
            }
            _createClass(Gallery, [{
                key: 'init',
                value: function init() {
                    var direction = this.options.direction;
                    this.$list = this.$container.find('[data-role=list]');
                    this.$prev = this.$container.find('[data-role=prev]');
                    this.$next = this.$container.find('[data-role=next]');
                    this.children = collectChildren(this.$list);
                    this.updateSize();
                    this.updateState();
                    this.updateView();
                }
            }, {
                key: 'update',
                value: function update() {
                    this.updateSize();
                    this.move(0);
                }
            }, {
                key: 'updateSize',
                value: function updateSize() {
                    var direction = this.options.direction;
                    var sizeProperty = direction === 'h' ? 'width' : 'height';
                    updateChildren(this.children);
                    this.size = {
                        width: this.$container.width(),
                        height: this.$container.height()
                    };
                    this.$list[sizeProperty](this.children.reduce(function(length, child) {
                        return child[sizeProperty] + length;
                    }, 0));
                    this.listSize = {
                        width: this.$list.width(),
                        height: this.$list.height()
                    };
                    if (this.listSize[sizeProperty] <= this.size[sizeProperty]) {
                        this.$prev.hide();
                        this.$next.hide();
                    } else {
                        this.$prev.show();
                        this.$next.show();
                    }
                }
            }, {
                key: 'updatePosition',
                value: function updatePosition(moveDirection) {
                    var direction = this.options.direction;
                    var positionProperty = direction === 'h' ? 'left' : 'top';
                    var sizeProperty = direction === 'h' ? 'width' : 'height';
                    var nextPosition = 0;
                    var originPosotion = this.position[positionProperty];
                    if (moveDirection > 0) {
                        originPosotion += this.size[sizeProperty];
                    }
                    this.children.some(function(child, childIndex) {
                        var newPosition = nextPosition + child.width;
                        if (moveDirection === 1 && originPosotion >= nextPosition && originPosotion < newPosition) {
                            nextPosition = newPosition;
                            return true;
                        } else if (moveDirection === -1 && originPosotion > nextPosition && originPosotion <= newPosition) {
                            return true;
                        } else {
                            nextPosition = newPosition;
                            return false;
                        }
                    });
                    if (moveDirection > 0) {
                        nextPosition -= this.size[sizeProperty];
                    }
                    if (this.listSize[sizeProperty] - nextPosition < this.size[sizeProperty]) {
                        nextPosition = this.listSize[sizeProperty] - this.size[sizeProperty];
                    }
                    var position = {};
                    position[positionProperty] = nextPosition;
                    this.position = Object.assign({
                        left: 0,
                        top: 0
                    }, position);
                }
            }, {
                key: 'updateState',
                value: function updateState() {
                    var direction = this.options.direction;
                    var positionProperty = direction === 'h' ? 'left' : 'top';
                    var sizeProperty = direction === 'h' ? 'width' : 'height';
                    var position = this.position;
                    var size = this.size;
                    var listSize = this.listSize;
                    if (position[positionProperty] <= 0) {
                        this.prevDisabled = true;
                    } else {
                        this.prevDisabled = false;
                    }
                    if (position[positionProperty] + size[sizeProperty] >= listSize[sizeProperty]) {
                        this.nextDisabled = true;
                    } else {
                        this.nextDisabled = false;
                    }
                }
            }, {
                key: 'updateView',
                value: function updateView() {
                    if (this.prevDisabled) {
                        this.$prev.addClass('disabled');
                    } else {
                        this.$prev.removeClass('disabled');
                    }
                    if (this.nextDisabled) {
                        this.$next.addClass('disabled');
                    } else {
                        this.$next.removeClass('disabled');
                    }
                }
            }, {
                key: 'bind',
                value: function bind() {
                    var self = this;
                    this.$prev.click(function() {
                        if (self.prevDisabled) {
                            return;
                        }
                        self.move(-1);
                    });
                    this.$next.click(function() {
                        if (self.nextDisabled) {
                            return;
                        }
                        self.move(1);
                    });
                }
            }, {
                key: 'move',
                value: function move() {
                    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                    if (direction === 0) {
                        this.$list.css(changeToCssPosition(this.position));
                    } else {
                        this.updatePosition(direction);
                        this.updateState();
                        this.updateView();
                        this.$list.stop(true, true).animate(changeToCssPosition(this.position), 700);
                    }
                }
            }]);
            return Gallery;
        }();
        function createGallery($element, options) {
            var gallery = new Gallery($element,options);
            instances.push(gallery);
            return gallery;
        }
        $win.on('resize', function() {
            instances.forEach(function(instance) {
                return instance.update();
            });
        });
        exports.createGallery = createGallery;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailGuideTemplate = exports.detailGuideTemplate = "\n<div class=\"section-box detail-guide\">\n    <div class=\"section-box-head\">\n        <h2>\u7EBF\u8DEF\u5BFC\u6E38</h2>\n    </div>\n    <div class=\"section-box-body\">\n        \n        <div class=\"J_GuideGallery detail-guide-wrap\">\n            <div class=\"detail-guide-button detail-guide-prev\" data-role=\"prev\"><i class=\"icon\"></i></div>\n            <div class=\"detail-guide-button detail-guide-next\" data-role=\"next\"><i class=\"icon\"></i></div>\n            <div class=\"detail-guide-box\">\n                <ul class=\"detail-guide-list\" data-role=\"list\">\n                    <% for(var guideIndex = 0; guideIndex < data.length; guideIndex++) { %>\n                        <% var guide = data[guideIndex] %>\n                        <li class=\"detail-guide-item\" data-role=\"item\">\n                            <div class=\"detail-guide-photo\">\n                                <img src=\"<%= guide.picture %>\" alt=\"<%= guide.nickName %>\">\n                            </div>\n                            <div class=\"detail-guide-info\">\n                                <div class=\"detail-guide-name\"><%= guide.nickName %></span></div>\n                                <div class=\"detail-guide-experience\">\u5E26\u56E2<strong><%= guide.workTime %></strong>\u5E74</div>\n                                <% if (guide.awardHonors) { %>\n                                    <div class=\"detail-guide-award\">\n                                    <p><%= guide.awardHonors %></p>\n                                    </div>\n                                <% }%>\n                                <div class=\"detail-guide-statisfacion\">\n                                    <strong><%= guide.satisfaction || 100 %>%</strong>\u6EE1\u610F\u5EA6\n                                </div>\n                            </div>\n                        </li>\n                    <% } %>\n                </ul>\n            </div>\n        </div>\n        \n        <div class=\"section-box-content\">\n            <a class=\"detail-guide-more\" href=\"http://www.tuniu.com/tours/daoyou\" target=\"_blank\">\u66F4\u591A\u9014\u725B\u5BFC\u6E38 &gt;</a>\n            <div class=\"detail-guide-tip\">* \u4EE5\u4E0A\u5BFC\u6E38\u662F\u672C\u7EBF\u8DEF\u7684\u53C2\u8003\u5BFC\u6E38\uFF0C\u6700\u7EC8\u4EBA\u5458\u53EF\u80FD\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u5FAE\u8C03\uFF0C\u656C\u8BF7\u77E5\u6653</div>\n        </div>\n        \n    </div>\n</div>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.routeModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _actions = __webpack_require__(337);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _tip = __webpack_require__(326);
        var _fixer = __webpack_require__(5);
        var _taber = __webpack_require__(6);
        var _scrollTaber = __webpack_require__(7);
        var _journey = __webpack_require__(3);
        var _config = __webpack_require__(325);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var $doc = $(document);
        var store = void 0;
        var $tabContainer = void 0;
        var $tabList = void 0;
        var $route = void 0;
        var $floatTabList = void 0;
        var $floatTabs = void 0;
        var $selectedJourney = void 0;
        var minHeight = void 0;
        var maxHeight = void 0;
        var globalTabHeight = void 0;
        var expanded = false;
        var floatExpanded = false;
        var tabs = void 0;
        function active($tab) {
            tabs.forEach(function(tab) {
                if (tab === $tab || tab.$tab === $tab) {
                    ['$tab', '$target', '$floatTab'].forEach(function($element) {
                        return tab[$element].addClass('active');
                    });
                    tab.enable();
                    $selectedJourney.text(tab.label);
                } else {
                    ['$tab', '$target', '$floatTab'].forEach(function($element) {
                        return tab[$element].removeClass('active');
                    });
                    tab.disable();
                }
            });
            $win.trigger('resize');
        }
        function openFloatList() {
            floatExpanded = true;
            $floatTabList.addClass('expand');
        }
        function closeFloatList() {
            floatExpanded = false;
            $floatTabList.removeClass('expand');
        }
        function toggleFloatList() {
            if (floatExpanded) {
                closeFloatList();
            } else {
                openFloatList();
            }
        }
        function bind() {
            $doc.click(closeFloatList);
            $floatTabList.click(function(e) {
                e.stopPropagation();
            }).on('click', '.journey-nav-select', toggleFloatList).on('click', '.journey-nav-item', closeFloatList);
            var $tabList = $tabContainer.find('.journey-tab-item');
            if ($tabList.length > 7) {
                $tabList.filter(':gt(5)').addClass('more');
                $tabContainer.addClass('more').on('click', '.J_JourneyTabMore', function() {
                    if (expanded) {
                        $tabContainer.removeClass('expand');
                        expanded = false;
                    } else {
                        $tabContainer.addClass('expand');
                        expanded = true;
                    }
                    $win.trigger('resize');
                });
            }
        }
        function lazyloadImg($route) {
            $route.find('img').each(function() {
                var $img = $(this);
                var src = $img.data('src');
                lazyloader.on($img, function() {
                    var $image = new Image();
                    $image.onload = function() {
                        $img.prop('src', src).parent().addClass('loaded');
                        lazyloader.off($img);
                        $win.trigger('resize');
                    }
                    ;
                    $image.onerror = function() {
                        $img.parent().addClass('loaded');
                        lazyloader.off($img);
                        $win.trigger('resize');
                    }
                    ;
                    $image.src = src;
                    $img.src = src;
                });
            });
        }
        function initFoldContent($ctx) {
            $ctx.find('.item-label-fixed').each(function() {
                var $container = $(this);
                var $inner = $container.find('.item-label-inner');
                var min = $container.height();
                var max = $inner.height();
                if (min < max) {
                    $inner.height(min);
                    $container.addClass('fold');
                    $container.on('click', '.item-label-more', function() {
                        $container.addClass('expand');
                        $inner.height(max);
                        $win.trigger('resize');
                    }).on('click', '.item-label-less', function() {
                        $container.removeClass('expand');
                        $inner.height(min);
                        $win.trigger('resize');
                    });
                }
            });
            $win.trigger('resize');
        }
        function initRoute($route) {
            var $route3Tab = $route.find('.J_Journey3RouteTab');
            var tabTaber = (0,
                _taber.createTaber)($route3Tab, {
                ctx: $route
            });
        }
        function getJourneyData(journeyId) {
            var journey = store.getState('journey');
            var isSupportMultipleJourney = store.getState('isSupportMultipleJourney');
            if (isSupportMultipleJourney == 1) {
                return journey[Object.keys(journey).filter(function(itemId) {
                    return journeyId == itemId;
                })[0]];
            } else {
                return journey;
            }
        }
        var routeModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                $tabContainer = $('#J_MultiJourneyTab');
                $tabList = $tabContainer.find('.journey-tab-list');
                $route = $('#J_DetailMultiRoute');
                $floatTabList = $('#J_MultiJourneyNav');
                $floatTabs = $floatTabList.find('[data-rel]');
                $selectedJourney = $('#J_MultiJourneySelect');
                minHeight = $tabContainer.height();
                maxHeight = $tabList.height();
                globalTabHeight = $('#J_DetailTab').height();
                bind();
                if (store.getState('isSupportMultipleJourney')) {
                    this.initMulti();
                } else {
                    this.initSingle();
                }
            },
            initSingle: function initSingle() {
                var $route = $('.J_DetailRoute');
                var journeyId = $route.data('id');
                var journeyData = getJourneyData(journeyId);
                if (journeyData && journeyData.isNewJson == 3) {
                    _journey.journey4Module.init($route, journeyData.journeyDescJson, {
                        tabHeight: globalTabHeight
                    }).init();
                } else {
                    var _$route = $('.J_DetailRoute');
                    var $journey = $('.J_DetailJourney');
                    var $nav = _$route.find('.J_JourneyNav');
                    var $tab = _$route.find('.J_JourneyTab');
                    var navTaber = (0,
                        _scrollTaber.createScrollTaber)($nav, {
                        offset: globalTabHeight
                    });
                    var tabTaber = (0,
                        _taber.createTaber)($tab);
                    var navFixer = (0,
                        _fixer.createFixer)($nav, {
                        range: {
                            top: $journey,
                            bottom: $journey,
                            left: _$route,
                            right: _$route
                        },
                        offset: {
                            top: globalTabHeight + 10
                        },
                        ctx: _$route
                    });
                    initFoldContent($('#J_Detail'));
                    initRoute(_$route);
                    lazyloadImg(_$route);
                }
            },
            initMulti: function initMulti() {
                function initOneJourney3($tab) {
                    var rel = $tab.data('rel');
                    var $journey = $(rel);
                    var $floatTab = $floatTabs.filter('[data-rel="' + rel + '"]');
                    var $nav = $journey.find('.J_JourneyNav');
                    var $journeyRoute = $journey.find('.J_DetailRoute');
                    var $journeyRouteDetail = $journey.find('.J_DetailJourney');
                    var $journeyTab = $journey.find('.J_JourneyTab');
                    var $journeyRouteTab = $journey.find('.J_JourneyRouteTab');
                    var $journeyTabInner = $journeyTab.find('.section-box-toolbar');
                    var tabHeight = globalTabHeight;
                    var inited = false;
                    var tabFixer = void 0
                        , tabTaber = void 0
                        , navFixer = void 0
                        , navTaber = void 0;
                    function initJourney() {
                        if (inited) {
                            tabFixer && tabFixer.update();
                            tabTaber && tabTaber.update();
                            navFixer && navFixer.update();
                            navTaber && navTaber.update();
                            return;
                        }
                        inited = true;
                        initFoldContent($journey);
                        initRoute($journeyRoute);
                        if ($journeyTab.length) {
                            tabFixer = (0,
                                _fixer.createFixer)($journeyTab, {
                                range: {
                                    top: $journeyTab,
                                    bottom: $journey,
                                    left: $route,
                                    right: $route
                                },
                                offset: {
                                    top: tabHeight,
                                    left: 0
                                },
                                ctx: $journey
                            });
                            tabHeight += $journeyTab.height();
                            tabTaber = (0,
                                _scrollTaber.createScrollTaber)($journeyTab, {
                                offset: tabHeight,
                                ctx: $journey
                            });
                        }
                        navFixer = (0,
                            _fixer.createFixer)($nav, {
                            range: {
                                top: $journeyRouteDetail,
                                bottom: $journeyRouteDetail,
                                left: $journey,
                                right: $journey
                            },
                            offset: {
                                top: tabHeight + 10
                            },
                            ctx: $journey
                        });
                        navTaber = (0,
                            _scrollTaber.createScrollTaber)($nav, {
                            offset: tabHeight
                        });
                    }
                    function disable() {
                        tabFixer && tabFixer.disable();
                        tabTaber && tabTaber.disable();
                        navFixer && navFixer.disable();
                        navTaber && navTaber.disable();
                    }
                    function enable() {
                        initJourney();
                        $journeyTabInner.prepend($floatTabList);
                        tabFixer && tabFixer.enable();
                        tabTaber && tabTaber.enable();
                        navFixer && navFixer.enable();
                        navTaber && navTaber.enable();
                    }
                    function select(autoScroll) {
                        active($tab);
                        initJourney();
                        if (autoScroll === true) {
                            $win.scrollTop($journeyTab.offset().top - globalTabHeight + 5);
                        }
                    }
                    $tab.click(select);
                    $floatTab.click(function() {
                        select(true);
                    });
                    lazyloadImg($journeyRoute);
                    return {
                        $tab: $tab,
                        $floatTab: $floatTab,
                        $target: $journey,
                        id: $tab.data('id'),
                        label: $floatTab.text(),
                        disable: disable,
                        enable: enable
                    };
                }
                function initOneJourney4($tab, journeyData) {
                    var rel = $tab.data('rel');
                    var $journey = $(rel);
                    var $floatTab = $floatTabs.filter('[data-rel="' + rel + '"]');
                    var $journeyTab = $journey.find('.J_JourneyTab');
                    var $journeyTabInner = $journeyTab.find('.section-box-toolbar');
                    var tabHeight = globalTabHeight;
                    var inited = false;
                    var tabFixer = void 0
                        , tabTaber = void 0;
                    if ($journeyTab.length) {
                        tabHeight += $journeyTab.height();
                    }
                    var journey4Instance = _journey.journey4Module.init($journey, journeyData.journeyDescJson, {
                        tabHeight: tabHeight
                    });
                    function enable() {
                        if (!inited) {
                            inited = true;
                            if ($journeyTab.length) {
                                tabFixer = (0,
                                    _fixer.createFixer)($journeyTab, {
                                    range: {
                                        top: $journeyTab,
                                        bottom: $journey,
                                        left: $route,
                                        right: $route
                                    },
                                    offset: {
                                        top: globalTabHeight,
                                        left: 0
                                    },
                                    ctx: $journey
                                });
                                tabTaber = (0,
                                    _scrollTaber.createScrollTaber)($journeyTab, {
                                    offset: tabHeight,
                                    ctx: $journey
                                });
                            }
                        }
                        $journeyTabInner.prepend($floatTabList);
                        journey4Instance.enable();
                        tabFixer && tabFixer.update();
                        tabTaber && tabTaber.update();
                        tabFixer && tabFixer.enable();
                        tabTaber && tabTaber.enable();
                    }
                    function disable() {
                        journey4Instance.disable();
                        tabFixer && tabFixer.disable();
                        tabTaber && tabTaber.disable();
                    }
                    function select(autoScroll) {
                        active($tab);
                        if (autoScroll === true) {
                            $win.scrollTop($journeyTab.offset().top - globalTabHeight + 5);
                        }
                    }
                    $tab.click(select);
                    $floatTab.click(function() {
                        select(true);
                    });
                    return {
                        $tab: $tab,
                        $floatTab: $floatTab,
                        $target: $journey,
                        id: $tab.data('id'),
                        label: $floatTab.text(),
                        disable: disable,
                        enable: enable
                    };
                }
                tabs = $tabList.find('[data-rel]').toArray().map(function($tab) {
                    $tab = $($tab);
                    var journeyId = $tab.data('id');
                    var journeyData = getJourneyData(journeyId);
                    if (journeyData.isNewJson == 3) {
                        return initOneJourney4($tab, journeyData);
                    } else {
                        return initOneJourney3($tab);
                    }
                });
                store.subscribe(function() {
                    var journeyId = store.getState('currentJourney');
                    var journey = tabs.filter(function(tab) {
                        return tab.id == journeyId;
                    })[0];
                    if (journey) {
                        active(journey);
                    }
                }, 'change:currentJourney');
                if (tabs[0]) {
                    setTimeout(function() {
                        store.dispatch({
                            type: _actions.actions['CHANG_DETAIL_JOURNEY'],
                            data: tabs[0].id
                        });
                    }, 1);
                }
            }
        };
        exports.routeModule = routeModule;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.policyModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _retail = __webpack_require__(364);
        var _autoFold = __webpack_require__(365);
        var _retailCity = __webpack_require__(366);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _layer = __webpack_require__(11);
        var _config = __webpack_require__(325);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var $detailContainer = void 0
            , store = void 0
            , retailData = void 0
            , bookCode = void 0;
        function fetch() {
            $detailContainer.on('click', '.J_retailView', function() {
                if (retailData) {
                    handler();
                } else {
                    getAjaxData(bookCode, handler);
                }
            });
        }
        function setCityList(callback) {
            if (window.cityList) {
                hideLoading();
                if (typeof callback == 'function') {
                    callback();
                }
                return;
            }
            $.ajax({
                url: "/papi/getCityList",
                data: {},
                success: function success(data) {
                    hideLoading();
                    if (data && data.success) {
                        window.cityList = data.data;
                    }
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            });
        }
        function handler() {
            var currentDialog = void 0;
            currentDialog = _layer.layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                content: getRenderHtml(retailData),
                area: ['700px', '540px'],
                btn: false,
                success: function success($wrap) {
                    _retailCity.retailCityModule.init({
                        bookCityCode: bookCode
                    });
                    $wrap.on('click', '.retail-box-close', function() {
                        _layer.layer.close(currentDialog);
                    }).on('click', '.retail-location-label', function() {
                        $(this).parent().toggleClass('expand');
                    }).on('click', '.retail-city-drop-city-name', function() {
                        var $this = $(this);
                        bookCode = $this.data('code');
                        getAjaxData(bookCode, function() {
                            $wrap.find('.retail-box').parent().html(getRenderHtml(retailData));
                            _retailCity.retailCityModule.init({
                                bookCityCode: bookCode
                            });
                        });
                    });
                }
            });
        }
        function getAjaxData(bookCityCode, callback) {
            $.ajax({
                dataType: 'json',
                url: _config.config.url.retail({
                    bookCode: bookCityCode
                }),
                beforeSend: function beforeSend() {
                    showLoading();
                },
                success: function success(res) {
                    if (res && res.success) {
                        retailData = res.data;
                    } else {
                        retailData = [];
                    }
                    setCityList(callback);
                },
                error: function error(res, status) {
                    retailData = [];
                    setCityList(callback);
                }
            });
        }
        function showLoading() {
            var $rb = $('.retail-box');
            if ($rb.length) {
                $rb.addClass('loading');
            }
        }
        function hideLoading() {
            var $rb = $('.retail-box');
            if ($rb.length) {
                $rb.removeClass('loading');
            }
        }
        function getRenderHtml(data) {
            var templateRender = _templateNative.template.compile(_retail.detailRetailTemplate);
            return templateRender({
                data: data
            });
        }
        var policyModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                bookCode = store.getState('bookCityCode');
                $detailContainer = $('#J_Detail');
                $('.J_DetailPolicy').find('[data-role=fold-box]').each(function() {
                    (0,
                        _autoFold.createAutoFold)($(this));
                });
                fetch();
            }
        };
        exports.policyModule = policyModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailRetailTemplate = exports.detailRetailTemplate = "\n<div class=\"retail-box\">\n    <div class=\"retail-box-close\">\n    </div>\n    <div class=\"retail-box-head\">\n        \u67E5\u770B\u9014\u725B\u95E8\u5E02\n        <div class=\"retail-location\" id=\"J_retailCity\">\n        </div>\n    </div>\n    <div class=\"retail-box-body\">\n        <% if(data && data.length) { %>\n        <div class=\"retail-list\">\n            <ul>\n                <% for(var i = 0; i < data.length; i++) {\n                    var retailItem = data[i]; %>\n                <li>\n                    <span class=\"retail-item-num\"><%= i+1 %></span>\n                    <div class=\"retail-item-content\">\n                        <p class=\"retail-item-title\"><%= retailItem.name %></p>\n                        <dl class=\"retail-item-info\">\n                            <dt>\u95E8\u5E02\u7535\u8BDD\uFF1A</dt>\n                            <dd><%= retailItem.tel %></dd>\n                            <dt>\u8425\u4E1A\u65F6\u95F4\uFF1A</dt>\n                            <dd><%= retailItem.openTime %></dd>\n                            <dt>\u95E8\u5E02\u5730\u5740\uFF1A</dt>\n                            <dd><%= retailItem.address %></dd>\n                        </dl>\n                    </div>\n                </li>\n                <% } %>\n            </ul>\n        </div>\n        <% } else { %>\n        <div class=\"retail-nf\">\n            <div class=\"retail-nf-bg\"></div>\n            <p class=\"retail-nf-tips\">\u5443~\u5F53\u524D\u57CE\u5E02\u6682\u672A\u5F00\u901A\u9014\u725B\u95E8\u5E02</p>\n            <p class=\"retail-nf-tips\">\u8BF7\u9009\u62E9\u67E5\u770B\u60A8\u9644\u8FD1\u57CE\u5E02\u7684\u95E8\u5E02</p>\n        </div>\n        <% } %>\n        <div class=\"retail-list-loading\">\n            <i class=\"retail-list-loading-bg\"></i>\n            <i class=\"retail-list-loading-img\"></i>\n        </div>\n    </div>\n</div>\n";
    }
    , function(module, exports) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var instances = [];
        var $win = $(window);
        var instanceIndex = 0;
        var TARGET_TYPE = 'autoFold';
        function createButton(buttonType) {
            if (buttonType == 'expand') {
                return $('<a class="button-more" href="javascript:;">展开全部<i class="icon"></i></a>');
            } else {
                return $('<a class="button-less" href="javascript:;">收起全部<i class="icon"></i></a>');
            }
        }
        var AutoFold = function() {
            function AutoFold($element, options) {
                _classCallCheck(this, AutoFold);
                this.originHeight = 0;
                this.expandHeight = 0;
                this.buttonInited = false;
                this.inited = false;
                this.expanded = false;
                this.$element = $element;
                this.id = 'AUTOFOLD_' + ++instanceIndex;
                this.$inner = $element.find('[data-role=fold-box-inner]');
                this.$more = null ;
                this.$less = null ;
                this.update();
            }
            _createClass(AutoFold, [{
                key: 'init',
                value: function init() {
                    this.originHeight = this.$inner.height();
                    this.inited = true;
                }
            }, {
                key: 'initButton',
                value: function initButton() {
                    this.$more = createButton('expand');
                    this.$less = createButton('fold');
                    this.bindButton();
                    this.buttonInited = true;
                }
            }, {
                key: 'bindButton',
                value: function bindButton() {
                    this.$more.click(this.expand.bind(this));
                    this.$less.click(this.fold.bind(this));
                }
            }, {
                key: 'showButton',
                value: function showButton() {
                    if (!this.buttonInited) {
                        this.initButton();
                    }
                    this.$more.appendTo(this.$element);
                    this.$less.appendTo(this.$element);
                    this.updateButton();
                }
            }, {
                key: 'hideButton',
                value: function hideButton() {
                    if (this.buttonInited) {
                        this.$more.remove();
                        this.$less.remove();
                    }
                }
            }, {
                key: 'updateButton',
                value: function updateButton() {
                    if (this.buttonInited) {
                        if (this.expanded) {
                            this.$more.hide();
                            this.$less.show();
                        } else {
                            this.$more.show();
                            this.$less.hide();
                        }
                    }
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.$element.is(':visible')) {
                        if (!this.inited) {
                            this.init();
                        }
                        this.expandHeight = this.$inner[0].scrollHeight;
                        this.$inner.css('max-height', 'none');
                        if (this.expandHeight > this.originHeight) {
                            this.showButton();
                            this.updateContent();
                            this.$element.addClass('fold');
                        } else {
                            this.hideButton();
                            this.$inner.height(this.expandHeight);
                            this.$element.removeClass('fold');
                        }
                        $win.trigger('resize', TARGET_TYPE);
                    }
                }
            }, {
                key: 'updateContent',
                value: function updateContent() {
                    if (this.expanded) {
                        this.$inner.height(this.expandHeight);
                    } else {
                        this.$inner.height(this.originHeight);
                    }
                }
            }, {
                key: 'expand',
                value: function expand() {
                    this.expanded = true;
                    this.updateContent();
                    this.updateButton();
                }
            }, {
                key: 'fold',
                value: function fold() {
                    this.expanded = false;
                    this.updateContent();
                    this.updateButton();
                }
            }]);
            return AutoFold;
        }();
        $win.on('resize', function(e, targetType) {
            if (targetType !== TARGET_TYPE) {
                instances.forEach(function(instance) {
                    return instance.update();
                });
            }
        });
        function createAutoFold($element, options) {
            var autoFold = new AutoFold($element,options);
            instances.push(autoFold);
            return autoFold;
        }
        exports.createAutoFold = createAutoFold;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.retailCityModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _layer = __webpack_require__(11);
        var _taber = __webpack_require__(6);
        var _retailCity = __webpack_require__(367);
        var tabRender = _templateNative.template.compile(_retailCity.retailCityTemplate);
        var store = void 0
            , $cities = void 0
            , bookCityCode = void 0
            , bookCityName = void 0;
        var retailCityModule = {
            init: function init(option) {
                $cities = $('#J_retailCity');
                bookCityCode = option.bookCityCode;
                store = (0,
                    _store.getStore)();
                if ($cities.length && window.cityList) {
                    render();
                }
            }
        };
        function getCityData(data) {
            var result = []
                , hotData = {}
                , tabHead = ['推荐城市'];
            data.Hot.forEach(function(city) {
                if (!hotData[city.districtName]) {
                    hotData[city.districtName] = [];
                }
                hotData[city.districtName].push(city);
            });
            result.push(hotData);
            var _loop = function _loop(key) {
                    var LetterList = data.cityLetter[key]
                        , tempCities = {};
                    tabHead[key] = '';
                    for (var cKey in LetterList) {
                        var cities = LetterList[cKey];
                        tabHead[key] += cKey.toUpperCase();
                        cities.forEach(function(city) {
                            if (!tempCities[city.districtName]) {
                                tempCities[city.districtName] = [];
                            }
                            if (city.code == bookCityCode) {
                                bookCityName = city.name;
                            }
                            tempCities[city.districtName].push(city);
                        });
                    }
                    result.push(tempCities);
                }
                ;
            for (var key in data.cityLetter) {
                _loop(key);
            }
            return {
                data: result,
                tabHead: tabHead,
                bookCityName: bookCityName
            };
        }
        function render() {
            $cities.html(tabRender(getCityData(window.cityList)));
            bind();
        }
        function bind() {
            (0,
                _taber.createTaber)($cities.find('.retail-city-drop-tab'), {
                ctx: $cities.find('.retail-city-drop-list')
            });
        }
        exports.retailCityModule = retailCityModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var retailCityTemplate = exports.retailCityTemplate = "\n<div class=\"retail-location-label\">\n    <i class=\"r-icon-loc\"></i><span class=\"retail-city-selected\"><%= bookCityName %></span><i class=\"r-icon-down\"></i>\n</div>\n<div class=\"retail-city-drop\">\n    <div class=\"retail-city-drop-head\">\n        <ul class=\"retail-city-drop-tab\">\n            <% for (var i = 0; i < tabHead.length; i++) { %>\n                <li class=\"retail-city-drop-tab-item\" data-rel=\".J_retailTab<%= i %>\"><%= tabHead[i] %></li>\n            <% } %>\n        </ul>\n    </div>\n    <div class=\"retail-city-drop-list\">\n        <% for (var j = 0; j < data.length; j++) {\n            var cityItem = data[j]; %>\n            <dl class=\"retail-city-drop-city-city J_retailTab<%= j %>\">\n                <% for (var key in cityItem) {\n                    var cityArea = cityItem[key] %>\n                    <dt><%= key %></dt>\n                    <dd class=\"retail-city-drop-city-item\">\n                        <% for (var k = 0; k < cityArea.length; k++) { %>\n                        <span class=\"retail-city-drop-city-name <%= cityArea[k].name == bookCityName? 'active': '' %>\" data-code=\"<%= cityArea[k].code %>\" data-name=\"<%= cityArea[k].name %>\"><%= cityArea[k].name %></span>\n                        <% } %>\n                    </dd>\n                <% } %>\n            </dl>\n        <%}%>\n    </div>\n</div>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.commentModule = undefined;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _layer = __webpack_require__(11);
        var _config = __webpack_require__(325);
        var _utils = __webpack_require__(338);
        var _detail = __webpack_require__(322);
        var resourceActions = _interopRequireWildcard(_detail);
        var _gallery = __webpack_require__(360);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _pagination = __webpack_require__(369);
        var _commentLayout = __webpack_require__(370);
        var _commentContent = __webpack_require__(371);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var store = void 0;
        var inited = false;
        var commentFetcher = null ;
        var layoutRender = void 0
            , contentRender = void 0;
        var $win = $(window);
        var $container = void 0
            , $head = void 0
            , $tab = void 0
            , $tag = void 0
            , $listOuter = void 0
            , $list = void 0
            , $pager = void 0;
        var pagination = void 0;
        var query = {
            tabId: '',
            tagId: '',
            photo: 0,
            page: 1
        };
        function getDateStr(date) {
            var res = /(\d{4}\-\d{2}-\d{2})/.exec(String(date));
            return res ? res[1] : date;
        }
        function getCommentQuery() {
            var params = {
                productId: store.getState('productId')
            };
            if (query.tabId) {
                params.tab = query.tabId;
            }
            if (query.tagId) {
                params.tag = query.tagId;
            }
            if (query.photo) {
                params.photo = query.photo;
            }
            if (query.page && query.page != 1) {
                params.page = query.page;
            }
            return params;
        }
        function processLayoutData(data) {
            if (data && data.travelType && data.travelType.length) {
                data.travelType.sort(function(prev, next) {
                    return next.remarkAmount - prev.remarkAmount;
                });
            }
            return data;
        }
        function processCommentData(data) {
            if (data && data.contents && data.contents.length) {
                data.contents.forEach(function(content) {
                    var exts = [];
                    if (content.extend) {
                        exts.push({
                            type: 'extend',
                            replyTime: content.extendTime,
                            deltaTime: (0,
                                _utils.getDeltaDate)(getDateStr(content.extendTime), getDateStr(content.remarkTime))
                        });
                    }
                    if (content.replyContents && content.replyContents.length) {
                        exts = exts.concat(content.replyContents);
                        exts.sort(function(prev, next) {
                            return prev.replyTime > next.replyTime ? 1 : -1;
                        });
                    }
                    content.exts = exts;
                });
            }
            return data;
        }
        function fetchAll() {
            $.ajax({
                dataType: 'json',
                url: _config.config.url.remarkStatus(),
                data: {
                    productId: store.getState('productId')
                },
                success: function success(res) {
                    if (res && res.success) {
                        renderLayout(processLayoutData(res.data));
                        fetchComment();
                    }
                },
                error: function error(res, status) {}
            });
        }
        function fetchComment() {
            if (commentFetcher) {
                commentFetcher.abort();
            }
            commentFetcher = $.ajax({
                dataType: 'json',
                url: _config.config.url.remarkList(),
                data: getCommentQuery(),
                beforeSend: showListLoading,
                success: function success(res) {
                    hideListLoading();
                    if (res && res.success) {
                        renderComment(res.data);
                    }
                },
                error: function error(res, status) {
                    if (status === 'abort') {} else {
                        hideListLoading();
                    }
                }
            });
        }
        function renderLayout(data) {
            if (!layoutRender) {
                layoutRender = _templateNative.template.compile(_commentLayout.commentLayoutTemplate);
            }
            $container.html(layoutRender({
                data: data
            }));
            $head = $container.find('.comment-head');
            $tab = $container.find('.comment-tab');
            $tag = $container.find('.comment-tag');
            $listOuter = $container.find('.comment-list-outer');
            $list = $container.find('.comment-list');
            $pager = $container.find('.pagination');
            $container.removeClass('section-loading');
            bind();
            $win.trigger('resize');
        }
        function renderComment(data) {
            if (!contentRender) {
                contentRender = _templateNative.template.compile(_commentContent.commentContentTemplate);
            }
            $list.html(contentRender({
                data: processCommentData(data)
            }));
            if (pagination) {
                pagination.reload({
                    current: data.currentPage,
                    total: data.totalPages
                });
                pagination.render();
            } else {
                pagination = (0,
                    _pagination.createPagination)($pager, {
                    current: data.currentPage,
                    total: data.totalPages,
                    onchange: function onchange(page) {
                        query.page = page;
                        change();
                    }
                });
            }
            $win.trigger('resize');
            $list.find('.J_CommentPhoto').each(function() {
                var $gallery = $(this);
                _layer.layer.photos({
                    photos: $gallery,
                    shift: 5,
                    shade: 0.5
                });
                loadAllPicture($gallery.find('img').toArray(), function() {
                    (0,
                        _gallery.createGallery)($gallery);
                });
            });
        }
        function justifyImage(originWidth, originHeight, targetWidth, targetHeight) {
            var originRate = originWidth / originHeight;
            var targetRate = targetWidth / targetHeight;
            if (originRate > targetRate) {
                originHeight = originWidth / targetRate;
            } else if (originRate < targetRate) {
                originWidth = originHeight * targetRate;
            }
            return {
                width: originWidth,
                height: originHeight
            };
        }
        function loadAllPicture($imgs, cb) {
            var amount = $imgs.length;
            var index = 0;
            function add() {
                index++;
                if (index === amount) {
                    cb();
                }
            }
            if ($imgs && $imgs.length) {
                $imgs.forEach(function($img) {
                    var $new = new Image();
                    $new.onload = function() {
                        add();
                    }
                    ;
                    $new.onerror = function() {
                        add();
                    }
                    ;
                    $new.src = $img.src;
                });
            } else {
                cb();
            }
        }
        function lazyloadHandler() {
            lazyloader.off($container);
            fetchAll();
        }
        function init() {
            store = (0,
                _store.getStore)();
            $container = $('#J_Comment');
            lazyloader.on($container, lazyloadHandler);
        }
        function bind() {
            var $tabs = $tab.find('.comment-tab-item');
            $tabs.click(function() {
                var $item = $(this);
                if (!$item.hasClass('active')) {
                    $tabs.removeClass('active');
                    $item.addClass('active');
                    changeTab($item.data('id'));
                }
            });
            var $tags = $tag.find('.comment-tag-item');
            $tags.click(function() {
                var $item = $(this);
                if (!$item.hasClass('active')) {
                    $tags.removeClass('active');
                    $item.addClass('active');
                    changeTag($item.data('id'));
                }
            });
            var $photo = $tab.find('.J_CommentPhoto');
            $photo.click(function() {
                if (query.photo) {
                    query.photo = 0;
                    $photo.removeClass('checked');
                } else {
                    query.photo = 1;
                    $photo.addClass('checked');
                }
                change();
            });
        }
        function changeTab(tabId) {
            if (tabId === query.tabId) {
                return;
            }
            query.tabId = tabId;
            change();
        }
        function changeTag(tagId) {
            if (tagId === query.tagId) {
                return;
            }
            query.tagId = tagId;
            change();
        }
        function change() {
            fetchComment();
        }
        function showListLoading() {
            $listOuter.addClass('loading');
        }
        function hideListLoading() {
            $listOuter.removeClass('loading');
        }
        var commentModule = {
            init: init
        };
        var FloatLayer = function() {
            function FloatLayer() {
                _classCallCheck(this, FloatLayer);
                this.timer = null ;
                this.visible = false;
                this.$element = null ;
                this.$arrow = null ;
                this.defaultWidth = 500;
                this.defaultHeight = 400;
                this.width = 0;
                this.height = 0;
                this.delay = 150;
                this.createView();
            }
            _createClass(FloatLayer, [{
                key: 'createView',
                value: function createView() {
                    this.$element = $('<div />').addClass('float-layer').hide().appendTo('body');
                    this.$inner = $('<div />').addClass('float-layer-inner').appendTo(this.$element);
                    this.$arrow = $('<div />').addClass('float-layer-arrow').appendTo(this.$element);
                }
            }, {
                key: 'bind',
                value: function bind() {}
            }, {
                key: 'show',
                value: function show($img) {
                    this.nextImg = $img;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(this._show.bind(this), this.delay);
                }
            }, {
                key: 'getNextPosition',
                value: function getNextPosition() {
                    var $img = this.nextImg;
                    var offset = void 0;
                    if ($img) {
                        offset = $img.offset();
                    }
                    return Object.assign({
                        left: 0,
                        top: 0,
                        width: $img.width(),
                        height: $img.height()
                    }, offset);
                }
            }, {
                key: '_show',
                value: function _show() {
                    var position = this.getNextPosition();
                    this.$element.css({
                        left: 0
                    });
                    if (this.visible) {}
                }
            }, {
                key: '_load',
                value: function _load() {}
            }, {
                key: 'hide',
                value: function hide() {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(this._hide.bind(this), this.delay);
                }
            }, {
                key: '_hide',
                value: function _hide() {
                    this.visible = false;
                    this.nextImg = null ;
                    this.width = 0;
                    this.height = 0;
                    this.$element.hide().css({
                        left: 0,
                        top: 0
                    });
                    this.$inner.empty().width(this.width).height(this.height);
                }
            }]);
            return FloatLayer;
        }();
        exports.commentModule = commentModule;
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.createPagination = undefined;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value"in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            }
                ;
        }();
        var _templateNative = __webpack_require__(324);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var instances = [];
        var templeteString = '\n<div class="pagination-box">\n    <span class="pagination-item pagination-prev<%= current === 1 ? \' disabled\' : \'\' %>">&lt;</span>\n    <% for (var page = min; page <= max; page++) { %>\n        <span class="pagination-item pagination-page<%= current === page ? \' active\' : \'\' %>"\n            <% if (current !== page) { %>data-page="<%= page %>"<% } %>><%= page %></span>\n    <% } %>\n    <% if (more) { %>\n        <span class="pagination-item pagination-more">\u2022\u2022\u2022</span>\n    <% } %>\n    <% if (last) { %>\n        <span class="pagination-item pagination-page" data-page="<%= total %>"><%= total %></span>\n    <% } %>\n    <span class="pagination-item pagination-next<%= current === total ? \' disabled\' : \'\' %>">&gt;</span>\n</div>\n';
        var templateRender = _templateNative.template.compile(templeteString);
        var Pagination = function() {
            function Pagination($element, options) {
                _classCallCheck(this, Pagination);
                this.current = options.current || 1;
                this.total = options.total || 1;
                this.offset = 2;
                this.$element = $element;
                this.options = Object.assign({}, options);
                this.bind();
                this.render();
            }
            _createClass(Pagination, [{
                key: 'bind',
                value: function bind() {
                    var self = this;
                    this.$element.on('click', '.pagination-prev', function() {
                        self.change(self.current - 1);
                    }).on('click', '.pagination-next', function() {
                        self.change(self.current + 1);
                    }).on('click', '.pagination-page', function() {
                        self.change($(this).data('page'));
                    });
                }
            }, {
                key: 'change',
                value: function change(page) {
                    page = parseInt(page);
                    if (page && this.current !== page && page > 0 && page <= this.total) {
                        this.current = page;
                        this.render();
                        if (this.options.onchange) {
                            this.options.onchange(page);
                        }
                    }
                }
            }, {
                key: 'params',
                value: function params() {
                    var current = this.current;
                    var total = this.total;
                    var offset = this.offset;
                    var min = Math.max(current - offset, 1);
                    var max = Math.min(total, min + offset * 2);
                    min = Math.max(max - offset * 2, 1);
                    return {
                        current: current,
                        total: total,
                        min: min,
                        max: max,
                        more: max < total,
                        last: max !== total
                    };
                }
            }, {
                key: 'render',
                value: function render() {
                    this.$element.html(templateRender(this.params()));
                }
            }, {
                key: 'reload',
                value: function reload(options) {
                    this.current = options.current || this.current;
                    this.total = options.total || this.total;
                    this.offset = options.offset || this.offset;
                    this.options = Object.assign({}, this.options, options);
                }
            }]);
            return Pagination;
        }();
        function createPagination($element, options) {
            var pagination = new Pagination($element,options);
            instances.push(pagination);
            return pagination;
        }
        exports.createPagination = createPagination;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var commentLayoutTemplate = exports.commentLayoutTemplate = "\n<% var gradeNames = '|\u5BFC\u6E38\u670D\u52A1|\u884C\u7A0B\u5B89\u6392|\u9910\u996E\u4F4F\u5BBF|\u65C5\u884C\u4EA4\u901A|' %>\n<div class=\"section-box comment\">\n    <div class=\"section-box-head\">\n        <h2>\u6E38\u5BA2\u70B9\u8BC4</h2>\n    </div>\n    <div class=\"section-box-body\">\n        \n        <% if (data && data.statData && data.statData.remarkAmount) { %>\n        \n            <div class=\"comment-head\">\n                <div class=\"comment-satisfaction\">\n                    <div>\u6EE1\u610F\u5EA6</div>\n                    <div><strong><%= data.statData.satisfaction %>%</strong></div>\n                    <div>\u6765\u81EA<%= data.statData.remarkAmount %>\u540D\u6E38\u5BA2\u7684\u70B9\u8BC4</div>\n                    <i class=\"icon\"></i>\n                </div>\n                \n                <div class=\"comment-head-right\">\n                    <div class=\"comment-percent\">\n                        <table>\n                            <tr>\n                                <td class=\"col-1\">\u6EE1\u610F(<%= data.statData.compGrade3Amount %>)</td>\n                                <td class=\"col-2\">\n                                    <div class=\"comment-percent-value\">\n                                        <i style=\"width: <%= data.statData.compGrade3Percent %>%\"></i>\n                                    </div>\n                                </td>\n                                <td class=\"col-3\"><strong><%= data.statData.compGrade3Percent %>%</strong></td>\n                            </tr>\n                            <tr>\n                                <td class=\"col-1\">\u4E00\u822C(<%= data.statData.compGrade2Amount %>)</td>\n                                <td class=\"col-2\">\n                                    <div class=\"comment-percent-value\">\n                                        <i style=\"width: <%= data.statData.compGrade2Percent %>%\"></i>\n                                    </div>\n                                </td>\n                                <td class=\"col-3\"><strong><%= data.statData.compGrade2Percent %>%</strong></td>\n                            </tr>\n                            <tr>\n                                <td class=\"col-1\">\u4E0D\u6EE1\u610F(<%= data.statData.compGrade1Amount %>)</td>\n                                <td class=\"col-2\">\n                                    <div class=\"comment-percent-value\">\n                                        <i style=\"width: <%= data.statData.compGrade1Percent %>%\"></i>\n                                    </div>\n                                </td>\n                                <td class=\"col-3\"><strong><%= data.statData.compGrade1Percent %>%</strong></td>\n                            </tr>\n                        </table>\n                    </div>\n                    \n                    <div class=\"comment-fraction\">\n                        <% for (var gradeIndex = 0; gradeIndex < data.grade.length; gradeIndex++) { %>\n                            <% if (gradeNames.indexOf('|' + data.grade[gradeIndex].name + '|') !== -1) { %>\n                                <div class=\"comment-fraction-item\">\n                                    <%= data.grade[gradeIndex].name %><span><strong><%= data.grade[gradeIndex].grade %></strong>/5</span>\n                                </div>\n                            <% } %>\n                        <% } %>\n                    </div>\n                    \n                    \n                    <div class=\"comment-post\">\n                        <div class=\"comment-post-desc\">\n                            \u51FA\u6E38\u5F52\u6765\u53D1\u70B9\u8BC4\u8FD4\u73B0\u91D1<br>\u672C\u4EA7\u54C1\u5DF2\u7D2F\u8BA1\u53D1\u653E<strong><%= data.statData.moneyAmount %></strong>\u5143\n                        </div>\n                        <div class=\"comment-post-button\">\n                            <a href=\"https://i.tuniu.com/list\" target=\"_blank\">\u53D1\u8868\u70B9\u8BC4</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <div class=\"comment-tab\">\n                <ul class=\"comment-tab-list\">\n                    <li class=\"comment-tab-item active\">\n                        <span>\u5168\u90E8\u70B9\u8BC4(<%= data.statData.remarkAmount %>)</span>\n                    </li>\n                    <li class=\"comment-tab-item\" data-id=\"3\">\n                        <span>\u6EE1\u610F(<%= data.statData.compGrade3Amount %>)</span>\n                    </li>\n                    <li class=\"comment-tab-item\" data-id=\"2\">\n                        <span>\u4E00\u822C(<%= data.statData.compGrade2Amount %>)</span>\n                    </li>\n                    <li class=\"comment-tab-item last\" data-id=\"1\">\n                        <span>\u4E0D\u6EE1\u610F(<%= data.statData.compGrade1Amount %>)</span>\n                    </li>\n                </ul>\n                <div class=\"J_CommentPhoto comment-tab-photo\">\n                    <i class=\"icon\"></i>\u6709\u56FE\n                </div>\n            </div>\n            \n            <div class=\"comment-tag\">\n                <span class=\"comment-tag-item active\">\u5168\u90E8</span>\n                <% for (var tagIndex = 0; tagIndex < data.travelType.length; tagIndex++) { %>\n                    <span class=\"comment-tag-item\" data-id=\"<%= data.travelType[tagIndex].travelTypeId %>\"><%= data.travelType[tagIndex].travelTypeName %></span>\n                <% } %>\n            </div>\n            \n            <div class=\"comment-list-outer\">\n                <div class=\"comment-list\">\n                </div>\n                <div class=\"comment-list-loading\">\n                    <i class=\"comment-list-loading-bg\"></i>\n                    <i class=\"comment-list-loading-img\"></i>\n                </div>\n            </div>\n            \n            <div class=\"pagination\"></div>\n            \n        <% } else { %>\n            \n            <div class=\"comment-head\">\n                <div class=\"comment-satisfaction\">\n                    <div>\u6EE1\u610F\u5EA6</div>\n                    <div><strong>100%</strong></div>\n                    <i class=\"icon\"></i>\n                </div>\n                \n                <div class=\"comment-head-right empty\">\n                    \n                    <div class=\"comment-empty-content\">\n                        \u672C\u4EA7\u54C1\u6682\u65E0\u70B9\u8BC4\uFF0C\u8D76\u7D27\u8D2D\u4E70\u51FA\u6E38\u5F52\u6765\u53D1\u8868\u70B9\u8BC4<br>                    \n                        \u70B9\u8BC4\u6709\u60CA\u559C\uFF0C\u6D77\u91CF\u62B5\u7528\u5238\u8FD4\u73B0\u7B49\u4F60\u6765\u62FF\n                    </div>\n                    \n                    <div class=\"comment-post\">\n                        <div class=\"comment-post-desc\">\n                            \u51FA\u6E38\u56DE\u6765\u53EF\u70B9\u8BC4\u4EA7\u54C1\n                        </div>\n                        <div class=\"comment-post-button\">\n                            <a href=\"https://i.tuniu.com/list\" target=\"_blank\">\u53D1\u8868\u70B9\u8BC4</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <div class=\"comment-empty-list\">\n                \u672C\u4EA7\u54C1\u6682\u65E0\u70B9\u8BC4\u4FE1\u606F\uFF0C\u6E38\u5BA2\u51FA\u6E38\u5F52\u6765\u53EF\u53D1\u8868\u70B9\u8BC4\uFF0C\u60A8\u7684\u51FA\u6E38\u8BC4\u4EF7\u662F\u6211\u4EEC\u63D0\u5347\u670D\u52A1\u7684\u4F9D\u636E\u3002\n            </div>\n            \n        <% } %>\n    </div>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var commentContentTemplate = exports.commentContentTemplate = "\n<% var platformMap = {4: 'app', 1: 'pc', 2: 'pc'} %>\n<% for(var i = 0; i < data.contents.length; i++) { %>\n    <% var comment = data.contents[i] %>\n    <div class=\"comment-item\">\n        <% if (comment.essence) { %>\n            <i class=\"icon comment-item-jinghua\"></i>\n        <% } %>\n        \n        <div class=\"comment-item-user\">\n            <div class=\"comment-item-user-photo\">\n                <img src=\"<%= comment.user.avatar || 'http://img3.tuniucdn.com/img/20140811/usercenter_lxl/default.gif' %>\" alt=\"<%= comment.user.nickname %>\">\n            </div>\n            <i class=\"icon comment-item-user-level comment-item-user-level-<%= comment.user.level %>\"></i>\n            <div class=\"comment-item-user-name\"><%= comment.user.nickname %></div>\n            <div class=\"comment-item-user-product-type\"><%= comment.travelType.name %></div>\n        </div>\n        \n        <% if (comment.moneyAmount || comment.travelCouponAmount || comment.couponAmount || comment.scoreAmount) { %>\n            <div class=\"comment-item-gift\">\n                <div class=\"comment-item-gift-title\"><i class=\"icon\"></i>\u70B9\u8BC4\u8D60\u9001</div>\n                <div class=\"comment-item-gift-list\">\n                    <% if (comment.moneyAmount) { %>\n                        <div class=\"comment-item-gift-item\">\u8FD4&ensp;&ensp;\u73B0<strong>&yen;<%= comment.moneyAmount %></strong></div>\n                    <% } %>\n                    <% if (comment.travelCouponAmount) { %>\n                        <div class=\"comment-item-gift-item\">\u65C5\u6E38\u5238<strong>&yen;<%= comment.travelCouponAmount %></strong></div>\n                    <% } %>\n                    <% if (comment.couponAmount) { %>\n                        <div class=\"comment-item-gift-item\">\u62B5\u7528\u5238<strong>&yen;<%= comment.couponAmount %></strong></div>\n                    <% } %>\n                    <% if (comment.scoreAmount) { %>\n                        <div class=\"comment-item-gift-item\">\u79EF&ensp;&ensp;\u5206<strong>&yen;<%= comment.scoreAmount %></strong></div>\n                    <% } %>\n                </div>\n            </div>\n        <% } %>\n        \n        <div class=\"comment-item-toolbar\">\n            <% var isStatis = false; %>\n            <% for (var subIndex = 0; subIndex < comment.subGradeContents.length; subIndex++) { %>\n                <% if(comment.subGradeContents[subIndex].dataIvalue == 3) { isStatis = true; break; } %>\n            <% } %>\n            <% for (var subIndex = 0; subIndex < comment.subGradeContents.length; subIndex++) { %>\n                <% var sub = comment.subGradeContents[subIndex] %>\n                <div class=\"comment-item-toolbar-item\">\n                    <% if(isStatis && subIndex === 0) { %><i class=\"icon\"></i><% } %><%= sub.notes %>\uFF1A<%= sub.showGradeValue %>\n                </div>\n            <% } %>\n            \n        </div>\n        \n        <div class=\"comment-item-content\">\n            <%= comment.compTextContent.dataSvalue %>\n        </div>\n        \n        <% for (var subIndex = 0; subIndex < comment.subTextContents.length; subIndex++) { %>\n            <% var sub = comment.subTextContents[subIndex] %>\n            <% if (sub.dataSvalue) { %>\n                <div class=\"comment-item-detail\">\n                    <div class=\"comment-item-detail-title\"><%= sub.notes %>\uFF1A</div>\n                    <div class=\"comment-item-detail-content\"><%= sub.dataSvalue %></div>\n                </div>\n            <% } %>\n        <% } %>\n        \n        <% var photoLength %>\n        <% if(comment.photoContents && (photoLength = comment.photoContents.length)) { %>\n            <div class=\"J_CommentPhoto comment-item-picture\">\n                <div class=\"comment-item-picture-button comment-item-picture-prev\" data-role=\"prev\"><i class=\"icon\"></i></div>\n                <div class=\"comment-item-picture-button comment-item-picture-next\" data-role=\"next\"><i class=\"icon\"></i></div>\n                <div class=\"comment-item-picture-box\">\n                    <ul data-role=\"list\">\n                    <% for(var photoIndex = 0; photoIndex < photoLength; photoIndex++) { %>\n                        <li data-role=\"item\"><img layer-src=\"<%= comment.photoContents[photoIndex].big %>\" src=\"<%= comment.photoContents[photoIndex].dataSvalue %>\" alt=\"<%= comment.photoContents[photoIndex].notes %>\"></li>\n                    <% } %>\n                    </ul>\n                </div>\n            </div>\n        <% } %>\n\n        <div class=\"comment-item-foot\">\n            <a class=\"comment-item-date\" href=\"/recall/<%= comment.id %>\" target=\"_blank\"><%= comment.remarkTime %></a>\n            <% if (comment.remarkChannel == 4) { %>\n                <a class=\"comment-item-platform\" href=\"http://www.tuniu.com/static/mobile/\" target=\"_blank\">\u6765\u81EA<i class=\"icon comment-item-platform-<%= platformMap[comment.remarkChannel] %>\"></i><%= comment.remarkChannelName %></a>\n            <% } else { %>\n                <span class=\"comment-item-platform\">\u6765\u81EA<i class=\"icon comment-item-platform-<%= platformMap[comment.remarkChannel] %>\"></i><%= comment.remarkChannelName %></span>\n            <% } %>\n        </div>\n        \n        <% for (var extIndex = 0; extIndex < comment.exts.length; extIndex++) { %>\n            <% var ext = comment.exts[extIndex] %>\n            <% if (ext.type == 'extend') { %>\n                <div class=\"comment-item-extend\">\n                    <div class=\"comment-item-extend-time\">\n                    <%= ext.deltaTime.day ? ext.deltaTime.day + '\u5929\u540E' : '\u5F53\u65E5' %>\u8FFD\u8BC4\uFF1A</div>\n                    <div class=\"comment-item-detail\"><%= comment.extendContent %></div>\n                    <% if(comment.extendPhotoContents && (photoLength = comment.extendPhotoContents.length)) { %>\n                        <div class=\"J_CommentPhoto comment-item-picture comment-item-extend-picture\">\n                            <div class=\"comment-item-picture-button comment-item-picture-prev\" data-role=\"prev\"><i class=\"icon\"></i></div>\n                            <div class=\"comment-item-picture-button comment-item-picture-next\" data-role=\"next\"><i class=\"icon\"></i></div>\n                            <div class=\"comment-item-picture-box\">\n                                <ul data-role=\"list\">\n                                <% for(var photoIndex = 0; photoIndex < photoLength; photoIndex++) { %>\n                                    <li data-role=\"item\"><img layer-src=\"<%= comment.extendPhotoContents[photoIndex].big %>\" src=\"<%= comment.extendPhotoContents[photoIndex].dataSvalue %>\" alt=\"<%= comment.extendPhotoContents[photoIndex].notes %>\"></li>\n                                <% } %>\n                                </ul>\n                            </div>\n                        </div>\n                    <% } %>\n                    \n                </div>\n                \n            <% } else { %>\n                <div class=\"comment-item-service\">\n                    <i class=\"comment-item-service-arrow\"></i>\n                    <div class=\"comment-item-service-logo\"></div>\n                    <div class=\"comment-item-service-box\">\n                        <div class=\"comment-item-service-title\">\u5BA2\u670D\u56DE\u590D\uFF1A</div>\n                        <div class=\"comment-item-service-content\"><%=# ext.dataSvalue %></div>\n                    </div>\n                </div>\n            <% } %>\n        <% } %>\n        \n        \n        \n    </div>\n<%} %>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.advisoryModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _layer = __webpack_require__(11);
        var _config = __webpack_require__(325);
        var _advisoryLayout = __webpack_require__(373);
        var _advisoryContent = __webpack_require__(374);
        var _pagination = __webpack_require__(369);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window)
            , $advisory = void 0
            , store = void 0
            , pagination = void 0
            , $pager = void 0
            , $askContent = void 0
            , $qaContent = void 0
            , $container = $('#J_detailAdvisory')
            , layoutTemplate = _templateNative.template.compile(_advisoryLayout.advisoryLayoutTemplate)
            , contentTemplate = _templateNative.template.compile(_advisoryContent.advisoryContentTemplate)
            , query = {
            productId: null ,
            page: 1,
            limit: 5,
            type: null ,
            search: ''
        }
            , MAIN_HOST = 'http://www.tuniu.com';
        function lazyloadHandler() {
            $advisory.forEach(function($item) {
                lazyloader.off($item);
            });
            fetch();
        }
        function fetch() {
            getQAData(function(res) {
                renderLayout(res);
                renderContent(res);
            });
        }
        function remove() {
            $advisory.forEach(function($item) {
                return $item.remove();
            });
            $win.trigger('resize');
        }
        function getQAData(callback) {
            $.ajax({
                dataType: 'json',
                url: _config.config.url.qa(),
                data: query,
                success: function success(res) {
                    if (res && res.success) {
                        callback(res.data);
                    } else {
                        remove();
                    }
                },
                error: function error(res, status) {
                    remove();
                }
            });
        }
        function renderLayout(data) {
            layoutTemplate = _templateNative.template.compile(_advisoryLayout.advisoryLayoutTemplate);
            $advisory.forEach(function($item) {
                $item.append(layoutTemplate({
                    data: data
                })).removeClass('section-loading');
            });
            bindBase();
        }
        function bindBase() {
            $qaContent = $container.find('.J_qaContent');
            $pager = $container.find('.pagination');
            var $typeList = $container.find('.advisory-category-list')
                , $searchText = $container.find('.advisory-search-input')
                , $searchBtn = $container.find('.advisory-search-btn');
            $typeList.on('click', 'li', function() {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $this.addClass('active').siblings().removeClass('active');
                    query.page = 1;
                    query.type = $this.data('type');
                    query.search = '';
                    $searchText.val('');
                    getQAData(renderContent);
                }
            });
            $searchBtn.click(function() {
                query.page = 1;
                query.search = $searchText.val();
                getQAData(renderContent);
            });
        }
        function renderContent(data) {
            $qaContent.html(contentTemplate({
                data: data
            }));
            if (data && data.askCount > 0) {
                $pager.show();
                if (pagination) {
                    pagination.reload({
                        current: query.page,
                        total: Math.ceil(data.askCount / query.limit)
                    });
                    pagination.render();
                } else {
                    pagination = (0,
                        _pagination.createPagination)($pager, {
                        current: query.page,
                        total: Math.ceil(data.askCount / query.limit),
                        onchange: function onchange(page) {
                            query.page = page;
                            getQAData(renderContent);
                        }
                    });
                }
            } else {
                $pager.hide();
            }
        }
        function bind() {
            $askContent = $('#ask_content');
            var $askBtn = $container.find('.advisory-search-ask');
            $askBtn.click(function() {
                $win.scrollTop($('.aq_box').offset().top - 45);
            });
            $('#ask_content').click(function() {
                var tuniuUserCookie = getCookie('tuniuuser');
                if (tuniuUserCookie == '') {
                    show_box('请先登录');
                    return false;
                }
            });
            $('#ask_content').focus(function() {
                $('#write_question').hide();
            }).blur(function() {
                if ($('#ask_content').val() == '') {
                    $('#write_question').show();
                }
            });
            $('#identify').focus(function() {
                $('#write_identify').hide();
            }).blur(function() {
                if ($('#identify').val() == '') {
                    $('#write_identify').show();
                }
            });
            window.load_code = load_code;
            window.check_data = check_data;
            window.change_img = change_img;
        }
        function show_box(msg) {
            _layer.layer.alert(msg);
        }
        function getCookie(c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + '=');
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = document.cookie.indexOf(';', c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return '';
        }
        function check_data() {
            var tuniuUserCookie = getCookie('tuniuuser')
                , question_type = void 0;
            if (tuniuUserCookie == '') {
                show_box('请先登录');
                return false;
            }
            var selectRadio = document.getElementsByName('aq_style');
            for (var i = 0; i < selectRadio.length; i++) {
                if (selectRadio[i].checked) {
                    question_type = selectRadio[i].value;
                }
            }
            $('#sub_button').attr('disabled', true);
            if (typeof question_type == 'undefined') {
                document.getElementById('choose_question').style.display = 'block';
                $('#sub_button').removeAttr('disabled');
                return false;
            }
            if (document.getElementById('ask_content').value == '') {
                document.getElementById('write_question').style.display = 'block';
                document.getElementById('ask_content').focus();
                $('#sub_button').removeAttr('disabled');
                return false;
            }
            if (document.getElementById('email').value != '') {
                if (document.getElementById('email').value.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) == -1) {
                    alert('请填写正确邮箱');
                    document.getElementById('email').focus();
                    $('#sub_button').removeAttr('disabled');
                    return false;
                }
            }
            if (document.getElementById('identify').value == '') {
                document.getElementById('write_identify').style.display = 'block';
                document.getElementById('identify').focus();
                $('#sub_button').removeAttr('disabled');
                return false;
            }
            var identify = document.getElementById('identify').value;
            return false;
        }
        function change_img() {
            var random = Math.random();
            var $imageCode = $('#identify_img');
            if ($imageCode.length > 0) {
                $imageCode[0].src = MAIN_HOST + '/identify.php?sid=' + random;
            }
        }
        function load_code() {
            var $identify_img = $('#identify_img');
            if ($identify_img.length > 0) {
                if ($identify_img.css('display') == 'none') {
                    $identify_img.show();
                    var random = Math.random();
                    $identify_img[0].src = MAIN_HOST + '/identify.php?sid=' + random;
                }
            }
        }
        function identify_check_result(result) {
            var routeId = store.getState('productId')
                , question_type = void 0;
            if (result == '1') {
                (function() {
                    var url = MAIN_HOST + '/tours/addask/' + routeId;
                    var user_email = $('#email').val();
                    if ('' == $('#email').val()) {
                        user_email = $('#user_email').val();
                    }
                    var selectRadio = document.getElementsByName('aq_style');
                    for (var i = 0; i < selectRadio.length; i++) {
                        if (selectRadio[i].checked) {
                            question_type = selectRadio[i].value;
                        }
                    }
                    var info = {
                        content: $('#ask_content').val(),
                        email: user_email,
                        identify: $('#identify').val(),
                        question_type: question_type
                    };
                    $.post(url, info, function(data) {
                        if (data == -1) {
                            alert('验证码填写错误');
                            change_img();
                            $('#sub_button').removeAttr('disabled');
                        } else if (data == -2) {
                            alert('问题字数不能超过200字');
                            change_img();
                            $('#sub_button').removeAttr('disabled');
                        } else if (data == -3) {
                            alert('请填入问题的内容');
                            change_img();
                            $('#sub_button').removeAttr('disabled');
                        } else if (data == -4) {
                            alert('请填入邮箱地址');
                            change_img();
                            $('#sub_button').removeAttr('disabled');
                        } else if (data == 0) {
                            alert('提交失败，请重试');
                            change_img();
                            $('#sub_button').removeAttr('disabled');
                        } else if (data == 1) {
                            alert('您的提问已提交成功，感谢您的关注。您的提问我们会在30分钟内回复。\n18:00之后的提问将在次日9：00后回复。您也可以登录会员中心-我的提问中查看您的问题及回复。');
                            $('#sub_button').removeAttr('disabled');
                            $('#ask_content').val('');
                            $('#identify').val('');
                            for (var _i = 0; _i < selectRadio.length; _i++) {
                                if (selectRadio[_i].checked) {
                                    selectRadio[_i].checked = false;
                                }
                            }
                        }
                    });
                })();
            } else {
                alert('验证码填写错误');
                change_img();
                $('#sub_button').removeAttr('disabled');
            }
        }
        var askModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                fetch();
            }
        };
        var advisoryModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                query.productId = store.getState('productId');
                $advisory = $container.toArray().map(function($ele) {
                    return $($ele);
                });
                $advisory.forEach(function($item) {
                    lazyloader.on($item, lazyloadHandler);
                });
            }
        };
        exports.advisoryModule = advisoryModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var advisoryLayoutTemplate = exports.advisoryLayoutTemplate = "\n<div class=\"section-box advisory\">\n    <div class=\"section-box-head\">\n        <h2>\u5728\u7EBF\u95EE\u7B54</h2>\n    </div>\n    <div class=\"section-box-body\">\n        <div class=\"advisory-head\">\n            <div class=\"advisory-category\">\n                <span>\u95EE\u9898\u5206\u7C7B\uFF1A</span>\n                <ul class=\"advisory-category-list\">\n                    <li class=\"advisory-category-item active\"><a href=\"javascript:;\">\u5168\u90E8</a></li>\n                    <% if(data && data.questionNameArray) {\n                        for (var i = 0; i < data.questionNameArray.length; i++) { %>\n                            <li class=\"advisory-category-item\" data-type=\"<%= data.questionNameArray[i].id %>\"><a href=\"javascript:;\"><%= data.questionNameArray[i].question_name %></a></li>\n                    <% } } %>\n                </ul>\n            </div>\n\n            <div class=\"advisory-search\">\n                <input class=\"advisory-search-input\" type=\"text\" name=\"advisory-search-input\" placeholder=\"\u8BF7\u8F93\u5165\u95EE\u9898\">\n                <a class=\"advisory-search-btn\" href=\"javascript:;\">\u641C\u7D22</a>\n                <a class=\"advisory-search-detail\" href=\"http://www.tuniu.com/u/ask\" rel=\"nofollow\" target=\"_blank\">\u67E5\u770B\u6211\u7684\u63D0\u95EE <i>&gt;</i></a>\n            </div>\n        </div>\n\n        <div class=\"advisory-content J_qaContent\">\n        </div>\n\n        <div class=\"pagination\">\n        </div>\n    </div>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var advisoryContentTemplate = exports.advisoryContentTemplate = "\n<% if (data.routeAsk && data.routeAsk.length) { %>\n<ul>\n    <% for (var j = 0; j < data.routeAsk.length; j++) {\n        var qaItem = data.routeAsk[j]; %>\n    <li>\n        <div class=\"advisory-content-item\">\n            <span class=\"advisory-content-title\"><i class=\"advisory-content-icon-ask\"></i>\u54A8\u8BE2\u95EE\u9898\uFF1A</span>\n            <p>\n                <%= qaItem.content %>\n            </p>\n            <span class=\"advisory-content-time\"><%= qaItem.adddate %></span>\n        </div>\n        <div class=\"advisory-content-item\">\n            <span class=\"advisory-content-title\"><i class=\"advisory-content-icon-answer\"></i>\u9014\u725B\u5BA2\u670D\uFF1A</span>\n            <p>\n                <%= qaItem.answer %>\n            </p>\n            <span class=\"advisory-content-time\"><%= qaItem.last_reply_time %></span>\n        </div>\n    </li>\n    <% } %>\n</ul>\n<% } else { %>\n<div class=\"J_noQuestion\">\u6682\u65E0\u8BE5\u4EA7\u54C1\u95EE\u7B54\uFF01\u5BF9\u672C\u4EA7\u54C1\u6709\u4EFB\u4F55\u7591\u95EE\uFF0C\u8BF7\u5728\u6B64\u8FDB\u884C\u63D0\u95EE\u3002\u6211\u4EEC\u7684\u5DE5\u4F5C\u4EBA\u5458\u5C06\u5C3D\u5FEB\u56DE\u590D\u60A8\u3002</div>\n<% } %>\n";
    }
    , function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.relativeModule = undefined;
        var _store = __webpack_require__(315);
        var _templateNative = __webpack_require__(324);
        var _taber = __webpack_require__(6);
        var _gallery = __webpack_require__(360);
        var _lazyloader = __webpack_require__(4);
        var lazyloader = _interopRequireWildcard(_lazyloader);
        var _relative = __webpack_require__(376);
        var _product = __webpack_require__(377);
        var _config = __webpack_require__(325);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null ) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                            newObj[key] = obj[key];
                    }
                }
                newObj.$default$ = obj;
                return newObj;
            }
        }
        var $win = $(window);
        var $relative = void 0
            , $relativeProductList = void 0
            , $recommend = void 0
            , $recommendProductList = void 0;
        var store = void 0
            , journeyDetail = void 0
            , isMulti = void 0
            , multiTab = void 0
            , cityPoiId = void 0
            , cityPoiName = void 0
            , productData = void 0
            , recommendIndex = 0
            , relativeIndex = 0
            , MAIN_HOST = _config.config.host;
        var productRender = _templateNative.template.compile(_product.detailProductTemplate);
        function lazyloadHandler() {
            lazyloader.off($relative);
            lazyloader.off($recommend);
            fetch();
        }
        function fetch() {
            $.ajax({
                dataType: 'json',
                url: _config.config.url.related(),
                data: {
                    productId: store.getState('productId'),
                    bookCode: store.getState('bookCityCode'),
                    poiId: cityPoiId
                },
                success: function success(res) {
                    if (res && res.success) {
                        productData = res.data.recommend || [];
                        render(res.data);
                    } else {
                        remove();
                    }
                },
                error: function error(res, status) {
                    remove();
                }
            });
        }
        function refreshRecommendProducts() {
            if (productData.length <= 8) {
                renderProduct($recommendProductList, productData);
            } else {
                renderProduct($recommendProductList, getNextGroupProduct(recommendIndex, 8));
                recommendIndex = (recommendIndex + 8) % productData.length;
            }
        }
        function refreshRelativeProducts() {
            if (productData.length <= 4) {
                renderProduct($relativeProductList, productData);
            } else {
                renderProduct($relativeProductList, getNextGroupProduct(relativeIndex, 4));
                relativeIndex = (relativeIndex + 4) % productData.length;
            }
        }
        function getNextGroupProduct(start, amount) {
            var length = productData.length;
            var res = [];
            for (var index = start; index < start + amount; index++) {
                res.push(productData[index % length]);
            }
            return res;
        }
        function renderProduct($container, data) {
            $container.html(productRender({
                data: data
            }));
        }
        function remove() {
            $relative.remove();
            $recommend.remove();
            $win.trigger('resize');
        }
        function render(data) {
            var templateRender = _templateNative.template.compile(_relative.detailRelativeTemplate);
            $relative.append(templateRender({
                status: store.getState('status'),
                data: data,
                destination: cityPoiName,
                poiId: cityPoiId,
                year: new Date().getFullYear(),
                host: MAIN_HOST
            })).removeClass('section-loading');
            $recommendProductList = $recommend.find('.J_productList');
            $relativeProductList = $relative.find('.J_productList');
            if (data.recommend && data.recommend.length) {
                refreshRecommendProducts();
                refreshRelativeProducts();
                $recommend.removeClass('section-loading');
            } else {
                $recommend.remove();
            }
            $win.trigger('resize');
            bind();
        }
        function bind() {
            (0,
                _taber.createTaber)($('#J_localTab'), {
                ctx: $('.J_localContent'),
                onactive: function onactive(activeTab) {
                    var $nameEl = $('.J_proTypeName')
                        , $linkEl = $('.J_proTypeLink');
                    $nameEl.text(activeTab.$tab.text());
                    $linkEl.attr('href', $linkEl.attr('href').replace(/\/\w+-0-0\/$/, '/' + activeTab.$tab.data('type') + '-0-0/'));
                }
            });
            $relative.find('.J_relativeGallery').each(function() {
                (0,
                    _gallery.createGallery)($(this));
            });
            if (productData.length > 4) {
                $relative.find('.J_productMore').show().click(refreshRelativeProducts);
            }
            if (productData.length > 8) {
                $recommend.find('.J_productMore').show().click(refreshRecommendProducts);
            }
        }
        var relativeModule = {
            init: function init() {
                store = (0,
                    _store.getStore)();
                $relative = $('#J_detailRelative');
                $recommend = $('#J_detailRecommend');
                isMulti = store.getState('isSupportMultipleJourney');
                journeyDetail = store.getState('journey');
                multiTab = store.getState('multiTab');
                if (isMulti == 1) {
                    var defaultJourney = journeyDetail[multiTab[0].journeyId];
                    cityPoiId = defaultJourney.poiId;
                    cityPoiName = defaultJourney.destination;
                } else {
                    cityPoiId = journeyDetail.poiId;
                    cityPoiName = journeyDetail.destination;
                }
                lazyloader.on($relative, lazyloadHandler);
                lazyloader.on($recommend, lazyloadHandler);
            }
        };
        exports.relativeModule = relativeModule;
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailRelativeTemplate = exports.detailRelativeTemplate = "\n<div class=\"section-box relative\">\n    <div class=\"section-box-head\">\n        <h2>\u76F8\u5173\u4EA7\u54C1</h2>\n    </div>\n    <div class=\"section-box-body\">\n        <% if (status == 0 && data.recommend && data.recommend.length) { %>\n            <div class=\"section-box-title\">\n                <h3>\u4E3A\u60A8\u63A8\u8350\u5176\u4ED6\u76F8\u4F3C\u7EBF\u8DEF</h3>\n                <a class=\"J_productMore relative-pro-refresh\" href=\"javascript:;\">\u6362\u4E00\u6362 <i></i></a>\n            </div>\n            <div class=\"J_productList section-box-content relative-pro-list\"></div>\n        <% } %>\n        <% if (data.favorite && data.favorite.length) { %>\n            <div class=\"section-box-title\">\n                <h3>\u731C\u4F60\u559C\u6B22</h3>\n            </div>\n            <div class=\"section-box-content\">\n                <div class=\"J_relativeGallery detail-relative-wrap\">\n                    <div class=\"detail-relative-btn detail-relative-prev\" data-role=\"prev\"><i class=\"icon\"></i></div>\n                    <div class=\"detail-relative-btn detail-relative-next\" data-role=\"next\"><i class=\"icon\"></i></div>\n                    <div class=\"detail-relative-box\">\n                        <ul class=\"relative-pro-list gallery-list\" data-role=\"list\">\n                            <% for (var j = 0, jLen = data.favorite.length; j < jLen; j++) {\n                                var favoriteItem = data.favorite[j]; %>\n                            <li data-role=\"item\">\n                                <a href=\"/tour/<%= favoriteItem.productId %>\" target=\"_blank\">\n                                    <div class=\"relative-pro-pic\">\n                                        <img src=\"<%= favoriteItem.picUrl %>\" alt=\"<%= favoriteItem.productName %>\" />\n                                        <div class=\"relative-pro-des\">\n                                            <p>\n                                                <%= favoriteItem.productName %>\n                                            </p>\n                                        </div>\n                                    </div>\n                                    <div class=\"relative-pro-info\">\n                                        <div class=\"relative-pro-price\">\n                                            <span>\uFFE5<b><%= favoriteItem.price %></b></span>\u8D77\n                                        </div>\n                                        <div class=\"relative-pro-satis\">\n                                            \u6EE1\u610F\u5EA6\uFF1A<%= favoriteItem.satisfaction %>%\n                                        </div>\n                                    </div>\n                                </a>\n                            </li>\n                            <% } %>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        <% } %>\n        <% if ((data.localPlay && data.localPlay.length) || (data.ticket && data.ticket.length)) { %>\n            <div class=\"section-box-title\">\n                <h3><%= destination %>&nbsp;<b class=\"J_proTypeName\">\u5F53\u5730\u73A9\u4E50</b></h3>\n                <div class=\"relative-play\" id=\"J_localTab\">\n                    <% if (data.localPlay && data.localPlay.length) { %>\n                    <span class=\"active\" data-rel=\".J_localPlay\" data-type=\"local\">\u5F53\u5730\u73A9\u4E50</span>\n                    <% } %>\n                    <% if (data.ticket && data.ticket.length) { %>\n                    <span data-rel=\".J_ticket\" data-type=\"ticket\">\u95E8\u7968</span>\n                    <% } %>\n                </div>\n                <a class=\"relative-pro-more J_proTypeLink\" href=\"<%= host %>/g<%= poiId %>/local-0-0/\" target=\"_blank\">\u67E5\u770B\u66F4\u591A <i>&gt;</i></a>\n            </div>\n            <div class=\"section-box-content J_localContent\">\n                <% if (data.localPlay && data.localPlay.length) { %>\n                <ul class=\"relative-pro-list J_localPlay\">\n                    <% for (var k = 0, kLen = data.localPlay.length; k < kLen; k++) {\n                        var localItem = data.localPlay[k]; %>\n                    <li>\n                        <a href=\"<%= host %>/tours/<%= localItem.productId %>\" target=\"_blank\">\n                            <div class=\"relative-pro-pic\">\n                                <img src=\"<%= localItem.picUrl %>\" alt=\"<%= localItem.productName %>\" />\n                                <% if(localItem.productName) { %>\n                                <div class=\"relative-pro-des\">\n                                    <p>\n                                        <%= localItem.productName %>\n                                    </p>\n                                </div>\n                                <% } %>\n                            </div>\n                            <div class=\"relative-pro-info\">\n                                <div class=\"relative-pro-price\">\n                                    <span>\uFFE5<b><%= +localItem.price %></b></span>\u8D77\n                                </div>\n                                <div class=\"relative-pro-satis\">\n                                    \u6EE1\u610F\u5EA6\uFF1A<%= (+localItem.satisfaction) * 100 %>%\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <% } %>\n                </ul>\n                <% } %>\n                <% if (data.ticket && data.ticket.length) { %>\n                <ul class=\"relative-pro-list J_ticket\">\n                    <% for (var l = 0, lLen = data.ticket.length; l < lLen; l++) {\n                        var ticketItem = data.ticket[l]; %>\n                    <li>\n                        <a href=\"http://menpiao.tuniu.com/t_<%= ticketItem.productId %>\" target=\"_blank\">\n                            <div class=\"relative-pro-pic\">\n                                <img src=\"<%= ticketItem.picUrl %>\" alt=\"<%= ticketItem.productName %>\" />\n                                <% if(ticketItem.productName) { %>\n                                <div class=\"relative-pro-des\">\n                                    <p>\n                                        <%= ticketItem.productName %>\n                                    </p>\n                                </div>\n                                <% } %>\n                            </div>\n                            <div class=\"relative-pro-info\">\n                                <div class=\"relative-pro-price\">\n                                    <span>\uFFE5<b><%= +ticketItem.price %></b></span>\u8D77\n                                </div>\n                                <div class=\"relative-pro-satis\">\n                                    \u6EE1\u610F\u5EA6\uFF1A<%= (+ticketItem.satisfaction) * 100 %>%\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <% } %>\n                </ul>\n                <% } %>\n            </div>\n        <% } %>\n        <% if (data.strategy) { %>\n            <div class=\"section-box-title\">\n                <h3><%= destination %>&nbsp;\u653B\u7565&amp;\u6E38\u8BB0</h3>\n            </div>\n            <div class=\"section-box-content\">\n                <div class=\"relative-strategy\">\n                    <div class=\"relative-strategy-pic\" >\n                        <a href=\"<%= host %><%= data.strategy.url %>\" target=\"_blank\">\n                            <img src=\"<%= data.strategy.img %>\" alt=\"\u65C5\u6E38\u653B\u7565\" />\n                            <div class=\"relative-strategy-pic-name\"><p><%= destination %></p><span></span></div>\n                        </a>\n                    </div>\n                    <div class=\"relative-strategy-info\">\n                        <span class=\"relative-strategy-info-title\"><%= year %>\u65C5\u6E38\u653B\u7565</span>\n                        <span class=\"relative-strategy-info-des\" title=\"<%= destination %>\"><%= destination %></span>\n                        <a class=\"relative-strategy-info-download\" href=\"<%= host %><%= data.strategy.url %>\" target=\"_blank\">\u67E5\u770B\u8BE6\u60C5</a>\n                    </div>\n                </div>\n                <% if (data.strategy.travelNote && data.strategy.travelNote.length) { %>\n                <ul class=\"relative-travels-list\">\n                    <% for (var m = 0, mLen = data.strategy.travelNote.length; m < mLen; m++) {\n                        var noteItem = data.strategy.travelNote[m]; %>\n                    <li>\n                        <a href=\"<%= host %>/trips/<%= noteItem.tripsId %>\" target=\"_blank\">\n                            <div class=\"relative-travels-pic\">\n                                <img src=\"<%= noteItem.tripsImageUrl %>\" alt=\"<%= noteItem.tripsTitle %>\" />\n                                <div class=\"relative-travels-des\">\n                                    <p>\n                                        <%= noteItem.tripsTitle %>\n                                    </p>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <% } %>\n                </ul>\n                <% } %>\n            </div>\n        <% } %>\n        <% if (data.history && data.history.length) { %>\n            <div class=\"section-box-title\">\n                <h3>\u6211\u7684\u6D4F\u89C8\u8BB0\u5F55</h3>\n            </div>\n            <div class=\"section-box-content\">\n                <div class=\"J_relativeGallery detail-relative-wrap\">\n                    <div class=\"detail-relative-btn detail-relative-prev\" data-role=\"prev\"><i class=\"icon\"></i></div>\n                    <div class=\"detail-relative-btn detail-relative-next\" data-role=\"next\"><i class=\"icon\"></i></div>\n                    <div class=\"detail-relative-box\">\n                        <ul class=\"relative-pro-list gallery-list\" data-role=\"list\">\n                        <% for (var n = 0, nLen = data.history.length; n < nLen; n++) {\n                            var historyItem = data.history[n]; %>\n                            <li data-role=\"item\">\n                                <a href=\"/tour/<%= historyItem.productId %>\" target=\"_blank\">\n                                    <div class=\"relative-pro-pic\">\n                                        <img src=\"<%= historyItem.picUrl %>\" alt=\"<%= historyItem.productName %>\" />\n                                        <div class=\"relative-pro-des\">\n                                            <p>\n                                                <%= historyItem.productName %>\n                                            </p>\n                                        </div>\n                                    </div>\n                                    <div class=\"relative-pro-info\">\n                                        <div class=\"relative-pro-price\">\n                                            <span>\uFFE5<b><%= historyItem.price %></b></span>\u8D77\n                                        </div>\n                                        <div class=\"relative-pro-satis\">\n                                            \u6EE1\u610F\u5EA6\uFF1A<%= historyItem.satisfaction %>%\n                                        </div>\n                                    </div>\n                                </a>\n                            </li>\n                            <% } %>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        <% } %>\n    </div>\n</div>\n";
    }
    , function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var detailProductTemplate = exports.detailProductTemplate = "\n<ul class=\"product-list\">\n    <% for (var index = 0; index < data.length; index++) { %>\n        <% var product = data[index] %>\n        <li class=\"product-item\">\n            <a class=\"product-link\" href=\"/tour/<%= product.productId %>\" target=\"_blank\">\n                <div class=\"product-picture\">\n                    <img src=\"<%= product.picUrl %>\" alt=\"<%= product.productName %>\" />\n                    <div class=\"product-name\">\n                        <p><%= product.productName %></p>\n                    </div>\n                </div>\n                <div class=\"product-info\">\n                    <div class=\"product-price\">\n                        <span>\uFFE5<b><%= product.price %></b></span> \u8D77\n                    </div>\n                    <div class=\"product-satisfication\">\n                        \u6EE1\u610F\u5EA6\uFF1A<%= product.satisfaction || 100 %>%\n                    </div>\n                </div>\n            </a>\n        </li>\n    <% }%>\n</ul>\n";
    }
]);
