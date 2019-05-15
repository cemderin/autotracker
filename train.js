const brain = require('brain.js');
const fs = require('fs');

let trainingData = require('./0000--training-data');
console.log(trainingData);

// create dictionary
let dictionary = [];
trainingData.map((item) => {
    item.app.split(' ').forEach(elementParticle => {
        if(!dictionary.includes(elementParticle)) dictionary.push(elementParticle);
    })

    item.title.split(' ').forEach(elementParticle => {
        if(!dictionary.includes(elementParticle)) dictionary.push(elementParticle);
    })
});

// projects
let projects = [];
trainingData.map((item) => {
    if(!projects.includes(item.project)) projects.push(item.project);
});

// encode a record
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

function encodeProject(projectName) {
    let encoded = [];

    projects.forEach(project => {
        if(projectName === project) {
            encoded.push(1);
        } else {
            encoded.push(0);
        }
    })

    return encoded;
}

// encode input
let trans = trainingData.map(item => {
    return {input: encode(item.app, item.title), output: encodeProject(item.project)}
});



const options = {
    log: true,           // console.log() progress periodically
    logPeriod: 1,       // number of iterations between logging
    iterations: 20000,
};

const net = new brain.NeuralNetwork()
net.train(trans, options);

const json = net.toJSON();
fs.writeFileSync('0000--trained-net.json', JSON.stringify(json, null, 2));
fs.writeFileSync('0000--dictionary.json', JSON.stringify(dictionary, null, 2));
fs.writeFileSync('0000--projects.json', JSON.stringify(projects, null, 2));
