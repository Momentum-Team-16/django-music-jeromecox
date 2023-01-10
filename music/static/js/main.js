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
      const albumList = document.querySelector('#album-list');
      let newCard = document.createElement('div');
      newCard.classList.add('card');
      newEl.innerText = `${data.album_title}`;
      albumList.appendChild(newEl);
    });
});
