var globalVariables = require('globalVariables');
var db = require('db/db');
var acs = require('lib/acs');
exports.NotesView = function() {
	var fontStyle = 'gillsanslight.ttf';
	var self = Ti.UI.createView({
		//backgroundColor : 'gray',
		backgroundImage : '/images/perforatedMetalBlack.png',
		width : '50%',
		height : Ti.UI.FILL,
		right : '7%',
		top : '2%',
		zIndex : 2,
		visible: false
	});
	
	// var btnSave = Titanium.UI.createButton({
		// title : 'Save',
		// top : 10,
		// right : 10,
		// width : 100,
		// height : 50
	// });
	// btnSave.addEventListener('click', function(e) {
		// acs.createNotes(textNotes.value);
		// //db.FillNotes();
		// Titanium.API.info("You clicked the button");
	// });
	//self.add(btnSave);
	
	var labNotesViewHead = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '34dp',
			fontFamily : 'GillSans-Light'
		},

		text : 'Notes',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '3%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	self.add(labNotesViewHead);
	/////////////////////
	var textNotes = Ti.UI.createTextArea({
		borderWidth : 2,
		borderColor : '#bbb',
		borderRadius : 5,
		//color : '#888',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		textAlign : 'left',
		value : 'Write a Note here',
		top : '11%',
		width : '90%',
		height : '85%',
		suppressReturn: false
	});

	self.add(textNotes);
	textNotes._hintText = textNotes.value;

	textNotes.addEventListener('focus', function(e) {

		if (e.source.value == e.source._hintText) {

			e.source.value = "";
		}
	});
	textNotes.addEventListener('blur', function(e) {

		if (e.source.value == "") {
			e.source.value = e.source._hintText;
			globalVariables.GV.Notes = "";
		}
		else
		{
			globalVariables.GV.Notes = textNotes.value;
		}
	});
	
	Ti.App.addEventListener('fillNotes', function(e){
		if(!e.initialize){
			textNotes.value = globalVariables.GV.Notes;
		}
		else{
			textNotes.value="";
		}
		
	});
	return self;
};
