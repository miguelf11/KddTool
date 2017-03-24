Template.DataSets.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('all_datasets');
	});
	$('.delete-dataset').tooltip();
});

Template.DataSets.helpers({
	datasets:()=> {
		return DataSets.find({});
	},

	isPrivate:(id)=> {
		var datasetType = DataSets.findOne({_id:id}).dataset_type;
		console.log(datasetType);
		if (datasetType == 'privado'){
			return true;
		}else{
			return false;
		}
	},

	isOwner:(id)=> {
		var owner = DataSets.findOne({_id:id}).author;
		if (Meteor.userId() == owner){
			return true;
		}else{
			return false;
		}
	},
});

Template.DataSets.events({
	'click .delete-dataset'() {
   		// console.log('delete dataset');
   		// console.log(this.hdfs_address);
   		// console.log(this._id);
   		var id_dataset = this._id;

   		Meteor.call('removeHdfsFolder', this.hdfs_address, function(err,res){
   			// console.log(res);
			if(res.statusCode == 200){
				Meteor.call('removeDataset',id_dataset, function(err2,res2){
					// console.log(res2);
		    		if(res2){
		    			alert("El conjunto ha sido eliminado exitosamente!!!");
		    		}else{
		    			alert("No se ha podido eliminar el conjunto!!!");
		    		}
		    		if(err2){
		    			alert("No se ha podido eliminar el conjunto!!!");
					}
				});	
			}else{
				alert("No se ha podido eliminar el conjunto!!!");
			}
			if(err){
				alert("No se ha podido eliminar el conjunto!!!");
			}
		});
  	},
});