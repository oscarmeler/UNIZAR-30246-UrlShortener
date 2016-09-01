// Le decimos al router que utilice layout como diseño
// predeterminado para todas las rutas.

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
   waitOn: function() { return Meteor.subscribe('posts'); }
});

//Endpoint url shortener
Router.route('/', {name: 'postSubmit'});

//Endpoint información de una url acortada
Router.route('/urlShortedInfo/:_id', {
  name: 'urlShortedInfo',
  data: function() { return Posts.findOne(this.params._id); }
});

//Devuelve un json con la información de la url acortada
Router.map(function () {
  this.route('urlJson', {
    path: '/urlJson/:_id',
    where: 'server',
    action: function () {
       var json = Posts.findOne(this.params._id);
       this.response.setHeader('Content-Type', 'application/json');
       this.response.end(JSON.stringify(json));
    }
  });
});

//Devuelve la lista de todos los urls acortados
Router.route('/urlsShortened', {name: 'postsList'});
