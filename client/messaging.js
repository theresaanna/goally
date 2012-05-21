// FOR CONSIDERATION: currently messaging system
// only supports one message at a time
Meteor.userAlert = function(alert) {
    var updateMessages = function() {
        var context = new Meteor.deps.Context();
        context.on_invalidate(updateMessages);
        context.run(function() {
            // empty the contents of #messages
            // then insert new value of 'message'
            $('#messages').empty()
                .append(Session.get('message'));
        });
    }
    updateMessages();
}


