Template.DataPrepairTable.events({
    'click .to-int' (event, template) {
      event.preventDefault();
      var column = $(event.currentTarget).attr("value");
      // var order = 'desc';
      // console.log(column);
      // console.log('ordenar de mayor a menor')
      $("<i class='fa fa-spinner fa-spin padding-left-half-plus sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
      var project_id = FlowRouter.getParam('id');
      var project_address = Projects.findOne({_id:project_id}).address;
      console.log(project_address);

      // Meteor.call('queryDataDrillOrderBy',column,order,project_address,function(err,res){
      //   // console.log(res.data.rows);
      //   if(res.statusCode == 200){
      //     Session.set('data_project',res.data.rows);
      //     $( ".sort-inserted" ).remove();
      //     $("<i class='fa fa-caret-down padding-left-half sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
      //   }else{
      //     alert("Error en formato de columna!");
      //   }
      //   if(err){
      //     alert("No se pudo ordenar el tipo de dato!");
      //   }
      // });

      console.log('cambiando el tipo de dato');
      $( ".sort-inserted" ).remove();

    },

});