import validUrl from 'valid-url';
//import GoogleUrl from 'google-url';

Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes, browserLang, browser) {
    check(postAttributes, {
      title: String,
      url: String
    });

    if (validUrl.isUri(postAttributes.url)){

      //Si ya tenemos un post con la misma URL, no permitimos que se añada
      // una segunda vez, y redirijamos al usuario al post ya existente.
          var postWithSameLink = Posts.findOne({url: postAttributes.url});
              if (postWithSameLink) {
                return {
                  postExists: true,
                  _id: postWithSameLink._id
                }
              }

          var urlShorted = Meteor.call('makeShort',postAttributes.url);

      // var user = Meteor.user();  //incluir cuando se controlen usuarios (sign in)
          var post = _.extend(postAttributes, {
          //  userId: user._id,
          //  author: user.username,
            browserLanguage: browserLang,
            browserInfo: browser,
            submitted: new Date(),
            shorted: urlShorted.data.id


          });
          var postId = Posts.insert(post);
          return {
            _id: postId
          };
      }

      else {
         return {
           urlNotFound: true
         }
      }
  },

   makeShort: function (longUrl){
      if (Meteor.isServer) {
     //Hace llamadas posteriores independientes de la ejecucion actual (async)
      this.unblock();

       var url = "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAgH4fstjiwHQuockXkq1-aSJQKVqgW7M8";
       var options = {
          'headers' : {
           'Content-Type': 'application/json'
          },
          'data' : {
              'longUrl': longUrl
          }
       };

        return HTTP.post(url, options);
      }

  /*   var searchResult = Meteor.http.post(url, options, function (error, result) {
            if(error) {
                console.log('http post FAILED!');
            }
            else {
                console.log('http post SUCCES');
                if (result.statusCode === 200) {
                    console.log('Status code = 200!');
                    console.log(result);
                    return result;
                }
            }
        });*/
      //  return searchResult;
   }

});
