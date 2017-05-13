Template.DataPrepairTable.events({
	'show.bs.modal #replaceModal' (event){
		let button 	= $(event.relatedTarget);
		let column 	= button.data('id');

		$('#replaceModal .modal-title').text('Reemplazar valores de: '+ column);
		$('#replaceSubmit').attr('data-column', column);
	},

	'click #replaceSubmit' () {
		$(".backdrop").css('display','block');
		var init 			= $('.initVal').val();
		var post 			= $('.postVal').val();
		var id 				= FlowRouter.getParam('id');
		var column 			= $('#replaceSubmit').attr('data-column');
		var project 		= Projects.findOne({_id:id});
		var old_version_address = project.current_version_address;
		var new_version_address = project.address;
		new_version_address = new_version_address+"/version"+Date.now();
		var order = Session.get('data_keys');
		console.log(column);

		Meteor.call('replaceValues',new_version_address,old_version_address, column, init, post, order.toString(), (err,res)=> {
			console.log(res);
			if(res.statusCode == 200){
				var versions = Projects.findOne({_id:id}).prepair_versions;
				versions.unshift(new_version_address);
				console.log(versions);
				var actions = Projects.findOne({_id:id}).actions;
				var new_action = 'Reemplazar en '+column+': '+init+' por '+post;

				if(actions){
					actions.push(new_action);  
				}else{
					var actions = [];
					actions[0] = new_action;
				}
				console.log(new_action);
				var new_version = Projects.update({_id:id},{$set:{current_version_address:new_version_address,prepair_versions:versions,actions:actions}});
				console.log(new_version);

				if (new_version){
					Meteor.call('queryDataDrill',new_version_address, function(err,res){
						if(res.statusCode == 200){
							$("#replaceModal").modal('hide');

							Session.set('data_project',res.data.rows);
							Session.set('data_keys',res.data.columns);
							Session.set('num_rows',res.data.rows.length);
							Session.set('num_fields',res.data.columns.length);
							Session.set('project_actions',actions);
							$(".backdrop").css('display','none');
						}
						if(err){
							$(".backdrop").css('display','none');
							alert("Hubo un error cargando los datos");
						}
					});
				}
			}
			if(err){
				$(".backdrop").css('display','none');
				alert("No se pudo reemplazar los datos");
			}
		});
	},

	'click .closeReplace' () {
		
	}
});