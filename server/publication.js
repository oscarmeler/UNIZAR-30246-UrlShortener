Meteor.publish('posts', function() {
  return Posts.find();
  //return Posts.find({'title':'Introducing Telescope'}); devuelve solo
  //el elemento de la coleccion con el title especificado
});
