const fs = require('fs');
const codeArray = code.split('');

for (var i = 0; i < codeArray.length; i++ ) {
    var lastFour = codeArray.slice(i, i + 14);
    var compared = [];
    for (var j = 0; j < lastFour.length; j++) {
        if (!compared.includes(lastFour[j])) {
            compared.push(lastFour[j]);
        } else {
            break;
        };
    };
    if (compared.length === 14) {
        console.log(`Found 14 different Chars ${lastFour} at index ${i+14}`);
        break;
    } else {
        continue;
    };
}