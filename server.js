const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';
if (NODE_ENV === 'production')
  dbUri = dbUri = `mongodb+srv://IlluminatusRex:${process.env.DB_PASS}@cluster0.v92vn9f.mongodb.net/?retryWrites=true&w=majority`;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/fullstack-backend';
else dbUri = 'mongodb://localhost:27017/fullstack-backend';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

//NOTE - middleware
if (NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    store: MongoStore.create(db),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
  })
);

//NOTE - serve static files
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

//NOTE - add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

//NOTE - at any other link serve react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
