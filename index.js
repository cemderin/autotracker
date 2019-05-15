const brain = require('brain.js');
const networkData = require('./0000--trained-net');
const dictionary = require('./0000--dictionary');
const projects = require('./0000--projects');
const fs = require('fs');
let sample = require('./0000--collection');

const net = new brain.NeuralNetwork()
net.fromJSON(networkData);

function encode(a, b) {
    let encoded = [];
    dictionary.forEach(dictEntry => {
        if(a.includes(dictEntry)) {
            encoded.push(1);
        } else {
            encoded.push(0);
        }
    });

    dictionary.forEach(dictEntry => {
        if(b.includes(dictEntry)) {
            encoded.push(1);
        } else {
            encoded.push(0);
        }
    });

    return encoded;
}

let guessed = [];
sample.forEach(item => {
    const output = net.run(encode(item.app, item.title));
    const i = output.indexOf(Math.max(...output));
    const project = projects[i];
    console.log(project, output);

    item.project = project;
    guessed.push(item);
});

console.log(guessed);
fs.writeFileSync('output.json', JSON.stringify(guessed, null, 2));

