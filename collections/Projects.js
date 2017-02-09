Projects = new Mongo.Collection('projects');

Projects.allow({
	insert:function(userId,doc){
		return !!userId;
	},
	update:function(userId,doc){
		return !!userId;
	}
});

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
		label:'Number of Rows'
	},
	num_fields:{
		type: Number,
		label:'Number of Fields'
	},
	dataset:{
		type: String,
		label:'Dataset'
	},
	address:{
		type: String,
		label:'Address in hdfs'
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
		Projects.insert(project);
	},
});

Projects.attachSchema( ProjectsSchema );