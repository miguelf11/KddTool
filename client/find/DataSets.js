Template.DataSets.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('all_datasets');
	});
});

Template.DataSets.helpers({
	datasets:()=> {
		return DataSets.find({});
	}
});