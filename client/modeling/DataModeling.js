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
                            key: 'deep',
                            value : 5
                        },
                        {
                            key: 'down',
                            value : 7
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
                            ] 
                        }
                    ],
                    outputs: [
                        {
                            label: 'dataset',
                            fn: function(inputs, properties) {
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
                    // parametros: [],
                    inputs: [
                        {
                            id: 'dataset',
                            label: 'dataset',
                        }
                    ],
                    parametros : [
                        {
                            key: 'deep',
                            value : 5
                        },
                        {
                            key: 'down',
                            value : 7
                        },
                        {
                            key: 'luz',
                            value : 12
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
                            ] 
                        }
                    ],
                    outputs: [
                        {
                            label: 'Rtest2',
                            fn: function(nodeState) {
                                console.log("NODESTATE ES: "+Object.keys(nodeState));
                                var d = $.Deferred();
                            
                                var out;
                                ruta = "hdfs:////user/hadoop/datasets/iris1491518914745.csv";
                                Meteor.call('example3',ruta,function(error, result){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        // console.log(result);
                                        out = result;
                                        // console.log("json.stringify,  "+JSON.stringify(result));
                                        // console.log("salidaaaaaaaaaaaa,  "+result);
                                    }
                                });
                                d.resolve(out);
                                console.groupEnd();
                                return d.promise();
                            }                              
                        }
                        
                    ]
                },
                {
                    label: 'R',
                    id: 'id R',
                    inputs: [
                        {
                            id: 'A',
                            label: 'A'
                        },
                        {
                            id: 'B',
                            label: 'B'
                        }
                    ],
                    parametros: [],
                    outputs: [
                        {
                            label: 'Rtest',
                           	fn: function(nodeState) {
                                console.group('Sum fn()');
                                //console.log(nodeState);
                                var d = $.Deferred();
                                if (typeof nodeState === 'undefined') {
                                    console.error('Node state undefined de RRRRRRR');
                                    d.reject();
                                    console.groupEnd();
                                    return d.promise();
                                }
                                
                                inputs = nodeState.inputs || {};
                                inputs.A = inputs.A || 0;
                                inputs.B = inputs.B || 0;
                                var out;

							    Meteor.call('example1', inputs.A, inputs.B, function(error, result){
							       	if(error){
							            // console.log(error);
							        } else {
							            // console.log(result);
							            //out = JSON.stringify(result);
							            out = result;
							            //console.log("salidaaaaaaaaaaaa,  "+JSON.stringify(result));
							            // console.log("salidaaaaaaaaaaaa,  "+result);
							        }
							    });

                                //console.log('Sum fn() A:' + inputs.A + '  B:' + inputs.B);
                                //var out = parseInt(inputs.A + inputs.B);
                                console.log('    -->  ' + out);
                                d.resolve(out);
                                console.groupEnd();
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
	},

	algorithms:()=> {
        var algorithms = [
        	{name: "algoritmo 1", desc: "desc de algoritmo 1"}, 
        	{name: "algoritmo 2", desc: "desc de algoritmo 2"}, 
        	{name:"algoritmo 3", desc: "desc de algoritmo 3"}, 
        	{name:"algoritmo 4", desc: "desc de algoritmo 4"}
        ];
		return algorithms;
	},

	dataInfo:()=> {
        var dataInfo = 
        	{name: "Datos preparados", desc: "desc de data preparada"};
		return dataInfo;
	}
});

Template.DataModeling.events({
	'click #drop-node': function(e) {
        // $(e.currentTarget).parent().nextAll('.ui-nodeEditor-wire').remove();
        var numberOfParentChildren = $(e.currentTarget).closest('.ui-droppable').children().length;
        var numberOfConnections = $(e.currentTarget).parent().children().length-2;
        var numberOfCurrentBox = $(e.currentTarget).parent().index()+1;
        var cont = 0;
        while (cont != numberOfConnections) {
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


        $(".attrs-table")
            .append("<tr class='new-elements'><td><form class= 'form' action='' onsubmit='event.preventDefault();'></form></td></tr>");

        if(parametros[0]) {
            for(var i in parametros) {   
                name = parametros[i].key;
                value = parametros[i].value;
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
                    var input = "<input type='text' name="+name+" value="+value+">";                    
                    $(".form")
                        .append("<tr class='new-elements'><td><label for="+name+">"+name+"</label><br>"+input+"</td></tr>");
                }
            }
            $(".form").append("<br><input type='submit' id='submit' value='Actualizar parámetros'>");
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

            i = i + 1;
        });
        currentNode.data('node',node);
        console.log("currentNode[0] : "+Object.keys(currentNode[0]));
        console.log(currentNode.data());
        console.log(currentNode.outputs);
    },

});

// Luego de realizar cualquier tarea en esta etapa se debe modificar el stage 
// de la coleccion projecto y se debe colocar 'modelado' para que al volver a 
// ingresar al proyecto lo redirija a la ultima etapa que realizó alguna tarea.