const fs = require('fs');
const elfenListeTXT = fs.readFileSync('elfenListe.txt', 'utf8');
var calorienArray = elfenListeTXT.split('\n');
var numberArray = [];
calorienArray.forEach((count) => {
    numberArray.push(parseInt(count));
});
const elfenArray = [0];
var j = 0;
for (let i = 0; i < numberArray.length; i++) {
    // console.log("Testlog: " + numberArray[i] + " type: " + typeof(numberArray[i]));
    if (isNaN(numberArray[i]) || numberArray[i] === 0 || numberArray[i] === undefined) {
        // console.log("Elfe wird hinzugefügt");
        // console.log(numberArray[i]);
        elfenArray.push(0);
        // console.log(elfenArray);
        j++;
    } else {
        // console.log("Zu elfe " + j + " wird " + numberArray[i] + " hinzugefügt");
        elfenArray[j] = (elfenArray[j] + numberArray[i]);
    };
};

console.log("ElfenArray befüllt");


function findHeaviestElve (elveArray) {
    const max = elveArray.reduce((a, b) => Math.max(a, b), -Infinity);
    console.log("Die größte Elfe hat " + max + " Geschenke gebracht");
};
findHeaviestElve(elfenArray);

function findTopThree (elveArray) {
    const topThree = elveArray.sort((a, b) => b - a).slice(0, 3);
    var topThreeSum = 0;
    topThree.forEach((value) => {
        topThreeSum += value;
    });
    console.log("Die drei größten Elfen haben " + topThree[0] + ", " + topThree[1] + " und " + topThree[2] + " Geschenke gebracht");
    console.log("Zusammen sind das: " + topThreeSum);
};
findTopThree(elfenArray);