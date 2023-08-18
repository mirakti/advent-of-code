const fs = require('fs');
const allPairsArray = txt.split("\n");
var counter = 0;

function returnPairs(pairArray) {
    var singlePair = pairArray.split(",");
    var firstElf = singlePair[0].split("-");
    var secondElf = singlePair[1].split("-");
    return [firstElf, secondElf];
}
function cleanElfArray(elfArray) {
    var cleanElfArray = [];
    elfArray.forEach((elf) => {
        if (!isNaN(parseInt(elf))) {
            cleanElfArray.push(parseInt(elf));
        } else {
            console.log("Elf is not a number: " + elf);
        };
    });
    return cleanElfArray;
}
function compareElves(elf1, elf2) {
    if ((elf1[0] >= elf2[0] && elf1[1] <= elf2[1]) || (elf2[0] >= elf1[0] && elf2[1] <= elf1[1])) {
        console.log("!!!! Found match of " + elf1 + " and " + elf2);
        counter++;
    } else {
        console.log("No match found");
    };
}
allPairsArray.forEach((pair) => {
    var cleanPair = pair.replace(/(\r\n|\n|\r)/gm, "");
    var elvesStrings = returnPairs(cleanPair);
    var elvesNumbers = [cleanElfArray(elvesStrings[0]), cleanElfArray(elvesStrings[1])];
    compareElves(elvesNumbers[0], elvesNumbers[1]);
});

console.log("Found " + counter + " matches");
    
/*
* Read List
* Split full List into Array
* Take each line and split into two elves
* take each elf and cast from Array of Strings to Range-Array of Numbers 
* check for each elf if the number is lower then lowest or higher then highest 
*/