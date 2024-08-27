import cors from "cors";
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { parseData } from "./utils/parseData.js";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import Order from "./schemas/order.js";

const uri =
  "mongodb+srv://admin:root@tgfarsh.65swl4s.mongodb.net/?retryWrites=true&w=majority&appName=tgfarsh";

mongoose.connect(uri);

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

const app = express();

app.use(cors());
app.use(express.json());

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка", {
      reply_markup: {
        keyboard: [
          [{ text: "Сделать заказ", web_app: { url: process.env.WEBAPPURL } }],
          [{ text: "Техподдержка" }],
        ],
        resize_keyboard: true,
      },
    });
  }

  if (text === "Техподдержка") {
    await bot.sendMessage(
      chatId,
      `😔Проблемы с заказом ?

❌Заказали что-то лишнее или хотите отменить заказ?

❤️С радостью вам поможем - обратитесь в поддержку по номеру +7 (777) 777-77-77`
    );
  }

  if (msg?.web_app_data?.data) {
    const data = msg?.web_app_data?.data;
    const { parsedData, stringOfData, cart } = parseData(data);
    console.log("parsedData", parsedData);

    try {
      const order = new Order({
        date: new Date(),
        user: {
          name: parsedData.name,
          email: parsedData.email,
          phone: parsedData.phone,
          comment: parsedData.comment,
          address: {
            city: parsedData.city,
            street: parsedData.street,
            house: parsedData.house,
            building: parsedData.building,
            apartment: parsedData.apartment,
          },
        },
        products: parsedData.cart.map((product) => ({
          menu_name: product.name,
          quantity: product.quantity,
        })),
      });

      // Сохранение заказа в MongoDB
      await order.save();

      await bot.sendMessage(
        chatId,
        `Ваш заказ был успешно сохранен! ${stringOfData}`
      );
    } catch (error) {
      console.error("Ошибка при сохранении заказа:", error);
      await bot.sendMessage(
        chatId,
        `Произошла ошибка при сохранении заказа. Попробуйте еще раз.`
      );
    }
  }
});
