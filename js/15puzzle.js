/**
 * Created by Allen on 2017/6/16.
 */

/**
 * set up puzzle image div and show initial image
 */

var gridSpace = 1; // space between grids (in px)
var puzzleMargin = 2; // (in %)

var puzzleDiv = document.getElementById('puzzle_div');
var puzzleImageDiv = document.createElement('div');
puzzleImageDiv.style.height = 100 - 2 * puzzleMargin + '%';
puzzleImageDiv.style.width = 100 - 2 * puzzleMargin + '%';
puzzleImageDiv.style.margin = puzzleMargin + '%';
puzzleImageDiv.style.position = 'absolute';
puzzleImageDiv.style.backgroundImage = "url('img/brighton.jpg')";
puzzleImageDiv.style.backgroundSize = '100% 100%';
puzzleImageDiv.style.backgroundRepeat = 'no-repeat';
puzzleDiv.appendChild(puzzleImageDiv);

/**
 * game status
 */
var inPuzzle = false;

/**
 * puzzle model
 */
class Puzzle {

    constructor(board, blankRow, blankCol) {
        this.board = board;
        this.blankRow = blankRow;
        this.blankCol = blankCol;
        this.dimension = board.length;
        this.blankValue = this.dimension * this.dimension - 1;
        this.stepTaken = 0;
    }

    moveLeft() {
        if (this.blankCol != this.dimension - 1) {
            this.board[this.blankRow][this.blankCol] = this.board[this.blankRow][this.blankCol + 1];
            this.board[this.blankRow][this.blankCol + 1] = this.blankValue;
            this.blankCol++;
            return true;
        }
        return false;
    }

    moveUp() {
        if (this.blankRow != this.dimension - 1) {
            this.board[this.blankRow][this.blankCol] = this.board[this.blankRow + 1][this.blankCol];
            this.board[this.blankRow + 1][this.blankCol] = this.blankValue;
            this.blankRow++;
            return true;
        }
        return false;
    }

    moveRight() {
        if (this.blankCol != 0) {
            this.board[this.blankRow][this.blankCol] = this.board[this.blankRow][this.blankCol - 1];
            this.board[this.blankRow][this.blankCol - 1] = this.blankValue;
            this.blankCol--;
            return true;
        }
        return false;
    }

    moveDown() {
        if (this.blankRow != 0) {
            this.board[this.blankRow][this.blankCol] = this.board[this.blankRow - 1][this.blankCol];
            this.board[this.blankRow - 1][this.blankCol] = this.blankValue;
            this.blankRow--;
            return true;
        }
        return false;
    }

    isGoal() {
        var count = 0;
        for (var i = 0; i < this.dimension; i++) {
            for (var j = 0; j < this.dimension; j++) {
                if (this.board[i][j] != count) {
                    return false;
                }
                count++;
            }
        }
        return true;
    }

}

var puzzle; // puzzle model

var grids; // grids div

var imgX = [];
var imgY = [];

/**
 * controls
 */
function moveLeft() {
    if (puzzle.moveLeft()) {
        updatePuzzle();
        puzzle.stepTaken++;
        updateStep(puzzle.stepTaken);
        checkPuzzleComplete();
    }
}

function moveRight() {
    if (puzzle.moveRight()) {
        updatePuzzle();
        puzzle.stepTaken++;
        updateStep(puzzle.stepTaken);
        checkPuzzleComplete();
    }
}

function moveUp() {
    if (puzzle.moveUp()) {
        updatePuzzle();
        puzzle.stepTaken++;
        updateStep(puzzle.stepTaken);
        checkPuzzleComplete();
    }
}

function moveDown() {
    if (puzzle.moveDown()) {
        updatePuzzle();
        puzzle.stepTaken++;
        updateStep(puzzle.stepTaken);
        checkPuzzleComplete();
    }
}

function updateStep(step) {
    var movesStatus = document.getElementById('moves_status');
    movesStatus.textContent = step + " Moves"
}

function updatePuzzle() {
    for (var i = 0; i < puzzle.dimension; i++) {
        for (var j = 0; j < puzzle.dimension; j++) {
            if (i != puzzle.blankRow || j != puzzle.blankCol) {
                grids[i][j].style.background = 'url("img/brighton.jpg") ' + '-' + imgX[puzzle.board[i][j]] + 'px ' + '-' + imgY[puzzle.board[i][j]] + 'px';
                grids[i][j].style.backgroundSize = puzzleImageDiv.clientWidth + 'px ' + puzzleImageDiv.clientHeight + 'px';
            } else {
                grids[i][j].style.background = 'none';
            }
        }
    }
}

function checkPuzzleComplete() {
    if (puzzle.isGoal()) {
        inPuzzle = false;
        var puzzleCompleteStatus = document.getElementById('puzzle_complete_status');
        puzzleCompleteStatus.hidden = false;
        grids[puzzle.blankRow][puzzle.blankCol].style.background = 'url("img/brighton.jpg") ' + '-' + imgX[puzzle.board[puzzle.blankRow][puzzle.blankCol]] + 'px ' + '-' + imgY[puzzle.board[puzzle.blankRow][puzzle.blankCol]] + 'px';
        grids[puzzle.blankRow][puzzle.blankCol].style.backgroundSize = puzzleImageDiv.clientWidth + 'px ' + puzzleImageDiv.clientHeight + 'px';
        document.getElementById('celebrate').hidden = false;
    }
}

/**
 * start puzzle
 */
function startPuzzle() {
    // clear puzzle
    puzzleImageDiv.style.backgroundImage = 'none';
    while (puzzleImageDiv.firstChild) {
        puzzleImageDiv.removeChild(puzzleImageDiv.firstChild);
    }

    // dimension
    var dimension = 3;
    var inputDimension = document.getElementById('puzzle_dimension').value;
    if (inputDimension >= 2 && inputDimension <= 4) {
        dimension = inputDimension;
    }

    // grid height and width
    var totalHeight = puzzleImageDiv.clientHeight;
    var gridHeight = (totalHeight - (dimension - 1) * gridSpace) / dimension;
    var totalWidth = puzzleImageDiv.clientWidth;
    var gridWidth = (totalWidth - (dimension - 1) * gridSpace) / dimension;

    // rows div
    var rows = [];
    for (var i = 0; i < dimension; i++) {
        var row = document.createElement('div');
        row.style.width = '100%';
        row.style.height = gridHeight + 'px';
        if (i != 0) {
            row.style.marginTop = gridSpace + 'px';
        }
        rows[i] = row;
        puzzleImageDiv.appendChild(row);
    }

    // grids div
    grids = [];
    for (var i = 0; i < dimension; i++) {
        var rowGrid = []; // grids in a row
        for (var j = 0; j < dimension; j++) {
            var grid = document.createElement('div');
            grid.style.width = gridWidth + 'px';
            grid.style.height = '100%';
            grid.style.float = 'left';
            if (j != 0) {
                grid.style.marginLeft = gridSpace + 'px';
            }
            grid.id = 'grid_' + i + '_' + j;
            grid.addEventListener('click', gridClicked);

            rowGrid[j] = grid;
            rows[i].appendChild(grid);
        }
        grids[i] = rowGrid;
    }

    // puzzle status
    updateStep(0);
    document.getElementById('puzzle_complete_status').hidden = true;
    document.getElementById('celebrate').hidden = true;

    // generate initial board data
    var board = [];
    var count = 0;
    for (var i = 0; i < dimension; i++) {
        var row = [];
        for (var j = 0; j < dimension; j++) {
            row[j] = count;
            count++;
        }
        board[i] = row;
    }

    var blankValue = count - 1;

    var blankRow = dimension - 1;
    var blankCol = dimension - 1;
    for (var i = 0; i < 100; i++) {
        var direction = Math.floor(Math.random() * 4);
        switch (direction) {
            case 0: // up
                if (blankRow != dimension - 1) {
                    board[blankRow][blankCol] = board[blankRow + 1][blankCol];
                    board[blankRow + 1][blankCol] = blankValue;
                    blankRow++;
                }
                break;
            case 1: // down
                if (blankRow != 0) {
                    board[blankRow][blankCol] = board[blankRow - 1][blankCol];
                    board[blankRow - 1][blankCol] = blankValue;
                    blankRow--;
                }
                break;
            case 2: // left
                if (blankCol != dimension - 1) {
                    board[blankRow][blankCol] = board[blankRow][blankCol + 1];
                    board[blankRow][blankCol + 1] = blankValue;
                    blankCol++;
                }
                break;
            case 3: // right
                if (blankCol != 0) {
                    board[blankRow][blankCol] = board[blankRow][blankCol - 1];
                    board[blankRow][blankCol - 1] = blankValue;
                    blankCol--;
                }
                break;
            default:
                break;
        }
    }

    // create puzzle model
    puzzle = new Puzzle(board, blankRow, blankCol);
    
    addKeyboardListeners();

    // draw grids
    var count = 0;
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            imgY[count] = grids[0][0].clientWidth * i + gridSpace * i;
            imgX[count] = grids[0][0].clientHeight * j + gridSpace * j;
            count++;
        }
    }

    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            if (i != blankRow || j != blankCol) {
                grids[i][j].style.background = 'url("img/brighton.jpg") ' + '-' + imgX[board[i][j]] + 'px ' + '-' + imgY[board[i][j]] + 'px';
                grids[i][j].style.backgroundSize = puzzleImageDiv.clientWidth + 'px ' + puzzleImageDiv.clientHeight + 'px';
            }
        }
    }

    inPuzzle = true;

    // you are lucky if the puzzle is complete at the beginning
    checkPuzzleComplete();

}

/**
 * event listeners
 */

function addKeyboardListeners() {
    window.onkeydown = function(e) {
        if (inPuzzle) {
            var code = e.keyCode ? e.keyCode : e.which;
            switch (code) {
                case 37:
                    // move left
                    moveLeft();
                    break;
                case 38:
                    // move up
                    moveUp();
                    break;
                case 39:
                    // move right
                    moveRight();
                    break;
                case 40:
                    // move down
                    moveDown();
                    break;
                default:
                    break;
            }
        }
    }
}

function gridClicked(e) {
    if (inPuzzle) {
        var id = e.target.id;
        var strArr = id.split('_');
        var row = strArr[1];
        var col = strArr[2];
        if (puzzle.blankRow == row) {
            if (puzzle.blankCol == +col - 1) {
                // left
                moveLeft();
            } else if (puzzle.blankCol == +col + 1) {
                // right
                moveRight();
            }
        }  else if (puzzle.blankCol == col) {
            if (puzzle.blankRow == +row - 1) {
                // up
                moveUp();
            }
            if (puzzle.blankRow == +row + 1) {
                // down
                moveDown();
            }
        }
    }
}