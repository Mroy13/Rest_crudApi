const express=require('express');
const { infoController} = require('../../controllers');
const Routes=require('./user-routes');
const router=express.Router();
router.use('/user',Routes);
router.get('/info',infoController.info);
module.exports=router;
