Template.DataPrepairTable.events({
	'click .order-up' (event, template) {
    	event.preventDefault();
    	var column = $(event.currentTarget).attr("value");
      var data_type_final = $(event.currentTarget).attr("rel");
    	var order = 'asc';
    	// console.log(column);
   		// console.log('ordenar de menor a mayor');
      $("<i class='fa fa-circle-o-notch fa-spin sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
   		$( "body").unbind( "click" );
      var project_id = FlowRouter.getParam('id');
   		var project_address = Projects.findOne({_id:project_id}).current_version_address;

      var data_type_final_true = '';
      switch(data_type_final){
        case 'Caractéres':
          data_type_final_true = 'VARCHAR';
          break;
        case 'Entero':
          data_type_final_true = 'BIGINT';
          break;
        case 'Decimal':
          data_type_final_true = 'DOUBLE';
          break;  
        default:
          data_type_final_true = 'VARCHAR';
          break;
      }

      console.log(data_type_final_true);

   		Meteor.call('queryDataDrillOrderBy',column,data_type_final_true,order,project_address,function(err,res){
   			// console.log(res.data.rows);
    		if(res.statusCode == 200){
    			Session.set('data_project',res.data.rows);
    			$(".sort-inserted").remove();
          $(".fa-spinner").remove();
   				$("<i class='fa fa-caret-up padding-left-half sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
          $( "body").bind( "click" );
    		}else{
          alert("Error en tipo de dato de columna!");
          $( ".sort-inserted" ).remove();
          $( "body").bind( "click" );
        }
    		if(err){
    			alert("No se pudo ordenar el tipo de dato!");
    		}
    	});
  	},
  	'click .order-down' (event, template) {
    	event.preventDefault();
    	var column = $(event.currentTarget).attr("value");
      var data_type_final = $(event.currentTarget).attr("rel");
    	var order = 'desc';
    	// console.log(column);
   		// console.log('ordenar de mayor a menor')
      $("<i class='fa fa-circle-o-notch fa-spin padding-left-half-plus sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
      $( "body").unbind( "click" );
   		var project_id = FlowRouter.getParam('id');
   		var project_address = Projects.findOne({_id:project_id}).current_version_address;
   		console.log(project_address);

      var data_type_final_true = '';
      switch(data_type_final){
        case 'Caractéres':
          data_type_final_true = 'VARCHAR';
          break;
        case 'Entero':
          data_type_final_true = 'BIGINT';
          break;
        case 'Decimal':
          data_type_final_true = 'DOUBLE';
          break;  
        default:
          data_type_final_true = 'VARCHAR';
          break;
      }

      console.log(data_type_final_true);

   		Meteor.call('queryDataDrillOrderBy',column,data_type_final_true,order,project_address,function(err,res){
   			// console.log(res.data.rows);
    		if(res.statusCode == 200){
    			Session.set('data_project',res.data.rows);
    			$( ".sort-inserted" ).remove();
   				$("<i class='fa fa-caret-down padding-left-half sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
          $( "body").bind( "click" );
    		}else{
          alert("Error en tipo de dato de columna!");
          $( ".sort-inserted" ).remove();
          $( "body").bind( "click" );
        }
    		if(err){
    			alert("No se pudo ordenar el tipo de dato!");
    		}
    	});
  	},

});