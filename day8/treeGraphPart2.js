// This is day8 of the advent of code challange with a trial to solve it using a graph
// Thanks for checking in :)
// go fetch data:
const fs = require('fs');
const { start } = require('repl');
let file = fs.readFileSync('C:/Users/karim/Desktop/eigeneProjekte/advent-of-code/day8/input.txt', 'utf8');
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
// lets create the Tree class, with each tree being a vertice in the graph and having a maximum of 4 edges
class Tree {
    constructor(height, x, y) {
        this.height = height;
        // indecies of the tree in the originial data 
        this.x = x;
        this.y = y;
        // relation to other trees
        this.west = null;
        this.east = null;
        this.north = null;
        this.south = null;
        // view distance
        this.viewDistance = 0;
    }
    setWestNeighboor(tree) {
        this.west = tree;
    }
    setEastNeighboor(tree) {
        this.east = tree; 
    }
    setNorthNeighboor(tree) {
        this.north = tree;
    }
    setSouthNeighboor(tree) {
        this.south = tree;
    }
    setViewDistance(distance) {
        this.viewDistance = distance;
    }
}
// create a graph of trees
const treeGraph = [];
for (let i = 0; i < numbersArray.length; i++) {
    treeGraph.push([]);
    for (let j = 0; j < numbersArray[i].length; j++) {
        treeGraph[i].push(new Tree(numbersArray[i][j], i, j));
    };
};
// set neighboors considering the borders where there cant be neighboors
for (let i = 0; i < treeGraph.length; i++) {
    for (let j = 0; j < treeGraph[i].length; j++) {
        if (i === 0 && j === 0) {
            // only East and Sout Neighboors
            treeGraph[i][j].setEastNeighboor(treeGraph[i][j+1]);
            treeGraph[i][j].setSouthNeighboor(treeGraph[i+1][j]);
        } else if (i === numbersArray.length - 1 && j === numbersArray[i].length - 1) {
            // only West and North Neighboors
            treeGraph[i][j].setWestNeighboor(treeGraph[i][j-1]);
            treeGraph[i][j].setNorthNeighboor(treeGraph[i-1][j]);
        } else if (i === 0) {
            // only West, East and South Neighboors
            treeGraph[i][j].setWestNeighboor(treeGraph[i][j-1]);
            treeGraph[i][j].setEastNeighboor(treeGraph[i][j+1]);
            treeGraph[i][j].setSouthNeighboor(treeGraph[i+1][j]);
        } else if (i === numbersArray.length - 1) {
            // only West, East and North Neighboors
            treeGraph[i][j].setWestNeighboor(treeGraph[i][j-1]);
            treeGraph[i][j].setEastNeighboor(treeGraph[i][j+1]);
            treeGraph[i][j].setNorthNeighboor(treeGraph[i-1][j]);
        } else if (j === 0) {
            // only East, North and South Neighboors
            treeGraph[i][j].setEastNeighboor(treeGraph[i][j+1]);
            treeGraph[i][j].setNorthNeighboor(treeGraph[i-1][j]);
            treeGraph[i][j].setSouthNeighboor(treeGraph[i+1][j]);
        } else if (j === numbersArray[i].length - 1) {
            // only West, North and South Neighboors
            treeGraph[i][j].setWestNeighboor(treeGraph[i][j-1]);
            treeGraph[i][j].setNorthNeighboor(treeGraph[i-1][j]);
            treeGraph[i][j].setSouthNeighboor(treeGraph[i+1][j]);
        } else if (i === numbersArray.length - 1 && j === 0) {
            // Neighboors in East and North 
            treeGraph[i][j].setEastNeighboor(treeGraph[i][j+1]);
            treeGraph[i][j].setNorthNeighboor(treeGraph[i-1][j]);
        } else if (i === 0 && j === numbersArray[i].length - 1) {
            // Neighboors in West and South 
            treeGraph[i][j].setWestNeighboor(treeGraph[i][j-1]);
            treeGraph[i][j].setSouthNeighboor(treeGraph[i+1][j]);
        } else { 
            // Neighboors in all directions
            treeGraph[i][j].setWestNeighboor(treeGraph[i][j-1]);
            treeGraph[i][j].setEastNeighboor(treeGraph[i][j+1]);
            treeGraph[i][j].setNorthNeighboor(treeGraph[i-1][j]);
            treeGraph[i][j].setSouthNeighboor(treeGraph[i+1][j]);
        };
    };
};
// function for travelling the graph & calculating the view distance for each tree 
/*
* Pseudocode
First we calculate each view distance for each tree
- For each row of tree
- For each tree in that row
- travel in a direction
- increment counter by 1 for each tree passed
- if the next tree is bigger than the starting tree, stop
- do so for all directions
- multiply the counters for each direction
- save value to the tree

Second we find the tree with the highest view distance
- for each row of tree
- for each tree in that row
- compare view distance to the highest view distance
- if higher, save the tree
*/

//* calculating the view distance for any direction
function getViewDistanceNumber(startingTree, direction) {
    var visibleDistance = 1; 
    var nextTree = startingTree[direction];
    if (nextTree === null || nextTree === undefined) {
        return visibleDistance;
    } else {
        while(nextTree[direction] != null) {
            // can we look over the next tree?
            if (nextTree.height >= startingTree.height) {
                break;
            } else {
                visibleDistance++;
                nextTree = nextTree[direction];
            };
        };
    };
    return visibleDistance;
};
//* calculating the scenic view distance for each tree
treeGraph.forEach((row) => {
    row.forEach((tree) => {
        let westView = getViewDistanceNumber(tree, "west");
        let eastView = getViewDistanceNumber(tree, "east");
        let northView = getViewDistanceNumber(tree, "north");
        let southView = getViewDistanceNumber(tree, "south");
        tree.setViewDistance(westView * eastView * northView * southView);
    });
});

//* finding the tree with the most scenic view
var highestView = 0;
treeGraph.forEach((row) => {
    row.forEach((tree) => {
        if (tree.viewDistance > highestView) {
            console.log(`The highest view currently is ${tree.viewDistance} ; and the tree is at ${tree.x}, ${tree.y}`);
            highestView = tree.viewDistance;
        };
    });
});
