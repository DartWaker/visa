const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // Це підключає .env файл

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { message } = req.body; // Переконайтеся, що відправляється правильне повідомлення

      // Відправка повідомлення в Telegram
      const response = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        }
      );

      // Відповідь клієнту
      res.status(200).json({ success: true, response });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
