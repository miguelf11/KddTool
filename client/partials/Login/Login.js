Template.Login.events({
  'submit form'(event, template) {
    // increment the counter when button is clicked
    event.preventDefault();
    var emailVar = template.find('#loginEmail').value;
    var passwordVar = template.find('#loginPassword').value;
    Meteor.loginWithPassword(emailVar,passwordVar, function(error){
       	if(typeof error != typeof undefined){
    		alert(error.reason);
    	}
    });
    console.log('user logged in');
  },
  'click .btn-login-to-register'(event, template) {
    // increment the counter when button is clicked
    event.preventDefault();
    FlowRouter.go('registro');
    console.log('to registrer');
  },
});