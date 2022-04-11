const express = require('express');
const app = express();
var morgan = require('morgan');
var cors = require('cors');

//Settings
const port = 2000;

//Middlewares
app.use(express.json({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
//app.use(cors());

var corsOptions = { origin: true, optionsSuccessStatus: 200 };

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

//Routes
app.use('/',require('./routes/index'));
app.use('/version',require('./routes/version'));
app.use('/user',require('./routes/user'));

app.listen(port,()=>{
    console.log('Server listen on port: ', port);
}); 