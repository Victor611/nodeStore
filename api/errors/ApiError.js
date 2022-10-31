  class ApiError extends Error{
  constructor(status, message){
      super();
      this.status = status;
      this.message = message;
      this.name = 'API ERROR';
  }
  
  static badRequest(message){
    return new ApiError( 400, message || "Bad Request" )
  }

  static unauthorized(message){
    return new ApiError( 401, message || "Unauthorised")
  }

  static forbiden(message){
    return new ApiError( 403, message || "Forbidden")
  }

  static notFound(message){
    return new ApiError( 404, message || "Not Found")
  }

  static notAllowed(message){
    return new ApiError( 405, message || "Method Not Allowed")
  }

   static notAcceptable(message){
    return new ApiError( 406, message || "Not Acceptable")
  }

  static internal(message){
    return new ApiError( 500, message || "Internal Server Error")
  }

  static serviceUnavailable(message){
    return new ApiError( 503, message || "Service Unavailable")
  }

}
module.exports = {ApiError}