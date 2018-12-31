function asyncFunction(callback) {
    setTimeout(callback, 200);
}

let color = 'blue';
asyncFunction(() => {
    console.log(`the color is ${color}`);
});
color = 'green';