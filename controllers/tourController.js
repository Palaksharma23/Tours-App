const fs = require('fs');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const Tour = require('./../models/tourModel');
const AppError = require('../utils/appError');
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

// class APIFeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   filter() {
//     const queryObj = { ...this.queryString };
//     const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     excludedFields.forEach((el) => delete queryObj[el]);

//     // 1B) Advanced filtering
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     this.query = this.query.find(JSON.parse(queryStr));

//     return this;
//   }

//   sort() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(',').join(' ');
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort('-createdAt');
//     }

//     return this;
//   }

//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(',').join(' ');
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select('-__v');
//     }

//     return this;
//   }

//   paginate() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 100;
//     const skip = (page - 1) * limit;

//     this.query = this.query.skip(skip).limit(limit);

//     return this;
//   }
// }

// class APIFeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   filter() {
//     const queryObj = { ...this.queryString };
//     const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     excludedFields.forEach((el) => delete queryObj[el]);

//     // 1B) Advanced filtering
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     this.query = this.query.find(JSON.parse(queryStr));

//     return this;
//   }

//   sort() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(',').join(' ');
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort('-createdAt');
//     }

//     return this;
//   }

//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(',').join(' ');
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select('-__v');
//     }

//     return this;
//   }

//   paginate() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 100;
//     const skip = (page - 1) * limit;

//     this.query = this.query.skip(skip).limit(limit);

//     return this;
//   }
// }

exports.getAllTours = catchAsync(async (req, res, next) => {
  // const QueryObj = req.query // refernce only

  // Build Query
  // 1) Filtering
  // const queryObj = { ...req.query };
  // const queryObj = { ...this.queryString };

  // const excludedFields = ['page', 'sort', 'limit', 'fields'];
  // excludedFields.forEach((el) => delete queryObj[el]);

  // console.log(req.query, queryObj);
  // const tours = await Tour.find({
  //   duration: 5,
  //   difficulty: 'easy',
  // });

  // 2) Advanced Filtering

  // const query = Tour.find(queryObj);

  // MongoDB command { difficult: 'easy', duration: { $gte: 5 }}
  // Query 127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy
  // In console { 'duration{gte': '5}', difficulty: 'easy' } { 'duration{gte': '5}', difficulty: 'easy' }
  // Now we need to give a $ operator in req.query to get it operated in the command

  // let queryStr = JSON.stringify(queryObj);
  // // gte, gt, lte, lt
  // // regular expression \b\b shows the exact match g represents multiple match
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // console.log(JSON.parse(queryStr));

  // this.query = Tour.find(JSON.parse(queryStr));

  // Sorting the DATA

  // 127.0.0.1:3000/api/v1/tours?sort=price ( Ascending Order )
  // 127.0.0.1:3000/api/v1/tours?sort=-price ( Descending Order )

  // Multiple Field

  // sort('price ratingsAverage')
  // 127.0.0.1:3000/api/v1/tours?sort=-price,ratingsAverage

  // 2) Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   console.log(sortBy);
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort('-CreatedAt');
  // }

  // Field Limiting
  // 127.0.0.1:3000/api/v1/tours?fields=name,duration,difficulty,price
  // 127.0.0.1:3000/api/v1/tours?fields=-name,-duration,-difficulty,-price ( - shows everything except these parameters )

  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   query = query.select(fields);
  //   // query = query.select('name, duration, price, ratingsAverage');
  // } else {
  //   query = query.select('-__v'); // Removing __v ( Everything except __v )
  // }

  // PAGINATION
  // 127.0.0.1:3000/api/v1/tours?page=2&limit=10 1-10, page 1, 11-20, page 2, 21-30, page 3
  // for page 11 we will need to skip 10
  // Now, to calculate the skip
  // Page 1 with 100 on each page
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;

  // // query = query.skip(2skip).limit(10);

  // query = query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const numTours = await Tour.countDocuments(); // It return the number if documents in the database
  //   if (skip >= numTours) throw new Error('This page does not exist'); // It will immediately move to the catch block from here
  // }

  // Execute Query

  // We manipulate query evry time
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;
  // const tours = await query;

  // query.sort().select().skip().limit()
  // We can chain the query until we finally await it

  // const tours = await Tour.find()
  //   .where('duration')
  //   .equals(5)
  //   .where('difficulty')
  //   .equals('easy');
  // equals, lt, lte, gt, gte

  // SEND RESPONSE

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
  //   try {} catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     messae: 'to',
  //     message: err,
  //   });
  // }
});

// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch((err) => next(err));
//   };
// };

exports.createTour = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId, body: req.body });
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {

  //   }

  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });

  // try {
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //     message: err,
  //   });
  //   // console.log(err);
  // }
});

exports.getTour = catchAsync(async (req, res, next) => {
  // console.log(req.params);

  // const id = req.params.id * 1;

  // const tour = tours.find((e) => {
  //   return e.id === id;
  // });

  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid Id',
  //   });
  // }

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });

  const tour = await Tour.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404)); // Without this with the same ID pattern we would have got null in the tours array but with the different ID pattern we would have got the erroe here for suere
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });

  // try {} catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.updateTour = catchAsync(async (req, res, next) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid Id',
  //   });
  // }
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404)); // Without this with the same ID pattern we would have got null in the tours array but with the different ID pattern we would have got the erroe here for suere
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
  //   try {
  //   } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: '<Updated tour here...></Updated>',
  //   },
  // });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid Id',
  //   });
  // }

  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404)); // Without this with the same ID pattern we would have got null in the tours array but with the different ID pattern we would have got the erroe here for suere
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });

  //   try {
  //   } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        // _id: null ( Everything in one group here )
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
  //   try {
  //   } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      // deconstruct array elements, then make seperate document for each of the element
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: '$startDates',
        },
        numTourStarts: {
          $sum: 1,
        },
        tours: {
          $push: '$name',
        },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: {
        _id: 0, // _id will not show up in
      },
    },
    {
      $sort: {
        numTourStarts: -1, // Descending
      },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
  //   try {
  //   } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});
