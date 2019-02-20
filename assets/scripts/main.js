$(function() {
  
  var $hero_footer = $('.layout-hero .hero-footer');
  var $navbar = $("#header");

  load_resize();

  function load_resize() {
    var hero_content_height = $(window).height() - $navbar.outerHeight() - $hero_footer.outerHeight();
    $('#hero-content, #hero-carousel').css('height', hero_content_height);

    $('.layout-image').css('height', ($(window).width()/2));
  }

  // $(window).load(function(){ 
  //   load_resize(); 
  // }); // onload     
  
  $(window).resize(function() { 
    load_resize(); 
  }); // onresize


  console.log("wwwWHAT");


  $(".form-group input, .form-group textarea").focusout(function(){
      if($(this).val() === ""){
        $(this).parent().removeClass('focus');
      }
  }); 
  $('.form-group input, .form-group textarea').focus(function() {
    console.log('focused');
    $(this).parent().addClass('focus');
  });

   //  var menuTrigger = $('#toggle-main-menu');
   //  var menuContainer = $('#main-menu');

   // // fixedheader();
   //  menuTrigger.on('click tap press', function (e) {
   //    console.log('hey');
   //    menuContainer.toggleClass('open');
   //    menuTrigger.toggleClass('is-active');
   //    $('body').toggleClass('lock-scroll');
   //  });
    
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
