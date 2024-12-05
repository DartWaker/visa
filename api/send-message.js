import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, tel, area, clientType } = req.body;

    // Отримуємо змінні середовища
    const TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    // Формуємо повідомлення
    const message = `Повідомлення з сайту!\n`;
    message += `Ім'я: ${username} \n`;
    message += `Номер телефону: ${tel}\n`;
    message += `Повідомлення: ${area} \n`;
    message += `Тип клієнта: ${clientType} \n`;

    try {
      // Відправка повідомлення через Telegram API
      await axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'HTML',
        text: message
      });

      // Відповідаємо клієнту, що повідомлення надіслано
      return res.status(200).json({ success: true });
    } catch (err) {
      // Якщо сталася помилка
      return res.status(500).json({ success: false, error: err.message });
    }
  } else {
    // Якщо метод не POST
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
