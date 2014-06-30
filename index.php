<?php
ob_start("ob_gzhandler");
include('res/data.php');?>
<!DOCTYPE html itemscope itemtype="http://schema.org/Map">
<html>
<head>
<?php include_once('res/head.php'); ?>
</head>

<body>
    <div class="mapcontainer">
	   <div id="map_canvas"></div>
    </div>
    <header>
        <?php include_once('res/header.php'); ?>
    </header>
    <section class="about info" data-shown="true">
        <?php include_once('res/about.php'); ?>
    </section>
    <section class="legend info" data-shown="false">
        <?php include_once('res/legend.php'); ?>
    </section>
    <section class="evac info" data-shown="false">
        <?php include_once('res/evac.php'); ?>
    </section>
    <section class="prepare info" data-shown="false">
        <?php include_once('res/prepare.php'); ?>
    </section>
    <script>
    window.twttr = (function (d, s, id) {
        var t, js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id; js.src= "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
        return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
    }(document, "script", "twitter-wjs"));
    </script>
</body>
</html>
