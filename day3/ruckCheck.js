const fs = require('fs');
const allRucks = txt.split("\n");
var score = 0;

function matchChar (char) {
    let charCode = char.charCodeAt(0);
    if (charCode > 64 && charCode < 91) {
        return (charCode - 38);
    } else if (charCode > 96 && charCode < 123) {
        return (charCode - 96);
    } else {
        console.log("Something went wrong");
        throw new Error("Something went wrong");
    };
};
function divideSides (rucksack) {
    var rightSide = [];
    var leftSide = [];
    var middle = rucksack.length / 2;
    for (let i = 0; i < middle ; i++) {
        rightSide.push(rucksack[i]);
        leftSide.push(rucksack[(i + middle)]);
    };
    if (rightSide.length !== leftSide.length) {
        console.log("Something went wrong");
        throw new Error("Something went wrong");
    } else {
        return [rightSide, leftSide];
    };
};

function checkRuck (firstMate, secondMate) {
    var matches = [];
    firstMate.forEach((char) => {
        secondMate.forEach((char2) => {
            if (char === char2) {
                console.log("found a match: " + char + " " + char2);
                if (matches.includes(char)) {
                    console.log("match already found");
                } else {
                    matches.push(char);
                };
            };
        });
    });
    return matches;
};
var thisSack = "";
var sides = [];
var match = [];
allRucks.forEach((rucksack) => {
    // * delete lineEndings
    thisSack = rucksack.replace(/(\r\n|\n|\r)/gm, "");
    sides = divideSides(thisSack.trim());
    var leftSide = sides[0];
    var rightSide = sides[1];
    match = checkRuck(leftSide, rightSide);
    match.forEach((char) => {
        score += matchChar(char);
    });
});
console.log("the total score is: " + score);