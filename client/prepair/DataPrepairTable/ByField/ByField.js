Template.DataPrepairTable.events({
    'click .remove-field' (event, template) {
      var column = $(event.currentTarget).attr("value");
      console.log('Eliminar campo: '+column);
      console.log('Campos del proyecto:');
      console.log(Session.get('data_keys'));

      $(".backdrop").css('display','block');

      var fields = Session.get('data_keys');
      var fields_final = '';

      for (var key in fields) {
        if (fields[key] != column){
          fields_final = fields_final+" "+fields[key]+",";
        }
      }

      fields_final = fields_final.substring(0, fields_final.length - 1);

      console.log(fields_final);

      var id = FlowRouter.getParam('id');
      var old_version_address = Projects.findOne({_id:id}).current_version_address;
      var new_version_address = Projects.findOne({_id:id}).address;
      new_version_address = new_version_address+"/version"+Date.now();
      var actions = Projects.findOne({_id:id}).actions;
      var new_action = 'Campo '+column+' eliminado.';

      if(actions){
        actions.push(new_action);  
      }else{
        var actions = [];
        actions[0] = new_action;
      }
      
      Meteor.call('removeField',new_version_address,old_version_address,fields_final, function(err,res){
        console.log(res);
        if(res.statusCode == 200){
          var versions = Projects.findOne({_id:id}).prepair_versions;
          console.log(versions);
          versions.unshift(new_version_address);
          console.log(versions);
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
                $(".backdrop").css('display','none');
                // alert("Se han eliminado los registros exitosamente!!!");
                // $(".fa-spinner").remove();
              }
              if(err){
                $(".backdrop").css('display','none');
                alert("No se ha podido eliminar el campo!!!");
              }
            });
          }else{
            $(".backdrop").css('display','none');
            alert("No se ha podido eliminar el campo!!!");
          }
          
          // $("#deleteModal").modal('hide');
        }else{
          $(".backdrop").css('display','none');
          alert("No se ha podido eliminar el campo!!!");
        }
        if(err){
          $(".backdrop").css('display','none');
          alert("No se ha podido eliminar el campo!!!");
        }
      });

    },

});