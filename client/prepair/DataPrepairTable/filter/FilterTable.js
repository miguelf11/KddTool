Template.DataPrepairTable.events({
	'show.bs.modal #filterModal' (event){
		let button 	= $(event.relatedTarget);
		let column 	= button.data('id');
		let type 	= button.data('type');

		$('#filterModal .modal-title').text('Filtar por: '+column);

		if (type == 'BIGINT' || type == 'DOUBLE') {
			$('#filterModal #numeric').css('display', 'block');
			$('#filter_numeric').attr('data-column', column);
		} else if (type == 'VARCHAR') {
			$('#filterModal #string').css('display', 'block');
			$('#filter_string').attr('data-column', column);
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
				var new_version = Projects.update({_id:id},{$set:{current_version_address:new_version_address,prepair_versions:versions}});
				console.log(new_version);

				if (new_version){
					Meteor.call('queryDataDrill',new_version_address, function(err,res){
						if(res.statusCode == 200){
							$("#filterModal").modal('hide');
							$('#filterModal #numeric').css('display', 'none');

							Session.set('data_project',res.data.rows);
							Session.set('data_keys',res.data.columns);
							Session.set('num_rows',res.data.rows.length);
							Session.set('num_fields',res.data.columns.length);
							$(".backdrop").css('display','none');
						}
						if(err){
							$(".backdrop").css('display','none');
							alert("No se pudo filtrar vuelva a intentarlo");
						}
					});
				}
			}
			if(err){
				$(".backdrop").css('display','none');
				alert("No se pudo filtrar vuelva a intentarlo");
			}
		});
	},

	'click #filter_string' () {
		$(".backdrop").css('display','block');
		var option 			= $('#filter_string_by').val();
		var value 			= $('#filter_string_value').val();
		var id 				= FlowRouter.getParam('id');
		var column 			= $('#filter_string').data('column');
		var project_address = Projects.findOne({_id:id}).current_version_address;
		var filter 			= 'like';
		var old_version_address = Projects.findOne({_id:id}).current_version_address;
		var new_version_address = Projects.findOne({_id:id}).address;
		new_version_address = new_version_address+"/version"+Date.now();

		if (option == 'SW') {
			value = "'"+value+"%'";
		} else if (option == 'EW') {
			value = "'%"+value+"'";
		} else if (option == 'EQ') {
			value = "'"+value+"'";
		} else if (option == 'CT') {
			value = "'%"+value+"%'";
		}

		// console.log(column+filter+value);

		Meteor.call('queryDataDrillFilterBy',new_version_address,old_version_address,column,filter,value, function (err, res) {
			if(res.statusCode == 200){
				var versions = Projects.findOne({_id:id}).prepair_versions;
				console.log(versions);
				versions.unshift(new_version_address);
				console.log(versions);
				var new_version = Projects.update({_id:id},{$set:{current_version_address:new_version_address,prepair_versions:versions}});
				console.log(new_version);

				if (new_version){
					Meteor.call('queryDataDrill',new_version_address, function(err,res){
						if(res.statusCode == 200){
							$("#filterModal").modal('hide');
							$('#filterModal #string').css('display', 'none');

							Session.set('data_project',res.data.rows);
							Session.set('data_keys',res.data.columns);
							$(".backdrop").css('display','none');
						}
						if(err){
							$(".backdrop").css('display','none');
							alert("No se pudo filtrar vuelva a intentarlo");
						}
					});
				}
			}
			if(err){
				$(".backdrop").css('display','none');
				alert("No se pudo filtrar vuelva a intentarlo");
			}
		});
	},

	'click .closeFilter' (){
		$('#filterModal #numeric').css('display', 'none');
		$('#filterModal #string').css('display', 'none');
	}
});