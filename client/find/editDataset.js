Template.editDataset.onCreated(function(){
	var self = this;
	self.autorun(function () {
		self.subscribe('all_datasets');
	})
});

Template.editDataset.helpers({
	dataset:() => {
		var id = FlowRouter.getParam('id');

		return DataSets.findOne({_id: id});
	},
	isPrivate:(type) => {
		return type == 'privado';
	},
	isPublic:(type) => {
		return type == 'publico';
	}
});

Template.editDataset.events({
	'submit form'(event, template) {
		event.preventDefault();
		var name = template.find('#name').value;
		var description = template.find('#description').value;
		var id = template.find('form').id;
	    // var nRows = template.find('#numberRows').value;
	    // var nFields = template.find('#numberFields').value;
	    // var dirLocal = template.find('#localAddress').value;
	    var datasetType = template.find("input[name=datasetType]:checked").value;
	    var dataset ={$set: {name: name, desc:description,dataset_type:datasetType}};
	    	Meteor.call('updateDataset', id, dataset, function(err,res){
	    		if(res){
	    			// alert('Se modificaron los datos exitosamente!');
	    			FlowRouter.go('datasets');
	    		}
	    		if(err){
	    			alert("Ha habido un error con la actualización!");
	    		}
	    	});
	    },

	    'click .btn-back' (event, template) {
	    	event.preventDefault();
	    	FlowRouter.go('datasets');
	    },
	});