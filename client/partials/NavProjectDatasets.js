Template.NavProjectDatasets.onCreated(function() {
    console.log('creada nav dave');
});

Template.NavProjectDatasets.events({
  'click #projectsTab'(event, template) {
    event.preventDefault();
    console.log('to projects');
    FlowRouter.go('proyectos');
  },

  'click #datasetsTab'(event, template) {
    event.preventDefault();
    console.log('to datasets');
    FlowRouter.go('datasets');
  },
  
});