const express=require('express');
const {userController}=require ('../../controllers');
const router=express.Router();
 router.post('/signup',userController.createUser);
 router.get('/readUser/:id',userController.getUser);
 router.post('/updateUser/:id',userController.updateUser);
module.exports=router