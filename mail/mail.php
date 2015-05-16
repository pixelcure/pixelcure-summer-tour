<?php
	 		// header('Access-Control-Allow-Origin: *');	
			
			if(!$_GET['firstName'] || !$_GET['lastName'] || !$_GET['phoneNumber'] || !$_GET['email'] || !$_GET['subject'] || !$_GET['message']){
			
				die();
			
			}
			
			// Today's Date
			$date = date("l jS \of F Y h:i:s A");
			
			// Email Contact
			$contact = 'pthibedeau@gmail.com';
			
			// Setting header to receive first/last name from passed data
			$header = 'From:' . $_GET['email'] . '< ' . $_GET['firstName'] . ' ' . $_GET['lastName'] . ' >';
			
			// Email Subject
			$subject = "PixelCure Inquiry From " . $_GET['firstName'] . ' ' . $_GET['lastName'] . '';

			// Creative one varaible with message
			$send = "              
					Date:   ". $date ."
					First Name:   ". $_GET['firstName'] ."
					Last Name: " . $_GET['lastName'] . "
					Phone Number: " . $_GET['phoneNumber'] . "
					Email:   ". $_GET['email'] ."
					Message:   ". $_GET['message'] ."";
					

			// Take Off!
			ini_set('sendmail_from', 'visitor@pixelcure.com');
			
			mail($contact, $subject, $send, $header);			
			
?>