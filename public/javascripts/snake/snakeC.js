class Snake{
    constructor(width, height){
        this.scl = 14;
        this.width = width;
        this.height = height;
        this.col = floor(this.width / this.scl);
	    this.row = floor(this.height / this.scl);
	    this.xspeed = 0;
        this.yspeed = 0;
        this.nTail = 0;
        this.tail = [];
        this.head = createVector(floor(this.col/2), floor(this.row/2));
        this.head.mult(this.scl);
        this.food = this.createFood();
    }

    update(){
		for (let i = this.tail.length - 1; i > 0; i--)
			this.tail[i].set(this.tail[i - 1].x, this.tail[i - 1].y);
		if(this.tail[0])
			this.tail[0].set(this.head.x, this.head.y);
		this.head.set(this.head.x + this.xspeed, this.head.y + this.yspeed);
		//this.head.x = constrain(this.head.x, 0, width-scl);
		//this.head.y = constrain(this.head.y, 0, height-scl);
		if (this.head.x >= this.width) this.head.x = 0; else if (this.head.x < 0) this.head.x = this.width - this.scl;
	    else if (this.head.y >= this.height) this.head.y = 0; else if (this.head.y < 0) this.head.y = this.height - this.scl;
	}

	show(){
		fill(255);
		for (var i = 0; i < this.tail.length; i++)
			rect(this.tail[i].x, this.tail[i].y, this.scl, this.scl);
		rect(this.head.x, this.head.y, this.scl, this.scl);
		fill(255, 0, 100);
		rect(this.food.x, this.food.y, this.scl, this.scl);
	}

	input(x ,y){
		this.xspeed = x;
		this.yspeed = y;
	}

	logic(){
		if (dist(this.head.x, this.head.y, this.food.x, this.food.y) <= 2){
			this.createFood(this.col, this.row);
			this.tail[++this.nTail -1] = createVector(10, 10);
		}
		for (var i = 0; i < this.tail.length; i++)
			if(this.tail[i].x == this.head.x && this.tail[i].y == this.head.y)
				setup();
		//if (x > width || x < 0 || y > height || y < 0)
		//  setup();
    }
    
    createFood(){
        let vector = createVector(floor(random(this.col)), floor(random(this.row)));
        vector.mult(this.scl);
        for(let i = 0; i < this.nTail; i++){
            if(dist(vector.x, vector.y, s.tail[i].x, s.tail[i].y) <= 1){
                vector = createVector(floor(random(this.col)), floor(random(this.row)));
                vector.mult(this.scl);
                i = 0;
            }
        }
        this.food = vector;
        return vector;
    }
}

//NOthing else