const express = require('express');
const app = express();
const webpush = require('web-push');
const vapidKeys = {
	"publicKey": "BAIidyZj45O6wr5W1O2NR9nir_HXR-yBQsRgnm-Z0Un-Gf0wXvUYZ91mpkgplWKVG-IXRAayT-HrKXvTQyRFj9w",
	"privateKey": "IPXkGY1K951VYHWaOucfjitopWB1bR7au2SjsDSSNx4"
};
webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
  );
  var bodyParser = require('body-parser');
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  const greet = express.Router();
  greet.get('/', (req, res) => {
    console.log(req.baseUrl);
    res.send('Hello World');
  })
  app.use('/greet', greet);
  app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'test' });
  
    console.log(subscription);
  
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error(error.stack);
    });
  });
  const port = process.env.PORT || 80;
  app.listen(port, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
  });