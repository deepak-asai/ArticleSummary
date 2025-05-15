require('dotenv').config();
const express = require('express');
const config = require('./config');
const summaryService = require('./SummaryApp');

const app = express();

app.get('/summary', async (req, res) => {
    console.log('Received request for summary');
    try {
        const summary = await summaryService.getSummary('Generate summary for this article. The summary should be less than 60 words - https://timesofindia.indiatimes.com/toi-plus/toi-in-depth-stories-on-operation-sindoor/what-us-got-terribly-wrong-while-intervening-between-india-and-pakistan/articleshow/121158048.cms');
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