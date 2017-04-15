Template.DataPrepairTable.events({
    'click #removeRows' (event, template) {
      var selected = '';
      var count = 0;
      $('input:checkbox[name=oneRow]:checked').each(function() {
          selected = $(this).attr('value') + "," + selected;
          count++;
      });

      if (selected != ''){
        $("<i class='fa fa-circle-o-notch fa-spin sort-inserted' aria-hidden='true'></i>").insertAfter("#row_num");
        $( "body").unbind( "click" );
        selected = selected.substring(0, selected.length - 1);

        console.log(selected);

        var id = FlowRouter.getParam('id');
        var old_version_address = Projects.findOne({_id:id}).current_version_address;
        var new_version_address = Projects.findOne({_id:id}).address;
        new_version_address = new_version_address+"/version"+Date.now();

        Meteor.call('removeRows',new_version_address,old_version_address,selected, function(err,res){
          console.log(res);
          if(res.statusCode == 200){
            var versions = Projects.findOne({_id:id}).prepair_versions;
            console.log(versions);
            versions.unshift(new_version_address);
            console.log(versions);

            var actions = Projects.findOne({_id:id}).actions;
            if (count > 1){
              var new_action = 'Eliminados '+count+' registros.';
            }else{
              var new_action = 'Eliminado '+count+' registro.'
            }
            
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
                  Session.set('data_project',res.data.rows);
                  Session.set('data_keys',res.data.columns);
                  Session.set('num_rows',res.data.rows.length);
                  Session.set('num_fields',res.data.columns.length);
                  Session.set('project_actions',actions);
                  // alert("Se han eliminado los registros exitosamente!!!");
                  $(".fa-circle-o-notch").remove();
                  $( "body").bind( "click" );
                }
                if(err){
                  alert("No se han podido eliminar los registros!!!");
                }
              });
            }else{
              $( "body").bind( "click" );
              alert("No se han podido eliminar los registros!!!");
            }
            
            // $("#deleteModal").modal('hide');
          }else{
            $( "body").bind( "click" );
            alert("No se han podido eliminar los registros!!!");
          }
          if(err){
            alert("No se han podido eliminar el conjunto!!!");
          }
        });
      }else{
        // $( "body").bind( "click" );
        alert("Debes seleccionar los registros a eliminar!!!");
      }

    },

});