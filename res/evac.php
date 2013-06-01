<div>
	<?php
		$evacCenters = mysql_query("SELECT * FROM evac_centers ORDER BY 'Building Name' DESC ");
		while($evacRow = mysql_fetch_array($evacCenters)){
			echo('<section class="evacLocation" data-geo="'.$evacRow['Geolocation'].'" data-borough="'.$evacRow['Facilitating Borough'].'">');
			echo('<h2>'.$evacRow['Building Name'].'</h2>');
			echo('<span>'.$evacRow['Street Address'].'</span>');
			echo('<span>'.$evacRow['City'].','.$evacRow['State'].' '.$evacRow['Zip Code'].'</span>');
			echo('</section>');
		}
	?>
</div>
<button>Close</button>