const navigation = document.querySelector('.navigation');
const btnHeaderMenu = document.querySelector('.header__toggle');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuClose = document.querySelector('.burger-menu-close')

const onKeyupEsc = function (evt) {
  if (evt.keyCode == 27){
    navigation.classList.add('hidden');
    burgerMenuClose.classList.add('hidden');
    burgerMenu.classList.remove('hidden');
  }
}

const onClickBtnHeaderMenu = function (evt) {
  evt.preventDefalt;
  navigation.classList.toggle('hidden');
  if(navigation.classList.contains('hidden')) {
    burgerMenuClose.classList.add('hidden');
    burgerMenu.classList.remove('hidden');
  } else {
    burgerMenu.classList.add('hidden');
    burgerMenuClose.classList.remove('hidden');
  }
};

document.addEventListener('keyup', onKeyupEsc);
btnHeaderMenu.addEventListener('click', onClickBtnHeaderMenu);
