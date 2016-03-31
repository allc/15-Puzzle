// add event listener to file selector
document.getElementById('file').addEventListener('change', imageSelected, false);

// set up canvas context
var puzzle_canvas = document.getElementById('puzzle_canvas');
var puzzle_context = puzzle_canvas.getContext('2d');
// load start image
var puzzle_image = new Image();
puzzle_image.src = "img/testImg.png";
// sizes of image
var puzzle_canvas_padding_x = puzzle_canvas.width * 0.02;
var puzzle_canvas_padding_y = puzzle_canvas.height * 0.02;
var puzzle_image_width = puzzle_canvas.width - puzzle_canvas_padding_x * 2;
var puzzle_image_height = puzzle_canvas.height - puzzle_canvas_padding_y * 2;
// draw start image
puzzle_image.onload = function() {
    puzzle_context.drawImage(puzzle_image, puzzle_canvas_padding_x, puzzle_canvas_padding_y, puzzle_image_width, puzzle_image_height);
}

function start_puzzle() {
    puzzle_context.clearRect(0, 0, puzzle_canvas.width, puzzle_canvas.height);
    var grid = 3;
    var puzzle_padding_x = puzzle_canvas.width * 0.007;
    var puzzle_padding_y = puzzle_canvas.height * 0.007;
    var part_image_width = (puzzle_canvas.width - puzzle_canvas_padding_x * 2 - puzzle_padding_x * (grid - 1)) / grid;
    var part_image_height = (puzzle_canvas.height - puzzle_canvas_padding_y * 2 - puzzle_padding_y * (grid - 1)) / grid;
    for (var i = 0; i < grid; i++) {
        for (var j = 0; j < grid; j++) {
            puzzle_context.drawImage(puzzle_image,
            puzzle_canvas_padding_x + part_image_width * i + puzzle_padding_x * i, 
            puzzle_canvas_padding_y + part_image_height * j + puzzle_padding_y * j, 
            part_image_width, 
            part_image_height);
        }
    }
}

function imageSelected() {
    alert("hi");
}