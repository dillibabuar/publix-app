const path = require('path');
const express = require('express');
var fs = require('fs');
//const bodyParser = require('body-Parser')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.get('/png/:filename', function(request, response) {
  response.writeHead(200,{'content-type':'image/png'});
  fs.createReadStream(__dirname + '/src/assets/images/'+request.params.filename).pipe(response); 
});


function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}


app.set("port", PORT);
 app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
}); 
