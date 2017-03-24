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
});

Template.DataPrepair.helpers({
	project:()=> {
        var id = FlowRouter.getParam('id');
		return Projects.findOne({_id:id});
	},

	data_project:()=>{
		var id = FlowRouter.getParam('id');
		var project_address = Projects.findOne({_id:id}).address;
		// var response = "";

		Meteor.call('queryDataDrill',project_address, function(err,res){
			if(res.statusCode == 200){
				// console.log(res.data.rows);
				// console.log(res.data.columns);
				// response = res.data.rows[0].apellido;
				Session.set('data_project',res.data.rows);
				// Session.set('data_keys',Object.keys(res.data.rows[0]));
				Session.set('data_keys',res.data.columns);
			}
			if(err){
				alert("no data");
			}
		});	

		return Session.get('data_project');
	},

	tableHeader:()=> {
        return Session.get('data_keys');
	},

	rowContent:(document)=> {
	    var row = [];
	    var header = Session.get('data_keys');
	    for (var key in header) {
	      row.push(document[header[key]] || "");
	    }
	    return row;
	}
});

//Luego de realizar cualquier tarea en esta etapa se debe modificar el stage de la coleccion projecto y se debe colocar 'preparacion' para que al volver a ingresar al proyecto lo redirija a la ultima etapa que realizó alguna tarea.