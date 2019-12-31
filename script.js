"use strict"

const searchUrl = 'https://developer.nps.gov/api/v1/parks';
const API_KEY = '0mIMItMW0fOOPcocVLRe5rglCrpeNbc3fEKFUbSs';


function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join('&');
}


function displayResults (responseJson) {
  console.log(responseJson)

  $('.showParks').empty();
 

  for (let i=0; i<responseJson.data.length; i++) {
    $('.showParks').append(`
      <li><h3>${responseJson.data[i].fullName}</h3>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      </li>
      `)
  };
  
}



function grabPark(searchState, searchMaxResult = 10) {
   
  const params = {
    api_key: API_KEY,
    limit: maxResults,
    stateCode: query
  };
  
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('.js-error-message').text(`Something went wrong: ${err.message}`);
  });
}



function watchFrom () {
  $('form').submit(e => {
     e.preventDefault();
     const searchState = $('#searchState').val();
     const searchMaxResult = $('#searchMaxResult').val()
     $('.js-error-message').empty();
     $('.showParks').empty();
     console.log(searchState);
     console.log(searchMaxResult);

     grabPark(searchState, searchMaxResult);
  });
}