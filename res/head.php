<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 
<meta name="google-site-verification" content="rtJUIyJif7o2AZfG6TOk-q5ivhFkEby8OxBHq8B1Wpg" />

<!--MOBILE SPECIFIC METATAGS -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta name="format-detection" content="telephone=no" />

<!--BASIC TAGS, FACEBOOK DATA, SCHEMA TAGS, CSS, FAVICON, DESCRIPTION, ETC -->
<title>Flood Zone NYC</title>
<link rel="icon" href="favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<link href="css/style.css" rel="stylesheet" type="text/css">
<meta name="description" content="Map of New York City Flood Zones as well as information about evacuation centers and how to prepare for a storm" />
<meta itemprop="name" content="Flood Zone NYC">
<meta itemprop="description" content="Map of New York City Flood Zones as well as information about evacuation centers and how to prepare for a storm">
<meta property="og:title" content="Flood Zone NYC" />
<meta property="og:type" content="website" />
<meta property="og:url" content="http://www.floodzonenyc.com" />
<meta property="og:site_name" content="Flood Zone NYC" />

<!--iOS MODIFICATIONS, ICONS, LAUNCH IMAGES -->
<link rel="apple-touch-icon-precomposed" href="ios/iphone-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="ios/iphone-retina-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="ios/ipad-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="ios/ipad-retina-precomposed.png" />

<!--IOS LAUNCH SCREENS -->
<!-- Old iPhone, non retina -->
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" href="ios/splash-iphone-non-retina.png" />
<!-- Old iPhone, retina -->
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" href="ios/splash-iphone-retina.png" />
<!-- New iPhone 16x9 -->
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="ios/splash-16-9-iphone.png" />
<!-- iPad Non-Retina -->
<link rel="apple-touch-startup-image" media="(min-device-width: 768px) and (orientation: portrait)" href="ios/splash-portrait.png" />
<link rel="apple-touch-startup-image" media="(min-device-width: 768px) and (orientation: landscape)" href="ios/splash-landscape.png" />
<!-- iPad Retina -->
<link rel="apple-touch-startup-image" media="(min-device-width: 768px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2)" href="ios/splash-retina-portrait.png" />
<link rel="apple-touch-startup-image" media="(min-device-width: 768px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)" href="ios/splash-retina-landscape.png" />

<!--Chrome for Android Pin to Home screen -->
<link rel="icon" sizes="196x196" href="android/icon-highres.png" />
<link rel="icon" sizes="128x128" href="android/icon.png"

<!--Windows 8 Live Tile Setup -->
<meta name="application-name" content="Flood Zone NYC" />
<meta name="msapplication-TileColor" content="#d8281a" />
<meta name="msapplication-square70x70logo" content="windows/smalltile.png" />
<meta name="msapplication-square150x150logo" content="windows/mediumtile.png" />
<meta name="msapplicaton-wide310x150logo" content="windows/widetile.png" />
<meta name="msapplication-square310x310logo" content="windows/largetile.png" />
<!-- HTML5 BACKWARDS COMPATIBILITY -->
<!--[if lt IE 9]>
<script src="js/html5shiv.js"></script>
<![endif]-->

<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-29051833-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
<script src="js/modernizr.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/map.js"></script>
<script>
var locations = [
	<?php
	$evacCenters = mysql_query("SELECT * FROM `evac_centers`");
	$i = 1;
	$numRows = mysql_num_rows($evacCenters);
	while($evacRow = mysql_fetch_array($evacCenters)):
	?>
	{
		name: "<?php echo $evacRow['Building Name']; ?>",
		location: [<?php echo $evacRow['Geolocation']; ?>],
		address: "<?php echo $evacRow['Street Address']; ?>",
		city: "<?php echo $evacRow['City']; ?>",
		state: "<?php echo $evacRow['State']; ?>",
		zip: <?php echo $evacRow['Zip Code']; ?>
	}<?php if($i < $numRows):echo ',';endif; ?>
	<?php $i++; endwhile; ?>
];
</script>