Template.Registrer.events({
  'submit form'(event, template) {
    event.preventDefault();
    var nameVar = template.find('#name').value;
    var lastNameVar = template.find('#lastName').value;
    var emailVar = template.find('#email').value;
    var passwordVar = template.find('#password').value;
    Accounts.createUser({
    	email:emailVar,
    	password:passwordVar,
    	profile: {
    		name:nameVar,
    		lastName:lastNameVar
    	}
    });
    Meteor.call('createHdfsFolderUser',emailVar);
    console.log('user created');
  },

  'click .btn-login-back'(event, template) {
    // increment the counter when button is clicked
    event.preventDefault();
    FlowRouter.go('login');
    console.log('to login');
  },

  'keyup #passwordRep'(event, template) {
    var passwordVar = template.find('#password').value;
    var passwordVarRep = template.find('#passwordRep').value;
    if(passwordVarRep != passwordVar) {
        $('.no-match').text("NO COINCIDEN LAS CONTRASEÑAS");
        $('.btn-login').prop('disabled', true);
    } else {
        $('.no-match').text("");
        $('.btn-login').prop('disabled', false);
    }
    
  },
});