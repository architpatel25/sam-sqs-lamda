"use strict";
const express = require('express');
const app = express();

function buildResponse(message) {
    const response = {
        message: message
    };
    console.log('response: ' + JSON.stringify(response));
    return response;
}
app.get('/', async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {      
        let name = req.query.name;
        if ((name === undefined) || (name === null) || (name == '')) {
            name = 'SAM-CLI with SQS';
        }
        const displayMessage = ('Archit is Testing') + ' ' + name + '!';
        console.log('MSG: ', displayMessage);
        res.send(buildResponse(displayMessage));
    } catch (error) {
        console.error('Error calling API Gateway FROM APP.js FILE:', error);
        res.send(buildResponse('Error calling API Gateway FROM APP.js FILE'));
    }
});

const server = app.listen(process.env.PORT || 3000,
    () => console.log('Listening on port ' + server.address().port));

module.exports = app; 