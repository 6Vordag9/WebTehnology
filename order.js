/* global dishes */


const categorySettings = [
  { id: 'soup', title: 'Суп', emptyText: 'Блюдо не выбрано', fieldName: 'soup' },
  { id: 'main', title: 'Главное блюдо', emptyText: 'Блюдо не выбрано', fieldName: 'main_dish' },
  { id: 'drink', title: 'Напиток', emptyText: 'Напиток не выбран', fieldName: 'drink' },
];


const selectedDishes = {};

/**
 * @param {string} keyword 
 * @returns {object|undefined} .
 */
function findDish(keyword) {
  return dishes.find((dish) => dish.keyword === keyword);
}

/**
 * 
 * @param {number} price 
 * @returns {string} 
 */
function formatPrice(price) {
  return `${price}₽`;
}

/**
 * @param {object} setting 
 * @returns {HTMLElement} 
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
 * 
 */
function renderOrderBlock() {
  const list = document.querySelector('#order-categories');
  categorySettings.forEach((setting) => {
    list.appendChild(createCategoryBlock(setting));
  });
}


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


  const isEmpty = selectedCount === 0;

  document.querySelector('#order-empty').hidden = !isEmpty;
  document.querySelector('#order-categories').hidden = isEmpty;
  document.querySelector('#order-total').hidden = isEmpty;
  document.querySelector('#order-total-value').textContent = formatPrice(total);
}

/**

 * @param {string} keyword 
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
 * @param {MouseEvent} event 
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