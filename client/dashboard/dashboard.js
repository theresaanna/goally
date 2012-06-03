Template.itemStatus.list = function() {
    return Status.find();
}

Template.itemStatus.events = {
    'click .changeStatus': function(event) {
        event.preventDefault();
        $(event.target).next('.statusList').toggle();
    }

    // we don't handle the change status form events here
    // in this context, we cannot tell what collection the parent object is from
    // each collection template has an event handler that will update its document accordingly

};

Template.orderControls.events = {
    'click .moveUpButton': function(event) {
        event.preventDefault();
    }
}

// compare the Status obj and the Project.status
// if true, the template will have the radio button
// selected by default
Handlebars.registerHelper("ifCurrentStatus", function(status, name) {
    if (status === name) {
        return 'checked';
    }
   return null;
});
