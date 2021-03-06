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

  if (messages.some(msg => msg.text === '')) {
    alert('Message with no text!');
    return;
  }
 
  const categories = [];
  if (document.getElementById('funny').checked) categories.push('funny');
  if (document.getElementById('cheesy').checked) categories.push('cheesy');
  if (document.getElementById('pickup').checked) categories.push('pickup');
  if (document.getElementById('risky').checked) categories.push('risky');
  if (document.getElementById('stupid').checked) categories.push('stupid');
  if (document.getElementById('question').checked) categories.push('question');

  if (categories.length === 0) {
    alert('No categories checked!');
    return;
  }

  const data = {
    messages: messages,
    categories: categories
  };

  const url = 'https://qvqnyun7pl.execute-api.us-east-1.amazonaws.com/prod/notes';
  fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
  })
  .then(
    response => {
      if (response.status === 200) {
        document.getElementById('response').innerText = 'Line submitted successfully!';
      } else {
        document.getElementById('response').innerText = 'Something went wrong...';
      }
    })
}

function add() {
  const container = document.getElementById('messageContainer');
  const div = document.createElement('div');
  container.appendChild(div);
  div.classList.add('messageObject');
  const text = document.createElement('input');
  text.classList.add('message');
  text.setAttribute('type', 'text');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('value', 'reply');
  checkbox.setAttribute('class', 'reply');
  div.appendChild(text);
  div.appendChild(checkbox);
  const span = document.createElement('span')
  span.innerText = 'Reply';
  div.appendChild(span);
}

document.onload = add();
