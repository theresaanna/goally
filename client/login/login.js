Template.loginForm.events = {
    'click .register': function(event) {
        event.preventDefault();
        $('#username').toggle();
        // not doing anything with this yet
        Session.set('registration', '1');
    },

    'click .submit': function(event) {
        event.preventDefault();
        var address = document.getElementById('emailaddr').value,
            username = document.getElementById('username').value,
            emailTest = validEmail(address),
            newUser;
        
        // test email format validity
        // TODO: server side validation
        if (!emailTest) {
            var errStr = 'Whoops! Invalid email address. Try again, will you?';
            userAlert(errStr);
            throw errStr;
        }

        if (typeof address === 'undefined') {
            if (username === 'Name') {
                username = address;
            }

            newUser = User.insert({email: address, name: username});
        }
        else {
            newUser = User.findOne({email: address});
        }
        
        // TODO: set cookie
        try {
            Session.set('user', newUser._id);
            router.navigate('/dashboard', {trigger: true});
        }
        catch (err) {
            userAlert(err.message);
            throw new Error(err);
        }

    }

}; 

function validEmail(email) {
    // matches string@string.string
    // intentionally simplistic 
    var criteria = /\S+@\S+\.\S+/;
    return criteria.test(email);
}

function userAlert(alert) {
    $('#messages').append(alert);
    return alert;
}
