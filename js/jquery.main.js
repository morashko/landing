jQuery(function(){
  initFocuseState();
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