/*var setup = Function.merge(setup, function(){
	noLoop();
	createCanvas(windowWidth, windowHeight, P2D);
	scale(windowWidth/400);
})();
/*/
//p5.setup(function(){console.log(9)
	noLoop();
	scale(min(windowWidth, windowHeight)/400);

	mouseX = 322;
	mouseY = 257;
	mouseMoved();
//})
//*/

p5.windowResized(redraw);

p5.mouseMoved(redraw)

p5.draw(function(){
	translate(width / 2, height / 2)
	scale(min(windowWidth, windowHeight)/400);
	translate(-200, -200)
	
	colorMode(HSB);
	background((mouseX * 400/width) % 255, (mouseY * 400/height) / 4, mouseX * 3 - 200);
	colorMode(RGB);

	myTextAlign(LEFT);
	myTextFont(funFont || arcAndLineFont);
	myTextFill(100, 166, 255);
	myTextSize(30);
	myTextWeight(3);
	myText("THIS IS DY'S FUN FONT!", 15, 30);
	
	myTextFill(0, 166, 25);
	myTextSize(50);
	myTextWeight(4);
	myText("AWESOME!!!", 20, 80);
	
	myTextFill(155, 155, 0);
	myTextSize(10);
	myTextWeight(4);
	myTextAlign(CENTER);
	myTextTrailSpace(24);
	myText("NOW WITH HORIZONTAL ALIGNMENT!", 205, 120);
	myTextFill(100);
	myTextAlign(RIGHT);
	myTextTrailSpace(2);
	myText("MOVE THE MOUSE AROUND FOR A DIFFERENT BACKDROP!", 380, 138);
	
	myTextAlign(CENTER);
	myTextFill(230, 26, 155);
	myTextSize(20);
	myTextWeight(3);
	myTextTrailSpace(-2);
	myText("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 200, 160);
	myTextTrailSpace(2);
	myText("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 200, 182.5);
	myTextTrailSpace(6);
	myText("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 200, 205);
	
	myTextAlign(LEFT);
	myTextTrailSpace(2);
	myTextLeading(currentMyText.size + 0);
	myTextWeight(4);
	myTextFill(100);
	myText("VERY\nFUN\nFONT!", 15, 235);
	
	myTextLeading(currentMyText.size + 2);
	myTextWeight(2);
	myTextFill(200, 100, 100);
	myText("LOTS OF\nWEIGHTS!", 80, 260);
	
	myTextAlign(CENTER);
	myTextLeading(currentMyText.size + 16);
	myTextWeight(3);
	myTextFill(50, 150, 120);
	myText("SIZES,\nCOLOR,\n+ LEADING!", 200, 235);
	
	myTextAlign(RIGHT);
	myTextLeading(currentMyText.size - 1);
	myTextWeight(2);
	myTextFill(200, 10, 250);
	myText("JUST\nYOU\nWAIT...", 300, 235);
	
	myTextLeading(currentMyText.size + 8);
	myTextWeight(5);
	myTextTrailSpace(1);
	myTextFill(50, 60, 70);
	myText("\"YOU'LL\nLOVE IT\n- A LOT!\"", 385, 245);
	
	myTextAlign(LEFT);
	myTextFill(205, 140, 0);
	myTextSize(12);
	myTextWeight(3);
	myTextTrailSpace(2);
	myTextLeading(currentMyText.size + 3);
	myText("* THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.\n* PACK MY BOX WITH FIVE DOZEN LIQUOR JUGS.\n* WALTZ, NYMPH, FOR QUICK JIGS VEX BUD!", 15, 335);
	
	myTextAlign(RIGHT);
	myTextFill(156, 107, 255);
	myTextWeight(5);
	myText("246\n+ 789\n= 1035", 385, 335);
	
	myTextAlign(RIGHT);
	myTextFill(100, 200, 30);
	myTextSize(10);
	myTextWeight(4);
	myText("IF YOU LIKE THIS FONT, SAMPLE IT IN DY'S SPINOFF!", 390, 386);
})