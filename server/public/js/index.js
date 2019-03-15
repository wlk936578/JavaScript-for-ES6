/******/
(function (modules) { // webpackBootstrap
	/******/ // The module cache
	/******/
	var installedModules = {};

	/******/ // The require function
	/******/
	function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/
		if (installedModules[moduleId])
			/******/
			return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/
		var module = installedModules[moduleId] = {
			/******/
			exports: {},
			/******/
			id: moduleId,
			/******/
			loaded: false
			/******/
		};

		/******/ // Execute the module function
		/******/
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/
		module.loaded = true;

		/******/ // Return the exports of the module
		/******/
		return module.exports;
		/******/
	}


	/******/ // expose the modules object (__webpack_modules__)
	/******/
	__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/
	__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/
	__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/
	return __webpack_require__(0);
	/******/
})
/************************************************************************/
/******/
([
	/* 0 */
	/***/
	(function (module, exports, __webpack_require__) {

		module.exports = __webpack_require__(1);


		/***/
	}),
	/* 1 */
	/***/
	(function (module, exports, __webpack_require__) {

		'use strict';

		__webpack_require__(2);

		/***/
	}),
	/* 2 */
	/***/
	(function (module, exports) {

		'use strict';

		var _slicedToArray = function () {
			function sliceIterator(arr, i) {
				var _arr = [];
				var _n = true;
				var _d = false;
				var _e = undefined;
				try {
					for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value);
						if (i && _arr.length === i) break;
					}
				} catch (err) {
					_d = true;
					_e = err;
				} finally {
					try {
						if (!_n && _i["return"]) _i["return"]();
					} finally {
						if (_d) throw _e;
					}
				}
				return _arr;
			}
			return function (arr, i) {
				if (Array.isArray(arr)) {
					return arr;
				} else if (Symbol.iterator in Object(arr)) {
					return sliceIterator(arr, i);
				} else {
					throw new TypeError("Invalid attempt to destructure non-iterable instance");
				}
			};
		}();

		function _toArray(arr) {
			return Array.isArray(arr) ? arr : Array.from(arr);
		}

		/**
		 * 解构赋值
		 *
		 * 分类： 数组结构赋值 字符串结构  数值解构赋值
		 *  		  对象解构赋值 布尔值解构赋值 函数参数解构赋值
		 */

		// 数组解构赋值

		{
			var a = void 0,
				b = void 0,
				rest = void 0;
			a = 1;
			b = 2;

			console.log(a, b);
		}

		{
			var _a = void 0,
				_b = void 0,
				_rest = void 0;
			_a = 1;
			_b = 2;
			_rest = [3, 4, 5, 6];


			console.log(_a, _b, _rest);
		}

		// 对象解构赋值

		{
			var _a2 = void 0,
				_b2 = void 0;
			var _a$b = {
				a: 1,
				b: 2
			};
			_a2 = _a$b.a;
			_b2 = _a$b.b;

			console.log(_a2, _b2);
		}

		{
			var _a3 = void 0,
				_b3 = void 0,
				c = void 0,
				_rest2 = void 0;
			// 如果结构赋值没有在解构上配对，则该值为undefined
			var _ref = [1, 2];
			_a3 = _ref[0];
			_b3 = _ref[1];
			var _ref$ = _ref[2];
			c = _ref$ === undefined ? 3 : _ref$;
			console.log(_a3, _b3, c);
		}

		// 变量交换(解构赋值法)不需中间值

		{
			var _a4 = 1,
				_b4 = 2;
			var _ref2 = [_b4, _a4];
			_a4 = _ref2[0];
			_b4 = _ref2[1];

			console.log(_a4, _b4);
		}

		// 函数解构赋值

		{
			var f = function f() {
				return [1, 2];
			};

			var _f = f(),
				_f2 = _slicedToArray(_f, 2),
				_a5 = _f2[0],
				_b5 = _f2[1];

			console.log(_a5, _b5);
		}

		// 数组结构赋值匹配模式，可选择性接受变量

		{
			var _f3 = function _f3() {
				return [1, 2, 3, 4, 5];
			};

			var _a6 = void 0,
				_b6 = void 0,
				_c = void 0;

			var _f4 = _f3();

			var _f5 = _slicedToArray(_f4, 4);

			_a6 = _f5[0];
			_b6 = _f5[3];

			console.log(_a6, _b6);
		}

		{
			var _f6 = function _f6() {
				return [1, 2, 3, 4, 5];
			};

			var _a7 = void 0,
				_b7 = void 0,
				_c2 = void 0;

			var _f7 = _f6();

			var _f8 = _toArray(_f7);

			_a7 = _f8[0];
			_b7 = _f8.slice(1);

			console.log(_a7, _b7);
		}

		// 对象解构赋值 根据key-value 来对应

		{
			var o = {
				p: 42,
				q: true
			};
			var p = o.p,
				q = o.q;

			console.log(p, q);
		}

		{
			var _a9 = {
					a: 3
				},
				_a9$a = _a9.a,
				_a8 = _a9$a === undefined ? 10 : _a9$a,
				_a9$b = _a9.b,
				_b8 = _a9$b === undefined ? 5 : _a9$b;

			console.log(_a8, _b8);
		}

		{
			var metaData = {
				title: 'abc',
				test: [{
					title: 'test',
					desc: 'description'
				}]
			};

			var esTitle = metaData.title,
				_metaData$test = _slicedToArray(metaData.test, 1),
				cnTitle = _metaData$test[0].title;

			console.log(esTitle, cnTitle);
		}

		/***/
	})
	/******/
]);