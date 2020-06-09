class Cell{
    constructor(i, j, w){
        this.i = i; //position in line arreay
        this.j = j; //oossition in column array
        this.x = i * w; //position x in canvas w is width
        this.y = j * w;
        this.w = w;
        this.neighborCount = 0; //For each bombNextoIt
        this.bomb =  false; //Has o not a bomb
        this.revealed = false; //All ready clicked?
    }

    show(){
        stroke(0);
        noFill();
        rect(this.x, this.y,this. w, this.w);
        if(this.revealed){
            if(this.bomb){
                fill(127);
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            }else{
                fill(200);
                rect(this.x, this.y,this. w, this.w);
                if (this.neighborCount > 0){
                    textAlign(CENTER);
                    fill(0);
                    text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
                }
            }
        }
    }//Close show
    contains(x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }//Close contains
}