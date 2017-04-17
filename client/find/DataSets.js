Template.DataSets.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('all_datasets');
	});

	// var datasets = DataSets.find();
	// Session.set('all_datasets',datasets);

});

Template.DataSets.onRendered(function(){
	$(".nav-tabs-projects > li").each(function() {
		$(this).removeClass("active");
	});	

	$("#datasetsTabli").addClass('active');
	$('[data-toggle="popover"]').popover();

	// var datasets = DataSets.find()._id;
	// Session.set('datasets_test',datasets);
});

Template.DataSets.helpers({
	datasets:()=> {
		return DataSets.find();
	},

	searchDatasets:()=> {
		var clue = Session.get('clue');
		console.log(clue);
		var regex = new RegExp( clue, 'i' );
		// console.log(regex);
		return DataSets.find({name:regex});
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

	isSearching:()=> {
		return Session.get('searching');
	},
});

Template.DataSets.events({
	'click #delete'() {
		let id_dataset = $("#delete").data("target");
		let that = DataSets.findOne(id_dataset);
		Meteor.call('removeHdfsFolder', that.hdfs_address, function(err,res){
   			// console.log(res);
   			if(res.statusCode == 200){
   				Meteor.call('removeDataset',id_dataset, function(err2,res2){
					// console.log(res2);
					if(res2){
						Meteor.call('removeColumn', id_dataset, function (err, res) {
							if (res) {
								$("#deleteModal").modal('hide');
								// alert("El conjunto ha sido eliminado exitosamente!!!");
							}
							if (err) {
								console.log(err);
							}
							
						});
					}else{
						$("#deleteModal").modal('hide');
						alert("No se ha podido eliminar el conjunto!!!");
					}
					if(err2){
						$("#deleteModal").modal('hide');
						alert("No se ha podido eliminar el conjunto!!!");
					}
				});	
   			}else{
   				$("#deleteModal").modal('hide');
   				alert("No se ha podido eliminar el conjunto!!!");
   			}
   			if(err){
   				$("#deleteModal").modal('hide');
   				alert("No se ha podido eliminar el conjunto!!!");
   			}
   		});
	},
	'show.bs.modal #deleteModal' (event) {
		let button = $(event.relatedTarget);
		let target = button.data('id');
		// console.log(target);
		$("#delete").data("target", target);
	},
	
	'show.bs.modal #viewModal' (event) {
		let button 		= $(event.relatedTarget);
		let id_dataset 	= button.data('id');
		let that 		= DataSets.findOne(id_dataset);

		$('#dsName').text(that.name);
		$('#dsNfields').text(that.num_fields);
		$('#dsNrows').text(that.num_rows);
		$('#dsDesc').text(that.desc);

		if (that.dataset_type == 'privado'){
			$('#public').css('display', 'none');
			$('#private').css('display', 'block');
		}else{
			$('#private').css('display', 'none');
			$('#public').css('display', 'block');
		}
	},
	'click .search-dataset' (event) {
		console.log('buscar');
		$('.search-row').removeClass('hidden');
	},
	'click #searchBtn' (event) {
		Session.set('searching',true);
		Session.set('clue',$('#clue').val());
	},
	'keypress #clue':function(event) {
		// console.log('enter');
		// console.log(event);
		if (event.which === 13) {
			Session.set('searching',true);
			Session.set('clue',$('#clue').val());
		}   
     },
	'click .show-all-datasets' (event) {
		$('#clue').val(null);
		$('.search-row').addClass('hidden');
		Session.set('searching',false);
	},

});