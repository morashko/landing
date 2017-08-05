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
    var container = $(this),
      mask = container.find('.mask .slides'),
      slides = mask.find('.slide'),
      slidesCount = slides.length,
      pagination = container.find('.pagination ul li'),
      btnPrev = container.find('.btn-prev'),
      btnNext = container.find('.btn-next'),
      slideIndex = 0,
      animationDuration = 300;
      slideshowHeight = slides.eq(0).height();
    
    slides.eq(0).addClass('active');
    slides.css({opacity: 0}).filter('.active').css({opacity: 1});

    mask.height(slideshowHeight);
    
    function checkRange() {
      if (slideIndex < 0) {
        slideIndex = slidesCount - 1;
      }
      if (slideIndex > slidesCount - 1) {
        slideIndex = 0;
      }
    }
    
    function changeSlide() {
      slides.stop().animate({
        opacity: 0
      }, animationDuration);
      
      slides.eq(slideIndex).stop().animate({
        opacity: 1
      }, animationDuration);
      
      pagination.removeClass('active');
      pagination.eq(slideIndex).addClass('active');
      slides.removeClass('active');
      slides.eq(slideIndex).addClass('active');
      slideshowHeight = slides.eq(slideIndex);
      mask.height(slideshowHeight);
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
  });
}