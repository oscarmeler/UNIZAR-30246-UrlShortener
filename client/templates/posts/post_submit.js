Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
    };

    //Idioma del navegador
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

     //Tipo de navegador que se esta usando
     var browser = getbrowserInfo();

    Meteor.call('postInsert', post, browserLang, browser, function(error, result) {
      // Muestra el error al usuario y aborta
      if (error)
        return alert(error.reason);
      alert('comprobando url...');
      console.log(result);

      if (result.urlNotFound){
        alert('Url no alcanzable');
      }
      else {
        // Si link ya existe avisar, pero redirigir de todas formas
        if (result.postExists)
          alert('Esta url ya ha sido acortada');


/*        Meteor.call('makeShort', post.url, function(error, result){
          console.log('resultado',result.data.id);
        });
  */      Router.go('postPage', {_id: result._id});
      }
    });


  //  post._id = Posts.insert(post);
  //  Router.go('postPage', post);
  }
});
