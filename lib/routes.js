if (Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('projects');
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
			FlowRouter.go('projects');
		}else{
			FlowRouter.go('login');
		}
		// BlazeLayout.render('MainLayout',{main:'Login'});
	}
});

FlowRouter.route('/login',{
	name: 'login',
	action(){
		if(Meteor.userId()){
			console.log('loggeado');
			FlowRouter.go('projects');
		}
		BlazeLayout.render('MainLayout',{main:'Login'});
	}
});
FlowRouter.route('/registro',{
	name: 'registro',
	action(){
		if(Meteor.userId()){
			console.log('loggeado');
			FlowRouter.go('projects');
		}
		BlazeLayout.render('MainLayout',{main:'Registrer'});
	}
});

FlowRouter.route('/projects',{
	name: 'projects',
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

// FlowRouter.route('/recipe/:id',{
// 	name: 'recipe',
// 	action(){
// 		BlazeLayout.render('OtroLayout',{main:'RecipeSingle'});
// 	}
// });
