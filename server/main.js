

/*
    var apiCall = function (apiUrl, callback) {
      // try…catch allows you to handle errors
      try {
        var response = HTTP.get(apiUrl).data;
        // A successful API call returns no error
        // but the contents from the JSON response
        callback(null, response);
      } catch (error) {
        // If the API responded with an error message and a payload
        if (error.response) {
          var errorCode = error.response.data.code;
          var errorMessage = error.response.data.message;
        // Otherwise use a generic error message
        } else {
          var errorCode = 500;
          var errorMessage = 'Cannot access the API';
        }
        // Create an Error object and return it via callback
        var myError = new Meteor.Error(errorCode, errorMessage);
        callback(myError, null);
      }
    }
*/

/*	Meteor.methods({
		shortenUrl: function(longUrl) {
			var url = "https://www.googleapis.com/urlshortener/v1/url";
			var data = {"longUrl": longUrl};
			var result = HTTP.call("POST", url, {content: "application/json", data: data, timeout: 3000});
      if(result.statusCode == 200) {
        console.log("response received.");
        return result.data;
      } else {
        console.log("Response issue: ", result.statusCode);
        throw new Meteor.Error(result.statusCode, result.content.error);
      }
    }
  });*/
