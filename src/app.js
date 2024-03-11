"use strict";

const axios = require('axios');

// Use Express
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
        const response = await axios.get('https://iox3v2dtqc.execute-api.eu-north-1.amazonaws.com/Prod/hello', {
            params: {
                name: req.query.name
            }
        });

        res.send(buildResponse(response.data.message));
    } catch (error) {
        console.error('Error calling API Gateway FROM APP.js FILE:', error);
        res.send(buildResponse('Error calling API Gateway FROM APP.js FILE'));
    }
});

const server = app.listen(process.env.PORT || 3000,
    () => console.log('Listening on port ' + server.address().port));

module.exports = app; 