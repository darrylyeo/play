var Program = {}

p5.setup(() => {
	fill(255)
	stroke(0)
	strokeWeight(1)
	angleMode(DEGREES)
	textFont('Avenir, Roboto, Helvetica, sans-serif')
	colorMode(HSB, 255, 255, 255, 255)
	colorMode(RGB, 255, 255, 255, 255)
})

var getImage = url => loadImage(`${location.href}/../../assets/khan-images/${url}.png`)

var getSound = () => {}
var playSound = () => {}