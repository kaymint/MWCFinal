<?php
session_start();
    
    include_once 'adb.php';

    class user extends adb{
       
        function user(){}
        
        //add new user
        function add_user($username, $password, $email, $phone){
            $str_query =  "INSERT into mwc_book_users SET
                   username = '$username',
                   password = '$password',
                   email = '$email',
                   phone = '$phone'";

            return $this->query($str_query);
        }
        
        
        /**
         * function edit user password details
         */
        function edit_password($username, $password){
            $str_query = "UPDATE se_users SET
                password = '$password'
                WHERE username = '$username'";
            
            return $this->query($str_query);
        }

        /**
         * function edit user password details
         */
        function edit_password_byId($id, $password){
            $str_query = "UPDATE se_users SET
                password = '$password'
                WHERE user_id = $id";

            return $this->query($str_query);
        }
        
        /*
         *
         */
        function get_user($username, $pass){
            $str_query = "SELECT * FROM mwc_book_users
                WHERE username = '$username' AND password = '$pass'";
            
            return $this->query($str_query);
        }

        function get_user_byId($id){
            $str_query = "SELECT * FROM mwc_book_users
                WHERE user_id = $id";

            return $this->query($str_query);
        }
        
    }


//$obj = new user();
//if($obj->get_user('kwadwo')){
//    $row = $obj->fetch();
//    echo $row['password'];
//}
//else{
//    echo 'sth';
//}

// $obj = new user();
// if($obj->add_user("kwasi_banmmnjkj", "demo", "admin",'dffdfdfd')){
//     echo "sth". $result;
// }else{
//     echo "nana";
// }

if(isset($_REQUEST['cmd'])){
    $cmd = intval($_REQUEST['cmd']);

    switch($cmd){
        case 1:
            signup_control();
            break;
        case 2:
            login_control();
            break;
    }
}

function signup_control(){
    if( filter_input (INPUT_GET, 'user') && filter_input(INPUT_GET, 'pass')
        && filter_input(INPUT_GET, 'email') && filter_input(INPUT_GET, 'phone')){

        $obj = new user();
        $username = sanitize_string(filter_input (INPUT_GET, 'user'));
        $password = sanitize_string(filter_input (INPUT_GET, 'pass'));
        $email = sanitize_string(filter_input(INPUT_GET, 'email'));
        $phone = sanitize_string(filter_input(INPUT_GET, 'phone'));

        if ($obj->add_user($username, $password, $email, $phone)){
            $msg = "Dear, ". $username. "\n";
            $msg.= "Thank You for joining book reviews. \n";
            $msg.= "We are delighted you have become a part of this wonderful learning experience";
            $msg.= "Read Right With BOOK REVIEWS!!!";

            $to = $email;
            $subject = "Welcome";
            $headers = "From: kenneth.mensah@ashesi.edu.gh";
            $_SESSION['phone'] = $phone;

            mail($to,$subject,$msg,$headers);

            echo '{"result":1,"username": "'.$username.'",
                    "email": "'.$email.'", "phone": "'.$phone.'"}';
        }
        else
        {
            echo '{"result":0,"message": "signup unsuccessful"}';
        }

    }
}


function login_control(){
    if(filter_input (INPUT_GET, 'user') && filter_input(INPUT_GET, 'pass')){

        $obj = new user();
        $username = sanitize_string(filter_input (INPUT_GET, 'user'));
        $pass = sanitize_string(filter_input (INPUT_GET, 'pass'));

        if($obj->get_user($username, $pass)){
            $row = $obj->fetch();

            if($row == 0){
                echo "Invalid user";
            }else {
                $username = $row['username'];
                $email = $row['email'];
                $_SESSION['phone'] = $row['phone'];
                echo '{"result":1,"username": "'.$username.'",
                    "email": "'.$email.'"}';

            }
        }
        else{
            echo '{"result":0,"message": "Invalid User"}';

        }
    }else{
        echo '{"result":0,"message": "Invalid Credentials"}';

    }
}


/**
 * sanitize input from url
 * @param $val
 * @return string
 */
function sanitize_string($val){
    $val = stripslashes($val);
    $val = strip_tags($val);
    $val = htmlentities($val);

    return $val;
}


