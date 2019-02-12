$(function() {
  // console.log( "ready!" );

  // Scrolling Sticky Header Functions
  $(window).scroll(function() {

    var scroll = $(window).scrollTop();
    var divheight = $(".layout-intro").outerHeight() - 50;
    if($('body').hasClass('page-home')) {
      divheight = $(".layout-hero").outerHeight() - 50;
    }

    //console.log(scroll + ", " + divheight);

    if (scroll >= divheight) {
      //console.log('theme-dark');
      $("#header").removeClass('theme-light').addClass('theme-dark'); 
    } else { 
      //console.log('no');
      $("#header").addClass('theme-light').removeClass('theme-dark'); 
    }

    
  });

    var menuTrigger = $('#toggle-main-menu-mobile');
    var menuContainer = $('#main-menu-mobile');

   // fixedheader();
    menuTrigger.on('click tap press', function (e) {
      console.log('hey');
      menuContainer.toggleClass('open');
      menuTrigger.toggleClass('is-active');
      $('body').toggleClass('lock-scroll');
    });
    
    // $('#fullpage').fullpage({
    //   anchors:['hp-section1', 'hp-section2', 'hp-section3'],
    //   scrollOverflow: true,
    //   css3:false
    //  // normalScrollElements: '.map'
    // });

    /*
     * Replace all SVG images with inline SVG
     */
    $('img.svg').each(function(){
        var $img     = jQuery(this);
        var imgID    = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL   = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });


});
