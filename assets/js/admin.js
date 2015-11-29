$(document).ready(function(){
    $(".button-collapse").sideNav({
        menuWidth: 200, // Default is 240
        edge: 'left',
    });

    setDetails();
    getBooks();
    $("#add-div").hide();

    $('.tooltipped').tooltip({delay: 50});

});

function setDetails(){
    var username = localStorage.getItem("username");
    $('#username').text(username);
}


function sendRequest(u){
    // Send request to server
    //u a url as a string
    //async is type of request
    var obj=$.ajax({url:u,async:false});
    //Convert the JSON string to object
    var result=$.parseJSON(obj.responseText);
    return result; //return object
}


function getBooks(){
    var theUrl="http://localhost/mobile-web/MWCFinal/model/book.php?cmd=9";
    var obj=sendRequest(theUrl);   //send request to the above url
    if(obj.result===1){          //check result
        showBooks(obj);
    }else{
        Materialize.toast('Failed', 4000);
    }
}

function showBooks(obj){
    var booksCard = "";
    for(var index in obj.books){
        booksCard += '<div class="col s12 m6 l4">';
        booksCard += '<div class="card hoverable">';
        booksCard += '<div class="card-image waves-effect waves-block waves-light">';
        booksCard += '<img class="activator" src="afire.jpeg">';
        booksCard += '</div>';
        booksCard += '<div class="card-content">';
        booksCard += '<span class="card-title activator grey-text text-darken-4">' +obj.books[index].title+
            '<i class="zmdi zmdi-more-vert right"></i></span>';
        booksCard += '<p><a href="#" class="truncate">'+obj.books[index].author+'</a>' +
            '<a href="javascript:getBook('+obj.books[index].id+')">' +
            '<i class="zmdi zmdi-comment right"></i></a></p></div>';
        booksCard += '<div class="card-reveal">';
        booksCard += '<span class="card-title grey-text text-darken-4">'+obj.books[index].title+'<i class="zmdi zmdi-close-circle right">' +
            '</i></span>';
        booksCard += '<p>'+obj.books[index].description+'</p>';
        booksCard += '</div></div></div>';
    }
    $("#main-div").html(booksCard);
    $("#main-div").show();
    $("#add-div").hide();
}

function showAddForm(){
    $("#add-div").show();
    $("#main-div").hide();
}

function getBook(id){

    var theUrl = "http://localhost/mobile-web/MWCFinal/model/book.php?cmd=6&id=" + id;
    var obj = sendRequest(theUrl);   //send request to the above url
    if (obj.result === 1) {          //check result
        showDetailsBook(obj);
        showReviews(obj);
    } else {
        Materialize.toast('Failed', 4000);
    }

}

function showDetailsBook(obj){
    var bookDetails = '';
    bookDetails += '<div class="col s12 m12 l5">';
    bookDetails += '<div class="card">';
    bookDetails += '<div class="card-image">';
    bookDetails += '<img src="afire.jpeg">';
    bookDetails += '<span class="card-title">'+obj.reviews[0].title+'</span>'
    bookDetails += '</div>';
    bookDetails += '<div class="card-content">';
    bookDetails += '<p>'+obj.reviews[0].author+'</p>';
    bookDetails += '</div>';
    bookDetails += '<div class="card-action">';
    bookDetails += '<a href="#"><i class="zmdi zmdi-money"> </i>'+obj.reviews[0].price+'</a>';
    bookDetails += '</div>';
    bookDetails += '</div>';
    bookDetails += '</div>';
    bookDetails += '<div class="col s12 m12 l7">';
    bookDetails += '<div class="card-panel orange-text">';
    bookDetails += '<div>'+obj.reviews[0].description+'</div>';
    bookDetails += '<div>ISBN: '+obj.reviews[0].isbn+'</div>';
    bookDetails += '<div>Year: '+obj.reviews[0].year+'</div>';
    bookDetails += '</div></div>';

    $('#review-div').html(bookDetails);

}

function showAdd(){

}

function addReview(){

}


function showReviews(obj){
    var reviewCards = "";

    for(var index in obj.reviews){
        alert(obj.reviews[index].review);
        reviewCards += '<li><div class="collapsible-header">';
        reviewCards += '<i class="zmdi zmdi-comment blue-grey-text"></i>'+obj.reviews[index].reviewer+'</div>';
        reviewCards += '<div class="collapsible-body"><p>'+obj.reviews[index].review+'</p></div></li>';
    }
    $('#reviews').html(reviewCards);
}

function searchBook(){
    //;

    var st = $("#search").val();
    if(st.length > 0) {
        var theUrl = "http://localhost/mobile-web/MWCFinal/model/book.php?cmd=5&st=" + st;
        var obj = sendRequest(theUrl);   //send request to the above url
        if (obj.result === 1) {          //check result
            showBooks(obj);
        } else {
            Materialize.toast('Failed', 4000);
        }
    }else{
        getBooks();
    }
}






function addBook(){
    var title = $('#title').val();
    var author = $('#author').val();
    var desc = $('textarea#desc').val();
    var year = $('#year').val();
    var price = $('#price').val();
    var isbn = $('#isbn').val();
    var theUrl="http://localhost/mobile-web/MWCFinal/model/book.php?cmd=1&" +
        "title="+title+"&author="+author+"&price="+price+"&yr="+year+"&desc="+
        desc+"&isbn="+isbn;
    var obj=sendRequest(theUrl);   //send request to the above url
    if(obj.result===1){          //check result
        Materialize.toast('Book Added', 4000);
        clearForm();
        $("#add-div").hide();
        getBooks();

    }else{
        Materialize.toast('Failed', 4000);
    }
}

function clearForm(){
    $('#title').val("");
    $('#author').val("");
    $('textarea#desc').val("");
    $('#year').val("");
    $('#price').val("");
    $('#isbn').val("");
}

function viewBook(){

}