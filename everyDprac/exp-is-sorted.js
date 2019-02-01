function defaultComparator(a, b) {
    return a - b;
}

function shortsort(array, comparator) {
    if (!Array.isArray(array)) {
        throw new TypeError('expected array, got ' + (typeof array));
    }
    comparator = comparator || defaultComparator;

    for (let i = 0; i < array.length - 1; i++) {
        let a = array[i + 1];
        let b = array[i];
        let result = comparator(a, b);
        if (result < 0) {
            return false;
        }
    }

    return true;
}

module.exports = shortsort;