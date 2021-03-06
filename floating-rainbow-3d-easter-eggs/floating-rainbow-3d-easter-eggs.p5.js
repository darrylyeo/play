colorMode(HSB, 255, 255, 255, 255);
colorMode(RGB, 255, 255, 255, 255);

// Project featured on darryl-yeo.com: http://darryl-yeo.com/3d-easter-eggs

/**
 * Wave your mouse over the screen for a parallax effect.
 * Click on the screen to cycle through 5 different designs (and a mixed basket).
	1. Plain
	2. Striped
	3. Dotted
	4. Glowing
	5. Ghost

 * Whoa, the supporting program almost surpassed the actual contest entry!
 * How To Make A 3D Easter Egg: www.khanacademy.org/cs/-/4665465301106688
 */

//Programming Experience: 24 months+  |  Undesrstanding of Intro to JS Course: 100%

//This controls how many parts to render per egg. The higher the number, the smoother (and laggier) the gradients will render.
var gradientStops = 15;

//Still too laggy? Set to false.
var animate = true;




//The current design out of the designs listed above. 0 corresponds to a "mixed basket" of all the designs.
var design = 0;

//The total number of egg designs I made.
var totalDesigns = 5;

//The number of rows of eggs.
var rows = 8;

//The range of horizontal "spaces" to draw columns of eggs.
// var minColumn = -2;
// var maxColumn = 1;
var minColumn, maxColumn;

//The position of the egg that will randomly become rainbowified. (An easter egg in a batch of easter eggs?)
var rainbowEggPosition;
var randomizeRainbowEggPosition = function(){
	rainbowEggPosition = {
		x: round(random(minColumn, maxColumn + 1)),
		y: round(random(0, rows + 1))
	};
};
randomizeRainbowEggPosition();

//Function adapted from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
var hsvToRgb = function(h, s, v){
	h /= 255; s /= 255; v /= 255;
	
	var r, g, b;

	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch(i % 6){
		case 0: r = v; g = t; b = p; break;
		case 1: r = q; g = v; b = p; break;
		case 2: r = p; g = v; b = t; break;
		case 3: r = p; g = q; b = v; break;
		case 4: r = t; g = p; b = v; break;
		case 5: r = v; g = p; b = q; break;
	}

	return color(r * 255, g * 255, b * 255);
};

/**
 * Changes an HSB color's saturation.
 */
var colorWithSaturation = function(c, s){
	colorMode(HSB);
	c = color(hue(c), s, brightness(c), alpha(c));
	//colorMode(RGB);
	return c;
};

/**
 * Changes an HSB color's alpha.
 */
var colorWithAlpha = function(c, a){
	colorMode(RGB);
	c = color(red(c), green(c), blue(c), a);
	colorMode(RGB);
	return c;
};

/**
 * Draws a half egg shape at a specified horizontal scale. Multiple half-egg shapes transformed at different horizontal scales will make up the entire egg.
 * 
 * Visualize the makeup of the 3D egg at
 * www.khanacademy.org/cs/how-to-make-a-3d-easter-egg/4665465301106688
 */
var halfEgg = function(horizontalScale){
	push();
		scale(horizontalScale, 1);
		beginShape();
		vertex(0, -340);
		bezierVertex(60, -340, 120, -220, 125, -170);
		bezierVertex(150, -40, 60, 0, 0, 0);
		endShape();
	pop();
};

/**
 * Draws an egg.
 * 
 * @param design            Specifies the egg's design.
 * @param colormode         Used for the color stops of the gradient [see note below].
 * @param color1, color2    Start and end colors that male up the egg's gradient.
 * @param yOffset           Controls how far off the "ground" the egg floats.
 * 
 * Note: I use HSB colors that are converted to RGB colors to make the gradients, because the colors look much smoother this way. Also, not using HSB prevents lerpColor() from cycling across the hue wheel - a gradient from red to orange will transition directly from red to orange, while a gradient from magenta to red will cycle BACKWARDS across all the other colors instead of looping around. (The only cases where this is a wanted behavior are the magic rainbow eggs - we want them to cycle through all the hues, so we specify HSB as the color mode instead of RGB.)
 */
var egg = function(design, colormode, color1, color2, yOffset){
	colorMode(colormode);
	//Shadow below the egg. 
	fill(0, 0, 0, 40);
	noStroke();
	ellipse(0, 30, 180 + yOffset, 50 + yOffset);
	
	translate(0, yOffset);
	
	//Glowing Egg Design
	if(design === 4){
		colorMode(RGB);
		//Stroke each half egg shape with a thick transparent white stroke.
		stroke(255, 255, 255, 80);
		strokeWeight(10);
		colorMode(colormode);
	}
	//Ghost Egg Design (Spooooky!)
	if(design === 5){
		//Make the gradient end color the same as the start color, then lower the opacity.
		color1 = colorWithAlpha(color1, 50);
		color2 = colorWithAlpha(color1, 50);
	}
	
	//The following loop draws an egg "slice" for the number of specified gradientStops.
	//Each iteration draws a set of two half-eggs, from the outside in. The inner loop controls the two draws.
	//"i" represents how far an egg "slice" is along the color gradient.
	//"i * 180" represents the angle that the current egg "slice" is pointing (if we looked at the egg from the top down). We take the negative cosine of this angle to determine the horizontal scale of the egg "slice".
	//"n" is incremented once for each iteration, used for eggs with Striped Designs.
	var n = 0;
	for(var g = 0; g <= 0.5; g += 1/gradientStops){
		var i = g;
		for(var loop2 = 1; loop2 <= 2; loop2++){
			var gradientStop = lerpColor(color1, color2, i);
			fill(gradientStop);
			//Eggs with Striped Designs will have a lighter fill for every other egg "slice" (even values of "n").
			if(design === 2 && n % 2 === 0){
				fill(colorWithSaturation(gradientStop, 160));
			}
			halfEgg(-cos(i * 180));
			
			//After drawing the first egg slice in the first iteration of this inner loop, draw the opposite egg slice on the other half of the egg.
			i = 1 - g;
		}
		n++;
	}
	//Patch up the vertical gap in the egg's center with a rect.
	noStroke();
	rect(-2, -340, 4, 340);
	
	//Spotted Egg Design
	if(design === 3){
		//Draw 2 bands of spots, using cosine waves to control the rotation and size of each spot.
		
		fill(0, 0, 0, 50);
		for(var i = 0; i <= 1; i += 1/13){
			push();
				rotate(cos(i * 180) * 10);
				ellipse(cos(i * 180) * 105, -155 + sin(i * 180) * 90, sin(i * 180) * 20, 40);
			pop();
		}
		
		for(var i = 0; i <= 1; i += 1/10){
			push();
				translate(cos(i * 180) * 85, -275 + sin(i * 180) * 50);
				rotate(-cos(i * 180) * 25);
				ellipse(0, 0, sin(i * 180) * 20, sin(i * 180) * 10 + 20);
			pop();
		}
	}
	
	//Add a shine to make the eggs look appealing!
	colorMode(RGB);
	fill(255, 255, 255, 100);
	noStroke();
	push();
		translate(50, -270);
		rotate(-30);
		ellipse(0, 0, 20, 45);
	pop();
};

// Text generated with DY's MyFont Exporter using the Fun Font
// www.khanacademy.org/cs/dy-myfont-exporter/4649443388555264
var title = function(x, y){
	noFill();
	push();
		translate(x, y);
		
		//HAPPY
		push();
			translate(6, -45);
			line(-141, -25, -141, 25);
			line(-141, 0, -113, 0);
			line(-113, -25, -113, 25);
			arc(-61, 0, 27, 52, -180, 0);
			line(-75, 0, -75, 25);
			line(-75, 4, -47, 4);
			line(-47, 0, -47, 25);
			line(-13, -25, -13, 25);
			arc(-13, -9, 50, 32, -90, 90);
			line(41, -25, 41, 25);
			arc(41, -9, 50, 32, -90, 90);
			line(95, -25, 111, 4);
			line(127, -25, 111, 4);
			line(111, 25, 111, 4);
		pop();
		
		//EASTER
		push();
			translate(0, 25);
			line(-137.75, -18.75, -137.75, 18.75);
			line(-137.75, -18.75, -119.75, -18.75);
			line(-137.75, 0, -122.75, 0);
			line(-137.75, 18.75, -119.75, 18.75);
			arc(-79.25, 0, 21, 39, -180, 0);
			line(-89.75, 0, -89.75, 18.75);
			line(-89.75, 3, -68.75, 3);
			line(-68.75, 0, -68.75, 18.75);
			arc(-29, -9.75, 19.5, 19.5, 90, 340);
			arc(-29, 9.75, 21, 19.5, -90, 160);
			line(10.75, -18.75, 31.75, -18.75);
			line(21.25, -18.75, 21.25, 18.75);
			line(61.75, -18.75, 61.75, 18.75);
			line(61.75, -18.75, 79.75, -18.75);
			line(61.75, 0, 76.75, 0);
			line(61.75, 18.75, 79.75, 18.75);
			line(109.75, -18.75, 109.75, 18.75);
			arc(109.75, -6.75, 37.5, 24, -90, 90);
			line(118.75, 5.25, 127.75, 19.5);
		pop();
	pop();
};

//The net mouse movement since the mouse has entered the screen.
var mouseDistance = {
	x: 0,
	y: 0
};

//Keep track of the net mouse movement.
p5.mouseMoved(function(){
	mouseDistance.x += mouseX - pmouseX;
	mouseDistance.y += mouseY - pmouseY;
});

//When the screen is clicked, change the design of the eggs and warp the magic rainbow elsewhere.
p5.mouseClicked(function(){
	design = (design + 1) % (totalDesigns + 1);
	randomizeRainbowEggPosition();
	
	//(For thumbnail saving purposes - I would like the rainbow egg to be the bottom-rightmost egg.)
	if(mouseButton === RIGHT){
		rainbowEggPosition.x = 1;
		rainbowEggPosition.y = rows;
	}
});

cursor(HAND);

p5.draw(function() {
	minColumn = -ceil(width / height);
	maxColumn = floor(width / height);

	//frameCount=211
	push();
	
	//Gradient Background
	var y = 0;
	colorMode(HSB);
	strokeWeight(10);
	while(y <= height){
		stroke(((y + frameCount) / 5) % 255, 235, 245);
		line(0, y, width, y);
		y += 10;
	}
	
	//Center the drawing at the middle of the canvas.
	translate(width / 2, height / 2);
	scale(min(width, height) / 400)
	
	//"HAPPY EASTER" (possition changes according to mouse movement)
	colorMode(RGB);
	stroke(0, 0, 0, 60);
	strokeWeight(2);
	title(mouseDistance.x / 20, -90 + mouseDistance.y / 40);
	
	//Draw all the eggs!
	for(var y = 0; y <= rows; y += 1){
		for(var x = minColumn; x <= maxColumn; x++){
			push();
			
			//Use x and y to determine this egg's position. Within each column of eggs, the x position zigzags back and forth (from the modulus of y). The y position is determined with a quadratic function ("pow(y, 2)") so that the rows of eggs are closer at the back and farther apart in the front. The eggs' positions also change according to the net mouse movement (see mouseMoved() above)!
			translate(
				(x + (y % 2.5 * 1/2.5) + mouseDistance.x/10000*(y + 1)) * (180 - y * 3),
				pow(y, 2) * (2.4 + mouseDistance.y / 800) + 15
			);
			//Scale based on y position.
			scale(0.1 + pow(y, 2) * 0.004);
			
			//Get a hue value based on position. As frameCount increases, the color wheel is  advanced, and the eggs change color. Note how color1 is always 25 hues ahead of color2.
			var eggHue = x * 110 + y * 240 + 255 + frameCount * 2;
			colorMode(RGB);
			var color1 = hsvToRgb((25 + eggHue) % 255, 235, 250);
			var color2 = hsvToRgb(eggHue % 255, 255, 255);
			
			//Is this egg destined to be magically rainbowified?
			var isRainbow = x === 1 && y === 8;
			if(isRainbow){
				//Cycle across all the colors of the color wheel in our gradient
				colorMode(HSB);
				//Red
				color1 = color(0, 255, 255);
				//Purple
				color2 = color(204, 255, 255);
			}
			
			//The design to use if showing a "mixed basket", based on the egg's position.
			var mixedDesign = (x + y + 94) % totalDesigns + 1;
			
			//Draw the egg.
			egg(
				//If the current design is 0 (mixed basket) use the mixedDesign.
				design === 0 ? mixedDesign : design, //design
				
				//Render an HSB based gradient if the egg is rainbowified, otherwise use a normal RGB gradient
				isRainbow ? HSB : RGB, // colormode
				
				//Pass the gradient start and end colors
				color1, color2, // color1, color2
				
				//Make the eggs float up and down at different rates depending on position
				sin(frameCount * (x * 0.9 - (y + 1) * 1.1)) * 20 // yOffset
			);
			pop();
		}
	}
	
	//If the mouse leaves the screen, gradually snap the net mouse distance back to 0.
	if(!mouseIsIn){
		mouseDistance.x *= 0.8;
		mouseDistance.y *= 0.8;
	}
	
	//If the drawing is laggy and the user set this variable at the top, stop drawing frames.
	if(!animate){
		noLoop();
	}
	
	pop();
});