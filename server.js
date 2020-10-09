const express = require('express');
const app = express();

const webpush = require('web-push');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var cors = require('cors');

app.use(cors({
    origin: "https://zealous-jones-65d681.netlify.app/"
}));

const vapidKeys = {
    "publicKey": "BAIidyZj45O6wr5W1O2NR9nir_HXR-yBQsRgnm-Z0Un-Gf0wXvUYZ91mpkgplWKVG-IXRAayT-HrKXvTQyRFj9w",
	"privateKey": "IPXkGY1K951VYHWaOucfjitopWB1bR7au2SjsDSSNx4"
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
    );


const subscribe = express.Router();
subscribe.post('/', (req, res) => {
    const subscription = req.body;
    const payload = JSON.stringify({
        "notification": {
        "title": "Angular News",
        "body": "Newsletter Available!",
        "icon": "assets/main-page-logo-small-hat.png",
        "vibrate": [100, 50, 100],
        "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1
        },
        "actions": [{
        "action": "explore",
        "title": "Go to the site"
        }]
    }
});
    console.log(subscription);
    webpush.sendNotification(subscription, payload).then(result => {
        console.log(result);
        res.send(result);
    }).catch(error => {
      res.send(error.stack);
    });
    res.send(payload);
})

app.use('/subscribe', subscribe);

const port = process.env.PORT || 80;

app.listen(port, () => console.log('server started'));
