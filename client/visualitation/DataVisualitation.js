Template.DataVisualitation.onCreated(function(){
	var self = this;
	self.autorun(function(){
        var id = FlowRouter.getParam('id');
        console.log(id);
		self.subscribe('single_project',id);
		Session.set('projectId', id);
	});
});

Template.DataVisualitation.onRendered(function(){
	$('.each-tab').each(function(){
		$(this).removeClass('active');
		$(this).addClass('disabled');
	});
	$('#visualizacionTab').addClass('active');
	$('#visualizacionTab').removeClass('disabled');
});

Template.DataVisualitation.helpers({
	project:()=> {
        var id = FlowRouter.getParam('id');
		return Projects.findOne({_id:id});
	}
});

//Luego de realizar cualquier tarea en esta etapa se debe modificar el stage de la coleccion projecto y se debe colocar 'visualizacion' para que al volver a ingresar al proyecto lo redirija a la ultima etapa que realizó alguna tarea.