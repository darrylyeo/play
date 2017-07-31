/** Featured on darryl-yeo.com: darryl-yeo.com/infinity-runner-logo **/

//Infinity Runner Logo
//by DY

//Requested by Infinity Runner (www.khanacademy.org/profile)
//The blue lines are just a backdrop; they're not part of the logo. :)

//parameters: x pos, y pos, scale factor
var infinityRunnerLogo = function(x, y, s){
	pushMatrix()

	translate(x, y);
	scale(s);
	translate(-200, -200)
	
	//Oval
	fill(0);
	noStroke();
	ellipse(200, 200, 375, 250);
	
	stroke(255);
	strokeWeight(4);
	
	//I
	line(90, 190, 90, 210);
	
	//R
	noFill();
	strokeJoin(ROUND);
	beginShape();
	vertex(305, 210);
	vertex(305, 190);
	vertex(315, 190);
	//vertex(315, 192);
	vertex(315, 200);
	vertex(311, 200);
	vertex(315, 210);
	endShape();
	
	//Infinity! (∞)
	noStroke();
	colorMode(HSB);
	for(var a = 0; a < 360; a += 6.1){
		fill(((a + 160) * 200/360) % 255, 255, 255);
		ellipse(200 + cos(a * 15) * 160, 200 + sin(a * 2 * 15) * 40, sin(a / 15) * 20 + 3, sin(a / 15) * 20 + 3);
	}
	colorMode(RGB);
	
	popMatrix()
};

var DY = function(x, y, sz){
	translate(x, y);scale(sz, sz);noStroke();fill(255);rect(0, 0, 400, 400, 30);fill(0, 174, 255, 50);rect(0, 0, 400, 400);fill(212, 89, 208);triangle(249, 200, 200, 125, 200, 275);strokeWeight(6);fill(84, 194, 109);stroke(158, 38, 38);bezier(50, 50, 275, 60, 275, 340, 50, 350);line(50, 51, 50, 349);strokeWeight(5);stroke(81, 81, 173);line(150, 50, 248, 197);line(350, 50, 250, 200);line(150, 350, 250, 200);noStroke();fill(255, 208, 66, 150);triangle(170, 50, 330, 50, 250, 170);fill(255, 188, 117, 150);triangle(350, 70, 170, 350, 350, 350);scale(1/sz, 1/sz);translate(-x, -y);
};

draw = function() {
	background(101, 163, 171);
	strokeWeight(1);
	stroke(0, 200, 255);
	for(var i = 0; i <= height; i += 10){
		line(-100, -100, width, i);
	}
	for(var i = 0; i < width; i += 10){
		line(-100, -100, i, height);
	}
	
	infinityRunnerLogo(width / 2, height / 2, min(width, height) / 400);

	translate(width, height);
	scale(min(width, height) / 400);
	fill(255);
	textFont(loadFont("sans-serif", 0), 16);
	textAlign(CENTER, CENTER);
	text("by", -65, -30);
	DY(-50, -50, 1/10);
};

/*
	
	noFill();
	stroke(255, 255, 255);
	beginShape();
	vertex(200, 200);
	curveVertex(200, 200);
	curveVertex(300, 160);
	curveVertex(340, 200);
	curveVertex(300, 240);
	curveVertex(200, 200);
	curveVertex(200, 200);
	curveVertex(100, 160);
	curveVertex(60, 200);
	curveVertex(100, 240);
	curveVertex(200, 200);
	vertex(200, 200);
	endShape();
	
	fill(84, 84, 84);
	//ellipse(90, 200, 70, 50);*/