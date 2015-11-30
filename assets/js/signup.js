/**
 * Created by StreetHustling on 11/28/15.
 */
$(document).ready(function(){

});

function sendRequest(u){
    // Send request to server
    //u a url as a string
    //async is type of request
    var obj=$.ajax({url:u,async:false});
    //Convert the JSON string to object
    var result=$.parseJSON(obj.responseText);
    return result; //return object
}


function signup(){
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var phone = $('#phone').val();
    var theUrl="http://localhost/mobile-web/MWCFinal/model/user.php?cmd=1&user=" +username+
        "&pass=" +password+
        "&email="+email+"&phone="+phone;
    var obj=sendRequest(theUrl);   //send request to the above url
    if(obj.result===1){          //check result

        localStorage.setItem("email", obj.email);
        localStorage.setItem("username", obj.username);
        window.location.replace("http://localhost/mobile-web/MWCFinal/view/admin_dashboard.html");
    }else{
        Materialize.toast('Failed', 4000);
    }
}

function validateLogin(user, pass){
    var theUrl="http://localhost/mobile-web/MWCFinal/model" +
        "/user.php?cmd=2&user="+user+"&pass="+pass;
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1){					//check result
        localStorage.setItem("email", obj.email);
        localStorage.setItem("username", obj.username);
        window.location.replace("http://localhost/mobile-web/MWCFinal/view/admin_dashboard.html");
    }else{
        //show error message
        alert("login failed");
    }
}

$(function(){
    $("#signupbtn").click(function(){
        window.location.replace("http://localhost/mobile-web/MWCFinal/view/signup.html");
    });
});

$(function(){
    $("#loginbtn").click(function(){

        console.log($("#username").val());

        validateLogin($("#username").val(), $("#password").val());
    });
});
