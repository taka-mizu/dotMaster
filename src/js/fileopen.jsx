import {Canvas} from './canvas'
import {Target} from './targetPoint'
//import {Button} from './button'

export class File {
	constructor() {
		const img = $("#test");
		const $select = $("#selectfile");
		const $button = $("#dotButton");
		
		const canvas = new Canvas();
		const target = new Target();
		
//		target.getRectPoint({})
//		target.getRectSize({})
		
		$button.on('click', function () {
			canvas.drowImage(
				{
					image: img[0],
					rectPoint: target.getRectPoint({}),
					rectSize: target.getRectSize({})
				})
			canvas.createDot(10, 10)
		});
		
		canvas.drowImage(
			{
				image: img[0],
				rectPoint: target.getRectPoint({}),
				rectSize: target.getRectSize({})
			})
		
		canvas.createDot(10, 10)

		$select.change(() => {
			this.encodeImagePath(
				$select.prop('files')[0],
				
				(image) => {//ファイルを読み込み終わってイメージのパスを引数として実行される（complate）
					img.attr('src', image)
					canvas.drowImage(
						{
							image: img[0],
							x: 0,
							y: 0
						}) 
					canvas.createDot(30, 30)
				}
			)
		});
	} 
	

	encodeImagePath(file, complate) { 
		const fileRdr = new FileReader()
		
		if (!file.type.match('image.*')){
			complate('')
			return;
		} 
			
		fileRdr.onload = () => {
			complate(fileRdr.result);
		}
		fileRdr.readAsDataURL(file);
	}
}