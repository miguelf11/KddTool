Template.recoverPwd.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('all_users');
  });
});

Template.recoverPwd.events({
  'submit form'(event, template) {
    // increment the counter when button is clicked
    event.preventDefault();

    var emailVar = template.find('#loginEmail').value;
    let that = Meteor.users.findOne({"emails.address": emailVar});
    console.log(that);
    if (that) {
      console.log(that._id);
      Meteor.call('recoverPwd', that._id, emailVar, function (err, res) {
        if (err) {
          console.log(err);
          alert("Hubo un error, vuelva a intentarlo");
        } else {
          FlowRouter.go('login');
        }
      });
    } else {
      alert('No existe un usuario con este correo');
    }
  },
  'click .btn-login-to-register'(event) {
    // increment the counter when button is clicked
    event.preventDefault();
    FlowRouter.go('login');
  },
});
