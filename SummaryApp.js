require('dotenv').config();
const OpenAI = require("openai");

class SummaryService {
    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || "",
        });
    }

    async getSummary(input) {
        const response = await this.client.responses.create({
            model: "gpt-4.1",
            input
        });
        return response.output_text;
    }
}

module.exports = new SummaryService();
