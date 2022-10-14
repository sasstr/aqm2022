
var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.6.1.min.js');
document.head.appendChild(jQueryScript);

const navigation = document.querySelector('.navigation');
const btnHeaderMenu = document.querySelector('.header__toggle');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuClose = document.querySelector('.burger-menu-close');

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
