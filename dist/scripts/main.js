$(function(){function e(){if($navbar=$("#header"),$("body").css("padding-top",$navbar.outerHeight()),$(window).width()>=768){var e=$(window).height()-$navbar.outerHeight()-a.outerHeight();e<500&&(e=500),$("#hero-content, #hero-carousel").css("height",e)}$(window).width()>=992&&$(".layout-image").css("height",$(window).width()/2.5)}var a=$(".layout-hero .hero-footer"),t=$("#contact-form"),o=$("#navbarLayout");if(e(),$(window).resize(function(){e()}),o.on("hidden.bs.collapse",function(){$("#toggle-main-menu").removeClass("is-active")}),o.on("shown.bs.collapse",function(){$("#toggle-main-menu").addClass("is-active")}),o.find("a").on("click tap press",function(){o.collapse("hide")}),$("#hero-carousel").carousel({interval:6e3,pause:!1,ride:!0}),window.sr=new ScrollReveal,sr.reveal("section h2, .reveal, section header"),sr.reveal(".howwehelp-action",{duration:800},100),sr.reveal("#contact .contact li, #whyparachute p, #wearewithyou p, #ourpromise p",{duration:500},50),$(window).width()>1024)for(var r=new ScrollMagic.Controller({globalSceneOptions:{triggerHook:"onLeave"}}),n=["#intro","#whyparachute","#wearewithyou","#ourpromise","#contact"],i=0;i<n.length;i++)$(n[i]).addClass("layout-fs"),new ScrollMagic.Scene({triggerElement:n[i]}).setPin(n[i]).addTo(r);$(".form-group input, .form-group textarea").focusout(function(){""===$(this).val()&&$(this).parent().removeClass("focus")}),$(".form-group input, .form-group textarea").focus(function(){$(this).parent().addClass("focus")}),t.submit(function(e){console.log("Handler for .submit() called."),e.preventDefault();var a=$(this).serializeArray(),o="<ul>",r="";$.each(a,function(e,a){r="Message"!==a.name?"":"<br>",o+="<li><b>"+a.name+":</b> "+r+a.value+"</li>"}),o+="</ul>";var n="<p>Hello!</p><p>You have received a new Parachute website enquiry.</p>"+o+"<p>&nbsp;</p><p>&nbsp;</p><hr><p><em><small>This is an automated message from https://www.parachute.net.au</small></em></p>";$.ajax({type:"POST",url:"https://mandrillapp.com/api/1.0/messages/send.json",data:{key:"qQ2_bQU2BL_ad3Sdvy7RgA",message:{from_email:"webform@parachute.net.au",to:[{email:"help@parachute.net.au",name:"Parachute Team",type:"to"}],autotext:"true",subject:"Web enquiry from "+$("#contact-name").val(),html:n,track_opens:!0,track_clicks:!0}}}).fail(function(e){$("#form-error").html("Sorry, there was an error sending your enquiry. Please try again soon or email help@parachute.net.au directly.").show().delay(5e3).fadeOut(300)}).done(function(e){console.log("Enquiry sent!");var a=$("#thankyou").html().replace("[NAME]",$("#contact-name").val());t.slideUp(300),$("#thankyou").html(a).slideDown(500)})}),$("img.svg").each(function(){var e=jQuery(this),a=e.attr("id"),t=e.attr("class"),o=e.attr("src");$.get(o,function(o){var r=jQuery(o).find("svg");void 0!==a&&(r=r.attr("id",a)),void 0!==t&&(r=r.attr("class",t+" replaced-svg")),r=r.removeAttr("xmlns:a"),!r.attr("viewBox")&&r.attr("height")&&r.attr("width")&&r.attr("viewBox","0 0 "+r.attr("height")+" "+r.attr("width")),e.replaceWith(r)},"xml")})});
//# sourceMappingURL=main.js.map
