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
  encodedURL = encodeURI(album.artworkUrl100);

  // Add album title to card
  let albumEl = createCardEl('div', ['track-name', 'is-italic'], card);
  let albumTitle = album.collectionName;
  albumEl.innerText = `${albumTitle}`;

  // Add artist name to card
  let name = createCardEl('div', ['artist-name'], card);
  let artName = album.artistName;
  name.innerText = artName;

  // Grab album release date and genre for later use
  let releaseDate = album.releaseDate;
  let albumGenre = album.primaryGenreName;

  // Add to collection button
  let addCollectButton = createCardEl('button', ['button', 'is-info'], card);
  addCollectButton.setAttribute('type', 'submit');
  addCollectButton.innerText = 'Add to Collection';

  // Add album to collection from click on card
  addCollectButton.addEventListener('click', function (event) {
    fetch('album/new_itunes', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        artist: artName,
        title: albumTitle,
        albumArt: album.artworkUrl100,
        releaseDate: releaseDate,
        albumGenre: albumGenre,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let newCard = createCardEl(
          'div',
          ['card', 'column', 'm-3', 'is-half-tablet', 'is-one-third-desktop'],
          albumList
        );
        let cardImageDiv = createCardEl('div', ['card-image'], newCard);
        let cardFigure = createCardEl('figure', ['is-100x100'], cardImageDiv);
        let cardImage = createCardEl('img', ['album-image'], cardFigure);
        cardImage.src = data.album_art;
        cardImage.alt = 'Album Art';
        let cardDetails = createCardEl('div', ['detail-div'], newCard);
        let albumTitle = createCardEl('a', ['title-form'], cardDetails);
        albumTitle.href = `http://127.0.0.1:8000/album/${data.album_pk}`;
        albumTitle.innerHTML = `${data.album_title} by ${data.album_artist}`;
        let albumEdit = createCardEl(
          'a',
          ['button', 'is-dark', 'mx-1'],
          cardDetails
        );
        albumEdit.href = `http://127.0.0.1:8000/album/${data.album_pk}/edit`;
        albumEdit.innerText = '✎';
        let albumDelete = createCardEl(
          'button',
          ['button', 'js-modal-trigger', 'is-danger'],
          cardDetails
        );
        albumDelete.setAttribute('data-target', data.album_pk);
        albumDelete.innerText = 'X';

        // make modal here
        let modalDiv = createCardEl('div', ['modal', 'm-3'], cardDetails);
        modalDiv.setAttribute('id', data.album_pk);
        let modalBack = createCardEl('div', ['modal-background'], modalDiv);
        let modalCard = createCardEl('div', ['modal-card'], modalDiv);
        let modalHeader = createCardEl(
          'header',
          ['modal-card-head'],
          modalCard
        );
        let modalCardTitle = createCardEl(
          'p',
          ['modal-card-title'],
          modalHeader
        );
        modalCardTitle.innerHTML = `Delete <span class="is-italic">${data.album_title}</span> from your collection?`;
        let modalHeaderDelete = createCardEl('button', ['delete'], modalHeader);
        modalHeaderDelete.setAttribute('aria-label', 'close');
        let modalFooter = createCardEl(
          'footer',
          ['modal-card-foot'],
          modalCard
        );
        let modalFooterDelete = createCardEl(
          'button',
          ['button', 'is-danger', 'delete-button'],
          modalFooter
        );
        modalFooterDelete.setAttribute('data-album-pk', data.album_pk);
        modalFooterDelete.innerText = 'Delete';
        let modalFooterCancel = createCardEl('button', ['button'], modalFooter);
        modalFooterCancel.innerText = 'Cancel';

        albumDelete.addEventListener('click', (event) => {
          modalDiv.classList.add('is-active');
        });

        modalFooterDelete.addEventListener('click', (event) => {
          fetch(`album/${data.album_pk}/delete`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRFToken': csrftoken,
            },
            body: formData,
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              newCard.remove();
            });
        });
      });
  });
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
