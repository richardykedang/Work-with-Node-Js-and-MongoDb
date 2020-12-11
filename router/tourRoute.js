const express = require('express');
const { route } = require('../app');
const router = express.Router()
const tourController = require('../Controller/tourController')

//router.param('id', tourController.checkId);
router
    .route('/')
    .get(tourController.getAlltours)
    .post(tourController.checkBody, tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;