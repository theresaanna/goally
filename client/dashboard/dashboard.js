Template.itemStatus.list = function() {
    return Status.find();
}

Template.itemStatus.events = {
    'click .changeStatus': function(event) {
        event.preventDefault();
        $(event.target).next('.statusList').toggle();
    },

    'click .statusListItem': function(event) {
        var newStatus = $(event.target).html();
    }
};

// compare the Status obj and the Project.status
// if true, the template will have the radio button
// selected by default
Handlebars.registerHelper("ifCurrentStatus", function(status, name) {
    if (status === name) {
        return 'checked';
    }
   return null;
});
