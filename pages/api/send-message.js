const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // Завантажуємо змінні середовища з .env

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      // Перевірте, чи є текст повідомлення
      if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required' });
      }

      // Формуємо запит до Telegram API
      const response = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message, // Це важливий параметр
        }
      );

      res.status(200).json({ success: true, response });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
