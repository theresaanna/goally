Template.loginForm.events = {
    'click .register': function(event) {
        event.preventDefault();
        $('#username').toggle();
        // not doing anything with this yet
        Session.set('registration', '1');
    },

    // submit login or register form
    'click .submit': function(event) {
        event.preventDefault();
        var user = validateEmail(document.getElementById('emailaddr').value);

        // TODO: set cookie
        try {
            Session.set('user', user._id);
            router.navigate('/dashboard', {trigger: true});
        }
        catch (err) {
            Meteor.userAlert(err.message);
            throw new Error(err);
        }
    }
}; 

Template.messages = function() {
    return Session.get('message');
};

// FOR CONSIDERATION: currently messaging system
// only supports one message at a time
Meteor.userAlert = function(alert) {
    var updateMessages = function() {
        var context = new Meteor.deps.Context();
        context.on_invalidate(updateMessages);
        context.run(function() {
            var tmpl = Meteor.ui.render(function() {
                return Template.messages();
            });
            $('body').prepend(tmpl);
        })
    }
    updateMessages();
}

// takes: email field input
// returns: user object
function validateEmail(email) {
    // matches string@string.string
    // intentionally simplistic 
    var criteria = /\S+@\S+\.\S+/,
        results = criteria.test(email);
console.log(results);
    // test email format validity
    // TODO: server side validation
    if (!results) {
        var errStr = 'Whoops! Invalid email address. Try again, will you?';
        Session.set('message', errStr);
        Meteor.userAlert();
        throw errStr;
    }
    return userLogin(email);
}

// takes: validated email address
// returns: existing or new user object
function userLogin(email) {
    var userObj = User.findOne({email: email});

    if (typeof userObj === 'undefined') {
        userObj = User.insert({email: email});
    } 

    return userObj;
}
