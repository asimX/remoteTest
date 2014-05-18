var globalVariables = require('globalVariables');
var alert = require('lib/alert');
exports.CurrentScenario = function() {
	var fontStyle = 'gillsanslight.ttf';
	var self = Ti.UI.createView({
		backgroundColor : 'black',
		backgroundImage : 'images/iconGradientBG.png',
		width : '93%',
		height : Ti.UI.FILL,
		top : '2%'
	});
	
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
	
	var labCurrentScenario = Ti.UI.createLabel({
		color : '#e5e7e6',
		font : {
			fontSize : '34dp',
			fontFamily : 'GillSans-Light'
		},
		text : 'CURRENT SCENARIO',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '25dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	scrollView.add(labCurrentScenario);
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//1st image view debit
	var comboView1 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView1);
	var imageDebit = Ti.UI.createImageView({
		image : '/images/iconDebit.png',
		//top : '23%',
		right : '30dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageDebit);
	// American Express

	var imageAmericanExpress = Ti.UI.createImageView({
		image : '/images/iconAmericanExpress.png',
		//top : '23%',
		right : '160dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageAmericanExpress);
	//discover
	var imageAmericanExpress = Ti.UI.createImageView({
		image : '/images/iconDiscover.png',
		//top : '23%',
		right : '290dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageAmericanExpress);
	//master card
	var imageMasterCard = Ti.UI.createImageView({
		image : '/images/iconMasterCard.png',
		//top : '23%',
		right : '420dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageMasterCard);
	//visa
	var imageVisa = Ti.UI.createImageView({
		image : '/images/iconVisa.png',
		//top : '23%',
		right : '550dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageVisa);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var comboView2 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView2);
	//lable volume
	var labvol = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Volume',
		//top : '47%',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView2.add(labvol);

	var tfDebitVol = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		color : '#336699',
		textAlign : 'right',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		right : '30dp',
		width : '110dp',
		height : '35dp'
	});
	
	comboView2.add(tfDebitVol);
	
	var labDebitDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		//zIndex : 1,
		right : '40dp',
		width : '90dp',
		height : '30dp'
	});
	
	comboView2.add(labDebitDollarSign);
	
	tfDebitVol.addEventListener('return', function(e) {
		tfAeVol.focus();
	});
	
	tfDebitVol.addEventListener('blur', function(e) {
		globalVariables.GV.debitVol = tfDebitVol.value;

		var result = parseFloat(tfDebitVol.value);
		result = result.toFixed(2);
		tfDebitVol.value = result;
		//Ti.API.error(x);
		if (tfDebitVol.value == '') {
			tfDebitVol.value = '0.00';

		} else {
			var result = parseFloat(tfDebitVol.value);
			result = result.toFixed(2);
			tfDebitVol.value = result;

		}
		labDebitDollarSign.setText('$');
	});

	tfDebitVol.addEventListener('return', function(e) {
		tfVisaTransactions.focus();
	});

	// tfDebitVol.addEventListener('change', function(e) {
		// //Titanium.API.info("You clicked the button");
		// if (tfDebitTransactions.value == '') {
			// tfDebitTransactions.value=0;
			// labDebitAt.setText('0');
		// } else {
			// var result = tfDebitVol.value / tfDebitTransactions.value;
// 
			// labDebitAt.setText(result);
		// }
	// });

	

	//textfield vol2
	var tfAeVol = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		//top : '47%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		right : '160dp',
		width : '110dp',
		height : '35dp'
	});
	var labAeDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		zIndex : 1,
		right : '170dp',
		width : '90dp',
		height : '30dp'
	});
	comboView2.add(labAeDollarSign);
	tfAeVol.addEventListener('return', function(e) {
		tfDebitVol.focus();
	});
	// tfAeVol.addEventListener('change', function(e) {
		// //Titanium.API.info("You clicked the button");
// 
		// if (tfAeTransactions.value == '') {
// 
			// labAeAt.setText('0');
		// } else {
			// var result = tfAeVol.value / tfAeTransactions.value;
// 
			// labAeAt.setText(result);
		// }
// 
	// });
	tfAeVol.addEventListener('blur', function(e) {
		globalVariables.GV.aeVol = tfAeVol.value;
		var result = globalVariables.GV.aeVol;
		Ti.API.error(result);
		//	tfAeVol.value = result.toFixed(2);
		if (tfAeVol.value == '') {

			tfAeVol.value = '0.00';
		} else {
			var result = parseFloat(tfAeVol.value);
			result = result.toFixed(2);
			tfAeVol.value = result;
			labAeDollarSign.setText('$');
		}
	});

	comboView2.add(tfAeVol);

	//textfield vol3
	var tfDsVol = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		//top : '47%',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '290dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		width : '110dp',
		height : '35dp'
	});
	var labDsDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		zIndex : 1,
		right : '300dp',
		width : '90dp',
		height : '30dp'
	});
	comboView2.add(labDsDollarSign);

	tfDsVol.addEventListener('return', function(e) {
		tfAeVol.focus();
	});
	// tfDsVol.addEventListener('change', function(e) {
		// //Titanium.API.info("You clicked the button");
// 
		// if (tfDebitTransactions.value == '') {
// 
			// labDsAt.setText('0');
		// } else {
			// var result = tfDsVol.value / tfDsTransactions.value;
// 
			// labDsAt.setText(result);
		// }
	// });
	tfDsVol.addEventListener('blur', function(e) {
		globalVariables.GV.dsVol = tfDsVol.value;
		var result = globalVariables.GV.dsVol;
		if (tfDsVol.value == '') {
			tfDsVol.value = '0.00';

		} else {
			var result = parseFloat(tfDsVol.value);
			result = result.toFixed(2);
			tfDsVol.value = result;
			//tfDsVol.value = result.toFixed(2);
			labDsDollarSign.setText('$');
		}
	});
	comboView2.add(tfDsVol);

	//textfield vol4
	var tfMcVol = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		textAlign : 'right',
		color : '#336699',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		//top : '47%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		right : '420dp',
		width : '110dp',
		height : '35dp'
	});
	var labMcDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		zIndex : 1,
		right : '430dp',
		width : '90dp',
		height : '30dp'
	});
	comboView2.add(labMcDollarSign);

	tfMcVol.addEventListener('return', function(e) {
		tfDsVol.focus();
	});
	// tfMcVol.addEventListener('change', function(e) {
		// //Titanium.API.info("You clicked the button");
// 
		// if (tfMcTransactions.value == '') {
// 
			// labMcAt.setText('0');
		// } else {
			// var result = tfMcVol.value / tfMcTransactions.value;
// 
			// labMcAt.setText(result);
		// }
	// });
	tfMcVol.addEventListener('blur', function(e) {
		globalVariables.GV.mcVol = tfMcVol.value;
		if (tfMcVol.value == '') {
			tfMcVol.value = '0.00';

		} else {
			var result = parseFloat(tfMcVol.value);
			result = result.toFixed(2);
			tfMcVol.value = result;

		}
		labMcDollarSign.setText('$');
	});

	comboView2.add(tfMcVol);

	//textfield vol5
	var tfVisaVol = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '47%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		right : '550dp',
		width : '110dp',
		textAlign : 'right',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		height : '35dp'
	});
	var labVisaDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		zIndex : 1,
		right : '560dp',
		width : '90dp',
		height : '30dp'
	});
	comboView2.add(labVisaDollarSign);
	tfVisaVol.addEventListener('return', function(e) {
		tfMcVol.focus();
	});
	// tfVisaVol.addEventListener('change', function(e) {
		// //Titanium.API.info("You clicked the button");
// 
		// if (tfVisaTransactions.value == '') {
// 
			// labVisaAt.setText('0');
		// } else {
			// var result = tfVisaVol.value / tfVisaTransactions.value;
// 
			// labVisaAt.setText(result);
		// }
// 
	// });
	tfVisaVol.addEventListener('blur', function(e) {
		globalVariables.GV.visaVol = tfVisaVol.value;
		if (tfVisaVol.value == '') {

			tfVisaVol.value = '0.00';
		} else {
			var result = parseFloat(tfVisaVol.value);
			result = result.toFixed(2);
			tfVisaVol.value = result;

		}
		labVisaDollarSign.setText('$');
	});

	comboView2.add(tfVisaVol);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var comboView3 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView3);
	//lable T(ransactions

	var labTransactions = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Transactions',
		//top : '60%',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView3.add(labTransactions);
	//textfield transacrion1
	var tfDebitTransactions = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		//hintText: '1',
		//top : '60%',
		right : '30dp',
		width : '110dp',
		//hintText:'1',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		height : '35dp'

	});
	tfDebitTransactions.addEventListener('focus', function(e) {
		//Titanium.API.info("You clicked the button");
			if (tfDebitVol.value == '') {
		 alert.alert('Invalid Value', 'Plz Enter Some Value');
		 } 
	});

	//tfDebitTransactions.addEventListener('change', function(e) {
		//Titanium.API.info("You clicked the button");
		/*	if (tfDebitVol.value == '' || tfDebitTransactions.value == '' || tfDebitTransactions.value == 0) {
		 labDebitAt.setText(tfDebitVol.value);
		 alert.alert('Invalid Value', 'Plz Enter Some Value');
		 } else {
		 var result = tfDebitVol.value / tfDebitTransactions.value;
		 result = result.toFixed(2);
		 labDebitAt.setText('$' + '  ' + result);
		 }*/

	//});

	tfDebitTransactions.addEventListener('return', function(e) {
		tfTotalNewField.focus();
	});

	tfDebitTransactions.addEventListener('blur', function(e) {
		globalVariables.GV.debitTransactions = tfDebitTransactions.value;
		if (tfDebitTransactions.value == '') {
			tfDebitTransactions.value = '0.00';

		} else {
			var result = parseInt(tfDebitTransactions.value);
			tfDebitTransactions.value = result;
		}
	});
	comboView3.add(tfDebitTransactions);
	//textfield transacrion2
	var tfAeTransactions = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '60%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		right : '160dp',
		width : '110dp',
		textAlign : 'right',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		height : '35dp'
	});
	tfAeTransactions.addEventListener('return', function(e) {
		tfDebitTransactions.focus();
	});
	comboView3.add(tfAeTransactions);
	tfAeTransactions.addEventListener('focus', function(e) {
		//Titanium.API.info("You clicked the button");
		if (tfAeVol.value == '') {
			alert.alert('Invalid Value', 'Plz Enter Some Value');
		}
	});

	//tfAeTransactions.addEventListener('change', function(e) {
		/*	if (tfAeVol.value == '' || tfAeTransactions.value == '' || tfAeTransactions.value == 0) {
		 labAeAt.setText(tfAeVol.value);
		 alert.alert('Invalid Value', 'Plz Enter Some Value');
		 } else {
		 var result = tfAeVol.value / tfAeTransactions.value;
		 result = result.toFixed(2);
		 labAeAt.setText('$' + '  ' + result);

		 }*/
	//});

	tfAeTransactions.addEventListener('blur', function(e) {
		globalVariables.GV.aeTransactions = tfAeTransactions.value;
		if (tfAeTransactions.value == '') {
			tfAeTransactions.value = '0.00';

		} else {
			var result = parseInt(tfAeTransactions.value);
			tfAeTransactions.value = result;
		}
	});

	//textfield transacrion3
	var tfDsTransactions = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '60%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '290dp',
		width : '110dp',
		textAlign : 'right',
		height : '35dp'
	});
	tfDsTransactions.addEventListener('return', function(e) {
		tfAeTransactions.focus();
	});
	comboView3.add(tfDsTransactions);
	tfDsTransactions.addEventListener('focus', function(e) {
		//Titanium.API.info("You clicked the button");
		if (tfDsVol.value == '') {

			alert.alert('Invalid Value', 'Plz Enter Some Value');

		}
	});

	// tfDsTransactions.addEventListener('change', function(e) {
		// /*	if (tfDsVol.value == '' || tfDsTransactions.value == '' || tfDsTransactions.value == 0) {
		 // labDsAt.setText(tfDsVol.value);
		 // alert.alert('Invalid Value', 'Plz Enter Some Value');
		 // } else {
		 // var result = tfDsVol.value / tfDsTransactions.value;
		 // result = result.toFixed(2);
		 // labDsAt.setText('$' + '  ' + result);
		 // }
		 // */
	// });

	tfDsTransactions.addEventListener('blur', function(e) {
		globalVariables.GV.dsTransactions = tfDsTransactions.value;
		if (tfDsTransactions.value == '') {
			tfDsTransactions.value = '0.00';
		} else {
			var result = parseInt(tfDsTransactions.value);
			tfDsTransactions.value = result;
		}
	});

	//textfield transacrion4
	var tfMcTransactions = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '60%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '420dp',
		textAlign : 'right',
		width : '110dp',
		height : '35dp'
	});
	tfMcTransactions.addEventListener('return', function(e) {
		tfDsTransactions.focus();
	});
	comboView3.add(tfMcTransactions);

	// tfMcTransactions.addEventListener('change', function(e) {
		// /*	if (tfMcVol.value == '' || tfMcTransactions.value == '' || tfMcTransactions.value == 0) {
		 // labMcAt.setText(tfMcVol.value);
		 // alert.alert('Invalid Value', 'Plz Enter Some Value');
		 // } else {
		 // var result = tfMcVol.value / tfMcTransactions.value;
		 // result = result.toFixed(2);
		 // labMcAt.setText('$' + '  ' + result);
		 // } */
	// });
	tfMcTransactions.addEventListener('focus', function(e) {

		tfMcTransactions.addEventListener('blur', function(e) {
			globalVariables.GV.mcTransactions = tfMcTransactions.value;
			if (tfMcTransactions.value == '') {

				tfMcTransactions.value = '0.00';
			} else {
				var result = parseInt(tfMcTransactions.value);
				tfMcTransactions.value = result;
				//Math.round();
			}
		});
	});
	//textfield transacrion5
	var tfVisaTransactions = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '60%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		right : '550dp',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		width : '110dp',
		textAlign : 'right',
		height : '35dp'
	});
	tfVisaTransactions.addEventListener('return', function(e) {
		tfMcTransactions.focus();
	});
	comboView3.add(tfVisaTransactions);
	tfVisaTransactions.addEventListener('focus', function(e) {
		//Titanium.API.info("You clicked the button");
		if (tfVisaVol.value == '') {
			alert.alert('Invalid Value', 'Plz Enter Some Value');
		}
	});
	// tfVisaTransactions.addEventListener('change', function(e) {
		// /*	if (tfVisaVol.value == '' || tfVisaTransactions.value == '' || tfVisaTransactions.value == 0) {
		 // labVisaAt.setText(tfVisaVol.value);
		 // alert.alert('Invalid Value', 'Plz Enter Some Value');
		 // } else {
		 // var result = tfVisaVol.value / tfVisaTransactions.value;
		 // result = result.toFixed(2);
		 // Ti.API.info(result);
		 // labVisaAt.setText('$' + '  ' + result);
// 
		 // }
		 // */
	// });

	tfVisaTransactions.addEventListener('blur', function(e) {
		globalVariables.GV.visaTransactions = tfVisaTransactions.value;
		if (tfVisaTransactions.value == '') {
			tfVisaTransactions.value = '0.00';

		} else {
			var result = parseInt(tfVisaTransactions.value);
			tfVisaTransactions.value = result;
		}
	});
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var comboView4 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView4);

	//lable AverageTicket

	var labAverageTicket = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Average Ticket',
		//	top : '70%',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView4.add(labAverageTicket);
	//label 1 Avg TIc

	var labDebitAt = Ti.UI.createLabel({
		//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		//	top : '70%',
		right : '35dp',
		width : '115dp',
		height : '35dp'
	});
	
	var labDebitAtDlr = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '125dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex 5
	});
	
	comboView4.add(labDebitAtDlr);
	comboView4.add(labDebitAt);
	//lable2 AverageTicket
	var labAeAt = Ti.UI.createLabel({
		//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		//top : '70%',
		right : '165dp',
		width : '110dp',
		height : '35dp'
	});
	
	var labAeAtDlr = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '255dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex 5
	});
	
	comboView4.add(labAeAtDlr);
	comboView4.add(labAeAt);
	//lable3 AverageTicket
	var labDsAt = Ti.UI.createLabel({
		//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		//top : '70%',
		right : '295dp',
		width : '110dp',
		height : '35dp'
	});
	
	var labDsAtDlr = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '385dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex 5
	});
	
	comboView4.add(labDsAtDlr);
	comboView4.add(labDsAt);

	//lable4 AverageTicket
	var labMcAt = Ti.UI.createLabel({
		//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		//top : '70%',
		right : '425dp',
		width : '110dp',
		height : '35dp'
	});
	
	var labMcAtDlr = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '515dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex 5
	});
	
	comboView4.add(labMcAtDlr);

	comboView4.add(labMcAt);
	//lable5 AverageTicket
	var labVisaAt = Ti.UI.createLabel({
		//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		//top : '70%',
		right : '555dp',
		width : '110dp',
		height : '35dp'
	});
	var labVisaAtDlr = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '645dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex 5
	});
	
	comboView4.add(labVisaAtDlr);
	comboView4.add(labVisaAt);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////////////card fees
	//lable card fees

	/* var labCardFees = Ti.UI.createLabel({
	color : 'White',
	font : {
	fontSize : 30
	},
	text : 'CardFees',
	top : '75%',
	left : '20dp',
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE
	});
	scrollView.add(labCardFees);
	//label 1 CardFees

	var labCardFees1 = Ti.UI.createLabel({
	//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	text : '0.00',
	color : 'white',
	font : {
	fontSize : 30
	},
	top : '75%',

	right : '20dp',
	width : '130dp',
	height : '40dp'
	});

	scrollView.add(labCardFees1);
	//lable2 labCardFees
	var labCardFees2 = Ti.UI.createLabel({
	//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	text : '0.00',
	color : 'white',
	font : {
	fontSize : 30
	},
	top : '75%',

	right : '170dp',
	width : '130dp',
	height : '40dp'
	});

	scrollView.add(labCardFees2);
	//lable3 labCardFees
	var labCardFees3 = Ti.UI.createLabel({
	//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	text : '0.00',
	color : 'white',
	font : {
	fontSize : 30
	},
	top : '75%',

	right : '320dp',
	width : '130dp',
	height : '40dp'
	});
	scrollView.add(labCardFees3);

	//lable4 labCardFees
	var labCardFees4 = Ti.UI.createLabel({
	//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	text : '0.00',
	color : 'white',
	font : {
	fontSize : 30
	},
	top : '75%',

	right : '480dp',
	width : '130dp',
	height : '40dp'
	});

	scrollView.add(labCardFees4);
	//lable5 labCardFees
	var labCardFees5 = Ti.UI.createLabel({
	//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	text : '0.00',
	color : 'white',
	font : {
	fontSize : 30
	},
	top : '75%',

	right : '620dp',
	width : '130dp',
	height : '40dp'
	});

	scrollView.add(labCardFees5);*/

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var comboView5 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView5);

	///////// total new fee
	var labTotalNewFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Total Current Fees',
		//top : '82%',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	comboView5.add(labTotalNewFee);
	////txt field

	var tfTotalNewField = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '82%',
		//hintText : 'jkljk',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		left : '260dp',
		textAlign : 'right',
		width : '350dp',
		height : '35'
	});
	var labToalNewFieldDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		zIndex : 1,
		textAlign : 'right',
		left : '200dp',
		width : '90dp',
		height : '30dp'
	});
	comboView5.add(labToalNewFieldDollarSign);
	tfTotalNewField.addEventListener('return', function(e) {

		tfVisaVol.focus();
	});

	//tfTotalNewField.addEventListener('change', function(e) {

		// var a = parseFloat(tfDebitVol.value);
		// var b = parseFloat(tfAeVol.value);
		// var c = parseFloat(tfDsVol.value);
		// var d = parseFloat(tfMcVol.value);
		// var e = parseFloat(tfVisaVol.value);
// 
		// var sum = a + b + c + d + e;
		// var result = (tfTotalNewField.value / sum) * 100;
		// result = result.toFixed(2);
		// globalVariables.GV.CurrentEffectiveRate = result;
		// labCurrentEffectiveRate1.setText(result + ' ' + '%');
		// labToalNewFieldDollarSign.setText('$');
	//});

	tfTotalNewField.addEventListener('blur', function(e) {
		if (tfTotalNewField.value == '') {
			tfTotalNewField.value = '0.00';
			globalVariables.GV.TotalCurrentFees = tfTotalNewField.value;
		} else {
			var result = parseFloat(tfTotalNewField.value);
			result = result.toFixed(2);
			tfTotalNewField.value = result;
			globalVariables.GV.TotalCurrentFees = result;
		}
		
	});

	comboView5.add(tfTotalNewField);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var comboView6 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView6);

	///////// new active rate
	var labCurrentEffectiveRate = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Current Effective Rate',
		//top : '92%',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView6.add(labCurrentEffectiveRate);

	///labCurrentEffectiveRate
	var labCurrentEffectiveRate1 = Ti.UI.createLabel({
		//	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		text : '0.00',
		color : 'white',
		font : {
			fontSize : 25
		},
		//top : '92%',

		right : '400dp',
		width : '130dp',
		height : '40dp'
	});

	comboView6.add(labCurrentEffectiveRate1);
	//////////dollar image view
	var imageCal = Ti.UI.createImageView({
		image : '/images/iconCalculator.png',
		top : '70%',
		right : '65dp',
		height : '150dp',
		width : '150dp'
	});
	imageCal.addEventListener('click', function(e) {
		
		////////////// CALCULATE AVERAGE TICKET  ////////////////////////
		if (tfDebitVol.value == '' || tfDebitTransactions.value == '' || tfDebitTransactions.value == 0) {
			tfDebitVol.value="0.00";
			labDebitDollarSign.setText('$');
			tfDebitTransactions.value=0;
			labDebitAt.setText(tfDebitVol.value);
			//alert.alert('Invalid Value', 'Plz Enter Some Value');
		} else {
			var result = tfDebitVol.value / tfDebitTransactions.value;
			result = result.toFixed(2);
			labDebitAt.setText(result);
		}
		if (tfAeVol.value == '' || tfAeTransactions.value == '' || tfAeTransactions.value == 0) {
			tfAeVol.value = "0.00";
			labAeDollarSign.setText('$');
			tfAeTransactions.value = 0;
			labAeAt.setText(tfAeVol.value);
			//alert.alert('Invalid Value', 'Plz Enter Some Value');
		} else {
			var result = tfAeVol.value / tfAeTransactions.value;
			result = result.toFixed(2);
			labAeAt.setText(result);

		}

		if (tfDsVol.value == '' || tfDsTransactions.value == '' || tfDsTransactions.value == 0) {
			tfDsVol.value = "0.00";
			labDsDollarSign.setText('$');
			tfDsTransactions.value = 0;
			labDsAt.setText(tfDsVol.value);
			//alert.alert('Invalid Value', 'Plz Enter Some Value');
		} else {
			var result = tfDsVol.value / tfDsTransactions.value;
			result = result.toFixed(2);
			labDsAt.setText(result);
		}

		if (tfMcVol.value == '' || tfMcTransactions.value == '' || tfMcTransactions.value == 0) {
			tfMcVol.value = "0.00";
			labMcDollarSign.setText('$');
			tfMcTransactions.value = 0;
			labMcAt.setText(tfMcVol.value);
			//alert.alert('Invalid Value', 'Plz Enter Some Value');
		} else {
			var result = tfMcVol.value / tfMcTransactions.value;
			result = result.toFixed(2);
			labMcAt.setText(result);
		}

		if (tfVisaVol.value == '' || tfVisaTransactions.value == '' || tfVisaTransactions.value == 0) {
			tfVisaVol.value = "0.00";
			labVisaDollarSign.setText('$');
			tfVisaTransactions.value = 0;
			labVisaAt.setText(tfVisaVol.value);
			//alert.alert('Invalid Value', 'Plz Enter Some Value');
		} else {
			var result = tfVisaVol.value / tfVisaTransactions.value;
			result = result.toFixed(2);
			Ti.API.info(result);
			labVisaAt.setText(result);//'$' + '  ' + result);

		}
		
		////////////// CALCULATE CURRENT EFFECTIVE RATE  ////////////////////////
		var a = parseFloat(tfDebitVol.value);
		var b = parseFloat(tfAeVol.value);
		var c = parseFloat(tfDsVol.value);
		var d = parseFloat(tfMcVol.value);
		var e = parseFloat(tfVisaVol.value);

		var sum = a + b + c + d + e;
		var result = (tfTotalNewField.value / sum) * 100;
		result = result.toFixed(2);
		globalVariables.GV.CurrentEffectiveRate = result;
		labCurrentEffectiveRate1.setText(result + ' ' + '%');
		labToalNewFieldDollarSign.setText('$');
		
		
		/*
		var resultATDebit = parseFloat(labDebitAt.getText());
		resultATDebit = resultATDebit.toFixed(2);
		labDebitAt.setText(resultATDebit);

		var resultATae = parseFloat(labAeAt.getText());
		resultATae = resultATae.toFixed(2);
		labAeAt.setText(resultATae);

		var resultATds = parseFloat(labDsAt.getText());
		resultATds = resultATds.toFixed(2);
		labDsAt.setText(resultATae);
		var resultATmc = parseFloat(labMcAt.getText());
		resultATmc = resultATmc.toFixed(2);
		labMcAt.setText(resultATmc);

		var resultATvisa = parseFloat(labVisaAt.getText());
		resultATvisa = resultATvisa.toFixed(2);
		labVisaAt.setText(resultATvisa);

		*/
		//	globalVariables.GV.TotalNewField = labTotalNewField.getText();
		globalVariables.GV.debitAverageTicket = labDebitAt.getText();
		globalVariables.GV.aeAverageTicket = labAeAt.getText();
		globalVariables.GV.dsAverageTicket = labDsAt.getText();
		globalVariables.GV.mcAverageTicket = labMcAt.getText();
		globalVariables.GV.visaAverageTicket = labVisaAt.getText();
		
		globalVariables.GV.debitVol = tfDebitVol.value;
		globalVariables.GV.aeVol = tfAeVol.value;
		globalVariables.GV.dsVol = tfDsVol.value;
		globalVariables.GV.mcVol = tfMcVol.value;
		globalVariables.GV.visaVol = tfVisaVol.value;
		
		globalVariables.GV.debitTransactions = tfDebitTransactions.value;
		globalVariables.GV.aeTransactions = tfAeTransactions.value;
		globalVariables.GV.dsTransactions = tfDsTransactions.value;
		globalVariables.GV.mcTransactions = tfMcTransactions.value;
		globalVariables.GV.visaTransactions = tfVisaTransactions.value;
		// globalVariables.GV.visaVol
		// = labCurrentEffectiveRate1.getText();
	});

	self.add(imageCal);
	
	Ti.App.addEventListener('fillCSInfo', function(e){
		if(!e.initialize){
		tfVisaVol.value = parseFloat(globalVariables.GV.visaVol).toFixed(2);
		labVisaDollarSign.setText('$');
		tfMcVol.value = parseFloat(globalVariables.GV.mcVol).toFixed(2);
		labMcDollarSign.setText('$');
		tfDsVol.value = parseFloat(globalVariables.GV.dsVol).toFixed(2);
		labDsDollarSign.setText('$');
		tfAeVol.value = parseFloat(globalVariables.GV.aeVol).toFixed(2);
		labAeDollarSign.setText('$');
		tfDebitVol.value = parseFloat(globalVariables.GV.debitVol).toFixed(2);
		labDebitDollarSign.setText('$');
		
		tfVisaTransactions.value = globalVariables.GV.visaTransactions;
		tfMcTransactions.value = globalVariables.GV.mcTransactions;
		tfDsTransactions.value = globalVariables.GV.dsTransactions;
		tfAeTransactions.value = globalVariables.GV.aeTransactions;
		tfDebitTransactions.value = globalVariables.GV.debitTransactions;
		
		labVisaAt.setText(parseFloat(globalVariables.GV.visaAverageTicket).toFixed(2));
		labMcAt.setText(parseFloat(globalVariables.GV.mcAverageTicket).toFixed(2));
		labDsAt.setText(parseFloat(globalVariables.GV.dsAverageTicket).toFixed(2));
		labAeAt.setText(parseFloat(globalVariables.GV.aeAverageTicket).toFixed(2));
		labDebitAt.setText(parseFloat(globalVariables.GV.debitAverageTicket).toFixed(2));
		
		tfTotalNewField.value = parseFloat(globalVariables.GV.TotalCurrentFees).toFixed(2);
		labToalNewFieldDollarSign.setText('$');
		labCurrentEffectiveRate1.setText(parseFloat(globalVariables.GV.CurrentEffectiveRate).toFixed(2)+' %');
		}
		else{
			tfVisaVol.value ="";
			labVisaDollarSign.setText('');
			tfMcVol.value = "";
			labMcDollarSign.setText('');
			tfDsVol.value = "";
			labDsDollarSign.setText('');
			tfAeVol.value = "";
			labAeDollarSign.setText('');
			tfDebitVol.value = "";
			labDebitDollarSign.setText('');
			
			tfVisaTransactions.value = "";
			tfMcTransactions.value = "";
			tfDsTransactions.value = "";
			tfAeTransactions.value = "";
			tfDebitTransactions.value = "";
			
			labVisaAt.setText("");
			labMcAt.setText("");
			labDsAt.setText("");
			labAeAt.setText("");
			labDebitAt.setText("");
			
			tfTotalNewField.value = "";
			labToalNewFieldDollarSign.setText('');
			labCurrentEffectiveRate1.setText("");
		}
		
	});
	return self;

};
