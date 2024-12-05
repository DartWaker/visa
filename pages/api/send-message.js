// /api/send-message.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Отримуємо дані з тіла запиту
    const { username, tel, area, clientType } = req.body;

    const TOKEN = process.env.TELEGRAM_TOKEN;  // Токен Telegram бота
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;  // ID чату
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;  // URL для запиту до Telegram API

    const message = `Повідомлення з сайту!\n`;
    message += `Ім'я: ${username} \n`;
    message += `Номер телефону: ${tel}\n`;
    message += `Повідомлення: ${area} \n`;
    message += `Тип клієнта: ${clientType} \n`;

    try {
      // Виконуємо POST запит до Telegram API
      const response = await axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'HTML',
        text: message,
      });

      // Повертаємо успішну відповідь
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
      // Якщо сталася помилка при відправці повідомлення
      console.error('Error:', err.message);
      return res.status(500).json({ success: false, error: 'Failed to send message', details: err.message });
    }
  } else {
    // Якщо метод не POST, повертаємо помилку
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
