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
                    label: 'datos',
                }
            ]
        },
        {
            label: 'arbol de decision',
            type : 'algoritmoML',
            inputs: [
                {
                    id: 'dataset',
                    label: 'datos',
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
                    label: 'salida',                          
                }
                
            ]
        },
        {
            label: 'separar',
            type: 'algoritmoSS',
            inputs: [
                {
                    id: 'Input',
                    label: 'entrada'
                }
            ],
            parametros: [
                {
                    name: 'Prueba',
                    value :0.6,
                    type: 'number'
                },
                {
                    name: 'Entrenamiento',
                    value : 0.4,
                    type: 'number'
                },
            ],
            outputs: [
                {
                    label: 'prueba'                          
                },
                {
                    label: 'entrenamiento'                         
                }
            ]
        },
        {
            label: 'seleccionar',
            type : 'algoritmoCS',
            inputs: [
                {
                    id: 'dataset',
                    label: 'entrada',
                }
            ],
            parametros : [],
            properties: [],
            outputs: [
                {
                    label: 'salida',                          
                }
                
            ]
        },
        {
            label: 'evaluar',
            type : 'algoritmoSS',
            inputs: [
                {
                    
                    id: 'prueba',
                    label: 'prueba',
                },
                {
                    id: 'modelo',
                    label: 'modelo', 
                }

            ],
            parametros : [],
            properties: [],
            outputs: [
                {
                    label: 'salida',                          
                }
                
            ]
        },
        {
            label: 'visualizar',
            type : 'algoritmoSS',
            inputs: [
                {
                    id: 'entrada',
                    label: 'entrada',
                }
            ],
            parametros : [],
            properties: [],
        }
    ] 

