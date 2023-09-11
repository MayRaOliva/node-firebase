import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mysql connection with root user and no password
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'example_db',
  insecureAuth: true,
});
connection.connect();

// routes
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(
    req.body,
    `select email, password from users where email='${email}' and password='${password}'`
  );
  // without mysql.escape
  connection.query(
    `select email, password from users where email='${email}' and password='${password}'`,
    (err, results, fields) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(results);
      return res.send(results);
    }
  );
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
