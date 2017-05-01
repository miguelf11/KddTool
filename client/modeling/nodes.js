module.exports.nodes = 
	[
        {
            label: 'datos',
            type:"dataset",
            parametros : [
                {
                    name: 'dataset',
                    value : "hdfs:////user/vit/datasets/iris.csv",
                    type: 'url'
                }
            ],
            outputs: [
                {
                    label: 'dataset',
                }
            ]
        },
        {
            label: 'Arbol de decision',
            type : 'algoritmoCS',
            inputs: [
                {
                    id: 'dataset',
                    label: 'dataset',
                }
            ],
            parametros : [
                {
                    name: 'dataset',
                    value : 5,
                    type: 'number'
                },
                {
                    name: 'down',
                    value : 'prueba',
                    type: 'text'
                },
                {
                    name: 'cp',
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
                    label: 'output',                          
                }
                
            ]
        },
        {
            label: 'Split',
            type: 'algoritmoSS',
            inputs: [
                {
                    id: 'Input',
                    label: 'Input'
                }
            ],
            parametros: [
                {
                    name: 'testing',
                    value :0.6,
                    type: 'number'
                },
                {
                    name: 'training',
                    value : 0.4,
                    type: 'number'
                },
            ],
            outputs: [
                {
                    label: 'Testing'                          
                },
                {
                    label: 'Training'                         
                }
            ]
        },
        {
            label: 'Seleccionar',
            type : 'algoritmoCS',
            inputs: [
                {
                    id: 'dataset',
                    label: 'dataset',
                }
            ],
            parametros : [],
            properties: [],
            outputs: [
                {
                    label: 'output',                          
                }
                
            ]
        },
        {
            label: 'Comparar',
            type : 'algoritmoSS',
            inputs: [
                {
                    id: 'modelo',
                    label: 'modelo',
                },
                {
                    id: 'testing',
                    label: 'testing',
                }

            ],
            parametros : [],
            properties: [],
            outputs: [
                {
                    label: 'output',                          
                }
                
            ]
        },
        {
            label: 'Visualizar',
            type : 'algoritmoSS',
            inputs: [
                {
                    id: 'modelo',
                    label: 'modelo',
                }
            ],
            parametros : [],
            properties: [],
            outputs: [
                {
                    label: 'output',                          
                }
                
            ]
        }
    ] 

