Columns = new Mongo.Collection('columns');

Columns.allow({
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

ColumnsSchema = new SimpleSchema({
	datasetId:{
		type: String,
		label: 'DatasetId'
	},
	name:{
		type: String,
		label:'Name'
	},
	dataType:{
		type: String,
		label:'DataType'
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
	insertColumn: function(column){
		for (i in column){
			Columns.insert(column[i]);
		}
		return true;
	},
	updateColumn: function(id,column){
		return Columns.update(id,column);
	},
	removeColumn: function(id){
		return Columns.remove({ datasetId: id});
	},
});

Columns.attachSchema( ColumnsSchema );