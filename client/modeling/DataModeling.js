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
                    inputs: [
                        {
                            id: 'dataset',
                            label: 'dataset',
                            attrs: ["atributo1", "atributo2", "atributo3"]
                        }
                    ],
                    outputs: [
                        {
                            label: 'Rtest2',
                            fn: function(nodeState) {
                                var d = $.Deferred();
                            
                                var out;
                                ruta = "hdfs:////user/hadoop/datasets/iris1491518914745.csv";
                                Meteor.call('example3',ruta,function(error, result){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        console.log(result);
                                        out = result;
                                        console.log("json.stringify,  "+JSON.stringify(result));
                                        console.log("salidaaaaaaaaaaaa,  "+result);
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
	'click #preparedData'() {
		//$('#workspace').removeClass('col-md-10');
		//$('#workspace').addClass('col-md-7');
        //$('#attrs').css('display', 'block');
    },
    'click #closeAttrs': function(e) {
        // console.log($(e.currentTarget).parent());
        //$(this).parent(".ui-nodeEditor-Node").fadeOut(300);
        $(e.currentTarget).parent().fadeOut(300);
        if ($('#Aparams').text() == $(e.currentTarget).parent().data('node').label || !$('#Aparams').text()) {
            $('#Aparams').text("");
            $('.new-elements').remove();
        }
        e.stopPropagation();
    },

    'click .ui-nodeEditor-Node': function(e) {
        var currentNode = $(e.currentTarget);
        var label = currentNode.data('node').label;
        var id = currentNode.data('node').id;
        //var attrsInput = $(e.currentTarget).data('node').inputs[0].attrs;
        var labelOutput = currentNode.data('node').outputs[0].label;
        console.log("label: "+label);
        console.log("labelOutput: "+labelOutput);
        $('.new-elements').remove();
        $('#Aparams').text(label);
        $(".attrs-table").append("<tr class='new-elements'><td>"+labelOutput+"</td></tr>");
        // console.log("Cable "+Object.keys(currentNode.closest('.ui-nodeEditor-wire')));
        // console.log("Cable ###### "+currentNode.closest('.ui-nodeEditor-wire'));
        // console.log("Cable length "+currentNode.closest('.ui-nodeEditor-wire').length);
        // console.log("Cable prevObject obj "+currentNode.closest('.ui-nodeEditor-wire').prevObject);
        // console.log("Cable prevObject  "+Object.keys(currentNode.closest('.ui-nodeEditor-wire').prevObject));
        // console.log("Cable obj"+currentNode.closest('.ui-nodeEditor-wire').context);
        // console.log("Cable "+Object.keys(currentNode.closest('.ui-nodeEditor-wire').context));
        // currentNode.closest('.ui-nodeEditor-wire').hide();
    },
    /*'click #closeAttrs'() {
		$('#attrs').css('display', 'none');
		$('#workspace').removeClass('col-md-7');
		$('#workspace').addClass('col-md-10');
	}*/


});

// Luego de realizar cualquier tarea en esta etapa se debe modificar el stage 
// de la coleccion projecto y se debe colocar 'modelado' para que al volver a 
// ingresar al proyecto lo redirija a la ultima etapa que realizó alguna tarea.