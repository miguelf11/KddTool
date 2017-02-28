Meteor.publish('all_datasets', function(){
	return DataSets.find({});
});

Meteor.publish('my_projects', function(){
	return Projects.find({author:this.userId});
});

// to load one single Project, instead all of the Projects
Meteor.publish('singleProject', function(id){
	check(id, String);
	return Projects.find({_id: id});
});