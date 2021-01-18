'use strict';
var state = document.getElementById("stateID").value;
var count = document.getElementById("resultsLimit").value;
const apiKey = 'g7OL9gTmepIfiTvle3meOMBXkc5z38ydtLTUNu5c';
const searchURL = 'https://developer.nps.gov/api/v1/parks?stateCode=';
var searchString = "";

function createSearchString(state,count){
  console.log('create searchString function running');
  searchString = searchURL+state+'&limit='+count+'&api_key='+apiKey;
}

function findPark(){
  console.log("find park function triggered");
   createSearchString(state,count);
    fetch(searchString)
    .then(response => response.json())
    .then(responseJson => displayParks(responseJson));  
}




function displayParks(responseJson){
   $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <h5>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode}</h5>
      <p>${responseJson.data[i].description}</p>
      <h4><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h4>
      </li>`
    )};
  $('#results').removeClass('hidden');
}
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    console.log('Button pushed, watch form function triggered');
    findPark();
    
  });}

$(function() {
  watchForm();
});

//how to access and display and manipulate the addresses nest array