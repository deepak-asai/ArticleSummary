require('dotenv').config();
const express = require('express');
const config = require('./config');
const summaryService = require('./SummaryApp');

const app = express();

app.get('/summary', async (req, res) => {
    const articleUrl = req.query.articleLink;
    if (!articleUrl) {
        return res.status(400).send('Missing articleLink query parameter');
    }
    console.log('Received request for summary of:', articleUrl);
    try {
        const prompt = `Generate summary for this article. The summary should be less than 60 words. The output should directly convey the information from the article. Don't specify anything about the article. - ${articleUrl}`;
        const summary = await summaryService.getSummary(prompt);
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