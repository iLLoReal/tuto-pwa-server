const express = require('express');
const app = express();



const greet = express.Router();
greet.get('/', (req, res) => {
  console.log(req.baseUrl);
  res.send('Hello World');
})

const subscribe = express.Router();
subscribe.get('/', (req, res) => {
  console.log(req.baseUrl);
  res.send('Hello subscribe');
})





app.use('/greet', greet);

app.use('/subscribe', subscribe);


const port = process.env.PORT || 80;

app.listen(port, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});