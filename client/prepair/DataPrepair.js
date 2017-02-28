Template.DataPrepair.onCreated(function() {
	var self = this;
	self.autorun(function(){
		// to load one single project, instead all of the projects
		var id = FlowRouter.getParam('id');
		self.subscribe('singleProject', id);
	});

});

Template.DataPrepair.helpers({
	project:()=>{
		//select just the id of the project on the route
		var id = FlowRouter.getParam('id');
		console.log("helper: "+id);
		return Recipes.findOne({_id: id});
	}
});