const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const moment = require('moment');
const crypto = require('crypto');

const app = express();
const port = process.env.port || 3100;

const jsonParser = bodyParser.json();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:3000']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/results', (req, res) => {
    fs.readFile('./data/results.json', 'utf8', (err, data) => {
        if (err){
            console.error(err);
            res.statusCode = 500;
        }
        else{
            res.send(data);
        }
    });
});

app.get('/available_topics', (req, res) => {
    fs.readFile('./data/topics.json', 'utf8', (err, data) => {
        if (err){
            console.error(err);
            res.statusCode = 500;
        }
        else{
            res.send(data);
        }
    });
});

function handleTestGenerating(data) {

    var fileData = JSON.parse(fs.readFileSync('./data/active_tests.json', 'utf8'));
    
    const finishTime = moment().add(data.time, 'minutes').locale('pl').format('LLL');
    const key = crypto.createHash('md5').update(moment().format('LLL')).digest('base64');

    const newTest = {
                    candidateName: data.name,
                    candidateSurname: data.surname,
                    topic: data.topic,
                    time: data.time,
                    started: false,
                    startTime: undefined,
                    key: key
                };

    fileData.tests.push(newTest);

    fs.writeFile('./data/alive_tests.json', JSON.stringify(fileData, null, 4), (err) =>{
        if(err){
            console.log(err);
        }
    });

    return key;

}

app.get('/test/:key', (req, res) => {
    console.log(req.params.key);
    res.send();
});

app.post('/test', jsonParser, (req, res, next) => {
    res.statusCode = 201;
    const response = {key: handleTestGenerating(req.body)}
    res.send(JSON.stringify(response));
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
