
var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.6.1.min.js');
document.head.appendChild(jQueryScript);

const navigation = document.querySelector('.navigation');
const btnHeaderMenu = document.querySelector('.header__toggle');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuClose = document.querySelector('.burger-menu-close');

// переключение списка работ по наведению мышки прозрачные/не прозрачные
if(document.querySelector('.work__list') && document.querySelectorAll('.work__item') ){
  const workList = document.querySelector('.work__list');
  const workItems = workList.querySelectorAll('.work__item');

  const isMouseOnElement= function (e) {
    if(e.target.classList.contains('work__item')) {
      workItems.forEach(it => it.style.opacity = 0.5)
      e.target.style.opacity = 1;
    }
  };

  const isMouseOutOnElement = function () {
    workItems.forEach(it => it.style.opacity = 1)
  };

  workList.addEventListener('mouseover', isMouseOnElement);

  workList.addEventListener('mouseout', isMouseOutOnElement);
}


const onKeyupEsc = function (evt) {
  if (evt.keyCode == 27){
    navigation.classList.add('hidden');
    burgerMenuClose.classList.add('hidden');
    burgerMenu.classList.remove('hidden');
    $('body').unbind('touchmove');
    $('body').css('overflow','auto');
  }
}
// Открыетие и закрытие меню гамбургер
const onClickBtnHeaderMenu = function (evt) {
  evt.preventDefalt;
  navigation.classList.toggle('hidden');
  if(navigation.classList.contains('hidden')) {
    burgerMenuClose.classList.add('hidden');
    $('body').unbind('touchmove');
    enableScrolling();
    $(".header").css("background-color","");
    burgerMenu.classList.remove('hidden');
    document.querySelector('.header__logo').classList.remove('hidden');
  } else {
    burgerMenu.classList.add('hidden');
    burgerMenuClose.classList.remove('hidden');
    $('body').bind('touchmove', function(e){e.preventDefault()})
    disableScrolling();
    $(".header").css("background-color","#003137");
    document.querySelector('.header__logo').classList.add('hidden');
  }
};

// Функция блокировки скролла
function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

document.addEventListener('keyup', onKeyupEsc);
btnHeaderMenu.addEventListener('click', onClickBtnHeaderMenu);

function defer(){
  if ( window.jQuery){

      $("section, .footer,  .projects__card, .projects__title").not('.main__wrapper.projects').css('opacity','0');
      $(window).scroll(function() {OnWinScroll()});
      OnWinScroll();
  }
  else{window.setTimeout("defer();",100);}
}
defer();

function OnWinScroll()
{
  $("section, .footer,  .projects__card, .projects__title").not('main__wrapper.projects').each(function(){if(onmyscreen($(this)))
  MyShow($(this));})
}
function MyShow(el)
{
  el.find("> *").css("opacity",0);
  el.animate({opacity: 1}, 100);
  el.find("> *").animate({opacity: 1}, 700);
}

function onmyscreen(el)
{
    if(el.css("opacity")!=0) return false;
    var window_top = $(window).scrollTop();
    var offset = el.offset().top;
    if (offset <= window_top+$(window).height())  return true;

    return false;
}

// Анимация цифорок в блоке на главной странице achievement
const time = 3000;
const step = 1;
let achievement = document.querySelector('.achievement');
let elemNumber = achievement.querySelectorAll('.achievement__number');

const animateCounter = function (elem) {
  const num = parseInt( elem.textContent);
  let counter = 0;
  const timeInt = Math.round(time / (num / step));

  let interval = setInterval(()=> {
    counter += step;
    if (counter === num) {
      clearInterval(interval);
    }
    elem.textContent = counter;
  }, timeInt);
};

const onScrollNumberAnimate = function () {

  let numberTop = achievement.getBoundingClientRect().top
  console.log(numberTop);

  if (window.pageYOffset > (numberTop - window.innerHeight)/2) {
      this.removeEventListener('scroll', onScrollNumberAnimate);
      elemNumber.forEach((it) => animateCounter(it));
  }
}

// Запускаем анимацию чисел
window.addEventListener('scroll',onScrollNumberAnimate)


