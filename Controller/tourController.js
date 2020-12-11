const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status : 'fail',
            data : 'INVALID ID'
        })
    }
    next()
};

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        return res.status(404).json({
            status : 'fail',
            data : 'Missing name or price'
        }); 
    }
    next();
};
exports.getAlltours = (req, res) => {
    res.status(200).json({
        message : 'success',
        result : tours.length,
        data : {
            tours
        }
    }) 
};

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    //console.log(tour)
    
    res.status(200).json({
        status : 'success',
        data : {
            tour
        }
    }) 
};

exports.createTour = (req,res) => {
    //console.log(req.body);
    newId = tours[tours.length - 1].id + 1;
    //console.log(newId);
    newTour = Object.assign({id : newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), (err) => {
        res.status(200).json({
            message : 'success',
            data : {
                tours : newTour
            }
        })
    })
    //res.send("Done");
};

exports.updateTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    
    res.status(200).json({
        status : 'success',
        data : {
            tours : '<updated here>'
        }
    })
};

exports.deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    res.status(204).json({
        status : 'succes',
        data : null
    })
};