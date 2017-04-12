Template.DataPrepairTable.onCreated(function(){
	var self = this;
	self.autorun(function(){
        var id = FlowRouter.getParam('id');
        console.log(id);
		self.subscribe('single_project',id);
		Session.set('projectId', id);
		Session.set('data_project','');
		Session.set('data_keys',''); 	
	});

	var id = FlowRouter.getParam('id');
	var project_address = Projects.findOne({_id:id}).current_version_address;
	Meteor.call('queryDataDrill',project_address, function(err,res){
		if(res.statusCode == 200){
			// console.log(res.data.rows);
			// console.log(res.data.columns);
			// response = res.data.rows[0].apellido;
			Session.set('data_project',res.data.rows);
			// Session.set('data_keys',Object.keys(res.data.rows[0]));
			Session.set('data_keys',res.data.columns);
		}
		if(err){
			alert("no data");
		}
	});
});

Template.DataPrepairTable.helpers({
	project:()=> {
        var id = FlowRouter.getParam('id');
		return Projects.findOne({_id:id});
	},

	data_project:()=>{
		return Session.get('data_project');
	},

	tableHeader:()=> {
        return Session.get('data_keys');
	},

	rowContent:(document)=> {
	    var row = [];
	    var header = Session.get('data_keys');
	    for (var key in header) {
	    	if (key == 0){
	    		row.isFirst = true;
	    	}
	      	row.push(document[header[key]] || "");
	    }
	    return row;
	},

	isFirst:(index)=>{
		if(index == 0){
			return true;
		}else{
			return false;
		}
	},

  data_type_name:(column_name)=>{
    // console.log('type data: '+column_name);
    // console.log(column_name);
    var project_id = FlowRouter.getParam('id');
    var data_types = Projects.findOne({_id:project_id},{fields: {'data_types':1}});
    // console.log(data_types.data_types[0].name);
    data_types = data_types.data_types;
    var data_type_final = '';
    for (var i=0;i<data_types.length;i++){
      if(data_types[i].name == column_name && data_types[i].active == true){
        data_type_final = data_types[i].type;
        break;
      }
    }

    return data_type_final;
  },

  data_type_drill:(column_name)=>{
    // console.log('type data: '+column_name);
    // console.log(column_name);
    var project_id = FlowRouter.getParam('id');
    var data_types = Projects.findOne({_id:project_id},{fields: {'data_types':1}});
    // console.log(data_types.data_types[0].name);
    data_types = data_types.data_types;
    var data_type_final_true = '';
    var data_type_final = '';
    for (var i=0;i<data_types.length;i++){
      if(data_types[i].name == column_name && data_types[i].active == true){
        data_type_final = data_types[i].type;
        switch(data_type_final){
        	case 'String':
        		data_type_final_true = 'VARCHAR';
        		break;
        	case 'Entero':
        		data_type_final_true = 'BIGINT';
        		break;
        	case 'Decimal':
        		data_type_final_true = 'DOUBLE';
        		break;	
        }
        break;
      }
    }

    return data_type_final_true;
  },

  	typeOfModalNumber:(column_name)=>{
		var project_id = FlowRouter.getParam('id');
	    var data_types = Projects.findOne({_id:project_id},{fields: {'data_types':1}});
	    // console.log(data_types.data_types[0].name);
	    data_types = data_types.data_types;
	    var data_type_final = '';
	    for (var i=0;i<data_types.length;i++){
	      if(data_types[i].name == column_name && data_types[i].active == true){
	        data_type_final = data_types[i].type;
	        break;
	      }
	    }

	    if (data_type_final == 'Entero' || data_type_final == 'Decimal'){
	    	return true;
	    }else{
	    	return false;
	    } 
	},



});

Template.DataPrepairTable.events({


});

// function data_type_to_drill(column_name){
//     var project_id = FlowRouter.getParam('id');
//     var data_types = Projects.findOne({_id:project_id},{fields: {'data_types':1}});
//     // console.log(data_types.data_types[0].name);
//     data_types = data_types.data_types;
//     var data_type_final_true = '';
//     var data_type_final = '';
//     for (var i=0;i<data_types.length;i++){
//       if(data_types[i].name == column_name && data_types[i].active == true){
//         data_type_final = data_types[i].type;
//         switch(data_type_final){
//         	case 'Carácteres':
//         		data_type_final_true = 'VARCHAR';
//         		break;
//         	case 'Entero':
//         		data_type_final_true = 'BIGINT';
//         		break;
//         	case 'Decimal':
//         		data_type_final_true = 'DOUBLE';
//         		break;	
//         }
//         break;
//       }
//     }

//     return data_type_final_true;
// }