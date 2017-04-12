Template.exploreModalString.helpers({
	// Session.set('data_project',res.data.rows);
	data_explore:()=>{
		return Session.get('data_explore_string');
	},

	table_header_explore:()=> {
        return Session.get('data_explore_string_keys');
	},

	row_content_explore:(document)=> {
	    var row = [];
	    var header = Session.get('data_explore_string_keys');
	    for (var key in header) {
	    	if (key == 0){
	    		row.isFirst = true;
	    	}
	      	row.push(document[header[key]] || "");
	    }
	    return row;
	},
});

Template.exploreModalString.events({
	// 'click .explore-string'(event, template){
	// 	event.preventDefault();
 //      	var column = $(event.currentTarget).attr("value");

 //      	console.log(column);
	// },
	// 'show.bs.modal #deleteModal' (event) {
	// 	let button = $(event.relatedTarget);
	// 	let target = button.data('id');
	// 	// console.log(target);
	// 	let modal = $(this);
	// 	$("#delete").data("target", target);
	// }
});