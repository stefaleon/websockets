const socket = io();

const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');
const sendLocationButton = document.querySelector('#send-location');
const messagesDiv = document.querySelector('#messages');
const userConnectionMessagesDiv = document.querySelector('#user-connections');

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector(
  '#location-message-template'
).innerHTML;

socket.on('serverSentMessage', msg => {
  console.log(msg);
  const mustacheHtml = Mustache.render(messageTemplate, {
    text: msg.text,
    createdAt: moment(msg.createdAt).format('HH:mm:ss')
  });
  messagesDiv.insertAdjacentHTML('afterbegin', mustacheHtml);
});

socket.on('serverSentLocationMessage', url => {
  console.log(url);
  const mustacheHtml = Mustache.render(locationMessageTemplate, { url });
  messagesDiv.insertAdjacentHTML('afterbegin', mustacheHtml);
});

socket.on('userConnection', msg => {
  console.log(msg);
  userConnectionMessagesDiv.innerHTML = msg;
  setTimeout(() => {
    userConnectionMessagesDiv.innerHTML = '';
  }, 3000);
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();

  // disable the form on submit
  messageFormButton.setAttribute('disabled', 'disabled');

  const clientMessage = document.querySelector('input').value;

  socket.emit('clientSentMessage', clientMessage, errorMessage => {
    // reenable the form on emit
    messageFormButton.removeAttribute('disabled');

    // clear and focus input
    messageFormInput.value = '';
    messageFormInput.focus();

    if (errorMessage) {
      return console.log(errorMessage);
    }
    console.log('message sent');
  });
});

sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation');
  }

  // disable the button after click
  sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      'locationSent',
      {
        lat: position.coords.latitude,
        long: position.coords.longitude
      },
      () => {
        console.log('Location sent!');
        // reenable the button 2 seconds after emit
        setTimeout(() => sendLocationButton.removeAttribute('disabled'), 2000);
      }
    );
  });
});
