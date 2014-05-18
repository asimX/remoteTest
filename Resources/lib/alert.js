exports.alert = function(title, message) {
	var dialog = Ti.UI.createAlertDialog({
		message : message,
		ok : 'OK',
		title : title
	}).show();
};
