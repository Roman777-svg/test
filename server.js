const express = require('express');
const { v4: uuidv4 } = require('uuid');
const openai = require('openai');

const app = express();

// Установите свой API-ключ OpenAI
const apiKey = '0k1I5k4EmtwHjRAjjv5eT3BlbkFJdWwhuYVzSPZbd3QYY9MS';

// Инициализация экземпляра OpenAI
const openaiInstance = new openai.OpenAI(apiKey);

app.use(express.json());
app.use(express.static('public'));

// Обработка POST-запроса на /chat
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openaiInstance.complete({
      engine: 'davinci-codex',
      prompt: `ChatGPT: ${userMessage}\n`,
      maxTokens: 100,
      temperature: 0.6,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      stop: '\n',
    });

    const botMessage = response.choices[0].text.trim();

    res.json({ botMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
