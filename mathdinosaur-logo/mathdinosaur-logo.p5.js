/**
 * Featured on darryl-yeo.com:
 * http://darryl-yeo.com/mathdinosaur-logo
*/

//MathDinosaur Logo
//by DY

//Requested by MathDinosaur (www.khanacademy.org/profile/TheMathDinosaur)

//Love the logos DY made for other users? Would you like your own? Request here!
//www.khanacademy.org/cs/request-a-logo-from-dy/6646257922867200

var jiggle = false;

frameRate(15);

//parameters: x pos, y pos, scale factor
var mathDinosaurLogo = function(x, y, sz){
	var jiggleFactor = jiggle ? pow(sin(frameCount*10), 2) * 5 : 1;
	
	pushMatrix();
	translate(x, y);
	scale(sz);
	
	var operator = function(id, s){
		if(id === "*"){
			rotate(45);
		}
		
		switch(id){
			case "+": case "*":
				//Vertical Line
				line(0, -s, 0, s);
				break;
			case "/":
				//Dots
				point(0, -s);
				point(0, s);
		}
		
		//Horizontal Line
		line(-s, 0, s, 0);
	};
	
	var parenthesis = function(id, s){
		if(id === "("){
			rotate(180);
		}
		
		noFill();
		arc(-2, 0, s, s * 3, -83, 83);
		//arc(-2, 0, s, s * 3, -70, 70);
	};
	
	var comparison = function(id, s){
		if(id === ">"){
			rotate(180);
		}
		
		noFill();
		line(-s, 0, s, s);
		line(-s, 0, s, -s);
	};
	
	var equals = function(s){
		line(-s, -s/2, s, -s/2);
		line(-s, s/2, s, s/2);
	};
	
	var root = function(s){
		noFill();
		beginShape();
		vertex(1.4 * s, -1.2 * s);
		vertex(-0.4 * s, -1.2 * s);
		vertex(-0.9 * s, 1.2 * s);
		vertex(-1.4 * s, 0.7 * s);
		endShape();
	};
	
	var sum = function(s){
		noFill();
		beginShape();
		vertex(0.9 * s, -1.2 * s);
		vertex(0.8 * s, -1.3 * s);
		vertex(-0.8 * s, -1.3 * s);
		vertex(-0.1 * s, 0);
		vertex(-0.8 * s, 1.3 * s);
		vertex(0.8 * s, 1.3 * s);
		vertex(0.9 * s, 1.2 * s);
		endShape();
	};
	
	var symbol = function(id, x, y, angle, s, amp){
		if(!angle){angle = 0;}
		if(!amp){amp = 3;}
		if(!s){s = 15;}
		
		x += random(-jiggleFactor, jiggleFactor);
		y += random(-jiggleFactor, jiggleFactor);
		
		pushMatrix();
		translate(x, y);
		rotate(angle);
		//rotate(sin(frameCount * 7) * amp);
		
		strokeJoin(ROUND);
		
		switch(id){
			case "+":
			case "-":
			case "*":
			case "/":
				operator(id, s);
				break;
			case "(":
			case ")":
				parenthesis(id, s);
				break;
			case "<":
			case ">":
				comparison(id, s);
				break;
			case "=":
				equals(s);
				break;
			case "root":
				root(s);
				break;
			case "sum":
				sum(s);
		}
		
		popMatrix();
	};
	
	var name = function(){
		pushMatrix();
		translate(random(-jiggleFactor, jiggleFactor), random(-jiggleFactor, jiggleFactor));
		
		noFill();
		strokeWeight(8);
		line(-149, -138.75, -149, -101.25);
		line(-149, -138.75, -138.5, -112.5);
		line(-128, -138.75, -138.5, -112.5);
		line(-128, -138.75, -128, -101.25);
		arc(-95.5, -120, 21, 39, -180, 0);
		line(-106, -120, -106, -101.25);
		line(-106, -117, -85, -117);
		line(-85, -119.5, -85, -100.75);
		
		//line(-63.5, -138.75, -42.5, -138.75);
		line(-71.75, -120, -34.25, -120);
		
		line(-53, -138.75, -53, -101.25);
		line(-20.5, -138.75, -20.5, -101.25);
		line(-20.5, -120, 0.5, -120);
		line(0.5, -138.75, 0.5, -101.25);
		strokeWeight(5);
		line(-150, -92.5, -150, -67.5);
		arc(-150, -79.5, 26, 26, -90, 90);
		line(-127.7, -92.5, -127.7, -67.5);
		line(-119.4, -92.5, -119.4, -67.5);
		line(-119.4, -92.5, -107.4, -67.5);
		line(-107.4, -92.5, -107.4, -67.5);
		ellipse(-91.1, -80, 16, 25);
		arc(-68.3, -86.5, 13, 13, 90, 340);
		arc(-68.3, -73.5, 14, 13, -90, 160);
		arc(-46, -80, 14, 26, -180, 0);
		line(-53.5, -80, -53.5, -67.5);
		line(-53.5, -78, -39.5, -78);
		line(-39.5, -80, -39.5, -67.5);
		arc(-24.2, -77, 14, 20, 0, 180);
		line(-31.2, -92.5, -31.2, -77);
		line(-17.2, -92.5, -17.2, -77);
		line(-8.9, -92.5, -8.9, -67.5);
		arc(-8.9, -84.5, 25, 16, -90, 90);
		line(-2.9, -76.5, 3.1, -67);
		popMatrix();
	};
	
	stroke(119, 166, 78, sin(min(frameCount * 5, 90)) * 255);
	name();
	
	stroke(100);
	strokeWeight(7);
	//symbol("+", -100, -100);
	//symbol("-", -100, 0, -10);
	//symbol("*", 100, -100, -10);
	//symbol("/", 100, 0, -10);
	
	//Tail
	for(var a = 0; a <= 5; a += 1){
		pushMatrix();
		translate(-140, 90);
		rotate(a * 20 + 16);
		strokeWeight(5 - a * 0.8);
		symbol(a % 2 === 1 ? "/" : "+", 60, 0, -90, 7 - a * 0.02);
		popMatrix();
	}
	
	//Spine
	for(var a = 1; a <= 7; a += 1){
		pushMatrix();
		translate(125, 143);
		rotate(a * 7 + 10);
		strokeWeight(5);
		symbol(a % 2 === 1 ? "/" : "+", -210, 0, -90, 7);
		popMatrix();
	}
	
	strokeWeight(7);
	//symbol("*", 120, -100);
	//symbol("*", 80, -100);
	
	//Eyes
	strokeWeight(6);
	symbol("/", 105, -100, 90);
	
	//Face
	symbol("(", 60, -100, 20, 25);
	symbol(")", 135, -100, 0, 20);
	symbol("(", 105, -140, 95, 15);
	//symbol("-", 100, -140, 0, 15);
	
	//Neck
	strokeWeight(4);
	//symbol("-", 110, -30, -60, 10);
	
	//Teeth
	strokeWeight(3);
	for(var x = 80; x <= 120; x += 10){
		symbol("<", x, -70 + sin((x - 10) * 5) * 3, -90, 3);
	}
	
	//Hands
	strokeWeight(5);
	symbol("=", 100, 10, 30);
	
	//Body
	strokeWeight(3);
	symbol(">", -70, 120, 0, 3);
	symbol("-", -40, 55, -40, 6);
	symbol(")", -54, 97, -60, 5);
	symbol("=", -8, 18, 20, 6);
	symbol("root", 30, -10, -10, 10);
	strokeWeight(4);
	symbol("+", -25, 35, 4, 10);
	symbol("*", 3, 0, 8, 7);
	strokeWeight(5);
	symbol("sum", 50, 30, 10, 12);
	symbol("*", -50, 120, 10, 15);
	symbol("<", -53, 78, -10, 7);
	symbol("-", -8, 53, 10, 7);
	symbol(")", 65, -17, 65, 20);
	strokeWeight(6);
	symbol("/", 15, 30, -20, 15);
	symbol(">", 60, -30, -10, 10);
	
	//Belly
	strokeWeight(5);
	symbol(")", 70, 60, 20, 20);
	
	//Legs
	symbol("(", -30, 80, 0, 10);
	symbol(")", 10, 80, 0, 10);
	symbol("(", 30, 80, 0, 10);
	strokeWeight(8);
	symbol("=", -10, 130, 90, 20);
	symbol("=", 50, 130, 90, 20);
	
	
	popMatrix();
};

var DY = function(x, y, sz){
	translate(x, y);scale(sz, sz);noStroke();fill(255);rect(0, 0, 400, 400, 30);fill(0, 174, 255, 50);rect(0, 0, 400, 400);fill(212, 89, 208);triangle(249, 200, 200, 125, 200, 275);strokeWeight(6);fill(84, 194, 109);stroke(158, 38, 38);bezier(50, 50, 275, 60, 275, 340, 50, 350);line(50, 51, 50, 349);strokeWeight(5);stroke(81, 81, 173);line(150, 50, 248, 197);line(350, 50, 250, 200);line(150, 350, 250, 200);noStroke();fill(255, 208, 66, 150);triangle(170, 50, 330, 50, 250, 170);fill(255, 188, 117, 150);triangle(350, 70, 170, 350, 350, 350);scale(1/sz, 1/sz);translate(-x, -y);
};

p5.draw(function() {
	strokeWeight(10);fill(150, 255, 159);
	for(var y = 0; y <= height; y += 10){
		stroke(lerpColor(color(150, 255, 159), color(61, 255, 80), y / height));
		line(0, y, width, y);
	}

	//mathDinosaurLogo(200, 200, 1);

	mathDinosaurLogo(width / 2, height / 2, min(width, height) / 400);
	
	translate(width, height);
	scale(min(width, height) / 400);
	fill(255);
	//textFont(loadFont("sans-serif", 0), 16);
	textAlign(CENTER, CENTER);
	text("by", -65, -30);
	DY(-50, -50, 1/10);
});

p5.mouseClicked(function(){
	jiggle = !jiggle
})