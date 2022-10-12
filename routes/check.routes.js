const router = require("express").Router();
const axios = require('axios');
const User = require("../models/User.model");

router.get('/check', (req,res,next) => {
    User.find()
    .then(foundUsers => res.json({user: foundUsers}))
})


module.exports = router