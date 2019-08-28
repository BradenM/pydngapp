// Client

const zerorpc = require('zerorpc');

let client = new zerorpc.Client();
client.connect('tcp://127.0.0.1:4242');

let textInput = document.querySelector('#textInput');
let displayText = document.querySelector('#textDisplay');
let submitButton = document.querySelector('#submitInput');

submitButton.addEventListener('click', () => {
  console.log('Event listener invoked');
  client.invoke('echo', textInput.value, (error, res) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Received response: ' + res);
      displayText.textContent = res;
    }
  });
});

submitButton.dispatchEvent(new Event('click'));
