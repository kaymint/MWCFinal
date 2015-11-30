$(document).ready(function(){
    $(".button-collapse").sideNav({
        menuWidth: 200, // Default is 240
        edge: 'left',
    });

    $('.collapsible').collapsible({
        accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    setDetails();
    getBooks();
    $("#add-div").hide();

    $('.tooltipped').tooltip({delay: 50});

    $('.modal-trigger').leanModal();

});

var purchasedObject;

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
    $("#review-div").hide();
    $("#reviews").hide();
    //$('#add-review').hide();
}

function showAddForm(){
    $("#add-div").show();
    $("#main-div").hide();
    $("#review-div").hide();
    $("#reviews").hide();
}

function getBook(id){
    $("#main-div").hide();
    var theUrl = "http://localhost/mobile-web/MWCFinal/model/book.php?cmd=6&id=" + id;
    var obj = sendRequest(theUrl);   //send request to the above url
    if (obj.result === 1) {          //check result

        if(obj.reviews.length === 0){
            Materialize.toast('No Reviews', 4000);
            getOnlyBookDetails(id);
        }else{
            showDetailsBook(obj);
            showReviews(obj);
            showAddReview(id);
        }
    } else {
        Materialize.toast('Failed', 4000);
    }

}

function getOnlyBookDetails(id){
    var theUrl = "http://localhost/mobile-web/MWCFinal/model/book.php?cmd=4&id=" + id;
    var obj = sendRequest(theUrl);   //send request to the above url
    if (obj.result === 1) {          //check result

        if(obj.books.length === 0){
            Materialize.toast('No Details', 4000);
        }else{
            showNoReview(obj);
            showAddReview(id);
        }
    } else {
        Materialize.toast('Failed', 4000);
    }
}

function showNoReview(obj){

    var bookDetails = '';
    bookDetails += '<div class="col s12 m12 l5">';
    bookDetails += '<div class="card">';
    bookDetails += '<div class="card-image">';
    bookDetails += '<img src="afire.jpeg">';
    bookDetails += '<span class="card-title ">'+obj.books[0].title+'</span>'
    bookDetails += '</div>';
    bookDetails += '<div class="card-content">';
    bookDetails += '<p>'+obj.books[0].author+'</p>';
    bookDetails += '</div>';
    bookDetails += '<div class="card-action">';
    bookDetails += '<a class="modal-trigger" data-target="modal1" ><i class="zmdi zmdi-money"> </i>'+obj.books[0].price+'' +
        '<i class="zmdi zmdi-shopping-cart medium right" ' +
        'onclick="purchaseModal('+obj.books[0].id+')"></i></a>';
    bookDetails += '</div>';
    bookDetails += '</div>';
    bookDetails += '</div>';
    bookDetails += '<div class="col s12 m12 l7">';
    bookDetails += '<div class="card-panel orange-text">';
    bookDetails += '<div>'+obj.books[0].description+'</div>';
    bookDetails += '<div>ISBN: '+obj.books[0].isbn+'</div>';
    bookDetails += '<div>Year: '+obj.books[0].year+'</div>';
    bookDetails += '</div></div>';

    $('#review-div').html(bookDetails);
    $("#review-div").show();
    //$("#reviews").show();
    $('#add-review').show();
}

function showDetailsBook(obj){
    $("#review-div").show();
    var bookDetails = '';
    bookDetails += '<div class="col s12 m12 l5">';
    bookDetails += '<div class="card">';
    bookDetails += '<div class="card-image">';
    bookDetails += '<img src="afire.jpeg">';
    bookDetails += '<span class="card-title ">'+obj.reviews[0].title+'</span>'
    bookDetails += '</div>';
    bookDetails += '<div class="card-content">';
    bookDetails += '<p>'+obj.reviews[0].author+'</p>';
    bookDetails += '</div>';
    bookDetails += '<div class="card-action">';
    bookDetails += '<a class="modal-trigger" data-target="modal1" ><i class="zmdi zmdi-money"> </i>'+obj.reviews[0].price+'' +
        '<i class="zmdi zmdi-shopping-cart medium right" ' +
        'onclick="purchaseModal('+obj.reviews[0].id+')"></i></a>';
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


function purchaseModal(id){
    getPurchaseBook(id);
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .3, // Opacity of modal background
        in_duration: 200, // Transition in duration
        out_duration: 200, // Transition out duration
    });
}

function getPurchaseBook(id){
    //$("#main-div").hide();
    var theUrl = "http://localhost/mobile-web/MWCFinal/model/book.php?cmd=4&id=" + id;
    var obj = sendRequest(theUrl);   //send request to the above url
    if (obj.result === 1) {          //check result

        setModal(obj);
    } else {
        Materialize.toast('Failed', 4000);
    }
}

function sendPurchase(){
    //$("#main-div").hide();
    var user = localStorage.getItem("username");
    var bk = purchasedObject;
    var price = $("#cost").text();
    var theUrl = "http://localhost/mobile-web/MWCFinal/model/book.php?cmd=3&user="+
        user+"&bk="+bk+"&cost="+price;
    var obj = sendRequest(theUrl);   //send request to the above url
    if (obj.result === 1) {          //check result
        Materialize.toast('Added to Library : '+ obj.message, 4000);
    } else {
        Materialize.toast('Failed', 4000);
    }
}


function setModal(obj){
    $("#mod_title").text(obj.books[0].title);
    $("#mod_content").text(obj.books[0].author);
    $("#cost").text(obj.books[0].price);
    purchasedObject = obj.books[0].id;
}

function showAddReview(id){
    var addReviewCard = '';
    addReviewCard += '<div class="collapsible" data-collapsible="accordion"><div>';
    addReviewCard += '<div class="collapsible-header blue-grey-text"><i class="zmdi zmdi-comment-text"></i><h4>Add Review</h4></div>';
    addReviewCard += '<div class="" style="margin:5px">';
    addReviewCard += '<textarea class="materialize-textarea" id="new_review"></textarea>';
    addReviewCard += '<div style="padding: 3px;">';
    addReviewCard += '<a href="javascript:addReview('+id+')">SEND <i class="zmdi zmdi-mail-send"></i>';
    addReviewCard += '</a></div></div></div></div>';

    $('#add-review').html(addReviewCard);
}

function addReview(id){
    var reviewer = localStorage.getItem("username");
    var bk = id;
    var review = $("#new_review").val();
    var theUrl="http://localhost/mobile-web/MWCFinal/model/book.php?cmd=2" +
        "&review="+review+"&bk="+bk+"&reviewer="+reviewer;
    var obj=sendRequest(theUrl);   //send request to the above url
    if(obj.result===1){          //check result
        Materialize.toast('Review Added', 4000);
        getBook(id);

    }else{
        Materialize.toast('Failed', 4000);
    }
}


function showReviews(obj){
    $('#reviews').show();
    var reviewCards = '';
    reviewCards += '<div class="collapsible" data-collapsible="accordion">';
    for(var index in obj.reviews){
        reviewCards += '<div><div class="collapsible-header">';
        reviewCards += '<i class="zmdi zmdi-comments blue-grey-text"></i>'+obj.reviews[index].reviewer+'</div>';
        reviewCards += '<div class=""><p>'+ obj.reviews[index].review +'</p></div></div>';

    }
    reviewCards += '</div>';
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

function viewSales(){
    var theUrl="http://localhost/mobile-web/MWCFinal/model/book.php?cmd=8&user="+localStorage.getItem("username");
    var obj=sendRequest(theUrl);   //send request to the above url
    if(obj.result===1){          //check result
        showLibrary(obj);

    }else{
        Materialize.toast('Failed', 4000);
    }
}

function showLibrary(obj){
    var booksCard = "";
    for(var index in obj.purchases){
        booksCard += '<div class="col s12 m6 l4">';
        booksCard += '<div class="card hoverable">';
        booksCard += '<div class="card-image waves-effect waves-block waves-light">';
        booksCard += '<img class="activator" src="afire.jpeg">';
        booksCard += '</div>';
        booksCard += '<div class="card-content">';
        booksCard += '<span class="card-title activator grey-text text-darken-4">' +obj.purchases[index].title+
            '<i class="zmdi zmdi-more-vert right"></i></span>';
        booksCard += '<p><a href="#" class="truncate">'+obj.purchases[index].author+'</a>' +
            '<a href="javascript:getBook('+obj.purchases[index].id+')">' +
            '<i class="zmdi zmdi-comment right"></i></a></p></div>';
        booksCard += '<div class="card-reveal">';
        booksCard += '<span class="card-title grey-text text-darken-4">'+obj.purchases[index].title+'<i class="zmdi zmdi-close-circle right">' +
            '</i></span>';
        booksCard += '<p><span class="orange-text">Paid: $ </span> '+obj.purchases[index].cost+'</p>';
        booksCard += '<p><span class="orange-text">Purchased On: </span> '+obj.purchases[index].date+'</p>';
        booksCard += '<p>'+obj.purchases[index].description+'</p>';

        booksCard += '</div></div></div>';
    }
    $("#main-div").html(booksCard);
    $("#main-div").show();
    $("#add-div").hide();
    $("#review-div").hide();
    $("#reviews").hide();
}