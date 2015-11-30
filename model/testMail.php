<?php
/**
 * Created by PhpStorm.
 * User: StreetHustling
 * Date: 11/30/15
 * Time: 5:49 PM
 */

// the message
$msg = "testing";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("kenneth.mensah@gmail.com","Testing",$msg);
?>