'use strict';

function generateSliderElement(item) {
  return `<li class="slides"><img src="${item}" /></li>`;
}

function generateSliderItemsString(pictureList) {

  const items = pictureList.map((item) => generateSliderElement(item)); 
  
   return items.join("");
 }



function generateDropdownElement(item) {

  // Capitalize the first letter of each word
  let itemCapitalize = item.display.split(" ");
  for (var i = 0, x = itemCapitalize.length; i < x; i++) {
    itemCapitalize[i] = itemCapitalize[i][0].toUpperCase() + itemCapitalize[i].substr(1);
  }
  item.display = itemCapitalize.join(" ");

  // format the dropdown item
  return `<option value="${item.api}">${item.display}</option>`;

}

function generateDropdownString(breedList) {
  
    let items = [];

/*  const items = breedList.map((item) => generateDropdownElement(item)); */

    for (let i = 0; i < breedList.length; i++) {        
        items.push(generateDropdownElement(breedList[i]));
    } 

    return items.join("");
}

function getDogImages(quantity) {

  fetch(`https://dog.ceo/api/breeds/image/random/${quantity}`)
    .then(response => response.json())
    .then(responseJson => {
      let dogSliderItems = generateSliderItemsString(responseJson.message);
      displayDogImages(dogSliderItems);
    })
    .catch(error => alert('Oops! Something went wrong. Try again later.'));
}

function getDogImage(breed) {

  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(responseJson => {

      if ( responseJson.success == "true" ) {
           let dogSliderItems = 
             `<li class="slides"><img src="${responseJson.message}" /></li>`;
      }
      else {
        let dogSliderItems = 
        `<li class="slides"><img src="images/sadPanda.png" /></li>`;
      }

      displayDogImage(dogSliderItems);

    })
    .catch(error => alert('Oops! Something went wrong. Try again later.'));
}


function formatListOfBreeds() {

  fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(responseJson => {
      let flattenedList = [];
      let obj = responseJson.message;  /* interested only in the list of breeds */
      let listOfKeys = Object.keys(obj);
      for (let j = 0; j < listOfKeys.length; j++) {

        if (j == 3) {
          flattenendList.push({"display": "Monkey",
                               "api": "monkey"})
        }

        if (j == 7) {
          flattenendList.push({"display": "Cat",
                               "api": "cat"})
        }

        if (obj[listOfKeys[j]].length == 0) {
          flattenedList.push({"display": listOfKeys[j], 
                              "api": listOfKeys[j]
                            });
        }
        else {
          for (let i = 0; i < obj[listOfKeys[j]].length; i++) {
            flattenedList.push({"display": obj[listOfKeys[j]][i] + " " + listOfKeys[j], 
                                "api": listOfKeys[j] + "/" + obj[listOfKeys[j]][i]
                              });
          }
        }
      }
      console.log(flattenedList);
      let optionList = generateDropdownString(flattenedList);
      $('#js-breed-list').html(optionList);
    })
    .catch(error => alert('Oops! Something went wrong. Try again later.'));
}

function displayDogImages(pictureListString) {

  $('#js-slides-any-breed').html(pictureListString);
  $('#js-slider-any-breed').show();
}

function displayDogImage(pictureListString) {

  $('#js-slides-specific-breed').html(pictureListString);
  $('#js-slider-specific-breed').show();
}

function watchFormAnyBreed() {

  $('#js-form-any-breed').submit(event => {
    event.preventDefault();
    let quantity = $('.js-number-of-dogs').val();
    getDogImages(quantity);
  });
}


function watchFormSpecificBreed() {
  console.log("inside watchFormSpecificBreeds.");
  $('#js-form-specific-breed').submit(event => {
    event.preventDefault();

    let breed = $('#js-breed-list').val();
    getDogImage(breed);

  });
}

function watchForm() {

  $('#js-pick-options').on('click', 'input[type=radio]', function (event) {

    let optionSelected = $('#js-pick-options input:checked').attr('value');

    console.log(optionSelected);

    switch (optionSelected) {
      case "anyBreed":
        $('#js-any-breed').show();
        $('#js-specific-breed').hide();
        watchFormAnyBreed();
        break;
      case "specificBreed":
        $('#js-any-breed').hide();
        $('#js-specific-breed').show();
        watchFormSpecificBreed();
        break;
    }
  });
}

$(function () {
  formatListOfBreeds();
  watchForm();
});