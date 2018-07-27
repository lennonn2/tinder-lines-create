function submit() {
  // endpoints:
  // POST - https://qvqnyun7pl.execute-api.us-east-1.amazonaws.com/prod/notes
  // GET - https://qvqnyun7pl.execute-api.us-east-1.amazonaws.com/prod/lines
  const messageContainer = document.getElementById('messageContainer');
  const messageElements = messageContainer.getElementsByClassName('messageObject');
  const messages = [...messageElements]
    .map((container, index) => {
      const checked = container.querySelector('input[type=checkbox]').checked;
      return {
        text: container.querySelector('.message').value,
        index: index,
        isReply: checked
      };
    });

  const categories = [];
  if (document.getElementById('funny').checked) categories.push('funny');
  if (document.getElementById('cheesy').checked) categories.push('cheesy');
  if (document.getElementById('pickup').checked) categories.push('pickup');
  if (document.getElementById('risky').checked) categories.push('risky');
  if (document.getElementById('stupid').checked) categories.push('stupid');
  if (document.getElementById('question').checked) categories.push('question');

  const data = {
    messages: messages,
    categories: categories
  };

  // const url = 'https://qvqnyun7pl.execute-api.us-east-1.amazonaws.com/prod/notes';
  fetch('url', {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
  })
  .then(response => document.getElementById('response').innerText = response);
}

function add() {
  const container = document.getElementById('messageContainer');
  const div = document.createElement('div');
  div.classList.add('messageObject');
  const text = document.createElement('input');
  text.classList.add('message');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  div.appendChild(text);
  div.appendChild(checkbox);
  div.appendChild(document.createTextNode('Reply'));
  div.appendChild(document.createElement('br'));
  container.appendChild(div);
}