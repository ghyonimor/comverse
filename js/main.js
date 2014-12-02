var mq = window.matchMedia("(min-width: 1004px)");

var mqLaunch = function(mq) {
	if (mq.matches) {

		var links = document.querySelectorAll('[am-sliderBullets] a');

	    /* the view port is at least 1004 pixels wide */
	    var slider = document.querySelector('[am-layoutWrap~="slider"]');
	    var hammertime = new Hammer(slider);
		hammertime.on('swiperight', function(ev) {
		    console.log(ev);
		    // If swipe right, getActivatedIndex and click() on the next bullet.
		    var active = getActivatedIndex(links);
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
		    if (active > 0) {
			    active = active -1;
			}
			else {
				active = 3;
			}
			links[active].click();
		});

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
					slides[i].style.display = 'block';
				}
				else {
					slides[i].style.display = 'none';
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
		};

		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			link.addEventListener('click', changeSlide);
		}

		displaySlide();
	}
	else {
		var slides = document.querySelectorAll('[am-wrapSlideContent]');
		for (var j = 0; j < slides.length; j++) {
			slides[j].style.display = 'block';
		}
	}
};

mq.addListener(mqLaunch);
mqLaunch(mq);







