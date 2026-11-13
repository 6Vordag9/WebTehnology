/* global dishes */


const categorySettings = [
  { id: 'soup', title: 'Суп', emptyText: 'Блюдо не выбрано', fieldName: 'soup' },
  { id: 'main', title: 'Главное блюдо', emptyText: 'Блюдо не выбрано', fieldName: 'main_dish' },
  { id: 'salad', title: 'Салат/стартер', emptyText: 'Блюдо не выбрано', fieldName: 'salad' },
  { id: 'drink', title: 'Напиток', emptyText: 'Напиток не выбран', fieldName: 'drink' },
  { id: 'dessert', title: 'Десерт', emptyText: 'Десерт не выбран', fieldName: 'dessert' },
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

function getOrderError() {
  const hasSoup = selectedDishes.soup !== undefined;
  const hasMain = selectedDishes.main !== undefined;
  const hasSalad = selectedDishes.salad !== undefined;
  const hasDrink = selectedDishes.drink !== undefined;
  const hasDessert = selectedDishes.dessert !== undefined;
  const hasBaseDish = hasSoup || hasMain || hasSalad;

  if (!hasBaseDish) {
    if (!hasDrink && !hasDessert) {
      return 'Ничего не выбрано. Выберите блюда для заказа';
    }

    return 'Выберите главное блюдо';
  }

  if (!hasSoup && !hasMain) {
    return 'Выберите суп или главное блюдо';
  }

  if (hasSoup && !hasMain && !hasSalad) {
    return 'Выберите главное блюдо/салат/стартер';
  }

  if (!hasDrink) {
    return 'Выберите напиток';
  }

  return null;
}

function showNotification(message) {
  const previousNotification = document.querySelector('.notification');

  if (previousNotification !== null) {
    previousNotification.remove();
  }

  const overlay = document.createElement('div');
  overlay.className = 'notification';

  const box = document.createElement('div');
  box.className = 'notification-box';

  const text = document.createElement('p');
  text.className = 'notification-text';
  text.textContent = message;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'notification-button';
  button.textContent = 'Окей 👌';

  button.addEventListener('click', () => {
    overlay.remove();
  });

  box.append(text, button);
  overlay.append(box);
  document.body.append(overlay);
}

function handleSubmit(event) {
  const error = getOrderError();

  if (error === null) {
    return;
  }

  event.preventDefault();
  showNotification(error);
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
  document.querySelector('.order-form').addEventListener('submit', handleSubmit);
});