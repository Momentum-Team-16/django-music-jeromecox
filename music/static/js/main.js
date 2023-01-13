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
const deleteButtons = document.querySelectorAll('.delete-button');

function createCardEl(type, classArray, parent) {
  let newElement = document.createElement(type);
  newElement.classList.add(...classArray);
  parent.appendChild(newElement);
  return newElement;
}
for (let deleteButton of deleteButtons) {
  deleteButton.addEventListener('click', (event) => {
    let albumToDelete = deleteButton.closest('.card');
    albumToDelete.remove();
    fetch(`album/${deleteButton.dataset.albumPk}/delete`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('album card deleted');
      });
  });
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
      let cardDetails = createCardEl('div', ['detail-div'], newCard);
      let albumTitle = createCardEl('a', ['title-form'], cardDetails);
      albumTitle.href = `http://127.0.0.1:8000/album/${data.album_pk}`;
      albumTitle.innerText = `${data.album_title}`;
      let albumEdit = createCardEl('a', ['button', 'is-dark'], cardDetails);
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
      let modalHeader = createCardEl('header', ['modal-card-head'], modalCard);
      let modalCardTitle = createCardEl('p', ['modal-card-title'], modalHeader);
      modalCardTitle.innerHTML = `Delete <span class="is-italic">${data.album_title}</span> from your collection?`;
      let modalHeaderDelete = createCardEl('button', ['delete'], modalHeader);
      modalHeaderDelete.setAttribute('aria-label', 'close');
      let modalFooter = createCardEl('footer', ['modal-card-foot'], modalCard);
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
