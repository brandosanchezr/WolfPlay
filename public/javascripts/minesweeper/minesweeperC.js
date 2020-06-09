class Minesweeper{
    constructor(width, totalBombs, cols, rows){
        this.grid;
        this.totalBombs = totalBombs;
        this.w = width;
        this.x = -1;
        this.y = -1;
        this.boxReveled = 0;
        this.cols = cols;
        this.rows = rows;
        this.make2DArray(cols, rows);
    }

    logic(i, j){
        if (this.grid[i][j].bomb){//If i found a bomb
            for (let k = 0; k < this.cols; k++)
                for (let l = 0; l < this.rows; l++){
                    try {
                        this.grid[k][l].revealed = true;
                    } catch (error) {
                        console.log(error);
                    }
                }
            clearInterval(Time);
        }
        else if(this.boxReveled == this.cols * this.rows - this.totalBombs){
            alert("Ganaste");
            $( '#gameHolder' ).trigger( "gameEnd", [ {score: (100000/totalSeconds), time: score} ] );
            clearInterval(Time);
        }
    }//endLogic

    update(){
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows; j++)
                if (this.grid[i][j].contains(this.x, this.y))
                    this.reveal(this.grid[i][j]);
    }//endUpdate

    input(x, y){
        if(this.boxReveled == 0)Time = setInterval(myTimer,1000);
        this.x = x;
        this.y = y;
        this.update();
    }

    make2DArray(cols, rows) {
        this.grid = new Array(cols);

        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(rows);
            for (let j = 0; j < rows; j++)
                this.grid[i][j] = new Cell(i, j, w);
        }
        
        // Pick totalBombs spots
        let options = [];
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows; j++)
                options.push([i, j]);

        for (let n = 0; n < this.totalBombs; n++) {
            let index = floor(random(options.length));
            let choice = options[index];
            let i = choice[0];
            let j = choice[1];
            // Deletes that spot so it's no longer an option
            options.splice(index, 1);
            this.grid[i][j].bomb = true;
        }
        
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows; j++)
                this.grid[i][j].neighborCount = this.countBombs(this.grid[i][j]);
        
                console.log(this.grid.length + '\n' + this.cols + '\n' + this.rows);
    }//Close M2A

    countBombs(cell){
        if (cell.bomb)
            return -1;
        else{
            let total = 0;

            for (let xoff = -1; xoff <= 1; xoff++){
                let i = cell.i + xoff;

                if (i < 0 || i >= cols) 
                    continue;

                for (let yoff = -1; yoff <= 1; yoff++){
                    let j = cell.j + yoff;

                    if (j < 0 || j >= rows)
                        continue;
                    let neighbor = this.grid[i][j];

                    if (neighbor.bomb)
                        total++;
                }
            }
            return total;
        }
    }//Close Conutbomb

    reveal(cell){
        if(!cell.revealed){
            cell.revealed = true;
            this.boxReveled++;
        }
        this.logic(cell.i, cell.j);
        if (cell.neighborCount == 0)
            this.floodFill(cell);// flood fill time
    }//Close reveal

    floodFill(cell){
        for (let xoff = -1; xoff <= 1; xoff++){
            let i = cell.i + xoff;
            if (i < 0 || i >= cols)
                continue;

            for (let yoff = -1; yoff <= 1; yoff++){
                let j = cell.j + yoff;
                
                if (j < 0 || j >= rows)
                    continue;
                
                let neighbor = this.grid[i][j];
                
                if (!neighbor.revealed)
                    this.reveal(neighbor);
            }
        }
    }//Close floodFill
}

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
        rect(this.x, this.y,this.w, this.w);
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