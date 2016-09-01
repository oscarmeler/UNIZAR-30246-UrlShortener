import validUrl from 'valid-url';

Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes, browserLang, browser, OS) {
    check(postAttributes, {
      url: String
    });

    if (validUrl.isUri(postAttributes.url)){
      //Si ya tenemos un post con la misma URL, no permitimos que se añada
      // una segunda vez, y redireccionamos al usuario al post ya existente.
          var postWithSameLink = Posts.findOne({url: postAttributes.url});
              if (postWithSameLink) {
                return {
                  postExists: true,
                  _id: postWithSameLink._id,
                  url: postWithSameLink.shorted
                }
              }

          //Obtenemos url acortada
          var urlShorted = Meteor.call('makeShort',postAttributes.url);

          var post = _.extend(postAttributes, {
            browserLanguage: browserLang,
            browserInfo: browser,
            os: OS,
            submitted: new Date(),
            shorted: urlShorted.data.id,
            clicks: 0,
            reachable: true,
            datenoreachable: null
          });

          var postId = Posts.insert(post);

          return {
            _id: postId,
            url: urlShorted
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
   }



});
