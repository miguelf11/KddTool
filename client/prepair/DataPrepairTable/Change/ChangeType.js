Template.DataPrepairTable.events({
    'click .change-type' (event, template) {
      event.preventDefault();
      var column = $(event.currentTarget).attr("value");
      var data_type_new = $(event.currentTarget).attr("rel");
      // var id_column = $(event.currentTarget).attr("data-name");
      // console.log(id_column);
      // var order = 'desc';
      console.log(data_type_new);
      // console.log('ordenar de mayor a menor')
      $("<i class='fa fa-spinner fa-spin padding-left-half-plus sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
      var project_id = FlowRouter.getParam('id');
      var project_address = Projects.findOne({_id:project_id}).address;
      console.log(project_address);

      Meteor.call('changeDataType',project_id,column,data_type_new,function(err,res){
        console.log(res);
        if(res){
            console.log('cambiado tipo de dato');
            // Session.set('data_project',res.data.rows);
            $( ".sort-inserted" ).remove();
            $('#'+column).click();
        }else{
          alert("No se ha podido cambiar el tipo de dato!");
        }
        if(err){
          alert("No se ha podido cambiar el tipo de dato!");
        }
      });

      // console.log('cambiando el tipo de dato');
      // $( ".sort-inserted" ).remove();

    },

});