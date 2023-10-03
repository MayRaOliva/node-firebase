import express from 'express';
import bodyParser from 'body-parser';

import bcrypt from 'bcrypt';
import './env.js';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyBt0ukMfmvvfeW0XunGUIbW4vPxqawwCmw",
  authDomain: "mayra-utma.firebaseapp.com",
  projectId: "mayra-utma",
  storageBucket: "mayra-utma.appspot.com",
  messagingSenderId: "524538668447",
  appId: "1:524538668447:web:1035198c7f66bd027a49aa",
  measurementId: "G-LLN7BQRP3D"
};

const firebaseapp = initializeApp(firebaseConfig);




// config bcrypt
const saltRounds = 15;
const bcryptPassword =  process.env.BCRYPT_PASSWORD;


console.log(bcryptPassword);
// app.use(
//   cors({
//     origin: 'https://myproject.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mysql connection with root user and no password
// const connection = mysql.createConnection({
//   host: ,
//   user: 'root',
//   password: 'password',
//   database: 'example_db',
//   insecureAuth: true,
// });
// connection.connect();

// routes
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.post('/register', (req, res) => {
  let hash;
  const {password} = req.body;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(error, hashPassword) {
      hash = hashPassword;
      console.log(hash)
      res.send(hash)
    })
  })


});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(
    req.body,
    `select email, password from users where email='${email}' and password='${password}'`
  );
  // without mysql.escape
  // connection.query(
  //   `select email, password from users where email='${email}' and password='${password}'`,
  //   (err, results, fields) => {
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
  //     console.log(results);
  //     return res.send(results);
  //   }
  // );
  // with mysql.escape
  //   connection.query(
  //   `select email, password from users where email=${mysql.escape(
  //       email
  //     )} and password=${mysql.escape(password)}`,
  //     (err, results, fields) => {
  //       if (err) {
  //         return res.status(500).send(err);
  //       }
  //       console.log(results);
  //       return res.send(results);
  //     }
  //   );
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
