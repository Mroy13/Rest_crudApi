const StatusCode=require('http-status-codes');
const bcrypt = require('bcrypt');
const {userRepository}=require('../repositories');
const {ServerConfig}=require('../config');
const Apperror=require('../utils/error/App-error');
const UserRepository= new userRepository();

async function createUser(data){
  try {
    const user=await UserRepository.create(data);
    return user.firstName;
  } catch (error) {
   // console.log(error.name);
    if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
        let errorRes=[];
        error.errors.forEach((err)=> {
            errorRes.push(err.message);
        });
        throw new Apperror(errorRes,StatusCode.BAD_REQUEST)
    }
    console.log(error);
    throw new Apperror("request not resolved due to server side problem",StatusCode.INTERNAL_SERVER_ERROR);

  }
}

async function getUser(id) {
  try {
      const user = await UserRepository.get(id);
      return user;
  } catch (error) {
      //database level error handling
      if (error.statusCode == StatusCode.NOT_FOUND) {
          throw new Apperror(error.message, error.statusCode);
      }
      //server side errorHandling
      throw new Apperror('Cannot fetch data of the user', StatusCode.INTERNAL_SERVER_ERROR);
  }
}

async function updateUser(id, data) {
  try {
      const user = await UserRepository.update(id, data);
      return user;
  } catch (error) {
      console.log(error);
      //client side error handling
      if (error.name == 'SequelizeValidationError') {
          const explanation = [];
          error.errors.forEach(err => {
              explanation.push(err.message);
          });

          throw new Apperror(explanation, StatusCode.BAD_REQUEST);
      }
      // database level error handling
      if (error.statusCode == StatusCode.NOT_FOUND) {
          throw new Apperror(error.message, error.statusCode);
      }
      //server side error handling
      throw new Apperror('Cannot fetch data of user', StatusCode.INTERNAL_SERVER_ERROR);
  }
}






module.exports={
  createUser,
  getUser,
  updateUser
  
}