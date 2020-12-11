import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/User';

const app: Application = express();

// settings
dotenv.config();
const PORT = process.env.PORT || 3000;
const dbUri = process.env.dbUri || '';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('connected to db!');
})
  .catch(err => {
    console.log('ERROR:', err.message);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  res.end(JSON.stringify({ "test": 123 }));
  User.create({
    email: "test@test.com",
    firstName: "ozan",
    lastName: "dundar"
  }, (newUser, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('User created');
      console.log(newUser);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port 3000`);
});