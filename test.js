const something = null;

function doSomething() {
    throw something.toString();
}

try {
    doSomething();
} catch(e) {
    console.log('lol');
}