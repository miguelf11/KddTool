Template.editProject.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('all_datasets');
		var id = FlowRouter.getParam('id');
		self.subscribe('single_project',id);
		
	});
});

Template.editProject.helpers({
	datasets:()=> {
		return DataSets.find({});
	},
	project:()=> {
        var id = FlowRouter.getParam('id');
		return Projects.findOne({_id:id});
	},
	isSelected:()=>{
		return false;
	}
});


Template.editProject.events({
	'submit form'(event, template) {
	    event.preventDefault();
	    var name = template.find('#name').value;
	    var description = template.find('#description').value;
	    var id = template.find('#projectId').value;
	    // var nRows = template.find('#numberRows').value;
	    // var nFields = template.find('#numberFields').value;
	    // var user = template.find('.author').value;
	    // var dirCluster = template.find('#address').value;
	    // var dataset = template.find('#dataset').value;
	    // var stage = 'preparacion';
	    // var id = template.find('form').id;

	    // var dataset_address = DataSets.findOne({_id:dataset},{fields:{hdfs_address:1}}).hdfs_address;
	    // console.log(dataset_address);

    	// var HDFSProjectFolderName = name.replace(/\s/g, "");
    	// var HDFSUserFolderName = Meteor.user().emails[0].address;
		var project =
		    {
		    	name: name,
				desc: description,
				// num_rows: nRows,
				// num_fields: nFields,
				// address: folder_project,
				// dataset: dataset,
				// last_stage: stage
		    };
		Meteor.call('updateProject', id, project,function(err, res){
			if(res){
				console.log('project updated in mongo');
		   			FlowRouter.go('proyectos');
		   		}
			if(err){
				alert("No se ha podido editar el proyecto!");
			}
		});


  	},
	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('proyectos');
  	}
})