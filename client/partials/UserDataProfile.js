Template.UserDataProfile.helpers({
	completeName: function() {
		if(Meteor.user()){
			return (Meteor.user().profile.name+' '+Meteor.user().profile.lastName);
		}
	}
});

Template.UserDataProfile.events({
  'click #logout'(event, template) {
    event.preventDefault();
    Meteor.logout();
    console.log('logout');
  },

  'click #myProjects'(event, template) {
    event.preventDefault();
    FlowRouter.go('proyectos');
  },

});