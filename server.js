const dotenv = require('dotenv');
const morgan = require('morgan');

// Example uncaught exceptions  console.log(Something that does not exist)
process.on('uncaughtException', (err) => {
  console.log('Unhandled Rejection! Shutting down');
  console.log(err.name, err.message);
  process.exit(1); // compulsory
});

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// console.log(process.env);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

// const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//   name: 'The Fores Hiker',
//   rating: 4.7,
//   price: 497,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR', err);
//   });

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log(process.env.NODE_ENV);
});

// Example Database connection password is wrong
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // optional
  });
  // 1 is for uncaught exception and 0 is for success
});

// "start:dev": "nodemon server.js",
// "start:prod": "NODE_ENV=production nodemon server.js",
