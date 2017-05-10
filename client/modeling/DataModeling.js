Template.DataModeling.onCreated(function(){
    var self = this;
    self.autorun(function(){
        var id = FlowRouter.getParam('id');
        console.log(id);
        self.subscribe('single_project',id);
        Session.set('projectId', id);   
    });
    toastr.options = { 
        "closeButton": false, 
        "debug": false, 
        "newestOnTop": false, 
        "progressBar": true, 
        "positionClass": "toast-bottom-right", 
        "preventDuplicates": false, 
        "onclick": null, 
        "showDuration": "300", 
        "hideDuration": "1000", 
        "timeOut": "5000", 
        "extendedTimeOut": "3000", 
        "showEasing": "swing", 
        "hideEasing": "linear", 
        "showMethod": "fadeIn", 
        "hideMethod": "fadeOut" 
    }
});

Template.DataModeling.onRendered(function(){
    // Call to nodes.js file, where the nodes are defined with its features and params
    var nodeFile = require('./nodes');
    var nodes = nodeFile.nodes;
    $('.each-tab').each(function(){
        $(this).removeClass('active');
        $(this).addClass('disabled');
    });
    $('#modeladoTab').addClass('active');
    $('#modeladoTab').removeClass('disabled');
    $('<div></div>')
        .addClass('nodeEditor')
        .appendTo('.workspace')
        .nodeEditor({
            nodes: nodes
            
        });
});

Template.DataModeling.helpers({
    project:()=> {
        var id = FlowRouter.getParam('id');
        return Projects.findOne({_id:id});
    }
});

Template.DataModeling.events({

    /* function to call R and execute function stack */
    'click .execute': function(e) {
        var numberOfParentChildren = $('.ui-droppable .dropped').length;
        var arrayOfParams = []
        var i = 0;
        $('.ui-droppable .dropped').each(function() {
            var data = $(this).data('node'); 
            arrayOfParams[i] = data;
            i++;
        });
        // Call of a server side method to execute the stack of node operations 
        Meteor.call('example10', arrayOfParams, function(error, result){
            if(error){
            } else {
                out = result;

            }
        });
    },

    /* Delete nodes */
    'click #drop-node': function(e) {
        var numberOfParentChildren = $(e.currentTarget).closest('.ui-droppable').children().length;
        var numberOfConnections = $(e.currentTarget).parent().children().length-2;
        var numberOfCurrentBox = $(e.currentTarget).parent().index()+1;

        /* Delete conected wires after deleted node */

        $(".ui-nodeEditor-wire").each(function() {
            wire = $( this ); 
            to = $( this ).data("to")[0];
            from = $( this ).data("from")[0];
            $(e.currentTarget).parent()
                .find('.ui-nodeEditor-nodeIO .ui-nodeEditor-nodeConnector')
                .each(function() {
                    if ( to == $(this)[0] || from == $(this)[0]) { 
                        wire.remove(); 
                    } 
            });
        });

        $(e.currentTarget).parent().fadeOut(300, function() {
            $(this).remove();
        });

        /* Remove text from attrs table */
        if ($('#Aparams').text() == $(e.currentTarget).parent().data('node').label || !$('#Aparams').text()) {
            $('#Aparams').text("");
            $('.new-elements').remove();
            $('.new-charac').remove();
        }

        /* Disable executor prevent R Serve calls */
        if ( $('.ui-nodeEditor-wire').length == 0) {
            $('.execute').attr("disabled", true);
        }
        e.stopPropagation();
    },

    /* Activate nodes' attributes table */
    'click .ui-nodeEditor-Node': function(e) {

        // defining global for accesing from the next event
        currentNode = $(e.currentTarget);
        var label = currentNode.data('node').label;
        var parametros = currentNode.data('node').parametros;
        var propiedades = currentNode.data('node').properties;
        var target = currentNode.data('node').target;
        var typeOfNode = currentNode.data('node').type;
        var labelOutput = currentNode.data('node').outputs[0].label;

        $('.new-elements').remove();
        $('.new-charac').remove();
        $('#Aparams').text(label);


        if(parametros[0]) {
            $(".attrs-table")
                .append("<tr class='new-elements'><td><form id='form' class= 'form' action='' onsubmit='event.preventDefault();'></form></td></tr>");
            for(var i in parametros) {   
                name = parametros[i].name;
                value = parametros[i].value;
                type = parametros[i].type;
                if ( Array.isArray(value) ) {
                    var select = "<select id="+name+" name="+name+"/>";
                    $(".form")
                        .append("<tr class='new-elements'><td><label for="+name+">"+name+"</label><br>"+select+"</td></tr>");

                    $.each(value, function(a,b) {
                        if (b.selected == 1){
                            $(".form #"+name).append($("<option/>").attr({
                                                    "value": b.name,
                                                    "selected": true
                                                }).text(b.name));
                        } else {
                            $(".form #"+name).append($("<option/>").attr("value", b.name).text(b.name));
                        }
                    });       
                } else {
                    if(type == "number") {
                        var input = "<input id="+type+" type="+type+" name="+type+" value="+value+" step='0.01'>" ;
                        $(".form")
                                .append("<tr class='new-elements'><td><label for="+name+">"+name+"</label><br>"+input+"</td></tr>");
                    }else{
                        if(type != "url") {
                            var input = "<input id="+type+" type="+type+" name="+type+" value="+value+">";
                            $(".form")
                                .append("<tr class='new-elements'><td><label for="+name+">"+name+"</label><br>"+input+"</td></tr>");
                        } 
                    }             
                }
            }
            if(type != "url"){
                $(".form").append("<br><input id='submit' type='submit' name='submit' class='btn btn-primary' value='Actualizar parámetros'>");
            }

        } else {
            $(".attrs-table")
                .append("<tr class='new-elements'><td>No hay parámetros para este elemento</td></tr>");
        }

        /* Features selector algoritmoCS and algoritmoML*/
        if (typeOfNode == 'algoritmoCS' || typeOfNode == 'algoritmoML') {
            var titleChar = "<tr class='new-charac'><td><h3>Características</h3><br></td></tr>";
            $(".attrs-table")
                .append("<tr class='new-charac'><td><form id='form-char' class= 'form' action='' onsubmit='event.preventDefault();'></form></td></tr>");
            $("#form-char")
                .append(titleChar);
            $("#form-char")
                .append("<tr class='new-charac checkboxlist'></tr>");
            $(".checkboxlist")
                .append("<tr><td>Seleccionar Todo:<input id='select_all' type='checkbox' name='checkboxlist'></td></tr>");
            $("#form-char")
                    .append("<br><input id='submit-char' type='submit' name='submit' class='btn btn-primary' value='Seleccionar Características'>");

            if (typeOfNode == 'algoritmoML') {
                var titleTarget = "<tr class='new-charac'><td><h3>Características Target</h3><br></td></tr>";
                $(".attrs-table")
                    .append("<tr class='new-charac'><td><form id='form-target' class= 'form' action='' onsubmit='event.preventDefault();'></form></td></tr>");
                $("#form-target")
                    .append(titleTarget);
                $("#form-target")
                    .append("<tr class='new-charac checkboxtarget'></tr>");
                $(".checkboxtarget")
                    .append("<tr><td>Seleccionar Todo:<input id='select_all_target' type='checkbox' name='checkboxtarget'></td></tr>");
                $("#form-target")
                    .append("<br><input id='submit-target' type='submit' name='submit' class='btn btn-primary' value='Seleccionar Objetivo'>");
            }

            // Call to server side method to execute drill query
            Meteor.call('queryPrueba',function(err,res) {
                if(res.statusCode == 200) {
                    columns = res.data.columns;
                    for (var i=0;i<columns.length;i++) {
                        var pos = jQuery.inArray(columns[i], propiedades);
                        if(pos == -1) {
                            $(".checkboxlist")
                                .append("<tr class='new-charac'><td>"+columns[i]+"<input type='checkbox' value='"+columns[i]+"' name='checkboxlist'></td></tr>");
                        }else{
                            $(".checkboxlist")
                                .append("<tr class='new-charac'><td>"+columns[i]+"<input type='checkbox' value='"+columns[i]+"' name='checkboxlist' checked='true'></td></tr>");  
                        }   
                        if (typeOfNode == 'algoritmoML') {
                            var posTarget = jQuery.inArray(columns[i], target);
                            if(posTarget == -1) {
                                    $(".checkboxtarget")
                                        .append("<tr class='new-charac'><td>"+columns[i]+"<input type='checkbox' value='"+columns[i]+"' name='checkboxtarget'></td></tr>");
                            }else{
                                $(".checkboxtarget")
                                    .append("<tr class='new-charac'><td>"+columns[i]+"<input type='checkbox' value='"+columns[i]+"' name='checkboxtarget' checked='true'></td></tr>");
                            } 
                        }    
                    }
                }else {
                    $('#maxValue').text('Error');
                }

                if(err) {
                    alert("Error en columna!");
                }
            });

            
            
            // /* Features marker when click node*/
            // if (propiedades.length == $(".new-charac input[name=checkboxlist]").length-1) {
            //     $(".new-charac input[name=checkboxlist]").each(function() {
            //         $(this).prop('checked', true);
            //     });
            // } else {
            //     for (var j in propiedades ) {
            //         $(".new-charac input[name=checkboxlist]").each(function() {
            //             if ($(this).val() == propiedades[j])
            //                 $(this).prop('checked', true);
            //         });
            //     }
            // }

            // /* target marker when click node*/
            // if (target.length == $(".new-charac input[name=checkboxtarget]").length-1) {
            //     $(".new-charac input[name=checkboxtarget]").each(function() {
            //         $(this).prop('checked', true);
            //     });
            // } else {
            //     for (var j in target ) {
            //         $(".new-charac input[name=checkboxtarget]").each(function() {
            //             if ($(this).val() == target[j])
            //                 $(this).prop('checked', true);
            //         });
            //     }
            // }
        }
        /* END Features selector algoritmoCS - algoritmoML*/

        /* Select all checkboxes */
        $('body').on('change' ,'#select_all',function() {
            var checkboxes = $(this).closest('form').find(':checkbox');
            if($(this).is(':checked')) {
                checkboxes.prop('checked', true);
            } else {
                checkboxes.prop('checked', false);
            }
        }); 

        /* Select all checkboxes */
        $('body').on('change' ,'#select_all_target',function() {
            var checkboxes = $(this).closest('form').find(':checkbox');
            if($(this).is(':checked')) {
                checkboxes.prop('checked', true);
            } else {
                checkboxes.prop('checked', false);
            }
        });

        
        /* jQuery form validator */
        $('#form').validate({
            submitHandler: function (form) {
                toastr["success"]("Parámetros actualizados correctamente!", "Correcto");
                form.submit();
            },
            invalidHandler: function(event, validator) {
                // 'this' refers to the form
                var errors = validator.numberOfInvalids();
                if (errors) {
                    var message = errors == 1
                        ? 'Parámetros no actualizados, existe un error en algun campo'
                        : 'Parámetros no actualizados, existen '+errors+' errores en el formulario'
                    toastr["error"](message, "Error");
                }
            },

            rules: {
                number: {
                    required: true,
                    minlength: 1,
                    number: true,
                },
                text: {
                    required: true,
                    minlength: 1,
                    lettersonly: true
                },
            },

            messages: {
                number: {
                    required: "Este campo es requerido",
                    minlength: "Introduzca al menos un número",
                    number: "El valor debe ser de tipo numérico",
                },
                text: {
                    required: "Este campo es requerido",
                    minlength: "Introduzca al menos un caracter",
                    lettersonly: "El valor debe ser de tipo NO numérico",
                },
            },
        });

        // Validate non-numeric characters only 
        jQuery.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) || /^[a-z]+$/i.test(value);
        }, "Sólo se aceptan caracteres no numéricos"); 
    },


    /* submit form function for params */
    'click #submit': function(e) {
        var i = 0 ;
        var parametros = currentNode.data('node').parametros;
        var node = currentNode.data('node');
        var json = JSON.stringify(node);
        var node = JSON.parse(json);
        $(".new-elements input, .new-elements select").each(function() {
            value = $( this ).val();
            name = $( this ).attr("name");
            if(value != "Actualizar parámetros"){
                if ($( this).attr('type') != 'text' && $( this).attr('type') != 'number') {
                    for (var j in node.parametros[i].value) {
                        node.parametros[i].value[j].selected = 0;
                        if ( node.parametros[i].value[j].name == value ) {
                            node.parametros[i].value[j].selected = 1;
                        }
                    }
                } else {
                    node.parametros[i].value = value;
                }
            }
            i++;
        });
        currentNode.data('node',node);
    }, 

    /* submit form function for params */
    'click #submit-char': function(e) {
        var node = currentNode.data('node');
        var json = JSON.stringify(node);
        var node = JSON.parse(json);
        node.properties = [];
        if ($(".new-charac input[name=checkboxlist]:checked").length > 0) {
            $(".new-charac input[name=checkboxlist]:checked").each(function() {
                if ($(this).attr('id') != 'select_all')
                    node.properties.push($(this).val());
            });            
            toastr["success"]("Características seleccionadas correctamente!", "Correcto");   
            currentNode.data('node',node);
        } else {
            toastr["warning"]("Al menos una característica debe ser seleccionada", "Alerta");   
        }
    },

     /* submit form function for params */
    'click #submit-target': function(e) {
        var node = currentNode.data('node');
        var json = JSON.stringify(node);
        var node = JSON.parse(json);
        node.target = [];
        if ($(".new-charac input[name=checkboxtarget]:checked").length > 0) {
            $(".new-charac input[name=checkboxtarget]:checked").each(function() {
                if ($(this).attr('id') != 'select_all_target')
                    node.target.push($(this).val());
            });            
            toastr["success"]("Objetivo seleccionados correctamente!", "Correcto");   
            currentNode.data('node',node);
        } else {
            toastr["warning"]("Al menos un objetivo debe ser seleccionado", "Alerta");   
        }
    },
});

// Luego de realizar cualquier tarea en esta etapa se debe modificar el stage 
// de la coleccion proyecto y se debe colocar 'modelado' para que al volver a 
// ingresar al proyecto lo redirija a la ultima etapa que realizó alguna tarea.