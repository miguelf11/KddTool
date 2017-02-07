Template.myProfile.helpers({
	getEmail: function() {
		if(Meteor.user()) {
			// console.log(Meteor.user().emails[0].address);
			return (Meteor.user().emails[0].address);
		}
	},
	getName: function() {
		if(Meteor.user()) {
			// console.log(Meteor.user().profile);
			return (Meteor.user().profile.name);
		}
	},
	getLastName: function() {
		if(Meteor.user()) {
			// console.log(Meteor.user().profile.lastName);
			return (Meteor.user().profile.lastName);
		}
	},
});

Template.myProfile.events({
  'click .btn-back-profile'(event, template) {
   FlowRouter.go('/proyectos');

    console.log('logout');
  },
  'submit #profileForm'(event, template) {
    event.preventDefault();
    var nameVar = template.find('#name').value;
    var lastNameVar = template.find('#lastName').value;
    if(Meteor.user()) {
		console.log("Cambiar nombre o apellido");
		if(Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.name":nameVar,"profile.lastName":lastNameVar}})){
			alert('Se modificaron los datos exitosamente!');
		}
	}
  },
  'click .change-password'(event, template) {
  	event.preventDefault();
    console.log('cambiar contraseña');
    $('#changePassForm').removeClass('hidden');
    $('#profileForm').addClass('hidden');
  },
  'click .btn-back-pass'(event, template) {
   	event.preventDefault();
   	$('#changePassForm').addClass('hidden');
    $('#profileForm').removeClass('hidden');
  },
  'keyup #passwordNewRep'(event, template) {
    // var passwordOldVar = template.find('#passwordOld').value;
    var passwordNewVar = template.find('#passwordNew').value;
    var passwordNewVarRep = template.find('#passwordNewRep').value;
    if(passwordNewVar != passwordNewVarRep) {
        $('.no-match').text("NO COINCIDEN LAS CONTRASEÑAS");
        $('.btn-edit-pass').prop('disabled', true);
    } else {
        $('.no-match').text("");
        $('.btn-edit-pass').prop('disabled', false);
    }
    
   },
   'submit #changePassForm'(event, template) {
    event.preventDefault();
    var passwordOldVar = template.find('#passwordOld').value;
    var passwordNewVar = template.find('#passwordNew').value;
    var callback = '';
    if(Meteor.user()) {
		Accounts.changePassword(passwordOldVar, passwordNewVar, callback);
		if (callback == ''){
			alert('Contraseña modificada exitosamente!');
			Meteor.logout();
		}else{
			alert(callback);
		}
	}
   },
});
