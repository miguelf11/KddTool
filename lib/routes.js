if (Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('proyectos');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('main');
	});
}

FlowRouter.triggers.enter([function(context, redirect){
	// if(!Meteor.userId()){
	// 	FlowRouter.go('main');
	// }
}]);

FlowRouter.route('/',{
	name: 'main',
	action(){
		if(Meteor.userId()){
			console.log('loggeado');
			// FlowRouter.go('proyectos');
			FlowRouter.go('proyectos');
		}else{
			FlowRouter.go('login');
		}
		// BlazeLayout.render('MainLayout',{main:'Login'});
	}
});

// FlowRouter.route('/inicio',{
// 	name: 'inicio',
// 	action(){
// 		console.log('estoy en inicio');
// 		if(Meteor.userId()){
// 			BlazeLayout.render('HomeLayout',{main:'Inicio'});
// 		}
// 	}
// });

FlowRouter.route('/login',{
	name: 'login',
	action(){
		if(Meteor.userId()){
			console.log('loggeado');
			FlowRouter.go('proyectos');
		}
		BlazeLayout.render('MainLayout',{main:'Login'});
	}
});
FlowRouter.route('/registro',{
	name: 'registro',
	action(){
		if(Meteor.userId()){
			console.log('loggeado');
			FlowRouter.go('proyectos');
		}
		BlazeLayout.render('MainLayout',{main:'Registrer'});
	}
});
FlowRouter.route('/recuperar_contraseña',{
	name: 'recuperar',
	action(){
		if(Meteor.userId()){
			FlowRouter.go('recoverPwd');
		}
		BlazeLayout.render('MainLayout',{main:'recoverPwd'});
	}
});

FlowRouter.route('/proyectos',{
	name: 'proyectos',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('HomeLayout',{main:'Projects'});
	}
});


FlowRouter.route('/datasets',{
	name: 'datasets',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('HomeLayout',{main:'DataSets'});
	}
});

FlowRouter.route('/preparacion/:id',{
	name: 'preparacion',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('KddLayout',{main:'DataPrepair'});
	}
});


FlowRouter.route('/modelado/:id',{
	name: 'modelado',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('KddLayout',{main:'DataModeling'});
	}
});

FlowRouter.route('/visualizacion/:id',{
	name: 'visualizacion',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('KddLayout',{main:'DataVisualitation'});
	}
});

FlowRouter.route('/mi-perfil',{
	name: 'mi-perfil',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('MainLayout',{main:'myProfile'});
	}
});

FlowRouter.route('/nuevo-dataset',{
	name: 'nuevo-dataset',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('MainLayout',{main:'newDataset'});
	}
});

FlowRouter.route('/nuevo-proyecto',{
	name: 'nuevo-proyecto',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('MainLayout',{main:'newProject'});
	}
});

FlowRouter.route('/preparacion/:id',{
	name: 'preparacion',
	action(){
		BlazeLayout.render('KddLayout',{main:'DataPrepair'});
	}
});

// FlowRouter.route('/test', {
// 	name: 'test',
// 	action(){
// 		Meteor.call('hiveConnection');
// 	}
// });

FlowRouter.route('/drill',{
	name: 'drill',
	action(){
		Meteor.call('drill',function(err, res){
			if(res.statusCode == 200){
				console.log(JSON.stringify(res.data.rows));
			}
			if(err){
				alert("Error");
			}
		});
	}
});

FlowRouter.route('/datasets/:id',{
	name: 'editar-dataset',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('MainLayout',{main:'editDataset'});
	}
});

FlowRouter.route('/proyectos/:id',{
	name: 'editar-proyecto',
	action(){
		if(!Meteor.userId()){
			console.log('fuera');
			FlowRouter.go('main');
		}
		BlazeLayout.render('MainLayout',{main:'editProject'});
	}
});