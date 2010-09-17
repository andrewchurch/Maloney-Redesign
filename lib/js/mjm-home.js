(function () {
	
	/* iPAD FUNCTIONALITY */
	
	$('#screenshots').wrapInner('<div id="pane" />').wrapInner('<div id="paneWrapper" />').find('img').show();
	var $pane = $('#pane'),
		fixRevert = false,
		initPos = 0,
		pos = 0,
		numImages = $('#pane img').length,
		imageWidth = 770,
		maxPos = parseInt('-' + (numImages - 1) * imageWidth, 10);
	
	// flip cursor on mousedown/up
	$pane.mousedown(function () {
		$('#paneWrapper').css('cursor', 'move');
	});
	$(document).mouseup(function () {
		$('#paneWrapper').css('cursor', 'pointer');
	});
		
	(function initDraggable() {
		$pane.draggable({
			'axis': 'x',
			'revert': true,
			'drag': function () {
				
				// current pane position
				pos = parseInt(this.style.left.replace('px',''), 10);
			
				// if we are inside the bounds of the images, and onto a new slide
				// then clear the revert, spoof it, and reinit the draggable :)
				if (pos < 0 && pos >= maxPos && !fixRevert) {
					if(Math.abs(initPos - pos) > imageWidth / 2) {
						$pane.draggable('option', 'revert', false);
						fixRevert = true;
					}
				}
			},
			'stop': function () {
				if (fixRevert) {
					
					// remove draggable so we can redo it with a new starting point
					$pane.draggable('destroy');
					
					// spoof revert to nearest slide
					initPos = Math.round(pos / imageWidth) * imageWidth;
					$pane.animate({
						'left': initPos + 'px'
					}, 500, null, function () {
						
						// then reinitialize draggable (in new position)
						fixRevert = false;
						initDraggable();
					});
				}
			}
		});
	})();
	
	/* FEEDS */
	
	/* James Padolseys take on Pretty Date: http://james.padolsey.com/javascript/recursive-pretty-date/ */
	var niceTime=(function(){var a={second:1,minute:60,hour:3600,day:86400,week:604800,month:2592000,year:31536000};return function(e){e=+new Date(e);var f=((+new Date())-e)/1000,c,d;for(var b in a){if(f>a[b]){d=b}}c=f/a[d];c=Math.floor(f>a.hour?(Math.round(c*100)/100):Math.round(c));c+=" "+d+(c>1?"s":"")+" ago";return c}})();

	var $socialMedia = $('#socialMedia');
	
	// twitter
	$.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=markjmaloney&count=3&callback=?', null, function (data) {
		try {		
			var tweets = '';
			for(var i = 0; i < 3; i++) {				
				var tweetText = data[i].text.replace(/(https?:\/\/.+?(\s|$))/g, '<a href="$1" target="_blank">$1</a>').replace(/@+([A-Za-z0-9-_]+)/g, '@<a target="_blank" href="http://twitter.com/$1">$1</a>').replace(/#+([A-Za-z0-9-_]+)/g, '#<a target="_blank" href="http://search.twitter.com/search?q=$1">$1</a>'),
					tweetTime = niceTime(data[i].created_at);
				tweets += '<p>' + tweetText + 
						  '<span>@<a href="http://www.twitter.com/markjmaloney" target="_blank">markjmaloney</a> ' + 
						  (tweetTime.indexOf('undefined') > 1 ? '' : tweetTime) + '</span></p>';
			}
			$socialMedia.prepend('<div id="twitter"><h3>Twitter</h3>' + tweets + '</div>');
		} catch(e) {
			if (typeof console === 'object') {
				console.log(e.name + ': ' + e.message);
			}
		}
	});
	
	// facebook
	$.getJSON('http://graph.facebook.com/maloneydesign/feed&limit=1&offset=0&callback=?', null, function (data) {
		try {		
			var post = data.data[0],
				msg = post.message,
				specialOutput = post.link && post.picture ? ('<a target="_blank" href="' + post.link + '"><img src="' + post.picture + '" alt="" />' + post.name + '</a>') : '',
				postOutput = msg + ' ' + specialOutput,
				postTime = niceTime(post.created_time.replace('+0000', 'Z')),
				timeOutput = postTime.indexOf('undefined') > 1 ? '' : ' <span>' + postTime + '</span>',
				comments = post.comments && post.comments.count ? (post.comments.count + ' comment' + (post.comments.count == 1 ? '' : 's')) : '0 comments',
				likes = post.likes  ? (post.likes + ' like' + (post.likes == 1 ? '' : 's')) : '0 likes',
				metaOutput = '<p class="meta">' + comments + ', ' + likes + ' | <a target="_blank" href="http://facebook.com/maloneydesign?v=wall">view post</a></p>';
			$socialMedia.find('.block').prepend('<div id="facebook"><h3>Facebook</h3><p>' + postOutput + timeOutput + '</p>' + metaOutput + '</div>');
		} catch(e) {
			if (typeof console === 'object') {
				console.log(e.name + ': ' + e.message);
			}
		}	
	});
	
	// last.fm
	// driven server-side now cause Mark needed album art
	// but still use the same pretty date function:
	$('#lastfm .time').each(function () {
		var $this = $(this),
			$thisText = $this.text();
		if ($thisText != 'now') {
			var trackTime = niceTime($thisText +  ' -0000');
			$this.text(trackTime.indexOf('undefined') > 1 ? '' : trackTime);
		} 
	});
	/*  
	function getFeed() {
		var feed = new google.feeds.Feed("http://ws.audioscrobbler.com/1.0/user/baboonfarmer/recenttracks.rss");
		feed.setNumEntries(5);
		feed.load(function(result) {
			try {
				console.log(result);
				var tracks = '',
					output = '';
				for(var i = 0; i < 3; i++) {				
					var track = result.feed.entries[i],
						trackText = track.title,
						trackLink = track.content,
						trackTime = niceTime(track.publishedDate);
					tracks += '<p><a href="' + trackLink + '">' + trackText + '</a> <span>' + trackTime + '</span></p>';
				}
				output = '<div id="lastfm"><h3>Last.FM</h3>' + tracks + '</div>';
				$socialMedia.find('.block').append(output);
			} catch(e) {
				if (typeof console === 'object') {
					console.log(e.name + ': ' + e.message);
				}
			}	
		});
	}
	$.getScript('http://www.google.com/jsapi?key=ABQIAAAAJCrAV1j70uKK9OSjHjk2wBTwhlM8mqa22GeqHuK68fo2iZ33ORTmcCaUh8trCSxNScG9QCBWKilvAA', function () {
		google.load('feeds', '1', {
			'callback': getFeed
		});
	});
	*/
	
})();