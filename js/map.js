google.maps.visualRefresh = true;

var geocoder;
var map;
function initialize() {

	console.log("Wanted to view under the hood? Checkout the source over at GitHub: https://github.com/darrellhanley/Flood-Zone-NYC\nAnd hey, maybe check out my portfolio while you're at it: http://www.darrellhanley.com");
	
	//Mobile Device Optimizations//
	setTimeout(function() {
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) ||(navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/webOS/i)) || (navigator.userAgent.match(/Android/i))) {
			setTimeout(function() {
				window.scrollTo(0, 1);
			}, 0);
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
				if (window.screen.height==568) { // iPhone 4" - pin to homescreen hack fix
					document.querySelector("meta[name=viewport]").content="width=320.1";
				}
			}
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) ||(navigator.userAgent.match(/iPad/i))){
				if(window.navigator.standalone){
					$('html').addClass('ios-app');
				}
			}
		}
	});
	//Google Maps code//
	var greyedOut = [ { color: "#CCCCCC" } ]
	var styleArray = [
		{
			featureType: "road.arterial",
			elementType: "geometry",
			stylers: [
				{ hue: "#666666" },
				{ saturation: -100 },
				{ lightness: 0 }
			]
		},{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [
				{ hue: "#A710DE" },
				{ saturation: -90 },
				{ lightness: 20 }
			]
		},{
			featureType: "water",
			stylers: [
				{ hue: "#3F5375" },
				{ saturation: -50 },
				{ lightness: 0 }
			]
		},{
			featureType: "poi.park",
			stylers: greyedOut
		},{
			featureType: "administrative.land_parcel",
			stylers: greyedOut
		},{
			featureType: "poi.attraction",
			stylers: greyedOut
		}
	];
	// Google Maps positioning, control options
	var nyc = new google.maps.LatLng(40.73, -73.95);
	geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById('map_canvas'), {
  		center: nyc,
  		zoom: 12,
		disableDefaultUI: true,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_CENTER
		},
		panControl: false,
  		mapTypeId: 'roadmap',
	});
	// Evacuation Centers
	var locations = new google.maps.FusionTablesLayer({
  		query: {
    		select: 'Geocodable address',
    		from: '18v2n3Gc4Wb2sSse5oqb7Q3vu_bKF1UN9qksmCKo'
  		},
  		options: {
  			styleId:2,
  			templateId:2
  		}
	});
	// Evacuation Zones
	var zones = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			from: '1gGJgrTkJqNWYlNNsdAfFQ9W9r8zuOeMCWm8UhqM'
		},
		options:{
			styleId:2,
			templateId:2
		},
		styles: [
			{
				where: "'Zone' = 1",
				polygonOptions: {
					fillColor: "#68154a"
				}
			},
			{
				where: "'Zone' = 2",
				polygonOptions: {
					fillColor: "#9b1530"
				}
			},
			{
				where: "'Zone' = 3",
				polygonOptions: {
					fillColor: "#ce1515"
				}
			},
			{
				where: "'Zone' = 4",
				polygonOptions: {
					fillColor: "#da5c10"
				}
			},
			{
				where: "'Zone' = 5",
				polygonOptions: {
					fillColor: "#e6a40b"
				}
			},
			{
				where: "'Zone' = 6",
				polygonOptions: {
					fillColor: "#f2eb06"
				}
			}
		],
		clickable:0
	});
	// Transit Layer
	var subways = new google.maps.TransitLayer();
	// Set Map
	zones.setMap(map);
	locations.setMap(map);
	//subways.setMap(map);
	map.setOptions({styles: styleArray});
	
    var aboutscroll;
	var ua = navigator.userAgent;
	if (ua.indexOf("Android") >= 0 ) {
		var androidVersion = parseFloat(ua.slice(ua.indexOf("Android")+8));
		if (androidversion < 3.0) {
			setTimeOut(function() {
                aboutscroll = new iScroll('#aboutscroll');
            }, 100);
		}
	}
}
function codeAddress(event) {
	event.preventDefault();
	console.log('code address function fired');
	var searchInput = $('.location input[type="search"]')[0];
	var address = searchInput.value;
	console.log('location input: '+address);
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(16);
            var lastEntry = results[0].geometry.location;
			var geoLocated = results[0].geometry.location;
        	var marker = new google.maps.Marker({
				position: results[0].geometry.location,
				map: map
			});
			marker.setAnimation(google.maps.Animation.DROP);
		}
	});
	searchInput.value = '';
    searchInput.blur();
    $('.info').attr('data-shown',false).delay(400).hide(0);
    $('.menu li').removeClass('active');
}

// Evacuation Center Zoom in function, respons to activation via evacuation center list in absolutely placed div centered
function locationOne() {
	var firstlocation = new google.maps.LatLng(40.74349987900007, -73.92930675499991)
	map.setCenter(firstlocation);
	map.setZoom(16);
}

// GPS Location Function
function sensorRequest() {
	if(window.navigator.geolocation){
		navigator.geolocation.getCurrentPosition(success, error);
	}
	else {
		alert("Your browser does not support Geolocation. Please try updating your browser or use an alternative such as Mozilla Firefox or Google Chrome");
	}
}
function success(position) {
	var myLat = position.coords.latitude;
	var myLong = position.coords.longitude;
    var lastEntry = myLat,myLong;
	var locationResults = new google.maps.LatLng(myLat,myLong)
	map.setCenter(locationResults);
	map.setZoom(16);
	var marker = new google.maps.Marker ({
		position: locationResults,
		map: map
			
	});
	marker.setAnimation(google.maps.Animation.DROP);
    console.log('Geolocation sucessful');
    $('.info').attr('data-shown',false).delay(400).hide(0);
    $('.menu li').removeClass('active');
}
function error() {
	console.log('Geolocation unsuccessful');
	alert("Couldn't find your current position. Make sure location detection is enabled");
}
  
// UI TOGGLE FUNCTIONS
function navToggle() {
	$('.menu li').removeClass('active');
	$(this).addClass('active');
	if($(this).hasClass('about-toggle')){
		// toggle about
		if($('.about').attr('data-shown') !== 'true'){
			if($('.legend').attr('data-shown') == 'true'){
				$('.legend').attr('data-shown',false).fadeOut(400);
				$('.about').attr('data-shown',true).delay(400).fadeIn(400);
			}
			else if($('.evac').attr('data-shown') == 'true'){
				$('.evac').attr('data-shown',false).fadeOut(400);
				$('.about').attr('data-shown',true).delay(400).fadeIn(400);
			}
			else if($('.prepare').attr('data-shown') == 'true'){
				$('.prepare').attr('data-shown',false).fadeOut(400);
				$('.about').attr('data-shown',true).delay(400).fadeIn(400);
			}
			else {
				$('.about').attr('data-shown',true).fadeIn(400);
			}

		}
	}
	else if($(this).hasClass('legend-toggle')){
		// toggle legend
		if($('.legend').attr('data-shown') !== 'true'){
			if($('.about').attr('data-shown') == 'true'){
				$('.about').attr('data-shown',false).fadeOut(400);
				$('.legend').attr('data-shown',true).delay(400).fadeIn(400);
			}
			if($('.evac').attr('data-shown') == 'true'){
				$('.evac').attr('data-shown',false).fadeOut(400);
				$('.legend').attr('data-shown',true).delay(400).fadeIn(400);
			}
			if($('.prepare').attr('data-shown') == 'true'){
				$('.prepare').attr('data-shown',false).fadeOut(400);
				$('.legend').attr('data-shown',true).delay(400).show(0).fadeIn(400);
			}
			else {
				$('.legend').attr('data-shown',true).fadeIn(400);
			}
		}
	}
	else if($(this).hasClass('evac-toggle')){
		// toggle evac
		if($('.evac').attr('data-shown') !== 'true'){
			if($('.about').attr('data-shown') == 'true'){
				$('.about').attr('data-shown',false).fadeOut(400);
				$('.evac').attr('data-shown',true).delay(400).fadeIn(400);
			}
			if($('.legend').attr('data-shown') == 'true'){
				$('.legend').attr('data-shown',false).fadeOut(400);
				$('.evac').attr('data-shown',true).delay(400).fadeIn(400);
			}
			if($('.prepare').attr('data-shown') == 'true'){
				$('.prepare').attr('data-shown',false).fadeOut(400);
				$('.evac').attr('data-shown',true).delay(400).fadeIn(400);
			}
			else {
				$('.evac').attr('data-shown',true).fadeIn(400);
			}
		}
	}
	else if($(this).hasClass('prepare-toggle')){
		// toggle prepare
		if($('.prepare').attr('data-shown') !== 'true'){
			if($('.about').attr('data-shown') == 'true'){
				$('.about').attr('data-shown',false).fadeOut(400);
				$('.prepare').attr('data-shown',true).delay(400).fadeIn(400);
			}
			if($('.legend').attr('data-shown') == 'true'){
				$('.legend').attr('data-shown',false).fadeOut(400);
				$('.prepare').attr('data-shown',true).delay(400).fadeIn(400);
			}
			if($('.evac').attr('data-shown') == 'true'){
				$('.evac').attr('data-shown',false).fadeOut(400);
				$('.prepare').attr('data-shown',true).delay(400).fadeIn(400);
			}
			else {
				$('.prepare').attr('data-shown',true).fadeIn(400);
			}
		}
	}
}
function hideInfo() {
	if($(this).parent().hasClass('about')){
		$('.about').attr('data-shown',false).fadeOut(400);
	}
	else if($(this).parent().hasClass('legend')){
		$('.legend').attr('data-shown',false).fadeOut(400);
	}
	else if($(this).parent().hasClass('evac')){
		$('.evac').attr('data-shown',false).fadeOut(400);
	}
	else if($(this).parent().hasClass('prepare')){
		$('.prepare').attr('data-shown',false).fadeOut(400);
	}
	$('.menu li').removeClass('active');
}
function goToLocation(){
	var location = $(this).attr('data-geo');
	var locationArray = location.split(', ');
	var geoLocation = new google.maps.LatLng(locationArray[0],locationArray[1]);
	console.log(geoLocation);
	map.panTo(geoLocation);
	map.setZoom(16);
	$('.evac').attr('data-shown',false).fadeOut(400);
	$('.menu li').removeClass('active');
}
function resizeForm(){
	if($('html').hasClass('no-csscalc')){
		if(window.innerWidth < 660){
			$('.location form').css('width','100%').css('width','-=50px');
			$('.location input:first').css('width','100%').css('width','-=40px');
		}
		else {
			$('.location form').attr('style',null);
			$('.location input:first').attr('style',null);
		}
	}
}
$(function(){
	$('.location > button').on('click',sensorRequest);
	$('.location > form').on('submit', codeAddress);
	$('.location input[type="button"]').on('click',codeAddress);
	$('.menu li').on('click', navToggle);
	$('.info > button').on('click',hideInfo);
	$('.evacLocation').on('click',goToLocation);
	initialize();
	resizeForm();
});
$(window).resize(function(){
	resizeForm();
});