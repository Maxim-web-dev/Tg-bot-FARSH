import TelegramBot from "node-telegram-bot-api";
import cors from "cors";
import express from "express";
import { parseData } from "./utils/parseData.js";

const token = "7547383848:AAHElVLpE49oL5rH1Ez3hDSdK-bxkqZwLqo";
const webAppUrl = 'https://tg-rest-bot.vercel.app'
// const webAppUrl = "https://fc3d-198-244-233-81.ngrok-free.app";
const bot = new TelegramBot(token, { polling: true });
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.listen(PORT);
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка", {
      reply_markup: {
        keyboard: [[{ text: "Сделать заказ", web_app: { url: webAppUrl } }]],
      },
    });
  }
  if (msg?.web_app_data?.data) {
    const data = msg?.web_app_data?.data;
    const parsedData = parseData(data);
    console.log('parsedData',parsedData);

    // Пример данных, полученных после парсинга
    const user = parsedData.user;
    const products = parsedData.products;

    try {
      // Вставка данных в таблицу orders
      const orderQuery = `
        INSERT INTO orders (user_name, user_email, user_phone, user_comment, user_address_city, user_address_street, user_address_house, user_address_building, user_address_apartment, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
        RETURNING id;
      `;
      const orderValues = [
        user.name,
        user.email,
        user.phone,
        user.comment,
        user.adress.city,
        user.adress.street,
        user.adress.house,
        user.adress.building,
        user.adress.apartment,
      ];

      const res = await client.query(orderQuery, orderValues);
      const orderId = res.rows[0].id; // Получаем id созданного заказа

      // Вставка данных продуктов в таблицу order_products
      for (const product of products) {
        const productQuery = `
          INSERT INTO order_products (order_id, menu_name, quantity)
          VALUES ($1, $2, $3);
        `;
        const productValues = [orderId, product.menu_name, product.quantity];
        await client.query(productQuery, productValues);
      }

      await bot.sendMessage(chatId, `Ваш заказ был успешно сохранен!`);
    } catch (error) {
      console.error("Ошибка при сохранении заказа:", error);
      await bot.sendMessage(
        chatId,
        `Произошла ошибка при сохранении заказа. Попробуйте еще раз.`
      );
    }
  }
});
