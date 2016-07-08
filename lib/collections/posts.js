Posts = new Mongo.Collection('posts');

/*function getBrowserInfo(){
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
      tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null)
      M.splice(1, 1, tem[1]);
    return M.join(' ');
  };*/

Meteor.methods({
  postInsert: function(postAttributes) {
    check(postAttributes, {
      title: String,
      url: String
    });

//Si ya tenemos un post con la misma URL, no permitimos que se añada
// una segunda vez, y redirijamos al usuario al post ya existente.
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
          return {
            postExists: true,
            _id: postWithSameLink._id
          }
        }

// var user = Meteor.user();  //incluir cuando se controlen usuarios (sign in)
    var post = _.extend(postAttributes, {
    //  userId: user._id,
    //  author: user.username,
      browserLanguage: navigator.language || navigator.userLanguage,
      submitted: new Date(),
      browser: getBrowserInfo()

    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },

   makeRequest: function () {
        var request = gapi.client.urlshortener.url.get({
          'shortUrl': 'http://goo.gl/fbsS'
        });
        request.then(function(response) {
          appendResults(response.result.longUrl);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      },

    init:  function () {
        gapi.client.setApiKey('YOUR API KEY');
        gapi.client.load('urlshortener', 'v1').then(makeRequest);
      }



});
