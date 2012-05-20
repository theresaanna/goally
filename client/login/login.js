Template.loginForm.events = {
    'click .register': function(event) {
        event.preventDefault();
        $('#username').toggle();
        Session.set('registration', '1');
    },

    'click .submit': function(event) {
        event.preventDefault();
        var address = document.getElementById('emailaddr').value,
            username = document.getElementById('username').value,
            emailTest = validEmail(address),
            newUser;
        
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
        
        try {
            Session.set('user', newUser._id);
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
