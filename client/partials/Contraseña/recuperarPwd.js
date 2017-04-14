Template.recoverPwd.events({
  'submit form'(event, template) {
    // increment the counter when button is clicked
    event.preventDefault();

    var emailVar = template.find('#loginEmail').value;
    Meteor.call('recoverPwd', emailVar);
    FlowRouter.go('login');
  },
  'click .btn-login-to-register'(event) {
    // increment the counter when button is clicked
    event.preventDefault();
    FlowRouter.go('login');
  },
});
