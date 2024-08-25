import cors from "cors";
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import 'dotenv/config'
// import pkg from 'pg';

import { parseData } from "./utils/parseData.js";

// const { Client } = pkg;

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

const app = express();

app.use(cors());
app.use(express.json());

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'tgbotfarsh',
//   password: 'root',
//   port: 5432, 
// });
// client.connect();

bot.on("message", async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка", {
      reply_markup: {
        keyboard: [[{ text: "Сделать заказ", web_app: { url: process.env.WEBAPPURL } }]],
      },
    });
  }
  if (msg?.web_app_data?.data) {
    const data = msg?.web_app_data?.data;
    const { parsedData, stringOfData, cart} = parseData(data);
    console.log('parsedData', parsedData);

    try {
      // Вставка данных в таблицу orders
      const orderQuery = `
        INSERT INTO orders (user_name, user_email, user_phone, user_comment, user_address_city, user_address_street, user_address_house, user_address_building, user_address_apartment, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
        RETURNING id;
      `;

      // const orderValues = [
      //   parsedData.name,
      //   parsedData.email,
      //   parsedData.phone,
      //   parsedData.comment,
      //   parsedData.city,
      //   parsedData.street,
      //   parsedData.house,
      //   parsedData.building,
      //   parsedData.apartment,
      // ];
      const { cart, ...orderValues } = parsedData

      // const res = await client.query(orderQuery, orderValues);
      // const orderId = res.rows[0].id; // Получаем id созданного заказа

      // // Вставка данных продуктов в таблицу order_products
      // for (const product of cart) {
      //   const productQuery = `
      //     INSERT INTO order_products (order_id, menu_name, quantity)
      //     VALUES ($1, $2, $3);
      //   `;
      //   const productValues = [orderId, product.menu_name, product.quantity];
      //   await client.query(productQuery, productValues);
      // }

      await bot.sendMessage(chatId, `Ваш заказ был успешно сохранен! ${stringOfData}`);
    } catch (error) {
      console.error("Ошибка при сохранении заказа:", error);
      await bot.sendMessage(
        chatId,
        `Произошла ошибка при сохранении заказа. Попробуйте еще раз.`
      );
    }
  }
});
