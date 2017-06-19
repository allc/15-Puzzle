/**
 * Created by Allen on 2017/6/16.
 */

/**
 * set up puzzle image div and show initial image
 */

var gridSpace = 1; // space between grids (in px)

var puzzleDiv = document.getElementById('puzzle_div');
var puzzleImageDiv = document.createElement('div');
puzzleImageDiv.style.height = '96%';
puzzleImageDiv.style.width = '96%';
puzzleImageDiv.style.margin = '2%';
puzzleImageDiv.style.position = 'absolute';
puzzleImageDiv.style.backgroundImage = "url('img/testImg.png')";
puzzleImageDiv.style.backgroundSize = '100% 100%';
puzzleImageDiv.style.backgroundRepeat = 'no-repeat';
puzzleDiv.appendChild(puzzleImageDiv);

/**
 * puzzle model
 */
class Board {
    constructor() {

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
        //row.style.backgroundColor = 'blue';

        rows[i] = row;
        puzzleImageDiv.appendChild(row);
    }

    // grids div
    var grids = [];
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
            grid.style.backgroundColor = 'grey';

            rowGrid[j] = grid;
            rows[i].appendChild(grid);
        }
        grids[i] = rowGrid;
    }

    // generate board data
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

    // debug
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            grids[i][j].textContent = board[i][j];
            if (i == blankRow && j == blankCol) {
                grids[i][j].style.backgroundColor = 'green';
            }
        }
    }

}