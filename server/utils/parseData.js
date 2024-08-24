export const parseData = (data) => {
  const parsedData = JSON.parse(data);
  console.log(parsedData);

  const cart = parsedData.cart
    .map((el) => el.name + " × " + el.quantity)
    .join("\n");

  const string = `
   
   Имя: ${parsedData?.name}
   Почта: ${parsedData?.email}
   Телефон: ${parsedData?.phone}
   Город: ${parsedData?.city}
   Улица: ${parsedData?.street}
   Дом: ${parsedData?.house}
   Корпус: ${parsedData?.building}
   Квартира: ${parsedData?.apartment}
   Комментарий: ${parsedData?.comment}
   
   
   Корзина: 
   ${cart}
   
   Общая стоимость: ${parsedData.totalPrice}
   telegramId: ${parsedData.telegramId}
   `;
  return string;
};
