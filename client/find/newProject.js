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
	    var stage = 'preparacion';
	    var project =
	    {
	    	name: name,
			desc: description,
			num_rows: nRows,
			num_fields: nFields,
			address: dirCluster,
			dataset: dataset,
			last_stage: stage
	    }
    	// console.log(project);
    	var HDFSProjectFolderName = name.replace(/\s/g, "");
    	var HDFSUserFolderName = Meteor.user().emails[0].address;
    	// Meteor.call('prueba', 'hola',' mundo',function(err,res){
    	// 	if(err){
    	// 		console.log(err);
    	// 	}else{
    	// 		console.log(res);
    	// 	}
    	// });
    	// console.log(aqui);
		// Meteor.call('createHdfsFolderProject',HDFSUserFolderName,HDFSProjectFolderName);
    	// Session.set('newProjectId', null);
    	Meteor.call('insertProject', project,function(err, res){
		   	FlowRouter.go('preparacion', { id: res});
		});
    	// console.log(Session.get('newProjectId'));

  //   	alert("El proyecto se ha creado Exitosamente!");

  		// while(Session.get('newProjectId') == null){};

    	// FlowRouter.go('preparacion', { id: Session.get('newProjectId') });	

    	

    	// hive = require('node-hive').for({ server:"hive.myserver" });

		// hive.fetch("show databases", function(err, data) {
		//   data.each(function(record) {
		//     console.log(record);
		//   });
		// });

  	},
	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('datasets');
  	},
})