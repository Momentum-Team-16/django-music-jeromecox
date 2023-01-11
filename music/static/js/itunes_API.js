const searchForm = document.querySelector('#music-search');
const searchBar = document.querySelector('#search-bar');
const searchResults = document.querySelector('#search-results');
const musicPlayer = document.querySelector('#music-player');

// Form input submit
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let searchInput = searchBar.value;
  let searchValue = encodeURIComponent(searchInput);
  console.log(`Search: ${searchValue}`);

  // Handles empty input submission
  if (searchValue === '') {
    searchBar.setCustomValidity('Please enter cool music to search');
    searchBar.reportValidity();
  }
  // Handles form input submission
  else {
    searchResults.replaceChildren();
    // musicPlayer.replaceChildren();
    getItunesData(searchValue);
  }
});

// Helper function to create card elements
function createCardEl(type, classArray, parent) {
  let newElement = document.createElement(type);
  newElement.classList.add(...classArray);
  parent.appendChild(newElement);
  return newElement;
}

// Function to make a card given an album
function makeCard(album) {
  let card = createCardEl(
    'div',
    ['card', 'column', 'm-3', 'is-half-tablet', 'is-one-third-desktop'],
    searchResults
  );
  // Add album artwork to card
  let pic = createCardEl('img', ['card-image'], card);
  pic.src = album.artworkUrl100;

  // Add album title to card
  let albumEl = createCardEl('div', ['track-name'], card);
  let albumTitle = album.collectionName;
  albumEl.innerText = `"${albumTitle}"`;

  // Add artist name to card
  let name = createCardEl('div', ['artist-name'], card);
  let artName = album.artistName;
  name.innerText = artName;

  // Create audio player for chosen (clicked) card
  //   card.addEventListener("click", function (event) {
  //     musicPlayer.replaceChildren();
  //     let audioDiv = createCardEl("audio", ["audio"], musicPlayer);
  //     audioDiv.src = song.previewUrl;
  //     audioDiv.controls = true;
  //     audioDiv.autoplay = true;
  //     let nowPlay = createCardEl("h6", ["nowPlay"], musicPlayer);
  //     nowPlay.innerText = `Now playing: "${song.trackName}" by ${song.artistName}`;
  //   });
}

// Function fetch GET request from iTunes API
function getItunesData(term) {
  let url =
    'https://itunes.apple.com/search?term=' + term + '&limit=24&entity=album';
  console.log(url);

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.resultCount === 0) {
        let noResults = createCardEl('p', ['noResults'], searchResults);
        noResults.innerText = `No results found! 😞
      Please search again.`;
        let horn = createCardEl('audio', '', searchResults);
        horn.src = 'The_Price_is_Right_Losing_Horn.mp3';
        horn.autoplay = true;
      } else {
        for (let album of data.results) {
          makeCard(album);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
