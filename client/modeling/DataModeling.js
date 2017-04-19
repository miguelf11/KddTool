Template.DataModeling.onCreated(function(){
    var self = this;
    self.autorun(function(){
        var id = FlowRouter.getParam('id');
        console.log(id);
        self.subscribe('single_project',id);
        Session.set('projectId', id);   
    });

});

Template.DataModeling.onRendered(function(){
    $('.each-tab').each(function(){
        $(this).removeClass('active');
        $(this).addClass('disabled');
    });
    $('#modeladoTab').addClass('active');
    $('#modeladoTab').removeClass('disabled');
    /*********************************/
    //console.log("Starting basic example for jquery.ui.nodeEditor.js");
    $('<div></div>')
        .addClass('nodeEditor')
        .appendTo('.workspace')
        .nodeEditor({
            nodes: [
                {
                    label: 'datos',
                    id: 'id de datos',
                    parametros : [
                        {
                            key: 'dataset',
                            value : "hdfs:////user/vit/datasets/iris.csv",
                            type: 'url'
                        }
                    ],
                    outputs: [
                        {
                            label: 'dataset',
                            fn: function(nodeState) {
                                console.log(JSON.stringify(nodeState));
                                var d = $.Deferred();
                                d.resolve(5);
                                return d.promise();
                            }
                        }
                    ]
                },
                {
                    label: 'Arbol de decision',
                    id: 'id arbol',
                    inputs: [
                        {
                            id: 'dataset',
                            label: 'dataset',
                        }
                    ],
                    parametros : [
                        {
                            key: 'dataset',
                            value : 5,
                            type: 'number'
                        },
                        {
                            key: 'down',
                            value : 'prueba',
                            type: 'text'
                        },
                        {
                            key: 'cp',
                            value : [
                                {
                                    name:"opcion 1",
                                    selected: 0,

                                },
                                {
                                    name:"opcion 2",
                                    selected: 0,

                                },
                                {
                                    name:"opcion 3",
                                    selected: 1,

                                },
                            ],
                            type:''
                        }
                    ],
                    outputs: [
                        {
                            label: 'Rtest2',
                            fn: function(nodeState) {
                                var d = $.Deferred();
                                inputs = nodeState.inputs || {};
                                var out;
                                d.resolve(out);
                                return d.promise();
                            }                             
                        }
                        
                    ]
                },
                {
                    label: 'Split',
                    id: 'id R',
                    inputs: [
                        {
                            id: 'B',
                            label: 'B'
                        }
                    ],
                    parametros: [
                        {
                            key: 'testing',
                            value :0.6,
                            type: 'number'
                        },
                        {
                            key: 'training',
                            value : 0.4,
                            type: 'number'
                        },
                    ],
                    outputs: [
                        {
                            label: 'Testing',
                            fn: function(nodeState) {
                                var d = $.Deferred();
                                inputs = nodeState.inputs || {};
                                inputs.A = inputs.A || 0;
                                inputs.B = inputs.B || 0;
                                var out;
                                d.resolve(out);
                                return d.promise();
                            }                             
                        },
                        {
                            label: 'Training',
                            fn: function(nodeState) {
                                var d = $.Deferred();
                                inputs = nodeState.inputs || {};
                                inputs.A = inputs.A || 0;
                                inputs.B = inputs.B || 0;
                                var out;
                                d.resolve(out);
                                return d.promise();
                            }                             
                        }
                    ]
                }
            ]
        });
    /**********************************/
});

Template.DataModeling.helpers({
    project:()=> {
        var id = FlowRouter.getParam('id');
        return Projects.findOne({_id:id});
    }
});

Template.DataModeling.events({
    'click .execute': function(e) {
        var numberOfParentChildren = $('.ui-droppable .dropped').length;
        var arrayLindo = []
        console.log(numberOfParentChildren);
        var i = 0;
        $('.ui-droppable .dropped').each(function() {
            var data = $(this).data('node'); 
            arrayLindo[i] = data;
            console.log(JSON.stringify(arrayLindo));
            i++;
        });
        console.log(arrayLindo);
        // console.log(arrayLindo);
        // Meteor.call('example10', arrayLindo, function(error, result){
        //     if(error){
        //         console.log(error);
        //     } else {
        //         // console.log(result);
        //         //out = JSON.stringify(result);
        //         out = result;
        //         console.log("salidaaaaaaaaaaaa,  "+JSON.stringify(result));
        //         console.log("salidaaaaaaaaaaaa,  "+result);
        //     }
        // });
    },

    'click #drop-node': function(e) {
        // $(e.currentTarget).parent().nextAll('.ui-nodeEditor-wire').remove();
        var numberOfParentChildren = $(e.currentTarget).closest('.ui-droppable').children().length;
        var numberOfConnections = $(e.currentTarget).parent().children().length-2;
        var numberOfCurrentBox = $(e.currentTarget).parent().index()+1;
        var cont = 0;
        console.log("# Parent children: "+numberOfParentChildren);
        console.log("# of my connections: "+numberOfConnections);
        console.log("current position Box: "+numberOfCurrentBox);
        console.log("############################");
        while (cont != numberOfConnections) {
            console.log("DENTRO DEL WHILE");
            $(e.currentTarget).parent().nextAll('.ui-nodeEditor-wire:first').remove();
            cont++; 
        }
        $(e.currentTarget).parent().fadeOut(300, function() {
            $(this).remove();
        });
        //console.log("NextAll: "+Object.keys($(e.currentTarget).nextAll('.ui-nodeEditor-wire')));
        if ($('#Aparams').text() == $(e.currentTarget).parent().data('node').label || !$('#Aparams').text()) {
            $('#Aparams').text("");
            $('.new-elements').remove();
        }
        e.stopPropagation();
    },

    'click .ui-nodeEditor-Node': function(e) {

        // defining global for accesing from the next event
        currentNode = $(e.currentTarget);
        var label = currentNode.data('node').label;
        var id = currentNode.data('node').id;

        var parametros = currentNode.data('node').parametros;
        var labelOutput = currentNode.data('node').outputs[0].label;


        //var attrsInput = $(e.currentTarget).data('node').inputs[0].attrs;
        $('.new-elements').remove();
        $('#Aparams').text(label);



        if(parametros[0]) {
            $(".attrs-table")
                .append("<tr class='new-elements'><td><form class= 'form' action='' onsubmit='event.preventDefault();'></form></td></tr>");
            for(var i in parametros) {   
                name = parametros[i].key;
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
                    if(type == "number"){
                        var input = "<input id="+type+" type="+type+" name="+type+" value="+value+" step='0.01'>" ;
                    }else{
                        var input = "<input id="+type+" type="+type+" name="+type+" value="+value+">";
                    }             
                    $(".form")
                        .append("<tr class='new-elements'><td><label for="+name+">"+name+"</label><br>"+input+"</td></tr>");
                }
            }
            $(".form").append("<br><input id='submit' type='submit' class='btn btn-primary' value='Actualizar parámetros'>");
        } else {
            $(".attrs-table")
                .append("<tr class='new-elements'><td>No hay parámetros para este elemento</td></tr>");

        }
    },

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
                if ($( this).attr('type') != 'text') {
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
        console.log(JSON.stringify(node));
        currentNode.data('node',node);
    },

});

// $(document).ready(function() {
//     $('.form').validate({
//         rules: {
//             number: {
//                 required: true,
//                 minlength: 1,
//                 number: true,
//             },
//             text: {
//                 required: true,
//                 minlength: 1,
//                 text: true,
//             },
//         },
//         messages: {
//             number: {
//                 required: "Este campo es requerido",
//                 minlength: "Introduzca al menos un número",
//                 number: "El valor debe ser de tipo numérico",
//             },
//             text: {
//                 required: "Este campo es requerido",
//                 minlength: "Introduzca al menos un caracter",
//                 text: "El valor debe ser de tipo texto",
//             },
//         }
//     });
// });
// Luego de realizar cualquier tarea en esta etapa se debe modificar el stage 
// de la coleccion projecto y se debe colocar 'modelado' para que al volver a 
// ingresar al proyecto lo redirija a la ultima etapa que realizó alguna tarea.