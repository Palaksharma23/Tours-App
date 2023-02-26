const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const bookingRouter = require('./Routes/bookingRoutes');
const viewRouter = require('./Routes/viewRoutes');
const compression = require('compression');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//  Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// console.log(app.get('env'));
// console.log(process.env);

// limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// 3rd party middleware = morgan
app.use(morgan('dev')); // It return a normal middleware function as our own

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ encoded: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQl query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());
app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Tripster' });
// });

// GETTING ALL THE Tours

// app.get('/api/v1/tours', getAllTours);

// POSTING Tours

// app.post('/api/v1/tours', createTour);

// GETTING ONLY ONE Tour

// /:y? Optional Parameter by appending a question mark in it

// app.get('/api/v1/tours/:id', getTour);

// UPDATE THE Tours Data

// app.patch('/api/v1/tours/:id', updateTour);

// DELETE THE Tours Data

// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/', viewRouter);

// const tourRouter = express.Router();

app.use('/api/v1/tours', tourRouter);

// User Routes

// const userRouter = express.Router();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server}`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server}`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server}`, 404)); // It will skip all the middlewares and will directly go to Error middleware
});

// 4 arguments wala is always error handling middleware

app.use(globalErrorHandler);
module.exports = app;

// Note::
// Middlewares are executed in the order they are written in the code
