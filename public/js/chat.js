const socket = io();

const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');

socket.on('serverSentMessage', msg => {
  console.log(msg);
  document.querySelector('#message').innerHTML = msg;
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();

  // disable the form on submit
  messageFormButton.setAttribute('disabled', 'disabled');

  const clientMessage = document.querySelector('input').value;

  socket.emit('clientSentMessage', clientMessage, errorMessage => {
    // reenable the form on emit
    messageFormButton.removeAttribute('disabled');
    if (errorMessage) {
      return console.log(errorMessage);
    }
    console.log('message sent');
  });
});

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation');
  }

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      'locationSent',
      {
        lat: position.coords.latitude,
        long: position.coords.longitude
      },
      () => {
        console.log('Location sent!');
      }
    );
  });
});
