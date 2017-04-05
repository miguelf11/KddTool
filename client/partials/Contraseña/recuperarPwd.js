Meteor.methods({
  recoverPwd: () => {
    
  }
});

Template.recoverPwd.events({
  'submit form'(event, template) {
    // increment the counter when button is clicked
    event.preventDefault();
    // var emailVar = template.find('#loginEmail').value;
    // Meteor.call('recoverPwd');
    // Meteor.loginWithPassword(emailVar,passwordVar, function(error){
    //    	if(typeof error != typeof undefined){
    // 		alert(error.reason);
    // 	}
    // });
  },
  'click .btn-login-to-register'(event) {
    // increment the counter when button is clicked
    event.preventDefault();
    FlowRouter.go('login');
  },
});