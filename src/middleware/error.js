'use strict';
import mongoose from 'mongoose';
import { JsonWebTokenError }  from 'jsonwebtoken';

// Custom Error Handler because we always want to return a JSON response
export default  (err,req,res,next) => {

  if(err instanceof mongoose.Error) {
    
    res.statusCode = 404;

    res.send('Database Error');
    
  } else if (err instanceof JsonWebTokenError) {

    res.statusCode = 401;

    res.send(err);

  } else {

    res.statusCode = err.status || 500;
    res.statusMessage = err.statusMessage || 'Server Error';
    res.message = err.message;
    
    res.send(err);
  }
};