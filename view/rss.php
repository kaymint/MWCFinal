<?php
require_once("rss_fetch.inc");
	$url="http://www.myjoyonline.com/pages/rss/site_entertainment.xml";
	$rss=fetch_rss($url);

	echo "Channel Title: ". $rss->channel['title'];
	echo "<ul>";
	foreach ($rss->items as $item) {
		$href = $item['link'];
		$title = $item['item'];
		echo "<li><a href=$href>title</a><li>";
	}
	echo "</ul>";
?>