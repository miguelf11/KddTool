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

	    var dataset_address = DataSets.findOne({_id:dataset},{fields:{hdfs_address:1}}).hdfs_address;
	    console.log(dataset_address);

    	var HDFSProjectFolderName = name.replace(/\s/g, "");
    	var HDFSUserFolderName = Meteor.user().emails[0].address;
		Meteor.call('createHdfsFolderProject',HDFSUserFolderName,HDFSProjectFolderName,function(error, result){
			console.log(result);
			if(result.statusCode == 200){
				//drill copy dataset to folder project
				console.log('folder hdfs created');
				var folder_project = cluster_root+"/projects/"+HDFSUserFolderName+"/"+HDFSProjectFolderName;

				Meteor.call('copyDatasetInFolderProject',folder_project,dataset_address, function(error2,result2){
					console.log(result2);
					if(result2.statusCode == 200){
						console.log('dataset copied into project folder');
					    var project =
						    {
						    	name: name,
								desc: description,
								// num_rows: nRows,
								// num_fields: nFields,
								address: folder_project,
								dataset: dataset,
								last_stage: stage
						    };
						Meteor.call('insertProject', project,function(err, res){
				    		if(res){
				    			console.log('project created in mongo');
				    			FlowRouter.go('preparacion', { id: res});
				    		}
				    		if(err){
				    			alert("No se ha podido crear el proyecto!");
				    		}
						});
					}else{
						alert('No se ha podido crear el proyecto! (Error en Clúster)');
					}
					if(error2){
						alert('No se ha podido crear el proyecto! (Error en Clúster)');
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