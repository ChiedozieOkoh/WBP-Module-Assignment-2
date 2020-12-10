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
function make_big(){
    if (document.getElementById("tubes").style.width === "450px"){
        document.getElementById("tubes").style.width = "500px"
    }
    else document.getElementById("tubes").style.width = "450px";}
function make_big2(){
    if (document.getElementById("doctor").style.width === "450px"){
        document.getElementById("doctor").style.width = "500px"
    }
    else document.getElementById("doctor").style.width = "450px";
}
