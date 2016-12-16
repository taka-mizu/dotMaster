/*!
 * jquery.dotMaster (2016-12-16)
 * Placing a random one image, so as not to overlap as much as possible.
 * 
 * (c) 2016  (@)
 *
 * @version 0.1.1
 * @license Released under the MIT license
 * @author 
 */
(function (global, factory) {
	if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'), global);
	}	else if (typeof define === 'function' && define.amd) {
			define(['jquery'], function() {factory($, global)});
	}  else {
		factory($, global);
	}
} (typeof window !== "undefined" ? window : this, function ($, global) {
;(function() {
var targetPoint = {}, canvas = {}, fileopen = {}, jquerydotMasterjs;
targetPoint = function (exports, _fileopen, _canvas) {
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.Target = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var Target = exports.Target = function () {
    function Target() {
      _classCallCheck(this, Target);
      var imageBox = $('#imgBox');
      this.img = document.getElementById('test');
      this.targetBox = $('#target');
      this.startPoint = [];
      this.endPoint = [];
      this.imageBoxPosition = {
        x: imageBox.offset().left,
        y: imageBox.offset().top
      };
      this.imageSize = {
        width: this.img.width,
        height: this.img.height
      };
      this.setEvent();
    }
    _createClass(Target, [
      {
        key: 'setEvent',
        value: function setEvent() {
          var _this = this;
          this.img.ondragstart = function (e) {
            var pagePoint = {
              x: e.pageX,
              y: e.pageY
            };
            _this.startPoint = _this.targetPoint(pagePoint, _this.imageBoxPosition);
          };
          this.img.ondragend = function (e) {
            var pagePoint = {
              x: e.pageX,
              y: e.pageY
            };
            _this.endPoint = _this.targetPoint(pagePoint, _this.imageBoxPosition);
            _this.createSelectBox({});
          };
        }  // マウスボタンを押したときに押した最初の部分の座標を取得
      },
      {
        key: 'targetPoint',
        value: function targetPoint(pagePoint, imageBoxPosition) {
          return {
            x: pagePoint.x - imageBoxPosition.x,
            y: pagePoint.y - imageBoxPosition.y
          };
        }  // targetBoxの大きさを変更しborderの大きさも変更する
      },
      {
        key: 'createSelectBox',
        value: function createSelectBox(_ref) {
          var _ref$target = _ref.target, target = _ref$target === undefined ? this.targetBox : _ref$target, _ref$startPoint = _ref.startPoint, startPoint = _ref$startPoint === undefined ? this.startPoint : _ref$startPoint, _ref$endPoint = _ref.endPoint, endPoint = _ref$endPoint === undefined ? this.endPoint : _ref$endPoint, _ref$imageSize = _ref.imageSize, imageSize = _ref$imageSize === undefined ? this.imageSize : _ref$imageSize;
          var targetWidth = endPoint.x - startPoint.x;
          var targetHeight = endPoint.y - startPoint.y;
          var rectPoint = this.getRectPoint({
            startPoint: startPoint,
            endPoint: endPoint
          });
          var rectSize = this.getRectSize({
            startPoint: startPoint,
            endPoint: endPoint
          });
          target.css({
            width: rectSize.width,
            height: rectSize.height,
            borderTopWidth: rectPoint.y,
            borderBottomWidth: imageSize.height - (rectPoint.y + rectSize.height),
            borderLeftWidth: rectPoint.x,
            borderRightWidth: imageSize.width - (rectPoint.x + rectSize.width)
          });
        }
      },
      {
        key: 'getRectPoint',
        value: function getRectPoint(_ref2) {
          var _ref2$startPoint = _ref2.startPoint, startPoint = _ref2$startPoint === undefined ? this.startPoint : _ref2$startPoint, _ref2$endPoint = _ref2.endPoint, endPoint = _ref2$endPoint === undefined ? this.endPoint : _ref2$endPoint;
          if (isNaN(startPoint.x))
            return {
              x: 0,
              y: 0
            };
          var point = {
            x: Math.min(startPoint.x, endPoint.x),
            y: Math.min(startPoint.y, endPoint.y)
          };
          return point;
        }
      },
      {
        key: 'getRectSize',
        value: function getRectSize(_ref3) {
          var _ref3$startPoint = _ref3.startPoint, startPoint = _ref3$startPoint === undefined ? this.startPoint : _ref3$startPoint, _ref3$endPoint = _ref3.endPoint, endPoint = _ref3$endPoint === undefined ? this.endPoint : _ref3$endPoint;
          if (isNaN(startPoint.x))
            return {
              width: this.imageSize.width,
              height: this.imageSize.height
            };
          return {
            width: Math.abs(endPoint.x - startPoint.x),
            height: Math.abs(endPoint.y - startPoint.y)
          };
        }  // デフォルトのドラッグ操作を無効化
      },
      {
        key: 'dragDefault',
        value: function dragDefault(e) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            return false;
          }
        }  //	
           //	if(img.addEventListener) {
           //		img.addEventListener("dragstart", dragDefault);
           //	} else if(img.attachEvent) {
           //		img.attachEvent("ondragstart", dragDefault);
           //	} else {
           //		img.ondragstart = dragDefault;
           //	}
           //--右から左へドラッグした場合の解決法(未完成)亀井先生に聞く-----------
           //--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓---------------------
           //	targetSize (target,startPoint,endPoint,imageSize) {
           //		if (endPoint.x > startPoint.x  && endPoint.y > startPoint.y) {
           //			const targetWidth = endPoint.x - startPoint.x;
           //			const targetHeight = endPoint.y - startPoint.y;
           //			target.css({
           //				width: targetWidth,
           //				height: targetHeight,
           //				borderTopWidth: startPoint.y,
           //				borderBottomWidth: imageSize.height - (startPoint.y + targetHeight),
           //				borderLeftWidth: startPoint.x,
           //				borderRightWidth: imageSize.width - (startPoint.x + targetWidth)
           //			});
           //		} else if (endPoint.x < startPoint.x && endPoint.y < startPoint.y)) {
           //			const targetWidth = startPoint.x - endPoint.x;
           //			const targetHeight = startPoint.y - endPoint.y;
           //			target.css({
           //				width: targetWidth,
           //				height: targetHeight,
           //				borderTopWidth: imageSize.height - (startPoint.y + targetHeight),
           //				borderBottomWidth: imageSize.height - startPoint.y,
           //				borderLeftWidth: imageSize.width - (startPoint.x + targetWidth),
           //				borderRightWidth: imageSize.width - startPoint.x
           //			});
           //		} else {
           //			alert('もう一度ドラッグしなおしてください');
           //		}
           //	}
      }
    ]);
    return Target;
  }();
  return exports;
}(targetPoint, fileopen, canvas);
canvas = function (exports, _fileopen, _targetPoint) {
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.Canvas = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var Canvas = exports.Canvas = function () {
    function Canvas() {
      _classCallCheck(this, Canvas);
      this.canvas = $('#imageProjector').get(0);
      this.context = this.canvas.getContext('2d');
    }
    _createClass(Canvas, [
      {
        key: 'drowImage',
        value: function drowImage(_ref) {
          var image = _ref.image, rectPoint = _ref.rectPoint, rectSize = _ref.rectSize;
          var size = {
            width: image.width,
            height: image.height
          };
          console.log(rectSize, rectPoint);
          this.canvas.width = rectSize.width || size.width;
          this.canvas.height = rectSize.height || size.height;
          this.context.drawImage(image, rectPoint.x, rectPoint.y, rectSize.width, rectSize.height, 0, 0, rectSize.width, rectSize.height);
        }
      },
      {
        key: 'gray',
        value: function gray() {
          var canvasSize = {
            width: this.canvas.width,
            height: this.canvas.height
          };
          var src = this.context.getImageData(0, 0, canvasSize.width, canvasSize.height);
          for (var i = 0; i < canvasSize.height; i++) {
            for (var j = 0; j < canvasSize.width; j++) {
              var idx = (j + i * canvasSize.width) * 4;
              var r = src.data[idx];
              //赤
              var g = src.data[idx + 1];
              //緑
              var b = src.data[idx + 2];
              //青
              var a = src.data[idx + 3];
              //透明度
              // 使える色を制限するのもあり
              var gray = (r + g + b) / 3;
              src.data[idx] = gray;
              src.data[idx + 1] = gray;
              src.data[idx + 2] = gray;  //				src[idx+3] = 100; //透明度は同じ値
            }
          }
          this.context.putImageData(src, 0, 0, 0, 0, canvasSize.width, canvasSize.height);
        }
      },
      {
        key: 'createDot',
        value: function createDot(width, height) {
          //いったん割り切れるところだけにしてみる
          var stageWidth = this.canvas.width - this.canvas.width % width;
          var stageHeight = this.canvas.height - this.canvas.height % height;
          var widthRepeatCount = stageWidth / width;
          var heightRepeatCount = stageHeight / height;
          var canvasRepeatCount = widthRepeatCount * heightRepeatCount;
          var h = 0;
          for (var i = 0; i < canvasRepeatCount; i++) {
            var fixWidth = i * width % stageWidth;
            //繰り返して横まできたときに次の段に行くために+1する
            h += i !== 0 && fixWidth === 0 ? 1 : 0;
            var fixHeight = h * height;
            var rangeColors = this.getRangeColors(fixWidth, fixHeight, width, height);
            var dotColor = this.getRangeColor(rangeColors);
            this.putColor(fixWidth, fixHeight, width, height, dotColor);
          }
        }  //範囲のカラーの配列を撮ってきて{r,g,b,a}の形に成形する 
      },
      {
        key: 'getRangeColors',
        value: function getRangeColors(sx, sy, sw, sh) {
          var src = this.context.getImageData(sx, sy, sw, sh);
          var colors = [];
          for (var i = 0; i < src.data.length; i = i + 4) {
            var r = src.data[i];
            var g = src.data[i + 1];
            var b = src.data[i + 2];
            var a = src.data[i + 3];
            colors.push({
              r: r,
              g: g,
              b: b,
              a: a
            });
          }
          return colors;
        }  //引数に渡された配列の中身を全て平均の色にする 
      },
      {
        key: 'getRangeColor',
        value: function getRangeColor(colors) {
          var newColorsRed = 0, newColorsGreen = 0, newColorsBlue = 0;
          for (var i = 0; i < colors.length; i++) {
            newColorsRed += colors[i].r;
            newColorsGreen += colors[i].g;
            newColorsBlue += colors[i].b;
          }
          var mapColor = {
            r: Math.floor(newColorsRed / colors.length),
            g: Math.floor(newColorsGreen / colors.length),
            b: Math.floor(newColorsBlue / colors.length)
          };
          return mapColor;
        }  //引数に渡された場所を渡された色で塗りつぶす
      },
      {
        key: 'putColor',
        value: function putColor(sx, sy, sw, sh, dotColor) {
          var src = this.context.getImageData(0, 0, sw, sh);
          for (var i = 0; i < src.data.length; i = i + 4) {
            src.data[i] = dotColor.r;
            src.data[i + 1] = dotColor.g;
            src.data[i + 2] = dotColor.b;
            src.data[i + 3] = 255;
          }
          this.context.putImageData(src, sx, sy);
        }  // ランダムな感じにする場合の関数
      },
      {
        key: 'getRangeRandomColor',
        value: function getRangeRandomColor(colors) {
          var newColorsRed = 0, newColorsGreen = 0, newColorsBlue = 0;
          for (var i = 0; i < colors.length; i++) {
            newColorsRed += colors[i].r;
            newColorsGreen += colors[i].g;
            newColorsBlue += colors[i].b;
          }
          var mapColor = {
            r: Math.floor(Math.random() * (newColorsRed / colors.length)),
            g: Math.floor(Math.random() * (newColorsGreen / colors.length)),
            b: Math.floor(Math.random() * (newColorsBlue / colors.length))
          };
          return mapColor;
        }  //	plusColor (rgb) {
           //		let test1 = _.map(colors, (color) => {
           //			return color.rgb
           //		})
           //		let test2 =	test1.reduce((i, j)=> {
           //			return i + j
           //		});
           //		return Math.floor(test2 / 10);
           //	colors.forEach((color) => {
           //	})
           //
           //	_.each(colors, (color) => {
           //	})
           //
           //	console.log(
           //		_.filter(colors, {r: 149})
           //	);
           //	}
      }
    ]);
    return Canvas;
  }();
  return exports;
}(canvas, fileopen, targetPoint);
fileopen = function (exports, _canvas, _targetPoint) {
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.File = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var File = exports.File = function () {
    function File() {
      var _this = this;
      _classCallCheck(this, File);
      var img = $('#test');
      var $select = $('#selectfile');
      var $button = $('#dotButton');
      var canvas = new _canvas.Canvas();
      var target = new _targetPoint.Target();
      //		target.getRectPoint({})
      //		target.getRectSize({})
      $button.on('click', function () {
        canvas.drowImage({
          image: img[0],
          rectPoint: target.getRectPoint({}),
          rectSize: target.getRectSize({})
        });
        canvas.createDot(10, 10);
      });
      canvas.drowImage({
        image: img[0],
        rectPoint: target.getRectPoint({}),
        rectSize: target.getRectSize({})
      });
      canvas.createDot(10, 10);
      $select.change(function () {
        _this.encodeImagePath($select.prop('files')[0], function (image) {
          //ファイルを読み込み終わってイメージのパスを引数として実行される（complate）
          img.attr('src', image);
          canvas.drowImage({
            image: img[0],
            rectPoint: target.getRectPoint({}),
            rectSize: target.getRectSize({})
          });
          canvas.createDot(30, 30);
        });
      });
    }
    _createClass(File, [{
        key: 'encodeImagePath',
        value: function encodeImagePath(file, complate) {
          var fileRdr = new FileReader();
          if (!file.type.match('image.*')) {
            complate('');
            return;
          }
          fileRdr.onload = function () {
            complate(fileRdr.result);
          };
          fileRdr.readAsDataURL(file);
        }
      }]);
    return File;
  }();
  return exports;
}(fileopen, canvas, targetPoint);
jquerydotMasterjs = function (_fileopen) {
  //import {Canvas} from './canvas';
  new _fileopen.File();  //new Canvas();
}(fileopen);
}());
}));