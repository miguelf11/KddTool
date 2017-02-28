<<<<<<< HEAD
Template.DataSets.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('all_datasets');
	});
});

Template.DataSets.helpers({
	datasets:()=> {
		return DataSets.find({});
=======
Template.DataSets.helpers({
	returnAll: function(){
		return DataSets.find({})
>>>>>>> fef343c5af9618481960c58e5a634de8d804c33a
	}
});