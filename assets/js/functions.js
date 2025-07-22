// @codekit-prepend "/vendor/hammer-2.0.8.js";

function initializeSlider(currentIndex = 0) {
  const $items = $('.slider--item');
  $items.removeClass('slider--item-center');

  $items.each((index, item) => {
    $(item).css('display', 'none');
  });

  $items.eq(currentIndex).addClass('slider--item-center');
  $items.eq(currentIndex).css('display', 'block');
}

// swipe support for touch devices
var targetElement = document.getElementById('viewport'),
  mc = new Hammer(targetElement);
mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
mc.on('swipeup swipedown', function (e) {

  updateHelper(e);

});

$(document).keyup(function (e) {

  if (!($('.outer-nav').hasClass('is-vis'))) {
    e.preventDefault();
    updateHelper(e);
  }

});

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.slider--item');
  const nextBtn = document.querySelector('.slider-btn.next');
  const prevBtn = document.querySelector('.slider-btn.prev');

  let current = 0;

  function showItem(index) {
    items.forEach(item => {
      item.classList.remove('slider--item-center');
      item.style.display = 'none';
    });

    items[index].classList.add('slider--item-center');
    items[index].style.display = 'block';
  }

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % items.length;
    showItem(current);
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    showItem(current);
  });

  // İlk öğeyi göster
  showItem(current);
});


// determine scroll, swipe, and arrow key direction
function updateHelper(param) {

  var curActive = $('.side-nav').find('.is-active'),
    curPos = $('.side-nav').children().index(curActive),
    lastItem = $('.side-nav').children().length - 1,
    nextPos = 0;

  if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
    if (curPos !== lastItem) {
      nextPos = curPos + 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
    else {
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  }
  else if (param.type === "swipedown" || param.keyCode === 38 || param < 0) {
    if (curPos !== 0) {
      nextPos = curPos - 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
    else {
      nextPos = lastItem;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  }

}

// sync side and outer navigations
function updateNavs(nextPos) {

  $('.side-nav, .outer-nav').children().removeClass('is-active');
  $('.side-nav').children().eq(nextPos).addClass('is-active');
  $('.outer-nav').children().eq(nextPos).addClass('is-active');

}

// update main content area
function updateContent(curPos, nextPos, lastItem) {

  $('.main-content').children().removeClass('section--is-active');
  $('.main-content').children().eq(nextPos).addClass('section--is-active');
  $('.main-content .section').children().removeClass('section--next section--prev');

  if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
    $('.main-content .section').children().removeClass('section--next section--prev');
  }
  else if (curPos < nextPos) {
    $('.main-content').children().eq(curPos).children().addClass('section--next');
  }
  else {
    $('.main-content').children().eq(curPos).children().addClass('section--prev');
  }

  if (nextPos !== 0 && nextPos !== lastItem) {
    $('.header--cta').addClass('is-active');
  }
  else {
    $('.header--cta').removeClass('is-active');
  }

}


$(window).on('load', function () {
  var images = $('.slider img');
  var total = images.length;
  var loaded = 0;

  images.each(function () {
    if (this.complete) {
      loaded++;
    } else {
      $(this).on('load', function () {
        loaded++;
        if (loaded === total) {
          $('.slider').addClass('loaded');
        }
      });
    }
  });

  // Eğer hepsi önceden yüklenmişse
  if (loaded === total) {
    $('.slider').addClass('loaded');
  }
});

// @codekit-prepend "/vendor/hammer-2.0.8.js";

$(document).ready(function () {
  const $items = $('.slider--item');
  const $next = $('.slider--next');
  const $prev = $('.slider--prev');
  let current = 0;

  function showOnly(index) {
    $items.removeClass('slider--item-center').hide();
    $items.eq(index).addClass('slider--item-center').show();
  }

  function nextSlide() {
    current = (current + 1) % $items.length;
    showOnly(current);
  }

  function prevSlide() {
    current = (current - 1 + $items.length) % $items.length;
    showOnly(current);
  }

  $next.on('click', nextSlide);
  $prev.on('click', prevSlide);

  // Swipe destek
  if (typeof Hammer !== 'undefined') {
    const mc = new Hammer(document.getElementById('viewport'));
    mc.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    mc.on('swipeleft', nextSlide);
    mc.on('swiperight', prevSlide);
  }

  // İlk öğeyi göster
  showOnly(current);
});


