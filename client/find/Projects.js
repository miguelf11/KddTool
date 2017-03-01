Template.Projects.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('my_projects');
	});
	Session.set('projectId', null);
});

Template.Projects.onRendered(function(){

});

Template.Projects.helpers({
	projects:()=> {
		return Projects.find({});
	}
});

Template.Projects.events({
	'click .each-project-section'(){
		console.log(this._id);
		// var projectId = this._id;
		// console.log(projectId);
		Session.set('projectId', this._id);
		FlowRouter.go(this.last_stage, { id: this._id });
	}
});