window.mouseIn = window.mouseOut = () => {};
window.mouseIsIn = p5.mouseIsIn = false
{
	const inCanvas = function(x, y){
		return x >= 0 && x < width && y >= 0 && y < height
	}

	p5.setup(() => p5.mouseIsIn = inCanvas(mouseX, mouseY))

	p5.mouseMoved(() => {
		mouseIsIn = p5.mouseIsIn = inCanvas(mouseX, mouseY)
		if(mouseIsIn && !inCanvas(pmouseX, pmouseY)){
			mouseIn()
		}else if(!mouseIsIn && inCanvas(pmouseX, pmouseY)){
			mouseOut()
		}
	})
	
	document.addEventListener('mousein', () => mouseIn())
	document.addEventListener('mouseout', () => mouseOut())
}