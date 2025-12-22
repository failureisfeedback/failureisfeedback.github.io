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
		slidesToShow: isMobile ? 1 : 3,
		loop: true,
		infinite: true,
		autoplay: false,
		autoplaySpeed: 3000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Force navigation to work on mobile
    setTimeout(function() {
        // Get all navigation buttons (Bulma Carousel creates these)
        var allButtons = document.querySelectorAll('button, .slider-navigation-next, .slider-navigation-previous, [class*="navigation"]');

        console.log('Found buttons:', allButtons.length);

        if (carousels.length > 0) {
            var mainCarousel = carousels[0];

            // Attach handlers to ALL possible navigation elements
            document.addEventListener('click', function(e) {
                var target = e.target;

                // Check if click is on or inside a next button
                if (target.closest('.slider-navigation-next') ||
                    target.closest('[class*="next"]') ||
                    (target.tagName === 'BUTTON' && target.className.includes('next'))) {
                    console.log('Next button clicked');
                    e.preventDefault();
                    if (mainCarousel && mainCarousel.next) {
                        mainCarousel.next();
                    }
                }

                // Check if click is on or inside a previous button
                if (target.closest('.slider-navigation-previous') ||
                    target.closest('[class*="previous"]') ||
                    (target.tagName === 'BUTTON' && target.className.includes('previous'))) {
                    console.log('Previous button clicked');
                    e.preventDefault();
                    if (mainCarousel && mainCarousel.previous) {
                        mainCarousel.previous();
                    }
                }
            }, true);

            // Also handle touch events
            document.addEventListener('touchend', function(e) {
                var target = e.target;

                if (target.closest('.slider-navigation-next') ||
                    target.closest('[class*="next"]') ||
                    (target.tagName === 'BUTTON' && target.className.includes('next'))) {
                    console.log('Next button touched');
                    e.preventDefault();
                    if (mainCarousel && mainCarousel.next) {
                        mainCarousel.next();
                    }
                }

                if (target.closest('.slider-navigation-previous') ||
                    target.closest('[class*="previous"]') ||
                    (target.tagName === 'BUTTON' && target.className.includes('previous'))) {
                    console.log('Previous button touched');
                    e.preventDefault();
                    if (mainCarousel && mainCarousel.previous) {
                        mainCarousel.previous();
                    }
                }
            }, true);

            console.log('Navigation handlers attached, carousel methods:', mainCarousel.next, mainCarousel.previous);
        }
    }, 1000);

    // Re-initialize carousel on window resize
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                isMobile = newIsMobile;
                options.slidesToShow = isMobile ? 1 : 3;
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
