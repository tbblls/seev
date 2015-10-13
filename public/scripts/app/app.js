   


    

        window.SeeV = Ember.Application.create({
            LOG_TRANSITIONS: true,
            rootElement: "#seev-app"
        });
    
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


        SeeV.JobseekerRoute = Ember.Route.extend({
            model: function(){
                return Ember.$.getJSON('/jobseeker/profiles/1');
            },
            redirect: function () {
                this.transitionTo('/details');
            }
        });
        
        SeeV.RefereesEditRoute = Ember.Route.extend({
            
            renderTemplate: function() {
                this.render({'into':'jobseeker' });
            }
        });
        SeeV.RefereesNewRoute = Ember.Route.extend({
            renderTemplate: function() {
                this.render({'into':'jobseeker' });
            }
        });
        SeeV.CareersNewRoute = Ember.Route.extend({
            renderTemplate: function() {
                this.render({'into':'jobseeker' });
            }
        });
        SeeV.CareersEditRoute = Ember.Route.extend({
         
            renderTemplate: function() {
                this.render({'into':'jobseeker' });
            }
        });
        SeeV.SkillsNewRoute = Ember.Route.extend({
            renderTemplate: function() {
                this.render({'into':'jobseeker' });
            }
        });
        SeeV.SkillsEditRoute = Ember.Route.extend({
          
            renderTemplate: function() {
                this.render({'into':'jobseeker' });
            }
        });
        SeeV.QualificationsNewRoute = Ember.Route.extend({
            renderTemplate: function() {
                this.render({'into':'jobseeker' });
            }
        });
        SeeV.QualificationsEditRoute = Ember.Route.extend({
           
            renderTemplate: function() {
                this.render({'into':'jobseeker' });
            }
        });
        
        SeeV.JobseekerDetailsController = Ember.Controller.extend({
            needs: ["jobseeker"],
            address: function(){
                var address =  this.get('model.address.addressline1') + "<br/>"
                + this.get('model.address.addressline2') + "<br/>"
                + this.get('model.address.state') + " "
                + this.get('model.address.postcode') + " "
                + this.get('model.address.country');
                return address;
            }.property('address'),
            fullname: function(){
                return this.get('model.firstname') + " " + this.get('model.familyname')
            }.property('fullname')
        });

        SeeV.ProfilesEditController = Ember.Controller.extend({
            needs: ["jobseeker"],
            actions: {
                update: function () {
                    var profile = this.get('model');
                    var c = this;

                    Ember.$.post("/jobseeker/profiles/1", { profile: profile }, function (result) {
                        c.transitionToRoute('jobseeker.details');
                    });
    
                }
            }
                   
        });
        
        SeeV.RefereesController = Ember.Controller.extend({
            needs: ["jobseeker"],
            actions:{
                remove: function(referee){
                    var profile = this.get('model');
                    var c = this;
                     
                    $.ajax('/jobseeker/referees/' + referee._id, {
                        method: 'DELETE'
                    })
                    .then(
                        function success() {
                            //remove from profile.referees
                            //hack... :(
                    
                            for(var i=0;i<profile.referees.length;i++){
                                if(profile.referees[i]._id===referee._id){
                                    profile.referees.splice(i,1);
                                    //c.transitionToRoute('referees');
                                    c.transitionToRoute('jobseeker.details');
                                    break;
                                }
                            }
                            
                        }
                    );
                }
            }
        });
             
        SeeV.RefereesEditController = Ember.Controller.extend({
            needs: ["jobseeker"],
            jobseeker: Ember.computed.alias("controllers.jobseeker"),
            actions:{
                update : function(){
                    var referee = this.get('model');
                    var profile = this.get('jobseeker').model;
        
                    var c = this;
                     
                    $.ajax('/jobseeker/referees/' + referee._id, {
                        method: 'PUT',
                        data: { referee: referee }
                    })
                    .then(
                        function success(userInfo) {
                            //hack... :(
                            for(var i=0;i<profile.referees.length;i++){
                                if(profile.referees[i]._id===referee._id){
                                    profile.referees[i] = referee;
                                    break;
                                }
                            }
                            c.transitionToRoute('referees');
                            
                        }
                    );
                }
            }
        });
        
        SeeV.RefereesNewController = Ember.Controller.extend({
            needs: ["jobseeker"],
            actions:{
                add: function(){
                    var profile = this.get('model');
                     
                    var referee = {
                        name        : $("#refereeName").val(),
                        position    : $("#refereePosition").val(),
                        company     : $("#refereeCompany").val(),
                        phone       : $("#refereePhone").val(),
                        mobile      : $("#refereeMobile").val(),
                        email       : $("#refereeEmail").val()
                    }

                    var c = this;
                    Ember.$.post("/jobseeker/referees", { referee: referee }, function (result) {
                        profile.referees.push(result);
                        c.transitionToRoute('referees');
                    });
                }
            }
        });
     
        SeeV.CareersController = Ember.Controller.extend({
            actions:{
                remove: function(career){
                    var profile = this.get('model');
                    var c = this;
                     
                    $.ajax('/jobseeker/careers/' + career._id, {
                        method: 'DELETE'
                    })
                    .then(
                        function success() {
                            //remove from profile.careers
                            //hack... :(
                    
                            for(var i=0;i<profile.careers.length;i++){
                                if(profile.careers[i]._id===career._id){
                                    profile.careers.splice(i,1);
                                    //c.transitionToRoute('careers');
                                    c.transitionToRoute('jobseeker.details');
                                    break;
                                }
                            }
                            
                        }
                    );
                }
            }
                    
        });
   
  
        SeeV.CareersNewController = Ember.Controller.extend({
             needs: ["jobseeker"],
             actions:{
                 add: function(){
                     var profile = this.get('model');
                     
                     var career = {
                         role         : $("#role").val(),
                         company      : $("#company").val(),
                         start        : $("#start").val(),
                         end          : $("#end").val(),
                         description  : $("#description").val()
                     }
               
        
                     var c = this;
                     Ember.$.post("/jobseeker/careers", { career: career }, function (result) {
                         console.log(result);
                         profile.careers.push(result);
                         c.transitionToRoute('careers');
                     });
                 }
             }
        });
            
        SeeV.CareersEditController = Ember.Controller.extend({
            needs: ["jobseeker"],
            jobseeker: Ember.computed.alias("controllers.jobseeker"),
            actions:{
                update : function(){
                    var career = this.get('model');
                    var profile = this.get('jobseeker').model;
        
                    console.log(career);
        
                    var c = this;
                     
                    $.ajax('/jobseeker/careers/' + career._id, {
                        method: 'PUT',
                        data: { career: career }
                    })
                    .then(
                        function success(userInfo) {
                            //hack... :(
                            for(var i=0;i<profile.careers.length;i++){
                                if(profile.careers[i]._id===career._id){
                                    profile.careers[i] = career;
                                    break;
                                }
                            }
                            c.transitionToRoute('careers');
                            
                        }
                    );
                }
            }
        });
        
        SeeV.SkillsController = Ember.Controller.extend({
            actions:{
                remove: function(skill){
                    var profile = this.get('model');
                    var c = this;
                     
                    $.ajax('/jobseeker/skills/' + skill._id, {
                        method: 'DELETE'
                    })
                    .then(
                        function success() {
                            //remove from profile.skills
                            //hack... :(
                    
                            for(var i=0;i<profile.skills.length;i++){
                                if(profile.skills[i]._id===skill._id){
                                    profile.skills.splice(i,1);
                                    //c.transitionToRoute('skills');
                                    c.transitionToRoute('jobseeker.details');
                                    break;
                                }
                            }
                            
                        }
                    );
                }
            }
                    
        });
        
        SeeV.SkillsNewController = Ember.Controller.extend({
            needs: ["jobseeker"],
            actions:{
                add: function(){
                    var profile = this.get('model');
                     
                    var skill = {
                        name        : $("#name").val(),
                        category    : $("#category").val()
                    }

                    var c = this;
                    Ember.$.post("/jobseeker/skills", { skill: skill }, function (result) {
                        profile.skills.push(result);
                        c.transitionToRoute('skills');
                    });
                }
            }
        });
        
        SeeV.SkillsEditController = Ember.Controller.extend({
            needs: ["jobseeker"],
            jobseeker: Ember.computed.alias("controllers.jobseeker"),
            actions:{
                update : function(){
                    var skill = this.get('model');
                    var profile = this.get('jobseeker').model;
                    var c = this;
                     
                    $.ajax('/jobseeker/skills/' + skill._id, {
                        method: 'PUT',
                        data: { skill: skill }
                    })
                    .then(
                        function success(userInfo) {
                            //hack... :(
                            for(var i=0;i<profile.skills.length;i++){
                                if(profile.skills[i]._id===skill._id){
                                    profile.skills[i] = skill;
                                    break;
                                }
                            }
                            c.transitionToRoute('skills');
                            
                        }
                    );
                }
            }
        });    
        
        
        SeeV.QualificationsController = Ember.Controller.extend({
            actions:{
                remove: function(qualification){
                    var profile = this.get('model');
                    var c = this;
                     
                    $.ajax('/jobseeker/qualifications/' + qualification._id, {
                        method: 'DELETE'
                    })
                    .then(
                        function success() {
                            //remove from profile.qualifications
                            //hack... :(
                    
                            for(var i=0;i<profile.qualifications.length;i++){
                                if(profile.qualifications[i]._id===qualification._id){
                                    profile.qualifications.splice(i,1);
                                    //c.transitionToRoute('qualifications');
                                    c.transitionToRoute('jobseeker.details');
                                    break;
                                }
                            }
                            
                        }
                    );
                }
            }
                    
        });
        
        SeeV.QualificationsNewController = Ember.Controller.extend({
            needs: ["jobseeker"],
            actions:{
                add: function(){
                    var profile = this.get('model');
                     
                    var qualification = {
                        name        : $("#name").val(),
                        category    : $("#category").val(),
                        received    : $("#received").val(),
                    }

                    var c = this;
                    Ember.$.post("/jobseeker/qualifications", { qualification: qualification }, function (result) {
                        profile.qualifications.push(result);
                        c.transitionToRoute('qualifications');
                    });
                }
            }
        });
        
        SeeV.QualificationsEditController = Ember.Controller.extend({
            needs: ["jobseeker"],
            jobseeker: Ember.computed.alias("controllers.jobseeker"),
            actions:{
                update : function(){
                    var qualification = this.get('model');
                    var profile = this.get('jobseeker').model;
                    var c = this;
                     
                    $.ajax('/jobseeker/qualifications/' + qualification._id, {
                        method: 'PUT',
                        data: { qualification: qualification }
                    })
                    .then(
                        function success(data) {
                            //hack... :(
                            for(var i=0;i<profile.qualifications.length;i++){
                                if(profile.qualifications[i]._id===qualification._id){
                                    profile.qualifications[i] = qualification;
                                    break;
                                }
                            }
                            c.transitionToRoute('qualifications');
                            
                        }
                    );
                }
            }
        });   
            
            /*Helpers*/
            
            Ember.Handlebars.helper('mailToHelper', function(email, options) {
              var mailTo = '<a target="_blank" href="mailto:' + email + '">';
              mailTo += "<span>" + email + "</span></a>";
              return new Handlebars.SafeString(mailTo);
            });

            Ember.Handlebars.helper('formatDate', function(date, format) {
                return moment(date).format(format);
            });
   
            SeeV.DateInputComponent = Ember.TextField.extend({
              type: 'date',
              date: function(key, date) {
                if (date) {
                    console.log(date);
                  this.set('value', date.substring(0, 10));
                } else {
                  value = this.get('value');
                  if (value) {
                    date = new Date(value);
                  } else {
                    date = null;
                  }
                }
                return date;
              }.property('value')
            });


