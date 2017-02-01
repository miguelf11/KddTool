Template.createProject.helpers({
	completeName: function() {
		if(Meteor.user()){
			return (Meteor.user().profile.name+' '+Meteor.user().profile.lastName);
		}
	}
});

Template.createProject.events({
	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('proyectos');
  },
})