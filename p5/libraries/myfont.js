/** Featured on darryl-yeo.com: darryl-yeo.com/myfont-api **/

/**
 * MyFont API
 * by DY
 * 
 * Fun Font
 * by DY
 * 
 * A cool font using an API I designed for myself (in two days!). Everything you see here is NOT text(), but line()s, arc()s, and point()s!
 * 
 * As of now, only capitals and limited punctuation are included within this font. Automatic line breaks and vertical text alignment are not yet supported. Try changing the font settings in currentMyText below or in the mouseMoved() function.
 * 
 * Thank you for your patience as I add more characters and improve the MyFont API! You may use it as long as you show my name and the link to this program at the top of your code AND give me the link to the program you use it in. Thanks!
 */

//default height is 30
var Char = function(id, len, render){
	this.id = id;
	this.width = len;
	this.draw = render;
};

var currentMyText;
p5.setup(function(){
	currentMyText = {
		font: undefined,
		fill: color(0, 0, 0),
		size: 30,
		weight: 3,
		xAlign: LEFT,
		yAlign: BASELINE,
		trailSpace: 2,
		leading: 33
	}
});

var MyFont = function(naturalHeight, parts, characterInfo){
	this.naturalHeight = naturalHeight;
	this.naturalHeightHalf = naturalHeight / 2;
	this.parts = parts;
	this.characterInfo = characterInfo;
};

var myTextFont = function(f){
	if(typeof f === "string"){
		textFont(createFont(f, 0), 0);
		currentMyText.font = undefined;
	}else{
		currentMyText.font = f;
	}
};

var myTextFill = function(r, g, b, a){
	fill(r, g, b, a);
	currentMyText.fill = color(r, g, b, a);
};

var myTextSize = function(tS){
	textSize(tS);
	currentMyText.size = tS;
};

var myTextWeight = function(weight){
	currentMyText.weight = weight;
};

var myTextAlign = function(align, yAlign){
	textAlign(align, yAlign);
	currentMyText.xAlign = align;
	currentMyText.yAlign = yAlign;
};

var myTextTrailSpace = function(trailSpace){
	currentMyText.trailSpace = trailSpace;
};

var myTextLeading = function(leading){
	textLeading(leading);
	currentMyText.leading = leading;
};

var myText = function(t, x, y, width, height){
	if(currentMyText.font){
		var onLine = 0;
		
		push();
		translate(x, y);
		scale(currentMyText.size / 30);
		
		var paragraphWidth = 0;
		for(var c = 0; c < t.length; c++){
			var characterString = t[c];
			if(characterString === "\n"){
				break;
			}
			var character = currentMyText.font.characterInfo[0];
			for(var cI = 0; cI < currentMyText.font.characterInfo.length; cI++){
				var currentCharacter = currentMyText.font.characterInfo[cI];
				if(currentCharacter.id === characterString){
					character = currentCharacter;
					break;
				}
			}
			paragraphWidth += character.width;
			if(c < t.length - 1) paragraphWidth += currentMyText.trailSpace + currentMyText.weight;
		}
		
		switch(currentMyText.xAlign){
			case CENTER:
				translate(-paragraphWidth / 2, 0);
				break;
			case RIGHT:
				translate(-paragraphWidth, 0);
				break;
		}
		
		for(var c = 0; c < t.length; c++){
			var characterString = t[c];
			if(characterString === "\n"){
				/*
				c++;
				onLine++;
				
				popMatrix();
				pushMatrix();
				
				translate(x, onLine * (tS + leading));
				*/
				
				pop();
				
				myText(t.substring(c + 1), x, y + currentMyText.leading);
				return;
			}
			
			strokeWeight(1);
			/*if(showLengths){
				stroke(100, 100, 100, 150);
				line(0, -currentMyText.size / 2, 0, currentMyText.size / 2);
			}*/
			
			noFill();
			stroke(currentMyText.fill);
			strokeWeight(currentMyText.weight);
			strokeCap(ROUND);
			
			var character = currentMyText.font.characterInfo[0];
			for(var cI = 0; cI < currentMyText.font.characterInfo.length; cI++){
				var currentCharacter = currentMyText.font.characterInfo[cI];
				if(currentCharacter.id === characterString){
					character = currentCharacter;
					break;
				}
			}
			
			character.draw(currentMyText.weight);
			
			translate(character.width + currentMyText.trailSpace + currentMyText.weight, 0);
		}
		
		pop();
	}else{
		text(t, x, y);
	}
};