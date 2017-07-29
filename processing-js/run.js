// Usage (e.g. /busy-buzzy-bee containing busy-buzzy-bee.js):
// <script src="../processing-js/run.js"></script>
// <script src="../processing-js/run.js" data-program="busy-buzzy-bee.js"></script>

{

const include = url => {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src = url
		script.async = false
		script.onload = resolve
		script.onerror = reject
		document.body.appendChild(script)
	})
}

const currentScript = document.currentScript

// KA Port
var Program = {}
var KAInfiniteLoopSetTimeout = () => {}
var debug = console.log
var keyIsPressed = false
var mouseIsPressed = false
var angleMode = 'degrees'

document.addEventListener('DOMContentLoaded', () => {
	document.body.style.margin = 0

	var canvas = document.createElement('canvas')
	document.body.appendChild(canvas)

	include('../processing-js/processing.min.js').then(() => {
		var processing = new Processing(canvas, processing => {
			processing.setup = () => {
				{
					const resize = () => {
						processing.size(window.innerWidth, window.innerHeight)
						processing.draw && processing.draw()
					}
					resize()
					window.addEventListener('resize', resize)
					
					window.addEventListener('mousedown', () => processing.mouseIsPressed = true)
					window.addEventListener('mouseup', () => processing.mouseIsPressed = false)
					window.addEventListener('keydown', () => processing.keyIsPressed = true)
					window.addEventListener('keyup', () => processing.keyIsPressed = false)
				}
				{
					const _rotate = processing.rotate
					const angle = x => angleMode === 'degrees' ? x * Math.PI/180 : x

					Object.assign(processing, {
						rotate: x => _rotate(angle(x)),
						sin: x => Math.sin(angle(x)),
						cos: x => Math.cos(angle(x)),
						tan: x => Math.tan(angle(x)),

						//getImage: url => loadImage('images/' + url),
						//getImage: url => loadImage(`${location.href}/../../assets/khan-images/${url}.png`),
						getImage: url => new PImage(),

						keyPressed: () => keyIsPressed = processing.keyIsPressed = true,
						keyReleased: () => keyIsPressed = processing.keyIsPressed = false,
					})
				}

				for(const p in processing){
					if(p.startsWith('__') || ['parseInt'].includes(p)) continue

					const v = processing[p]
					if(typeof v !== 'function'){
						Object.defineProperty(window, p, {
							get(){
								return processing[p]
							},
							set(v){
								processing[p] = v
							}
						})
					}else{
						this[p] = v
					}
				}
				
				/*with(processing){
					// program
				}*/

				processing.draw = () => {}

				include(
					currentScript.dataset.program ||
					location.href.split('/').filter(part => part && !part.includes('.')).pop() + '.js'
				)
			}
		})
	})
})

}