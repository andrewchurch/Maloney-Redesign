(function () {
	
	var transitionDuration = 500;
	
	$('.slides').each(function () {
		
		var $slides = $(this),
			numSlides = $slides.find('img').show().length;
		
		if (numSlides > 1) {

			var $slideWrapper = $slides.wrapInner('<div class="slideWrapper" />').find('.slideWrapper'),
				$btnNext = $('<a class="slideButton next" href="#next">Next Screenshot</a>').appendTo($slides).show(),
				$btnPrevious = $('<a class="slideButton previous" href="#previous">Previous Screenshot</a>').appendTo($slides),
				currSlide = 1,
				slideWidth = $slides.width();

			for (var i = 1, tmp = ''; i <= numSlides; i++) {
				var on = i == 1 ? ' on ' : '';
				tmp += '<a class="indicator' + on + '" href="#' + i + '">Slide ' + i + '</a>';
			}
			var $indicatorWrapper = $('<div class="indicators">' + tmp + '</div>').insertAfter($slides),
				$indicators = $indicatorWrapper.find('a');

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
				$btnPrevious.show();
				if (currSlide == numSlides) {
					$btnNext.hide();
				}
				return false;
			});
			$btnPrevious.click(function () {
				currSlide--;
				move();
				$btnNext.show();
				if (currSlide == 1) {
					$btnPrevious.hide();
				}
				return false;
			});
			$indicators.click(function () {
				currSlide = $(this).attr('href').split('#')[1];
				if (currSlide == numSlides) {
					$btnNext.hide();
					$btnPrevious.show();
				} else if (currSlide == 1) {
					$btnPrevious.hide();
					$btnNext.show();
				} else {
					$btnNext.show();
					$btnPrevious.show();
				}
				move();
				return false;
			});
			
		}

		
	});
	
})();