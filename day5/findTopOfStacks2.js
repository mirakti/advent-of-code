const fs = require('fs');
const instructions = txt.split('\n');

const stacks = {
    1: ['D', 'M', 'S', 'Z', 'R', 'F', 'W', 'N'],
    2: ['W', 'P', 'Q', 'G', 'S'],
    3: ['W', 'R', 'V', 'Q', 'F', 'N', 'J', 'C'],
    4: ['F', 'Z', 'P', 'C', 'G', 'D', 'L'],
    5: ['T', 'P', 'S'],
    6: ['H', 'D', 'F', 'W', 'R', 'L'],
    7: ['Z', 'N', 'D', 'C'],
    8: ['W', 'N', 'R', 'F', 'V', 'S', 'J', 'Q'],
    9: ['R', 'M', 'S', 'G', 'Z', 'W', 'V']
};

function cleanInstruction(instruction) {
    var cleanInstruction = instruction.replace(/(\n\r|\n|\r)/gm, "");
    var result = [];
    cleanInstruction = cleanInstruction.split(" ");
    cleanInstruction.forEach((element) => {
        if (!isNaN(parseInt(element))) {
            result.push(parseInt(element));
        };
    });
    return result;
};

function rearrangeStack(instruction) {
    var anzahl = instruction[0];
    var stackFrom = instruction[1];
    var stackTo = instruction[2];
    var buffer = [];
    for (var i = 0; i < anzahl; i++) {
        buffer.push(stacks[stackFrom].pop());
    };
    for (var i = 0; i < anzahl; i++) {
        stacks[stackTo].push(buffer.pop());
    };
};

instructions.forEach((instruction) => {
    rearrangeStack(cleanInstruction(instruction));
});

Object.values(stacks).forEach((list) => {
    console.log(list[list.length - 1]);
});

/* 
* get instruction and prep it for use into array length 3
* Array[0] = amount
* Array[1] = stack from
* Array[2] = stack to
* pop returns the value Popped
*/