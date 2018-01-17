// Usage (e.g. /busy-buzzy-bee containing busy-buzzy-bee.p5.js):
// <script src="../p5/run.js"></script>
// <script src="../p5/run.js" data-program="busy-buzzy-bee.p5.js"></script>

{

const includes = [
	'../p5/p5.min.js',
	'../p5/p5.dom.js',
	//'../p5/p5.svg.js',
	'../p5/libraries/p5.functions.js',
	'../p5/libraries/resize.js',
	'../p5/libraries/processing-port.js',
	'../p5/libraries/ka-port.js'
]

const currentScript = document.currentScript

if(currentScript.dataset.include){
	for(const name of currentScript.dataset.include.split(' ')){
		includes.push(`../p5/libraries/${name}.js`)
	}
}

const include = url => new Promise((resolve, reject) => {
	const script = document.createElement('script')
	script.src = url
	script.async = false
	script.onload = resolve
	script.onerror = reject
	document.body.appendChild(script)
})

document.addEventListener('DOMContentLoaded', async () => {
	document.body.style.margin = 0

	await Promise.all(includes.map(include))

	p5.setup(() => {
		/*if(svgMode){
			createCanvas(400, 400, SVG);
		}*/

		if(currentScript.dataset.program){
			include(currentScript.dataset.program)
		}else{
			const href = location.href.replace('/index.html', '').replace(/\/$/, '')
			const scriptName = href.split('/').pop()
			include(`${href}/${scriptName}.p5.js`)
		}
	})
})

}