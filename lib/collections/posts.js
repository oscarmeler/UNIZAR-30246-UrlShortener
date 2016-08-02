Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes, browserLang, browser) {
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
      browserLanguage: browserLang,
      browserInfo: browser,
      submitted: new Date()


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
        gapi.client.setApiKey('AIzaSyAgH4fstjiwHQuockXkq1-aSJQKVqgW7M8');
        gapi.client.load('urlshortener', 'v1').then(makeRequest);
      }



});
