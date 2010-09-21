(function () {
	
	var transitionDuration = 500;
	
	$('.slides').each(function () {
		
		var $slides = $(this),
			numSlides = $slides.find('img').show().length;
		
		if (numSlides > 1) {

			var $slideWrapper = $slides.wrapInner('<div class="slideWrapper" />').find('.slideWrapper'),
				$btnNext = $('<a class="slideButton next" href="#next">Next Screenshot</a>').appendTo($slides).toggleClass('available'),
				$btnPrevious = $('<a class="slideButton previous" href="#previous">Previous Screenshot</a>').appendTo($slides),
				currSlide = 1,
				slideWidth = $slides.width();

			for (var i = 1, tmp = ''; i <= numSlides; i++) {
				var on = i == 1 ? ' on ' : '';
				tmp += '<a class="indicator' + on + '" href="#' + i + '">Slide ' + i + '</a>';
			}
			var $indicatorWrapper = $('<div class="indicators">' + tmp + '</div>').insertAfter($slides),
				$indicators = $indicatorWrapper.find('a');

			$slides.hover(function () {
				$slides.find('.slideButton.available').fadeIn();
			}, function () {
				$slides.find('.slideButton').fadeOut();
			});

			function move() {
				$indicators.removeClass('on');
				$indicatorWrapper.find('a:nth-child(' + currSlide + ')').toggleClass('on');
				$slideWrapper.animate({
					'left': '-' + (slideWidth * (currSlide - 1)) + 'px'
				}, transitionDuration);
			}	
			
			$btnNext.click(function () {
				currSlide++;
				move();
				if (!$btnPrevious.hasClass('available')) {
					$btnPrevious.toggleClass('available');
				}
				$btnPrevious.show();
				if (currSlide == numSlides) {
					$btnNext.toggleClass('available').hide();
				}
				return false;
			});
			$btnPrevious.click(function () {
				currSlide--;
				move();
				if (!$btnNext.hasClass('available')) {
					$btnNext.toggleClass('available');
				}
				$btnNext.show();
				if (currSlide == 1) {
					$btnPrevious.toggleClass('available').hide();
				}
				return false;
			});
			$indicators.click(function () {
				currSlide = $(this).attr('href').split('#')[1];
				if (currSlide == numSlides) {
					$btnNext.removeClass('available');
					if (!$btnPrevious.hasClass('available')) {
						$btnPrevious.toggleClass('available');
					}
				} else if (currSlide == 1) {
					$btnPrevious.removeClass('available');
					if (!$btnNext.hasClass('available')) {
						$btnNext.toggleClass('available');
					}
				} else {
					if (!$btnNext.hasClass('available')) {
						$btnNext.toggleClass('available');
					}
					if (!$btnPrevious.hasClass('available')) {
						$btnPrevious.toggleClass('available');
					}
				}
				move();
				return false;
			});
		}
	});
	
})();