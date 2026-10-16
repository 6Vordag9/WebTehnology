/* global dishes */

// Скрипт выбора блюд: добавление блюда в «Ваш заказ», подсчёт стоимости
// и подстановка выбранных блюд (их keyword) в скрытые поля формы.

// Описание категорий: подпись в блоке «Ваш заказ», текст для пустой
// категории и имя скрытого поля формы, в которое уходит keyword блюда.
const categorySettings = [
  { id: 'soup', title: 'Суп', emptyText: 'Блюдо не выбрано', fieldName: 'soup' },
  { id: 'main', title: 'Главное блюдо', emptyText: 'Блюдо не выбрано', fieldName: 'main_dish' },
  { id: 'drink', title: 'Напиток', emptyText: 'Напиток не выбран', fieldName: 'drink' },
];

// Блюда, выбранные пользователем: категория -> объект блюда
const selectedDishes = {};

/**
 * Возвращает блюдо из массива dishes по его keyword.
 * @param {string} keyword — название блюда на латинице.
 * @returns {object|undefined} объект блюда.
 */
function findDish(keyword) {
  return dishes.find((dish) => dish.keyword === keyword);
}

/**
 * Возвращает цену в виде строки: 195 -> "195₽".
 * @param {number} price — цена блюда.
 * @returns {string} цена с символом валюты.
 */
function formatPrice(price) {
  return `${price}₽`;
}

/**
 * Создаёт блок категории («Суп», «Главное блюдо», «Напиток»)
 * внутри раздела «Ваш заказ».
 * @param {object} setting — описание категории из categorySettings.
 * @returns {HTMLElement} элемент блока категории.
 */
function createCategoryBlock(setting) {
  const block = document.createElement('div');
  block.className = 'order-category';
  block.dataset.category = setting.id;

  const title = document.createElement('h4');
  title.className = 'order-category-title';
  title.textContent = setting.title;

  const value = document.createElement('p');
  value.className = 'order-category-value';
  value.id = `order-value-${setting.id}`;

  block.append(title, value);

  return block;
}

/**
 * Создаёт все блоки категорий и кладёт их в раздел «Ваш заказ».
 */
function renderOrderBlock() {
  const list = document.querySelector('#order-categories');
  categorySettings.forEach((setting) => {
    list.appendChild(createCategoryBlock(setting));
  });
}

/**
 * Перерисовывает раздел «Ваш заказ» и «Стоимость заказа»
 * по текущему состоянию выбора.
 */
function updateOrder() {
  let total = 0;
  let selectedCount = 0;

  categorySettings.forEach((setting) => {
    const dish = selectedDishes[setting.id];
    const value = document.querySelector(`#order-value-${setting.id}`);
    const field = document.querySelector(`input[name="${setting.fieldName}"]`);

    if (dish) {
      total += dish.price;
      selectedCount += 1;
      value.textContent = `${dish.name} ${formatPrice(dish.price)}`;
      field.value = dish.keyword;
    } else {
      value.textContent = setting.emptyText;
      field.value = '';
    }
  });

  // Если не выбрано ни одного блюда, показываем «Ничего не выбрано»,
  // а блоки категорий и стоимость заказа скрываем.
  const isEmpty = selectedCount === 0;

  document.querySelector('#order-empty').hidden = !isEmpty;
  document.querySelector('#order-categories').hidden = isEmpty;
  document.querySelector('#order-total').hidden = isEmpty;
  document.querySelector('#order-total-value').textContent = formatPrice(total);
}

/**
 * Выбирает блюдо по keyword: записывает его в заказ, снимает выделение
 * с предыдущего блюда этой же категории и выделяет новое.
 * @param {string} keyword — название блюда на латинице.
 */
function selectDish(keyword) {
  const dish = findDish(keyword);

  if (dish === undefined) {
    return;
  }

  const previousDish = selectedDishes[dish.category];

  if (previousDish !== undefined) {
    const previousCard = document.querySelector(`[data-dish="${previousDish.keyword}"]`);

    if (previousCard !== null) {
      previousCard.classList.remove('dish-selected');
    }
  }

  const card = document.querySelector(`[data-dish="${dish.keyword}"]`);

  if (card !== null) {
    card.classList.add('dish-selected');
  }

  selectedDishes[dish.category] = dish;

  updateOrder();
}

/**
 * Сбрасывает выбор: убирает выделение карточек и очищает «Ваш заказ».
 */
function resetOrder() {
  Object.keys(selectedDishes).forEach((category) => {
    delete selectedDishes[category];
  });

  document.querySelectorAll('.dish-selected').forEach((card) => {
    card.classList.remove('dish-selected');
  });

  updateOrder();
}

/**
 * Обрабатывает клик по кнопке «Добавить» в любой карточке блюда.
 * @param {MouseEvent} event — событие клика.
 */
function handleCardClick(event) {
  const card = event.target.closest('.dish-card');

  if (card === null) {
    return;
  }

  selectDish(card.dataset.dish);
}

document.addEventListener('DOMContentLoaded', () => {
  renderOrderBlock();
  updateOrder();

  document.addEventListener('click', handleCardClick);

  document.querySelector('.order-form').addEventListener('reset', resetOrder);
});