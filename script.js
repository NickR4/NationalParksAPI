function findPark(){
  console.log("find park function triggered");
  var state = document.getElementById("stateID").value;
  var count = document.getElementById("resultsLimit").value;
    fetch('https://developer.nps.gov/api/v1/parks?stateCode='+state+'&limit='+count+'&api_key=g7OL9gTmepIfiTvle3meOMBXkc5z38ydtLTUNu5c')
    .then(response => response.json())
    .then(responseJson => displayParks(responseJson)); 
    
}

function displayParks(responseJson){
  console.log(responseJson.data[0].addresses[0]);
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