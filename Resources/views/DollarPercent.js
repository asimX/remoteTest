var globalVariables = require('globalVariables');
exports.DollarPercent = function(win) {
	var fontStyle = 'gillsanslight.ttf';
	var self = Ti.UI.createView({
		//backgroundColor : 'gray',
		backgroundImage: '/images/perforatedMetalBlack.png',
		width : '46%',
		height : Ti.UI.FILL,
		left : '7%',
		top : '2%',
		zIndex : 2,
		visible: false
	});

	var scrollView = Ti.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : false,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});
	self.add(scrollView);

	//////////////////////////////////////////////////////////
	//                label ProposedPricing

	var labProposedPricing = Ti.UI.createLabel({
		//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		text : 'Proposed Pricing',
		color : 'white',
		font : {
			fontSize : '28dp',
			fontFamily : 'GillSans-Light'
		},
		top : '1.5%',

		width : Ti.UI.SIZE
	});

	scrollView.add(labProposedPricing);

	////////////////////////////////////////////////////////////////
	/// lab Processing Fee

	var labProcessingFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Processing Fee',
		top : '10%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	scrollView.add(labProcessingFee);
	//textfield Processing Fee
	var tfProcessingFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : '10%',
		textAlign : 'right',
		right : '20dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		width : '160dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		height : '30dp',
		tintColor: 'black'
		
		//bubbleParent: false
	});
	/*	var labProFeeDollarSign = Ti.UI.createLabel({
	 color : 'black',
	 font : {
	 fontSize : 18
	 },
	 text : '',
	 top : '10%',
	 zIndex : 1,
	 right : '1dp',
	 width : '90dp',
	 height : '30dp'
	 });
	 scrollView.add(labProFeeDollarSign);
	 */
	tfProcessingFee.addEventListener('return', function(e) {

		tfAuthFee.focus();
	});
	tfProcessingFee.addEventListener('blur', function(e) {

		globalVariables.GV.ProcessingFee = parseFloat(tfProcessingFee.value) / 100.0;
		if(globalVariables.GV.ProcessingFee<1){
			globalVariables.GV.ProcessingFee = globalVariables.GV.ProcessingFee.toFixed(4);
		}
		else{
			globalVariables.GV.ProcessingFee = globalVariables.GV.ProcessingFee.toFixed(2);
		}
		
		if (tfProcessingFee.value == '') {
			tfProcessingFee.value = '0.00%';
		} else {
			var result = parseFloat(tfProcessingFee.value);
			result = result.toFixed(2) + '%';
			tfProcessingFee.value = result;
		}
		//		labProFeeDollarSign.setText('%');
	});

	scrollView.add(tfProcessingFee);
	////////////////////////////////////////////////////////////////
	// AuthFee

	var labAuthFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Auth Fee',
		top : '20%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	scrollView.add(labAuthFee);
	//textfield AuthFee
	var tfAuthFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		top : '20%',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '20dp',
		width : '160dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		height : '30dp',
		tintColor: 'black'
	});
	scrollView.add(tfAuthFee);
	
	var labAuthDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		top : '20%',
		//zIndex : 1,
		right : '80dp',
		width : '90dp',
		height : '30dp'
	});
	scrollView.add(labAuthDollarSign);

	tfAuthFee.addEventListener('return', function(e) {

		tfPinDebitProcessingFee.focus();
	});
	tfAuthFee.addEventListener('blur', function(e) {

		//globalVariables.GV.AuthFee = parseFloat(tfAuthFee.value);
		if (tfAuthFee.value == '') {
			tfAuthFee.value = globalVariables.GV.AuthFee = '0.00';
		} else {
			var result = globalVariables.GV.AuthFee = parseFloat(tfAuthFee.value);
			result = result.toFixed(2);
			tfAuthFee.value = result;
		}
		labAuthDollarSign.setText('$');
	});
	
	//////////////////////////////////////////////////////////////
	//Pin Debit Processing Fee

	var labPinDebitProcessingFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Pin Debit Processing Fee',
		top : '30%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	scrollView.add(labPinDebitProcessingFee);
	//textfield Pin Debit Processing Fee
	var tfPinDebitProcessingFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		top : '30%',
		right : '20dp',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		width : '160dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		height : '30dp',
		tintColor: 'black'
	});
	
	tfPinDebitProcessingFee.addEventListener('return', function(e) {

		tfPinDebitAuthFee.focus();
	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	globalVariables.GV.PinDebitProcessingFee = tfPinDebitProcessingFee.value;

	tfPinDebitProcessingFee.addEventListener('blur', function(e) {

		
		
		if (tfPinDebitProcessingFee.value == '') {
			tfPinDebitProcessingFee.value = globalVariables.GV.PinDebitProcessingFee = '0.00';
		} else {
			var result = parseFloat(tfPinDebitProcessingFee.value);
			globalVariables.GV.PinDebitProcessingFee = parseFloat(tfPinDebitProcessingFee.value).toFixed(2) / 100;
			result = result.toFixed(2) + '%';
			tfPinDebitProcessingFee.value = result;
		}
		if(globalVariables.GV.PinDebitProcessingFee<1)
		{
			globalVariables.GV.PinDebitProcessingFee = parseFloat(globalVariables.GV.PinDebitProcessingFee).toFixed(4);
		}
		else{
			globalVariables.GV.PinDebitProcessingFee = parseFloat(globalVariables.GV.PinDebitProcessingFee).toFixed(2);
		}
		//	labPDPFDollarSign.setText('%');
	});
	scrollView.add(tfPinDebitProcessingFee);
	////////////////////////////////////////////////////////
	//Pin Debit Auth Fee
	var labPinDebitAuthFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Pin Debit Auth Fee',
		top : '40%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	scrollView.add(labPinDebitAuthFee);
	//textfield Pin Debit Auth Fee
	var tfPinDebitAuthFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		top : '40%',
		right : '20dp',
		textAlign : 'right',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		width : '160dp',
		height : '30dp',
		tintColor: 'black'
	});
	scrollView.add(tfPinDebitAuthFee);
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var labPinDebitAuthFeeDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		top : '40%',
		//zIndex : 1,
		right : '80dp',
		width : '90dp',
		height : '30dp'
	});
	scrollView.add(labPinDebitAuthFeeDollarSign);

	tfPinDebitAuthFee.addEventListener('return', function(e) {

		tfMonthlyServiceFee.focus();
	});
	tfPinDebitAuthFee.addEventListener('blur', function(e) {

		//globalVariables.GV.PinDebitAuthFee = parseFloat(tfPinDebitAuthFee.value).toFixed(2);
		if (tfPinDebitAuthFee.value == '') {
			tfPinDebitAuthFee.value = globalVariables.GV.PinDebitAuthFee= '0.00';
		} else {
			var result = parseFloat(tfPinDebitAuthFee.value);
			result = globalVariables.GV.PinDebitAuthFee = result.toFixed(2);
			tfPinDebitAuthFee.value = result;
		}
		labPinDebitAuthFeeDollarSign.setText('$');
	});

	
	////////////////////////////////////////////////////////
	//Monthly Service Fee
	var labMonthlyServiceFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Monthly Service Fee',
		top : '50%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	scrollView.add(labMonthlyServiceFee);
	//textfield Monthly Service Fee
	var tfMonthlyServiceFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		top : '50%',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '20dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		width : '160dp',
		height : '30dp',
		tintColor: 'black'
	});
	scrollView.add(tfMonthlyServiceFee);
	var labMonthlyDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		top : '50%',
		//zIndex : 1,
		right : '80dp',
		width : '90dp',
		height : '30dp'
	});
	scrollView.add(labMonthlyDollarSign);

	tfMonthlyServiceFee.addEventListener('return', function(e) {

		tfIdustryComplinceFee.focus();
	});
	tfMonthlyServiceFee.addEventListener('blur', function(e) {

		globalVariables.GV.MonthlyServiceFee = parseFloat(tfMonthlyServiceFee.value).toFixed(2);
		if (tfMonthlyServiceFee.value == '') {
			tfMonthlyServiceFee.value = '0.00';
		} else {
			var result = parseFloat(tfMonthlyServiceFee.value);
			result = result.toFixed(2);
			tfMonthlyServiceFee.value = result;
		}
		labMonthlyDollarSign.setText('$');
	});
	
	////////////////////////////////////////////////////////
	//Idustry Complince Fee

	var labIdustryComplinceFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Industry Compliance Fee',
		top : '60%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	scrollView.add(labIdustryComplinceFee);
	//textfield Idustry Complince Fee
	var tfIdustryComplinceFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		top : '60%',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '20dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		width : '160dp',
		height : '30dp',
		tintColor: 'black'
	});
	scrollView.add(tfIdustryComplinceFee);
	var labIndusDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		top : '60%',
		//zIndex : 1,
		right : '80dp',
		width : '90dp',
		height : '30dp'
	});
	scrollView.add(labIndusDollarSign);

	tfIdustryComplinceFee.addEventListener('return', function(e) {

		tfTerminalFee.focus();
	});
	tfIdustryComplinceFee.addEventListener('blur', function(e) {

		globalVariables.GV.IndustryComplinceFee = parseFloat(tfIdustryComplinceFee.value).toFixed(2);
		if (tfIdustryComplinceFee.value == '') {
			tfIdustryComplinceFee.value = '0.00';
		} else {
			var result = parseFloat(tfIdustryComplinceFee.value);
			result = result.toFixed(2);
			tfIdustryComplinceFee.value = result;
		}
		labIndusDollarSign.setText('$');
	});
	
	////////////////////////////////////////////////////////
	//Terminal Fee

	var labTerminalFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Terminal Fee',
		top : '70%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	scrollView.add(labTerminalFee);
	//textfield Terminal Fee
	var tfTerminalFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		top : '70%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '20dp',
		width : '160dp',
		height : '30dp',
		tintColor: 'black'
	});
	scrollView.add(tfTerminalFee);
	var labTerDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		top : '70%',
		//zIndex : 1,
		right : '80dp',
		width : '90dp',
		height : '30dp'
	});
	scrollView.add(labTerDollarSign);

	tfTerminalFee.addEventListener('return', function(e) {

		tfMXGatewayFee.focus();
	});
	tfTerminalFee.addEventListener('blur', function(e) {

		globalVariables.GV.TerminalFee = parseFloat(tfTerminalFee.value).toFixed(2);

		if (tfTerminalFee.value == '') {
			tfTerminalFee.value = globalVariables.GV.TerminalFee = '0.00';
		} else {
			var result = parseFloat(tfTerminalFee.value);
			result = globalVariables.GV.TerminalFee = result.toFixed(2);
			tfTerminalFee.value = result;
		}
		labTerDollarSign.setText('$');
	});
	

	////////////////////////////////////////////////////////
	//MX Gateway Fee

	var labMXGatewayFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'MX Gateway Fee',
		top : '80%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	scrollView.add(labMXGatewayFee);
	//textfield MX Gateway Fee
	var tfMXGatewayFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		textAlign : 'right',
		color : '#336699',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		top : '80%',
		right : '20dp',
		width : '160dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		height : '30dp',
		tintColor: 'black'
	});
	scrollView.add(tfMXGatewayFee);
	var labMXDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		top : '80%',
		//zIndex : 1,
		right : '80dp',
		width : '90dp',
		height : '30dp'
	});
	scrollView.add(labMXDollarSign);
	tfMXGatewayFee.addEventListener('return', function(e) {

		tfDebitAccessFee.focus();
	});

	tfMXGatewayFee.addEventListener('blur', function(e) {
		if (tfMXGatewayFee.value == '') {
			tfMXGatewayFee.value = '0.00';
		} else {
			var result = parseFloat(tfMXGatewayFee.value);
			result = result.toFixed(2);
			tfMXGatewayFee.value = result;
		}

		globalVariables.GV.MXGatewayFee = parseFloat(tfMXGatewayFee.value).toFixed(2);
		labMXDollarSign.setText('$');
	});
	

	////////////////////////////////////////////////////////
	//Debit Access Fee

	var labDebitAccessFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Debit Access Fee',
		top : '90%',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	scrollView.add(labDebitAccessFee);
	//textfield Debit Access Fee
	var tfDebitAccessFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : '90%',
		textAlign : 'right',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '20dp',
		width : '160dp',
		height : '30dp',
		tintColor: 'black'
	});
	scrollView.add(tfDebitAccessFee);
	var labDebitAccessFeeDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		top : '90%',
		//zIndex : 1,
		right : '80dp',
		width : '90dp',
		height : '30dp'
	});
	scrollView.add(labDebitAccessFeeDollarSign);
	tfDebitAccessFee.addEventListener('blur', function(e) {
		if (tfDebitAccessFee.value == '') {
			tfDebitAccessFee.value = '0.00';
		} else {
			var result = parseFloat(tfDebitAccessFee.value);
			result = result.toFixed(2);
			tfDebitAccessFee.value = result;
		}
		labDebitAccessFeeDollarSign.setText('$');
		globalVariables.GV.DebitAccessFee = parseFloat(tfDebitAccessFee.value).toFixed(2);
	});

	
	
	Ti.App.addEventListener("fillProposedPricing", function(e){
		if(!e.initialize){
		tfAuthFee.value = parseFloat(globalVariables.GV.AuthFee).toFixed(2);
		labAuthDollarSign.setText('$');
		tfDebitAccessFee.value = parseFloat(globalVariables.GV.DebitAccessFee).toFixed(2);
		labDebitAccessFeeDollarSign.setText('$');
		tfProcessingFee.value = parseFloat(globalVariables.GV.ProcessingFee*100).toFixed(2)+'%';
		tfPinDebitAuthFee.value = parseFloat(globalVariables.GV.PinDebitAuthFee).toFixed(2);
		labPinDebitAuthFeeDollarSign.setText('$');
		tfPinDebitProcessingFee.value = parseFloat(globalVariables.GV.PinDebitProcessingFee*100).toFixed(2)+'%';
		tfMonthlyServiceFee.value = parseFloat(globalVariables.GV.MonthlyServiceFee).toFixed(2);
		labMonthlyDollarSign.setText('$');
		tfIdustryComplinceFee.value = parseFloat(globalVariables.GV.IndustryComplinceFee).toFixed(2);
		labIndusDollarSign.setText('$');
		tfTerminalFee.value = parseFloat(globalVariables.GV.TerminalFee).toFixed(2);
		labTerDollarSign.setText('$');
		tfMXGatewayFee.value = parseFloat(globalVariables.GV.MXGatewayFee).toFixed(2);
		labMXDollarSign.setText('$');
		}
		else{
			tfAuthFee.value = "";
			labAuthDollarSign.setText('');
			tfDebitAccessFee.value = "";
			labDebitAccessFeeDollarSign.setText('');
			tfProcessingFee.value = "";
			tfPinDebitAuthFee.value = "";
			labPinDebitAuthFeeDollarSign.setText('');
			tfPinDebitProcessingFee.value = "";
			tfMonthlyServiceFee.value = "";
			labMonthlyDollarSign.setText('');
			tfIdustryComplinceFee.value = "";
			labIndusDollarSign.setText('');
			tfTerminalFee.value = "";
			labTerDollarSign.setText('');
			tfMXGatewayFee.value = "";
			labMXDollarSign.setText('');
		}
	});
	
	return self;
};
