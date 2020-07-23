const countElement = document.querySelector('#count');
const percentElement = document.querySelector('#percent');
const usersElement = document.querySelector('#users');
const statusElement = document.querySelector('#status');

const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || 'codinggarden';
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channel],
});
let viewers = 0;
let userid = 0;

client.connect().then(() => {
  statusElement.textContent = `Listening for messages in ${channel}...`;
});

let listeningForCount = false;
let users = {};

client.on('message', (wat, tags, message, self) => {
  if (self) return;
  const { username } = tags;
  if (username.toLowerCase() === channel.toLowerCase()) {
    if (message === '!start-count') {
      listeningForCount = true;
    } else if (message === '!end-count') {
      listeningForCount = false;
      // say count out loud.
      const sayCount = new SpeechSynthesisUtterance(Object.keys(users).length);
      window.speechSynthesis.speak(sayCount);
    } else if (message === '!clear-count') {
      countElement.textContent = 'Waiting for count...';
      usersElement.textContent = '';
      users = {};
    }
  } else if (listeningForCount && message === '1') {
    users[tags.username] = true;
    // display current count page.
    countElement.textContent = Object.keys(users).length;
    if (!viewers == 0) percentElement.textContent = ((Object.keys(users).length / viewers) * 100).toFixed(2) + '%';
    else percentElement.textContent = '0%';
    usersElement.textContent = Object.keys(users).join(', ');
  }
});
const headers = {
  'Client-ID': config.clientID,
  'Accept': 'application/vnd.twitchtv.v5+json'
}
function getUserID() {
  return fetch(`https://api.twitch.tv/kraken/users?login=${channel}`, {
    method: 'GET',
    headers: headers
  })
    .then(res => res.json())
    .then(data => data.users[0]['_id']);
}
getUserID().then(id => {
  return fetch(`https://api.twitch.tv/kraken/streams/${id}`, {
    method: 'GET',
    headers: headers
  }).then(res => res.json())
    .then(data => {
      if (data.stream) return data.stream.viewers;
      return 0;
    });
}).then(view => viewers = view);
