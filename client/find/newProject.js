Template.newProject.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('all_datasets');
	});
});

Template.newProject.helpers({
	completeName: function() {
		if(Meteor.user()){
			return (Meteor.user().profile.name+' '+Meteor.user().profile.lastName);
		}
	},
	datasets:()=> {
		return DataSets.find({});
	}
});

Template.newProject.events({
	'submit form'(event, template) {
	    event.preventDefault();
	    var name = template.find('#name').value;
	    var description = template.find('#description').value;
	    var nRows = template.find('#numberRows').value;
	    var nFields = template.find('#numberFields').value;
	    // var user = template.find('.author').value;
	    var dirCluster = template.find('#address').value;
	    var dataset = template.find('#dataset').value;
	    var project =
	    {
	    	name: name,
			desc: description,
			num_rows: nRows,
			num_fields: nFields,
			address: dirCluster,
			dataset: dataset
	    }
    // console.log('dataset created');
    	console.log(project);
    	// DataSets.insert(dataset);
    	Meteor.call('insertProject', project);
    	FlowRouter.go('preparacion');
   //  DataSets.insert(Meteor.userId(),
   //  	{
	  //   	'name': name,
			// 'desc': description,
			// 'num_rows': nRows,
			// 'num_fields': nFields,
			// 'address': dirCluster,
			// 'author': Meteor.userId()
	  //   });

  	},
	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('datasets');
  	},
})