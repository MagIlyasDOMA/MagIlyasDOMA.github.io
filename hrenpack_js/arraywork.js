"use strict";
function arrayIsEmpty(arr) {
    return arr.length === 0 || !arr[0];
}
function arraysIsEqual(array1, array2, strict = true) {
    if (array1.length !== array2.length)
        return false;
    if (strict)
        return array1.every((value, index) => value === array2[index]);
    else {
        array1.forEach(element => {
            if (!array2.includes(element))
                return false;
        });
        return true;
    }
}
//# sourceMappingURL=arraywork.js.map