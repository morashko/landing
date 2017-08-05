jQuery(function(){
  initFocuseState();
  initSlideshow();
});

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
    var mask = container.find('.mask .slides');
    var slides = mask.find('.slide');
    var slidesCount = slides.length;
    var pagination = container.find('.pagination ul li');
    var btnPrev = container.find('.btn-prev');
    var btnNext = container.find('.btn-next');
    var slideIndex = 0;
    var animationDuration = 300;
    var slideshowHeight = slides.eq(slideIndex).height();
    
    slides.eq(slideIndex).addClass('active');
//    slides.css({opacity: 0}).filter('.active').css({opacity: 1});

    function slideHeight() {
      slideshowHeight = slides.eq(slideIndex).height();
      mask.height(slideshowHeight);
    }

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
      // slides.stop().animate({
      //   opacity: 0
      // }, animationDuration);
      
      // slides.eq(slideIndex).stop().animate({
      //   opacity: 1
      // }, animationDuration);
      
      pagination.removeClass('active');
      pagination.eq(slideIndex).addClass('active');
      slides.removeClass('active');
      slides.eq(slideIndex).addClass('active');
      slideHeight();
    }
    
    btnPrev.on('click', function(e) {
      e.preventDefault();
      slideIndex--;
      checkRange();
      changeSlide();
    });

    btnNext.on('click', function(e) {
      e.preventDefault();
      slideIndex++;
      checkRange();
      changeSlide();
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