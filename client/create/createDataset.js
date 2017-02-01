Template.createDataset.helpers({
	completeName: function() {
		if(Meteor.user()){
			return (Meteor.user().profile.name+' '+Meteor.user().profile.lastName);
		}
	}
});

Template.createDataset.events({
	// 'submit form'(event, template) {
	'click .btn-create': function (event, template) {
	    DataSets.insert({
	    	name: $('#name').val(),
			desc: $('#description').val(),
			num_rows: $('#numberRows').val(),
			num_fields: $('#numberFields').val(),
			address: $('#address').val()
	    })
	    FlowRouter.go('datasets');
	  //   var name = template.find('#name').value;
	  //   var description = template.find('#description').value;
	  //   var nRows = template.find('#numberRows').value;
	  //   var nFields = template.find('#numberFields').value;
	  //   var user = template.find('.author').value;
	  //   var dirCluster = template.find('#address').value;
	  //   var dataset =
	  //   {
	  //   	"name": name,
			// "desc": description,
			// "num_rows": nRows,
			// "num_fields": nFields,
			// "address": dirCluster
	  //   }
	    // Meteor.call('insertDataset', dataset);
	    // event.preventDefault();
	    // FlowRouter.go('proyectos');

	    // Meteor.call('insertDataset', dataset, function (error, result) {
	    //   if (error) {
	    //     // check error.error and error.reason (if I'm remembering right)
	    //     console.log("error  "+error);
	    //   } else {
	    //     // Success!
	    //     console.log("result "+result);
	    //   }
	    // });
    // console.log('dataset created');
    // console.log(dataset);

  },

	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('proyectos');
  },
})