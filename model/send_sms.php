<?php

require_once 'Smsgh/Api.php';

//$auth = new BasicAuth("yralkzfn", "znbzlsho");

$auth = new BasicAuth("jokyhrvs", "volkzmqn");
$apiHost = new ApiHost($auth);

$messagingApi = new MessagingApi($apiHost);

if(isset($_REQUEST['cmd']) && isset($_REQUEST['phone'])){
	$cmd = $_REQUEST['cmd'];
	$phone = $_REQUEST['phone'];
}

switch ($cmd) {
	case 1:
		try{

			$messageResponse = $messagingApi->sendQuickMessage("Book Store", "+".$phone, "You have been awarded a 10% discount");
			if ($messageResponse instanceof MessageResponse) {
		        echo $messageResponse->getStatus();
		    } elseif ($messageResponse instanceof HttpResponse) {
		        echo "\nServer Response Status : " . $messageResponse->getStatus();
		    }
		}catch (Exception $ex) {
		    echo $ex->getTraceAsString();
		}
		break;
	case 2:
		try{

			$messageResponse = $messagingApi->sendQuickMessage("Book Store", "+".$phone, "Registration Unsuccessful");
			if ($messageResponse instanceof MessageResponse) {
		        echo $messageResponse->getStatus();
		    } elseif ($messageResponse instanceof HttpResponse) {
		        echo "\nServer Response Status : " . $messageResponse->getStatus();
		    }
		}catch (Exception $ex) {
		    echo $ex->getTraceAsString();
		}
		break;

	case 3: 
		try{
			$mesg = $_REQUEST['mesg'];
			$messageResponse = $messagingApi->sendQuickMessage("Book Store", "+".$phone, $mesg);
			if ($messageResponse instanceof MessageResponse) {
		        echo $messageResponse->getStatus();
		    } elseif ($messageResponse instanceof HttpResponse) {
		        echo "\nServer Response Status : " . $messageResponse->getStatus();
		    }
		}catch (Exception $ex) {
		    echo $ex->getTraceAsString();
		}

		break;
	default:
		# code...
		break;
}

?>