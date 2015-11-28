<?php
session_start();
/**
 * Created by PhpStorm.
 * User: StreetHustling
 * Date: 11/25/15
 * Time: 10:51 AM
 */

if(filter_input (INPUT_GET, 'cmd')){
    $cmd = $cmd_sanitize = '';
    $cmd_sanitize = sanitize_string( filter_input (INPUT_GET, 'cmd'));
    $cmd = intval($cmd_sanitize);

    switch ($cmd){
        case 1:
            add_task_control();
            break;
        case 2:
            get_tasks_control();
            break;
        case 3:
            edit_task_control();
            break;
        case 4:
            get_task_control();
            break;
        default:
            echo '{"result":0, "message":"Invalid Command Entered"}';
            break;
    }
}




/**
 * @param $val
 * @return string
 */
function sanitize_string($val){
    $val = stripslashes($val);
    $val = strip_tags($val);
    $val = htmlentities($val);

    return $val;
}


/**
 * @return district_task
 */
function get_district_task_model(){
    require_once '../model/district_task.php';
    $obj = new district_task();
    return $obj;
}