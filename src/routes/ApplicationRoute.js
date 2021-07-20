const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/ApplicationController');

router.get('/test', applicationController.getAllApplications);

module.exports = router;
