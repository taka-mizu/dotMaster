import {File} from './fileopen';
import {Target} from './targetPoint'

export class Canvas {
	constructor() {
		this.canvas = $('#imageProjector').get(0);
		this.context = this.canvas.getContext('2d');
	}
	
	drowImage({image, rectPoint, rectSize})  {
		let size  = {
			width: image.width,
			height: image.height
		}
		console.log(rectSize,rectPoint)
		this.canvas.width = rectSize.width || size.width;
		this.canvas.height = rectSize.height || size.height;
		this.context.drawImage(
														image,
														rectPoint.x,
														rectPoint.y,
														rectSize.width,
														rectSize.height,
														0,
														0,
														rectSize.width,
														rectSize.height
		);
	}
	
	gray() {
		const canvasSize = {
			width: this.canvas.width,
			height: this.canvas.height
		}
		let src = this.context.getImageData(0,0,canvasSize.width,canvasSize.height);
		for (let i = 0; i < canvasSize.height; i++) {
			for (let j = 0; j < canvasSize.width; j++) {
				let idx = (j + i * canvasSize.width) * 4;
				let r = src.data[idx]; //赤
				let g = src.data[idx+1]; //緑
				let b = src.data[idx+2]; //青
				let a = src.data[idx+3]; //透明度
				
				// 使える色を制限するのもあり
				let gray = (r+g+b) / 3;
				src.data[idx] = gray;
				src.data[idx+1] = gray;
				src.data[idx+2] = gray;
//				src[idx+3] = 100; //透明度は同じ値
			}
		}
		
		this.context.putImageData(src,0,0,0,0,canvasSize.width,canvasSize.height)
	}
	
	createDot(width, height){
		
		//いったん割り切れるところだけにしてみる
		const stageWidth = this.canvas.width - this.canvas.width % width
		const stageHeight = this.canvas.height - this.canvas.height % height

		const widthRepeatCount = stageWidth / width;
		const heightRepeatCount = stageHeight / height;
		const canvasRepeatCount = widthRepeatCount * heightRepeatCount;
		
		let h = 0;
		for (var i = 0; i < canvasRepeatCount; i++) {
			const fixWidth = i * width % stageWidth;
			
			//繰り返して横まできたときに次の段に行くために+1する
			h += i !== 0 && fixWidth === 0 ? 1 : 0;
			const fixHeight = h * height;
			
			const rangeColors = this.getRangeColors(
				fixWidth,
				fixHeight,
				width,
				height);
			const dotColor = this.getRangeColor(rangeColors);
			
			this.putColor(
				fixWidth,
				fixHeight,
				width,
				height,
				dotColor
			);

		}
		
	} 
	
	//範囲のカラーの配列を撮ってきて{r,g,b,a}の形に成形する 
	getRangeColors(sx,sy,sw,sh) {
		let src = this.context.getImageData(sx,sy,sw,sh);
		let colors = [];
		for(let i = 0; i < src.data.length; i = i + 4) {
			let r = src.data[i];
			let g = src.data[i+1];
			let b = src.data[i+2];
			let a = src.data[i+3];
			
			colors.push({r,g,b,a});
		}
		return colors;
	}
	//引数に渡された配列の中身を全て平均の色にする 
	getRangeColor(colors) {
		let newColorsRed = 0, newColorsGreen = 0, newColorsBlue = 0;
		for (let i = 0; i < colors.length; i++) {
			newColorsRed+= colors[i].r
			newColorsGreen+= colors[i].g
			newColorsBlue+= colors[i].b
		}
		const mapColor = {
			r: Math.floor(newColorsRed / colors.length),
			g: Math.floor(newColorsGreen / colors.length),
			b: Math.floor(newColorsBlue / colors.length),
		}
		return mapColor;
		
	}
	//引数に渡された場所を渡された色で塗りつぶす
	putColor (sx,sy,sw,sh,dotColor) {
		
		let src = this.context.getImageData(0,0,sw,sh);
		for(let i = 0; i < src.data.length; i = i + 4) {
			src.data[i] = dotColor.r;
			src.data[i+1] = dotColor.g;
			src.data[i+2] = dotColor.b;
			src.data[i+3] = 255;
		}
 
		this.context.putImageData(src,sx,sy)
	}
	
	
	// ランダムな感じにする場合の関数
	getRangeRandomColor(colors) {
		let newColorsRed = 0, newColorsGreen = 0, newColorsBlue = 0;
		for (let i = 0; i < colors.length; i++) {
			newColorsRed+= colors[i].r
			newColorsGreen+= colors[i].g
			newColorsBlue+= colors[i].b
		}
		const mapColor = {
			r: Math.floor(Math.random() * (newColorsRed / colors.length)),
			g: Math.floor(Math.random() * (newColorsGreen / colors.length)),
			b: Math.floor(Math.random() * (newColorsBlue / colors.length)),
		}
		return mapColor;

	}
	
//	plusColor (rgb) {
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