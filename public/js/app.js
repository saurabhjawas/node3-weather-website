const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=> {
  e.preventDefault()

  messageOne.textContent = 'Searching...';
  messageTwo.textContent = '';


  const address = search.value

  // console.log(address);

  fetch('/weather?address=' + address).then((response)=> {
    response.json().then((data)=> {
      // console.log(data);

      if (data.error) {
        // return console.log(data.error);
        return messageOne.textContent = data.error
      } else if (!data.location) {
        return messageOne.textContent = 'Location not found!!!'
      } else {
        // console.log('location: '+ data.location);
        // console.log('forecast: '+ data.forecast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }

    })
  })

})
