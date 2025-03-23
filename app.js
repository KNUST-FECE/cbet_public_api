const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoStore = require("connect-mongo");
const session = require('express-session');



const mongoURI = process.env.mongoURI;

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    dbName: process.env.dbName,
    maxPoolSize: 50,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB:", error);
});





app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Session management
app.use(
    session({
      secret: "fecesa_pulic",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: mongoURI,
        dbName: "FECESA",
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 3, // 3 hours
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      },
    })
);

  

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});











