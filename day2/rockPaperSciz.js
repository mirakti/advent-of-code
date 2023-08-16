const fs = require('fs');
const st = fs.readFileSync('strategyList.txt', 'utf8');
const roundHelpArray = st.split('\n');
var meScore = 0;
roundHelpArray.forEach((round) => {
    let thisRound = round.split(' ');
    // thisRound.forEach((value) => {
    //     console.log(value);
    // });
    var op = matchChar(thisRound[0]);
    console.log(op);
    var me = matchChar(thisRound[1]);
    console.log(me);
    // console.log(thisRound.length);
    // let thisRound = [];
    // splitThisRound.forEach((element) => {
    //     if (element !== ' ' || element !== null || element !== undefined) {
    //         console.log("Element: " + element);
    //         thisRound.push(element);
    //     };
    // });
    // let roundValues = [];
    // console.log("This Round: " + round + "..");
    // for (var i = 0 ; i < thisRound.length ; i++ ) {
        // console.log("Player Character: " + thisRound[i]);
        // console.log(typeof(player));
        // let buffer = matchChar(thisRound[i]);
        // if (buffer === undefined) {
            // console.log("buffer is undefined: " + thisRound[i]);
            // console.log(i);
            // continue;
        // } else {
            // console.log("matchChar: " + buffer);
            // roundValues.push(buffer);
        // };
    // };
    // console.log(roundValues);
    // if (roundValues.length > 0) {
    //     console.log("checking round");
    //     if (roundValues[0] === roundValues[1]) {
            // console.log("draw, adding: " + (roundValues[1] + 3));
    //         meScore += (roundValues[1] + 3);
    //     } else if (roundValues[0] > roundValues[1]) {
    //         console.log("opponent win");
    //     } else {
            // console.log("me win");
    //     };
    // } else {
        // console.log("roundValues is only 1 value");
    // };
});
function matchChar(character) {
    if (character === "X" ) {
        return 1;
    } else if ( character === "A" || character === "X" ) {
        return 1;
    } else if ( character === "B" || character === "Y" ) {
        return 2;
    } else if ( character === "C" || character === "Z" ) {
        return 3;
    } else {
        console.log("coulnd't match: " + character);
        return 5;
    };
};
// console.log(meScore);
// function matchChar(character) {
//     if ( character === "A" || character === "X" ) {
//         return 1;
//     } else if ( character === "B" || character === "Y" ) {
//         return 2;
//     } else if ( character === "C" || character === "Z" ) {
//         return 3;
//     } else {
//         console.log("coulnd't match: " + character);
//         return 5;
//     };
    // console.log("matching: " + character);
    // let result = 0;
    // switch (character) {
    //     case 'A':
    //     case 'X':
    //         return 1;
            // result = 1;
    //         break;
    //     case 'B':
    //     case 'Y':
    //         return 2;
            // result = 2;
    //         break;
    //     case 'C':
    //     case 'Z':
    //         return 3;
            // result = 3;
    //         break;
    //     default:
    //         console.log("no match for " + character);
            // result = 5;
    // };
    // return result;
// };

// const strategy = {
//     "A": 1, 
//     "B": 2, 
//     "C": 3,
//     "win": 8,
//     "draw": 4,
//     "lose": 0
// };