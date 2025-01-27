import express from 'express';
import axios from 'axios';
import GEMINI_API from '../credentials/geminiapikey.js'

const router = express.Router();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
const API_KEY = GEMINI_API; 

router.post('/', async (req, res) => {
  const userMessage = req.body.message;
  console.log('Получено съобщение от клиента:', userMessage);

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Отговор от Google Gemini API:', JSON.stringify(response.data, null, 2)); 

    const botReply =
      response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content
        ? response.data.candidates[0].content.parts[0].text
        : 'Не мога да отговоря на това.';

    res.json({ reply: botReply });
  } catch (error) {
    console.error('Грешка при комуникация с Google Gemini:', error.response?.data || error.message);
    res.status(500).json({
      reply: 'There was an error processing your request.',
      error: error.response?.data || error.message,
    });
  }
});

export default router;
