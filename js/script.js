require('dotenv').config();  // Завантажуємо змінні середовища

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
      document.body.style.overflow = '';
    }
  });
});

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
        parentBlock.classList.add('active');
      }
    });
  });

  // Маска для телефонного номеру
  const phoneInput = document.getElementById('tel');
  const phoneMask = new Inputmask([
    '+420999999999', 
    '+48 999 999 999'
  ]);
  phoneMask.mask(phoneInput);
});

const modal = document.querySelector('.modal');
const modalWindow = document.querySelector('.modal_window');
const openButtons = document.querySelectorAll('.contact-uss');
const closeButton = document.querySelector('.modal_close');
const body = document.querySelector('body');

function openModal() {
  modalWindow.style.display = 'block';
  modal.style.display = 'block';
  body.style.overflow = 'hidden'; 
}

function closeModal() {
  modalWindow.style.display = 'none';
  modal.style.display = 'none';
  body.style.overflow = ''; 
}

openButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

closeButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.querySelector('.modal_form').addEventListener('submit', function (e) {
  e.preventDefault();

  let message = `Повідомлення з сайту!\n`;
  message += `Ім'я: ${this.username.value} \n`;
  message += `Номер телефону: ${this.tel.value}\n`;
  message += `Повідомлення: ${this.area.value} \n`;

  const clientRadioButtons = this.querySelectorAll('input[name="client"]');
  let clientType = 'Не вибрано';
  
  clientRadioButtons.forEach((radio) => {
    if (radio.checked) {
      clientType = radio.value;
    }
  });

  message += `Тип клієнта: ${clientType} \n`;

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'HTML',
    text: message
  })
  .then((res) => {
    this.username.value = "";
    this.tel.value = "";
    this.area.value = "";
    const radioButtons = this.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => radio.checked = false);

    alert("Thank you, we will get in touch with you shortly!");
    closeModal();
  })
  .catch((err) => {
    console.warn(err); 
    alert("Something went wrong.");
    closeModal();
  })
  .finally(() => {
    console.log('end');
  });
});
