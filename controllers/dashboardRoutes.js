const router = require('express').Router();
const {Posts, User, Comment} = require('../models');
const auth = require('../utils/auth');

// router.get('/', auth, async (req, res) => {
//     try{
//         const dashboardData = await 
//     } catch (error) {
//         res.status(500).json(error);
//     };
// });