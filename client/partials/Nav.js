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
});

Template.Nav.events({
  'click .preparacion'(event, template) {
    event.preventDefault();
    console.log('a preparacion');
    FlowRouter.go('preparacion');
  },
  'click .modelado'(event, template) {
    event.preventDefault();
    console.log('a modelado');
    FlowRouter.go('modelado');
  },
  'click .visualizacion'(event, template) {
    event.preventDefault();
    console.log('a visualizacion');
    FlowRouter.go('visualizacion');
  },
});