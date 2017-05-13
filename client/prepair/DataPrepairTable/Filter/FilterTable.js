Template.DataPrepairTable.events({
	'show.bs.modal #filterModal' (event){
		let button 	= $(event.relatedTarget);
		let column 	= button.data('id');
		let type 	= button.data('type');

		$('#filterModal .modal-title').text('Filtar por: '+column);

		if (type == 'BIGINT') {
			$('#filterModal #numeric').css('display', 'block');
			$('#filter_numeric').attr('data-column', column);
		} else if (type == 'VARCHAR') {
			$('#filterModal #string').css('display', 'block');
			$('#filter_string').attr('data-column', column);
		} else if (type == 'DOUBLE') {
			$('#filterModal #double').css('display', 'block');
			$('#filter_double').attr('data-column', column);
		}
	},

	'click #filter_numeric' () {
		$(".backdrop").css('display','block');
		var filter 			= $('#filter_numeric_by').val();
		var value 			= $('#filter_numeric_value').val();
		var id 				= FlowRouter.getParam('id');
		var column 			= $('#filter_numeric').data('column');
		var project_address = Projects.findOne({_id:id}).current_version_address;
		var old_version_address = Projects.findOne({_id:id}).current_version_address;
		var new_version_address = Projects.findOne({_id:id}).address;
		new_version_address = new_version_address+"/version"+Date.now();
		// console.log(column+filter+value);

		Meteor.call('queryDataDrillFilterBy',new_version_address,old_version_address,column,filter,value, function (err, res) {
			if(res.statusCode == 200){
				var versions = Projects.findOne({_id:id}).prepair_versions;
				console.log(versions);
				versions.unshift(new_version_address);
				console.log(versions);
				var actions = Projects.findOne({_id:id}).actions;
				var new_action = 'Filtro: '+column+' '+filter+' '+value;

				if(actions){
					actions.push(new_action);  
				}else{
					var actions = [];
					actions[0] = new_action;
				}

				var new_version = Projects.update({_id:id},{$set:{current_version_address:new_version_address,prepair_versions:versions,actions:actions}});
				console.log(new_version);

				if (new_version){
					Meteor.call('queryDataDrill',new_version_address, function(err,res){
						if(res.statusCode == 200){
							$("#filterModal").modal('hide');
							$('#filter_numeric_value').val("");
							$('#filterModal #numeric').css('display', 'none');

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
			if(res.statusCode == 500){
				$(".backdrop").css('display','none');
				alert("No se pudo filtrar debido que existen valores faltantes");
			}
		});
	},

	'click #filter_double' () {
		$(".backdrop").css('display','block');
		var filter 			= $('#filter_double_by').val();
		var value 			= Number($('#filter_double_value').val()).toFixed(5);
		var id 				= FlowRouter.getParam('id');
		var column 			= $('#filter_double').data('column');
		var project_address = Projects.findOne({_id:id}).current_version_address;
		var old_version_address = Projects.findOne({_id:id}).current_version_address;
		var new_version_address = Projects.findOne({_id:id}).address;
		new_version_address = new_version_address+"/version"+Date.now();
		// console.log(column+filter+value);

		

		Meteor.call('queryDataDrillFilterBy',new_version_address,old_version_address,column,filter,value, function (err, res) {
			if(res.statusCode == 200){
				var versions = Projects.findOne({_id:id}).prepair_versions;
				console.log(versions);
				versions.unshift(new_version_address);
				console.log(versions);
				var actions = Projects.findOne({_id:id}).actions;
				var new_action = 'Filtro: '+column+' '+filter+' '+value;

				if(actions){
					actions.push(new_action);  
				}else{
					var actions = [];
					actions[0] = new_action;
				}

				var new_version = Projects.update({_id:id},{$set:{current_version_address:new_version_address,prepair_versions:versions,actions:actions}});
				console.log(new_version);

				if (new_version){
					Meteor.call('queryDataDrill',new_version_address, function(err,res){
						if(res.statusCode == 200){
							$("#filterModal").modal('hide');
							$('#filterModal #double').css('display', 'none');
							$('#filter_double_value').val("");

							Session.set('data_project',res.data.rows);
							Session.set('data_keys',res.data.columns);
							Session.set('num_rows',res.data.rows.length);
							Session.set('num_fields',res.data.columns.length);
							Session.set('project_actions',actions);
							$(".backdrop").css('display','none');
						}
						if(err){
							$(".backdrop").css('display','none');
							alert("No se pudo filtrar vuelva a intentarlo");
						}
					});
				}
			}
			if(res.statusCode == 500){
				$(".backdrop").css('display','none');
				alert("No se pudo filtrar debido que existen valores faltantes");
			}
		});
	},

	'click #filter_string' () {
		$(".backdrop").css('display','block');
		var option 			= $('#filter_string_by').val();
		// var option_text 	= $('#filter_string_by').text();
		var value 			= $('#filter_string_value').val();
		var id 				= FlowRouter.getParam('id');
		var column 			= $('#filter_string').data('column');
		var project_address = Projects.findOne({_id:id}).current_version_address;
		var filter 			= 'like';
		var old_version_address = Projects.findOne({_id:id}).current_version_address;
		var new_version_address = Projects.findOne({_id:id}).address;
		new_version_address = new_version_address+"/version"+Date.now();
		var value_text = value;

		if (option == 'SW') {
			value = "'"+value+"%'";
			var option_text = 'Inicie con';
		} else if (option == 'EW') {
			value = "'%"+value+"'";
			var option_text = 'Termine con';
		} else if (option == 'EQ') {
			value = "'"+value+"'";
			var option_text = 'Igual a';
		} else if (option == 'CT') {
			value = "'%"+value+"%'";
			var option_text = 'Contenga';
		}

		// console.log(column+filter+value);

		Meteor.call('queryDataDrillFilterBy',new_version_address,old_version_address,column,filter,value, function (err, res) {
			if(res.statusCode == 200){
				var versions = Projects.findOne({_id:id}).prepair_versions;
				console.log(versions);
				versions.unshift(new_version_address);
				console.log(versions);

				var actions = Projects.findOne({_id:id}).actions;
				var new_action = 'Filtro: '+option_text+' "'+value_text+'"';

				if(actions){
					actions.push(new_action);  
				}else{
					var actions = [];
					actions[0] = new_action;
				}

				var new_version = Projects.update({_id:id},{$set:{current_version_address:new_version_address,prepair_versions:versions,actions:actions}});
				console.log(new_version);

				if (new_version){
					Meteor.call('queryDataDrill',new_version_address, function(err,res){
						if(res.statusCode == 200){
							$("#filterModal").modal('hide');
							$('#filterModal #string').css('display', 'none');
							$('#filter_string_value').val("");

							Session.set('data_project',res.data.rows);
							Session.set('data_keys',res.data.columns);
							Session.set('num_rows',res.data.rows.length);
							Session.set('num_fields',res.data.columns.length);
							Session.set('project_actions',actions);
							$(".backdrop").css('display','none');
						}
						if(err){
							$(".backdrop").css('display','none');
							alert("No se pudo filtrar vuelva a intentarlo");
						}
					});
				}
			}
			if(res.statusCode == 500){
				$(".backdrop").css('display','none');
				alert("No se pudo filtrar debido que existen valores faltantes");
			}
		});
	},

	'click .closeFilter' (){
		$('#filterModal #numeric').css('display', 'none');
		$('#filterModal #string').css('display', 'none');
	}
});