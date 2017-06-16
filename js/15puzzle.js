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

    // rows
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

    // grids
    var grids = [];
    for (var i = 0; i < dimension; i++) {
        var rowGrid = [];
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
        grid[i] = rowGrid;
    }

}