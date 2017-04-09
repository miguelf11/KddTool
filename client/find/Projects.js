Template.Projects.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('my_projects');
	});
	Session.set('projectId', null);
});

Template.Projects.onRendered(function(){
	$(".nav-tabs-projects > li").each(function() {
	  $(this).removeClass("active");
	});	

	$("#projectsTabli").addClass('active');

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
	'click #delete'() {
   		// console.log('delete project');
   		// console.log(this.address);
   		// console.log(this._id);
   		let id_project = $("#delete").data("target");
   		let that = Projects.findOne(id_project);

   		Meteor.call('removeHdfsFolder', that.address, function(err,res){
   			console.log(res);
   			if(res.statusCode == 200){
   				Meteor.call('removeProject',id_project, function(err2,res2){
					// console.log(res2);
					if(res2){
						alert("El proyecto ha sido eliminado exitosamente!!!");
						$("#deleteModal").modal('hide');
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
   	'show.bs.modal #deleteModal' (event) {
   		let button = $(event.relatedTarget);
   		let target = button.data('id');
		// console.log(target);
		// let modal = $(this);
		$("#delete").data("target", target);
	}
});