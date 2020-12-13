function validate_form(){
    if (document.forms[0].email.value===''){
        alert("Please Provide An Email Address");
        return false;
    }//End if statement
    return true;
}
function display_caleb(){
    document.getElementById("ercan_about").style.display = "none";
    document.getElementById("chidz_about").style.display = "none";
    document.getElementById("caleb_about").style.display = "block";
}
function display_ercan(){
    document.getElementById("caleb_about").style.display = "none";
    document.getElementById("chidz_about").style.display = "none";
    document.getElementById("ercan_about").style.display = "block";
}
function display_chidz(){
    document.getElementById("caleb_about").style.display = "none";
    document.getElementById("ercan_about").style.display = "none";
    document.getElementById("chidz_about").style.display = "block";
}
