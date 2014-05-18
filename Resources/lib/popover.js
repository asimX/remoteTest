var globalVariables = require('globalVariables');
var selected = null;
exports.getPopover = function(data, action){
	var thisPopover = Ti.UI.iPad.createPopover({
		width: 250,
		height: 600,
		title: data.title
	});
	var tableview = Ti.UI.createTableView({
		data: data.data,
		width: 210,
		height: 500
	});
	
	//var selected=null;
	
	tableview.addEventListener("click", function(e){
		selected=e.row.title;
		thisPopover.hide();
	});
	
	thisPopover.add(tableview);
	
	return thisPopover;
};

exports.getSelected = function(){
	return selected;
};