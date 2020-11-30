function validatePassword() {
    var currentPass = document.getElementById("currPass").innerHTML;
    var confirmPass = document.getElementById("pword_verify").value;
    var firstPass= document.getElementById("pword").value;
    var secondPass= document.getElementById("pword_conf").value;

    if(confirmPass.length == 0) {
        alert("Current password is required!");
        return false;
    }

    else if(currentPass != confirmPass) {
        alert("Current password not confirmed! Try again.");
        return false;
    }

    else if(firstPass.length == 0 | secondPass.length == 0) {
        alert("New password is required!");
        return false;
    }

    else if(firstPass != secondPass) {
        alert("Passwords do not match! Try again!");
        return false;
    }

    else {
        alert("Password successfully updated!");
        return true;
    }

}

function validatePhone() {
    var newPhone = document.getElementById("phonenumber").value;

    if(newPhone.length == 0) {
        alert("Field is required!");
        return false;
    }

    else {
        alert("Phone number successfully updated!");
        return true;
    }
}
