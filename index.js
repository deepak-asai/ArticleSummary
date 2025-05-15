require('dotenv').config();
const express = require('express');
const config = require('./config');
const summaryService = require('./SummaryApp');

const app = express();

app.get('/summary', async (req, res) => {
    console.log('Received request for summary');
    try {
        const summary = await summaryService.getSummary('Write a one-sentence bedtime story about a unicorn.');
        res.status(200).send(summary + '\n');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.send(config.message + '\n');
});

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}/`);
});