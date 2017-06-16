// set up canvas context
var puzzleCanvas = document.getElementById('puzzle_canvas');
var puzzleContext = puzzleCanvas.getContext('2d');
// load initial image
var puzzleImage = new Image();
puzzleImage.src = "img/testImg.png";
// sizes of image
var puzzleCanvasPaddingX = puzzleCanvas.width * 0.02;
var puzzleCanvasPaddingY = puzzleCanvas.height * 0.02;
var puzzleImageWidth = puzzleCanvas.width - puzzleCanvasPaddingX * 2;
var puzzleImageHeight = puzzleCanvas.height - puzzleCanvasPaddingY * 2;
// draw initial image
puzzleImage.onload = function() {
    puzzleContext.drawImage(puzzleImage, puzzleCanvasPaddingX, puzzleCanvasPaddingY, puzzleImageWidth, puzzleImageHeight);
}

function drawBoard(board) {
    puzzleContext.clearRect(0, 0, puzzleCanvas.width, puzzleCanvas.height);
    var dimension = board.dimension;
    var puzzlePaddingX = puzzleCanvas.width * 0.007;
    var puzzlePaddingY = puzzleCanvas.height * 0.007;
    var partImageWidth = (puzzleCanvas.width - puzzleCanvasPaddingX * 2 - puzzlePaddingX * (dimension - 1)) / dimension;
    var partImageHeight = (puzzleCanvas.height - puzzleCanvasPaddingY * 2 - puzzlePaddingY * (dimension - 1)) / dimension;
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            if (board.board[i][j] != 0) {
                puzzleContext.drawImage(board.image,
                board.imagesInfo[board.board[i][j]][0],
                board.imagesInfo[board.board[i][j]][1],
                board.imagesInfo[board.board[i][j]][2],
                board.imagesInfo[board.board[i][j]][3],
                puzzleCanvasPaddingX + partImageWidth * i + puzzlePaddingX * i, 
                puzzleCanvasPaddingY + partImageHeight * j + puzzlePaddingY * j, 
                partImageWidth, 
                partImageHeight);
            }
        }
    }
}