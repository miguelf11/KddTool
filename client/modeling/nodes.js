module.exports.nodes = 
	[
        {
            label: 'datos',
            type:"dataset",
            parametros : [
                {
                    name: 'dataset',
                    value : "/user/hadoop/datasets/iris1493583755334.csv",
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
            label: 'arbol de decision',
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
            label: 'split',
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
            label: 'seleccionar',
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
            label: 'comparar',
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
            label: 'visualizar',
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

