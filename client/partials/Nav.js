// // $(document).ready(function () {
//     //Initialize tooltips
//     $('.nav-tabs > li a[title]').tooltip();
    
//     //Wizard
//     $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

//         var $target = $(e.target);
    
//         if ($target.parent().hasClass('disabled')) {
//             return false;
//         }
//     });

//     $(".next-step").click(function (e) {

//         var $active = $('.wizard .nav-tabs li.active');
//         $active.next().removeClass('disabled');
//         nextTab($active);
//         console.log('next');

//     });
//     $(".prev-step").click(function (e) {

//         var $active = $('.wizard .nav-tabs li.active');
//         prevTab($active);
//         console.log('prev');

//     });
// // });

// function nextTab(elem) {
//     $(elem).next().find('a[data-toggle="tab"]').click();
// }
// function prevTab(elem) {
//     $(elem).prev().find('a[data-toggle="tab"]').click();
// }

Template.Nav.onCreated(function() {
  // counter starts at 0
    console.log('creada nav');
    $('.nav-tabs > li a[title]').tooltip();
    $('.buttons-progress > a[title]').tooltip();
});

Template.Nav.events({
  'click .preparacion'(event, template) {
    event.preventDefault();
    console.log('a preparacion');
    var projectId = Session.get('projectId');
    FlowRouter.go('preparacion', { id: projectId});
  },
  'click .modelado'(event, template) {
    event.preventDefault();
    console.log('a modelado');
    var projectId = Session.get('projectId');
    FlowRouter.go('modelado', { id: projectId});
  },
  'click .visualizacion'(event, template) {
    event.preventDefault();
    console.log('a visualizacion');
    var projectId = Session.get('projectId');
    FlowRouter.go('visualizacion', { id: projectId});
  },
  'click .undo-btn'(event, template) {
    event.preventDefault();
    $(".backdrop").css('display','block');
    console.log('deshacer');

    var project_id = FlowRouter.getParam('id');
    console.log(project_id);

    var versions = Projects.findOne({_id:project_id}).prepair_versions;
    var actions = Projects.findOne({_id:project_id}).actions;


    if (versions.length > 1 && actions.length > 0){
      // versions.unshift(new_version_address);
      var version_to_remove = versions[0];
      var current_version = versions[1];
      console.log(versions);
      console.log(version_to_remove);
      console.log(current_version);
      versions.shift();
      actions.pop();
      console.log(versions);
      console.log(actions);
      Meteor.call('removeHdfsFolder',version_to_remove,function(err,res){
        console.log(res);
        if(res.statusCode == 200){
            console.log('eliminado de hdfs');
            // Session.set('data_project',res.data.rows);
            var old_version = Projects.update({_id:project_id},{$set:{current_version_address:current_version,prepair_versions:versions,actions:actions}}); 
            if (old_version){
              // FlowRouter.go('preparacion', { id: project_id});
              // $(".backdrop").css('display','none');
              Meteor.call('queryDataDrill',current_version, function(err,res){
                if(res.statusCode == 200){
                  // console.log(res.data.rows);
                  // console.log(res.data.columns);
                  // response = res.data.rows[0].apellido;
                  Session.set('data_project',res.data.rows);
                  // Session.set('data_keys',Object.keys(res.data.rows[0]));
                  Session.set('data_keys',res.data.columns);
                  Session.set('num_rows',res.data.rows.length);
                  Session.set('num_fields',res.data.columns.length);
                  Session.set('project_actions',actions);
                  $(".backdrop").css('display','none');
                }
                if(err){
                  alert("no data");
                }
              });  
            }else{
              $(".backdrop").css('display','none');
              alert('No se ha podido revertir ninguna acción!!!');
            }
        }else{
          $(".backdrop").css('display','none');
          alert('No se ha podido revertir ninguna acción!!!');
        }
        if(err){
          $(".backdrop").css('display','none');
          alert('No se ha podido revertir ninguna acción!!!');
        }
      });       
    }else{
      $(".backdrop").css('display','none');
      alert('No existe una versión previa para revertir!!!');
    }
  },
  'click .save-btn'(event, template) {
    event.preventDefault();
    console.log('guardar');
  },
});