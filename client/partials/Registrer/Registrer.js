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
    console.log('user created');
  },
  'click .btn-login-back'(event, template) {
    // increment the counter when button is clicked
    event.preventDefault();
    FlowRouter.go('login');
    console.log('to login');
  },
});