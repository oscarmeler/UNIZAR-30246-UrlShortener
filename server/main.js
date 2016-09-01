import validUrl from 'valid-url';

//Tareas a realizar periodicamente por el servidor
SyncedCron.add({
  name: 'Verify that the urls are reachable',
  schedule: function(parser) {
    // parser es un objeto later.parse
    return parser.text('every 2 minutes');
  },
  job: function() {
    Posts.find().forEach(function(obj){
      var bool;
      if(validUrl.isUri(obj.url)){
        Posts.update(obj._id, {$set: { reachable: true, datenoreachable: null }});
      }
      else{
        var date = new Date();
        //Si ya no era alcanzable desde la ultima comprobacion no actualiza fecha
        if(obj.reachable!=false){
            Posts.update(obj._id, {$set: { reachable: false, datenoreachable: date}});
        }
      }
    });
  }
});

//Puesta en marcha de tareas periodicas
SyncedCron.start();
