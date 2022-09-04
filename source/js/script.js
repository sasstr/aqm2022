
var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.6.1.min.js');
document.head.appendChild(jQueryScript);

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

function defer(){
   if ( window.jQuery){

      $("section, .footer, .main__container").css('opacity','0');
      $(window).scroll(function() {OnWinScroll()});
      OnWinScroll()


   }
   else{
      window.setTimeout("defer();",100);
   }
}
defer();

function OnWinScroll()
{
 $("section, .footer, .main__container").each(function(){if(onmyscreen($(this))) $(this).animate({opacity: 1}, 1000);;})
}

function onmyscreen(el)
{
    if(el.css("opacity")!=0) return false;
    var window_top = $(window).scrollTop();
    var offset = el.offset().top;
    if (offset <= window_top+$(window).height())  return true;

    return false;

}