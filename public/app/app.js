
window.SeeV = Ember.Application.create({
        LOG_TRANSITIONS: true,
        rootElement: "#seev-app"
    });

SeeV.Router.map(function() {
   
        this.resource('profile', {path:"/"}, function(){
           this.resource('details', function(){
               
           });
            this.resource('account');
            this.resource('referees');
            this.resource('careers');
            this.resource('skills');
            this.resource('qualifications');
            this.resource('other');
           
        });
         
  
});


SeeV.ProfileRoute = Ember.Route.extend({
    model: function(){
        return Ember.$.getJSON('/profile');
    },
    redirect: function () {
        this.transitionTo('details');
    }
});

SeeV.DetailsRoute = Ember.Route.extend({
    model: function(){
        return this.modelFor('profile');
    }
});




Ember.Handlebars.helper('mailToHelper', function(email, options) {
  var mailTo = '<a target="_blank" href="mailto:' + email + '">';
  mailTo += "<span>" + email + "</span></a>";
  return new Handlebars.SafeString(mailTo);
});