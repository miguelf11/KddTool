Template.DataPrepairTable.onCreated(function(){
	var self = this;
	self.autorun(function(){
        var id = FlowRouter.getParam('id');
        console.log(id);
		self.subscribe('single_project',id);
		Session.set('projectId', id);
		Session.set('data_project','');
		Session.set('data_keys',''); 	
	});

	var id = FlowRouter.getParam('id');
	var project_address = Projects.findOne({_id:id}).address;
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


});

Template.DataPrepairTable.helpers({
	project:()=> {
        var id = FlowRouter.getParam('id');
		return Projects.findOne({_id:id});
	},

	data_project:()=>{
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

Template.DataPrepairTable.events({
	'click .order-up' (event, template) {
    	event.preventDefault();
    	var column = $(event.currentTarget).attr("value");
    	var order = 'asc';
    	// console.log(column);
   		// console.log('ordenar de menor a mayor');

   		var project_id = FlowRouter.getParam('id');
   		var project_address = Projects.findOne({_id:project_id}).address;
   		// console.log(project_address);

   		Meteor.call('queryDataDrillOrderBy',column,order,project_address,function(err,res){
   			// console.log(res.data.rows);
    		if(res.statusCode == 200){
    			Session.set('data_project',res.data.rows);
    			$( ".sort-inserted" ).remove();
   				$("<i class='fa fa-caret-up padding-left-half sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
    		}
    		if(err){
    			alert("No se pudo ordenar el tipo de dato!");
    		}
    	});
  	},
  	'click .order-down' (event, template) {
    	event.preventDefault();
    	var column = $(event.currentTarget).attr("value");
    	var order = 'desc';
    	// console.log(column);
   		// console.log('ordenar de mayor a menor')
   		var project_id = FlowRouter.getParam('id');
   		var project_address = Projects.findOne({_id:project_id}).address;
   		console.log(project_address);

   		Meteor.call('queryDataDrillOrderBy',column,order,project_address,function(err,res){
   			// console.log(res.data.rows);
    		if(res.statusCode == 200){
    			Session.set('data_project',res.data.rows);
    			$( ".sort-inserted" ).remove();
   				$("<i class='fa fa-caret-down padding-left-half sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
    		}
    		if(err){
    			alert("No se pudo ordenar el tipo de dato!");
    		}
    	});
  	},
});