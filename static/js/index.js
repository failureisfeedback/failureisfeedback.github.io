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

    // MANUAL SLIDE CONTROL FOR MOBILE - Bypass Bulma's broken navigation
    if (isMobile) {
        var currentSlideIndex = 0;
        var slides = document.querySelectorAll('#results-carousel .item');
        var totalSlides = slides.length;

        console.log('Setting up MANUAL slide control. Total slides:', totalSlides);

        // Function to show specific slide
        function showSlideManually(index) {
            // Hide all slides
            slides.forEach(function(slide, i) {
                if (i === index) {
                    slide.style.display = 'block';
                    slide.style.opacity = '1';
                    slide.style.position = 'relative';
                } else {
                    slide.style.display = 'none';
                    slide.style.opacity = '0';
                }
            });
            console.log('Showing slide:', index);
        }

        // Initialize - show first slide
        showSlideManually(0);

        // Wire up custom navigation buttons
        var customPrevBtn = document.getElementById('custom-prev');
        var customNextBtn = document.getElementById('custom-next');

        if (customPrevBtn && customNextBtn) {
            customPrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
                showSlideManually(currentSlideIndex);
            });

            customPrevBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
                showSlideManually(currentSlideIndex);
            });

            customNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
                showSlideManually(currentSlideIndex);
            });

            customNextBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
                showSlideManually(currentSlideIndex);
            });

            console.log('Manual navigation buttons ready!');
        }
    }

    // Re-initialize carousel on window resize
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                location.reload();
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
