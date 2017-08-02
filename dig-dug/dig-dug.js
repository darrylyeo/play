/**
 * Dig Dug
 * remake by DY
 *
 * You are Dig Dug. Your job is to eliminate the Pookas and fire-breathing Fygars that lurk in the underground tunnels by inflating them with your air pump. Tunnel through the dirt to score points. Press and hold the spacebar to wield your air pump and pop a monster in close range. The deeper you are, the more points you score for defeating a monster. Don't let the last one get away!
 *
 * More Info:
 * http://www.edcollins.com/digdug/
 * http://strategywiki.org/wiki/Dig_Dug/Getting_Started
 *
 * Current differences from the real game:
     * Can't kill monsters
     * No rocks
     * No fruit bonuses
     * Buggy Monster AI
     * Multiple Levels
 *
 * HELP WANTED! Help recreate the rest of the sprites from the game. Use the "makePixelImage" function and this reference image (http://www.spriters-resource.com/resources/sheets/21/22728.png). An example is on line 554.
 * SPRITES NEEDED:
     * Dig Dug without shovel, neutral and mid-step
     * Dig Dug's air pump
	 * Dig Dug dying
     * Rock
     * Fygar fire
     * Fruits
 */

//http://cdn.wikimg.net/strategywiki/images/6/63/Dig_Dug_screen1.png


// Execute the entire program on mouse click to avoid the initial lag.
mouseClicked = function(){



// The background color.
var BACKGROUND = color(0);

// Constants related to the underlying grid system of the game.
var
GRID_UNIT = 16,
GRID_WIDTH = 14,
GRID_HEIGHT = 15,

WIDTH = GRID_UNIT * GRID_WIDTH,
HEIGHT = 288,
BOARD_HEIGHT = GRID_UNIT * GRID_HEIGHT,
BOARD_Y = 38,
SCALE = floor(height/HEIGHT),
//SCALE = height/HEIGHT,

PLAYER_SIZE = GRID_UNIT - 2,
MAZE_UNIT = GRID_UNIT / 2,
MAZE_WIDTH = GRID_WIDTH * 2,
MAZE_HEIGHT = GRID_HEIGHT * 2,
STEP_SIZE = MAZE_UNIT / 4,

// Information about the dirt layers. Each layer is represented by [height, color]
DIRT_LAYERS = [[57, color(255, 184, 0)], [GRID_UNIT * 4, color(222, 104, 0)], [GRID_UNIT * 4, color(184, 33, 0)], [GRID_UNIT * 3, color(151, 0, 0)]];


var debugMode = false;



// p5 compatibility
//if(!this.p5){
    var push = pushMatrix, pop = popMatrix;
    var createVector = function(x, y, z){ return new PVector(x, y, z); };
    var p5 = {Vector: PVector};
    p5.Vector.prototype.copy = PVector.prototype.get;
//}


// Array method that returns a random item
Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

// Helper function that adds/replaces properties from obj2 to obj1
var mergeObjects = function(obj1, obj2){
    for(var p in obj2){
        obj1[p] = obj2[p];
    }
    return obj1;
};

var directions = [LEFT, UP, RIGHT, DOWN];
var directionsAreOpposite = function(dir1, dir2){
    return abs(dir1 - dir2) === 2;
};

// Unit vectors for ease of calculations
var unitVectors = {};
unitVectors[LEFT] = createVector(-1, 0);
unitVectors[RIGHT] = createVector(1, 0);
unitVectors[UP] = createVector(0, -1);
unitVectors[DOWN] = createVector(0, 1);

// Runs a function f() and returns an image screenshot of dimensions w, h
var makeImage = function(f, w, h){
    background(0, 0, 0, 0);
    push();
    scale(SCALE);
    f();
    pop();
    return get(0, 0, (w || width)*SCALE, (h || height)*SCALE);
};


/*
var makePixelImageFromBinary = function(data, w, h){
    return function(tx, ty){
        stroke(data.colors[0]);
        for(var i = 0; i < 16; i++){
            var x = i % 2 * 4;
            var y = floor(i/2);
            var fourPixels = +data.pixels[i];
            for(var p = 0; p < 4; p++){
                var pixel = (fourPixels >> (4 - 1 - p)) % 2;
                if(pixel){ point(x + p + (tx || 0), y + (ty || 0)); }
            }
        }
    };
};*/


// Returns a function that draws a pixel image using the given data. data.pixelArray is an array of strings. Each character in the string is a pixel (a space for a transparent pixel, or the numerical index of a color in data.colors). The returned function can be passed tx and ty variables in order to position the resulting image.
var makePixelImage = function(data, w, h){
    return function(tx, ty){
        strokeWeight(1);
        strokeWeight(0.06);
        noStroke();
        rectMode(CENTER);
        for(var y = 0; y < data.pixelArray.length; y++){
            var row = data.pixelArray[y];
            for(var x = 0; x < row.length; x++){
                var c = data.pixelArray[y][x];
                if(!isNaN(c) && c !== " "){
                    fill(data.colors[+c]);
                    //stroke(data.colors[+c]);
                    rect(x + (tx || 0), y + (ty || 0), 1, 1);
                }
            }
        }
        rectMode(CORNER);
    };
};

// For efficiency, images are saved in the Program variable and persist across program restarts
if(typeof Program.images === "undefined"){
    Program.images = {};
    
    // Draws a dirt speck.
    Program.images.dirtSpeck = makePixelImage({
        pixelArray: [
            "      0 ",
            "0  0    ",
            "        ",
            "        ",
            "     0  ",
            " 0      ",
            "        ",
            "        ",
        ],
        colors: [color(255, 204, 0, 170)],
    }, MAZE_UNIT, MAZE_UNIT);
    //Program.images.dirtSpeck = makePixelImageFromBinary({
        //pixels: "02900000044000",
    
    // Draw lots of dirt specks to cover the entire board, and save the resulting image for later
    Program.images.dirtSpecks = makeImage(function(){
        background(0, 0, 0, 0);
        for(var x = 0; x < WIDTH; x += MAZE_UNIT){
            for(var y = 0; y < BOARD_HEIGHT; y += MAZE_UNIT){
                push();
                translate(x, y);
                Program.images.dirtSpeck();
                pop();
            }
        }
    }, 0, BOARD_HEIGHT);
    
    // Draw the dirt layers, and save the resulting image for later
    Program.images.dirt = makeImage(function(){
        var y = 0;
        DIRT_LAYERS.forEach(function(layerData){
            var layerHeight = layerData[0];
            var layerColor = layerData[1];
            fill(layerColor);
            stroke(layerColor);
            rect(0, y, WIDTH, min(layerHeight, BOARD_HEIGHT - y));
            y += layerHeight;
        });
    }, 0, BOARD_HEIGHT);
}








// General gaame variables
var game = {
    // The current state of the game (one of "play", "gameOver")
    state: "play",
    
    // The score and high score.
    score: 0,
    highScore: 0,
    // Adds to the score and updates the high score if surpassed.
    scorePoints: function(points){
        this.score += points;
        this.highScore = max(this.highScore, this.score);
    }
};



// Our hero. To be initialized later.
var digDug;

// The maze (a 2D array of booleans, with added helper methods). Dug-out tunnels are "true".
var maze = mergeObjects([], {
    // A 2D array of "distances" from Dig Dug. More explanation under maze.updateDistances()
    distances: mergeObjects([], {
        get: function(x, y){
            return this[y] && this[y][x];
        }
    }),

    // Initializes the original state of the tunnels (all filled with dirt, except for a dug-out upside-down "T")
    init: function(){
        // Populate with dirt
        for(var y = 0; y <= MAZE_HEIGHT; y++){
            this[y] = [];
            for(var x = 0; x <= MAZE_WIDTH; x++){
                this[y][x] = false;
            }
        }

        // Dig some of it out
        for(var y = 0; y <= MAZE_HEIGHT / 2 - 1; y++){
            this.dig(MAZE_WIDTH / 2 - 1, y, true, true);
        }
        for(var x = MAZE_WIDTH / 2 - 3; x <= MAZE_WIDTH / 2 + 1; x++){
            this.dig(x, MAZE_HEIGHT / 2 - 1, true, true);
        }

        // Calculate distances
        this.updateDistances();
    },

    // Digs out the dirt at a certain location. Tunnels can only be made at certain points on the grid; coordinates can be passed in terms of maze units (isLocalCoordinates = true) or native pixel units (isLocalCoordinates = false) and conversions will be made if necessary. Unless noScore = true, any newly-dug dirt scores 10 points.
    dig: function(x, y, isLocalCoordinates, noScore){
        if(isLocalCoordinates){
            x = round(x);
            y = round(y);
        }else{
            var coords = this.coordinatesToRoundedGridUnits(x, y);
            x = coords.x;
            y = coords.y;
        }

        // Make sure we're in bounds
        if(y < 0 || y >= this.length || x < 0 || x >= this[y].length){
            return;
        }
        // Score 10 points if this dirt has never been dug before
        if(!noScore && !this.hasTunnelAt(x, y)){
            game.scorePoints(10);
        }
        // This square is now considered dug
        this[y][x] = true;
    },

    // Draws a tunnel anywhere there is no dirt, as well as at Dig Dug's location.
    draw: function(){
        fill(BACKGROUND);
        //noStroke();stroke(BACKGROUND);//strokeWeight(0.25);
        push();
        translate(-GRID_UNIT/2, - GRID_UNIT/2);
        for(var y = 0; y <= MAZE_HEIGHT; y++){
            for(var x = 0; x <= MAZE_WIDTH; x++){
                if(this.hasTunnelAt(x, y)){
                    this.drawTunnel(x, y);
                }
            }
        }
        this.drawTunnel(digDug.pos.x/MAZE_UNIT, digDug.pos.y/MAZE_UNIT);
        pop();
    },
    
    // Draws a unit tunnel at (x, y) in maze units.
    drawTunnel: function(x, y){
        noStroke();
        for(var h = 3; h < PLAYER_SIZE - 1; h += 2){
            rect(MAZE_UNIT * x + round(h / 2 + 1 + PLAYER_SIZE) % 2 - 0.5, MAZE_UNIT * y + h, PLAYER_SIZE, 2);
            rect(MAZE_UNIT * x + h, MAZE_UNIT * y + round(h / 2 + 1 + PLAYER_SIZE) % 2 - 0.5, 2, PLAYER_SIZE);
        }
        
        // Show the distances array for debugging
        if(debugMode){
            pushStyle();
            fill(255);
            textSize(5);
            text(maze.distances.get(x, y) || "", MAZE_UNIT * x + round(h / 2 + 1 + PLAYER_SIZE) % 2 + 2, MAZE_UNIT * y + h - 7);
            popStyle();
        }
    },

    // Returns true if there is no dirt at (x, y) in maze units (including y = -1, above the dirt).
    hasTunnelAt: function(x, y){
        return y === -1 || (this[y] && this[y][x]);
    },

    // Returns an array of possible directions to step to from (x, y).
    getSurroundings: function(pos){
        var surroundings = [];
        for(var d = 0; d < directions.length; d++){
            var direction = directions[d];
            var newPos = p5.Vector.add(pos, unitVectors[direction]);
            if(this.hasTunnelAt(newPos.x, newPos.y)){
                surroundings.push(direction);
            }
        }
        return surroundings;
    },

    // For each point in the grid, find the number of steps it would take to get to Dig Dug through the existing tunnels and store the values in maze.distances. Used for monster pathfinding.
    updateDistances: function(pos, distance){
        if(!arguments.length){
            // Clear the old calculations
            for(var y = 0; y <= MAZE_HEIGHT; y++){
                this.distances[y] = [];
            }
            
            pos = this.coordinatesToRoundedGridUnits(digDug.pos.x, digDug.pos.y);
            distance = 0;
        }

        if(this.distances[pos.y]){
            this.distances[pos.y][pos.x] = distance;
        }

        var surroundings = this.getSurroundings(pos);
        for(var s = 0; s < surroundings.length; s++){
            var direction = surroundings[s];
            var newPos = p5.Vector.add(pos, unitVectors[direction]);
            if(/*this.distances.get(newPos.x, newPos.y)*/this.distances[newPos.y] && this.distances[newPos.y][newPos.x] === undefined){
                this.updateDistances(newPos, distance + 1);
            }
        }
    },
    // This was a much more accurate distance calculation, but causes a timeout on KA :(
    /*updateDistances: function(positions, distance){
        if(!arguments.length){
            // Clear the old calculations
            for(var y = 0; y <= MAZE_HEIGHT; y++){
                this.distances[y] = [];
            }
            
            positions = [this.coordinatesToRoundedGridUnits(digDug.pos.x, digDug.pos.y)];
            distance = 0;
        }
        
        var newPositions = [];
        for(var p = 0; p < positions.length; p++){
            var pos = positions[p];

            if(this.distances[pos.y]){
                this.distances[pos.y][pos.x] = distance;
            }
            
            var surroundings = this.getSurroundings(pos);
            for(var s = 0; s < surroundings.length; s++){
                var direction = surroundings[s];
                var newPos = p5.Vector.add(pos, unitVectors[direction]);
                //this.distances.get(newPos.x, newPos.y)
                if(this.distances[newPos.y] && this.distances[newPos.y][newPos.x] === undefined){
                    newPositions.push(pos);
                }
            }
        }
        
        if(newPositions.length){
            this.updateDistances(newPositions, distance + 1);
        }
    },*/

    // Converts double grid units to pixel coordinates.
    doubleGridUnitsToCoordinates: function(x, y){
        return createVector(GRID_UNIT * x + MAZE_UNIT, GRID_UNIT * y);
    },

    // Converts pixel coordinates to grid units.
    coordinatesToGridUnits: function(x, y){
        return createVector(x/MAZE_UNIT, y/MAZE_UNIT);
    },

    // Converts pixel coordinates to grid units and rounds the result.
    coordinatesToRoundedGridUnits: function(x, y){
        return createVector(round(x/MAZE_UNIT), round(y/MAZE_UNIT));
    },
    
    // Returns the dirt level of the given grid coordinates. The topmost layer is 1, and the bottommost layer os 4.
    dirtLevelOfPosition: function(pos){
        return floor(pos / 4 - 1) + 1;
    }
});




// Base object for anything that moves in this game.
var Character = function(properties){
    // Initialize with defaults
    mergeObjects(this, Object.create(Character.defaultProperties));
    // Override properties unique to this instance
    mergeObjects(this, Object.create(properties));
    
    // Save the starting position and state in case of death
    if(this.pos){ this.defaultPos = this.pos.copy(); }
    this.defaultDirection = this.direction;
};

// Default properties
Character.defaultProperties = {
    // Start off just to the left of the center of the board.
    pos: createVector(WIDTH / 2 - GRID_UNIT / 2, BOARD_HEIGHT / 2 - (BOARD_HEIGHT / 2) % GRID_UNIT),
    defaultPos: createVector(WIDTH / 2 - GRID_UNIT / 2, BOARD_HEIGHT / 2 - (BOARD_HEIGHT / 2) % GRID_UNIT),

    // Face right
    direction: RIGHT,
    defaultDirection: RIGHT,
    // The most recent horizontal direction faced, either LEFT or RIGHT.
    lastHorizontalDirection: RIGHT,
    // Face a certain direction
    faceDirection: function(direction){
        if(~directions.indexOf(direction)){
            this.direction = direction;
        }
        if(this.isHorizontal()){
            this.lastHorizontalDirection = direction;
        }
    },
    // Returns true if direction or this.direction is LEFT or RIGHT.
    isHorizontal: function(direction){
        return ~[LEFT, RIGHT].indexOf(direction || this.direction);
    },
    
    // The current state of the character.
    state: "normal",
    // How long the character has been in its current state. 
    timeElapsedInThisState: 0,
    // Changes the current state.
    setState: function(state){
        this.state = state;
        this.timeElapsedInThisState = 0;
    },

    // A collection of sprite sets, arrays of functions that draw sprite images for this character.
    sprites: {},
    // The currently displaying sprite image in the current sprite set.
    frame: 0,
	// Advances to the next frame
	nextFrame: function(){
		var spriteSet = this.getCurrentSpriteSet();
		if(spriteSet){
			this.frame = (this.frame + 1) % spriteSet.length;
		}
	},
    getCurrentSpriteSet: function(){
		var spriteSet = this.sprites[this.state];
        if(typeof spriteSet === "string"){
            spriteSet = this.sprites[spriteSet];
        }
		return spriteSet;
	},
    
    // Reset position and direction to default.
    reset: function(){
        this.pos = this.defaultPos.copy();
        this.direction = this.defaultDirection;
    },

    // Steps forward in the direction currently faced.
    step: function(){
		this.nextFrame();

        // Figure out the change in position and update
        switch(this.direction){
            case LEFT:
                this.pos.add(-STEP_SIZE, 0);
                break;
            case RIGHT:
                this.pos.add(STEP_SIZE, 0);
                break;
            case UP:
                this.pos.add(0, -STEP_SIZE);
                break;
            case DOWN:
                this.pos.add(0, STEP_SIZE);
                break;
        }

        // Make sure we stay in bounds
        this.pos.x = constrain(this.pos.x, MAZE_UNIT, WIDTH - MAZE_UNIT);
        this.pos.y = constrain(this.pos.y, -MAZE_UNIT, BOARD_HEIGHT - MAZE_UNIT * 2);
    },

    // Steps can occur between the grid squares. Returns true if perfectly on a grid point.
    isOnGrid: function(){
        //return this.direction % 2 ? this.pos.x % MAZE_UNIT === STEP_SIZE : this.pos.y % MAZE_UNIT === STEP_SIZE;
        //return this.direction % 2 ? this.pos.x % GRID_UNIT === 0 : this.pos.y % GRID_UNIT === 0;
        return this.direction % 2 ? this.pos.x % MAZE_UNIT === 0 : this.pos.y % MAZE_UNIT === 0;
    },

    // Display the character. Reverse sprite if facing left.
    draw: function(){
        push();
        translate(this.pos.x, this.pos.y);
        if(this.lastHorizontalDirection === LEFT){
            scale(-1, 1);
        }
        this.drawSprite();
        pop();
    },
    // Call the function that draws the current frame. Offset by about half the size of the character.
    drawSprite: function(){
		var spriteSet = this.getCurrentSpriteSet();
        if(spriteSet && spriteSet[this.frame]){
            spriteSet[this.frame](-7, -8);
        }
    },

    // Update the character.
    update: function(){
        this.timeElapsedInThisState++;
    }
};


// Initialize Dig Dug.
var digDugDefaultProperties = {
    // Lives
    lives: 3,
    
    state: "ready",
    
    // How far the air pump has extended
    pumpDistance: 0,
    maxPumpDistance: 2,
    // The monster Dig Dug is currently pumping.
    currentlyPumpingMonster: undefined,
    
    // Animation constants
    readyDuration: 20,
    deathDuration: 20,

    sprites: {
        "ready": "play",
        "play": [
            makePixelImage({
                pixelArray: [
                    "    111",
                    "  11111",
                    " 11111111",
                    "11111111111",
                    "11122220202",
                    "11122220202",
                    "1111222222",
                    "  2211111  3",
                    " 122111111 33",
                    "33322223333333",
                    "  11222111 33",
                    " 11111111  3",
                    " 11   11",
                    " 1111 1111",
                ],
                colors: [color(0), color(255), color(15, 102, 250), color(230, 46, 37)],
            }),
            makePixelImage({
                pixelArray: [
                    "    111",
                    "  11111",
                    " 11111111",
                    "11111111111",
                    "11122220202",
                    "11122220202",
                    "1111222222",
                    "  222111   3",
                    " 1221111   33",
                    "33322223333333",
                    " 1112221   33",
                    "  11111    3",
                    "    11",
                    "    1111",
                ],
                colors: [color(0), color(255), color(15, 102, 250), color(230, 46, 37)],
            })
        ],
        "dying": "play",
    },

    // Override the draw method to rotate as well as reverse the sprite based on direction.
    draw: function(){
        push();
        translate(this.pos.x, this.pos.y);
        
        if(this.isHorizontal()){
            if(this.lastHorizontalDirection === LEFT){
                scale(-1, 1);
            }
        }else{
            rotate(this.lastHorizontalDirection === LEFT ? 90 : -90);
            if((this.lastHorizontalDirection === LEFT && this.direction === UP) || (this.lastHorizontalDirection === RIGHT && this.direction === DOWN)){
                scale(-1, 1);
            }
        }
        
        // Death Animation
        if(this.state === "dying"){
            var a = min(1, this.timeElapsedInThisState / (this.deathDuration * 0.8));
            rotate(a * -100);
            scale(1 - a);
        }
        
        this.drawSprite();
        
        fill(255);
        for(var i = 0; i < this.pumpDistance; i += 0.5){
            rectMode(CENTER);
            rect(GRID_UNIT * i, 0, GRID_UNIT, GRID_UNIT * 0.1);
            rectMode(CORNER);
        }
        pop();
    },

    // Move if a key is pressed, and if there's dirt, DIG!
    update: function(){
        Character.defaultProperties.update.call(this);
        
        if(this.state === "ready"){
            if(this.timeElapsedInThisState >= this.readyDuration){
                this.setState("play");
            }
        }else if(this.state === "play"){
            //if(this.isOnGrid()){
                maze.dig(this.pos.x, this.pos.y);
            //}

            // Lose 1 life if encountered a Monster
            for(var m = 0; m < Monster.monsters.length; m++){
                var monster = Monster.monsters[m];
                //p5.Vector.dist(this.pos, monster.pos)
                if(monster.state === "normal" && dist(this.pos.x, this.pos.y, monster.pos.x, monster.pos.y) < MAZE_UNIT){
                    this.setState("dying");
                    return;
                }
            }

            if(keyIsPressed && ~directions.indexOf(keyCode)){
                // If trying to turn 90 degrees, keep moving forward until a grid point is reached. Allow 180 degree turns without having to be at a grid point.
                var turningAround = directionsAreOpposite(this.direction, keyCode);
                if(this.isOnGrid() || turningAround){
                    this.faceDirection(keyCode);
                }
                this.step();
            }

            if(keyIsPressed && key.toString() === " "){
                if(!this.currentlyPumpingMonster){
                    this.pumpDistance = min(this.pumpDistance + 0.33, this.maxPumpDistance);

                    // Find the closest monster(s) in range. Range is extended based on this.pumpDistance
                    var closestMonsters = [];
                    var shortestMonsterDistance;
                    for(var m = 0; m < Monster.monsters.length; m++){
                        var monster = Monster.monsters[m];
                        //p5.Vector.dist(this.pos, monster.pos)
                        var pumpPos = p5.Vector.add(p5.Vector.mult(unitVectors[this.direction], this.pumpDistance), this.pos);
                        var distance = dist(pumpPos.x, pumpPos.y, monster.pos.x, monster.pos.y);debug(digDug.pos, pumpPos, monster.pos, distance, GRID_UNIT);

                        // Make sure it's in range
                        if(distance > GRID_UNIT){ continue; }

                        if(distance === shortestMonsterDistance){
                            closestMonsters.push(monster);
                        }else if(distance < shortestMonsterDistance || shortestMonsterDistance === undefined){
                            closestMonsters = [monster];
                            shortestMonsterDistance = distance;
                        }
                    }
                    if(closestMonsters.length){
                        this.currentlyPumpingMonster = closestMonsters.random();
                    }
                }
				if(this.currentlyPumpingMonster){debug(this.currentlyPumpingMonster.pumpLevel);
                    if(this.currentlyPumpingMonster.pump()){debug("POP!");
                        this.currentlyPumpingMonster = undefined;
                    }
                }
            }else{
                this.pumpDistance = 0;
            }
        }else if(this.state === "dying" && game.state !== "gameOver"){
            // If Dig Dug has been dead for long enough, restart the level
            if(this.timeElapsedInThisState >= this.deathDuration){
                this.lives--;
                
                if(this.lives > 0){
                    this.setState("ready");
                }else{
                    game.state = "gameOver";
                }
                
                this.reset();
                Monster.monsters.reset();
            }
        }
    },
    
    // Extend .step() to recalculate the maze distances upon step.
    step: function(){
        Character.defaultProperties.step.call(this);
        maze.updateDistances();
    },

    // Draws as many Dig Dug sprites as there are lives.
    drawLives: function(){
        for(var i = 0; i < this.lives; i++){
            this.sprites.play[0](i * 17 + 1, BOARD_HEIGHT - 4);
        }
    }
};
digDug = new Character(digDugDefaultProperties);





// Base object for Pooka and Fygar. (Inherits from Character.)
var Monster = function(properties){
    // Override properties unique to this instance
    properties = mergeObjects(Object.create(Monster.defaultProperties), properties);
    
    // Initialize with defaults
    Character.call(this, properties);

    // Keep track of all the monsters.
    Monster.monsters.push(this);
};

// Default properties
Monster.defaultProperties = {
    // How much air is currently in this monster.
    pumpLevel: 0,
    minPumpLevel: -1,
    // How much air is needed for this monster to pop open.
    maxPumpLevel: 4,
    
    // The average speed in ghost form
    ghostSpeed: 0.65,
    
    // Monster movement AI (WIP)
    update: function(){
        Character.defaultProperties.update.call(this);
        
        if(digDug.state !== "play"){ return; }
        
        if(this.state === "normal"){
            if(this.isOnGrid()){
                var gridPos = maze.coordinatesToRoundedGridUnits(this.pos.x, this.pos.y);
                var surroundings = maze.getSurroundings(gridPos);

                // If there is a direct path to Dig Dug, go get 'im!
                if(maze.distances.get(gridPos.x, gridPos.y)){
                    var bestDirections = [];
                    var bestDistance;
                    for(var s = 0; s < surroundings.length; s++){
                        var direction = surroundings[s];
                        var newPos = p5.Vector.add(gridPos, unitVectors[direction]);

                        var distance = maze.distances.get(newPos.x, newPos.y);

                        if(distance === undefined){ break; }

                        // Find the direction(s) with the shortest distance
                        if(distance === bestDistance){
                            bestDirections.push(direction);
                        }else if(distance < bestDistance || bestDistance === undefined){
                            bestDistance = distance;
                            bestDirections = [direction];
                        }
                    }
                    // Out of all the best directions found, pick one.
                    if(bestDirections.length){
                        this.faceDirection(bestDirections.random());
                    }
                    
                    // Occasionally, turn into a ghost.
                    if(random() < 0.002){
                        this.setState("ghost");
                    }
                }else{
                    // Otherwise, just pace back and forth.
                    if(surroundings.length === 2){
                        if(directionsAreOpposite(surroundings[0], this.direction)){
                            this.faceDirection(surroundings[1]);
                        }else{
                            this.faceDirection(surroundings[0]);
                        }
                    }else if(surroundings.length > 0){
                        this.faceDirection(surroundings.random());
                    }
                    
                    // Higher chance of turning into a ghost when trapped in a cave.
                    if(random() < 0.007){
                        this.setState("ghost");
                    }
                }
            }

            this.step();
        }else if(this.state === "pumped"){
            // Attempt to recover from the wrath of Dig Dug's air pump.
            this.pumpLevel = max(this.pumpLevel - 1, this.minPumpLevel);
        }else if(this.state === "ghost"){
            // Ghost form - moves through dirt, toward Dig Dug.
            if(random() < this.ghostSpeed){
                // Find the vector from this monster to Dig Dug
                var targetVector = p5.Vector.sub(digDug.pos, this.pos);

                // Based on the angle of the vector, favor a horizontal step over a vertical one or vice versa
                if(random() <= abs(targetVector.x) / (abs(targetVector.x) + abs(targetVector.y))){
                    // Move horizontally
                    this.faceDirection(targetVector.x > 0 ? RIGHT : LEFT);
                }else{
                    // Move vertically
                    this.faceDirection(targetVector.y > 0 ? DOWN : UP);
                }
                this.step();
                
                // If reached a tunnel, return to normal.
                var gridPos = maze.coordinatesToGridUnits(this.pos.x, this.pos.y);
                if(maze.hasTunnelAt(gridPos.x, gridPos.y)){
                    this.state = "normal";
                }
            }
        }
    },
    
    draw: function(){
        // Don't display if Dig Dug is dying
        if(digDug.state !== "dying"){
            if(this.pumplevel > 0){
                scale(pow(1.2, floor(this.pumplevel)));
            }

            push();
            translate(this.pos.x, this.pos.y);
            if(this.lastHorizontalDirection === LEFT){
                scale(-1, 1);
            }
            this.drawSprite();
            pop();
        }
    },
    
	// Increase the pump level, and return whether the monster is subsequently dead.
    pump: function(){
        this.setState("pumped");
        if(this.pumpLevel === 0){
            this.pumpLevel = 2;
        }else{
            this.pumpLevel += 0.25;
        }
        
        if(this.pumpLevel >= this.maxPumpLevel){
            // Dead!
            this.setState("dead");
            
            game.scorePoints(200 + this.dirtLevelOfPosition(this.pos) * 100);
			
			return true;
        }
		return false;
    }
};

// An array that holds all the monsters, with added helper methods.
Monster.monsters = mergeObjects([], {
    // Draws all the monsters.
    draw: function(){
        for(var i = 0; i < this.length; i++){
            this[i].draw();
        }
    },

    // Updates all the monsters.
    update: function(){
        for(var i = 0; i < this.length; i++){
            this[i].update();
        }
    },

    // Makes all the monsters disappear.
    clear: function(){
        this.length = 0;
    },
    
    // Resets positions and directions of all monsters.
    reset: function(){
        for(var i = 0; i < this.length; i++){
            this[i].reset();
        }
    }
});



// Supposedly a tomato with goggles. And inflatable, too. (Inherits from Monster.)
var Pooka = function(properties){
    // Override properties unique to this instance
    properties = mergeObjects(Object.create(Pooka.defaultProperties), properties);
    
    // Initialize with defaults
    Monster.call(this, properties);
};

// Default properties
Pooka.defaultProperties = {
    sprites: {
        "normal": [
            makePixelImage({
                pixelArray: [
                    "",
                    "",
                    "   00000000",
                    "  0011111111",
                    " 001122222211",
                    " 111222322321",
                    " 111222322321",
                    " 001122221221",
                    "4000111111111",
                    "4 00011100110",
                    "444000000000",
                    "   01000010",
                    "    1    1",
                    "   1111 1111",
                ],
                colors: [color(255, 0, 0), color(255, 215, 0), color(255), color(0), color(182)]
            }),
            makePixelImage({
                pixelArray: [
                    "   00000000",
                    "  0011111111",
                    " 001122222211",
                    " 111223223221",
                    " 111223223221",
                    " 001122221221",
                    " 000111111111",
                    " 000011100110",
                    "  0000000000",
                    "4440001100001",
                    "4   111  111",
                    "4    1    1",
                    "",
                    "",
                ],
                colors: [color(255, 0, 0), color(255, 215, 0), color(255), color(0), color(182)]
            })
        ],
        "ghost": [
            makePixelImage({
                pixelArray: [
                    "",
                    "",
                    "",
                    "",
                    "  0000000000",
                    " 001111111100",
                    " 012211112210",
                    " 012211112210",
                    " 001110011100",
                    " 000000000000",
                    "  0000  0000",
                    "",
                    "",
                    "",
                ],
                colors: [color(255, 215, 0), color(255), color(0), color(182)]
            }),
            makePixelImage({
                pixelArray: [
                    "",
                    "",
                    "",
                    "    000000",
                    "  0001111000",
                    " 001111111100",
                    " 011221122110",
                    " 012111111210",
                    " 011110011110",
                    " 011000000110",
                    "  0000  0000",
                    "",
                    "",
                    "",
                ],
                colors: [color(255, 215, 0), color(255), color(0), color(182)]
            })
		]
    }
};




// A dragon that toasts and eats victims. One wonders why they don't explode into a ball of fire upon inflation (Inherits from Monster.)
var Fygar = function(properties){
    // Override properties unique to this instance
    properties = mergeObjects(Object.create(Fygar.defaultProperties), properties);
    
    // Initialize with defaults
    Monster.call(this, properties);
};

// Default properties
Fygar.defaultProperties = {
    sprites: {
        "normal": [
            makePixelImage({
                pixelArray: [
                    "     00000",
                    "   2200000000",
                    "  22220002 2",
                    " 23322",
                    " 23320",
                    " 22200002 2 2",
                    "    000000000",
                    "  1111000000",
                    "11111 0000",
                    "11111000110",
                    " 1 100011001",
                    " 00000110011",
                    "0000 11   111",
                    "      1      ",
                ],
                colors: [color(0, 184, 0), color(255, 0, 0), color(222), color(0)]
            }),
            makePixelImage({
                pixelArray: [
                    "     00000",
                    "   2200000000",
                    "  23320002 2",
                    " 23332002 2 2",
                    " 22320  00000",
                    " 22200000000",
                    " 111000000",
                    "11111100",
                    "1 1 10000",
                    "     000000 1",
                    "0   0010000 1",
                    "000000010001",
                    " 000 1111  1",
                ],
                colors: [color(0, 184, 0), color(255, 0, 0), color(222), color(0)]
            })
        ],
		"blowingFire": "normal",
        "ghost": [
            makePixelImage({
                pixelArray: [
                    "",
                    "",
                    "  000   000",
                    " 0   0 0   0",
                    "0    0 0    0",
                    "00  0   0  00",
                    " 000     000",
                    "     000",
                    "  000   000",
                    " 0  0   0  0",
                    "  00  0  00",
                    "    00000",
                    "",
                    "",
                ],
                colors: [color(255)]
            }),
            makePixelImage({
                pixelArray: [
                    "",
                    "00         00",
                    "0 000   000 0",
                    "0    0 0    0",
                    "0    0 0    0",
                    " 0  0   0  0",
                    "  00     00",
                    "0           0",
                    "0 00     00 0",
                    " 0  00000  0",
                    "  00  0  00",
                    "    00000",
                    "",
                    "",
                ],
                colors: [color(255)]
            })
		]
    },
    
    draw: function(){
        // Don't display if Dig Dug is dying
        if(digDug.state !== "dying"){
            if(this.pumplevel > 0){
                scale(pow(1.2, this.pumplevel));
            }

            push();
            translate(this.pos.x, this.pos.y);
            if(this.lastHorizontalDirection === LEFT){
                scale(-1, 1);
            }

			// Fire
			fill(255, 50, 0);
			for(var i = 1; i <= this.firePower; i++){
				rectMode(CENTER);
				rect(GRID_UNIT * i, 0, GRID_UNIT * 0.35, GRID_UNIT * 0.35);
				rectMode(CORNER);
			}
			
            this.drawSprite();
            pop();
        }
    },

    update: function(){
        Monster.defaultProperties.update.call(this);
        
        if(this.state === "blowingFire"){
            this.firePower = this.maxFirePower - abs(this.timeElapsedInThisState - this.maxFirePower);
            if(this.timeElapsedInThisState >= this.firePower * 2){
                this.setState("normal");
            }
        }else if(this.isHorizontal() && random() < 0.03){
            this.setState("blowingFire");
        }
    },
    
    firePower: 0,
    maxFirePower: 1
};



// An array of levels (initialization functions).
var levels = [
    0,
    function(){
        // Enemy tunnels
        for(var x = 19; x <= 25; x++){
            maze.dig(x, 4, true, true);
        }
        for(var y = 18; y <= 26; y++){
            maze.dig(19, y, true, true);
        }
        for(var y = 4; y <= 12; y++){
            maze.dig(3, y, true, true);
        }
        for(var x = 5; x <= 11; x++){
            maze.dig(x, 20, true, true);
        }

        new Pooka({pos: maze.doubleGridUnitsToCoordinates(1, 2)});
        new Pooka({pos: maze.doubleGridUnitsToCoordinates(12, 2)});
        new Pooka({pos: maze.doubleGridUnitsToCoordinates(9, 12)});
        new Fygar({pos: maze.doubleGridUnitsToCoordinates(3, 10)});
    }
];

// The current level.
levels.currentLevel = 0;

// Advances to the next level.
levels.next = function(){
    // Rebuild the maze
    maze.init();

    // Clear out the monster debris (ew)
    Monster.monsters.clear();

    // Initialize the level
    this[++this.currentLevel]();
};




// Set up the game.
var setup = function(){
    resetMatrix();

    frameRate(12);
    textFont(createFont("monospace"), 12);
    
    game.state = "play";
    game.score = 0;
    
    // Reset Dig Dug
    digDug = new Character(digDugDefaultProperties);
    digDug.reset();
    
    levels.currentLevel = 0;
    levels.next();
};
setup();



// Main execution loop.
draw = function(){
    push();
        // Background
        background(BACKGROUND);
        translate(0, BOARD_Y*SCALE);

        // Draw the dirt.
        image(Program.images.dirt, 0, 0);
        image(Program.images.dirtSpecks, 0, 0);

        // Draw the tunnels.
        push();
            scale(SCALE);
            maze.draw();
        pop();

        // Draw the sky.
        fill(0, 0, 151);
        noStroke();
        rect(0, 0, WIDTH*SCALE, -BOARD_Y*SCALE);

        push();
            scale(SCALE);

            // Draw and update the monsters.
            Monster.monsters.draw();
            Monster.monsters.update();

            // Draw and update Dig Dug.
            digDug.draw();
            digDug.update();

            // Draw Dig Dug's lives.
            digDug.drawLives();
        pop();
    pop();
    
    push();
        scale(SCALE);

        // Draw the score and high score. Keep all the trailing zeroes.
        fill(255);
        textSize(12);
        textAlign(LEFT, TOP);
        text(("0000000" + game.score).slice(-7), 10, 6);

        textAlign(RIGHT, TOP);
        text(("0000000" + game.highScore).slice(-7), WIDTH - 10, 6);
        textSize(7);
        text("HIGH SCORE", WIDTH - 6, 18);
        
        textSize(14);
    
        push();
            translate(WIDTH / 2, HEIGHT / 2 + GRID_UNIT / 2);
            // Ready!
            if(digDug.state === "ready"){
                textAlign(CENTER, CENTER);
                text("DIG DUG", 0, -GRID_UNIT);
                text("READY!", 0, GRID_UNIT);
            }

            // Game Over
            if(game.state === "gameOver"){
                textAlign(CENTER, CENTER);
                text("GAME OVER", 0, -GRID_UNIT);
                text("CLICK TO RESTART!", 0, GRID_UNIT);
            }
        pop();
    pop();
    
    
    // Take a screenshot of the board.
    var i = get(0, 0, WIDTH*SCALE, HEIGHT*SCALE);

    // Cover everything up.
    background(BACKGROUND);
    //image(i, 0, 0, width, i.height * width/i.width);
    //filter(BLUR, 1);

    // Draw the screenshot back, but in the center of the canvas.
    imageMode(CENTER);
    image(i, width/2, height/2);
    imageMode(CORNER);
};

keyPressed = function(){
    if(keyCode === RETURN || keyCode === ENTER){
        debugMode = !debugMode;
    }
};

// Click to restart after the game is over.
mouseClicked = function(){
    if(game.state === "gameOver"){
        setup();
    }
};

};










draw = function(){};

var begin = function() {
    this[["KAInfiniteLoopSetTimeout"][0]](100000);
};
begin();


// Title screen.
background(0);
fill(255);
textSize(30);
textAlign(CENTER, CENTER);
text("DIG DUG\nClick to Start", width/2, height/2);
textAlign(LEFT, BASELINE);