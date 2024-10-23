const formatResponse = (status, message = '', data = null) => {
    const response = {
        status: status.toString()
    };

    if (message) {
        response.message = message;
    }

    if (data !== null) {
        response.data = data;
    }

    return response;
};
  
module.exports = { formatResponse };