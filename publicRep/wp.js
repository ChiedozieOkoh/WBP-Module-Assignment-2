// Add sign up form pop up
/*function addSign_up_form(){
    const form_sign_up = document.getElementById("form_sign-up").style.display="block";
}*/

function validate_form(){
    if (document.forms[0].email.value===''){
        alert("Please Provide An Email Address");
        return false;
    }//End if statement
    return true;
}
function change_background(){
    if (document.getElementById("test").style.backgroundColor === "grey"){
        document.getElementsByClassName("info").style.backgroundColor="#333537"
        console.log("works")
    }
    if (document.getElementsByClassName("info").style.backgroundColor === "#333537"){
        document.getElementsByClassName("info").style.backgroundColor="grey"
        console.log("also works")
    }
}