const fs = require('fs');
let file = fs.readFileSync('C:/Users/karim/Desktop/eigeneProjekte/advent-of-code/day7/cmds.txt', 'utf8');
file = file.split('\n');
const fileLineArray = [];
// clean up the commands, each line
file.forEach((cmd) => {
    fileLineArray.push(cmd.replace(/(\n\r|\n|\r)/gm, ""));
});

// create Class for Directories as nodes
class Directory {
    constructor(name) {
        this.name = name;
        this.parent = null;
        this.level = null;
        this.size = 0;
        this.files = [];
        this.children = [];
    }
    // needs Child and Parent as index for reference
    addChild(child) {
        this.children.push(child);
    }
    setParent(parent) {
        this.parent = parent;
    }
    // needs level for unique identification, as no two directories with the same name can exist in the same level
    setLevel(level) {
        this.level = level;
    }
    addSize(size) {
        this.size += size;
    }
    addFiles(file) {
        this.files.push(file);
    }
}
class File {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}

const fileStructureArray = [];
var level = 0;
var currentDirIndex;
// start by calling every line and split command into array
fileLineArray.forEach((line) => {
    checkCmd(line.split(" "));
});

function checkCmd(line) {
    if (line[0] === "$") {
        handleCommand(line);
    } else if (line[0] === "dir") {
        handleDir(line);
    } else if (!isNaN(parseInt(line[0]))) {
        // console.log(`adding ${line[0]} to ${fileStructureArray[currentDirIndex].name}`);
        // fileStructureArray[currentDirIndex].addSize(parseInt(line[0]));
        //TODO: logic for handling files
        handleFile(line);
    } else {
        // console.log("error at checkCmd - probably unexpected input: " + line);
    };
}
function handleFile(line) {
    // check if file exists and if not add new file
    let thisFile = fileStructureArray[currentDirIndex].files.findIndex((file) => ( file.name === line[1] ));
    if (thisFile === -1) {
        // add new file
        fileStructureArray[currentDirIndex].addFiles(new File(line[1], parseInt(line[0])));
    } else {
        // console.log(`file ${line[1]} already exists`);
    };
}
function handleCommand(line) {
    // first command is changing into root directory
    // root directory needs to be initialized
    if (fileStructureArray.length === 0) {
        fileStructureArray.push(new Directory("root"));
        fileStructureArray[0].setLevel(level);
        currentDirIndex = 0;
    } else if (line[1] === "cd") {
        // change directory logic
        changeDir(line);
    } else {
        // console.log(`listing files in ${fileStructureArray[currentDirIndex].name}`);

    };
};
function changeDir(line) {
    // either go down or go up
    if (line[2] === "..") {
        // go up
        if (level === 0) {
            // console.log("already in root directory");
        } else {
            level--;
            currentDirIndex = fileStructureArray[currentDirIndex].parent;
        };
    } else {
        // go down one edge, find dir in array and update currentDirIndex
        level++;
        currentDirIndex = fileStructureArray.findIndex((dir) => ( dir.name === line[2] && dir.level === level && dir.parent === currentDirIndex));
    };
}
function handleDir(line) {
    // check if directory exists and if not add new directory
    let dirIndex = fileStructureArray.findIndex((dir) => ( dir.name === line[1] && dir.level === level + 1 && dir.parent === currentDirIndex));
    if (dirIndex === -1) {
        // add new directory
        fileStructureArray.push(new Directory(line[1]));
        fileStructureArray[fileStructureArray.length - 1].setParent(currentDirIndex);
        fileStructureArray[fileStructureArray.length - 1].setLevel(level + 1);
        fileStructureArray[currentDirIndex].addChild(fileStructureArray.length - 1);
    } else {
        // console.log(`directory ${line[1]} already exists`);
    };
};

// console.log(`this is the fileStructureArray: ${fileStructureArray}`);

// get the Sum of all directory-sizes where each directoy has a size <= 100.000
let counter = 0;
function getFileSums(filesArray) {
    let sum = 0;
    filesArray.forEach((file) => {
        sum += file.size;
    });
    return sum;
}
// recursive function to get all child-directory sizes
function getAllDirSizes(childArray) {
    let dirSize = 0;
    childArray.forEach((child) => {
        dirSize += getFileSums(fileStructureArray[child].files);
        if (fileStructureArray[child].children.length > 0) {
            dirSize += getAllDirSizes(fileStructureArray[child].children);
        } else {};
    });
    return dirSize;
}
var totalUsedSpace = getAllDirSizes(fileStructureArray[0].children);
console.log(`The Total used space is ${totalUsedSpace}`);
//* iterate in reverse order through fileStructureArray
// if directory has children, call recursive function to get all child-directory sizes
for (var i= fileStructureArray.length - 1; i >= 0; i--) {
    let dirSize = getFileSums(fileStructureArray[i].files);
    if (fileStructureArray[i].children.length === 0 && dirSize <= 100000) {
        // console.log(`directory ${fileStructureArray[i].name} at index ${i} has no children and size ${dirSize}`);
        counter += dirSize;
    } else if (fileStructureArray[i].children.length > 0) {
        dirSize += getAllDirSizes(fileStructureArray[i].children);
        if (dirSize <= 100000) {
            // console.log(`directory ${fileStructureArray[i].name} has size ${dirSize}`);
            counter += dirSize;
        } else {};
    } else {
    };
};
var currentSpace = totalUsedSpace - counter;
console.log(`The currentSpace would be ${currentSpace}`)

var totalSpace = 70000000;
var minSpace = 40000000;
console.log(`The file or directory to be deleted needs to be at least ${(currentSpace-minSpace)} bytes in size`);
var findSize = currentSpace - minSpace;

for (var i= fileStructureArray.length - 1; i >= 0; i--) {
    let dirSize = getFileSums(fileStructureArray[i].files);
    if (fileStructureArray[i].children.length === 0 && dirSize >= findSize) {
        console.log(`directory ${fileStructureArray[i].name} at index ${i} has no children and size ${dirSize}`);
        checkMostFitting(dirSize);
    } else if (fileStructureArray[i].children.length > 0) {
        dirSize += getAllDirSizes(fileStructureArray[i].children);
        if (dirSize >= findSize) {
            // directory qualifies criteria
            checkMostFitting(dirSize);
            console.log(`directory ${fileStructureArray[i].name} at index ${i} has no children and size ${dirSize}`);
        } else {};
    } else {
    };
};
var mostFitting = totalSpace;
function checkMostFitting(compareSize) {
    if (compareSize < mostFitting) {
        mostFitting = compareSize;
    } else {};
}
console.log(`The most fitting file or directory to be deleted is ${mostFitting} bytes in size`);