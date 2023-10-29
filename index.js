require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


/**
 * Endpoint: /api/whoami
 * Description: Returns a JSON object containing:
 *   - ipaddress: IP address of the client.
 *   - language: Preferred language of the client.
 *   - software: Information about client's software (User-Agent header).
 */
app.get('/api/whoami', (req, res) => {
  const { 
    'x-forwarded-for': forwardedFor,
    'accept-language': language,
    'user-agent': software 
  } = req.headers;

  // Extract the first IP if 'x-forwarded-for' contains multiple IPs
  const ipAddress = forwardedFor 
    ? forwardedFor.split(',')[0] 
    : req.connection.remoteAddress;

  res.json({ ipaddress: ipAddress, language, software });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
