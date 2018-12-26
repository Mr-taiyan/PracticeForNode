const canadianDollar = 0.91;

function roundTwo(amount) {
    return Math.round(amount * 100) / 100;
}

exports.canadianToUS = canadian => roundTwo(canadian * canadianDollar);
exports.USToCanadian = us => roundTwo(us / canadianDollar);

console.log(exports);
console.log(module.exports);
console.log(exports === module.exports);
exports = {};
console.log(exports === module.exports);
