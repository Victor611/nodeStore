const {ApiError} = require('../errors/ApiError');

module.exports = (err, req, res, next) => {
 if(err instanceof ApiError){
  return res.status(err.status).json({error: `ApiError: ${err.message}` }).end()
 } 

   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
   return res.status(err.status || 500).render('error');
 }