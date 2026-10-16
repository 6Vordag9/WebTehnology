/* exported dishes */

// Массив блюд для страницы оформления заказа.
// Используется в render.js (вывод карточек) и order.js (обработка выбора блюда).
//
// keyword   — уникальное название блюда на латинице (идёт в форму как value)
// name      — название блюда на русском
// price     — цена в рублях (число)
// category  — категория блюда: "soup", "main" или "drink"
// count     — вес или объём порции
// image     — путь к изображению блюда
//
// Блюда намеренно идут не по алфавиту: порядок задаёт render.js
// с помощью метода sort() перед выводом на страницу.

const dishes = [
  {
    keyword: 'chicken-noodle-soup',
    name: 'Куриный суп с лапшой',
    price: 185,
    category: 'soup',
    count: '300 мл',
    image: 'image4.jpg',
  },
  {
    keyword: 'tomato-soup',
    name: 'Томатный суп с базиликом',
    price: 195,
    category: 'soup',
    count: '250 мл',
    image: 'image2.jpg',
  },
  {
    keyword: 'mushroom-cream-soup',
    name: 'Крем-суп из белых грибов',
    price: 245,
    category: 'soup',
    count: '250 мл',
    image: 'image3.jpg',
  },
  {
    keyword: 'pepperoni-pizza',
    name: 'Пицца «Пепперони»',
    price: 365,
    category: 'main',
    count: '450 г',
    image: 'pizza.jpg',
  },
  {
    keyword: 'new-york-hotdog',
    name: 'Хот-дог «Нью-Йорк»',
    price: 270,
    category: 'main',
    count: '200 г',
    image: 'hotdog.jpg',
  },
  {
    keyword: 'burger-classic',
    name: 'Бургер «Классик»',
    price: 385,
    category: 'main',
    count: '250 г',
    image: 'burger.jpg',
  },
  {
    keyword: 'orange-juice',
    name: 'Апельсиновый сок',
    price: 120,
    category: 'drink',
    count: '300 мл',
    image: 'orange_juice.jpg',
  },
  {
    keyword: 'carrot-juice',
    name: 'Морковный сок',
    price: 110,
    category: 'drink',
    count: '300 мл',
    image: 'carrot_jues.jpg',
  },
  {
    keyword: 'apple-juice',
    name: 'Яблочный сок',
    price: 90,
    category: 'drink',
    count: '300 мл',
    image: 'apple_juese.jpg',
  },
];