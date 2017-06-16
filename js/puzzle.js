function Board(blocks, image) {
    this.board = blocks;
    this.dimension = blocks.length;
    this.image = image;
    // image info
    this.imagesInfo = [];
    for (var i = 0; i < this.dimension; i++) {
        for (var j = 0; j < this.dimension; j++) {
            this.imagesInfo.push([image.width / this.dimension * i, image.height / this.dimension * j, image.width / this.dimension, image.height / this.dimension]);
        }
    }
}

var inPause = false;
function start_puzzle() {
    inPause = true;
    // puzzle size
    var dimension = 3;
    var inputDimension = document.getElementById('puzzle_dimension').value;
    if (inputDimension == 2 || inputDimension == 3 || inputDimension == 4) {
        dimension = inputDimension;
    }
    // initial blocks
    var blocks = [];
    for (var i = 0; i < dimension; i++) {
        var row = [];
        for (var j = 0; j < dimension; j ++) {
            row[j] = gridTo1D(dimension, i, j);
        }
        blocks[i] = row;
    }
    // randomise blocks
    var position0 = [dimension - 1, dimension - 1];
    for (var i = 0; i < Math.pow(dimension, 6) * 1.5; i++) {
        var directionNumber = Math.floor(Math.random() * (3 + 1));
        switch(directionNumber) {
            case 0:
                // move up;
                if (position0[0] != dimension - 1) {
                    blocks[position0[0]][position0[1]] = blocks[position0[0] + 1][position0[1]];
                    blocks[position0[0] + 1][position0[1]] = 0;
                    position0[0]++;
                }
                break;
            case 1:
                // move down
                if (position0[0] != 0) {
                    blocks[position0[0]][position0[1]] = blocks[position0[0] - 1][position0[1]];
                    blocks[position0[0] - 1][position0[1]] = 0;
                    position0[0]--;
                }
                break;
            case 2:
                // move left
                if (position0[1] != dimension - 1) {
                    blocks[position0[0]][position0[1]] = blocks[position0[0]][position0[1] + 1];
                    blocks[position0[0]][position0[1] + 1] = 0;
                    position0[1]++;
                }
                break;
            case 3:
                // move right
                if (position0[1] != 0) {
                    blocks[position0[0]][position0[1]] = blocks[position0[0]][position0[1] - 1];
                    blocks[position0[0]][position0[1] - 1] = 0;
                    position0[1]--;
                }
            default:
                break;
        }
    }
    
    board = new Board(blocks, puzzleImage);
    drawBoard(board);
    
    var boards = [board];
    
    puzzleCanvas.addEventListener('mousedown', function() { pressed(event) }, false);
}

function pressed(e){
    if (inPause) {
        console.log(e.x + ', ' + e.y);
    }
}

function gridTo1D(dimension, row, col) {
    if (row == dimension - 1 && col == dimension - 1) {
        return 0;
    }
    return dimension * row + col + 1;
}