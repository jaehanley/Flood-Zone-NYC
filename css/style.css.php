<?php
	// Autocompress & define as css
	ob_start("ob_gzhandler");
	header("Content-type: text/css; charset: UTF-8");

	// Variables
	$midGrey = '#333333';
	$brandRed = '#C33C33';

	// Vendor prefix compressors
	function transform($string){
		return "-webkit-transform:$string;\n\t-moz-transform:$string;\n\t-ms-transform:$string;\n\t-o-transform:$string;\n\ttransform:$string;\n";
	}
	function calc($property, $string){
		return "$property:-webkit-calc($string);\n\t$property:-moz-calc($string);\n\t$property:-ms-calc($string);\n\t$property:-o-calc($string);\n\t$property:calc($string);\n";
	}
	function transition($string){
		return "-webkit-transition:$string;\n\t-moz-transition:$string;\n\t-ms-transition:$string;\n\t-o-transition:$string;\n\ttransition:$string;\n";
	}
	function perspective($string){
		return "-webkit-perspective:$string;\n\t-moz-perspective:$string;\n\t-ms-perspective:$string;\n\t-o-perspective:$string;\n\tperspective:$string;\n";
	}
	function boxShadow($string){
		return "-webkit-box-shadow:$string;\n\t-moz-box-shadow:$string;\n\t-ms-box-shadow:$string;\n\t-o-box-shadow:$string;\n\tbox-shadow:$string;\n";
	}
	function animation($name, $duration = '0', $count = '1', $direction = 'normal', $delay = '0', $timing = 'ease'){
		return "-webkit-animation:$name $duration $timing $delay $count $direction;\n\t-moz-animation:$name $duration $timing $delay $count $direction;\n\t-ms-animation:$name $duration $timing $delay $count $direction;\n\t-o-animation:$name $duration $timing $delay $count $direction;\n\tanimation:$name $duration $timing $delay $count $direction;\n";
	}
	function borderRadiusAll($string){
		return "-webkit-border-radius:$string;\n\t-moz-border-radius:$string;\n\t-ms-border-raidus:$string;\n\t-o-border-radius:$string;\n\tborder-radius:$string;\n";
	}
	function borderRadiusTopLeft($string){
		return "-webkit-border-top-left-radius:$string;\n\t-moz-border-radius-topleft:$string;\n\t-o-border-top-left-radius:$string;\n\t-ms-border-top-left-radius:$string;\n\tborder-top-left-radius:$string;\n";
	}
	function borderRadiusTopRight($string){
		return "-webkit-border-top-right-radius:$string;\n\t-moz-border-radius-topright:$string;\n\t-o-border-top-right-radius:$string;\n\t-ms-border-top-right-radius:$string;\n\tborder-top-right-radius:$string;\n";
	}
	function borderRadiusBottomLeft($string){
		return "-webkit-border-bottom-left-radius:$string;\n\t-moz-border-radius-bottomleft:$string;\n\t-o-border-bottom-left-radius:$string;\n\t-ms-border-bottom-left-radius:$string;\n\tborder-bottom-left-radius:$string;\n";
	}
	function borderRadiusBottomRight($string){
		return "-webkit-border-bottom-right-radius:$string;\n\t-moz-border-radius-bottomright:$string;\n\t-o-border-bottom-right-radius:$string;\n\t-ms-border-bottom-right-radius:$string;\n\tborder-bottom-right-radius:$string;\n";
	}
?>
/* Universal */
@import url(http://fonts.googleapis.com/css?family=Lato:300,400,700);
body {
	font-family:'Lato', HelveticaNeue, "Helvetica Neue", Helvetica, "Lucida Grande", LucidaGrande, Verdana, Roboto, "Droid Sans", "segoe ui", Arial, sans-serif;
}
#map_canvas {
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
}
input[type="button"] {
	cursor:pointer;
}
/* Header styles */
header {
	position:fixed;
	top:0;
	left:0;
	width:100%;
	background-color:rgba(0,0,0,.8);
	padding:10px 0;
	border-bottom:solid 2px <?php echo($brandRed); ?>;
}
header a {
	color:#ffffff;
}
header > nav:first-of-type {
	float:left;
	margin-left:20px;
	background-color:<?php echo($brandRed); ?>;
	<?php echo borderRadiusAll('2px'); ?>
}
header > nav:last-of-type {
	float:right;
	margin-right:20px;
}
header > nav:first-of-type > * {
	float:left;
}
header > nav:first-of-type > button {
	height:26px;
	padding-left:2px;
	padding-right:2px;
	border:none;
	outline:none;
	-webkit-appearance:none;
	background-color:<?php echo($brandRed); ?>;
	color:#ffffff;
}
header > nav:first-of-type > form {
	padding:0;
	margin:0;
}
header > nav:first-of-type > form > input {
	font-size:1em;
	-webkit-appearance:none;
	border:none;
	height:25px;
	outline:none;
}
header > nav:first-of-type > form > input:first-of-type {
	margin-right:0;
	width:400px;
	height:26px;
	border-radius:0;
}
header > nav:first-of-type > form > input:last-of-type {
	margin-left:0;
	padding-left:10px;
	padding-right:10px;
	color:#ffffff;
	background-color:<?php echo($brandRed); ?>;
}
header > nav:last-of-type > div > a {
	margin:0 10px;
	cursor:pointer;
}
header > nav:last-of-type > div > a:last-of-type {
	margin-right:0;
}
/* section - universal */
body > section {
	background-color:#ffffff;
	position:fixed;
	width:340px;
	top:50px;
	right:20px;
	height:80%;
	<?php echo calc('height','100% - 100px'); echo borderRadiusAll('4px'); echo boxShadow('0 8px 6px -6px rgba(0,0,0,.8)'); ?>
	display:none;
}
body > section:first-of-type {
	display:block;
}
body > section > div {
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	overflow:scroll;
	-webkit-overflow-scrolling:touch;
	<?php echo borderRadiusAll('4px'); ?>
}
body > section > div::-webkit-scrollbar {
	width:4px;
}
body > section > div::-webkit-scrollbar-track-piece {
	background-color:#ffffff;
}
body > section > div::-webkit-scrollbar-thumb {
	background-color:<?php echo($brandRed); ?>;
}
body > section > div > * {
	padding-left:20px;
	padding-right:20px;
}
body > section > div > *:last-child {
	padding-bottom:30px;
}
body > section > button {
	position:absolute;
	bottom:0;
	left:0;
	width:100%;
	background-color:<?php echo($midGrey); ?>;
	color:#ffffff;
	outline:none;
	border:none;
	font-size:1em;
	padding:10px 0;
	margin:0;
	<?php echo borderRadiusBottomLeft('4px'); echo borderRadiusBottomRight('4px'); ?>
}
body > section h1 {
	font-size:1.5em;
}
body > section h2 {
	font-size:1.2em;
}
.zone {
	margin:0;
	float:left;
}
.a {
	background-color:#aa2c1f;
}
.b {
	background-color:#dc9427;
}
.c {
	background-color:#efef3a;
}
.evac > div > section {
	border-bottom:solid thin #313131;
	padding-top:1em;
	padding-bottom:1em;
	cursor:pointer;
}
.evac > div > section > h2 {
	margin:0;
}
.evac > div > section > span {
	display:block;
}
.prepare > div > section {
	border-bottom:solid thin #313131;
}
@media screen and (max-width:880px) {
	header > nav:first-of-type > form > input:first-of-type {
		width:300px;
	}
}
@media screen and (max-width:760px){
	header > nav:first-of-type > form > input:first-of-type {
		width:200px;
	}
}
@media screen and (max-width:660px){
	header > nav:first-of-type > form > input:first-of-type {
		width:200px;
	}
	header > nav:first-of-type {
		margin-right:20px;
		max-width:100%;
		min-width:0;
		width:auto;
	}
	header > nav:last-of-type, header > nav:last-of-type[data-hidden="false"] {
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		padding:10px 0;
		background-color:rgba(0,0,0,.8);
		<?php echo transition('all .4s'); ?>
	}
	header > nav:last-of-type[data-hidden="true"]{
		bottom:-40px;
	}
	header > nav:last-of-type:after {
		width:50px;
		height:20px;
		background-color:rgba(0,0,0,.8);
		position:absolute;
		top:-20px;
		left:50%;
		margin-left:-25px;
		content:"";
		<?php echo borderRadiusTopLeft('4px'); echo borderRadiusTopRight('4px'); ?>
	}
	header > nav:last-of-type > div {
		margin:0 auto;
		width:300px;
	}
	header > nav:last-of-type > div > a {
		display:block;
		float:left;
		width:25%;
		text-align:center;
		margin-left:0;
		margin-right:0;
	}
	.info {
		top:0;
		left:0;
		width:100%;
		height:100%;
	}
}
@media screen and (width:320px){
	header > nav:first-of-type > form > input:first-of-type {
		width:197px;
	}
}