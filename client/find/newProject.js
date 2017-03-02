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
	    // var nRows = template.find('#numberRows').value;
	    // var nFields = template.find('#numberFields').value;
	    // var user = template.find('.author').value;
	    // var dirCluster = template.find('#address').value;
	    var dataset = template.find('#dataset').value;
	    var stage = 'preparacion';
	    var project =
	    {
	    	name: name,
			desc: description,
			// num_rows: nRows,
			// num_fields: nFields,
			// address: dirCluster,
			dataset: dataset,
			last_stage: stage
	    }
    	var HDFSProjectFolderName = name.replace(/\s/g, "");
    	var HDFSUserFolderName = Meteor.user().emails[0].address;
		Meteor.call('createHdfsFolderProject',HDFSUserFolderName,HDFSProjectFolderName,function(error, result){
			console.log(result);
			if(result.statusCode == 200){
				// console.log(result);
		    	// hive = require('node-hive').for({ server:"hive.myserver" });

				// hive.fetch("show databases", function(err, data) {
				//   data.each(function(record) {
				//     console.log(record);
				//   });
				// });				
				Meteor.call('insertProject', project,function(err, res){
		    		if(res){
		    			FlowRouter.go('preparacion', { id: res});
		    		}
		    		if(err){
		    			alert("No se ha podido crear el proyecto!");
		    		}
				});
			}else{
				alert('No se ha podido crear el proyecto! (Error en Clúster)');
			}
		});

  	},
	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('datasets');
  	},
})