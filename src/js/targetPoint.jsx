import {File} from './fileopen';
import {Canvas} from './canvas'

export class Target {
	
	constructor() {
		const imageBox = $("#imgBox");
		this.img = document.getElementById("test");
		this.targetBox = $("#target");

		this.startPoint = []
		this.endPoint = []
		
		this.imageBoxPosition = {
			x: imageBox.offset().left,
			y: imageBox.offset().top
		};
		this.imageSize = {
			width: this.img.width,
			height: this.img.height
		}
		
		this.setEvent();
	} 
	
	setEvent() {
		this.img.ondragstart = (e) => {
			const pagePoint = { x: e.pageX, y: e.pageY }
			this.startPoint = this.targetPoint(pagePoint, this.imageBoxPosition)
		};
		this.img.ondragend = (e) => {
			const pagePoint = { x: e.pageX, y: e.pageY }
			this.endPoint = this.targetPoint(pagePoint, this.imageBoxPosition)

			this.createSelectBox({});
		};	
	}

	// マウスボタンを押したときに押した最初の部分の座標を取得
	targetPoint (pagePoint, imageBoxPosition) { 
		return {
			x: pagePoint.x - imageBoxPosition.x,
			y: pagePoint.y - imageBoxPosition.y
		};
	}
	
	// targetBoxの大きさを変更しborderの大きさも変更する
	createSelectBox ({
		target = this.targetBox,
		startPoint = this.startPoint,
		endPoint = this.endPoint,
		imageSize = this.imageSize})
	{
		const targetWidth = endPoint.x - startPoint.x;
		const targetHeight = endPoint.y - startPoint.y;
		
		const rectPoint = this.getRectPoint({startPoint, endPoint});
		const rectSize = this.getRectSize({startPoint, endPoint});
		target.css({
			width: rectSize.width,
			height: rectSize.height,
			borderTopWidth: rectPoint.y,
			borderBottomWidth: imageSize.height - (rectPoint.y + rectSize.height),
			borderLeftWidth: rectPoint.x,
			borderRightWidth: imageSize.width - (rectPoint.x + rectSize.width)
		});
	}
	
	getRectPoint({
		startPoint = this.startPoint,
		endPoint = this.endPoint
	}) {
		
		if(isNaN(startPoint.x)) return {x: 0, y:0}
		
		const point = {
			x: Math.min(startPoint.x, endPoint.x),
			y: Math.min(startPoint.y, endPoint.y)
		}
		return point;
	}
	
	getRectSize({
		startPoint = this.startPoint,
		endPoint = this.endPoint
	}) {
		
		if(isNaN(startPoint.x)) return {width: this.imageSize.width, height: this.imageSize.height}
		
		return {
			width: Math.abs(endPoint.x - startPoint.x),
			height: Math.abs(endPoint.y - startPoint.y)
		}
	}
	// デフォルトのドラッグ操作を無効化
	dragDefault (e) {
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			return false;
		}
	}
	
//	
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