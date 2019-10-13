'use strict';

function generateSliderElement(item) {
      return `<li class="slide"><img src="${item}" /></li>`;
  }

function generateDropdownElement(item) {
      return `<li>${item}</li>`;
}
  
function generateSliderItemsString(pictureList) {
  
      const items = pictureList.map((item) => generateSliderElement(item));
      return items.join("");
}

function generateDropdownString(breedList) {
      const items = breedList.map((item) => generateDropdownElement(item));
      return items.join("");
}
  
function getDogImages(quantity) {

  fetch(`https://dog.ceo/api/breeds/image/random/${quantity}`)
    .then(response => response.json())
    .then(responseJson => { 
            let dogSliderItems =  generateSliderItemsString(responseJson.message);
            displayDogImages(dogSliderItems);
    })
    .catch(error => alert('Oops! Something went wrong. Try again later.'));
}

function flatten(obj, list) {
  for (key in obj) {
    if (obj[key].length == 0) {
        console.log(`${key}`);
        list.push(key);
    }
    else {
       for (i = 0; i < (obj[key].length); i++) {
            console.log(`${obj[key][i]} ${key}`);
            list.push(`${obj[key][i]} ${key}`);
       } 
    }
  }

  return true;
}

function formatListOfBreeds() {
  
  fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
  .then(responseJson => {
            let flattenedList = [];
            let obj = responseJson.message;  /* interested only in the list of breeds */
            for (key in obj) {
                console.log(`${key}`);
                if (obj[key].length == 0) {
                    flattenedList.push(key);
                }
                else {
                    for (i = 0; i < obj[key].length; i++) {
                          flattenendList.push(`${obj[key][i]} ${key}`);
                    }
                }
            }
            console.log(`${flattenedList}`);
   /*         let dogBreedItems = generateDropdownString(flattenedList);
            prepareDogBreedList(dogBreedItems);*/
  })
  .catch(error => alert('UGhhhhhhh.'));
}

function displayDogImages(pictureListString) {

    $('.js-slides').html(pictureListString);
		$('.js-display-dog-pictures').show();
}

function displayDogBreeds(dogBreedListString) {
  $('#js-breed-list').html(dogBreedListString);
}

function watchFormAnyBreed() {
  $('.js-form-any-breed').submit(event => {
    event.preventDefault();

    let quantity = $('.js-number-of-dogs').val();
    getDogImages(quantity);

  });
}


function watchFormSpecificBreed() {
      console.log("inside watchFormSpecificBreeds.");
}

function watchForm() {

  $('.js-pick-options').on('click', 'input[type=radio]', function(event) {

    let optionSelected = $('.js-pick-options input:checked').attr('value');
    
    console.log(optionSelected);

    switch(optionSelected) {
      case "anyBreed":
            $('.js-any-breed').show();
            $('.js-specific-breed').hide();
            watchFormAnyBreed();
        break;
      case "specificBreed":
            $('.js-any-breed').hide();
            $('.js-specific-breed').show();
/*            watchFormSpecificBreed(); */
        break;
    }


  });
  
}

$(function() {
  formatListOfBreeds();
  watchForm();
});