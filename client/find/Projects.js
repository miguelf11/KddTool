Template.Projects.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('my_projects');
	});
	Session.set('projectId', null);
});

Template.Projects.onRendered(function(){

});

Template.Projects.helpers({
	projects:()=> {
		return Projects.find({});
	}
});

Template.Projects.events({
	'click .each-project-section > .project-name'(){
		console.log(this._id);
		// var projectId = this._id;
		// console.log(projectId);
		Session.set('projectId', this._id);
		FlowRouter.go(this.last_stage, { id: this._id });
	},
	'click .delete-project'() {
   		// console.log('delete project');
   		// console.log(this.address);
   		// console.log(this._id);
   		var id_project = this._id;

   		Meteor.call('removeHdfsFolder', this.address, function(err,res){
   			console.log(res);
			if(res.statusCode == 200){
				Meteor.call('removeProject',id_project, function(err2,res2){
					// console.log(res2);
		    		if(res2){
		    			alert("El proyecto ha sido eliminado exitosamente!!!");
		    		}else{
		    			alert("No se ha podido eliminar el proyecto!!!");
		    		}
		    		if(err2){
		    			alert("No se ha podido eliminar el proyecto!!!");
					}
				});	
			}else{
				alert("No se ha podido eliminar el proyecto!!!");
			}
			if(err){
				alert("No se ha podido eliminar el proyecto!!!");
			}
		});
  	},
});