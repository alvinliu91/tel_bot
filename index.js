var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
})); 


app.post('/new-message', function(req, res) {
  const {message} = req.body

  if (!message) {
    return res.end()
  }

  if (message.text[0] == '/')
    message.text = message.text.substr(6)
  else
    message.text = message.text.substr(0)
//======================================================
  var search = require('youtube-search');
 
  var opts = {
    maxResults: 10,
    key: 'AIzaSyBEM0aTfvlVm0gHZa2IZKKbwGIwCEfqRxw'
  };
 
//=====================================================



  axios.post('https://api.telegram.org/bot374707652:AAE2kJrfHiS3zQtnmHhxglx2hIpYJb85TsQ/sendMessage', {
//======================================================
  var searchResults = search(message.text , opts, function(err, results) {
    if(err) return console.log(err);
 
    console.dir(results);
  })
//======================================================

    chat_id: message.chat.id,
    text: searchResults
    //text: 'https://www.youtube.com/results?search_query='+encodeURIComponent(message.text)
    

  })
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })

});


app.listen(process.env.PORT||3000, function() {
  console.log('Telegram app listening on port 3000!');
});


