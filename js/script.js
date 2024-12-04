const burgerMenu = document.getElementById('burger-menu');
const menu = document.querySelector('.header-menu');
const menuItems = document.querySelectorAll('.header-menu_item');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('open');
  menu.classList.toggle('open');
  
  // Забороняємо скрол на body при відкритті меню
  if (menu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Додаємо обробник події для кожного елемента меню
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      burgerMenu.classList.remove('open');
      menu.classList.remove('open');
      
      // Відновлюємо скрол після закриття меню
      document.body.style.overflow = '';
    }
  });
});

// Аккордеон
function accordion() {
  const items = document.querySelectorAll('.accordion__item-trigger')
  items.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentNode
      if (parent.classList.contains('accordion__item-active')) {
        parent.classList.remove('accordion__item-active')
      } else {
        document
          .querySelectorAll('.accordion__item')
          .forEach(child => child.classList.remove('accordion__item-active'))
        parent.classList.add('accordion__item-active')
      }
    })
  })
}
accordion()





document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.about-managers_trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentBlock = trigger.closest('.about-managers_accordion-block');

      if (parentBlock.classList.contains('active')) {
        parentBlock.classList.remove('active');
      } else {
        // Если нужно закрывать другие блоки при открытии одного, раскомментируйте следующий код:
        // document.querySelectorAll('.about-managers_accordion-block.active').forEach(activeBlock => {
        //   activeBlock.classList.remove('active');
        // });

        parentBlock.classList.add('active');
      }
    });
  });
});

window.scrollTo({
  top: 10, // кількість пікселів зверху
  behavior: 'smooth' // плавність анімації
});



// Отримуємо елементи
const modal = document.querySelector('.modal'); // Модальне вікно
const modalWindow = document.querySelector('.modal_window'); // Вікно всередині модального
const openButtons = document.querySelectorAll('.contact-uss'); // Кнопки для відкриття модалки
const closeButton = document.querySelector('.modal_close'); // Кнопка для закриття модалки
const body = document.querySelector('body'); // Тіло сторінки

// Функція для відкриття модального вікна
function openModal() {
  modalWindow.style.display = 'block';
  modal.style.display = 'block';
  body.style.overflow = 'hidden'; // Блокуємо прокручування сторінки
}

// Функція для закриття модального вікна
function closeModal() {
  modalWindow.style.display = 'none';
  modal.style.display = 'none';
  body.style.overflow = ''; // Відновлюємо прокручування сторінки
}

// Додаємо слухачі подій на кнопки для відкриття модалки
openButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

// Додаємо слухач на кнопку закриття модалки
closeButton.addEventListener('click', closeModal);

// Закриваємо модальне вікно при кліку поза ним
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

