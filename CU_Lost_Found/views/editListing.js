function myFunction(listingID) { 
  //changes the value of the hidden inputs on account.ejs to the proper listing ID of the item to be edited.
  //That data is then accessed by server.js to query the correct listing to be edited.
    document.getElementById("listingID_Type").value = listingID;
    document.getElementById("listingID_Desc").value = listingID;
    document.getElementById("listingID_DateFound").value = listingID;
    document.getElementById("listingID_LocFound").value = listingID;
    document.getElementById("listingID_DateRet").value = listingID;
    document.getElementById("listingID_LocRet").value = listingID;
    document.getElementById("inactiveItem").value = listingID;
    document.getElementById("deleteItem").value = listingID;
    document.getElementById("restoreItem").value = listingID;
}

function validateType() {
    var itemNameLength = document.getElementById("itemName").value;

    if(itemNameLength.length == 0) {
        alert("Field is required!");
        return false;
      }

    alert("Success! The listing has been updated.");
    return true;
}

function validateDescription() {
    var itemDescLength = document.getElementById("itemDesc").value;

    if(itemDescLength.length == 0) {
        alert("Field is required!");
        return false;
      }

    alert("Success! The listing has been updated.");
    return true;
}

function validateDateFound() {
    var itemDateFound = document.getElementById("dateFound").value;

    if(itemDateFound.length == 0) {
        alert("Field is required!");
        return false;
      }

    alert("Success! The listing has been updated.");
    return true;
}

function validateLocFound() {
    var itemLocFound = document.getElementById("locFound").value;

    if(itemLocFound.length == 0) {
        alert("Field is required!");
        return false;
      }

    alert("Success! The listing has been updated.");
    return true;
}

function validateDateRet() {
    var itemDateReturned = document.getElementById("dateReturned").value;

    if(itemDateReturned.length == 0) {
        alert("Field is required!");
        return false;
      }

    alert("Success! The listing has been updated.");
    return true;
}

function validateLocRet() {
    var itemLocRet = document.getElementById("locationReturned").value;

    if(itemLocRet.length == 0) {
        alert("Field is required!");
        return false;
      }

    alert("Success! The listing has been updated.");
    return true;
}

function validateDelete() {
  var deleteItem = document.getElementById("deleteListingID").value;

  if(deleteItem) {
    alert("Success! This listing has been deleted.");
    return true;
  }
}

function validateRestore() {
    var restoreItem = document.getElementById("restoreListingID");

    alert("Success! This listing has been restored.");

    // if(restoreItem) {
    // alert("Success! This listing has been restored.");
    // return true;
    // }
}

function alertFunc() {
    alert("Success! The listing has been updated.")
}