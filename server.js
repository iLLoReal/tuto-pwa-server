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



app.listen(3000, () => console.log('server started'));