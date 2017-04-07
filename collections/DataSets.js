DataSets = new Mongo.Collection('datasets');

DataSets.allow({
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

DataSetsSchema = new SimpleSchema({
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
		label:'NumberRows'
	},
	num_fields:{
		type: Number,
		label:'NumberFields'
	},
	local_address:{
		type: String,
		label:'LocalAddress'
		// autoform:{
		// 	type:'hidden'
		// }
	},
	hdfs_address:{
		type: String,
		label:'HDFSAddress'
		// autoform:{
		// 	type:'hidden'
		// }
	},
	dataset_type:{
		type: String,
		label:'Tipo de dataset'
		// autoform:{
		// 	type:'hidden'
		// }
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
	}
});

Meteor.methods({
	insertDataset: function(doc){
		DataSets.insert(doc);
	}
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
	insertDataset: function(dataset){
		return DataSets.insert(dataset);
	},
	removeDataset: function(id){
		// console.log('remove dataset');
		// console.log(id);
		return DataSets.remove(id);
	},
});


DataSets.attachSchema( DataSetsSchema );