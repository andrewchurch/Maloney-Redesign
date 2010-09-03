<!DOCTYPE html>

<head>
<base href="http://v2.markjmaloney.com" />

<meta charset="UTF-8">
<title>Mark Maloney, an award-winning and deeply experienced interactive strategist and user experience designer based in Baltimore, MD</title>
<link rel="stylesheet" href="assets/css/reset.css" />
<link rel="stylesheet" href="assets/css/screen.css" />
<!--[if IE 6]>
 <link rel="stylesheet" type="text/css" href="assets/css/ie6.css" />
<![endif]-->
<style>
	div#screenshots { 	
		height: 664px;
		padding: 83px 95px;
		text-align: left;
	}
	div#screenshots img {
		display: block;
		float: left;
		padding: 0;
	}
	#paneWrapper {
		cursor: col-resize;
		overflow: hidden;
	}
	#pane {
		width: 9999px;
	}
</style>
</head>

<body class="home">

	<div id="container">
	
		<p id="results" style="color: #fff;"></p>
		
		<div id="screenshots">
			<img src="assets/images/home_canada_1.jpg" width="770" height="578" alt="Canada Day Across America" />
			<img src="assets/images/home_canada_1.jpg" width="770" height="578" alt="Canada Day Across America" style="display: none;" />
			<img src="assets/images/home_canada_1.jpg" width="770" height="578" alt="Canada Day Across America" style="display: none;" />
		</div>
	 
	</div>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js"></script>
	<script>
	(function () {
		
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
		
	})();
	</script>

</body>
</html>