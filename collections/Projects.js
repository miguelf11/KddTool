Projects = new Mongo.Collection('projects');

Projects.allow({
	insert:function(userId,doc){
		return !!userId;
	},
	update:function(userId,doc){
		return !!userId;
	},
	remove:function(userId,doc){
		return !!userId;
	}
});

DataTypesSchema = new SimpleSchema({
	name:{
		type: String,
		label:'Name'
	},
	type:{
		type: String,
		label:'type'
	},
	active:{
		type: Boolean,
		label:'active'
	}
});

// ActionsSchema = new SimpleSchema({
// 	name:{
// 		type: String,
// 		label:'name'
// 	},
// 	createdAt:{
// 		type: Date,
// 		label: 'CreatedAt',
// 		autoValue: function(){
// 			return new Date()
// 		},
// 		// autoform:{
// 		// 	type: 'hidden'
// 		// }
// 	},
// });

ProjectsSchema = new SimpleSchema({
	name:{
		type: String,
		label:'Name'
	},
	desc:{
		type: String,
		label:'Description'
	},
	num_rows:{
		type: Number,
		label:'Number of Rows',
		optional: true
	},
	num_fields:{
		type: Number,
		label:'Number of Fields',
		optional: true
	},
	dataset:{
		type: String,
		label:'Dataset'
	},
	address:{
		type: String,
		label:'Address in hdfs',
		// optional: true
		// autoform:{
		// 	type:'hidden'
		// }
	},
	last_stage:{
		type: String,
		label: 'Last Stage in KDD Process'
	},
	author:{
		type: String,
		label:'Author',
		autoValue: function(){
			return this.userId
		},
		// autoform:{
		// 	type: 'hidden'
		// }
	},
	createdAt:{
		type: Date,
		label: 'CreatedAt',
		autoValue: function(){
			return new Date()
		},
		// autoform:{
		// 	type: 'hidden'
		// }
	},
	modifiedAt:{
		type: Date,
		label: 'ModifiedAt',
		optional: true
		// autoform:{
		// 	type: 'hidden'
		// }
	},
	actions:{
		type: [String],
		label: 'acciones de preparacion',
		optional: true
		// autoform:{
		// 	type: 'hidden'
		// }
	},
	data_types:{
		type: [DataTypesSchema],
		label: 'tipos de datos',
		optional: true
		// autoform:{
		// 	type: 'hidden'
		// }
	},
	prepair_versions:{
		type: [String],
		label: 'versiones del proyecto en preparacion',
		optional: true
		// autoform:{
		// 	type: 'hidden'
		// }
	},
	mining_view_address:{
		type: String,
		label: 'direccion de vista minable',
		optional: true
		// autoform:{
		// 	type: 'hidden'
		// }
	},
	current_version_address:{
		type: String,
		label: 'direccion de version actual',
		optional: true
		// autoform:{
		// 	type: 'hidden'
		// }
	},
});

Meteor.methods({
	// toogleMenuItem: function(id, currentState){
	// 	Recipes.update(id, {
	// 		$set: {
	// 			inMenu: !currentState,
	// 		}
	// 	});
	// },
	// deleteRecipe: function(id){
	// 	Recipes.remove(id);
	// },
	insertProject: function(project){
		return Projects.insert(project);
	},
	updateProject: function(id,project){
		return Projects.update({_id:id},{$set:{name:project.name,desc:project.desc}});
	},
	removeProject: function(id){
		// console.log('remove dataset');
		// console.log(id);
		return Projects.remove(id);
	},
	changeDataType: function(id,field,data_type){
		return Projects.update({_id:id,'data_types.name':field},{$set:{'data_types.$.type':data_type}});
	}
});

Projects.attachSchema( ProjectsSchema );