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


