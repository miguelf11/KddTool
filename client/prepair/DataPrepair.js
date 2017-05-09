import { ReactiveVar } from 'meteor/reactive-var';

Template.DataPrepair.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		console.log(id);
		self.subscribe('single_project',id);
		Session.set('projectId', id);
		Session.set('data_project','');
		Session.set('data_keys','');
		Session.set('project_actions',[]); 	
	});
});

Template.DataPrepair.onRendered(function(){
	$('.each-tab').each(function(){
		$(this).removeClass('active');
		$(this).addClass('disabled');
	});
	$('#preparacionTab').addClass('active');
	$('#preparacionTab').removeClass('disabled');
	$('.save-btn').addClass('hidden');
});

Template.DataPrepair.helpers({
	project:()=> {
		var id = FlowRouter.getParam('id');
		return Projects.findOne({_id:id});
	},
	num_rows:()=> {
		return Session.get('num_rows');
	},
	num_fields:()=> {
		return Session.get('num_fields');
	},
	project_actions:()=> {
		return Session.get('project_actions');
	},
});

Template.DataPrepair.events({
	'click .MVGenerator' (event, template) {
		console.log("Generar vista minable");
		$(".backdrop").css('display','block');

		var project_id = FlowRouter.getParam('id');
		var project = Projects.findOne({_id:project_id});
		var address = project.address;
		var project_address = project.current_version_address;

		Meteor.call('test',address,project_address,function(err,res){
			if(res.statusCode == 200){
				$(".backdrop").css('display','none');
				// TRANSLADARSE A SUS ETAPAS O DESBLOQUEAR LA ETAPA SIGUIENTE
			}else{
				$(".backdrop").css('display','none');
				alert("No se puedo generar la vista minable, vuelva a intentarlo");
			}
			if(err){
				$(".backdrop").css('display','none');
				alert("No se puedo generar la vista minable, vuelva a intentarlo");
			}
		});
	}
});

//Luego de realizar cualquier tarea en esta etapa se debe modificar el stage de la coleccion projecto y se debe colocar 'preparacion' para que al volver a ingresar al proyecto lo redirija a la ultima etapa que realizó alguna tarea.