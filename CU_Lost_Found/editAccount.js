function changePhone(id) {
    document.getElementById("id_phonenumber").value = id;
}

function changePassword(id) {
    document.getElementById("id_pword").value = id;

}

function validatePassword(currPass) {
    var confirmPass = document.getElementById("pword_verify").innerHTML;
    if(currPass != confirmPass) {
        alert("Current password not confirmed! Try again.");
        return false;
    }

    var firstPass= document.getElementById("pword").value;
    var secondPass= document.getElementById("pword_conf").value;

    if(firstPass != secondPass) {
        alert("Passwords do not match! Try again!");
        return false;
    }

    document.getElementById("id_pword").value = newPword;
    console.log(newPword);

}
