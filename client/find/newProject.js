Template.newProject.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('all_datasets');
		self.subscribe('all_columns');
	});
});

Template.newProject.helpers({
	completeName: function() {
		if(Meteor.user()){
			return (Meteor.user().profile.name+' '+Meteor.user().profile.lastName);
		}
	},
	datasets:()=> {
		return DataSets.find({});
	}
});


Template.newProject.events({
	'submit form'(event, template) {
	    event.preventDefault();
	    $(".backdrop").css('display','block');
	    var name = template.find('#name').value;
	    var description = template.find('#description').value;
	    // var nRows = template.find('#numberRows').value;
	    // var nFields = template.find('#numberFields').value;
	    // var user = template.find('.author').value;
	    // var dirCluster = template.find('#address').value;
	    var dataset = template.find('#dataset').value;
	    var stage = 'preparacion';

	    var dataset_address = DataSets.findOne({_id:dataset},{fields:{hdfs_address:1}}).hdfs_address;
	    console.log(dataset_address);

    	var HDFSProjectFolderName = name.replace(/\s/g, "");
    	var HDFSUserFolderName = Meteor.user().emails[0].address;
		Meteor.call('createHdfsFolderProject',HDFSUserFolderName,HDFSProjectFolderName,function(error, result){
			console.log(result);
			if(result.statusCode == 200){
				//drill copy dataset to folder project
				console.log('folder hdfs created');
				var folder_project = cluster_root+"/projects/"+HDFSUserFolderName+"/"+HDFSProjectFolderName;

				Meteor.call('copyDatasetInFolderProject',folder_project,dataset_address, function(error2,result2){
					console.log(result2);
					if(result2.statusCode == 200){
						console.log('dataset copied into project folder');
						var columns = '';
						Meteor.call('queryDataDrill', folder_project, function(err,res){
							if(res.statusCode == 200){
								
								// Session.set('data_keys',res.data.columns);

								// console.log(res.data.columns);
								columns = res.data.columns;
								// console.log(columns);
								var data_types =[];

								for (var i=0;i<columns.length;i++){
									let column = Columns.findOne({datasetId: dataset, name: columns[i]});
									var each_column = {name:columns[i],type:column.dataType, active:true};
									// console.log(each_column);
									data_types.push(each_column);
								}
								// console.log(data_types);
							    var project =
								    {
								    	name: name,
										desc: description,
										// num_rows: nRows,
										// num_fields: nFields,
										address: folder_project,
										current_version_address: folder_project,
										dataset: dataset,
										last_stage: stage,
										data_types:data_types
								    };
								Meteor.call('insertProject', project,function(err, res){
						    		if(res){
						    			console.log('project created in mongo');
						    			FlowRouter.go('preparacion', { id: res});
						    		}
						    		if(err){
						    			$(".backdrop").css('display','none');
						    			alert("No se ha podido crear el proyecto!");
						    		}
								});
							}
							if(err){
								$(".backdrop").css('display','none');
								alert("no data");
							}
						});
					}else{
						$(".backdrop").css('display','none');
						alert('No se ha podido crear el proyecto! (Error en Clúster)');
					}
					if(error2){
						$(".backdrop").css('display','none');
						alert('No se ha podido crear el proyecto! (Error en Clúster)');
					}
				});

				
			}else{
				$(".backdrop").css('display','none');
				alert('No se ha podido crear el proyecto! (Error en Clúster)');
			}
		});

  	},
	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('datasets');
  	},
})