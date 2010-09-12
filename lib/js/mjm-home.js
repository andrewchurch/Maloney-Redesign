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
	
	/* JavaScript Pretty Date - Copyright (c) 2008 John Resig (jquery.com) - Licensed under the MIT license.
	   http://ejohn.org/files/pretty.js */
	function prettyDate(d){var b=new Date((d||"").replace(/-/g,"/").replace(/[TZ]/g," ")),c=(((new Date()).getTime()-b.getTime())/1000),a=Math.floor(c/86400);if(isNaN(a)||a<0||a>=31){return}return a==0&&(c<60&&"just now"||c<120&&"1 minute ago"||c<3600&&Math.floor(c/60)+" minutes ago"||c<7200&&"1 hour ago"||c<86400&&Math.floor(c/3600)+" hours ago")||a==1&&"Yesterday"||a<7&&a+" days ago"||a<31&&Math.ceil(a/7)+" weeks ago"};
	
	var $socialMedia = $('#socialMedia');
	
	// twitter
	$.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=markjmaloney&count=5&callback=?', null, function (data) {
		try {
			var tweets = '',
				output = '';
			for(var i = 0; i < 3; i++) {
				var tweetText = data[i].text.replace(/(https?:\/\/.+?(\s|$))/g, '<a href="$1" target="_blank">$1</a>'),
					tweetTime = prettyDate(data[i].created_at);
				tweets += '<p>' + tweetText + 
						  '<span>@<a href="http://www.twitter.com/markjmaloney" target="_blank">markjmaloney</a> ' + 
						  tweetTime + '</span></p>';
			}
			if (tweets) {
				output = '<div id="twitter"><h3>Twitter</h3>' + tweets + '</div>';
				$socialMedia.prepend(output);
			}
		} catch(e) {
			if (typeof console === 'object') {
				console.log(e.name + ': ' + e.message);
			}
		}
	});
	
	// facebook
	/* <div id="facebook"> 
		<h3>Facebook</h3> 
		<p>Mid-century corporate design. Tight. <a href="http://is.gd/diHiP" target="_blank"><img src="assets/images/fpo_facebook_thumb.jpg" width="45" height="36" alt="Facebook Thumb">Mid-Century Corporate Design – Part 1 | Aqua-Velvet</a> <span>about 8 hrs ago</span></p> 
		<ul> 
		<li><img src="assets/images/fpo_avatar.jpg" width="24" height="24" alt="Facebook Avatar">Fabulous</li> 
		<li><img src="assets/images/fpo_avatar.jpg" width="24" height="24" alt="Facebook Avatar">Great find.  The IBM stuff is solid.</li> 
		<li><img src="assets/images/fpo_avatar.jpg" width="24" height="24" alt="Facebook Avatar">Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li> 
		</ul> 
	</div>  */
	
	$.getJSON('http://graph.facebook.com/maloneydesign/feed&limit=1&offset=0&callback=?', null, function (data) {
		try {
			var post = data.data[0],
				msg = post.message,
				postTime = prettyDate(post.created_time.replace('T', ' ').replace('+0000', '')),
				comments = post.comments ? (post.comments.count + ' comment' + (post.comments.count == 1 ? '' : 's')) : '0 comments',
				likes = post.likes  ? (post.likes + ' like' + (post.likes == 1 ? '' : 's')) : '0 likes';
				
			if (post.type == 'link' || post.type == 'video') {
				specialOutput = '';
			} else {
				specialOutput = '';
			}
				
			var postOutput = '<p>' + msg + ' <span>' + postTime + '</span></p>',
				metaOutput = '<p class="meta">' + comments + ', ' + likes + ' | <a target="_blank" href="http://facebook.com/maloneydesign">view post</a></p>',
				output = '<div id="facebook"><h3>Facebook</h3>' + postOutput + specialOutput + metaOutput + '</div>';
			$socialMedia.find('.block').prepend(output);
		} catch(e) {
			if (typeof console === 'object') {
				console.log(e.name + ': ' + e.message);
			}
		}	
	});

	
})();