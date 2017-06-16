/**
 * Created by Allen on 2017/6/16.
 */

/*
set up puzzle image div and show initial image
 */
var puzzle_div = document.getElementById('puzzle_div');
var puzzle_image_div = document.createElement('div');
puzzle_image_div.style.height = '96%';
puzzle_image_div.style.width = '96%';
puzzle_image_div.style.margin = '2%';
puzzle_image_div.style.position = 'absolute';
puzzle_image_div.style.backgroundImage = "url('img/testImg.png')";
puzzle_image_div.style.backgroundSize = '100% 100%';
puzzle_image_div.style.backgroundRepeat = 'no-repeat';
puzzle_div.appendChild(puzzle_image_div);

function start_puzzle() {
    
}