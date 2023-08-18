const fs = require('fs');
file = file.split('\n');
// clean up the commands, each line
const eachLineCleaned = [];
file.forEach((cmd) => {
    eachLineCleaned.push(cmd.replace(/(\n\r|\n|\r)/gm, ""));
});
// split into individual numbers per line
const numbersArray = [];
eachLineCleaned.forEach((line) => {
    numbersArray.push(line.split(""));
});
// deep copy of numbers
const viewFromLeft = JSON.parse(JSON.stringify(numbersArray));
const viewFromRight = JSON.parse(JSON.stringify(numbersArray));
// right view is reverse of left view
viewFromRight.forEach((line) => {
    line.reverse();
});

// top view needs to be transposed
const viewFromTop = [];
for (let i = 0; i < numbersArray.length; i++) {
    viewFromTop.push([]);
    for (let j = 0; j < numbersArray[i].length; j++) {
        viewFromTop[i].push(numbersArray[j][i]);
    };
};
// bottom view is reverse of top view
const viewFromBottom = JSON.parse(JSON.stringify(viewFromTop)); 
viewFromBottom.forEach((line) => {
    line.reverse();
});

/*

* Game Logic
- Find all trees visible from the outside. So consider view from the right, left, top and bottom
- the height of a tree is a single digit number (1-9)
- a tree is visible if its number is greater then the number(s) of the tree(s) before it

* Ideas
- create 4 2D arrays, one for each point of view
*/

console.log(numbersArray);

//TODO: function searchForHighestNumber and its index