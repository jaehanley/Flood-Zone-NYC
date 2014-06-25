<div>
	<section>
		<h4>Bronx</h4>
		<?php
			$evacCenters = mysql_query("SELECT * FROM `evac_centers` WHERE `Facilitating Borough` = 'Bronx' ORDER BY `Building Name` ASC ");
			while($evacRow = mysql_fetch_array($evacCenters)){
				echo('<div class="evacLocation" data-geo="'.$evacRow['Geolocation'].'" >');
				echo('<h2>'.$evacRow['Building Name'].'</h2>');
				echo('<span>'.$evacRow['Street Address'].'</span>');
				echo('<span>'.$evacRow['City'].', '.$evacRow['State'].' '.$evacRow['Zip Code'].'</span>');
				echo('</div>');
			}
		?>
	</section>
	<section>
		<h4>Brooklyn</h4>
		<?php
			$evacCenters = mysql_query("SELECT * FROM `evac_centers` WHERE `Facilitating Borough` = 'Brooklyn' ORDER BY `Building Name` ASC ");
			while($evacRow = mysql_fetch_array($evacCenters)){
				echo('<div class="evacLocation" data-geo="'.$evacRow['Geolocation'].'" >');
				echo('<h2>'.$evacRow['Building Name'].'</h2>');
				echo('<span>'.$evacRow['Street Address'].'</span>');
				echo('<span>'.$evacRow['City'].','.$evacRow['State'].' '.$evacRow['Zip Code'].'</span>');
				echo('</div>');
			}
		?>
	</section>
	<section>
		<h4>Queens</h4>
		<?php
			$evacCenters = mysql_query("SELECT * FROM `evac_centers` WHERE `Facilitating Borough` = 'Queens' ORDER BY `Building Name` ASC ");
			while($evacRow = mysql_fetch_array($evacCenters)){
				echo('<div class="evacLocation" data-geo="'.$evacRow['Geolocation'].'" >');
				echo('<h2>'.$evacRow['Building Name'].'</h2>');
				echo('<span>'.$evacRow['Street Address'].'</span>');
				echo('<span>'.$evacRow['City'].','.$evacRow['State'].' '.$evacRow['Zip Code'].'</span>');
				echo('</div>');
			}
		?>
	</section>
	<section>
		<h4>Manhattan</h4>
		<?php
			$evacCenters = mysql_query("SELECT * FROM `evac_centers` WHERE `Facilitating Borough` = 'Manhattan' ORDER BY `Building Name` ASC ");
			while($evacRow = mysql_fetch_array($evacCenters)){
				echo('<div class="evacLocation" data-geo="'.$evacRow['Geolocation'].'" >');
				echo('<h2>'.$evacRow['Building Name'].'</h2>');
				echo('<span>'.$evacRow['Street Address'].'</span>');
				echo('<span>'.$evacRow['City'].','.$evacRow['State'].' '.$evacRow['Zip Code'].'</span>');
				echo('</div>');
			}
		?>
	</section>
	<section>
		<h4>Staten Island</h4>
		<?php
			$evacCenters = mysql_query("SELECT * FROM `evac_centers` WHERE `Facilitating Borough` = 'Staten Island' ORDER BY `Building Name` ASC ");
			while($evacRow = mysql_fetch_array($evacCenters)){
				echo('<div class="evacLocation" data-geo="'.$evacRow['Geolocation'].'" >');
				echo('<h2>'.$evacRow['Building Name'].'</h2>');
				echo('<span>'.$evacRow['Street Address'].'</span>');
				echo('<span>'.$evacRow['City'].','.$evacRow['State'].' '.$evacRow['Zip Code'].'</span>');
				echo('</div>');
			}
		?>
	</section>
</div>
<button>Close</button>