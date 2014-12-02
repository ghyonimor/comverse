var mq = window.matchMedia("(min-width: 1004px)");

var mqLaunch = function(mq) {
	if (mq.matches) {
	    /* the view port is at least 1004 pixels wide */
	    var links = document.querySelectorAll('[am-sliderBullets] a');
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




