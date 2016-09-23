var globalVariables = require('globalVariables');
var alert = require('lib/alert');
var utility = require('lib/utilities');

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
	///////// CARD ICONS ROW
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//1st image view debit
	var comboView1 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
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
		right : '160dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageAmericanExpress);
	
	//discover
	var imageAmericanExpress = Ti.UI.createImageView({
		image : '/images/iconDiscover.png',
		right : '290dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageAmericanExpress);
	
	//master card
	var imageMasterCard = Ti.UI.createImageView({
		image : '/images/iconMasterCard.png',
		right : '420dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageMasterCard);
	
	//visa
	var imageVisa = Ti.UI.createImageView({
		image : '/images/iconVisa.png',
		right : '550dp',
		height : '60dp',
		width : '110dp'
	});
	comboView1.add(imageVisa);
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////// VOLUME ROW
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var comboView2 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
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
		height : '35dp',
		tintColor: 'black'
	});
	
	comboView2.add(tfDebitVol);
	
	tfDebitVol.addEventListener('blur', function(e) {
		if(tfDebitVol.value.indexOf("$")>=0)
		{
		    var step1 = tfDebitVol.value.replace(",",'');
            globalVariables.GV.debitVol = parseFloat(step1.replace("$ ",'')).toFixed(2);
		}
		else if(tfDebitVol.value =='')
        {
            tfDebitVol.value = utility.formatCurrency(0,"$");
            globalVariables.GV.debitVol = 0.00;
        }
        else{
            globalVariables.GV.debitVol = parseFloat(tfDebitVol.value).toFixed(2);
            tfDebitVol.value = utility.formatCurrency(tfDebitVol.value,"$");
        }
		
	});

	tfDebitVol.addEventListener('return', function(e) {
		tfVisaTransactions.focus();
	});
	
	tfDebitVol.addEventListener('focus',function(e){
	    var step1 = tfDebitVol.value.replace(",",'');
	    tfDebitVol.value = step1.replace("$ ",'');
	});

	//textfield AE Vol
	var tfAeVol = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		//top : '47%',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		right : '160dp',
		width : '110dp',
		height : '35dp',
		tintColor: 'black'
	});
	
	tfAeVol.addEventListener('return', function(e) {
		tfDebitVol.focus();
	});
	
	tfAeVol.addEventListener('focus',function(e){
        var step1 = tfAeVol.value.replace(",",'');
        tfAeVol.value = step1.replace("$ ",'');
    });
    
	tfAeVol.addEventListener('blur', function(e) {
		if(tfAeVol.value.indexOf("$")>=0)
        {
            var step1 = tfAeVol.value.replace(",",'');
            globalVariables.GV.aeVol = step1.replace("$ ",'');
        }
        else if(tfAeVol.value =='')
        {
            tfAeVol.value = utility.formatCurrency(0,"$");
            globalVariables.GV.aeVol = 0.00;
        }
        else{
            globalVariables.GV.aeVol = parseFloat(tfAeVol.value).toFixed(2);
            tfAeVol.value = utility.formatCurrency(tfAeVol.value,"$");
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
		height : '35dp',
		tintColor: 'black'
	});
	
	
	tfDsVol.addEventListener('return', function(e) {
		tfAeVol.focus();
	});
	
	tfDsVol.addEventListener('focus',function(e){
        var step1 = tfDsVol.value.replace(",",'');
        tfDsVol.value = step1.replace("$ ",'');
    });
    
	
	tfDsVol.addEventListener('blur', function(e) {
		if(tfDsVol.value.indexOf("$")>=0)
        {
            var step1 = tfDsVol.value.replace(",",'');
            globalVariables.GV.dsVol = step1.replace("$ ",'');
        }
        else if(tfDsVol.value =='')
        {
            tfDsVol.value = utility.formatCurrency(0,"$");
            globalVariables.GV.dsVol = 0.00;
        }
        else{
            globalVariables.GV.dsVol = parseFloat(tfDsVol.value).toFixed(2);
            tfDsVol.value = utility.formatCurrency(tfDsVol.value,"$");
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
		height : '35dp',
		tintColor: 'black'
	});
	
	tfMcVol.addEventListener('return', function(e) {
		tfDsVol.focus();
	});
	
	tfMcVol.addEventListener('focus',function(e){
        var step1 = tfMcVol.value.replace(",",'');
        tfMcVol.value = step1.replace("$ ",'');
    });
	
	tfMcVol.addEventListener('blur', function(e) {
		if(tfMcVol.value.indexOf("$")>=0)
        {
            var step1 = tfMcVol.value.replace(",",'');
            globalVariables.GV.mcVol = parseFloat(step1.replace("$ ",'')).toFixed(2);
        }
        else if(tfMcVol.value =='')
        {
            tfMcVol.value = utility.formatCurrency(0,"$");
            globalVariables.GV.mcVol = 0.00;
        }
        else{
            globalVariables.GV.mcVol = parseFloat(tfMcVol.value).toFixed(2);
            tfMcVol.value = utility.formatCurrency(tfMcVol.value,"$");
        }   
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
		height : '35dp',
		tintColor: 'black'
	});
	
	tfVisaVol.addEventListener('return', function(e) {
		tfMcVol.focus();
	});
	
	tfVisaVol.addEventListener('focus',function(e){
        var step1 = tfVisaVol.value.replace(",",'');
        tfVisaVol.value = step1.replace("$ ",'');
    });
	
	
	tfVisaVol.addEventListener('blur', function(e) {
		if(tfVisaVol.value.indexOf("$")>=0)
        {
            var step1 = tfVisaVol.value.replace(",",'');
            globalVariables.GV.visaVol = step1.replace("$ ",'');
        }
        else if(tfVisaVol.value =='')
        {
            tfVisaVol.value = utility.formatCurrency(0,"$");
            globalVariables.GV.visaVol = 0.00;
        }
        else{
            globalVariables.GV.visaVol = parseFloat(tfVisaVol.value).toFixed(2);
            tfVisaVol.value = utility.formatCurrency(tfVisaVol.value,"$");
        }
	});

	comboView2.add(tfVisaVol);
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////  TRANSACTIONS TEXT FIELDS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var comboView3 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
	});
	scrollView.add(comboView3);
	
	//lable Transactions

	var labTransactions = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Transactions',
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
		right : '30dp',
		width : '110dp',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		height : '35dp',
		tintColor: 'black'

	});
	// tfDebitTransactions.addEventListener('focus', function(e) {
	   // if (tfDebitVol.value == '') {
	       // alert.alert('Invalid Volume', 'Please enter a value for Debit Volume.');
	   // } 
	// });

	tfDebitTransactions.addEventListener('return', function(e) {
		tfTotalNewField.focus();
	});

	tfDebitTransactions.addEventListener('blur', function(e) {
		if (tfDebitTransactions.value == '') {
			tfDebitTransactions.value = '0.00';
		}
		globalVariables.GV.debitTransactions = parseInt(tfDebitTransactions.value);
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
		height : '35dp',
		tintColor: 'black'
	});
	tfAeTransactions.addEventListener('return', function(e) {
		tfDebitTransactions.focus();
	});
	comboView3.add(tfAeTransactions);
	// tfAeTransactions.addEventListener('focus', function(e) {
		// //Titanium.API.info("You clicked the button");
		// if (tfAeVol.value == '') {
			// alert.alert('Invalid Value', 'Plz Enter Some Value');
		// }
	// });

	tfAeTransactions.addEventListener('blur', function(e) {
		
		if (tfAeTransactions.value == '') {
			tfAeTransactions.value = '0.00';

		}
		globalVariables.GV.aeTransactions = parseInt(tfAeTransactions.value);
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
		height : '35dp',
		tintColor: 'black'
	});
	tfDsTransactions.addEventListener('return', function(e) {
		tfAeTransactions.focus();
	});
	comboView3.add(tfDsTransactions);
	// tfDsTransactions.addEventListener('focus', function(e) {
		// //Titanium.API.info("You clicked the button");
		// if (tfDsVol.value == '') {
// 
			// alert.alert('Invalid Value', 'Plz Enter Some Value');
// 
		// }
	// });

	tfDsTransactions.addEventListener('blur', function(e) {
		
		if (tfDsTransactions.value == '') {
			tfDsTransactions.value = '0.00';
		}
		
		globalVariables.GV.dsTransactions = parseInt(tfDsTransactions.value);
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
		height : '35dp',
		tintColor: 'black'
	});
	tfMcTransactions.addEventListener('return', function(e) {
		tfDsTransactions.focus();
	});
	comboView3.add(tfMcTransactions);

	
	// tfMcTransactions.addEventListener('focus', function(e) {
		// if (tfDsVol.value == '') {
			// alert.alert('Invalid Value', 'Plz Enter Some Value');
		// }
	// });
	
	tfMcTransactions.addEventListener('blur', function(e) {
		
		if (tfMcTransactions.value == '') {

			tfMcTransactions.value = '0.00';
		}
		globalVariables.GV.mcTransactions = parseInt(tfMcTransactions.value);
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
		height : '35dp',
		tintColor: 'black'
	});
	tfVisaTransactions.addEventListener('return', function(e) {
		tfMcTransactions.focus();
	});
	comboView3.add(tfVisaTransactions);
	// tfVisaTransactions.addEventListener('focus', function(e) {
		// //Titanium.API.info("You clicked the button");
		// if (tfVisaVol.value == '') {
			// alert.alert('Invalid Value', 'Plz Enter Some Value');
		// }
	// });
	

	tfVisaTransactions.addEventListener('blur', function(e) {
		if (tfVisaTransactions.value == '') {
			tfVisaTransactions.value = '0.00';

		} 
		globalVariables.GV.visaTransactions = parseInt(tfVisaTransactions.value);
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
		right : '165dp',
		width : '110dp',
		height : '35dp'
	});
	
	comboView4.add(labAeAt);
	//lable3 AverageTicket
	var labDsAt = Ti.UI.createLabel({
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		right : '295dp',
		width : '110dp',
		height : '35dp'
	});
	
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
	
	comboView4.add(labMcAt);
	//lable5 AverageTicket
	var labVisaAt = Ti.UI.createLabel({
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		right : '555dp',
		width : '110dp',
		height : '35dp'
	});
	
	comboView4.add(labVisaAt);
	
	var comboView5 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
	});
	scrollView.add(comboView5);

	///////// total new fee
	var labTotalNewFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Total Current Fees',
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
		height : '35',
		tintColor: 'black'
	});
	
	tfTotalNewField.addEventListener('return', function(e) {
		tfVisaVol.focus();
	});

	tfTotalNewField.addEventListener("focus", function(e){
	    var step1 = tfTotalNewField.value.replace(",",'');
        tfTotalNewField.value = step1.replace("$ ",'');
	});
	
	
	tfTotalNewField.addEventListener('blur', function(e) {
		if(tfTotalNewField.value.indexOf("$")>=0)
        {
            var step1 = tfTotalNewField.value.replace(",",'');
            globalVariables.GV.TotalCurrentFees = parseFloat(step1.replace("$ ",'')).toFixed(2);
        }
        else if(tfTotalNewField.value =='')
        {
            tfTotalNewField.value = utility.formatCurrency(0,"$");
            globalVariables.GV.TotalCurrentFees = 0.00;
        }
        else{
            globalVariables.GV.TotalCurrentFees = parseFloat(tfTotalNewField.value).toFixed(2);
            tfTotalNewField.value = utility.formatCurrency(tfTotalNewField.value,"$");
        }
		
	});

	comboView5.add(tfTotalNewField);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var comboView6 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
	});
	scrollView.add(comboView6);

	///////// new active rate
	var labCurrentEffectiveRate = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Current Effective Rate',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView6.add(labCurrentEffectiveRate);

	///labCurrentEffectiveRate
	var labCurrentEffectiveRate1 = Ti.UI.createLabel({
		text : '0.00',
		color : 'white',
		font : {
			fontSize : 25
		},

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
			tfDebitVol.value = utility.formatCurrency(0,"$");
			tfDebitTransactions.value=0;
			labDebitAt.setText(tfDebitVol.value);
			globalVariables.GV.debitAverageTicket=0.00;
		} else {
			
			globalVariables.GV.debitAverageTicket = globalVariables.GV.debitVol / globalVariables.GV.debitTransactions;
			var result = utility.formatCurrency(globalVariables.GV.debitAverageTicket,"$");//result.toFixed(2);
			labDebitAt.setText(result);
			result=null;
		}
		if (tfAeVol.value == '' || tfAeTransactions.value == '' || tfAeTransactions.value == 0) {
			tfAeVol.value = utility.formatCurrency(0,"$");
			tfAeTransactions.value = 0;
			labAeAt.setText(tfAeVol.value);
			globalVariables.GV.aeAverageTicket=0.00;
		} else {
			globalVariables.GV.aeAverageTicket = globalVariables.GV.aeVol / globalVariables.GV.aeTransactions;
			var result = utility.formatCurrency(globalVariables.GV.aeAverageTicket,"$");
			labAeAt.setText(result);
            result=null;
		}

		if (tfDsVol.value == '' || tfDsTransactions.value == '' || tfDsTransactions.value == 0) {
			tfDsVol.value = utility.formatCurrency(0,"$");
			tfDsTransactions.value = 0;
			labDsAt.setText(tfDsVol.value);
			globalVariables.GV.dsAverageTicket=0.00;
		} else {
			globalVariables.GV.dsAverageTicket = globalVariables.GV.dsVol/globalVariables.GV.dsTransactions;
			var result = utility.formatCurrency(globalVariables.GV.dsAverageTicket, "$");
			labDsAt.setText(result);
			result=null;
		}

		if (tfMcVol.value == '' || tfMcTransactions.value == '' || tfMcTransactions.value == 0) {
			tfMcVol.value = utility.formatCurrency(0,"$");
			tfMcTransactions.value = 0;
			labMcAt.setText(tfMcVol.value);
			globalVariables.GV.mcAverageTicket=0.00;
		} else {
			globalVariables.GV.mcAverageTicket = globalVariables.GV.mcVol / globalVariables.GV.mcTransactions;
			//var result = tfMcVol.value / tfMcTransactions.value;
			var result = utility.formatCurrency(globalVariables.GV.mcAverageTicket, "$");
			labMcAt.setText(result);
			result=null;
		}

		if (tfVisaVol.value == '' || tfVisaTransactions.value == '' || tfVisaTransactions.value == 0) {
			tfVisaVol.value = utility.formatCurrency(0,"$");//"0.00";
			//labVisaDollarSign.setText('$');
			tfVisaTransactions.value = 0;
			labVisaAt.setText(tfVisaVol.value);
			globalVariables.GV.visaAverageTicket=0.00;
			//alert.alert('Invalid Value', 'Plz Enter Some Value');
		} else {
			globalVariables.GV.visaAverageTicket = globalVariables.GV.visaVol / globalVariables.GV.visaTransactions;
			//var result = tfVisaVol.value / tfVisaTransactions.value;
			var result = utility.formatCurrency(globalVariables.GV.visaAverageTicket, "$");
			labVisaAt.setText(result);
			result = null;
		}
		
		////////////// CALCULATE CURRENT EFFECTIVE RATE  ////////////////////////
		var a = parseFloat(globalVariables.GV.debitVol);
		var b = parseFloat(globalVariables.GV.aeVol);
		var c = parseFloat(globalVariables.GV.dsVol);
		var d = parseFloat(globalVariables.GV.mcVol);
		var e = parseFloat(globalVariables.GV.visaVol);

		var sum = a + b + c + d + e;
		globalVariables.GV.CurrentEffectiveRate = parseFloat((globalVariables.GV.TotalCurrentFees / sum) * 100).toFixed(2);
		labCurrentEffectiveRate1.setText(globalVariables.GV.CurrentEffectiveRate + ' ' + '%');
		a=b=c=d=e=null;
		
	});

	self.add(imageCal);
	
	Ti.App.addEventListener('fillCSInfo', function(e){
		if(!e.initialize){
		tfVisaVol.value = utility.formatCurrency(parseFloat(globalVariables.GV.visaVol).toFixed(2),"$");
		tfMcVol.value = utility.formatCurrency(parseFloat(globalVariables.GV.mcVol).toFixed(2),"$");
		tfDsVol.value = utility.formatCurrency(parseFloat(globalVariables.GV.dsVol).toFixed(2),"$");
		tfAeVol.value = utility.formatCurrency(parseFloat(globalVariables.GV.aeVol).toFixed(2),"$");
		var dbVol = parseFloat(globalVariables.GV.debitVol).toFixed(2);
		tfDebitVol.value = utility.formatCurrency(dbVol,"$");
		dbVol=null;
		                                                                                                                                                                                                                                                                                                                                                                                                                              
		tfVisaTransactions.value = globalVariables.GV.visaTransactions;
		tfMcTransactions.value = globalVariables.GV.mcTransactions;
		tfDsTransactions.value = globalVariables.GV.dsTransactions;
		tfAeTransactions.value = globalVariables.GV.aeTransactions;
		tfDebitTransactions.value = globalVariables.GV.debitTransactions;
		
		var visaAt = utility.formatCurrency(parseFloat(globalVariables.GV.visaAverageTicket).toFixed(2),"$");
		labVisaAt.setText(visaAt);
		visaAt=null;
		var mcAt = utility.formatCurrency(parseFloat(globalVariables.GV.mcAverageTicket).toFixed(2),"$");
		labMcAt.setText(mcAt);
		mcAt=null;
		var dsAt = utility.formatCurrency(parseFloat(globalVariables.GV.dsAverageTicket).toFixed(2),"$");
		labDsAt.setText(dsAt);
		dsAt = null;
		var aeAt = utility.formatCurrency(parseFloat(globalVariables.GV.aeAverageTicket).toFixed(2),"$");
		labAeAt.setText(aeAt);
		aeAt=null;
		var debitAt = utility.formatCurrency(parseFloat(globalVariables.GV.debitAverageTicket).toFixed(2),"$");
		labDebitAt.setText(debitAt);
		debitAt=null;
		
		tfTotalNewField.value = utility.formatCurrency(globalVariables.GV.TotalCurrentFees,"$");
		labCurrentEffectiveRate1.setText(parseFloat(globalVariables.GV.CurrentEffectiveRate).toFixed(2)+' %');
		}
		else{
			tfVisaVol.value ="";
			
			tfMcVol.value = "";
			
			tfDsVol.value = "";
			
			tfAeVol.value = "";
			
			tfDebitVol.value = "";
			
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
			labCurrentEffectiveRate1.setText("");
		}
		
	});
	return self;

};
