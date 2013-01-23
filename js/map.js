var geocoder;
var map;
var scrollOne, scrollTwo, scrollThree, scrollFour;
function initialize() {
	
	//Mobile Device Optimizations//
	setTimeout(function() {
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) ||(navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/webOS/i))) {
			setTimeout(function() {
				window.scrollTo(0, 1);
			}, 0);
		}
		if(navigator.userAgent.match(/Android/i)) {
			document.getElementById('searchform').style.marginTop="-20px";
			setTimeout(function() {
				window.scrollTo(0, 1);
			}, 0);
		}
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
			if (window.screen.height==568) { // iPhone 4"
				document.querySelector("meta[name=viewport]").content="width=320.1";
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
	
	
	
	var canvas = document.getElementById("geocodebutton");
    var ctx = canvas.getContext("2d");
    draw(ctx);
	//Popup DIV size properties//
	if (window.innerWidth >= 796) {
		document.getElementById("navigation").style.display="inline";
		document.getElementById("navsmall").style.display="none";
		
		//resizers//
		//document.getElementById("closeevac").style.width="542px";
		//document.getElementById("closeevac").style.left="50%";
		//document.getElementById("closeevac").style.marginLeft="-271px";
		//document.getElementById("evaclist").getAttribute(ul).style.width="542px";
		//document.getElementById("evaclist").getAttribute(ul).style.left="50%";
		//document.getElementById("evaclist").getAttribute(ul).style.marginLeft="-271px";
		
	}
	if (window.innerWidth < 796) {
		document.getElementById("navigation").style.display="none";
		document.getElementById("navsmall").style.display="inline";
	}
	if (window.innerWidth > 500) {
		document.getElementById("searchbox").style.width="300px";
	}
	if (window.innerWidth <= 500) {
		document.getElementById("searchbox").style.width="200px";
	}
	if (window.innerWidth <= 390) {
		document.getElementById("searchbox").style.width="100px";
	}
	
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
function draw(ctx) {
    // layer1/Group
    ctx.save();
    // layer1/Group/Compound Path
    ctx.save();
    ctx.beginPath();
    // layer1/Group/Compound Path/Path
    ctx.moveTo(59.9, 27.5);
    ctx.bezierCurveTo(58.7, 12.9, 47.1, 1.3, 32.5, 0.1);
    ctx.lineTo(32.5, 0.0);
    ctx.lineTo(27.5, 0.0);
    ctx.lineTo(27.5, 0.1);
    ctx.bezierCurveTo(12.9, 1.3, 1.3, 12.9, 0.1, 27.5);
    ctx.lineTo(0.0, 27.5);
    ctx.lineTo(0.0, 32.5);
    ctx.lineTo(0.1, 32.5);
    ctx.bezierCurveTo(1.3, 47.1, 12.9, 58.7, 27.5, 59.9);
    ctx.lineTo(27.5, 60.0);
    ctx.lineTo(32.5, 60.0);
    ctx.lineTo(32.5, 59.9);
    ctx.bezierCurveTo(47.1, 58.7, 58.7, 47.1, 59.9, 32.5);
    ctx.lineTo(60.0, 32.5);
    ctx.lineTo(60.0, 27.5);
    ctx.lineTo(59.9, 27.5);
    ctx.closePath();
    // layer1/Group/Compound Path/Path
    ctx.moveTo(32.5, 54.9);
    ctx.lineTo(32.5, 42.0);
    ctx.lineTo(27.5, 42.0);
    ctx.lineTo(27.5, 54.9);
    ctx.bezierCurveTo(15.7, 53.7, 6.3, 44.3, 5.1, 32.5);
    ctx.lineTo(18.0, 32.5);
    ctx.lineTo(18.0, 27.5);
    ctx.lineTo(5.1, 27.5);
    ctx.bezierCurveTo(6.3, 15.7, 15.7, 6.3, 27.5, 5.1);
    ctx.lineTo(27.5, 18.0);
    ctx.lineTo(32.5, 18.0);
    ctx.lineTo(32.5, 5.1);
    ctx.bezierCurveTo(44.3, 6.3, 53.7, 15.7, 54.9, 27.5);
    ctx.lineTo(42.0, 27.5);
    ctx.lineTo(42.0, 32.5);
    ctx.lineTo(54.9, 32.5);
    ctx.bezierCurveTo(53.7, 44.3, 44.3, 53.7, 32.5, 54.9);
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();
    ctx.restore();
    ctx.restore();
}
function codeAddress() {
	var address = document.getElementById("searchbox").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(14);
            var lastEntry = results[0].geometry.location;
			var geoLocated = results[0].geometry.location;
        	var marker = new google.maps.Marker({
				position: results[0].geometry.location,
				map: map
			});
			marker.setAnimation(google.maps.Animation.DROP);
			infowindow.setContent("Test");
			infowindow.open(map, marker);
		}
		// results[4].formatted_address should be able to cull borough, allowing for distance API to have culled lists, allowing directions API to function
			// See if FusionTable can be used to pull results only for particular borough using distance api
	});
	$('.section').fadeOut(400);
	document.getElementById("searchbox").value = '';
    $('#searchbox').blur();
	window.scrollTo(0, 1);
}

// Evacuation Center Zoom in function, respons to activation via evacuation center list in absolutely placed div centered
function locationOne() {
	var firstlocation = new google.maps.LatLng(40.74349987900007, -73.92930675499991)
	map.setCenter(firstlocation);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwo() {
	var twolocation = new google.maps.LatLng(40.74011461400005, -73.98359086199991)
	map.setCenter(twolocation);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThree() {
	var locationthree = new google.maps.LatLng(40.77146613100007, -73.78078813299993)
	map.setCenter(locationthree);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFour() {
	var locationfour = new google.maps.LatLng(40.71074034500003, -73.72635998399994)
	map.setCenter(locationfour);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFive() {
	var locationfive = new google.maps.LatLng(40.67891607700005, -73.93162304799995)
	map.setCenter(locationfive);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSix() {
	var locationsix = new google.maps.LatLng(40.817315541000085, -73.94739898899991)
	map.setCenter(locationsix);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSeven() {
	var locationseven = new google.maps.LatLng(40.85722724100009, -73.91023097099992)
	map.setCenter(locationseven);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationEight() {
	var locationeight = new google.maps.LatLng(40.68901756100007, -73.97645432799993)
	map.setCenter(locationeight);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationNine() {
	var locationnine = new google.maps.LatLng(40.69688880800004, -73.9118267209999)
	map.setCenter(locationnine);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTen() {
	var locationten = new google.maps.LatLng(40.819551027000045, -73.95046535999995)
	map.setCenter(locationten);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationEleven() {
	var locationeleven = new google.maps.LatLng(40.66926033300007, -73.96135883099993)
	map.setCenter(locationeleven);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwelve() {
	var locationtwelve = new google.maps.LatLng(40.64536866100008, -74.08185583099993)
	map.setCenter(locationtwelve);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirteen() {
	var locationthirteen = new google.maps.LatLng(40.87545842800006, -73.86147513899994)
	map.setCenter(locationthirteen);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourteen() {
	var locationfourteen = new google.maps.LatLng(40.765089543000045, -73.82663921499994)
	map.setCenter(locationfourteen);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFifteen() {
	var locationfifteen = new google.maps.LatLng(40.72976691800005, -73.84480826999993)
	map.setCenter(locationfifteen);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSixteen() {
	var locationsixteen = new google.maps.LatLng(40.620912761000056, -73.98185609599994)
	map.setCenter(locationsixteen);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSeventeen() {
	var locationseventeen = new google.maps.LatLng(40.692745398000056, -73.86893333099994)
	map.setCenter(locationseventeen);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationEighteen() {
	var locationeighteen = new google.maps.LatLng(40.85560891200004, -73.92622858399994)
	map.setCenter(locationeighteen);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationNineteen() {
	var locationnineteen = new google.maps.LatLng(40.711454737000054, -73.90895232999992)
	map.setCenter(locationnineteen);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwenty() {
	var locationtwenty = new google.maps.LatLng(40.87410887700008, -73.83309568899995)
	map.setCenter(locationtwenty);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentyOne() {
	var locationtwentyone = new google.maps.LatLng(40.70968163500004, -73.80258031499994)
	map.setCenter(locationtwentyone);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentyTwo() {
	var locationtwentytwo = new google.maps.LatLng(40.768706146000056, -73.96503767099995)
	map.setCenter(locationtwentytwo);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentyThree() {
	var locationtwentyhree = new google.maps.LatLng(40.69248384900004, -73.95829320199994)
	map.setCenter(locationtwentythree);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentyFour() {
	var locationtwentyfour = new google.maps.LatLng(40.79152057500005, -73.97092045699992)
	map.setCenter(locationtwentyfour);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentyFive() {
	var locationtwentyfive = new google.maps.LatLng(40.65196447500006, -74.00731418299995)
	map.setCenter(locationtwentyfive);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentySix() {
	var locationtwentysix = new google.maps.LatLng(40.82786891200004, -73.91405909899993)
	map.setCenter(locationtwentysix);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentySeven() {
	var locationtwentyseven = new google.maps.LatLng(40.627852730000086, -74.00396205099992)
	map.setCenter(locationtwentyseven);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentyEight() {
	var locationtwentyeight = new google.maps.LatLng(40.815603304000035, -73.88551287299993)
	map.setCenter(locationtwentyeight);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationTwentyNine() {
	var locationtwentynine = new google.maps.LatLng(40.648526666000066, -73.95337508199992)
	map.setCenter(locationtwentynine);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirty() {
	var locationthirty = new google.maps.LatLng(40.67815125700008, -73.91584945099993)
	map.setCenter(locationthirty);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtyOne() {
	var locationthirtyone = new google.maps.LatLng(40.67156193900007, -73.89329366099992)
	map.setCenter(locationthirtyone);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtyTwo() {
	var locationthirtytwo = new google.maps.LatLng(40.697531179000066, -73.91941665199994)
	map.setCenter(locationthirtytwo);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtyThree() {
	var locationthirtythree = new google.maps.LatLng(40.62289560700009, -74.14503434599993)
	map.setCenter(locationthirtythree);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtyFour() {
	var locationthirtyfour = new google.maps.LatLng(40.80255395700004, -73.95411230499991)
	map.setCenter(locationthirtyfour);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtyFive() {
	var locationthirtyfive = new google.maps.LatLng(40.83940557100004, -73.93582337099991)
	map.setCenter(locationthirtyfive);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtySix() {
	var locationthirtysix = new google.maps.LatLng(40.83614545100005, -73.89059919899995)
	map.setCenter(locationthirtysix);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtySeven() {
	var locationthirtyseven = new google.maps.LatLng(40.77493748000006, -73.81863882499994)
	map.setCenter(locationthirtyseven);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtyEight() {
	var locationthirtyeight = new google.maps.LatLng(40.678821043000085, -73.83698782899995)
	map.setCenter(locationthirtyeight);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationThirtyNine() {
	var locationthirtynine = new google.maps.LatLng(40.77036516900006, -73.98664788399992)
	map.setCenter(locationthirtynine);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourty() {
	var locationfourty = new google.maps.LatLng(40.66940124800004, -73.97885730099995)
	map.setCenter(locationfourty);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtyOne() {
	var locationfourtyone = new google.maps.LatLng(40.874676555000065, -73.89300865699994)
	map.setCenter(locationfourtyone);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtyTwo() {
	var locationfourtytwo = new google.maps.LatLng(40.78594453200009, -73.97435836799991)
	map.setCenter(locationfourtytwo);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtyThree() {
	var locationfourtythree = new google.maps.LatLng(40.88813458100009, -73.91429165799991)
	map.setCenter(locationfourtythree);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtyFour() {
	var locationfourtyfour = new google.maps.LatLng(40.69556277700008, -73.98746204699995)
	map.setCenter(locationfourtyfour);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtyFive() {
	var locationfourtyfive = new google.maps.LatLng(40.75159251600007, -73.93681372099991)
	map.setCenter(locationfourtyfive);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtySix() {
	var locationfourtysix = new google.maps.LatLng(40.74090997600007, -73.87426483399992)
	map.setCenter(locationfourtysix);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtySeven() {
	var locationfourtyseven = new google.maps.LatLng(40.83786773300005, -73.86595577599991)
	map.setCenter(locationfourtyseven);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtyEight() {
	var locationfourtyeight = new google.maps.LatLng(40.79232491000005, -73.95141589699995)
	map.setCenter(locationfourtyeight);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFourtyNine() {
	var locationfourtynine = new google.maps.LatLng(40.66545543700005, -73.92572252999992)
	map.setCenter(locationfourtynine);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFifty() {
	var locationfifty = new google.maps.LatLng(40.74901335800007, -73.8669795269999)
	map.setCenter(locationfifty);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftyOne() {
	var locationfiftyone = new google.maps.LatLng(40.84388130800005, -73.88971005699995)
	map.setCenter(locationfiftyone);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftyTwo() {
	var locationfiftytwo = new google.maps.LatLng(40.64971002300007, -73.96649464699993)
	map.setCenter(locationfiftytwo);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftyThree() {
	var locationfiftythree = new google.maps.LatLng(40.69189660100005, -73.93140187699993)
	map.setCenter(locationfiftythree);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftyFour() {
	var locationfiftyfour = new google.maps.LatLng(40.85156759600005, -73.9107377009999)
	map.setCenter(locationfiftyfour);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftyFive() {
	var locationfiftyfive = new google.maps.LatLng(40.813669925000056, -73.90844170499992)
	map.setCenter(locationfiftyfive);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftySix() {
	var locationfiftysix = new google.maps.LatLng(40.60835877300008, -74.10501298399993)
	map.setCenter(locationfiftysix);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftySeven() {
	var locationfiftyseven = new google.maps.LatLng(40.76539952300004, -73.99257892999992)
	map.setCenter(locationfiftyseven);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftyEight() {
	var locationfiftyeight = new google.maps.LatLng(40.73777434600004, -73.81559634099995)
	map.setCenter(locationfiftyeight);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationFiftyNine() {
	var locationfiftynine = new google.maps.LatLng(40.75591755000005, -73.75658341199994)
	map.setCenter(locationfiftynine);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSixty() {
	var locationsixty = new google.maps.LatLng(40.71731940600006, -73.98935539399992)
	map.setCenter(locationsixty);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSixtyOne() {
	var locationsixtyone = new google.maps.LatLng(40.597678073000054, -74.12525157499994)
	map.setCenter(locationsixtyone);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSixtyTwo() {
	var locationsixtytwo = new google.maps.LatLng(40.52714751500008, -74.1925779199999)
	map.setCenter(locationsixtytwo);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSixtyThree() {
	var locationsixtythree = new google.maps.LatLng(40.75791340500007, -73.91051185799995)
	map.setCenter(locationsixtythree);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSixtyFour() {
	var locationsixtyfour = new google.maps.LatLng(40.83994344900009, -73.9112064329999)
	map.setCenter(locationsixtyfour);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
function locationSixtyFive() {
	var locationsixtyfive = new google.maps.LatLng(40.70179718600008, -73.79614505699993)
	map.setCenter(locationsixtyfive);
	map.setZoom(16);
	$('.section').fadeOut(400);
}
//End Evacuation Center Location zoom functions//

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
	map.setZoom(14);
	var marker = new google.maps.Marker ({
		position: locationResults,
		map: map
			
	});
	marker.setAnimation(google.maps.Animation.DROP);
    $('.section').fadeOut(400);
}
function error (){
	if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Windows Phone/i)) || (navigator.userAgent.match(/WebOS/i)) || (navigator.userAgent.match(/blackberry.*/))){
		alert("Couldn't find your current position. Make sure location detection is enabled")
	}
	else {
		alert("Your browser does not support Geolocation. Please try updating your browser or use an alternative such as Mozilla Firefox or Google Chrome")
	}
}
    
// UI TOGGLE FUNCTIONS
function closeSection() {
	$('.section').fadeOut(400);
}
function evactoggle() {
	$('.section').fadeOut(400);
	$('#evaccenters').fadeIn(400);
    if (window.innerWidth < 796) {
        $('#tinym').slideToggle(200);
    }
}
function legendtoggle() {
	$('.section').fadeOut(400);
	$('#legend').fadeIn(400);
    if (window.innerWidth < 796) {
        $('#tinym').slideToggle(200);
    }
}
function infotoggle() {
	$('.section').fadeOut(400);
	$('#prepare').fadeIn(400);
    if (window.innerWidth < 796) {
        $('#tinym').slideToggle(200);
    }
}
function abouttoggle() {
	$('.section').fadeOut(400);
	$('#aboutus').fadeIn(400);
    if (window.innerWidth < 796) {
        $('#tinym').slideToggle(200);
    }
}
function resized() {
	if((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) ||(navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/webOS/i))) {
			setTimeout(function(){
				window.scrollTo(0, 1);
			}, 0);
	}
	if (window.innerWidth >= 796) {
		document.getElementById("navigation").style.display="inline";
		document.getElementById("navsmall").style.display="none";
        document.getElementById("tinym").style.display="none"
	}
	if (window.innerWidth < 796) {
		document.getElementById("navigation").style.display="none";
		document.getElementById("navsmall").style.display="inline";
	}
	if (window.innerWidth > 500) {
		document.getElementById("searchbox").style.width="300px";
	}
	if (window.innerWidth <= 500) {
		document.getElementById("searchbox").style.width="200px";
	}
	if (window.innerWidth <= 390) {
		document.getElementById("searchbox").style.width="100px";
	}
    if (ua.indexOf("Android") >= 0 ) {
		var androidVersion = parseFloat(ua.slice(ua.indexOf("Android")+8));
		if (androidversion < 3.0) {
			if ($('#aboutus').is(':visible')){
                
            }
            else if ($('#legend').is(':visible')) {
                
            }
            else if ($('#evaccenters').is(':visible')) {
                
            }
            else if ($('#prepare').is(':visible')){
                
            }
		}
	}
}
function tinyMenu() {
	$('#tinym').slideToggle(200);
};

//FUNCTIONS RELATING TO PREPARE INFO
function toggleInZone() {
	$('#inzone_text').slideToggle(400, inzoneImgRotate);
}
function toggleOutZone() {
	$('#outzone_text').slideToggle(400, outzoneImgRotate);
}
function toggleHighRise() {
	$('#highrise_text').slideToggle(400, highriseImgRotate);
}
function inzoneImgRotate(){
    if ($('#inzone_text').is(':visible')) {
        $('#inzone_arrow').rotate(180);
    }
    else {
        $('#inzone_arrow').rotate(0, 'abs');
        
    }
}
function outzoneImgRotate(){
    if ($('#outzone_text').is(':visible')) {
        $('#outzone_arrow').rotate(180);
        
    }
    else {
        $('#outzone_arrow').rotate(0, 'abs');
    }
        
}
function highriseImgRotate(){
    if($('#highrise_text').is(':visible')) {
        $('#highrise_arrow').rotate(180);
    }
    else {
        $('#highrise_arrow').rotate(0, 'abs');
    }
}
window.onload = function(){
	initialize();
}
window.onresize = function(){
	resized();
}
window.onorientationchange = function(){
	resized();
}