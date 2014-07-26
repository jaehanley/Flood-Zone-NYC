<?php
ob_start("ob_gzhandler");
include('res/data.php');?>
<!DOCTYPE html itemscope itemtype="http://schema.org/Map">
<html class="<?php if($iOS){echo 'iOS';} if($android){echo 'android';} ?>">
<head>
<?php include_once('res/head.php'); ?>
<script>
console.log('<?php echo $userAgent; ?>');
</script>
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
    <ul class="toggle-map">
        <li class="active right option">Evac Zones</li>
        <li class="middle option">2020s Flood Plain</li>
        <li class="left option">2050s Flood Plain</li>
        <li class="menu-icon fa">&#xf0c9;</li>
    </ul>
</body>
</html>
