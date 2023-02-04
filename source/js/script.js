
var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.6.1.min.js');
document.head.appendChild(jQueryScript);

const navigation = document.querySelector('.navigation');
const btnHeaderMenu = document.querySelector('.header__toggle');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuClose = document.querySelector('.burger-menu-close');

// переключение списка работ по наведению мышки прозрачные/не прозрачные
// if(document.querySelector('.work__list') && document.querySelectorAll('.work__item') ){
//     const workList = document.querySelector('.work__list');
//     const workItems = workList.querySelectorAll('.work__item');

//     const isMouseOnElement= function (e) {
//         if(e.target.classList.contains('work__item')) {
//             workItems.forEach(it => it.style.opacity = 0.5)
//             e.target.style.opacity = 1;
//         }
//     };

//     const isMouseOutOnElement = function () {
//         workItems.forEach(it => it.style.opacity = 1)
//     };

//     workList.addEventListener('mouseover', isMouseOnElement);

//     workList.addEventListener('mouseout', isMouseOutOnElement);
// }

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
    evt.preventDefault;
    navigation.classList.toggle('hidden');
    if(navigation.classList.contains('hidden')) {
        burgerMenuClose.classList.add('hidden');
        $('body').unbind('touchmove');
        enableScrolling();
        $(".header").css("background-color","");
        burgerMenu.classList.remove('hidden');
        // document.querySelector('.header__logo').classList.remove('hidden');
    } else {
        burgerMenu.classList.add('hidden');
        burgerMenuClose.classList.remove('hidden');
        $('body').bind('touchmove', function(e){e.preventDefault()})
        disableScrolling();
        $(".header").css("background-color","#003137");
        // document.querySelector('.header__logo').classList.add('hidden');
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

function SetAppearAnimation()
{
    $("section, .footer,  .projects__card, .projects__title").not('.main__wrapper.projects').children().children().css('opacity','0');
    $(window).scroll(function() {OnWinScroll()});
    OnWinScroll();
}

function defer(method){
    if ( window.jQuery){
        method();
    }
    else{window.setTimeout("defer("+method+");",100);}
}

defer(SetAppearAnimation);

// скролл  в About ------------------------------------------------------
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefaultScroll(e) {
  if(window.scrollY>0) return;  // если не докрутили до верха
  //console.log(e);
  if(e.deltaY<0) // прокрутить контейнер вверх
    $(".articles-about-us__container").finish().animate({
    scrollTop: e.deltaY+"px"
  },100)
  else
  {
    if($(".articles-about-us__container").scrollTop()+$(".articles-about-us__container").height()+1>$(".articles-about-us__container").innerHeight())
     return;
    $(".articles-about-us__container").finish().animate({
    scrollTop: "+"+e.deltaY+"px"},100);      
  }
  e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefaultScroll(e);
    return false;
  }
}
// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScrollAbout() {
  window.addEventListener('DOMMouseScroll', preventDefaultScroll, false); // older FF
  window.addEventListener(wheelEvent, preventDefaultScroll, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefaultScroll, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
// call this to Enable
function enableScrollAbout() {
  window.removeEventListener('DOMMouseScroll', preventDefaultScroll, false);
  window.removeEventListener(wheelEvent, preventDefaultScroll, wheelOpt); 
  window.removeEventListener('touchmove', preventDefaultScroll, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
function SetAboutScroll()
{
    if($(".articles-about-us__container").length==0) return;
    disableScrollAbout();
    
}
defer(SetAboutScroll);

// Конец скролла с about -----------------------------

function OnWinScroll()
{
    $("section, .footer,  .projects__card, .projects__title").not('main__wrapper.projects').children().each(function(){if(onmyscreen($(this)))
                MyShow($(this));})
    $("section, .footer,  .projects__card, .projects__title").not('main__wrapper.projects').children().children().each(function(){if(onmyscreen($(this)))
                MyShow($(this));})
}

function MyShow(el)
{
    el.animate({opacity: 1}, 300);
}

function onmyscreen(el)
{
    if(el.css("opacity")!=0) return false;
    var window_top = $(window).scrollTop();
    var offset = el.offset().top;
    if (offset +50 <= window_top+$(window).height())  return true;
    return false;
}

// Анимация цифорок в блоке на главной странице achievement
const time = 3000;
const step = 1;
let achievement = document.querySelector('.achievement');
if(achievement) if(document.querySelector('.achievement__number'))
    elemNumber = achievement.querySelectorAll('.achievement__number');

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

function PreFormatAnimation()
{
    if(!achievement) return;

    window.addEventListener('scroll',onScrollNumberAnimate);

    $('[data-animation]').each(
        function()
        {
            $(this).html("<span>0</span>".repeat($(this).attr('data-animation').length));
            //$(this).css("height",$(this).height()+"px");
            $(this).css("width",$(this).width()+"px");
            $(this).find("span").each(function(){
                    $(this).css("width",$(this).width()+"px").css("height",$(this).height()+"px");
                    $(this).html("<div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>0</div>");
            });

        }
    );

    $(document).ready(function(){onScrollNumberAnimate();});
}

function animate1digit(element, to, speed) {
    if(to>0)
        $(element).children().first().css('margin-top',-$(element).height()+'px');
    if(to<10)
        $(element).children().first().animate({'margin-top':-$(element).height()*to},speed*to)
    else
        {
        $(element).children().first().animate({'margin-top':-$(element).height()*10},{speed:speed*10,complete:function(){animate1digit(element,to-10,speed)}});
    }
}

function animate1number(element,speed)
{
    $(element).children().each(function(index,value)

        {
            total=$(value).parent().attr("data-animation");
            total=parseInt(total/(10**(2-index)));
            if(total>40) total=40+total%10;
            if(total>10) speed=300/(total%10); else speed=300;
            animate1digit(value,total,speed);

    })
}

const onScrollNumberAnimate = function () {
    let numberTop = $(".achievement").position().top;
    if (window.pageYOffset > (numberTop - window.innerHeight)) {
        this.removeEventListener('scroll', onScrollNumberAnimate);
        elemNumber.forEach((it) => animate1number(it,500));
    }
}

defer (PreFormatAnimation);
const animateCounter2 = function(elem) {
    if(achievement)  animate1number(elem,500);
}
