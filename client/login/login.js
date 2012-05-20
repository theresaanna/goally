Template.loginForm.events = {
    'click .submit': function(event) {
        event.preventDefault();
        var address = document.getElementById('emailaddr').value,
            username = document.getElementById('username'),
            newUser;
        if (typeof address === 'undefined') {
            newUser = User.insert({email: address, name: username});
        }
        else {
            newUser = User.findOne({email: address});
        }
        console.log(newUser);
    }
}; 
