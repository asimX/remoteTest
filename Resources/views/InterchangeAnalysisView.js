var acs = require('lib/acs');
var globalVariables = require('globalVariables');
exports.InterchangeAnalysis = function() {
	var globalPfDebit;
	var globalPfae;
	var globalPfds;
	var globalPfmc;
	var globalPfVisa;
	var self = Ti.UI.createView({
		backgroundColor : 'black',
		backgroundImage : 'images/iconGradientBG.png',
		width : '93%',
		height : Ti.UI.FILL,
		top : '2%'
	});
	globalVariables.GV.tfInterFeeChange = false;
	var visaInterfee,
	mcInterfee,
	dsInterfee,
	aeInterfee,
	debitInterfee = null;
	
	self.addEventListener('click', function() {

		//alert(labTotalNewField.setText());

		/*	tfDebitInterFee.value = globalVariables.GV.debitInterchangeFee;
		 tfAeInterFee.value = globalVariables.GV.aeInterchangeFee;
		 tfDsInterFee.value = globalVariables.GV.dsInterchangeFee;
		 tfMcInterFee.value = globalVariables.GV.mcInterchangeFee;
		 tfVisaInterFee.value = globalVariables.GV.visaInterchangeFee;
		 labDebitProcFees.setText(globalVariables.GV.debitProcessingFee);
		 labAeProcFees.setText(globalVariables.GV.aeProcessingFee);
		 labDsProcFees.setText(globalVariables.GV.dsProcessingFee);
		 labMcProcFees.setText(globalVariables.GV.mcProcessingFee);
		 labVisaProcFees.setText(globalVariables.GV.visaProcessingFee);
		 labDebitCardFees.setText(globalVariables.GV.debitCardFee);
		 labAeCardFees.setText(globalVariables.GV.aeCardFee);
		 labDsCardFees.setText(globalVariables.GV.dsCardFee);
		 labMcCardFees.setText(globalVariables.GV.mcCardFee);
		 labVisaCardFees.setText(globalVariables.GV.visaCardFee);
		 labTotalNewField.setText(globalVariables.GV.TotalNewFees);
		 labNewEffectiveRate1.setText(globalVariables.GV.NewEffectiveRate);
		 */
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
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var label1 = Ti.UI.createLabel({
		color : '#e5e7e6',
		font : {
			fontSize : '34dp',
			fontFamily : 'GillSans-Light'
		},
		text : 'INTERCHANGE ANALYSIS',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : "25dp",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	scrollView.add(label1);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var comboView1 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView1);
	//1st image view debit
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
		//	top : '23%',
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

	var comboView = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//layout: 'horizontal'
	});
	scrollView.add(comboView);
	//lable Interchange Fee
	var labInterchangeFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : '~Interchange Fees',
		//top : '48%',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView.add(labInterchangeFee);
	//textfield InterchangeFee1
	var tfDebitInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '47%',
		textAlign : 'right',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '30dp',
		width : '110dp',
		height : '35dp'
	});
	var labDebitDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		//zIndex : 1,
		//textAlign : 'right',
		right : '40dp',
		width : '90dp',
		height : '30dp'
	});
	
	tfDebitInterFee.addEventListener('return', function(e) {
		//	tfTotalNewField.focus();
	});
	tfDebitInterFee.addEventListener('change', function(e) {
		//Ti.API.error('I am working');
		if(debitInterfee != tfDebitInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});

	comboView.add(tfDebitInterFee);
	comboView.add(labDebitDollarSign);
	//textfield InterchangeFee2
	var tfAeInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		///top : '47%',
		textAlign : 'right',
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
		//zIndex : 1,
		//textAlign : 'right',
		right : '170dp',
		width : '90dp',
		height : '30dp'
	});
	
	tfAeInterFee.addEventListener('return', function(e) {
		tfDebitInterFee.focus();
	});
	tfAeInterFee.addEventListener('change', function(e) {
		if(aeInterfee != tfAeInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});
	comboView.add(tfAeInterFee);
	comboView.add(labAeDollarSign);

	//textfield InterchangeFee3
	var tfDsInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '47%',
		textAlign : 'right',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '290dp',
		width : '110dp',
		height : '35dp'
	});
	var labDsDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		//zIndex : 1,
		//textAlign : 'right',
		right : '300dp',
		width : '90dp',
		height : '30dp'
	});

	tfDsInterFee.addEventListener('return', function(e) {
		tfAeInterFee.focus();
	});
	tfDsInterFee.addEventListener('change', function(e) {
		if(dsInterfee != tfDsInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});

	comboView.add(tfDsInterFee);
	comboView.add(labDsDollarSign);
	
	//textfield InterchangeFee4
	var tfMcInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		///top : '47%',
		textAlign : 'right',
		returnKeyType : ~Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
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
		//zIndex : 1,
		//textAlign : 'right',
		right : '430dp',
		width : '90dp',
		height : '30dp'
	});

	tfMcInterFee.addEventListener('return', function(e) {
		tfDsInterFee.focus();
	});
	tfMcInterFee.addEventListener('change', function(e) {
		if(mcInterfee != tfMcInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});

	comboView.add(tfMcInterFee);
	comboView.add(labMcDollarSign);

	//textfield InterchangeFee5
	var tfVisaInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		//top : '47%',
		textAlign : 'right',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '550dp',
		width : '110dp',
		height : '35dp'
	});
	var labVisaDollarSign = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontSize : 18
		},
		text : '',
		//zIndex : 1,
		//textAlign : 'right',
		right : '560dp',
		width : '90dp',
		height : '30dp'
	});
	
	tfVisaInterFee.addEventListener('return', function(e) {
		tfMcInterFee.focus();
	});
	tfVisaInterFee.addEventListener('change', function(e) {
		if(visaInterfee != tfVisaInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});
	
	comboView.add(tfVisaInterFee);
	comboView.add(labVisaDollarSign);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var comboView2 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : 30,
		//layout : 'horizontal',
		//backgroundColor : 'black'
	});
	scrollView.add(comboView2);
	//lable ProcessingFeess

	var labProcessingFees = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Processing Fees',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView2.add(labProcessingFees);
	var labVisaProcFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '645dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex: 5
	});

	comboView2.add(labVisaProcFees$);
	//lable5 ProcessingFees

	var labVisaProcFees = Ti.UI.createLabel({
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

	comboView2.add(labVisaProcFees);
	//lable4 ProcessingFees

	var labMcProcFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '515dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex: 5
	});

	comboView2.add(labMcProcFees$);

	var labMcProcFees = Ti.UI.createLabel({
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

	comboView2.add(labMcProcFees);

	//lable3 ProcessingFees

	var labDsProcFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '385dp',
		width: Ti.UI.SIZE,
		height: '35dp'
	});

	comboView2.add(labDsProcFees$);

	var labDsProcFees = Ti.UI.createLabel({
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

	comboView2.add(labDsProcFees);

	//lable2 ProcessingFees

	var labAeProcFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '255dp',
		width: Ti.UI.SIZE,
		height: '35dp'

	});

	comboView2.add(labAeProcFees$);

	var labAeProcFees = Ti.UI.createLabel({
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

	comboView2.add(labAeProcFees);

	//label 1 processing Fee

	var labDebitProcFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '125dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex: 5
	});

	comboView2.add(labDebitProcFees$);

	var labDebitProcFees = Ti.UI.createLabel({
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

	comboView2.add(labDebitProcFees);

	///////////////////card fees View
	var comboView3 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : 30
	});
	scrollView.add(comboView3);

	//lable card fees

	var labCardFees = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'CardFees',
		left : '20dp',
		width : 160,
		height : Ti.UI.SIZE
	});
	comboView3.add(labCardFees);

	//lable5 labCardFees

	var labVisaCardFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '645dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex: 5
	});

	comboView3.add(labVisaCardFees$);

	var labVisaCardFees = Ti.UI.createLabel({
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

	comboView3.add(labVisaCardFees);

	//lable4 labCardFees

	var labMcCardFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '515dp',
		width: Ti.UI.SIZE,
		height: '35dp',
		//zIndex: 5
	});

	comboView3.add(labMcCardFees$);

	var labMcCardFees = Ti.UI.createLabel({
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

	comboView3.add(labMcCardFees);

	//lable3 labCardFees

	var labDsCardFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '385dp',
		width: Ti.UI.SIZE,
		height: '35dp'
	});
	comboView3.add(labDsCardFees$);

	var labDsCardFees = Ti.UI.createLabel({
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
	comboView3.add(labDsCardFees);

	//lable2 labCardFees

	var labAeCardFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '255dp',
		width: Ti.UI.SIZE,
		height: '35dp'
	});

	comboView3.add(labAeCardFees$);

	var labAeCardFees = Ti.UI.createLabel({
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

	comboView3.add(labAeCardFees);

	//label 1 CardFees

	var labDebitCardFees$ = Ti.UI.createLabel({
		text: '$',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: 'white',
		font: {
			fontSize: 20
		},
		right: '125dp',
		width: Ti.UI.SIZE,
		height: '35dp'
	});

	comboView3.add(labDebitCardFees$);

	var labDebitCardFees = Ti.UI.createLabel({
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		right : '35dp',
		width : '115dp',
		height : '35dp'
	});

	comboView3.add(labDebitCardFees);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var comboView4 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	scrollView.add(comboView4);
	///////// total new fee
	var labTotalNewFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'Total New Fees',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView4.add(labTotalNewFee);
	////txt field
	var labTotalNewField = Ti.UI.createLabel({
		color : '#336699',
		text : '0.00',
		textAlign : 'right',
		color : 'white',

		font : {
			fontSize : 25,
		},
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '400dp',
		width : Ti.UI.SIZE,
		height : '40dp'
	});

	comboView4.add(labTotalNewField);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var comboView5 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	scrollView.add(comboView5);
	///////// new active rate
	var labNewEffectiveRate = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : 'New Effective Rate',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView5.add(labNewEffectiveRate);

	///labNewEffectiveRate
	var labNewEffectiveRate1 = Ti.UI.createLabel({
		text : '0.00',
		color : 'white',
		font : {
			fontSize : 25
		},
		right : '330dp',
		width : '130dp',
		height : '40dp'
	});

	comboView5.add(labNewEffectiveRate1);
	//////////dollar image view
	var imgDollar = Ti.UI.createImageView({
		image : '/images/iconCalculator.png',
		top : '70%',
		right : '65dp',
		height : '150dp',
		width : '150dp'
	});

	self.add(imgDollar);
	imgDollar.addEventListener('click', function(e) {
		//if (globalVariables.GV.tfInterFeeChange == false) {

			labVisaProcFees.setText((globalVariables.GV.visaVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.visaTransactions * globalVariables.GV.AuthFee));
			labMcProcFees.setText((globalVariables.GV.mcVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.mcTransactions * globalVariables.GV.AuthFee));
			labDsProcFees.setText((globalVariables.GV.dsVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.dsTransactions * globalVariables.GV.AuthFee));
			labAeProcFees.setText(globalVariables.GV.aeTransactions * globalVariables.GV.AuthFee);
			labDebitProcFees.setText((globalVariables.GV.debitVol * globalVariables.GV.PinDebitProcessingFee) + (globalVariables.GV.debitTransactions * globalVariables.GV.PinDebitAuthFee));
			//	labVisaCardFees.setText(parseFloat(globalVariables.GV.InterchangeFee5)+parseFloat(globalVariables.GV.ProcessingFee5));

			//labMcCardFees.setText(parseFloat(globalVariables.GV.InterchangeFee4)+parseFloat(globalVariables.GV.ProcessingFee4));
			//		labDsCardFees.setText(parseFloat(globalVariables.GV.InterchangeFee3)+parseFloat(globalVariables.GV.ProcessingFee3));
			//		labAeCardFees.setText(parseFloat(globalVariables.GV.InterchangeFee2)+parseFloat(globalVariables.GV.ProcessingFee2));
			//	labDebitCardFees.setText(parseFloat(globalVariables.GV.InterchangeFee1)+parseFloat(globalVariables.GV.ProcessingFee1));
			if(!globalVariables.GV.tfInterFeeChange)
			{
				if (globalVariables.GV.BusinessType == 'Retail Low') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.RetailLowDb);
					tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.RetailLowAmex)) + (globalVariables.GV.aeTransactions * 0.1);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.RetailLowDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.RetailLowMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.RetailLowVsa);				
				} else if (globalVariables.GV.BusinessType == 'Retail High') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.RetailHighDb);
					tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.RetailHighAmex)) + (globalVariables.GV.aeTransactions * 0.1);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.RetailHighDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.RetailHighMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.RetailHighVsa);
				} else if (globalVariables.GV.BusinessType == 'Restaurant Low') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.RestaurantLowDb);
					tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.RestaurantLowAmex)) + (globalVariables.GV.aeTransactions * 0.05);
					Ti.API.info(tfAeInterFee.value);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.RestaurantLowDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.RestaurantLowMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.RestaurantLowVsa);
				} else if (globalVariables.GV.BusinessType == 'Restaurant High') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.RestaurantHighDb);
					tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.RestaurantHighAmex)) + (globalVariables.GV.aeTransactions * 0.05);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.RestaurantHighDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.RestaurantHighMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.RestaurantHighVsa);
	
				} else if (globalVariables.GV.BusinessType == 'Small Ticket') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.SmallTicketDb);
					tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.SmallTicketAmex);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.SmallTicketDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.SmallTicketMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.SmallTicketVsa);
				} else if (globalVariables.GV.BusinessType == 'MOTO') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.MOTODb);
					tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.MOTOAmex);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.MOTODis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.MOTOMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.MOTOVsa);
	
				} else if (globalVariables.GV.BusinessType == 'Internet') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.InternetDb);
					tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.InternetAmex);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.InternetDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.InternetMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.InternetVsa);
	
				} else if (globalVariables.GV.BusinessType == 'Business to Business') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * globalVariables.GV.BusinessToBusinessDb;
					tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.BusinessToBusinessAmex)) + (globalVariables.GV.aeTransactions * 0.15);
					//	tfAeInterFee.value =globalVariables.GV
					//tfAeInterFee.value = (globalVariables.GV.aeVol * 0.0289) + (globalVariables.GV.aeTransactions * 0.15);
	
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.BusinessToBusinessDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.BusinessToBusinessMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.BusinessToBusinessVsa);
	
				} else if (globalVariables.GV.BusinessType == 'Supermarket') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.SupermarketDb);
					tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.SupermarketAmex);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.SupermarketDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.SupermarketMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.SupermarketVsa);
	
				} else if (globalVariables.GV.BusinessType == 'Hotel/Lodging') {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.HotelLodgingDb);
					tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.HotelLodgingAmex);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.HotelLodgingDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.HotelLodgingMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.HotelLodgingVsa);
				} else {
					tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.UtilitiesDb);
					tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.UtilitiesAmex)) + (globalVariables.GV.aeTransactions * 0.15);
					tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.UtilitiesDis);
					tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.UtilitiesMcard);
					tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.UtilitiesVsa);
	
				}
			}
			
			labVisaCardFees.setText(parseFloat(tfVisaInterFee.value) + parseFloat(labVisaProcFees.getText()));
			labMcCardFees.setText(parseFloat(tfMcInterFee.value) + parseFloat(labMcProcFees.getText()));
			labDsCardFees.setText(parseFloat(tfDsInterFee.value) + parseFloat(labDsProcFees.getText()));
			labAeCardFees.setText(parseFloat(tfAeInterFee.value) + parseFloat(labAeProcFees.getText()));
			labDebitCardFees.setText(parseFloat(tfDebitInterFee.value) + parseFloat(labDebitProcFees.getText()));

			var sumTnf = parseFloat(labVisaCardFees.getText()) + parseFloat(labMcCardFees.getText()) + parseFloat(labDsCardFees.getText()) + parseFloat(labAeCardFees.getText()) + parseFloat(labDebitCardFees.getText()) + parseFloat(globalVariables.GV.MonthlyServiceFee) + parseFloat(globalVariables.GV.IndustryComplinceFee) + parseFloat(globalVariables.GV.TerminalFee) + parseFloat(globalVariables.GV.MXGatewayFee) + parseFloat(globalVariables.GV.DebitAccessFee) + (parseFloat(globalVariables.GV.AuthFee) * 25);
			globalVariables.GV.TotalNewFees = sumTnf.toFixed(2);
			labTotalNewField.setText('$ ' + globalVariables.GV.TotalNewFees);
			
			var sum = parseFloat(globalVariables.GV.visaVol) + parseFloat(globalVariables.GV.mcVol) + parseFloat(globalVariables.GV.dsVol) + parseFloat(globalVariables.GV.aeVol) + parseFloat(globalVariables.GV.debitVol);
			var nERate = (globalVariables.GV.TotalNewFees / sum) * 100;
			globalVariables.GV.NewEffectiveRate = nERate.toFixed(2);
			labNewEffectiveRate1.setText(globalVariables.GV.NewEffectiveRate+' %');

			var resultDebit = parseFloat(tfDebitInterFee.value);
			resultDebit = resultDebit.toFixed(2);
			debitInterfee = tfDebitInterFee.value = resultDebit;

			var resultAe = parseFloat(tfAeInterFee.value);
			resultAe = resultAe.toFixed(2);
			aeInterfee = tfAeInterFee.value = resultAe;

			var resultDs = parseFloat(tfDsInterFee.value);
			resultDs = resultDs.toFixed(2);
			dsInterfee = tfDsInterFee.value = resultDs;

			var resultMc = parseFloat(tfMcInterFee.value);
			resultMc = resultMc.toFixed(2);
			mcInterfee = tfMcInterFee.value = resultMc;

			var resultVisa = parseFloat(tfVisaInterFee.value);
			resultVisa = resultVisa.toFixed(2);
			visaInterfee = tfVisaInterFee.value = resultVisa;

			var resultCDebit = parseFloat(labDebitCardFees.getText());
			resultCDebit = resultCDebit.toFixed(2);
			labDebitCardFees.setText(resultCDebit);

			var resultCAe = parseFloat(labAeCardFees.getText());
			resultCAe = resultCAe.toFixed(2);
			labAeCardFees.setText(resultCAe);

			var resultCDs = parseFloat(labDsCardFees.getText());
			resultCDs = resultCDs.toFixed(2);
			labDsCardFees.setText(resultCDs);

			var resultCMc = parseFloat(labMcCardFees.getText());
			resultCMc = resultCMc.toFixed(2);
			labMcCardFees.setText(resultCMc);

			var resultCVisa = parseFloat(labVisaCardFees.getText());
			resultCVisa = resultCVisa.toFixed(2);
			labVisaCardFees.setText(resultCVisa);

			// var labTotalNfield = parseFloat(labTotalNewField.getText());
			// labTotalNfield = labTotalNfield.toFixed(2);
			// labTotalNewField.setText('$ '+ labTotalNfield);

			// var labNER = parseFloat(labNewEffectiveRate1.getText());
			// labNER = labNER.toFixed(2);
			// labNewEffectiveRate1.setText(labNER+' %');

			var labPfDebit = globalPfDebit = parseFloat(labDebitProcFees.getText());
			labPfDebit = labPfDebit.toFixed(2);
			labDebitProcFees.setText(labPfDebit);

			var labPfae = globalPfae = parseFloat(labAeProcFees.getText());
			labPfae = labPfae.toFixed(2);
			labAeProcFees.setText(labPfae);

			var labPfds = globalPfds = parseFloat(labDsProcFees.getText());
			labPfds = labPfds.toFixed(2);
			labDsProcFees.setText(labPfds);

			var labPfmc = globalPfmc = parseFloat(labMcProcFees.getText());
			labPfmc = labPfmc.toFixed(2);
			labMcProcFees.setText(labPfmc);

			var labPfVisa = globalPfVisa = parseFloat(labVisaProcFees.getText());
			labPfVisa = labPfVisa.toFixed(2);
			labVisaProcFees.setText(labPfVisa);

			globalVariables.GV.visaInterchangeFees = tfVisaInterFee.value;
			globalVariables.GV.mcInterchangeFees = tfMcInterFee.value;
			globalVariables.GV.aeInterchangeFees = tfAeInterFee.value;
			globalVariables.GV.debitInterchangeFees = tfDebitInterFee.value;
			globalVariables.GV.dsInterchangeFees = tfDsInterFee.value;

			labDebitDollarSign.setText('$');
			labAeDollarSign.setText('$');
			labDsDollarSign.setText('$');
			labMcDollarSign.setText('$');
			labVisaDollarSign.setText('$');

			globalVariables.GV.debitCardFees = labDebitCardFees.getText();
			globalVariables.GV.aeCardFees = labAeCardFees.getText();
			globalVariables.GV.dsCardFees = labDsCardFees.getText();
			globalVariables.GV.mcCardFees = labMcCardFees.getText();
			globalVariables.GV.visaCardFees = labVisaCardFees.getText();
			//

			globalVariables.GV.debitProcessingFees = labDebitProcFees.getText();
			globalVariables.GV.aeProcessingFees = labAeProcFees.getText();
			globalVariables.GV.dsProcessingFees = labDsProcFees.getText();
			globalVariables.GV.mcProcessingFees = labDsProcFees.getText();
			globalVariables.GV.visaProcessingFees = labVisaProcFees.getText();
			
			Ti.App.fireEvent('fillSavingsInfo',{initialize:false, alert:true});
			

			//globalVariables.GV.TotalNewFees = labTotalNfield;//labTotalNewField.getText();
			//globalVariables.GV.NewEffectiveRate = labNER;//labNewEffectiveRate1.getText();
			
			
			//	globalVariables.GV.TotalNewField = labTotalNewField.getText();

		//} else {

			// labDebitCardFees.setText(parseFloat(tfDebitInterFee.value) + parseFloat(globalPfDebit));
			// labAeCardFees.setText(parseFloat(tfAeInterFee.value) + parseFloat(globalPfae));
			// labDsCardFees.setText(parseFloat(tfDsInterFee.value) + parseFloat(globalPfds));
			// labMcCardFees.setText(parseFloat(tfMcInterFee.value) + parseFloat(globalPfmc));
			// labVisaCardFees.setText(parseFloat(tfVisaInterFee.value) + parseFloat(globalPfVisa));
// 			
			// globalVariables.GV.TotalNewField = parseFloat(labDebitCardFees.getText()) + parseFloat(labAeCardFees.getText()) + parseFloat(labDsCardFees.getText()) + parseFloat(labMcCardFees.getText()) + parseFloat(labVisaCardFees.getText()) + (parseFloat(globalVariables.GV.MonthlyServiceFee) + parseFloat(globalVariables.GV.IndustryComplinceFee) + parseFloat(globalVariables.GV.TerminalFee) + parseFloat(globalVariables.GV.MXGatewayFee) + parseFloat(globalVariables.GV.DebitAccessFee)) + (parseFloat(globalVariables.GV.AuthFee) * 25);
			// globalVariables.GV.TotalNewField = globalVariables.GV.TotalNewField.toFixed(2);
			// labTotalNewField.setText('$ ' + globalVariables.GV.TotalNewField);
// 			 
			// var sum = parseFloat(globalVariables.GV.visaVol) + parseFloat(globalVariables.GV.mcVol) + parseFloat(globalVariables.GV.dsVol) + parseFloat(globalVariables.GV.aeVol) + parseFloat(globalVariables.GV.debitVol);
// 			
			// globalVariables.GV.NewEffectiveRate = (globalVariables.GV.TotalNewField / sum) * 100;
			// globalVariables.GV.NewEffectiveRate = globalVariables.GV.NewEffectiveRate.toFixed(2);
			// labNewEffectiveRate1.setText(globalVariables.GV.NewEffectiveRate+' %');
			// labVisaProcFees.setText((globalVariables.GV.visaVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.visaTransactions * globalVariables.GV.AuthFee));
			// labMcProcFees.setText((globalVariables.GV.mcVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.mcTransactions * globalVariables.GV.AuthFee));
			// labDsProcFees.setText((globalVariables.GV.dsVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.dsTransactions * globalVariables.GV.AuthFee));
			// labAeProcFees.setText(globalVariables.GV.aeTransactions * globalVariables.GV.AuthFee);
			// labDebitProcFees.setText((globalVariables.GV.debitVol * globalVariables.GV.PinDebitProcessingFee) + (globalVariables.GV.debitTransactions * globalVariables.GV.PinDebitAuthFee));
			// //alert(globalVariables.GV.debitVol);
			// // = labTotalNewField.getText();
// 
			// var labPfDebit = globalPfDebit = parseFloat(labDebitProcFees.getText());
			// labPfDebit = labPfDebit.toFixed(2);
			// labDebitProcFees.setText(labPfDebit);
// 
			// var labPfae = globalPfae = parseFloat(labAeProcFees.getText());
			// labPfae = labPfae.toFixed(2);
			// labAeProcFees.setText(labPfae);
// 
			// var labPfds = globalPfds = parseFloat(labDsProcFees.getText());
			// labPfds = labPfds.toFixed(2);
			// labDsProcFees.setText(labPfds);
// 
			// var labPfmc = globalPfmc = parseFloat(labMcProcFees.getText());
			// labPfmc = labPfmc.toFixed(2);
			// labMcProcFees.setText(labPfmc);
// 
			// var labPfVisa = globalPfVisa = parseFloat(labVisaProcFees.getText());
			// labPfVisa = labPfVisa.toFixed(2);
			// labVisaProcFees.setText(labPfVisa);
			// ////////////////////////
// 
			// var resultCDebit = parseFloat(labDebitCardFees.getText());
			// resultCDebit = resultCDebit.toFixed(2);
			// labDebitCardFees.setText(resultCDebit);
// 
			// var resultCAe = parseFloat(labAeCardFees.getText());
			// resultCAe = resultCAe.toFixed(2);
			// labAeCardFees.setText(resultCAe);
// 
			// var resultCDs = parseFloat(labDsCardFees.getText());
			// resultCDs = resultCDs.toFixed(2);
			// labDsCardFees.setText(resultCDs);
// 
			// var resultCMc = parseFloat(labMcCardFees.getText());
			// resultCMc = resultCMc.toFixed(2);
			// labMcCardFees.setText(resultCMc);
// 
			// var resultCVisa = parseFloat(labVisaCardFees.getText());
			// resultCVisa = resultCVisa.toFixed(2);
			// labVisaCardFees.setText(resultCVisa);
		//}
	});
	
	Ti.App.addEventListener('fillIaInfo', function(e){
		if(!e.initialize){
			
			tfVisaInterFee.value = parseFloat(globalVariables.GV.visaInterchangeFees).toFixed(2);
			labVisaDollarSign.setText('$');
			tfMcInterFee.value = parseFloat(globalVariables.GV.mcInterchangeFees).toFixed(2);
			labMcDollarSign.setText('$');
			tfDsInterFee.value = parseFloat(globalVariables.GV.dsInterchangeFees).toFixed(2);
			labDsDollarSign.setText('$');
			tfAeInterFee.value = parseFloat(globalVariables.GV.aeInterchangeFees).toFixed(2);
			labAeDollarSign.setText('$');
			tfDebitInterFee.value = parseFloat(globalVariables.GV.debitInterchangeFees).toFixed(2);
			labDebitDollarSign.setText('$');
		
			labVisaCardFees.setText(parseFloat(globalVariables.GV.visaCardFees).toFixed(2));
			labMcCardFees.setText(parseFloat(globalVariables.GV.mcCardFees).toFixed(2));
			labDsCardFees.setText(parseFloat(globalVariables.GV.dsCardFees).toFixed(2));
			labAeCardFees.setText(parseFloat(globalVariables.GV.aeCardFees).toFixed(2));
			labDebitCardFees.setText(parseFloat(globalVariables.GV.debitCardFees).toFixed(2));
			
			labVisaProcFees.setText(parseFloat(globalVariables.GV.visaProcessingFees).toFixed(2));
			labMcProcFees.setText(parseFloat(globalVariables.GV.mcProcessingFees).toFixed(2));
			labDsProcFees.setText(parseFloat(globalVariables.GV.dsProcessingFees).toFixed(2));
			labAeProcFees.setText(parseFloat(globalVariables.GV.aeProcessingFees).toFixed(2));
			labDebitProcFees.setText(parseFloat(globalVariables.GV.debitProcessingFees).toFixed(2));
			
			labTotalNewField.setText('$'+ parseFloat(globalVariables.GV.TotalNewFees).toFixed(2));
			labNewEffectiveRate1.setText(parseFloat(globalVariables.GV.NewEffectiveRate).toFixed(2)+'%');
		}
		else{
			tfVisaInterFee.value = "";
			labVisaDollarSign.setText('');
			tfMcInterFee.value = "";
			labMcDollarSign.setText('');
			tfDsInterFee.value = "";
			labDsDollarSign.setText('');
			tfAeInterFee.value = "";
			labAeDollarSign.setText('');
			tfDebitInterFee.value = "";
			labDebitDollarSign.setText('');
		
			labVisaCardFees.setText("");
			labMcCardFees.setText("");
			labDsCardFees.setText("");
			labAeCardFees.setText("");
			labDebitCardFees.setText("");
			
			labVisaProcFees.setText("");
			labMcProcFees.setText("");
			labDsProcFees.setText("");
			labAeProcFees.setText("");
			labDebitProcFees.setText("");
			
			labTotalNewField.setText("");
			labNewEffectiveRate1.setText("");
		}
			});

	return self;
};
