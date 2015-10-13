define(["lib/ember.debug"], function(Ember){

    SeeV.Router.map(function() {
       
            this.route('jobseeker', {path:"/"},function(){
                this.route('details');
                this.resource('profiles', function(){
                    this.route('edit');
                });
                this.resource('availability', function(){
                    this.route('edit');
                });
                this.resource('referees', function(){
                    this.route('new');
                    this.route('edit',   { path: "/:_id"  });
                });
                this.resource('careers', function(){
                    this.route('new');
                    this.route('edit',   { path: "/:_id"  });
                });
                this.resource('skills', function(){
                    this.route('new');
                    this.route('edit',   { path: "/:_id"  });
                });
                this.resource('qualifications', function(){
                    this.route('new');
                    this.route('edit',   { path: "/:_id"  });
                });
                
            });
       
      
    });
    
});