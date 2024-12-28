/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/raf";
exports.ids = ["vendor-chunks/raf"];
exports.modules = {

/***/ "(ssr)/./node_modules/raf/index.js":
/*!***********************************!*\
  !*** ./node_modules/raf/index.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var now = __webpack_require__(/*! performance-now */ \"(ssr)/./node_modules/performance-now/lib/performance-now.js\"), root = \"undefined\" === \"undefined\" ? global : window, vendors = [\n    \"moz\",\n    \"webkit\"\n], suffix = \"AnimationFrame\", raf = root[\"request\" + suffix], caf = root[\"cancel\" + suffix] || root[\"cancelRequest\" + suffix];\nfor(var i = 0; !raf && i < vendors.length; i++){\n    raf = root[vendors[i] + \"Request\" + suffix];\n    caf = root[vendors[i] + \"Cancel\" + suffix] || root[vendors[i] + \"CancelRequest\" + suffix];\n}\n// Some versions of FF have rAF but not cAF\nif (!raf || !caf) {\n    var last = 0, id = 0, queue = [], frameDuration = 1000 / 60;\n    raf = function(callback) {\n        if (queue.length === 0) {\n            var _now = now(), next = Math.max(0, frameDuration - (_now - last));\n            last = next + _now;\n            setTimeout(function() {\n                var cp = queue.slice(0);\n                // Clear queue here to prevent\n                // callbacks from appending listeners\n                // to the current frame's queue\n                queue.length = 0;\n                for(var i = 0; i < cp.length; i++){\n                    if (!cp[i].cancelled) {\n                        try {\n                            cp[i].callback(last);\n                        } catch (e) {\n                            setTimeout(function() {\n                                throw e;\n                            }, 0);\n                        }\n                    }\n                }\n            }, Math.round(next));\n        }\n        queue.push({\n            handle: ++id,\n            callback: callback,\n            cancelled: false\n        });\n        return id;\n    };\n    caf = function(handle) {\n        for(var i = 0; i < queue.length; i++){\n            if (queue[i].handle === handle) {\n                queue[i].cancelled = true;\n            }\n        }\n    };\n}\nmodule.exports = function(fn) {\n    // Wrap in a new function to prevent\n    // `cancel` potentially being assigned\n    // to the native rAF function\n    return raf.call(root, fn);\n};\nmodule.exports.cancel = function() {\n    caf.apply(root, arguments);\n};\nmodule.exports.polyfill = function(object) {\n    if (!object) {\n        object = root;\n    }\n    object.requestAnimationFrame = raf;\n    object.cancelAnimationFrame = caf;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmFmL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBLElBQUlBLE1BQU1DLG1CQUFPQSxDQUFDLHVGQUNkQyxPQUFPLGdCQUFrQixjQUFjQyxTQUFTQyxRQUNoREMsVUFBVTtJQUFDO0lBQU87Q0FBUyxFQUMzQkMsU0FBUyxrQkFDVEMsTUFBTUwsSUFBSSxDQUFDLFlBQVlJLE9BQU8sRUFDOUJFLE1BQU1OLElBQUksQ0FBQyxXQUFXSSxPQUFPLElBQUlKLElBQUksQ0FBQyxrQkFBa0JJLE9BQU87QUFFbkUsSUFBSSxJQUFJRyxJQUFJLEdBQUcsQ0FBQ0YsT0FBT0UsSUFBSUosUUFBUUssTUFBTSxFQUFFRCxJQUFLO0lBQzlDRixNQUFNTCxJQUFJLENBQUNHLE9BQU8sQ0FBQ0ksRUFBRSxHQUFHLFlBQVlILE9BQU87SUFDM0NFLE1BQU1OLElBQUksQ0FBQ0csT0FBTyxDQUFDSSxFQUFFLEdBQUcsV0FBV0gsT0FBTyxJQUNuQ0osSUFBSSxDQUFDRyxPQUFPLENBQUNJLEVBQUUsR0FBRyxrQkFBa0JILE9BQU87QUFDcEQ7QUFFQSwyQ0FBMkM7QUFDM0MsSUFBRyxDQUFDQyxPQUFPLENBQUNDLEtBQUs7SUFDZixJQUFJRyxPQUFPLEdBQ1BDLEtBQUssR0FDTEMsUUFBUSxFQUFFLEVBQ1ZDLGdCQUFnQixPQUFPO0lBRTNCUCxNQUFNLFNBQVNRLFFBQVE7UUFDckIsSUFBR0YsTUFBTUgsTUFBTSxLQUFLLEdBQUc7WUFDckIsSUFBSU0sT0FBT2hCLE9BQ1BpQixPQUFPQyxLQUFLQyxHQUFHLENBQUMsR0FBR0wsZ0JBQWlCRSxDQUFBQSxPQUFPTCxJQUFHO1lBQ2xEQSxPQUFPTSxPQUFPRDtZQUNkSSxXQUFXO2dCQUNULElBQUlDLEtBQUtSLE1BQU1TLEtBQUssQ0FBQztnQkFDckIsOEJBQThCO2dCQUM5QixxQ0FBcUM7Z0JBQ3JDLCtCQUErQjtnQkFDL0JULE1BQU1ILE1BQU0sR0FBRztnQkFDZixJQUFJLElBQUlELElBQUksR0FBR0EsSUFBSVksR0FBR1gsTUFBTSxFQUFFRCxJQUFLO29CQUNqQyxJQUFHLENBQUNZLEVBQUUsQ0FBQ1osRUFBRSxDQUFDYyxTQUFTLEVBQUU7d0JBQ25CLElBQUc7NEJBQ0RGLEVBQUUsQ0FBQ1osRUFBRSxDQUFDTSxRQUFRLENBQUNKO3dCQUNqQixFQUFFLE9BQU1hLEdBQUc7NEJBQ1RKLFdBQVc7Z0NBQWEsTUFBTUk7NEJBQUUsR0FBRzt3QkFDckM7b0JBQ0Y7Z0JBQ0Y7WUFDRixHQUFHTixLQUFLTyxLQUFLLENBQUNSO1FBQ2hCO1FBQ0FKLE1BQU1hLElBQUksQ0FBQztZQUNUQyxRQUFRLEVBQUVmO1lBQ1ZHLFVBQVVBO1lBQ1ZRLFdBQVc7UUFDYjtRQUNBLE9BQU9YO0lBQ1Q7SUFFQUosTUFBTSxTQUFTbUIsTUFBTTtRQUNuQixJQUFJLElBQUlsQixJQUFJLEdBQUdBLElBQUlJLE1BQU1ILE1BQU0sRUFBRUQsSUFBSztZQUNwQyxJQUFHSSxLQUFLLENBQUNKLEVBQUUsQ0FBQ2tCLE1BQU0sS0FBS0EsUUFBUTtnQkFDN0JkLEtBQUssQ0FBQ0osRUFBRSxDQUFDYyxTQUFTLEdBQUc7WUFDdkI7UUFDRjtJQUNGO0FBQ0Y7QUFFQUssT0FBT0MsT0FBTyxHQUFHLFNBQVNDLEVBQUU7SUFDMUIsb0NBQW9DO0lBQ3BDLHNDQUFzQztJQUN0Qyw2QkFBNkI7SUFDN0IsT0FBT3ZCLElBQUl3QixJQUFJLENBQUM3QixNQUFNNEI7QUFDeEI7QUFDQUYscUJBQXFCLEdBQUc7SUFDdEJwQixJQUFJeUIsS0FBSyxDQUFDL0IsTUFBTWdDO0FBQ2xCO0FBQ0FOLHVCQUF1QixHQUFHLFNBQVNRLE1BQU07SUFDdkMsSUFBSSxDQUFDQSxRQUFRO1FBQ1hBLFNBQVNsQztJQUNYO0lBQ0FrQyxPQUFPQyxxQkFBcUIsR0FBRzlCO0lBQy9CNkIsT0FBT0Usb0JBQW9CLEdBQUc5QjtBQUNoQyIsInNvdXJjZXMiOlsid2VicGFjazovL211c2ljb3RlcmFwaWEtYXBwLy4vbm9kZV9tb2R1bGVzL3JhZi9pbmRleC5qcz84MTJmIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBub3cgPSByZXF1aXJlKCdwZXJmb3JtYW5jZS1ub3cnKVxuICAsIHJvb3QgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvd1xuICAsIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnXVxuICAsIHN1ZmZpeCA9ICdBbmltYXRpb25GcmFtZSdcbiAgLCByYWYgPSByb290WydyZXF1ZXN0JyArIHN1ZmZpeF1cbiAgLCBjYWYgPSByb290WydjYW5jZWwnICsgc3VmZml4XSB8fCByb290WydjYW5jZWxSZXF1ZXN0JyArIHN1ZmZpeF1cblxuZm9yKHZhciBpID0gMDsgIXJhZiAmJiBpIDwgdmVuZG9ycy5sZW5ndGg7IGkrKykge1xuICByYWYgPSByb290W3ZlbmRvcnNbaV0gKyAnUmVxdWVzdCcgKyBzdWZmaXhdXG4gIGNhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdDYW5jZWwnICsgc3VmZml4XVxuICAgICAgfHwgcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxufVxuXG4vLyBTb21lIHZlcnNpb25zIG9mIEZGIGhhdmUgckFGIGJ1dCBub3QgY0FGXG5pZighcmFmIHx8ICFjYWYpIHtcbiAgdmFyIGxhc3QgPSAwXG4gICAgLCBpZCA9IDBcbiAgICAsIHF1ZXVlID0gW11cbiAgICAsIGZyYW1lRHVyYXRpb24gPSAxMDAwIC8gNjBcblxuICByYWYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGlmKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFyIF9ub3cgPSBub3coKVxuICAgICAgICAsIG5leHQgPSBNYXRoLm1heCgwLCBmcmFtZUR1cmF0aW9uIC0gKF9ub3cgLSBsYXN0KSlcbiAgICAgIGxhc3QgPSBuZXh0ICsgX25vd1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNwID0gcXVldWUuc2xpY2UoMClcbiAgICAgICAgLy8gQ2xlYXIgcXVldWUgaGVyZSB0byBwcmV2ZW50XG4gICAgICAgIC8vIGNhbGxiYWNrcyBmcm9tIGFwcGVuZGluZyBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdG8gdGhlIGN1cnJlbnQgZnJhbWUncyBxdWV1ZVxuICAgICAgICBxdWV1ZS5sZW5ndGggPSAwXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmKCFjcFtpXS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgY3BbaV0uY2FsbGJhY2sobGFzdClcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0aHJvdyBlIH0sIDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBNYXRoLnJvdW5kKG5leHQpKVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKHtcbiAgICAgIGhhbmRsZTogKytpZCxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIGNhbmNlbGxlZDogZmFsc2VcbiAgICB9KVxuICAgIHJldHVybiBpZFxuICB9XG5cbiAgY2FmID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihxdWV1ZVtpXS5oYW5kbGUgPT09IGhhbmRsZSkge1xuICAgICAgICBxdWV1ZVtpXS5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4pIHtcbiAgLy8gV3JhcCBpbiBhIG5ldyBmdW5jdGlvbiB0byBwcmV2ZW50XG4gIC8vIGBjYW5jZWxgIHBvdGVudGlhbGx5IGJlaW5nIGFzc2lnbmVkXG4gIC8vIHRvIHRoZSBuYXRpdmUgckFGIGZ1bmN0aW9uXG4gIHJldHVybiByYWYuY2FsbChyb290LCBmbilcbn1cbm1vZHVsZS5leHBvcnRzLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICBjYWYuYXBwbHkocm9vdCwgYXJndW1lbnRzKVxufVxubW9kdWxlLmV4cG9ydHMucG9seWZpbGwgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKCFvYmplY3QpIHtcbiAgICBvYmplY3QgPSByb290O1xuICB9XG4gIG9iamVjdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSByYWZcbiAgb2JqZWN0LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2FmXG59XG4iXSwibmFtZXMiOlsibm93IiwicmVxdWlyZSIsInJvb3QiLCJnbG9iYWwiLCJ3aW5kb3ciLCJ2ZW5kb3JzIiwic3VmZml4IiwicmFmIiwiY2FmIiwiaSIsImxlbmd0aCIsImxhc3QiLCJpZCIsInF1ZXVlIiwiZnJhbWVEdXJhdGlvbiIsImNhbGxiYWNrIiwiX25vdyIsIm5leHQiLCJNYXRoIiwibWF4Iiwic2V0VGltZW91dCIsImNwIiwic2xpY2UiLCJjYW5jZWxsZWQiLCJlIiwicm91bmQiLCJwdXNoIiwiaGFuZGxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImZuIiwiY2FsbCIsImNhbmNlbCIsImFwcGx5IiwiYXJndW1lbnRzIiwicG9seWZpbGwiLCJvYmplY3QiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/raf/index.js\n");

/***/ })

};
;