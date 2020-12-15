const { match } = require('assert');
const fs = require('fs');
const { Query } = require('mongoose');
const Tour = require('../Model/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkId = (req, res, next, val) => {
//     if(req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status : 'fail',
//             data : 'INVALID ID'
//         })
//     }
//     next()
// };

// exports.checkBody = (req, res, next) => {
//     if(!req.body.name || !req.body.price) {
//         return res.status(404).json({
//             status : 'fail',
//             data : 'Missing name or price'
//         }); 
//     }
//     next();
// };
// exports.getAlltours = (req, res) => {
//     res.status(200).json({
//         message : 'success',
//         result : tours.length,
//         data : {
//             tours
//         }
//     }) 
// };


exports.getAlltours = async (req, res) => {
    try{
        //BUILD QUERY
        // 1A) filtering
        // console.log(req.query);
        // const queryObj = {...req.query};
        // const excludeFields = ['page','sort','limit','fields'];
        // //loop
        // excludeFields.forEach(el => delete queryObj[el]);
        // console.log(req.query, queryObj);

        // //1B)Advanced Filtering
        // //{difficulty: 'easy', duration: {$gte: 5}}
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));
        // //const query = Tour.find(queryObj);
        // let query = Tour.find(JSON.parse(queryStr));

        //2)Sorting
        // if(req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     console.log(sortBy);
        //     query = query.sort(sortBy);
        // } else {
        //     query = query.sort('-createdAt');
        // }

        //3) Field limiting by select
        // if(req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // } else {
        //     query = query.select('-__v');
        // }

        //4) Pagination
        //set page or default page by 1
        // const page = req.query.page * 1 || 1;
        // //hundred data each request
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1) * limit;

        // query = query.skip(skip).limit(limit);

        // if(req.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     if(skip >= numTours) throw new Error('This page doesnt exist');
        // };
        //EXECUTE QUERY
        //Tour.find() = query object like sql, req.query = query string atau param
        const features = new APIFeatures (Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const tours = await features.query;

        //SEND RESPONSE
        res.status(200).json({
        message : 'success',
        result : tours.length,
        data : {
            tours
            }
        }) 
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
    
};

// exports.getTour = (req, res) => {
//     console.log(req.params);
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);
//     //console.log(tour)
    
//     res.status(200).json({
//         status : 'success',
//         data : {
//             tour
//         }
//     }) 
// };

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        //const tour = await Tour.find({_id: req.params.id})
        res.status(200).json({
            status : 'success',
            data : {
                tour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: "Invalid Id"
        })
    }
    
};

// exports.createTour = (req,res) => {
//     //console.log(req.body);
//     newId = tours[tours.length - 1].id + 1;
//     //console.log(newId);
//     newTour = Object.assign({id : newId}, req.body);
//     tours.push(newTour);

//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), (err) => {
//         res.status(200).json({
//             message : 'success',
//             data : {
//                 tours : newTour
//             }
//         })
//     })
//     //res.send("Done");
// };

exports.createTour = async (req,res) => {
    try{

        const newTour = await Tour.create(req.body);

        res.status(201).json({
            message : 'success',
            data : {
                tours : newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
    
   
    //res.send("Done");
};

// exports.updateTour = (req, res) => {
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);
    
//     res.status(200).json({
//         status : 'success',
//         data : {
//             tours : '<updated here>'
//         }
//     })
// };

exports.updateTour = async (req, res) => {
    try{

        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        })
    
        res.status(200).json({
            status : 'success',
            data : {
                tour
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
    
};

// exports.deleteTour = (req, res) => {
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);

//     res.status(204).json({
//         status : 'succes',
//         data : null
//     })
// };

exports.deleteTour = async (req, res) => {
    try {

        await Tour.findByIdAndDelete(req.params.id)

            res.status(204).json({
                status : 'succes',
                data : null
            })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

};