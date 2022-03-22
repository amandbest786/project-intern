const express = require('express');
const router = express.Router();
const controller = require("../controller/mainController.js");

router.post('/functionup/colleges', controller.createCollege)

router.post('/functionup/interns', controller.createIntern)

router.get('/functionup/collegeDetails', controller.getCollegeDetails)

module.exports=router;
