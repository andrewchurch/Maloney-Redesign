<?php
/*
 * Get tracks as SimpleXML object from Last.FM using their API
*/
function getLastFMTracks($key, $user, $limit) {
	$url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' . $user . '&limit=' . $limit . '&api_key=' . $key;
	$feed = simplexml_load_file($url);
	$tracks = $feed->recenttracks->track;
	return $tracks;
}

?>