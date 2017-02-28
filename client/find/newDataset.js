Template.newDataset.helpers({
	completeName: function() {
		if(Meteor.user()){
			return (Meteor.user().profile.name+' '+Meteor.user().profile.lastName);
		}
	}
});

Template.newDataset.events({
	'submit form'(event, template) {
	    event.preventDefault();
	    var name = template.find('#name').value;
	    var description = template.find('#description').value;
	    // var nRows = template.find('#numberRows').value;
	    // var nFields = template.find('#numberFields').value;
	    var dirLocal = template.find('#localAddress').value;
	    var nameFileArr = dirLocal.split('/');
	    var nameFile = nameFileArr[nameFileArr.length - 1];
	    var ext = nameFile.split('.');
	    ext = ext[ext.length - 1];
	    if (ext == "csv") { //si es .csv
	    	dirHdfs=cluster_root+"/datasets/"+nameFile;
		    Meteor.call('createDatasetInHDFS',nameFile,dirLocal,dirHdfs);
		    //se lleva a HiveTable y se obtiene el numero de rows y fields
		    var dataset =
		    {
		    	name: name,
				desc: description,
				// num_rows: nRows, ******Tambien descomentarlo en el schema datasets********
				// num_fields: nFields, ******Tambien descomentarlo en el schema datasets********
				local_address: dirLocal,
				hdfs_address: dirHdfs
		    }
	    	console.log(dataset);
	    	Meteor.call('insertDataset', dataset);	 
	    	FlowRouter.go('datasets');   	
	    }else{
	    	alert("El dataset debe ser extensión .csv");
	    }

  	},

	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('datasets');
  },
})