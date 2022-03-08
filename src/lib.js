function replaceArrayElements(array, targetId, sourceId) {
    return array.reduce((resultArray, element, id, originalArray) => [
        ...resultArray,
        id === targetId ? originalArray[sourceId] :
        id === sourceId ? originalArray[targetId] :
        element
    ], []);
}

function getFs() {
    if (window && window.node && window.node.fs) {
        return window.node.fs;
    }
    return null;
}

function readFileSync(file) {
    try {
        return window.node.fs.readFileSync(file, "utf8");
    } catch (e) {
        console.log(e.message);
        return "[]";
    }
}

function writeFileSync(file, data) {
    try {
        window.node.fs.writeFileSync(file, data);
    } catch (e) {
        console.log(e.message);
    }
}