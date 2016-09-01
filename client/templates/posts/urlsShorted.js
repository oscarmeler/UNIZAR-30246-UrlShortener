Template.ListUrlsShorted.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a;
  },
});

Template.ListUrlsShorted.events({
  'click #analitycs': function(e) {
    window.location = this.shorted +'.info';
  },
  'click #analitycs-json': function(e) {
    window.location = 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAgH4fstjiwHQuockXkq1-aSJQKVqgW7M8&shortUrl='+this.shorted+'&projection=FULL';
  }
});
