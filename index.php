<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/config.inc.php' ?>
<!DOCTYPE html>
<html>
<head>
	<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/head.inc.php' ?>	
	<title>Mark Maloney</title>
	<meta name="description" content="Mark Maloney, an award-winning and deeply experienced interactive strategist and user experience designer based in Baltimore, MD">
	<link rel="stylesheet" type="text/css" href="/lib/css/mjm.css" />
</head>

<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/body.inc.php' ?>	

	<div id="container">

		<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/header.inc.php' ?>
		
		<h1>I make digital experiences more valuable to their users.</h1> 
		
		<div id="screenshots">
			<img src="/assets/images/slides-home/home_canada_1.jpg" width="770" height="578" alt="Canada Day Across America" />
			<img src="/assets/images/slides-home/home_canada_1.jpg" width="770" height="578" alt="Canada Day Across America" style="display: none;" />
			<img src="/assets/images/slides-home/home_canada_1.jpg" width="770" height="578" alt="Canada Day Across America" style="display: none;" />
		</div>

		<div id="content"> 
			
			<h2>About Me</h2> 
			
			<div id="linkedin"> 
				<p><img src="assets/images/mark_maloney.jpg" width="80" height="80" alt="Mark Maloney"><a href="http://www.linkedin.com/in/markmaloney" target="_new">View My LinkedIn Profile</a> After founding my own successful and nationally recognized interactive communications consultancy, providing interactive strategy to some of world's most well-known brands and introducing a new level of creative energy into the world of online advocacy and public policy, I've decided to take matters into my own hands.</p> 
				<p>Ergo, the Design Office of Mark Maloney.</p> 
				<p>I've been working in the field professionally since 1995.  I began my career as an independent contractor.  I joined Gr8, an Adweek Top 100 Interactive Agency, in 1998 and was promoted to Art Director before founding no|inc, a nationally recognized interactive communications consultancy in 2000.</p> 
				<p>In 2001, I developed an exclusive partnership between no|inc and Berlin Cameron Partners, the 2003 Adweek and AdAge National Agency of the Year.  I was de facto Director of Interactive Services for BCP from 2002-2007, working on Coke, Samsung, Boost Mobile, Walnut Acres, among others.</p> 
				<p>My work has been recognized by the Summit Creative Awards, London International Advertising Awards, the New York Multimedia Festival, the Omni Intermedia Awards, the MC Icon Awards, and the Baltimore and Washington ADDY Awards, among others. I currently sit on several professional juries, including the Web Marketing Association's WebAwards and the eHealthcare Leadership Awards and am a member of the International Academy of Visual Arts and Sciences.</p> 
				<p>In 2005, I was named to the Baltimore Business Journal's list of &quot;Top 40 Under 40&quot;. I hold an M.S. from the University of Maryland and a B.S. from Roanoke College. I live in Baltimore with my wife Nicole and our sons, Carter and Bennett.</p> 
			</div> 
			
			<div id="socialMedia">
				<div class="block">
					<?php
					// Last.FM
					try {
						$tracks = getLastFMTracks(LASTFM_KEY, 'baboonfarmer', 3);
						if ($tracks) {
							echo '<div id="lastfm"><h3>Last.FM</h3>';
							foreach($tracks as $track) {
								$art = (string) $track->image[1] ? $track->image[1] : '/assets/images/lastfm_default.jpg';
								$time = $track['nowplaying'] ? 'now' : $track->date;
								echo '<p><a href="' . $track->url . '" target="_blank"><img src="' . $art . '" alt="Last.FM Art">' . $track->name . ' <em class="artist">' . $track->artist . '</em></a> <span class="time">' . $time . '</span></p>';
								echo "\n";
							}
							echo '</div>';
						}
					} catch(Exception $e) { } 
					?>
				</div>
			</div>
		
		</div> 
	 
	</div>

	<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/js.inc.php' ?>
	<script src="/lib/js/mjm-home.js"></script>

</body>
</html>
