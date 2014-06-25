<?php
include('res/data.php');
$dataRequest = json_decode($_POST);
function distance($latA, $lonA, $latB, $lonB) {
        // convert from degrees to radians
        $latA = deg2rad($latA); $lonA = deg2rad($lonA);
        $latB = deg2rad($latB); $lonB = deg2rad($lonB);

        // calculate absolute difference for latitude and longitude
        $dLat = ($latA - $latB);
        $dLon = ($lonA - $lonB);

        // do trigonometry magic
        $d =
                sin($dLat/2) * sin($dLat/2) +
                cos($latA) * cos($latB) * sin($dLon/2) *sin($dLon/2);
        $d = 2 * asin(sqrt($d));
        return $d * 6371;
}
if $dataRequest['request'] == 'find_nearest' {
	$evac_centers = $evacCenters = mysql_query("SELECT * FROM `evac_centers` ORDER BY `Building Name` ASC");
	$latRecieved = $dataRequest['lat'];
	$lonRecieved = $dataRequest['long'];
	$distArray = array();
	while($evacRow = mysql_fetch_array($evacCenters)){
		$geo = explode(", ",$evacRow['Geolocation']);
		$latEvac = $geo[0];
		$lonEvac = $geo[1];
		$calcDistance = distance($latA = $latRecieved, $lonA = $lonRecieved, $latB = $latEvac, $lonB = $lonEvac);
		array_push($distArray,$calcDistance);
	}
	sort($distArray);
}
?>