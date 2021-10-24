const {ApiError} = require('../errors/ApiError');

module.exports = (err, req, res, next) => {
 if(err instanceof ApiError){
  res.status(err.status);
  res.json({error: `ApiError: ${err.message}` })
  res.end()
 } 

   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
   res.status(err.status || 500);
   res.render('error');
 }