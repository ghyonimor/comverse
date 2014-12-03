// Variables for later use.
var mq = window.matchMedia("(min-width: 1004px)");
var links = document.querySelectorAll('[am-sliderBullets] a');
var slider = document.querySelector('[am-layoutWrap~="slider"]');
var timer;

// Get currently activated slider bullet index.
var getActivatedIndex = function(links) {
	for (var i = 0; i < links.length; i++) {
		if (links[i].hasAttribute('am-marked')) {
			return i;
		}
	}
};

// Display the slide connected to the active bullet.
var displaySlide = function() {
	var slides = document.querySelectorAll('[am-wrapSlideContent]');
	var i = getActivatedIndex(links);
	slider.style.left = i * (-100) + '%';
};

// Transitions between slides, handling events and timer.
var changeSlide = function(e) {
	slider.style.transition = "left 0.5s";
	e.preventDefault();
	var target = e.target;
	target.setAttribute('am-marked', '');
	for (var i = 0; i < links.length; i++) {
		if (links[i] !== target && links[i].hasAttribute('am-marked')) {
			links[i].removeAttribute('am-marked');
		}
	}
	displaySlide();
	clearInterval(timer);
	timer = setInterval(function(){
		slider.style.transition = "left 0.5s";
    	active = getActivatedIndex(links);
    	if (active < 3) {
		    active = active + 1;
		}
		else {
			active = 0;
		}
		links[active].click();
    }, 5000);
};

// New hammer.js instance.
var hammertime = new Hammer(slider);

// Handle media queries with JS.
var mqLaunch = function(mq) {

	if (mq.matches) {
		/* the view port is at least 1004 pixels wide */
		console.log('viewport 1004+');

		// Prevent hammer.js memory leaks.
		hammertime.off('swiperight');
		hammertime.off('swipeleft');

		// Start hammer.js 'swiperight'
		hammertime.on('swiperight', function(ev) {
		    console.log(ev);
		    // If swipe right, getActivatedIndex and click() on the next bullet.
		    var active = getActivatedIndex(links);
		    console.log(active);
		    if (active < 3) {
			    active = active + 1;
			}
			else {
				active = 0;
			}
			links[active].click();
		});

		// Start hammer.js 'swipeleft'.
		hammertime.on('swipeleft', function(ev) {
		    console.log(ev);
		    // If swipe left, getActivatedIndex and click() on the previous bullet.
		    var active = getActivatedIndex(links);
		    console.log(active);
		    if (active > 0) {
			    active = active -1;
			}
			else {
				active = 3;
			}
			links[active].click();
		});

		// Attach 'click' event listeners to bullets.
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			link.addEventListener('click', changeSlide);
		}
		// Display default.
		displaySlide();
		var active;
		// Start timer.
	    timer = setInterval(function(){
	    	active = getActivatedIndex(links);
	    	if (active < 3) {
			    active = active + 1;
			}
			else {
				active = 0;
			}
			links[active].click();
	    }, 5000);
	}
	else {
		// Prevent transitions, swipes and positioning of slider if min-width is less than specified.
		slider.style.left = '0%';
		slider.style.transition = "none";
		// The viewport is less than 1004px wide.
		console.log('viewport 1004-');
		hammertime.off('swiperight');
		hammertime.off('swipeleft');
		// Clear timer.
		clearInterval(timer);
	}
};

// Add event handler to media query change.
mq.addListener(mqLaunch);
// Activate default.
mqLaunch(mq);







