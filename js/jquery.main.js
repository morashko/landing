jQuery(function(){
  initFocuseState();
  initSlideshow();
  initServices();
  fixedHeader();
});

function initServices() {
  jQuery('.service').each(function() {
    var box = $(this);
    var opener = box.find('.more');
    var closer = box.find('.close');

    opener.on('click', function(e) {
      e.preventDefault();
      box.addClass('is-opened');
    });

    closer.on('click', function(e) {
      e.preventDefault();
      box.removeClass('is-opened');
    });
  });
}

function fixedHeader() {
  var header = jQuery('.header');
  var hero = jQuery('.hero');
  var win = jQuery(window);
  var slideshowHeight;
  var headerHeight;

  function resizeHandler() {
    heroHeight = hero.outerHeight(true);
    headerHeight = header.outerHeight(true);
    scrollHandler();
  }

  function scrollHandler() {
    var scrollTop = win.scrollTop();

    if (hero) {
      if (scrollTop > (heroHeight - headerHeight)) {
        header.addClass('is-fixed');
      } else {
        header.removeClass('is-fixed');
      }
    }
  }

  if (hero) {
    resizeHandler();
    win.on('load resize orientationchange', resizeHandler).on('scroll', scrollHandler);
  }
}

function initFocuseState() {
  var activeFormClass = 'is-form-focused';
  var activeClass = 'is-focused';

  jQuery('.contact-form').each(function() {
    var holder = jQuery(this);
    var inputs = holder.find('.r input:not([type="submit"]), textarea');

    inputs.each(function() {
      var elem = jQuery(this);
      var elemHolder = elem.closest('.r');
      var value = elem.val();

      elem.data({
        elemHolder: elemHolder
      });

      if(value.length){
        elemHolder.addClass(activeClass);
        holder.addClass(activeFormClass);
        elem.addClass(activeClass);
      }
    });

    function focuseHandler() {
      var elem = jQuery(this);
      var elemHolder = elem.data('elemHolder');

      elemHolder.addClass(activeClass);
      holder.addClass(activeFormClass);
      elem.addClass(activeClass);
    }

    function blurHandler() {
      var elem = jQuery(this);
      var elemHolder = elem.data('elemHolder');
      var value = elem.val();

      if(!value.length){
        elemHolder.removeClass(activeClass);
        elem.removeClass(activeClass);
      }

      setTimeout(function() {
        var activeElems = inputs.filter('.' + activeClass);
        if(!activeElems.length) {
          holder.removeClass(activeFormClass);
        }
      }, 1000);
    }

    inputs.on('focus', focuseHandler).on('blur', blurHandler);
  });
}


function initSlideshow() {
  $('.slideshow').each(function() {
    var container = $(this);
    var mask = container.find('.slides');
    var slides = mask.find('.slide');
    var slidesCount = slides.length;
    var pagination;
    var btnPrev = container.find('.btn-prev');
    var btnNext = container.find('.btn-next');
    var slideIndex = 0;
    var animationDuration = 300;
    var slideshowHeight = slides.eq(slideIndex).height();
    var swipeThreshold = 15;
    
    slides.eq(slideIndex).addClass('active');

    function generatePagination() {
      container.append('<div class="pagination"><ul></ul></div>');

      var paginationHolder = container.find('.pagination ul');

      for(var i = 1; i <= slidesCount; i++) {
        paginationHolder.append('<li>' + i + '</li>');
      }

      pagination = container.find('.pagination ul li');
      pagination.eq(slideIndex).addClass('active');
    }    

    function slideHeight() {
      slideshowHeight = slides.eq(slideIndex).height();
      mask.height(slideshowHeight);
    }

    generatePagination()
    slideHeight();
    
    function checkRange() {
      if (slideIndex < 0) {
        slideIndex = slidesCount - 1;
      }
      if (slideIndex > slidesCount - 1) {
        slideIndex = 0;
      }
    }
    
    function changeSlide() {
      pagination.removeClass('active');
      pagination.eq(slideIndex).addClass('active');
      slides.removeClass('active');
      slides.eq(slideIndex).addClass('active');
      slideHeight();
    }

    function prevSlide() {
      slideIndex--;
      checkRange();
      changeSlide();
    }

    function nextSlide() {
      slideIndex++;
      checkRange();
      changeSlide();
    }
    
    btnPrev.on('click', function(e) {
      e.preventDefault();
      prevSlide();
    });

    btnNext.on('click', function(e) {
      e.preventDefault();
      nextSlide();
    });   
    
    pagination.each(function(index) {
      $(this).on('click', function() {
        slideIndex = index;
        changeSlide();
      });
    });

  

    $(window).on('load resize orientationchange', slideHeight);
  });
}
