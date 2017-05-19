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
            type : 'algoritmoML',
            inputs: [
                {
                    id: 'dataset',
                    label: 'dataset',
                }
            ],
            parametros : [
                {
                    name: 'max.bins',
                    value : '32L',
                    type: 'text'
                },
                {
                    name: 'max.depth',
                    value : '5L',
                    type: 'text'
                },
                {
                    name: 'type',
                    value : [
                        {
                            name:"auto",
                            selected: 1,

                        },
                        {
                            name:"regression",
                            selected: 0,

                        },
                        {
                            name:"classification",
                            selected: 0,

                        },
                    ],
                    type:''
                }
            ],
            properties: [],
            target: [],
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
                    name: 'Testing',
                    value :0.6,
                    type: 'number'
                },
                {
                    name: 'Training',
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
        }
    ] 

