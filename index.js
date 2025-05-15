require('dotenv').config();
const express = require('express');
const config = require('./config');
const summaryService = require('./SummaryApp');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/summary', async (req, res) => {
    const articleUrl = req.query.articleLink;
    if (!articleUrl) {
        return res.status(400).send('Missing articleLink query parameter');
    }
    console.log('Received request for summary of:', articleUrl);
    try {
        const prompt = `Generate a summary of less than 60 words for the article at this link: ${articleUrl}. The summary should directly convey the main information from the article without mentioning that it is a summary or referring to the article itself`;
        const summary = await summaryService.getSummary(prompt);
        res.status(200).send(summary + '\n');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}/`);
});