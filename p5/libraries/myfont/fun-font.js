var funFont = new MyFont(
	25,
	{
		horizontalLine: function(w, y){
			y = y || 0;
			line(0, y, w, y);
		},
		verticalLine: function(x, h){
			x = x || 0;
			h = h ? h : funFont.naturalHeight;
			line(x, -h / 2, x, h / 2);
		},
		leftLine: function(){
			funFont.parts.verticalLine(0);
		},
		topLine: function(w){
			funFont.parts.horizontalLine(w, -funFont.naturalHeightHalf);
		},
		bottomLine: function(w){
			funFont.parts.horizontalLine(w, funFont.naturalHeightHalf);
		},
		bigO: function(w){
			ellipse(8, 0, w, funFont.naturalHeight);
		},
		period: function(){
			strokeWeight(currentMyText.weight + 1);
			point(0, funFont.naturalHeightHalf);
			strokeWeight(currentMyText.weight);
			//ellipse(0, funFont.naturalHeightHalf, 1, 1);
		}
	},
	[
		new Char("placeholder", 16,
			function(){
				strokeWeight(2);
				point(0, -funFont.naturalHeightHalf);
				point(0, 0);
				point(0, funFont.naturalHeightHalf);
				point(this.width / 2, funFont.naturalHeightHalf);
				point(this.width, -funFont.naturalHeightHalf);
				point(this.width, 0);
				point(this.width, funFont.naturalHeightHalf);
				point(this.width / 2, -funFont.naturalHeightHalf);
			}),
		new Char(" ", 2,
			function(b){
				
			}),
		new Char(".", 2,
			function(b){
				funFont.parts.period();
			}),
		new Char(":", 2,
			function(b){
				ellipse(0, -3, 1, 1);
				funFont.parts.period();
			}),
		new Char("'", 0,
			function(b){
				line(1, -funFont.naturalHeightHalf, 0, -funFont.naturalHeightHalf + 3);
			}),
		new Char("\"", 4,
			function(b){
				line(1, -funFont.naturalHeightHalf, 0, -funFont.naturalHeightHalf + 3);
				line(5, -funFont.naturalHeightHalf, 4, -funFont.naturalHeightHalf + 3);
			}),
		new Char(",", 0,
			function(b){
				line(1, funFont.naturalHeightHalf, 0, funFont.naturalHeightHalf + 3);
			}),
		new Char("!", 2,
			function(b){
				line(0, -funFont.naturalHeightHalf, 0, 6);
				funFont.parts.period();
			}),
		new Char("_", 10,
			function(b){
				funFont.parts.bottomLine(this.width);
			}),
		new Char("|", 1,
			function(b){
				line(0, -funFont.naturalHeightHalf - 1, 0, funFont.naturalHeightHalf + 1);
			}),
		new Char("-", 10, function(b){
			funFont.parts.horizontalLine(this.width);
		}),
		new Char("+", 10, function(b){
			funFont.parts.horizontalLine(this.width);
			line(5, -5, 5, 5);
		}),
		new Char("*", 12, function(b){
			line(0, 0, 12, 0);
			line(3, -5, 9, 5);
			line(9, -5, 3, 5);
		}),
		new Char("=", 10, function(b){
			funFont.parts.horizontalLine(this.width, -4);
			funFont.parts.horizontalLine(this.width, 4);
		}),
		new Char("&", 11,
			function(b){
				line(2, -3, 12, funFont.naturalHeightHalf);
				arc(6, -6.25, 10, 11.5, 155, 270);
				arc(6, -8.25, 7, 7.5, -90, 45);
				line(8, -5, 0, 3);
				arc(4, 7, 11, 11.5, 90, 225);
				arc(4, 2.75, 16, 20, 20, 90);
			}),
		new Char("0", 16,
			function(b){
				funFont.parts.bigO(this.width);
				line(3, funFont.naturalHeightHalf - 4, 13, -funFont.naturalHeightHalf + 4);
			}),
		new Char("1", 13,
			function(b){
				funFont.parts.verticalLine(this.width / 2);
				funFont.parts.bottomLine(this.width);
				line(this.width / 2, -funFont.naturalHeightHalf, 1, -funFont.naturalHeightHalf + 3);
			}),
		new Char("2", 13,
			function(b){
				arc(6.5, -6, 13, funFont.naturalHeightHalf, -180, 35);
				line(this.width - 2, -1, 0, funFont.naturalHeightHalf);
				funFont.parts.bottomLine(this.width);
			}),
		new Char("3", 13,
			function(b){
				arc(this.width / 2, -6.25, 12, 12, -180, 90);
				arc(this.width / 2, 6.5, 14, 13, -90, 160);
			}),
		new Char("4", 13,
			function(b){
				line(0, 3, 1, -funFont.naturalHeightHalf);
				funFont.parts.horizontalLine(this.width, 3);
				funFont.parts.verticalLine(this.width - 2);
			}),
		new Char("5", 12,
			function(b){
				line(1, -funFont.naturalHeightHalf, this.width, -funFont.naturalHeightHalf);
				line(1, -funFont.naturalHeightHalf, 1, -1);
				line(6, -2, 1, -1);
				arc(this.width / 2, 5.5, 13, 14, -90, 160);
			}),
		new Char("6", 13,
			function(b){
				arc(this.width / 2, -4.5, 13, 15, -180, -20);
				line(0, -4, 0, 4);
				ellipse(this.width / 2, 5.5, 13, 14);
			}),
		new Char("7", 13,
			function(b){
				funFont.parts.topLine(this.width);
				arc(this.width * 1.4, funFont.naturalHeightHalf, this.width * 2, funFont.naturalHeight * 2.1, -180, -115);
			}),
		new Char("8", 13,
			function(b){
				ellipse(this.width / 2, -6.5, 12, 13);
				ellipse(this.width / 2, 6.5, 14, 13);
			}),
		new Char("9", 13,
			function(b){
				arc(this.width / 2, 4.5, 13, 15, 0, 160);
				line(this.width, -4, this.width, 4);
				ellipse(this.width / 2, -5.5, 13, 14);
			}),
		new Char("A", 14,
			function(b){
				arc(7, 0, 14, 26, -180, 0);
				line(0, 0, 0, funFont.naturalHeightHalf);
				funFont.parts.horizontalLine(this.width, 2);
				line(14, 0, 14, funFont.naturalHeightHalf);
			}),
		new Char("B", 11,
			function(b){
				funFont.parts.leftLine();
				arc(0, -7.5, 23, 12, -90, 90);
				arc(0, 6.5, 25, 14, -90, 90);
			}),
		new Char("C", 15,
			function(b){
				arc(8 + b / 2, 0, 17, 26, 50, 310);
			}),
		new Char("D", 13,
			function(b){
				funFont.parts.leftLine();
				arc(0, 0.5, 26, 26, -90, 90);
			}),
		new Char("E", 12,
			function(b){
				funFont.parts.leftLine();
				funFont.parts.topLine(this.width);
				funFont.parts.horizontalLine(10);
				funFont.parts.bottomLine(this.width);
			}),
		new Char("F", 12,
			function(b){
				funFont.parts.leftLine();
				funFont.parts.topLine(this.width);
				funFont.parts.horizontalLine(10);
			}),
		new Char("G", 16,
			function(b){
				arc(8, 0, this.width, funFont.naturalHeight, 10, 320);
				line(this.width - 6, 2, this.width, 2);
			}),
		new Char("H", 14,
			function(b){
				funFont.parts.leftLine();
				funFont.parts.horizontalLine(this.width);
				funFont.parts.verticalLine(14);
			}),
		new Char("I", 1,
			function(b){
				funFont.parts.verticalLine(1);
			}),
		new Char("J", 10,
			function(b){
				line(this.width, -funFont.naturalHeightHalf, this.width, 8);
				arc(this.width / 2, 8, this.width, 10, 0, 180);
			}),
		new Char("K", 12,
			function(b){
				funFont.parts.verticalLine();
				line(0, 3, this.width, -funFont.naturalHeightHalf);
				line(4, 0, this.width, funFont.naturalHeightHalf);
			}),
		new Char("L", 12,
			function(b){
				funFont.parts.verticalLine();
				funFont.parts.bottomLine(this.width);
			}),
		new Char("M", 14,
			function(b){
				funFont.parts.verticalLine();
				line(0, -funFont.naturalHeightHalf, this.width / 2, 5);
				line(this.width, -funFont.naturalHeightHalf, this.width / 2, 5);
				funFont.parts.verticalLine(this.width);
			}),
		new Char("N", 12,
			function(b){
				funFont.parts.leftLine();
				line(0, -funFont.naturalHeightHalf, 12, funFont.naturalHeightHalf);
				funFont.parts.verticalLine(12);
			}),
		new Char("O", 16,
			function(b){
				funFont.parts.bigO(this.width);
			}),
		new Char("P", 12,
			function(b){
				funFont.parts.leftLine();
				arc(0, -4.5, 25, 16, -90, 90);
			}),
		new Char("Q", 16,
			function(b){
				funFont.parts.bigO(this.width);
				line(10, 6, 15, 13);
			}),
		new Char("R", 12,
			function(b){
				funFont.parts.verticalLine();
				arc(0, -4.5, 25, 16, -90, 90);
				line(6, 3.5, 12, 13);
			}),
		new Char("S", 13,
			function(b){
				arc(this.width / 2, -6.5, 13, 13, 90, 340);
				arc(this.width / 2, 6.5, 14, 13, -90, 160);
			}),
		new Char("T", 14,
			function(b){
				funFont.parts.topLine(this.width);
				funFont.parts.verticalLine(7);
			}),
		new Char("U", 14,
			function(b){
				arc(7, 3, 14, 20, 0, 180);
				line(0, -funFont.naturalHeightHalf, 0, 3);
				line(14, -funFont.naturalHeightHalf, 14, 3);
			}),
		new Char("V", 16,
			function(b){
				line(0, -funFont.naturalHeightHalf, this.width / 2, funFont.naturalHeightHalf);
				line(this.width, -funFont.naturalHeightHalf, this.width / 2, funFont.naturalHeightHalf);
			}),
		new Char("W", 16,
			function(b){
				line(0, -funFont.naturalHeightHalf, 3, funFont.naturalHeightHalf);
				line(3, funFont.naturalHeightHalf, this.width / 2, -5);
				line(this.width - 3, funFont.naturalHeightHalf, this.width / 2, -5);
				line(this.width - 3, funFont.naturalHeightHalf, this.width, -funFont.naturalHeightHalf);
			}),
		new Char("X", 12,
			function(b){
				line(0, -funFont.naturalHeightHalf, 12, funFont.naturalHeightHalf);
				line(0, funFont.naturalHeightHalf, 12, -funFont.naturalHeightHalf);
			}),
		new Char("Y", 16,
			function(b){
				line(0, -funFont.naturalHeightHalf, this.width / 2, 2);
				line(this.width, -funFont.naturalHeightHalf, this.width / 2, 2);
				line(this.width / 2, funFont.naturalHeightHalf, this.width / 2, 2);
			}),
		new Char("Z", 14,
			function(b){
				funFont.parts.topLine(this.width);
				line(0, funFont.naturalHeightHalf, this.width, -funFont.naturalHeightHalf);
				funFont.parts.bottomLine(this.width);
			})
	]
);