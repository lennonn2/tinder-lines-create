function submit() {
  // endpoints:
  // POST - https://qvqnyun7pl.execute-api.us-east-1.amazonaws.com/prod/notes
  // GET - https://qvqnyun7pl.execute-api.us-east-1.amazonaws.com/prod/lines
  const message = document.getElementById('messages').value;
  const messages = message.split(',');

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
  .then(response => document.getElementById('response').innerText = response);
}