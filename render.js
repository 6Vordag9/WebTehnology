/* global dishes */

// Скрипт вывода блюд на страницу.
// Перебирает массив из dishes.js, сортирует блюда каждой категории
// в алфавитном порядке и добавляет карточки в нужные секции через DOM.

/**
 * Создаёт карточку одного блюда.
 * @param {object} dish — объект блюда из массива dishes.
 * @returns {HTMLElement} готовый элемент карточки.
 */
function createDishCard(dish) {
  const card = document.createElement('div');
  card.className = 'dish-card';
  // По data-dish из массива dishes можно найти выбранное блюдо
  card.dataset.dish = dish.keyword;

  const image = document.createElement('img');
  image.src = dish.image;
  image.alt = dish.name;
  image.loading = 'lazy';

  const price = document.createElement('p');
  price.className = 'dish-price';
  price.textContent = `${dish.price}₽`;

  const name = document.createElement('p');
  name.className = 'dish-name';
  name.textContent = dish.name;

  const weight = document.createElement('p');
  weight.className = 'dish-weight';
  weight.textContent = dish.count;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Добавить';

  card.append(image, price, name, weight, button);

  return card;
}

/**
 * Выводит блюда одной категории в её секцию.
 * @param {HTMLElement} section — секция с атрибутом data-category.
 */
function renderCategory(section) {
  const grid = section.querySelector('.dishes-grid');

  // sort() меняет массив на месте, поэтому предварительно делаем копию
  // через filter() — исходный массив dishes не трогаем.
  // localeCompare с локалью "ru" сравнивает кириллицу по алфавиту.
  const categoryDishes = dishes
    .filter((dish) => dish.category === section.dataset.category)
    .sort((first, second) => first.name.localeCompare(second.name, 'ru'));

  categoryDishes.forEach((dish) => {
    grid.appendChild(createDishCard(dish));
  });
}

/**
 * Выводит все секции меню.
 */
function renderDishes() {
  document.querySelectorAll('.menu-section[data-category]').forEach(renderCategory);
}

document.addEventListener('DOMContentLoaded', renderDishes);