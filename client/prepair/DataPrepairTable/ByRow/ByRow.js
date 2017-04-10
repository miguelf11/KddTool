Template.DataPrepairTable.events({
    'click #removeRows' (event, template) {
      var selected = '';
      $('input:checkbox[name=oneRow]:checked').each(function() {
          selected = $(this).attr('value') + "," + selected;
      });

      selected = selected.substring(0, selected.length - 1);

      console.log(selected);

    },

});