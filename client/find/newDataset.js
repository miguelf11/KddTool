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
	    var datasetType = template.find("input[name=datasetType]:checked").value;
	    // console.log(datasetType);
	    var nameFileArr = dirLocal.split('/');
	    var nameFile = nameFileArr[nameFileArr.length - 1];
	    var ext1 = nameFile.split('.');
	    var ext = ext1[ext1.length - 1];
	    nameFile = ext1[ext1.length - 2]+Date.now()+'.'+ext1[ext1.length - 1];
	    console.log(nameFile);
	    if (ext == "csv"){//si es .csv
	    	dirHdfs=cluster_root+"/datasets/"+nameFile;
		    Meteor.call('createDatasetInHDFS',nameFile,dirLocal,dirHdfs,function(err3,res3){
		    	// console.log(res3);
		    	if(res3==true){
	    			console.log('subido a hdfs');
	    			console.log("res3 es true");
			    	Meteor.call('queryDatasetRows',dirHdfs, function(err1,res1){
			    		console.log(res1);
			    		if(res1.statusCode == 200){
			    			console.log('numero de rows listo');
							console.log(res1.data.rows[0].EXPR$0);  
							var nRows = parseInt(res1.data.rows[0].EXPR$0);			
			    			Meteor.call('queryDatasetColumns', dirHdfs, function(err2,res2){
			    				console.log(res2);
			    				console.log("res2");
			    				if (err2) {
			    					console.log("err2");
			    				}

					    		if(res2.statusCode == 200){
					    			console.log('numero de campos listo');
					    			var columns = res2.data.columns;
					    			var nFields = res2.data.columns.length;
					    			var badCSV = false;

					    			for (i=0; i<nFields;i++){
					    				if (columns[i]==''){
					    					badCSV = true;
					    				}
					    			}
					    			console.log(nFields);
					    			if (!badCSV){
			    					    var dataset =
									    {
									    	name: name,
											desc: description,
											num_rows: nRows,
											num_fields: nFields,
											local_address: dirLocal,
											hdfs_address: dirHdfs,
											dataset_type: datasetType
									    }
								    	console.log(dataset);
								    	console.log("dataset");
								    	Meteor.call('insertDataset', dataset, function(err,res){
								    		if(res){
								    			FlowRouter.go('datasets');
								    		}
								    		if(err){
								    			alert("No se ha creado el dataset!");
								    		}
								    	});
							    	}else{
							    		alert("No se ha creado el dataset! Error en formación de CSV");
					    				Meteor.call('removeHdfsFolder',dirHdfs);
							    	}
					    		}else{
					    			alert("No se ha creado el dataset! Error en formación de CSV");
					    			Meteor.call('removeHdfsFolder',dirHdfs);
					    		}
					    		if(err2){
					    			alert("No se ha creado el dataset! Error formación de CSV");
					    		}
					    	});
			    		}else{
			    			alert("Este archivo supera la capacidad de memoria asignada en el clúster!!!");
			    			Meteor.call('removeHdfsFolder',dirHdfs);
			    		}
			    		if(err1){
			    			alert("No se ha creado el dataset!");
			    		}
			    	});
	    		}else{
	    			alert("No se ha creado el dataset en el clúster!");
	    		}
	    		if(err3){
	    			console.log("err3");
	    		}
		    });
	    }else{
	    	alert("El dataset debe ser extensión .csv");
	    }

  	},

	'click .btn-back' (event, template) {
    	event.preventDefault();
   		FlowRouter.go('datasets');
  	},
});