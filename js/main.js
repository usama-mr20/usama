/* --------------------------------
			JS Scripts
-----------------------------------

    Template Name: Marvin - Personal Portfolio Template
    Author: Malyarchuk
    Copyright: 2020

-----------------------------------

Table of Content

	01. Page Script
	02. Preloader
	03. Sound Setup
	04. Isotope Portfolio
	05. Blogs Masonry
	06. Switch to Content
	07. Navigation
	08. Video Container
	09. Testimonial Slider
	10. Chart Setup
	11. Clients OwlCarousel
	12. Portfolio Link
	13. Map
	14. Validate Contact Form
	15. Bubbles Effect
	16. Mousemove transform 3D
	17. Ajax Portfolio

----------------------------------- */

$(window).on('load', function() {

	/* 01. Page Script */
	setTimeout(function () {
		$('.about, .resume, .blog, .contact, .portfolio').css({'display':'none'});
	}, 10);

	/* 02. Preloader */
	$(".preloader").delay(1000).addClass('loaded');

	/* 03. Sound Setup */
	$('body').append('<audio loop volume="1" id="audio-player"><source src="/music.mp3" type="audio/mpeg"></audio>');
    	var audio = document.getElementById("audio-player");
    	audio.volume = 0.2;

	if($(window).length) {
		$('.music-bg').css({'visibility':'visible'});
		$('body').addClass("audio-off");
		if ($('body').hasClass('audio-on')) {
        	$('body').removeClass('audio-off');
		}
		$(".music-bg").on('click', function() {
			$('body').toggleClass("audio-on audio-off");
			if ($('body').hasClass('audio-off')) {
				audio.pause();
			}
			if ($('body').hasClass('audio-on')) {
				audio.play();
			}
		});
	}

	/* 04. Isotope Portfolio */
    if( $('.portfolio-items').length ) {
        var $elements = $(".portfolio-items"),
            $filters = $('.portfolio-filter ul li');
        $elements.isotope();

        $filters.on('click', function(){
            $filters.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).data('filter');
            $(".portfolio-items").isotope({
                filter: selector,
                hiddenStyle: {
                    transform: 'scale(.2) skew(30deg)',
                    opacity: 0
                },
                visibleStyle: {
                    transform: 'scale(1) skew(0deg)',
                    opacity: 1,
                },
                transitionDuration: '.5s'
            });
        });
    }

	/* 05. Blogs Masonry */
    $('.blog-masonry').isotope({ layoutMode: 'moduloColumns' });

});

$(document).ready(function() {
    "use strict";

	/* 06. Switch to Content */
	$('.navigation ul li').on('click', function() {
		var name = $(this).attr('id');

		$('.wrap').addClass('transition');
		$('.page').fadeOut(800);
		$('.loading-bar').addClass('letsload');
		$('.page.'+name).delay(3000).fadeIn(1000);

		setTimeout(function () {
			$('.wrap').removeClass('transition');
			$('.loading-bar').removeClass('letsload');
		}, 4000);

	});

	/* 07. Navigation */
	$('.bar, nav').hover(
		function() {
			$('nav').addClass('hovered');
			$('.page').addClass('filter');
			$('.bar, nav').addClass('b-open');
		},
		function() {
			$('nav').removeClass('hovered');
			$('.page').removeClass('filter');
			$('.bar, nav').removeClass('b-open');
		}
	);

	/* 08. Video Container */
	var videoEl = document.querySelector('video');

    document.querySelector('.video-button').addEventListener('click', function() {
        if(this.dataset.aperture === 'open') {
            this.dataset.aperture = 'closed';
            videoEl.pause();
            videoEl.progress = 0;
        } else {
            this.dataset.aperture = 'open';
            videoEl.play();
        }
    });

	/* 09. Testimonial Slider */
	var swiper = new Swiper('.testimonials', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      pagination: {
        el: '.testimonial-pagination',
        clickable: true,
      }
    });

	/* 10. Chart Setup */
	if ($('.chart').length > 0) {
	    $('.chart').easyPieChart({
          trackColor:'#0e0f10',
	      scaleColor:false,
	      easing: 'easeOutBounce',
	      scaleLength: 4,
	      lineCap: 'square',
	      lineWidth:5,
	      size:130,
	      animate: {
	                duration: 2500,
	                enabled: true
	    	}
	 	});
	 }

	/* 11. Clients OwlCarousel */
    jQuery(".clients .owl-carousel").owlCarousel({
        loop: !0,
        margin: 30,
        autoplay: !0,
        smartSpeed: 500,
        responsiveClass: !0,
        autoplayHoverPause: !0,
        dots: !1,
        responsive: {
            0: {
                items: 2
            },
            575: {
                items: 3
            },
            768: {
                items: 4
            },
            1e3: {
                items: 6
            }
        }
    });

	/* 12. Portfolio Link */
	$(".item-card .image-link").magnificPopup({
		type: "image"
	});

	$(".item-card .video-link").magnificPopup({
		type: "iframe"
	});

	$(".btn-play").magnificPopup({
		type: "iframe"
	});

	ajaxPortfolioSetup(
		$('.item-card .ajax-link'),
		$('.ajax-portfolio')
	);

	/* 13. Map */
	if (jQuery("#map").length > 0) {
		var latlog = jQuery('#map').data('latlog'),
			popupTextit = jQuery('#map').data('popuptext'),
			map = L.map('map').setView(latlog, 15);
		L.tileLayer(jQuery('#map').data('map-back'), {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            format: 'png'
        }).addTo(map);
        var greenIcon = L.icon({
            iconUrl: jQuery('#map').data('popupicon'),
            iconSize: [40, 40],
            popupAnchor: [0, -26]
        });
        L.marker(latlog, {
            icon: greenIcon
        }).addTo(map).bindPopup(popupTextit).openPopup();
	}

	/* 14. Validate Contact Form */
	if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address"
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "/mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false;
            }

        });
    }

});

/* 15. Bubbles Effect */
function bubbles() {
   jQuery.each(jQuery(".bubbles"), function() {
      var bubblecount = (jQuery(this).width()/50)*10;
      for(var i = 0; i <= bubblecount; i++) {
         var size = (jQuery.rnd(40,80)/10);
         jQuery(this).append('<span class="particle" style="top:' + jQuery.rnd(20,80) + '%; left:' + jQuery.rnd(0,95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + (jQuery.rnd(0,30)/10) + 's;"></span>');
      }
   });
}

jQuery.rnd = function(m,n) {
      m = parseInt(m);
      n = parseInt(n);
      return Math.floor( Math.random() * (n - m + 1) ) + m;
}

bubbles();

/* 16. Mousemove transform 3D */
!(function ($doc, $win) {
	var screenWidth = $win.screen.width / 2,
		screenHeight = $win.screen.height / 2,
		$elems = $doc.getElementsByClassName("elem"),
		validPropertyPrefix = '',
		otherProperty = 'perspective(1000px)',
		elemStyle = $elems[0].style;

	if(typeof elemStyle.webkitTransform == 'string') {
		validPropertyPrefix = 'webkitTransform';
	} else if (typeof elemStyle.MozTransform == 'string') {
		validPropertyPrefix = 'MozTransform';
	}

	$doc.addEventListener('mousemove', function (e) {
		var centroX = e.clientX - screenWidth,
			centroY = screenHeight - (e.clientY + 13),
			degX = centroX * 0.004,
			degY = centroY * 0.008,
			$elem

		for (var i = 0; i < $elems.length; i++) {
   			$elem = $elems[i];
			$elem.style[validPropertyPrefix] = otherProperty + 'rotateY('+ degX +'deg)  rotateX('+ degY +'deg)';
		};
	});
})(document, window);

/* 17. Ajax Portfolio */
function ajaxPortfolioSetup($ajaxLink, $ajaxContainer) {
    $ajaxLink.on('click', function(e) {
        var link = $(this).attr('href');

        if(link === "#") {
            e.preventDefault();
            return;
        }

        $ajaxContainer.find('.content-wrap .popup-content').empty();

        $ajaxContainer.addClass('on');
        $.ajax({
            cache: false,
            headers: {"cache-control": "no-cache"},
            url: link,
            beforeSend: function() {
                $ajaxContainer.find('.ajax-loader').show();
            },
            success: function(result) {
                $ajaxContainer.find('.content-wrap .popup-content').html(result);
            },
            complete: function() {
                $ajaxContainer.find('.ajax-loader').hide();
            },
            error: function(e) {
                $ajaxContainer.find('.ajax-loader').hide();
                $ajaxContainer.find('.content-wrap .popup-content').html('<h1 class="text-center">Something went wrong! Retry or refresh the page.</h1>')
            }
        });
        e.preventDefault();
    });

    $ajaxContainer.find('.popup-close').on('click', function() {
        $ajaxContainer.removeClass('on');
    });
}