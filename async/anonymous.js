function asyncFunction(callback) {
    setTimeout(callback, 200);
}

let color = 'blue';

// this.name = 'taiyan';
(color => {
    // this.name = 'chen';
    asyncFunction(() => {
        // console.log(this.name);
        console.log('the color is ', color);
    });
})(color);

color = 'green';
// console.log(this.name + '1');