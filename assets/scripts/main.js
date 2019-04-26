$(function() {
  
  var $hero_footer  = $('.layout-hero .hero-footer');
  var $form         = $("#contact-form");
  var $navbarLayout = $("#navbarLayout");

  function load_resize() {
    $navbar = $("#header"); 
    $('body').css('padding-top', $navbar.outerHeight());

    if($(window).width() >= 768) {
      //console.log("window height: " + $(window).height());
      //console.log("navbar outerheight: " + $navbar.outerHeight());
      //console.log("hero footer outerheight: " + $hero_footer.outerHeight());
      var hero_content_height = $(window).height() - $navbar.outerHeight() - $hero_footer.outerHeight();
      //console.log("hero content height: " + hero_content_height);
     
      if(hero_content_height < 500) {
        hero_content_height = 500;
      }

      $('#hero-content, #hero-carousel').css('height', hero_content_height);
    }

    if($(window).width() >= 992) {
      $('.layout-image').css('height', ($(window).width()/2.5));
    }    
  
  }

  load_resize();
  $(window).resize(function() { 
    load_resize(); 
  }); // onresize


  // Mobile menu
  $navbarLayout.on('hidden.bs.collapse', function () {
    $("#toggle-main-menu").removeClass('is-active');
  });
  $navbarLayout.on('shown.bs.collapse', function () {
    $("#toggle-main-menu").addClass('is-active');
  });

  $navbarLayout.find('a').on('click tap press', function () {
    $navbarLayout.collapse('hide');
  });

  // Carousel
  $('#hero-carousel').carousel({
    interval: 6000, pause: false, ride: true
  });

  // ScrollReveal
  window.sr = new ScrollReveal();
  sr.reveal('section h2, .reveal, section header');
  // Reveal in a ripple efffect
  sr.reveal('.howwehelp-action', { duration: 800 }, 100);
  sr.reveal('#contact .contact li, #whyparachute p, #wearewithyou p, #ourpromise p', { duration: 500 }, 50);
  
  // Scrollmagic
  if($(window).width() > 1024) {
    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave'              
      }
    });

    var slides = ['#intro', '#whyparachute', '#wearewithyou', '#ourpromise',  '#contact']; 

    // create scene for every slide
    for (var i=0; i<slides.length; i++) {
      $(slides[i]).addClass('layout-fs');
      new ScrollMagic.Scene({ triggerElement: slides[i] })
        .setPin(slides[i])
        .addTo(controller);
    }
  }

  $(".form-group input, .form-group textarea").focusout(function(){
      if($(this).val() === ""){
        $(this).parent().removeClass('focus');
      }
  }); 
  $('.form-group input, .form-group textarea').focus(function() {
    $(this).parent().addClass('focus');
  });

  $form.submit(function( event ) {
    console.log( "Handler for .submit() called." );
    event.preventDefault();

    var datastring = $(this).serializeArray();

    var recaptcha_response = grecaptcha.getResponse();

    console.log(recaptcha_response);

    //recaptcha failed validation
    if (recaptcha_response.length == 0) {
      $("#form-error").html("Please tick the recaptcha box.").show().delay(5000).fadeOut(300);
      return false;
    }
    //recaptcha passed validation
    else {
      console.log("Recaptcha accepted");
      //return true;
    }

    return false;


    var fields = '<ul>'; var br = '';

    $.each(datastring, function( i, fld ) {
      br = fld.name !== 'Message' ? '' : '<br>';
      fields+="<li><b>" + fld.name + ":</b> " + br + fld.value + "</li>";
    });

    fields+="</ul>";

    var html = "<p>Hello!</p><p>You have received a new Parachute website enquiry.</p>" +
    fields + "<p>&nbsp;</p><p>&nbsp;</p><hr><p><em><small>This is an automated message from https://www.parachute.net.au</small></em></p>";

    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'qQ2_bQU2BL_ad3Sdvy7RgA', // SAJEN MANDRILL API KEY
        'message': {
          'from_email': 'webform@parachute.net.au',
          'to': [
            {
              'email': 'help@parachute.net.au',
              'name': 'Parachute Team',
              'type': 'to'
            }
            // ,{
            //   'email': 'skye@weareva.com.au',
            //   'name': 'VA',
            //   'type': 'to'
            // }
          ],
          'autotext': 'true',
          'subject': 'Web enquiry from ' + $("#contact-name").val(),
          'html': html,
          'track_opens': true,
          'track_clicks': true
        }
      }
    }).fail(function(response) {
      $("#form-error").html("Sorry, there was an error sending your enquiry. Please try again soon or email help@parachute.net.au directly.").show().delay(5000).fadeOut(300);
    }).done(function(response) {
      console.log("Enquiry sent!");
      var thanks_html = $("#thankyou").html().replace("[NAME]", $("#contact-name").val()); 
      $form.slideUp(300);
      $("#thankyou").html(thanks_html).slideDown(500);
    });
  });

    // if($(window).width() >= 992) {
    //   $('#fullpage').fullpage({
    //     anchors:['section1','section2', 'section3'],
    //     scrollOverflow: true,
    //     autoScrolling:true,
    //     slideSelector: '',
    //     //css3:false
    //     normalScrollElements: '#intro'
    //   });
    // }

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
