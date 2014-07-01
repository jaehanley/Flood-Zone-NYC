google.maps.visualRefresh = true;

var geocoder;
var map;
var fbAppId = 335444676610744;
var iOS = $('html').hasClass('iOS');
var android = $('html').hasClass('android');
var standalone = window.navigator.standalone;

function initialize() {
	if(window.console){
		console.log("Wanted to view under the hood? Checkout the source over at GitHub: https://github.com/darrellhanley/Flood-Zone-NYC\nAnd hey, maybe check out my portfolio while you're at it: http://www.darrellhanley.com");
	}
	
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
	        "featureType": "landscape",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 65
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 30
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 40
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.province",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "lightness": -25
	            },
	            {
	                "saturation": -100
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "lightness": -25
	            },
	            {
	                "saturation": -90
	            }
	        ]
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
}
function codeAddress(event) {
	event.preventDefault();
	var searchInput = $('.location input[type="search"]')[0];
	var address = searchInput.value;
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
    _gaq.push(['_trackEvent','Find by Address']);
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
	_gaq.push(['_trackEvent','Find by Geolocation']);
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
    $('.info').attr('data-shown',false).delay(400).hide(0);
    $('.menu li').removeClass('active');
}
function error() {
	alert("Couldn't find your current position. Make sure location detection is enabled");
}
  
// UI TOGGLE FUNCTIONS
function navToggle() {
	var pressedVal = $(this).html();
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
	_gaq.push(['_trackEvent',pressedVal + ' button']);
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
function facebookShare(url, name){
	FB.ui({
		name: name,
		link: url,
		method: "feed"
	});
	_gaq.push(['_trackEvent','Facebook Share']);
}
window.fbAsyncInit = function() {
	FB.init({
		appId      : fbAppId, // App ID
		status     : true,    // check login status
		cookie     : true,    // enable cookies to allow the
		                    // server to access the session
		xfbml      : true,     // parse page for xfbml or html5
		                    // social plugins like login button below
		version        : 'v2.0',  // Specify an API version
	});
};
function newWindow(event){
	event.preventDefault();
	var href = $(this).attr('href');
	var network;
	if($(this).hasClass('twitter')){
		network = 'Twitter';
	}
	else {
		network = 'Google Plus';
	}
	_gaq.push(['_trackEvent',network + ' Share']);
	if(iOS && standalone){
		if(network == 'Twitter'){
			window.location.href = 'twitter://post?message=Flood%20Zone%20NYC%20-%20http%3A%2F%2Fwww.floodzonenyc.com';
		}
		else if(network == 'Google Plus'){
			window.location.href = 'gplus://plus.google.com/share?url=http://www.floodzonenyc.com';
		}
	}
	else {
		window.open(href, 'Share to '+network, "menubar=no,location=no,resizable=yes,scrollbar=no,status=no,width=520,height=550");
	}
}
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
$(function(){
	$('.location > button').on('click',sensorRequest);
	$('.location > form').on('submit', codeAddress);
	$('.location input[type="button"]').on('click',codeAddress);
	$('.menu li').on('click', navToggle);
	$('.info > button').on('click',hideInfo);
	$('.evacLocation').on('click',goToLocation);
	$('.twitter, .gplus').on('click', newWindow);
	if(iOS && standalone){
		$('#get-app').remove();
	}
	initialize();
	resizeForm();
});
$(window).resize(function(){
	resizeForm();
});