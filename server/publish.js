Meteor.publish('all_datasets', function(){
	return DataSets.find({});
});

Meteor.publish('my_projects', function(){
	return Projects.find({author:this.userId});
});