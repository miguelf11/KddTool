Template.newProject.helpers({
	completeName: function() {
		if(Meteor.user()){
			return (Meteor.user().profile.name+' '+Meteor.user().profile.lastName);
		}
	}
});

Template.newProject.events({
	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('proyectos');
  },
})