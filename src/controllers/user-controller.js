const StatusCode=require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {userService}=require('../services');

async function createUser(req, res) {
    try {
           const userInfo = await userService.createUser({
                  firstName: req.body.firstName,
                  lastName:req.body.lastName,
                  email: req.body.email,
                  password:req.body.password
           });
           SuccessResponse.data = userInfo;
           return res
                  .status(StatusCode.CREATED)
                  .json(SuccessResponse);
    }
    catch (error) {
           //console.log(error);
           ErrorResponse.error = error;
           return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }


}

async function getUser(req,res) {
       console.log(req.params);
       console.log(req.params.id);
       try {
              const user = await userService.getUser(req.params.id);
              SuccessResponse.data = user;
              return res
                     .status(StatusCode.OK)
                     .json(SuccessResponse);
       }
       catch (error) {

              ErrorResponse.error = error;
              return res
                     .status(error.statusCode)
                     .json(ErrorResponse);
       }


}

async function updateUser(req, res) {
       console.log(req.params.id);
       try {
              const user = await userService.updateUser(req.params.id, {
                     firstName: req.body.firstName,
                     lastName: req.body.lastName
              });
              SuccessResponse.data = user;
              return res
                     .status(StatusCode.OK)
                     .json(SuccessResponse);
       }
       catch (error) {

              ErrorResponse.error = error;
              return res
                     .status(error.statusCode)
                     .json(ErrorResponse);
       }


}

module.exports={
    createUser,
    getUser,
    updateUser
    
}