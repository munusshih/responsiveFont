let fontRegular;
let letter = [];
let letters = [];

function preload() {
	fontRegular = loadFont('Newston.otf');
}

var tileCountX = 50;
var tileCountY = 35;

let n = 13;

var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
let ballsx = [];
let ballsy = [];
let ballcolor = [];
let sizes = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);

	for (var i = 0; i < tileCountX; i++) {
		if (i % 2 == 0) {
			hueValues[i] = random(360);
			saturationValues[i] = 360;
			brightnessValues[i] = 0;
		} else {
			hueValues[i] = 195;
			saturationValues[i] = 0;
			brightnessValues[i] = 255;
		}
	}
	for (let i = 0; i < n; i++) {
		ballsx[i] = random(0, width);
		ballsy[i] = random(0, height);
		ballcolor[i] = int(random(2)) * 255;
		sizes[i] = random(50, 60);
	}
}

function draw() {
	noStroke();
	// white back
	background(0, 0, 100);

	// limit mouse coordinates to canvas
	var mX = constrain(width, 100, 1920);
	var mY = constrain(height, 100, 1080);

	// tile counter
	var counter = 0;

	// map mouse to grid resolution
	var currentTileCountX = int(map(mX, 50, 1920, 1, tileCountX));
	var currentTileCountY = int(map(mY, 50, 1080, 1, tileCountY));
	var tileWidth = int(width / currentTileCountX);
	var tileHeight = int(height / currentTileCountY);

	for (var gridY = 0; gridY < tileCountY; gridY += 1) {
		for (var gridX = 0; gridX < tileCountX; gridX += 1) {
			var posX = tileWidth * gridX;
			var posY = tileHeight * gridY;
			var index = counter % currentTileCountX;

			// get component color values
			fill(hueValues[index], saturationValues[index], brightnessValues[index]);
			rect(posX, posY, tileWidth, tileHeight);
			counter++;
		}
	}

	push()
	for (let i = 0; i < n; i++) {
		blendMode(EXCLUSION)
		fill(ballcolor[i])
		circle(ballsx[i], ballsy[i], sizes[i]);
	}
	pop()

	push()
	blendMode(EXCLUSION)
	fill('#fff')
	textFont(fontRegular)
	textSize(255)
	translate(width / 2, height * 0.76)
	textAlign(CENTER)
	scale(width / 350, height / 255)
	text('Giddy', 0, 0)
	pop()
}

function windowResized() {
	for (let i = 0; i < n; i++) {
		ballsx[i] = random(0, width);
		ballsy[i] = random(0, height);
	}
	resizeCanvas(windowWidth, windowHeight);
}