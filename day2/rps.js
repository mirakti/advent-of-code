const fs = require('fs');
const roundHelpArray = st.split('\n');
var meScore = 0;
// console.log("roundHelpArray: " + roundHelpArray.length);
function matchChar(character) {
    // console.log("character: " + character);
    if ( character === "A" || character === "X" ) {
        return 1;
    } else if ( character === "B" || character === "Y" ) {
        return 2;
    } else if ( character === "C" || character === "Z" ) {
        return 3;
    } else {
        console.log("coulnd't match: " + character);
        throw new Error("coulnd't match: " + character);
    };
};
function checkScore(him, me) {
    if (him === me) {
        return 3;
    } else if (him === 1 && me === 3 || him === 2 && me === 1 || him === 3 && me === 2) {
        return 0;
    } else if (him === 3 && me === 1 || him === 1 && me === 2 || him === 2 && me === 3) {
        return 6;
    } else {
        console.log("Something went wrong");
        throw new Error("Something went wrong");
    };
};
function checkScoreSecond(me) {
    switch (me) {
        case 1:
            return 0;
            break;
        case 2:
            return 3;
            break;
        case 3:
            return 6;
            break;
        default:
            console.log("Something went wrong");
            throw new Error("Something went wrong");
    };
};
    // switch (him, me) {
    //     case (1, 1):
    //     case (3, 2):
    //     case (2, 3):
    //         return 3;
    //     case (1, 2):
    //     case (2, 1):
    //     case (3, 3):
    //         return 1;
    //     case (3, 1):
    //     case (2, 2):
    //     case (1, 3):
    //         return 2;
    // switch (him, me) {
    //     case (1, 1):
    //     case (2, 2):
    //     case (3, 3): 
    //         return 3;
    //         break;
    //     case(1, 3):
    //     case(2, 1):
    //     case(3, 2):
    //         return 0;
    //         break;
    //     case(3, 1):
    //     case(1, 2):
    //     case(2, 3):
    //         return 6;
    //         break;
    //     default:
    //         console.log("Something went wrong");
    //         throw new Error("Something went wrong");
    // };
var thisRound = [];
var op = 0;
var me = 0;
var roundRes = 0;
var choice = 0;
roundHelpArray.forEach((round) => {
    // b++;
    thisRound = round.split(' ');
    op = matchChar(thisRound[0].trim());
    me = matchChar(thisRound[1].trim());
    // roundRes = checkScore(op, me);
    roundRes = checkScoreSecond(me);
    if (roundRes === 0) {
        switch (op) {
            case 1:
                choice = 3;
                break;
            case 2:
                choice = 1;
                break;
            case 3:
                choice = 2;
                break;
            default:
                console.log("Something went wrong");
                throw new Error("Something went wrong");
        };
    } else if (roundRes === 3) {
        switch (op) {
            case 1:
                choice = 1;
                break;
            case 2:
                choice = 2;
                break;
            case 3:
                choice = 3;
                break;
            default:
                console.log("Something went wrong");
                throw new Error("Something went wrong");
        };
    } else if (roundRes === 6) {
        switch (op) {
            case 1:
                choice = 2;
                break;
            case 2:
                choice = 3;
                break;
            case 3:
                choice = 1;
                break;
            default:
                console.log("Something went wrong");
                throw new Error("Something went wrong");
        };
    } else {
        console.log("Something went wrong");
        throw new Error("Something went wrong");
    };
    meScore += (roundRes + choice);
    // if (op === me) {
    //     console.log("We draw, adding: " + (me + 3));
    //     meScore = (meScore + me + 3);
    // } else if (op < me) {
    //     console.log("I lost, adding: " + (me));
    //     meScore = (meScore + me);
    // } else if (op > me) {
    //     console.log("I win, adding: " + (me + 6));
    //     meScore = (meScore + me + 6);
    // } else {
    //     console.log("Something went wrong");
    // };
});
// console.log("b: " + b);
console.log("meScore: " + meScore);