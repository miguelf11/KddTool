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
});

Template.DataPrepair.events({
	// 'click .undo-btn' (event, template) {
	// 	console.log('deshacer');      

 //    },
});

//Luego de realizar cualquier tarea en esta etapa se debe modificar el stage de la coleccion projecto y se debe colocar 'preparacion' para que al volver a ingresar al proyecto lo redirija a la ultima etapa que realizó alguna tarea.