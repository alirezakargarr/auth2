exports.success = (res,data) =>
{
  res.status(200).send({
    status: true,
    message:"",
    data: data
  });
}

//Function for run Promise
exports.error = function (res,message) {
  res.status(404).json(
      {
        status: false,
        message: message,
        data:[]
      }
    );
}


//Function for run Promise
// socketSuccess = function (data) {
//   return {status:1,message:"",
//     data:data};
//
// }
//
// //Function for run Promise
// socketError = function (message) {
//   return {status:2,message:message,
//     data:[]};
// }
//
//

// Function for run Promise
exports.exception = function (res,message) {
  res.send({status:0,message:message,
    data:[]});
}
