Template.Projects.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('my_projects');
		self.subscribe('all_datasets');
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
	},
	fecha: (date) => {
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();

		date = day+"/"+month+"/"+year;

		return date;
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
   		var id_project = $("#delete").data("target");
   		var that = Projects.findOne(id_project);

   		Meteor.call('removeHdfsFolder', that.address, function(err,res){
   			console.log(res);
   			if(res.statusCode == 200){
   				Meteor.call('removeProject',id_project, function(err2,res2){
					// console.log(res2);
					if(res2){
						// alert("El proyecto ha sido eliminado exitosamente!!!");
						$("#deleteModal").modal('hide');
					}else{
						$("#deleteModal").modal('hide');
						alert("No se ha podido eliminar el proyecto!!!");
					}
					if(err2){
						$("#deleteModal").modal('hide');
						alert("No se ha podido eliminar el proyecto!!!");
					}
				});	
   			}else{
   				$("#deleteModal").modal('hide');
   				alert("No se ha podido eliminar el proyecto!!!");
   			}
   			if(err){
   				alert("No se ha podido eliminar el proyecto!!!");
   			}
   		});
   	},

   	'show.bs.modal #deleteModal' (event) {
   		var button = $(event.relatedTarget);
   		var target = button.data('id');
		// console.log(target);
		// let modal = $(this);
		$("#delete").data("target", target);
	},

	'show.bs.modal #viewModal' (event) {
		var button 		= $(event.relatedTarget);
		var id_project 	= button.data('id');
		var that 		= Projects.findOne(id_project);
		var ds 			= DataSets.findOne(that.dataset);

		$('#pjName').text(that.name);
		$('#pjDataset').text(ds.name);
		$('#pjDesc').text(that.desc);

		var date = that.createdAt;
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();

		date = day+"/"+month+"/"+year;

		$('#pjDate').text(date);
	}
});