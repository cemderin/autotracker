const monitor = require('./active-window');
const fs = require('fs');
const date = new Date();
const outputname = [
    date.getFullYear(),
    date.getUTCMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    'collection.json'
].join('-');

let collection = [];

function snap() {
    try {
        monitor.getActiveWindow(window => {
            try {
                let add = {
                    timestamp: new Date(),
                    app: window.app,
                    title: window.title
                };

                collection.push(add);

                fs.writeFileSync(outputname, JSON.stringify(collection, null, 2));

                console.log(add);
            } catch(writeError) {
                console.error('Write error', writeError);
            }
        });
    } catch(monitorError) {
        console.error('Monitor error', monitorError);
    }
}

try {
    setInterval(snap, 1000*15);
    snap();
} catch(setupError) {
    console.log('Setup error', setupError);
}