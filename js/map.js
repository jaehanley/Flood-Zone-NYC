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
				if (window.screen.height==568) { // iPhone 4"
					document.querySelector("meta[name=viewport]").content="width=320.1";
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
	var zones = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			from: '13uEi2dynsKzdVyegQvO7QH59OOOnjxjd3Ry9BEA'
		},
		clickable: 0,
		styles: [{
			polygonOptions: {
				fillColor: "#AA2C1F",
				fillOpacity: 0.4
			}
		},{
			where:"CAT1NNE = 'B'",
			polygonOptions: {
				fillColor: "#DC9427"
			}
		},{
			where:"CAT1NNE = 'C'",
			polygonOptions: {
				fillColor: "#EFEF3A"
			}
		}]
	});
	var locations = new google.maps.FusionTablesLayer({
  		query: {
    		select: 'Geocodable address',
    		from: '2047825'
  		},
	});
	zones.setMap(map);
	locations.setMap(map);
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
			/*infowindow.setContent("Test");
			infowindow.open(map, marker);*/
		}
		// results[4].formatted_address should be able to cull borough, allowing for distance API to have culled lists, allowing directions API to function
			// See if FusionTable can be used to pull results only for particular borough using distance api
	});
	searchInput.value = '';
    searchInput.blur();
    $('.info').attr('data-shown',false).delay(400).hide(0);
}

// Evacuation Center Zoom in function, respons to activation via evacuation center list in absolutely placed div centered
function locationOne() {
	var firstlocation = new google.maps.LatLng(40.74349987900007, -73.92930675499991)
	map.setCenter(firstlocation);
	map.setZoom(16);
}
/*function shelterLocation(){
	var latlong = $(this).attr('data-lat-long');
	var location = new google.maps.latLng+latlong;
	map.setCenter(location);
	map.setZoom(16);
}*/

//GPS Location Function//
function sensorRequest() {
	navigator.geolocation.getCurrentPosition(success, error);
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
}
function error() {
	console.log('Geolocation unsuccessful');
	if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Windows Phone/i)) || (navigator.userAgent.match(/WebOS/i)) || (navigator.userAgent.match(/blackberry/i))){
		alert("Couldn't find your current position. Make sure location detection is enabled");
	}
	else {
		alert("Your browser does not support Geolocation. Please try updating your browser or use an alternative such as Mozilla Firefox or Google Chrome");
	}
}
  
// UI TOGGLE FUNCTIONS
function navToggle() {
	if($(this).hasClass('about-toggle')){
		// toggle about
		if($('.about').attr('data-shown') == 'true'){
			// Do Nothing
		}
		else {
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
		if($('.legend').attr('data-shown') == 'true'){
			// Do Nothing
		}
		else {
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
		if($('.evac').attr('data-shown') == 'true'){
			// Do Nothing
		}
		else {
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
		if($('.prepare').attr('data-shown') == 'true'){
			// Do Nothing
		}
		else {
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
}
function menuSwipeStart(event){
	event.preventDefault();
	var touch = event.originalEvent.touches[0];
	var x = touch.pageX;
	var y = touch.pageY;
	$(this).attr({'data-x': x, 'data-y': y});
}
function menuSwipeMid(event){
	event.preventDefault();
	var touch = event.originalEvent.touches[0];
	var x = touch.pageX;
	var y = touch.pageY;
	var startX = $(this).attr('data-x');
	var startY = $(this).attr('data-y');
	if((x - startX <= 10)&&(x - startX >= -10)){
		if(y - startY < -20){
			if($(this).attr('data-hidden') == 'true'){
				$(this).attr('data-hidden',false);
			}
		}
		else if (y - startY > 20){
			if($(this).attr('data-hidden') !== 'true'){
				$(this).attr('data-hidden',true);
			}
		}
	}
}
function menuSwipeEnd(event){
	event.preventDefault();
}
function goToLocation(){
	var location = $(this).attr('data-geo');
	var locationArray = location.split(', ');
	var geoLocation = new google.maps.LatLng(locationArray[0],locationArray[1]);
	console.log(geoLocation);
	map.panTo(geoLocation);
	map.setZoom(16);
	$('.evac').attr('data-shown',false).fadeOut(400);
}
window.onload = function(){
	$('.location > button').on('click',sensorRequest);
	$('.location > form').on('submit', codeAddress);
	$('.location input[type="button"]').on('click',codeAddress);
	$('.menu a').on('click touchstart', navToggle);
	$('.info > button').on('click',hideInfo);
	$('header > nav:last-of-type').on('touchstart',menuSwipeStart);
	$('header > nav:last-of-type').on('touchmove',menuSwipeMid);
	$('header > nav:last-of-type').on('touchend',menuSwipeEnd);
	$('.evacLocation').on('click',goToLocation);
	initialize();
}