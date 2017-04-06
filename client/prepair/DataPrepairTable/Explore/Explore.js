Template.DataPrepairTable.events({
      'show.bs.modal #exploreModal' (event) {
            // console.log('show modal');

      },
      'click .explore' (event, template) {
            event.preventDefault();
            var column = $(event.currentTarget).attr("value");
            console.log(column);
            var data_type = $(event.currentTarget).attr("data-type");
            console.log(data_type);
            var id = FlowRouter.getParam('id');
            var project_address = Projects.findOne({_id:id}).address;
            $('.modal-title').text(column);
            // var order = 'desc';
            // console.log(column);
            // console.log('ordenar de mayor a menor')
            // $("<i class='fa fa-spinner fa-spin padding-left-half-plus sort-inserted' aria-hidden='true'></i>").insertAfter("#"+column+" > label");
            // var project_id = FlowRouter.getParam('id');
            // var project_address = Projects.findOne({_id:project_id}).address;
            // console.log(project_address);

            // var data_type = data_type_drill(column_name);



            Meteor.call('queryDataDrillMaxValue',column,data_type,project_address,function(err,res){
              // console.log(res.data.rows);
              if(res.statusCode == 200){
                console.log(res.data.rows[0].EXPR$0);
                $('#maxValue').text(res.data.rows[0].EXPR$0);
              }else{
                $('#maxValue').text('Error');
              }
              if(err){
                alert("Error en columna!");
              }
            });

            Meteor.call('queryDataDrillMinValue',column,data_type,project_address,function(err,res){
              // console.log(res.data.rows);
              if(res.statusCode == 200){
                console.log(res.data.rows[0].EXPR$0);
                $('#minValue').text(res.data.rows[0].EXPR$0);
              }else{
                $('#minValue').text('Error');
              }
              if(err){
                alert("Error en columna!");
              }
            });

            Meteor.call('queryDataDrillAVGValue',column,data_type,project_address,function(err,res){
              // console.log(res.data.rows);
              if(res.statusCode == 200){
                console.log(res.data.rows[0].EXPR$0);
                $('#avgValue').text(res.data.rows[0].EXPR$0);
              }else{
                $('#avgValue').text('Error');
              }
              if(err){
                alert("Error en columna!");
              }
            });

            // console.log('cambiando el tipo de dato');
            // $( ".sort-inserted" ).remove();

      },

});