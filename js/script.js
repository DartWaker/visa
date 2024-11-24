const burgerMenu = document.getElementById('burger-menu');
const menu = document.querySelector('.header-menu');
const menuItems = document.querySelectorAll('.header-menu_item');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('open');
  menu.classList.toggle('open');
});

// Додаємо обробник події для кожного елемента меню
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      burgerMenu.classList.remove('open');
      menu.classList.remove('open');
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