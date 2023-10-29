require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

/** 
A request to /api/whoami should return 
- a JSON object with your IP address in the ipaddress key.
- a JSON object with your preferred language in the language key.
- a JSON object with your software in the software key.
*/
app.get('/api/whoami', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  res.json({ ipaddress: ip, language: language, software: software });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
