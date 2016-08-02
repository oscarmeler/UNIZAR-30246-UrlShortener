Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    //prueba introducir idioma
/*    browserLanguage: function() {
      return navigator.language || navigator.userLanguage
    },*/


    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
    };

   var browserLang = navigator.language || navigator.userLanguage

    getbrowserInfo = function() {
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
     }

     var browser = getbrowserInfo();

    Meteor.call('postInsert', post, browserLang, browser, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

        // show this result but route anyway
      if (result.postExists)
        alert('This link has already been posted');

      Router.go('postPage', {_id: result._id});
    });

  //  post._id = Posts.insert(post);
  //  Router.go('postPage', post);
  }
});
