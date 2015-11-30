<?php
session_start();
/**
 * Created by PhpStorm.
 * User: StreetHustling
 * Date: 11/28/15
 * Time: 3:29 PM
 */


    include_once 'adb.php';

    class books extends adb{

        function books(){}

        //add new user
        function add_book($title, $author, $desc, $isbn, $year, $price){
            $str_query =  "INSERT into mwc_books SET
                   title = '$title',
                   author = '$author',
                   description = '$desc',
                   isbn = '$isbn',
                   year = $year,
                   price = $price";

            return $this->query($str_query);
        }


        /**
         * function edit price details
         */
        function edit_price($id, $price){
            $str_query = "UPDATE mwc_books SET
                price = $price
                WHERE id = $id";

            return $this->query($str_query);
        }

        /*
         *
         */
        function get_book($id){
            $str_query = "SELECT * FROM mwc_books
                WHERE id = $id";

            return $this->query($str_query);
        }

        function get_books(){
            $str_query = "SELECT * FROM mwc_books";

            return $this->query($str_query);
        }

        function search_book($st){
            $str_query = "SELECT * FROM mwc_books
                WHERE author LIKE '%$st%' OR title LIKE '%$st%'";

            return $this->query($str_query);
        }


        //add new review
        function add_review($review, $book, $reviewer){
            $str_query =  "INSERT into mwc_reviews SET
                   review = '$review',
                   book = $book,
                   date = CURDATE(),
                   reviewer = '$reviewer'";

            return $this->query($str_query);
        }

        /**
         * @param $book
         * @return bool
         */
        function get_reviews($book){
            $str_query = "SELECT * FROM mwc_books B, mwc_reviews R
                WHERE B.id = R.book AND R.book = $book";

            return $this->query($str_query);
        }


        /**
         * @param $book
         * @return bool
         */
        function search_reviews($book){
            $str_query = "SELECT * FROM mwc_books B, mwc_reviews R
                WHERE B.id = R.book AND B.title LIKE '%$book%' ";

            return $this->query($str_query);
        }


        function purchase_book($book, $user, $cost){
            $str_query = "INSERT into mwc_book_purchases SET
                   book_id = $book,
                   date = CURDATE(),
                   cost = $cost,
                   user_id = '$user'";

            return $this->query($str_query);
        }


        function get_purchases($user){
            $str_query = "SELECT * FROM mwc_books B, mwc_book_purchases P
                WHERE P.book_id = B.id AND P.user_id = '$user'  ORDER BY DATE DESC";

            return $this->query($str_query);
        }


    }

if(isset($_REQUEST['cmd'])){
    $cmd = intval($_REQUEST['cmd']);

    switch($cmd){
        case 1:
            add_book_control();
            break;
        case 2:
            add_review_control();
            break;
        case 3:
            add_purchase_control();
            break;
        case 4:
            get_book_control();
            break;
        case 5:
            search_book_control();
            break;
        case 6:
            get_review_control();
            break;
        case 7:
            search_review_by_book();
            break;
        case 8:
            get_purchases_control();
            break;
        case 9:
            get_books_control();
            break;
    }
}

function add_book_control(){
    if( filter_input (INPUT_GET, 'title') && filter_input(INPUT_GET, 'author')
        && filter_input(INPUT_GET, 'yr') && filter_input(INPUT_GET, 'price')){

        $obj = new books();
        $title = sanitize_string(filter_input (INPUT_GET, 'title'));
        $author = sanitize_string(filter_input (INPUT_GET, 'author'));
        $year = sanitize_string(filter_input(INPUT_GET, 'yr'));
        $price = sanitize_string(filter_input(INPUT_GET, 'price'));
        $desc = sanitize_string(filter_input(INPUT_GET, 'desc'));
        $isbn = sanitize_string(filter_input(INPUT_GET, 'isbn'));


        if ($obj->add_book($title, $author, $desc, $isbn, $year, $price)){

            echo '{"result":1,"message": "book added"}';
        }
        else
        {
            echo '{"result":0,"message": "book add unsuccessful"}';
        }

    }
}


function add_review_control(){
    if( filter_input (INPUT_GET, 'review') && filter_input(INPUT_GET, 'bk')
        && filter_input(INPUT_GET, 'reviewer')){

        $obj = new books();
        $review = sanitize_string(filter_input (INPUT_GET, 'review'));
        $book = sanitize_string(filter_input (INPUT_GET, 'bk'));
        $reviewer = sanitize_string(filter_input(INPUT_GET, 'reviewer'));


        if ($obj->add_review($review, $book, $reviewer)){

            echo '{"result":1,"message": "review added"}';
        }
        else
        {
            echo '{"result":0,"message": "review addition unsuccessful"}';
        }

    }
}


function add_purchase_control(){
    if( filter_input (INPUT_GET, 'user') && filter_input(INPUT_GET, 'bk')
        && filter_input(INPUT_GET, 'cost')){

        $obj = new books();
        $user = sanitize_string(filter_input (INPUT_GET, 'user'));
        $book = sanitize_string(filter_input (INPUT_GET, 'bk'));
        $cost = sanitize_string(filter_input(INPUT_GET, 'cost'));


        if ($obj->purchase_book($book, $user, $cost)){
            $sms = sendPurchaseNotification($_SESSION['phone'], "Your purchase Transaction has been confirmed");
            if($sms === true){
                echo '{"result":1,"message": "purchase added"}';
            }else{
                echo '{"result":1,"message": "purchase added but sms pending"}';
            }

        }
        else
        {
            echo '{"result":0,"message": "purchase addition unsuccessful"}';
        }

    }
}


function get_book_control(){
    if(filter_input (INPUT_GET, 'id')){

        $obj = new books();
        $id = sanitize_string(filter_input (INPUT_GET, 'id'));

        if($obj->get_book($id)){
            echo '{"result":1, "books":[';
            $row = $obj->fetch();
            while($row){
                echo json_encode($row);
                if( $row = $obj->fetch()){
                    echo ',';
                }
            }
            echo ']}';
        }
        else{
            echo '{"result":0,"message": "Book not found"}';

        }
    }
}

function get_books_control(){


        $obj = new books();

        if($obj->get_books()){
            echo '{"result":1, "books":[';
            $row = $obj->fetch();

            while($row){
                echo json_encode($row);
//                echo '{';
//                echo '"id":'.$row['id'].',';
//                echo '"title":'.$row['title'].',';
//                echo '"author":'.$row['author'].',';
//                echo '"desc":'.$row['desc'].',';
//                echo '"isbn":'.$row['isbn'].',';
//                echo '"year":'.$row['year'].',';
//                echo '"price":'.$row['price'].',';
//                echo '}';
                if( $row = $obj->fetch()){
                    echo ',';
                }
            }
            echo ']}';
        }
        else{
            echo '{"result":0,"message": "Book not found"}';

        }
}

function search_book_control(){
    if(filter_input (INPUT_GET, 'st')){

        $obj = new books();
        $st = sanitize_string(filter_input (INPUT_GET, 'st'));

        if($obj->search_book($st)){
            echo '{"result":1, "books":[';
            $row = $obj->fetch();
            while($row){
                echo json_encode($row);
                if( $row = $obj->fetch()){
                    echo ',';
                }
            }
            echo ']}';
        }
        else{
            echo '{"result":0,"message": "Book not found"}';

        }
    }
}


function get_review_control(){
    if(filter_input (INPUT_GET, 'id')){

        $obj = new books();
        $id = sanitize_string(filter_input (INPUT_GET, 'id'));

        if($obj->get_reviews($id)){
            echo '{"result":1, "reviews":[';
            $row = $obj->fetch();
            while($row){
                echo json_encode($row);
                if( $row = $obj->fetch()){
                    echo ',';
                }
            }
            echo ']}';
        }
        else{
            echo '{"result":0,"message": "Unsuccessful review"}';

        }
    }
}


function search_review_by_book(){
    if(filter_input (INPUT_GET, 'book')){

        $obj = new books();
        $id = sanitize_string(filter_input (INPUT_GET, 'book'));

        if($obj->search_reviews($id)){
            echo '{"result":1, "reviews":[';
            $row = $obj->fetch();
            while($row){
                echo json_encode($row);
                if( $row = $obj->fetch()){
                    echo ',';
                }
            }
            echo ']}';
        }
        else{
            echo '{"result":0,"message": "Unsuccessful review"}';

        }
    }
}

function get_purchases_control(){
    if(filter_input (INPUT_GET, 'user')){

        $obj = new books();
        $user = sanitize_string(filter_input (INPUT_GET, 'user'));

        if($obj->get_purchases($user)){
            echo '{"result":1, "purchases":[';
            $row = $obj->fetch();
            while($row){
                echo json_encode($row);
                if( $row = $obj->fetch()){
                    echo ',';
                }
            }
            echo ']}';
        }
        else{
            echo '{"result":0,"message": "Unsuccessful query"}';

        }
    }
}

function sendPurchaseNotification($phone, $message){
    try{
        require_once 'Smsgh/Api.php';
        $auth = new BasicAuth("jokyhrvs", "volkzmqn");
        $apiHost = new ApiHost($auth);
        $messagingApi = new MessagingApi($apiHost);
        $messageResponse = $messagingApi->sendQuickMessage("Book Store", "+".$phone, $message);
        if ($messageResponse instanceof MessageResponse) {
            //echo $messageResponse->getStatus();
            return true;
        } elseif ($messageResponse instanceof HttpResponse) {
            //echo "\nServer Response Status : " . $messageResponse->getStatus();
            return false;
        }
    }catch (Exception $ex) {
        echo $ex->getTraceAsString();
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


