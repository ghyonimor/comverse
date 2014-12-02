var mq = window.matchMedia("(min-width: 1004px)");
var links = document.querySelectorAll('[am-sliderBullets] a');
var slider = document.querySelector('[am-layoutWrap~="slider"]');
var timer;

var getActivatedIndex = function(links) {
	for (var i = 0; i < links.length; i++) {
		if (links[i].hasAttribute('am-marked')) {
			return i;
		}
	}
};

var displaySlide = function() {
	var slides = document.querySelectorAll('[am-wrapSlideContent]');
	for (var i = 0; i < slides.length; i++) {
		if (i === getActivatedIndex(links)) {
			slider.style.left = i * (-100) + '%';
		}
	}
};

var changeSlide = function(e) {
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

var hammertime = new Hammer(slider);

var mqLaunch = function(mq) {
	if (mq.matches) {
		/* the view port is at least 1004 pixels wide */
		console.log('viewport 1004+');

		hammertime.off('swiperight');
		hammertime.off('swipeleft');

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

		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			link.addEventListener('click', changeSlide);
		}
		displaySlide();
		var active;
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
		slider.style.left = '0%';
		// The viewport is less than 1004px wide.
		console.log('viewport 1004-');
		var slides = document.querySelectorAll('[am-wrapSlideContent]');
		for (var j = 0; j < slides.length; j++) {
			slides[j].style.display = 'block';
		}
		hammertime.off('swiperight');
		hammertime.off('swipeleft');
		clearInterval(timer);
	}
};

mq.addListener(mqLaunch);
mqLaunch(mq);







