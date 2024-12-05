// pages/api/send-message.js

import axios from 'axios'; // або require('axios') для CommonJS

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, tel, area, clientType } = req.body;
    
    // Отримуємо змінні з середовища
    const TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const telegramMessage = `
      Повідомлення з сайту:
      Ім'я: ${username}
      Номер телефону: ${tel}
      Повідомлення: ${area}
      Тип клієнта: ${clientType}
    `;

    try {
      const response = await axios.post(URI_API, {
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      });

      // Якщо повідомлення успішно відправлено
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Telegram API Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Непідтримуваний метод
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
