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
		$(".backdrop").css('display','block');
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
					Meteor.call('queryDatasetRows',dirHdfs, function(err1,res1){
						console.log(res1);
						if(res1.statusCode == 200){
							console.log('numero de rows listo');
							console.log(res1.data.rows[0].EXPR$0);  
							var nRows = parseInt(res1.data.rows[0].EXPR$0);			
							Meteor.call('queryDatasetColumns', dirHdfs, function(err2,res2){
								console.log(res2);

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
										Meteor.call('insertDataset', dataset, function(err,res){
											if(res){
												console.log(res);
												checkColumns(dirHdfs, nRows, res);
											}
											if(err){
												$(".backdrop").css('display','none');
												alert("No se ha creado el dataset!");
											}
										});
									}else{
										$(".backdrop").css('display','none');
										alert("No se ha creado el dataset! Error en formación de CSV");
										Meteor.call('removeHdfsFolder',dirHdfs);
									}
								}else{
									$(".backdrop").css('display','none');
									alert("No se ha creado el dataset! Error en formación de CSV");
									Meteor.call('removeHdfsFolder',dirHdfs);
								}
								if(err2){
									$(".backdrop").css('display','none');
									alert("No se ha creado el dataset! Error formación de CSV");
								}
							});
						}else{
							$(".backdrop").css('display','none');
							alert("Este archivo supera la capacidad de memoria asignada en el clúster!!!");
							Meteor.call('removeHdfsFolder',dirHdfs);
						}
						if(err1){
							$(".backdrop").css('display','none');
							alert("No se ha creado el dataset!");
						}
					});
				}else{
					$(".backdrop").css('display','none');
					alert("No se ha creado el dataset en el clúster!");
				}
				if(err3){

				}
			});

		}else{
			$(".backdrop").css('display','none');
			alert("El dataset debe ser extensión .csv");
		}

	},

	'click .btn-back' (event, template) {
		event.preventDefault();
		FlowRouter.go('datasets');
	},
});

		function checkColumns(dirHdfs, nRows, dsId) {
			Meteor.call('queryDatasetColumnsLimited', dirHdfs, parseInt(nRows*0.1), function(err,res){
				if (res) {
					let columns = compareDataTypes(res.data.columns, res.data.rows, parseInt(parseInt(nRows*0.1)*0.9), dsId);

					Meteor.call('insertColumn', columns, function (err, res) {
						if (res) {
							FlowRouter.go('datasets');
						}
						if (err) {
							console.log(err);
						}
					});
				}
			});
		};

		function compareDataTypes(columns, array, factor, dsId) {
			let results = [];
			let c_to_insert = [];
			for(let i in columns){
				let int 	= isInt(columns[i], array);
				let double 	= isDouble(columns[i], array);

				if (int >= factor) {
					results[columns[i]] = "Integer";
				} else if (double >= factor) {
					results[columns[i]] = "Double";
				} else {
					results[columns[i]] = "String";
				}

				let column =
				{
					datasetId: dsId,
					name: columns[i],
					dataType: results[columns[i]]
				}

				c_to_insert.push(column);
			}

			console.log(c_to_insert);

			return c_to_insert;
		};

		function isInt(column, array) {
			let pattern = /^[\d]*$/;
			let results = 0;
			for (let i in array) {
				if (pattern.test(array[i][column])){
					results++;
				}
			}
			return results;
		};

		function isDouble(column, array) {
			let pattern = /^([\d]+[\.,][\d]+|[\d]*)$/;
			let results = 0;
			for (let i in array) {
				if (pattern.test(array[i][column])){
					results++;
				}
			}
			return results;
		};