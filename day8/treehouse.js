const fs = require('fs');
let file = fs.readFileSync('C:/Users/karim/Desktop/Techstarter/gitrepo/techstarterGit/day8/input.txt', 'utf8');
file = file.split('\n');
// clean up the commands, each line
const eachLineCleaned = [];
file.forEach((cmd) => {
    eachLineCleaned.push(cmd.replace(/(\n\r|\n|\r)/gm, ""));
});

/*

* Game Logic
- Find all trees visible from the outside. So consider view from the right, left, top and bottom
- the height of a tree is a single digit number (1-9)
- a tree is visible if its number is greater then the number(s) of the tree(s) before it

* Ideas
- create 4 2D arrays, one for each point of view
*/



// Split each line into single numbers and push to 2D array



//TODO: function searchLeft() searchRight() searchUp() searchDown()
function lookFromLeft(row, index) {};
function lookFromRight(row, index) {};
function lookFromTop(column, index) {};
function lookFromBottom(column, index) {};
//TODO: limits for borders