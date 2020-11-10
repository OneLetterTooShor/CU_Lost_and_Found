var z = 1;


function addCard(inp)
{
  //console.log("in addCard")
  var currentCard = "";

  var date = new Date();
  var name = document.getElementById("itemName").value;
  var description = document.getElementById("itemDescription").value;
  var date_found = document.getElementById("dateFound").value;
  var location_found = document.getElementById("locationFound").value;
  var location_returned = document.getElementById("locationReturned").value;

  if(name.length == 0) {
    alert("Name is required!");
    return;
  }

  else if(description.length ==0) {
    alert("Description is required!");
    return;
  }

  else if(date_found.length ==0) {
    alert("Date found is required!");
    return;
  }

  else if(location_found.length ==0) {
    alert("Location found is required!");
    return;
  }

  $('#found_items_popout').modal('hide');

  currentCard += '<div class="card" id=item' + z + '">'
  currentCard +=    '<div class="row no-gutters">'
  currentCard +=        '<div class="col-md-6">'
  currentCard +=            '<img class="card-img-top" src="../resources/images/samplelost1.jpg" alt="Card image cap">'
  currentCard +=        '</div>'
  currentCard +=        '<div class="col-md-6">'
  currentCard +=            '<br>'
  currentCard +=            '<h5 class="card-title">' + name + '</h5>'
  currentCard +=            '<p class="card-text">Desciption: ' + description + '</p>'
  currentCard +=            '<p class="card-text">Date Found: ' + date_found + '</p>'
  currentCard +=            '<p class="card-text">Location Found: ' + location_found + '</p>'
  currentCard +=            '<p class="card-text">Location Returned: ' + location_returned + '</p>'
  currentCard +=            '<p class="card-text"><small class="text-muted">Posted ' + date + '</small></p>'
  currentCard +=        '</div>'
  currentCard +=    '</div>'
  currentCard += '<br>'
  currentCard += '</div>'
  
  document.getElementById("cardPlaceholder").innerHTML += currentCard;  
  
  z++;

  alert("Success! Your item has been posted!");
                        
}

function resetModal()
{
  document.getElementById("modalForm").reset();
}