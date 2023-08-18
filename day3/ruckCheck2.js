const fs = require('fs');
const allRucks = txt.split("\n");
var score = 0;

function turnToArray(ruckSack) {
    var ruckArray = [];
    for (var i = 0; i < ruckSack.length; i++) {
        ruckArray.push(ruckSack[i]);
    };
    if (ruckArray === null || ruckArray === undefined || !ruckArray) {
        throw new Error("ruckArray failed");
    } else {
        return ruckArray;
    };
};
function checkRuck (firstMate, secondMate, thirdMate) {
    var matches = [];
    for (var indexM1 = 0; indexM1 < firstMate.length; indexM1++) {
        for (var indexM2 = 0; indexM2 < secondMate.length; indexM2++) {
            if (firstMate[indexM1] === secondMate[indexM2]) {
                for (var indexM3 = 0; indexM3 < thirdMate.length; indexM3++) {
                    if (firstMate[indexM1] === secondMate[indexM2] && secondMate[indexM2] === thirdMate[indexM3]) {
                        console.log(`Found a match at indices ${indexM1} and ${indexM2} and ${indexM3} with the values ${firstMate[indexM1]} ,  ${secondMate[indexM2]} and ${thirdMate[indexM3]}`);
                        matches.push(thirdMate[indexM3]);
                    } else {};
                };
            } else {};
        };
    };
    if (matches.length === 0) {
        throw new Error("No matches found");
    } else if (matches.length === 1){
        return matches;
    } else if ( matches.length > 1) {
        var thisMatch = matches[0];
        for (var checker = 1; checker < matches.length; checker++) {
            if (matches[checker] !== thisMatch) {
                throw new Error("Different matches err");
            } else {
                var buffArray = [];
                buffArray.push(thisMatch);
                return buffArray;
            };
        };
    } else {
        console.log("Something went wrong with matches: " + matches);
        throw new Error("Something went wrong");
    };
};
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
}
for (var i = 0; i < allRucks.length;  i+=3 ) {
    var firstFriend = allRucks[i].replace(/(\r\n|\n|\r)/gm, "");
    firstFriend = firstFriend.split("");
    var secondFriend = allRucks[i + 1].replace(/(\r\n|\n|\r)/gm, "");
    secondFriend = secondFriend.split("");
    var thirdFriend = allRucks[i + 2].replace(/(\r\n|\n|\r)/gm, "");
    thirdFriend = thirdFriend.split("");
    var match = [];
    match = checkRuck(firstFriend, secondFriend, thirdFriend);
    for (var j = 0; j < match.length; j++) {
        console.log(" j = " + j + " adding: " + match[j]);
        score += matchChar(match[j]);
    };
};
console.log("the total score is: " + score);