const searchForm = document.querySelector("#music-search");
const searchBar = document.querySelector("#search-bar");
const searchResults = document.querySelector("#search-results");
const musicPlayer = document.querySelector("#music-player");

// Form input submit
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let searchInput = searchBar.value;
  let searchValue = encodeURIComponent(searchInput);
  console.log(`Search: ${searchValue}`);

  // Handles empty input submission
  if (searchValue === "") {
    searchBar.setCustomValidity("Please enter cool music to search");
    searchBar.reportValidity();
  }
  // Handles form input submission
  else {
    searchResults.replaceChildren();
    musicPlayer.replaceChildren();
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

// Function to make a card given a song
function makeCard(song) {
  let card = createCardEl(
    "div",
    ["card", "col", "s12", "m9", "l4"],
    searchResults
  );
  // Add album artwork to card
  let pic = createCardEl("img", ["card-image"], card);
  pic.src = song.artworkUrl100;

  // Add track title to card
  let track = createCardEl("div", ["track-name"], card);
  let trackTitle = song.trackName;
  track.innerText = `"${trackTitle}"`;

  // Add artist name to card
  let name = createCardEl("div", ["artist-name"], card);
  let artName = song.artistName;
  name.innerText = artName;

  // Create audio player for chosen (clicked) card
  card.addEventListener("click", function (event) {
    musicPlayer.replaceChildren();
    let audioDiv = createCardEl("audio", ["audio"], musicPlayer);
    audioDiv.src = song.previewUrl;
    audioDiv.controls = true;
    audioDiv.autoplay = true;
    let nowPlay = createCardEl("h6", ["nowPlay"], musicPlayer);
    nowPlay.innerText = `Now playing: "${song.trackName}" by ${song.artistName}`;
  });
}

// Function fetch GET request from iTunes API
function getItunesData(term) {
  let url =
    "https://itunes.apple.com/search?term=" + term + "&limit=24&entity=song";
  console.log(url);

  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.resultCount === 0) {
        let noResults = createCardEl("p", ["noResults"], searchResults);
        noResults.innerText = `No results found! 😞
      Please search again.`;
        let horn = createCardEl("audio", "", searchResults);
        horn.src = "The_Price_is_Right_Losing_Horn.mp3";
        horn.autoplay = true;
      } else {
        for (let song of data.results) {
          makeCard(song);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
