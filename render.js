/* global dishes */



/**
 * Создаёт карточку одного блюда.
 * @param {object} dish — объект блюда из массива dishes.
 * @returns {HTMLElement} готовый элемент карточки.
 */
function createDishCard(dish) {
  const card = document.createElement('div');
  card.className = 'dish-card';
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
 * @param {HTMLElement} section — секция с атрибутом data-category.
 */
function renderCategory(section) {
  const grid = section.querySelector('.dishes-grid');
  const categoryDishes = dishes
    .filter((dish) => dish.category === section.dataset.category)
    .sort((first, second) => first.name.localeCompare(second.name, 'ru'));

  categoryDishes.forEach((dish) => {
    grid.appendChild(createDishCard(dish));
  });
}

/**
 */
function renderDishes() {
  document.querySelectorAll('.menu-section[data-category]').forEach(renderCategory);
}

document.addEventListener('DOMContentLoaded', renderDishes);