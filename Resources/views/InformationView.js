var db = require('db/db');
var acs = require("/lib/acs");
var globalVariables = require('globalVariables');
exports.Information = function() {
	var self = Ti.UI.createView({
		backgroundColor : 'black',
		backgroundImage : 'images/iconGradientBG.png',
		//zIndex : 3,
		width : '93%',
		height : Ti.UI.FILL,
		top : '2%',
				//layout:'vertical'
	});
	
	var topMargin = '35dp';

	var scrollView = Ti.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : false,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		layout : 'vertical'
	});
	self.add(scrollView);
	
	var resetBtn = Ti.UI.createButton({
		color: '#e5e7e6',
		top: 5,
		right: 5,
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		zIndex: 1,
		title: "Clear"
	});
	
	self.add(resetBtn);
	
	resetBtn.addEventListener("click", function(e){
		globalVariables.GV.ResetValues();
		Ti.App.fireEvent('fillBusinessInfo',{initialize:true});
		Ti.App.fireEvent('fillCSInfo',{initialize:true});
		Ti.App.fireEvent('fillIaInfo',{initialize:true});
		Ti.App.fireEvent('fillSavingsInfo',{initialize:true});
		Ti.App.fireEvent('fillProposedPricing',{initialize:true});
		Ti.App.fireEvent('fillNotes',{initialize:true});
	});

	var labelInformation = Ti.UI.createLabel({
		color : '#e5e7e6',
		font : {
			fontSize : '34dp',
			fontFamily : 'GillSans-Light'
		},
		text : 'INFORMATION',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '25dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	scrollView.add(labelInformation);

	var comboView1 = Ti.UI.createView({
		top : topMargin,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});

	var labBname = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'Business Name',

		//top : '40dp',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	//scrollView.add(labBname);
	comboView1.add(labBname);
	var tfBname = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		color : '#336699',
		//top : '10dp',
		right : '20dp',
		width : '60.4%',
		height : '45dp',
		//maxLength: 47
	});
	//scrollView.add(tfBname);
	comboView1.add(tfBname);
	tfBname.addEventListener('return', function(e) {
		tfSaddress.focus();
	});
	tfBname.addEventListener('blur', function(e) {

		globalVariables.GV.BusinessName = tfBname.value;
		//tfSaddress.focus();

	});
	//2
	scrollView.add(comboView1);

	var comboView2 = Ti.UI.createView({
		top : topMargin,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});

	var labSaddress = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'Street Address',

		//top : '180dp',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	//scrollView.add(labSaddress);
	comboView2.add(labSaddress);
	var tfSaddress = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		color : '#336699',
		//top : '180dp',
		left : '330dp',
		width : '30%',
		height : '45dp'
	});
	//scrollView.add(tfSaddress);
	comboView2.add(tfSaddress);
	tfSaddress.addEventListener('return', function(e) {
		tfState.focus();
	});
	tfSaddress.addEventListener('blur', function(e) {
		//tfState.focus();
		globalVariables.GV.StreetAddress = tfSaddress.value;
	});
	//3

	var labState = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'State',

		//top : '180dp',
		right : '120dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	//scrollView.add(labState);
	comboView2.add(labState);

	var tfState = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		color : '#336699',
		//top : '180dp',
		right : '20dp',
		width : '10%',
		height : '45dp'
	});

	//scrollView.add(tfState);
	comboView2.add(tfState);
	tfState.addEventListener('return', function(e) {
		tfCity.focus();
	});
	tfState.addEventListener('blur', function(e) {
		globalVariables.GV.State = tfState.value;
		//	tfCity.focus();
	});
	//4
	scrollView.add(comboView2);

	var comboView3 = Ti.UI.createView({
		top : topMargin,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});

	var labCity = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'City',

		//top : '180dp',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	comboView3.add(labCity);
	//scrollView.add(labCity);

	var tfCity = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		color : '#336699',
		//top : '270dp',
		left : '330dp',
		width : '30%',
		height : '45dp'
	});

	//scrollView.add(tfCity);
	comboView3.add(tfCity);
	tfCity.addEventListener('return', function(e) {
		tfZip.focus();
	});
	tfCity.addEventListener('blur', function(e) {
		globalVariables.GV.City = tfCity.value;
		//tfZip.focus();
	});
	//5

	var labZip = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'Zip',

		//top : '270dp',
		right : '120dp',
		textAlign : 'center',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView3.add(labZip);
	//scrollView.add(labZip);
	var tfZip = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		color : '#336699',
		//top : '270dp',
		right : '20dp',
		width : '10%',
		height : '45dp'
	});
	//scrollView.add(tfZip);
	comboView3.add(tfZip);
	tfZip.addEventListener('return', function(e) {
		tfContact.focus();
	});
	tfZip.addEventListener('blur', function(e) {
		globalVariables.GV.Zip = tfZip.value;
		//	tfContact.focus();
	});
	//6

	scrollView.add(comboView3);
	var comboView4 = Ti.UI.createView({
		top : topMargin,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView4);
	var labContact = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'Contact',

		//	top : '360dp',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	comboView4.add(labContact);

	var tfContact = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		color : '#336699',
		//top : '360dp',
		left : '330dp',
		width : '30%',
		height : '45dp'
	});
	comboView4.add(tfContact);
	tfContact.addEventListener('return', function(e) {
		tfPhone.focus();
	});
	tfContact.addEventListener('blur', function(e) {
		globalVariables.GV.Contact = tfContact.value;
		//tfPhone.focus();
	});
	//7
	var comboView5 = Ti.UI.createView({
		top : topMargin,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView5);

	var labPhone = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'Phone',

		//top : '450dp',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView5.add(labPhone);
	var tfPhone = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,

		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		color : '#336699',
		//	top : '450dp',
		left : '330dp',
		width : '30%',
		height : '45dp'
	});
	comboView5.add(tfPhone);
	tfPhone.addEventListener('return', function(e) {
		tfPmonth.focus();
	});
	tfPhone.addEventListener('blur', function(e) {
		//	tfPmonth.focus();
		globalVariables.GV.Phone = tfPhone.value;
	});
	//8
	var comboView6 = Ti.UI.createView({
		top : topMargin,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView6);
	var labBtype = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'Business Type',

		//top : '540dp',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView6.add(labBtype);

	var tr = Titanium.UI.create2DMatrix();
	tr = tr.rotate(90);

	var drop_button = Titanium.UI.createButton({
		style : Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		transform : tr
	});

	var tfBtype = Titanium.UI.createTextField({
		color : '#336699',
		//top : '540dp',
		left : '330dp',
		width : '30%',
		height : '45dp',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		editable: false
		//rightButton : drop_button,
		//rightButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
	});
	
	var bTypeData = [
		{title:'Retail Low'},
	 	{title:'Retail High'},
	 	{title:'Restaurant Low'},
	 	{title:'Restaurant High'},
	 	{title:'Small Ticket'},
	 	{title:'MOTO'},
	 	{title:'Internet'},
	 	{title:'Business to Business'},
	 	{title:'Supermarket'},
	 	{title:'Hotel/Lodging'},
	 	{title:'Utilities'}
	];
	
	var BtypePopover = Ti.UI.iPad.createPopover({//require('lib/popover').getPopover({
		title: "Business Type",
		width: 250,
		height: 600,
		arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT 
	});
	
	// var popoverView = Ti.UI.createView({
		// background: ""
	// })
	var tableview = Ti.UI.createTableView({
		data: bTypeData,
		width: 210,
		height: 350
	});
	
	BtypePopover.setContentView(tableview);
	
	tableview.addEventListener("click", function(e){
		tfBtype.value = globalVariables.GV.BusinessType = e.row.title;
		globalVariables.GV.tfInterFeeChange=false;
		BtypePopover.hide();
	});
	
	tfBtype.addEventListener("click", function(e){
		BtypePopover.show({ view: tfBtype });
	});
	
	// var picker_view = Titanium.UI.createView({
		// height : 251,
		// bottom : -251
	// });
// 
	// var cancel = Titanium.UI.createButton({
		// title : 'Cancel',
		// style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	// });
// 
	// var done = Titanium.UI.createButton({
		// title : 'Done',
		// style : Titanium.UI.iPhone.SystemButtonStyle.DONE
	// });
// 
	// var spacer = Titanium.UI.createButton({
		// systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	// });
// 
	// var toolbar = Titanium.UI.createToolbar({
		// top : 0,
		// width : '320dp',
		// items : [cancel, spacer, done]
	// });
// 
	// var picker = Titanium.UI.createPicker({
		// top : 43
	// });
	// picker.selectionIndicator = true;
// 
	 // var picker_data = [
	 // Titanium.UI.createPickerRow({title:'Retail Low'}),
	 // Titanium.UI.createPickerRow({title:'Retail High'}),
	 // Titanium.UI.createPickerRow({title:'Restaurant Low'}),
	 // Titanium.UI.createPickerRow({title:'Restaurant High'}),
	 // Titanium.UI.createPickerRow({title:'Small Ticket'}),
	 // Titanium.UI.createPickerRow({title:'MOTO'}),
	 // Titanium.UI.createPickerRow({title:'Internet'}),
	 // Titanium.UI.createPickerRow({title:'Business to Business'}),
	 // Titanium.UI.createPickerRow({title:'Supermarket'}),
	 // Titanium.UI.createPickerRow({title:'Hotel/Lodging'}),
	 // Titanium.UI.createPickerRow({title:'Utilities'}),
	 // ];
// 
	// picker.add(picker_data);
// 
	// picker_view.add(toolbar);
	// picker_view.add(picker);
// 
	// var slide_in = Titanium.UI.createAnimation({
		// bottom : 0
	// });
	// var slide_out = Titanium.UI.createAnimation({
		// bottom : -251
	// });
// 
	// tfBtype.addEventListener('focus', function() {
		// picker_view.animate(slide_out);
	// });
// 
	// drop_button.addEventListener('click', function() {
		// picker_view.animate(slide_in);
		// tfBtype.blur();
	// });
// 
	// cancel.addEventListener('click', function() {
		// picker_view.animate(slide_out);
	// });
// 
	// done.addEventListener('click', function() {
		// globalVariables.GV.BusinessType = tfBtype.value = picker.getSelectedRow(0).title;
		// globalVariables.GV.tfInterFeeChange=false;
		// //	alert(globalVariables.GV.BusinessTypeName);
		// picker_view.animate(slide_out);
		// db.FillBusinessType();
		// //	acs.BusinessType();
	// });

	//self.add(picker_view);
	comboView6.add(tfBtype);

	//9
	var comboView7 = Ti.UI.createView({
		//top: topMargin,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView7);
	var comboView8 = Ti.UI.createView({
		top : topMargin,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView8);
	var labPmonth = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : '28dp'
		},
		text : 'Processing Months',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView8.add(labPmonth);

	var tfPmonth = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		color : '#336699',
		//	top : '615dp',
		left : '330dp',
		width : '30%',
		height : '45dp'
	});
	comboView8.add(tfPmonth);
	tfPmonth.addEventListener('blur', function(e) {
		globalVariables.GV.ProcessingMonths = tfPmonth.value;
		//tfPmonth.focus();
	});
	
	Ti.App.addEventListener('fillBusinessInfo', function(e){
		if(!e.initialize){
			
		tfBname.value = globalVariables.GV.BusinessName;
		tfSaddress.value = globalVariables.GV.StreetAddress;
		tfState.value = globalVariables.GV.State;
		tfCity.value = globalVariables.GV.City;
		tfZip.value = globalVariables.GV.Zip;
		tfContact.value = globalVariables.GV.Contact;
		tfPhone.value = globalVariables.GV.Phone;
		tfBtype.value = globalVariables.GV.BusinessType;
		tfPmonth.value = globalVariables.GV.ProcessingMonths;
		}
		else{
			tfBname.value = "";
			tfSaddress.value = "";
			tfState.value = "";
			tfCity.value = "";
			tfZip.value = "";
			tfContact.value = "";
			tfPhone.value = "";
			tfBtype.value = "";
			tfPmonth.value = "";
		}
	});
	
	return self;

};
