window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    // Responsive carousel options
    var isMobile = window.innerWidth <= 768;
    var options = {
		slidesToScroll: 1,
		slidesToShow: isMobile ? 1 : 3,  // Show 1 slide on mobile, 3 on desktop
		loop: true,
		infinite: true,
		autoplay: false,
		autoplaySpeed: 3000,
		navigation: true,  // Enable navigation arrows
		navigationKeys: true,  // Enable keyboard navigation
		navigationSwipe: true,  // Enable swipe navigation
		pagination: false,  // Disable pagination dots
		effect: 'translate',  // Use translate effect
		duration: 300,  // Animation duration
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Force enable navigation on mobile by manually adding click handlers
    if (isMobile && carousels.length > 0) {
        var carousel = carousels[0];

        // Find and attach click handlers to navigation buttons after carousel initializes
        setTimeout(function() {
            var prevButtons = document.querySelectorAll('.slider-navigation-previous');
            var nextButtons = document.querySelectorAll('.slider-navigation-next');

            prevButtons.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (carousel && carousel.previous) {
                        carousel.previous();
                    }
                }, true);

                btn.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (carousel && carousel.previous) {
                        carousel.previous();
                    }
                }, true);
            });

            nextButtons.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (carousel && carousel.next) {
                        carousel.next();
                    }
                }, true);

                btn.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (carousel && carousel.next) {
                        carousel.next();
                    }
                }, true);
            });

            console.log('Mobile navigation handlers attached');
        }, 500);  // Wait for carousel to fully initialize
    }

    // Re-initialize carousel on window resize
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                isMobile = newIsMobile;
                options.slidesToShow = isMobile ? 1 : 3;
                // Reinitialize carousels
                carousels = bulmaCarousel.attach('.carousel', options);
            }
        }, 250);
    });

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
