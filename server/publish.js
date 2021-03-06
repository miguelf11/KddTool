Meteor.publish('all_datasets', function(){
	return DataSets.find({
		$or:[
			{author:this.userId},
			{dataset_type:'publico'}
		]
	});
});

Meteor.publish('my_projects', function(){
	return Projects.find({author:this.userId},
		{sort:{createdAt:-1}});
});

Meteor.publish('single_project', function(id){
	return Projects.find({_id:id});
});

Meteor.publish('all_columns', () => {
	return Columns.find({});
});

Meteor.publish('all_users', () => {
	return Meteor.users.find({}, { fields: {emails:1 }});
});