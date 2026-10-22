/**
 * Показывает в категории только блюда выбранного типа.
 * @param {HTMLElement} section — секция с атрибутом data-category.
 * @param {string|null} kind — значение data-kind; null — показать все блюда.
 */
function applyFilter(section, kind) {
  section.querySelectorAll('.dish-card').forEach((card) => {
    card.hidden = kind !== null && card.dataset.kind !== kind;
  });
}

/**
 * Включает или выключает активное состояние кнопки фильтра.
 * @param {HTMLElement} button — кнопка фильтра.
 * @param {boolean} isActive — станет ли кнопка активной.
 */
function setFilterState(button, isActive) {
  button.classList.toggle('active', isActive);
  button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
}

/**
 * Обрабатывает клик по кнопке фильтра: показывает блюда выбранного типа
 * и повторным кликом снимает фильтр.
 * @param {MouseEvent} event — событие клика.
 */
function handleFilterClick(event) {
  const button = event.target.closest('.filter-button');

  if (button === null) {
    return;
  }

  const section = button.closest('.menu-section');

  if (section === null) {
    return;
  }

  const wasActive = button.classList.contains('active');

  section.querySelectorAll('.filter-button').forEach((filterButton) => {
    setFilterState(filterButton, false);
  });

  if (wasActive) {
    applyFilter(section, null);
    return;
  }

  setFilterState(button, true);
  applyFilter(section, button.dataset.kind);
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', handleFilterClick);
});
