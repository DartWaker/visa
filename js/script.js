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
  const items = document.querySelectorAll('.accordion__item-trigger');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentNode;
      if (parent.classList.contains('accordion__item-active')) {
        parent.classList.remove('accordion__item-active');
      } else {
        document.querySelectorAll('.accordion__item')
          .forEach(child => child.classList.remove('accordion__item-active'));
        parent.classList.add('accordion__item-active');
      }
    });
  });
}
accordion();

document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.about-managers_trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentBlock = trigger.closest('.about-managers_accordion-block');

      if (parentBlock.classList.contains('active')) {
        parentBlock.classList.remove('active');
      } else {
        parentBlock.classList.add('active');
      }
    });
  });
});

window.scrollTo({
  top: 10, // кількість пікселів зверху
  behavior: 'smooth' // плавність анімації
});

// Модальне вікно та форма
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

// Маска для телефонного номеру з початком +420 або +48
document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('tel');
  const phoneMask = new Inputmask('+9999999999999');  // Маска для телефонного номеру
  phoneMask.mask(phoneInput);  // Підключення маски до поля вводу
});

// Відправка форми через API
document.querySelector('.modal_form').addEventListener('submit', function (e) {
  e.preventDefault();

  const messageData = {
    username: this.username.value,
    tel: this.tel.value,
    area: this.area.value,
    clientType: this.text.value
  };

  // Відправка запиту на сервер
  fetch('/api/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(messageData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Thank you, we will get in touch with you shortly!');
      closeModal(); // Закриваємо модальне вікно
    } else {
      alert('Something went wrong.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Something went wrong.');
  });
});
