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
		let filter 			= $('#filter_numeric_by').val();
		let value 			= $('#filter_numeric_value').val();
		let id 				= FlowRouter.getParam('id');
		let column 			= $('#filter_numeric').data('column');
		let project_address = Projects.findOne({_id:id}).current_version_address;

		// console.log(column+filter+value);

		Meteor.call('queryDataDrillFilterBy',column,filter,value,project_address, function (err, res) {
			if(res.statusCode == 200){
				$("#filterModal").modal('hide');
				$('#filterModal #numeric').css('display', 'none');
				Session.set('data_project',res.data.rows);
			}
			if(err){
				alert("No se pudo filtrar vuelva a intentarlo!");
			}
		});


	},

	'click #filter_string' () {
		let option 			= $('#filter_string_by').val();
		let value 			= $('#filter_string_value').val();
		let id 				= FlowRouter.getParam('id');
		let column 			= $('#filter_string').data('column');
		let project_address = Projects.findOne({_id:id}).current_version_address;
		let filter 			= 'like';

		if (option == 'SW') {
			value = "'"+value+"%'";
		} else if (option == 'EW') {
			value = "'%"+value+"'";
		} else if (option == 'CT') {
			value = "'%"+value+"%'";
		}

		// console.log(column+filter+value);

		Meteor.call('queryDataDrillFilterBy',column,filter,value,project_address, function (err, res) {
			if(res.statusCode == 200){
				$("#filterModal").modal('hide');
				$('#filterModal #string').css('display', 'none');
				Session.set('data_project',res.data.rows);
			}
			if(err){
				alert("No se pudo filtrar vuelva a intentarlo!");
			}
		});
	},

	'click .closeFilter' (){
		$('#filterModal #numeric').css('display', 'none');
		$('#filterModal #string').css('display', 'none');
	}
});