Template.myProfile.helpers({
	getEmail: function() {
		if(Meteor.user()) {
			console.log(Meteor.user().emails.address);
			return (Meteor.user().emails.address);
		}
	}
});

Template.myProfile.events({
  'click .btn-back'(event, template) {
   FlowRouter.go('/proyectos');

    console.log('logout');
  },

});
