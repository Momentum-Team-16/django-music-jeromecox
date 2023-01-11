console.log('js loaded');
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const form = document.querySelector('#create-form');
const albumList = document.querySelector('#album-list');

function createCardEl(type, classArray, parent) {
  let newElement = document.createElement(type);
  newElement.classList.add(...classArray);
  parent.appendChild(newElement);
  return newElement;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('submitted');
  console.log(form);
  const formData = new FormData(form);

  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  fetch('album/new', {
    method: 'POST',
    credentials: 'same-origin',
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
      console.log(data);
      let newCard = createCardEl(
        'div',
        ['card', 'column', 'm-3', 'is-half-tablet', 'is-one-third-desktop'],
        albumList
      );
      let cardImage = createCardEl('div', ['card-image'], newCard);
      let cardDetails = createCardEl('h2', ['detail-div'], newCard);
      let albumTitle = createCardEl('a', ['title-form'], cardDetails);
      albumTitle.href = 'http://127.0.0.1:8000/album/pk';
      albumTitle.innerText = `${data.album_title}`;
      let albumEdit = createCardEl('a', ['button', 'is-dark'], cardDetails);
      albumEdit.href = 'http://127.0.0.1:8000/album/pk/edit';
      albumEdit.src = music / templates / music / icons / pencil - fill.svg;
      let albumDelete = createCardEl('a', ['button', 'is-danger'], cardDetails);
      albumDelete.href = 'http://127.0.0.1:8000/album/pk/delete';
      albumDelete.innerText = 'X';
    });
});
