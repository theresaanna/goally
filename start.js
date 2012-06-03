Project = new Meteor.Collection('projects');
Milestone = new Meteor.Collection('milestones');
Task = new Meteor.Collection('tasks');
ProjectArchive = new Meteor.Collection('projectArchive');
User = new Meteor.Collection('users');
Status = new Meteor.Collection('status');

if (Meteor.is_client) {

    var Routes = Backbone.Router.extend({
        routes: {
            "dashboard":    "dashboard",
            "archived":     "archived",
            "login":        "login",
            "auth": "auth",
            "authCallback?oauth_token=:oauth_token&oauth_verifier=:oauth_verifier": "authCallback"
        },

        // TODO: abstract this 'startup' functionality
        login: function() {
            var loginView = Meteor.ui.render(function() {
                return Template.loginForm();
            });
            $('body').append(loginView);
        },

        dashboard: function() {
            // complete and utter hack.
            // there has to be a better way
            // remove the login form once
            // user logs in and dashboard loads
            $('#login').remove();
            Session.set('message', ' ');

            var projectsView = Meteor.ui.render(function() {
                return Template.projects();
            });
            $('body').append(projectsView);
            Session.set("state", "dashboard");
        },

        archived: function() {
            var archivedView = Meteor.ui.render(function() {
                return Template.archivedProjects();
            });
            $('body').append(archivedView);
            Session.set("state", "archived");
        },

        auth: function() {

            Meteor.call('auth', function (err, res) {
              if(err) {
                console.log(err);
                return false;
              }

              if(res.error) {      
                console.log(res.error);
                return false;
              }

              document.location.href ='https://api.twitter.com/oauth/authenticate?oauth_token=' + res.oauth_token;
            });
      }, 

      authCallback: function(oauth_token, oauth_verifier) {
        if(!oauth_token || !oauth_verifier) {
          Routes.navigate('500', true);
          return false;
        }

        Meteor.call('authCallback', oauth_token, oauth_verifier, function (err, res) {
          if(err) {
            console.log(err);
            return false;
          }

          if(res.error) {      
            console.log(res.error);
            return false;
          }

          Routes.navigate('dashboard', true);
        });
      },

    });

    var router = new Routes;

    Meteor.startup(function() {
        // pull the cord on that router
        Backbone.history.start({pushState: true});
    });
}

// Milestone.update({_id: "1fb92586-7fb2-4a19-8ca9-ed145e74070d"}, {name: "get laundry together", tasks: ["d72d2bc4-b717-4111-bc4f-ef72eaa49e10", "4686be94-0e54-4a43-bba8-1463f49eae80", "56c74fa2-274d-406e-813e-9718d64bfab9", "73b32867-3809-47fe-94fe-893de963f076"]});
// Project.insert({name: "Do laundry", milestones: ["1fb92586-7fb2-4a19-8ca9-ed145e74070d", "6143e13d-2e5a-4993-8eae-d50149fba26f"]});
// Milestone.update({name: "fold laundry"}, {$addToSet: {tasks: ["56c74fa2-274d-406e-813e-9718d64bfab9"]}});
// Milestone.insert({name: "fold laundry", tasks: ["56c74fa2-274d-406e-813e-9718d64bfab9"]});
// Project.insert({name: "Do laundry", status: "in progress", milestones: ["1fb92586-7fb2-4a19-8ca9-ed145e74070d", "6143e13d-2e5a-4993-8eae-d50149fba26f"]});
//Project.update({name: "Do laundry"}, {$addToSet: {milestones: "61bb61b9-8af5-42a3-b954-155211bee8b9"}});
