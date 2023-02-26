const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../Routes/reviewRoutes');
const router = express.Router();

// Nested Routes

// POST /tours/tour_id/reviews
// GET /tours/tour_id/reviews

router.use('/:tourId/reviews', reviewRouter);

// router.param('id', (req, res, next, val) => {
//   next();
// });

// router.param('id', tourController.checkID);

// Middleware to check if a contains the name and price property
// if not send back 404 (bad request)
// Add it to the post handler stack

// ALIASING THE ROUTE
// 127.0.0.1:3000/api/v1/tours?limit=5&sort=-ratingsAverage,price to 127.0.0.1:3000/api/v1/tours/top-5-cheap
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// 127.0.0.1:3000/api/v1/tours/tour-stats
router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
