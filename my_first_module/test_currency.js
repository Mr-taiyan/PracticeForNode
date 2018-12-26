const currency = require('./currency');

console.log(currency);// require 返回了一个对象，这个对象就是exports对象，里面的属性为定义中exports上的属性。

console.log('convert 50 Canadian dolloars to the amount of US dollars:');
console.log(currency.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.USToCanadian(30));