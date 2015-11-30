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
        booksCard += '<p><a href="#" class="truncate">'+obj.books[index].author+'</a></p></div>';
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

function showSearch(){

}



function addBook(){
    var title = $('#title').val();
    var author = $('#author').val();
    var desc = $('#description').text();
    var year = $('#year').val();
    var price = $('#price').val();
    var isbn = $('#isbn').val();
    var theUrl="http://localhost/mobile-web/MWCFinal/model/book.php?cmd=1&" +
        "title="+title+"&author="+author+"&price="+price+"&yr="+year+"&desc="+
        desc+"&isbn="+isbn;
    var obj=sendRequest(theUrl);   //send request to the above url
    if(obj.result===1){          //check result
        Materialize.toast('Book Added', 4000);
        $("#add-div").hide();
        getBooks();

    }else{
        Materialize.toast('Failed', 4000);
    }
}