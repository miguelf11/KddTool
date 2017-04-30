module.exports.nodes = 
	[
        {
            label: 'datos',
            id: 'id de datos',
            type:"dataset",
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
            type : 'algoritmoCS',
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
            properties: [],
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
            type: 'algoritmoSS',
            inputs: [
                {
                    id: 'Input',
                    label: 'Input'
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
                        var out;
                        d.resolve(out);
                        return d.promise();
                    }                            
                }
            ]
        }
    ] 

