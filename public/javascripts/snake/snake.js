//Snake
var s;
var score = 0;
var CanWeMove = true;
var gameStarted = false;

function setup() {
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    let wid = hei = 476;
    if(window.innerWidth < 600){
        wid = window.innerWidth - (window.innerWidth % 14);
        hei = window.innerHeight - (window.innerHeight % 14) - (14 * 2);
    }
	canvas = createCanvas(wid, hei);
    canvas.parent('gameHolder');
	s = new Snake(wid, hei);
    frameRate(10);
    if(gameStarted) $( '#gameHolder' ).trigger( "gameEnd", [ {score: score} ] );
    gameStarted = true;
}
/*function mousePressed() {
	s.createFood(floor(random(s.col)), floor(random(s.row)));
	s.tail[++s.nTail -1] = createVector(10, 10);
}*/
function draw() {
	background(51);
	s.logic();
	s.update();
	s.show();
    CanWeMove = true;
    score =  s.nTail * 100;
    document.getElementById("score").innerHTML = "Score: " + score;
}
function keyPressed(){
	if(CanWeMove === true){
		if((keyCode === UP_ARROW || keyCode === 87) && s.yspeed != s.scl)
			s.input(0, -s.scl);
		else if((keyCode === DOWN_ARROW || keyCode === 83) && s.yspeed != -s.scl)
			s.input(0, s.scl);
		else if((keyCode === RIGHT_ARROW || keyCode === 68) && s.xspeed != -s.scl)
			s.input(s.scl, 0);
		if((keyCode === LEFT_ARROW || keyCode === 65) && s.xspeed != s.scl)
			s.input(-s.scl, 0);
		CanWeMove = false;
    }
}

function touchMoved() {
    if(CanWeMove === true){
		if((mouseY < 165 && mouseX > 100 && mouseX < 210) && s.yspeed != s.scl)
			s.input(0, -s.scl);
		else if((mouseY >= 330 && mouseX > 100 && mouseX < 210) && s.yspeed != -s.scl)
			s.input(0, s.scl);
		else if((mouseX >= 210) && s.xspeed != -s.scl)
			s.input(s.scl, 0);
		if((mouseX <= 100) && s.xspeed != s.scl)
			s.input(-s.scl, 0);
		CanWeMove = false;
    }
}

function touchStarted() {
    if(CanWeMove === true){
		if((mouseY < 165 && mouseX > 100 && mouseX < 210) && s.yspeed != s.scl)
			s.input(0, -s.scl);
		else if((mouseY >= 330 && mouseX > 100 && mouseX < 210) && s.yspeed != -s.scl)
			s.input(0, s.scl);
		else if((mouseX >= 210) && s.xspeed != -s.scl)
			s.input(s.scl, 0);
		if((mouseX <= 100) && s.xspeed != s.scl)
			s.input(-s.scl, 0);
		CanWeMove = false;
    }
}