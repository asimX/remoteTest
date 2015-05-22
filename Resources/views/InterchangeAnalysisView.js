var acs = require('lib/acs');
var globalVariables = require('globalVariables');
var utility = require('lib/utilities');

exports.InterchangeAnalysis = function() {
	
	var self = Ti.UI.createView({
		backgroundColor : 'black',
		backgroundImage : 'images/iconGradientBG.png',
		width : '93%',
		height : Ti.UI.FILL,
		top : '2%'
	});
	globalVariables.GV.tfInterFeeChange = false;
	
	var formattedCurrency=false;
	
	var visaInterfee =
	mcInterfee =
	dsInterfee =
	aeInterfee =
	debitInterfee = null;
	
	self.addEventListener('click', function() {

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
	});
	scrollView.add(comboView1);
	//1st image view debit
	var imageDebit = Ti.UI.createImageView({
		image : '/images/iconDebit.png',
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

	var comboView = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	scrollView.add(comboView);
	//lable Interchange Fee
	var labInterchangeFee = Ti.UI.createLabel({
		color : 'White',
		font : {
			fontSize : 22
		},
		text : '~Interchange Fees',
		left : '20dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	comboView.add(labInterchangeFee);
	//textfield InterchangeFee1
	var tfDebitInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '30dp',
		width : '110dp',
		height : '35dp',
		tintColor: 'black'
	});
	
	tfDebitInterFee.addEventListener('change', function(e) {
		if(debitInterfee != tfDebitInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});
	
	tfDebitInterFee.addEventListener('focus', function(e){
	   var step1 = tfDebitInterFee.value.replace(",",'');
       tfDebitInterFee.value = step1.replace("$ ",''); 
	});
	
	tfDebitInterFee.addEventListener('blur', function(e) {
        if(tfDebitInterFee.value.indexOf("$")>=0)
        {
            
        }
        else if(tfDebitInterFee.value =='')
        {
            tfDebitInterFee.value = utility.formatCurrency(0,"$");
        }
        else{
            tfDebitInterFee.value = utility.formatCurrency(tfDebitInterFee.value,"$");
        }
    });

	comboView.add(tfDebitInterFee);
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
		height : '35dp',
		tintColor: 'black'
	});
	
	tfAeInterFee.addEventListener('return', function(e) {
		tfDebitInterFee.focus();
	});
	
	tfAeInterFee.addEventListener('change', function(e) {
		if(aeInterfee != tfAeInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});
	
	tfAeInterFee.addEventListener('focus', function(e){
       var step1 = tfAeInterFee.value.replace(",",'');
       tfAeInterFee.value = step1.replace("$ ",''); 
    });
    
    tfAeInterFee.addEventListener('blur', function(e) {
        if(tfAeInterFee.value.indexOf("$")>=0)
        {
            
        }
        else if(tfAeInterFee.value =='')
        {
            tfAeInterFee.value = utility.formatCurrency(0,"$");
        }
        else{
            tfAeInterFee.value = utility.formatCurrency(tfAeInterFee.value,"$");
        }
    });
	
	comboView.add(tfAeInterFee);

	//textfield InterchangeFee3
	var tfDsInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '290dp',
		width : '110dp',
		height : '35dp',
		tintColor: 'black'
	});

	tfDsInterFee.addEventListener('return', function(e) {
		tfAeInterFee.focus();
	});
	
	tfDsInterFee.addEventListener('change', function(e) {
		if(dsInterfee != tfDsInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});
	
	tfDsInterFee.addEventListener('focus', function(e){
       var step1 = tfDsInterFee.value.replace(",",'');
       tfDsInterFee.value = step1.replace("$ ",''); 
    });
    
    tfDsInterFee.addEventListener('blur', function(e) {
        if(tfDsInterFee.value.indexOf("$")>=0)
        {
            
        }
        else if(tfDsInterFee.value =='')
        {
            tfDsInterFee.value = utility.formatCurrency(0,"$");
        }
        else{
            tfDsInterFee.value = utility.formatCurrency(tfDsInterFee.value,"$");
        }
    });

	comboView.add(tfDsInterFee);
	
	//textfield InterchangeFee4
	var tfMcInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		returnKeyType : ~Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '420dp',
		width : '110dp',
		height : '35dp',
		tintColor: 'black'
	});

	tfMcInterFee.addEventListener('return', function(e) {
		tfDsInterFee.focus();
	});
	
	tfMcInterFee.addEventListener('change', function(e) {
		if(mcInterfee != tfMcInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});
	
	tfMcInterFee.addEventListener('focus', function(e){
       var step1 = tfMcInterFee.value.replace(",",'');
       tfMcInterFee.value = step1.replace("$ ",''); 
    });
    
    tfMcInterFee.addEventListener('blur', function(e) {
        if(tfMcInterFee.value.indexOf("$")>=0)
        {
            
        }
        else if(tfMcInterFee.value =='')
        {
            tfMcInterFee.value = utility.formatCurrency(0,"$");
        }
        else{
            tfMcInterFee.value = utility.formatCurrency(tfMcInterFee.value,"$");
        }
    });

	comboView.add(tfMcInterFee);

	//textfield InterchangeFee5
	var tfVisaInterFee = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		textAlign : 'right',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		right : '550dp',
		width : '110dp',
		height : '35dp',
		tintColor: 'black'
	});
	
	tfVisaInterFee.addEventListener('return', function(e) {
		tfMcInterFee.focus();
	});
	
	tfVisaInterFee.addEventListener('change', function(e) {
		if(visaInterfee != tfVisaInterFee.value )
			globalVariables.GV.tfInterFeeChange = true;
	});
	
	tfVisaInterFee.addEventListener('focus', function(e){
       var step1 = tfVisaInterFee.value.replace(",",'');
       tfVisaInterFee.value = step1.replace("$ ",''); 
    });
    
    tfVisaInterFee.addEventListener('blur', function(e) {
        if(tfVisaInterFee.value.indexOf("$")>=0)
        {
            
        }
        else if(tfVisaInterFee.value =='')
        {
            tfVisaInterFee.value = utility.formatCurrency(0,"$");
        }
        else{
            tfVisaInterFee.value = utility.formatCurrency(tfVisaInterFee.value,"$");
        }
    });
    
	comboView.add(tfVisaInterFee);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var comboView2 = Ti.UI.createView({
		top : '45dp',
		width : Ti.UI.FILL,
		height : 30
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

	var labVisaProcFees = Ti.UI.createLabel({
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

	comboView2.add(labVisaProcFees);
	//lable4 ProcessingFee

	var labMcProcFees = Ti.UI.createLabel({
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		right : '425dp',
		width : '110dp',
		height : '35dp'
	});

	comboView2.add(labMcProcFees);

	var labDsProcFees = Ti.UI.createLabel({
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

	comboView2.add(labDsProcFees);

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

	var labDebitProcFees = Ti.UI.createLabel({
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

	var labVisaCardFees = Ti.UI.createLabel({
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

	comboView3.add(labVisaCardFees);

	//lable4 labCardFees

	var labMcCardFees = Ti.UI.createLabel({
		text : '0.00',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : 'white',
		font : {
			fontSize : 20
		},
		right : '425dp',
		width : '110dp',
		height : '35dp'
	});

	comboView3.add(labMcCardFees);

	//lable3 labCardFees

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
            
            if(formattedCurrency){
                tfVisaInterFee.value = utility.unformatCurrency(tfVisaInterFee.value);
                //tfVisaInterFee.value = parseFloat(tfVisaInterFee.value);
                
                tfMcInterFee.value = utility.unformatCurrency(tfMcInterFee.value);
                //tfMcInterFee.value = parseFloat(tfMcInterFee.value);
                
                tfDsInterFee.value = utility.unformatCurrency(tfDsInterFee.value);
                //tfDsInterFee.value = parseFloat(tfDsInterFee.value);
                
                tfAeInterFee.value = utility.unformatCurrency(tfAeInterFee.value);
                //tfAeInterFee.value = parseFloat(tfAeInterFee.value);
                
                tfDebitInterFee.value = utility.unformatCurrency(tfDebitInterFee.value);
                //tfDebitInterFee.value = parseFloat(tfDebitInterFee.value);
                
                labVisaCardFees.setText(utility.unformatCurrency(labVisaCardFees.getText()));
                //labVisaCardFees.setText(parseFloat(labVisaCardFees.getText()));
                
                labMcCardFees.setText(utility.unformatCurrency(labMcCardFees.getText()));
                //labMcCardFees.setText(parseFloat(labMcCardFees.getText()));
                
                labDsCardFees.setText(utility.unformatCurrency(labDsCardFees.getText()));
                //labDsCardFees.setText(parseFloat(labDsCardFees.getText()));
                
                labAeCardFees.setText(utility.unformatCurrency(labAeCardFees.getText()));
                //labAeCardFees.setText(parseFloat(labAeCardFees.getText()));
                
                labDebitCardFees.setText(utility.unformatCurrency(labDebitCardFees.getText()));
                  
            }
            
			labVisaProcFees.setText((globalVariables.GV.visaVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.visaTransactions * globalVariables.GV.AuthFee));
			labMcProcFees.setText((globalVariables.GV.mcVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.mcTransactions * globalVariables.GV.AuthFee));
			labDsProcFees.setText((globalVariables.GV.dsVol * globalVariables.GV.ProcessingFee) + (globalVariables.GV.dsTransactions * globalVariables.GV.AuthFee));
			labAeProcFees.setText(globalVariables.GV.aeTransactions * globalVariables.GV.AuthFee);
			labDebitProcFees.setText((globalVariables.GV.debitVol * globalVariables.GV.PinDebitProcessingFee) + (globalVariables.GV.debitTransactions * globalVariables.GV.PinDebitAuthFee));
			
			if(!globalVariables.GV.tfInterFeeChange)
			{
				tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.DebitRate);
                tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.AmexRate)) + (globalVariables.GV.AmexTrRate * 0.1);
                tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.DsRate);
                tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.McRate);
                tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.VisaRate); 
				// if (globalVariables.GV.BusinessType == 'Retail Low') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.RetailLowDb);
					// tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.RetailLowAmex)) + (globalVariables.GV.aeTransactions * 0.1);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.RetailLowDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.RetailLowMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.RetailLowVsa);				
				// } else if (globalVariables.GV.BusinessType == 'Retail High') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.RetailHighDb);
					// tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.RetailHighAmex)) + (globalVariables.GV.aeTransactions * 0.1);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.RetailHighDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.RetailHighMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.RetailHighVsa);
				// } else if (globalVariables.GV.BusinessType == 'Restaurant Low') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.RestaurantLowDb);
					// tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.RestaurantLowAmex)) + (globalVariables.GV.aeTransactions * 0.05);
					// Ti.API.info(tfAeInterFee.value);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.RestaurantLowDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.RestaurantLowMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.RestaurantLowVsa);
				// } else if (globalVariables.GV.BusinessType == 'Restaurant High') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.RestaurantHighDb);
					// tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.RestaurantHighAmex)) + (globalVariables.GV.aeTransactions * 0.05);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.RestaurantHighDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.RestaurantHighMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.RestaurantHighVsa);
// 	
				// } else if (globalVariables.GV.BusinessType == 'Small Ticket') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.SmallTicketDb);
					// tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.SmallTicketAmex);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.SmallTicketDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.SmallTicketMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.SmallTicketVsa);
				// } else if (globalVariables.GV.BusinessType == 'MOTO') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.MOTODb);
					// tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.MOTOAmex);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.MOTODis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.MOTOMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.MOTOVsa);
// 	
				// } else if (globalVariables.GV.BusinessType == 'Internet') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.InternetDb);
					// tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.InternetAmex);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.InternetDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.InternetMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.InternetVsa);
// 	
				// } else if (globalVariables.GV.BusinessType == 'Business to Business') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * globalVariables.GV.BusinessToBusinessDb;
					// tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.BusinessToBusinessAmex)) + (globalVariables.GV.aeTransactions * 0.15);
					// //	tfAeInterFee.value =globalVariables.GV
					// //tfAeInterFee.value = (globalVariables.GV.aeVol * 0.0289) + (globalVariables.GV.aeTransactions * 0.15);
// 	
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.BusinessToBusinessDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.BusinessToBusinessMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.BusinessToBusinessVsa);
// 	
				// } else if (globalVariables.GV.BusinessType == 'Supermarket') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.SupermarketDb);
					// tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.SupermarketAmex);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.SupermarketDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.SupermarketMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.SupermarketVsa);
// 	
				// } else if (globalVariables.GV.BusinessType == 'Hotel/Lodging') {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.HotelLodgingDb);
					// tfAeInterFee.value = globalVariables.GV.aeVol * parseFloat(globalVariables.GV.HotelLodgingAmex);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.HotelLodgingDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.HotelLodgingMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.HotelLodgingVsa);
				// } else {
					// tfDebitInterFee.value = globalVariables.GV.debitVol * parseFloat(globalVariables.GV.UtilitiesDb);
					// tfAeInterFee.value = (globalVariables.GV.aeVol * parseFloat(globalVariables.GV.UtilitiesAmex)) + (globalVariables.GV.aeTransactions * 0.15);
					// tfDsInterFee.value = globalVariables.GV.dsVol * parseFloat(globalVariables.GV.UtilitiesDis);
					// tfMcInterFee.value = globalVariables.GV.mcVol * parseFloat(globalVariables.GV.UtilitiesMcard);
					// tfVisaInterFee.value = globalVariables.GV.visaVol * parseFloat(globalVariables.GV.UtilitiesVsa);
// 	
				// }
			}
			
			labVisaCardFees.setText(parseFloat(tfVisaInterFee.value) + parseFloat(labVisaProcFees.getText()));
			labMcCardFees.setText(parseFloat(tfMcInterFee.value) + parseFloat(labMcProcFees.getText()));
			labDsCardFees.setText(parseFloat(tfDsInterFee.value) + parseFloat(labDsProcFees.getText()));
			labAeCardFees.setText(parseFloat(tfAeInterFee.value) + parseFloat(labAeProcFees.getText()));
			labDebitCardFees.setText(parseFloat(tfDebitInterFee.value) + parseFloat(labDebitProcFees.getText()));

			var sumTnf = parseFloat(labVisaCardFees.getText()) + parseFloat(labMcCardFees.getText()) + parseFloat(labDsCardFees.getText()) + parseFloat(labAeCardFees.getText()) + parseFloat(labDebitCardFees.getText()) + parseFloat(globalVariables.GV.MonthlyServiceFee) + parseFloat(globalVariables.GV.IndustryComplinceFee) + parseFloat(globalVariables.GV.TerminalFee) + parseFloat(globalVariables.GV.MXGatewayFee) + parseFloat(globalVariables.GV.DebitAccessFee) + (parseFloat(globalVariables.GV.AuthFee) * 25);
			globalVariables.GV.TotalNewFees = sumTnf.toFixed(2);
			labTotalNewField.setText(utility.formatCurrency(globalVariables.GV.TotalNewFees,"$"));
			
			var sum = parseFloat(globalVariables.GV.visaVol) + parseFloat(globalVariables.GV.mcVol) + parseFloat(globalVariables.GV.dsVol) + parseFloat(globalVariables.GV.aeVol) + parseFloat(globalVariables.GV.debitVol);
			var nERate = (globalVariables.GV.TotalNewFees / sum) * 100;
			globalVariables.GV.NewEffectiveRate = nERate.toFixed(2);
			labNewEffectiveRate1.setText(globalVariables.GV.NewEffectiveRate+' %');

			debitInterfee = parseFloat(tfDebitInterFee.value).toFixed(2);

			aeInterfee = parseFloat(tfAeInterFee.value).toFixed(2);

			dsInterfee = parseFloat(tfDsInterFee.value).toFixed(2);

			mcInterfee = parseFloat(tfMcInterFee.value).toFixed(2);

			visaInterfee = parseFloat(tfVisaInterFee.value).toFixed(2);

			globalVariables.GV.visaInterchangeFees = parseFloat(tfVisaInterFee.value).toFixed(2);
			tfVisaInterFee.value = utility.formatCurrency(globalVariables.GV.visaInterchangeFees, "$");
			globalVariables.GV.mcInterchangeFees = parseFloat(tfMcInterFee.value).toFixed(2);
			tfMcInterFee.value = utility.formatCurrency(globalVariables.GV.mcInterchangeFees, "$");
			globalVariables.GV.aeInterchangeFees = parseFloat(tfAeInterFee.value).toFixed(2);
			tfAeInterFee.value = utility.formatCurrency(globalVariables.GV.aeInterchangeFees, "$");
			globalVariables.GV.debitInterchangeFees = parseFloat(tfDebitInterFee.value).toFixed(2);
			tfDebitInterFee.value = utility.formatCurrency(globalVariables.GV.debitInterchangeFees, "$");
			globalVariables.GV.dsInterchangeFees = parseFloat(tfDsInterFee.value).toFixed(2);
			tfDsInterFee.value = utility.formatCurrency(globalVariables.GV.dsInterchangeFees, "$");

			globalVariables.GV.debitCardFees = parseFloat(labDebitCardFees.getText()).toFixed(2);
			labDebitCardFees.setText(utility.formatCurrency(globalVariables.GV.debitCardFees,"$"));
			globalVariables.GV.aeCardFees = parseFloat(labAeCardFees.getText()).toFixed(2);
			labAeCardFees.setText(utility.formatCurrency(globalVariables.GV.aeCardFees,"$"));
			globalVariables.GV.dsCardFees = parseFloat(labDsCardFees.getText()).toFixed(2);
			labDsCardFees.setText(utility.formatCurrency(globalVariables.GV.dsCardFees,"$"));
			globalVariables.GV.mcCardFees = parseFloat(labMcCardFees.getText()).toFixed(2);
			labMcCardFees.setText(utility.formatCurrency(globalVariables.GV.mcCardFees,"$"));
			globalVariables.GV.visaCardFees = parseFloat(labVisaCardFees.getText()).toFixed(2);
			labVisaCardFees.setText(utility.formatCurrency(globalVariables.GV.visaCardFees,"$"));

			globalVariables.GV.debitProcessingFees = parseFloat(labDebitProcFees.getText()).toFixed(2);
			labDebitProcFees.setText(utility.formatCurrency(globalVariables.GV.debitProcessingFees,"$"));
			globalVariables.GV.aeProcessingFees = parseFloat(labAeProcFees.getText()).toFixed(2);
			labAeProcFees.setText(utility.formatCurrency(globalVariables.GV.aeProcessingFees,"$"));
			globalVariables.GV.dsProcessingFees = parseFloat(labDsProcFees.getText()).toFixed(2);
			labDsProcFees.setText(utility.formatCurrency(globalVariables.GV.dsProcessingFees,"$"));
			globalVariables.GV.mcProcessingFees = parseFloat(labMcProcFees.getText()).toFixed(2);
			labMcProcFees.setText(utility.formatCurrency(globalVariables.GV.mcProcessingFees,"$"));
			globalVariables.GV.visaProcessingFees = parseFloat(labVisaProcFees.getText()).toFixed(2);
			labVisaProcFees.setText(utility.formatCurrency(globalVariables.GV.visaProcessingFees,"$"));
			
			formattedCurrency=true;
			
			Ti.App.fireEvent('fillSavingsInfo',{initialize:false, alert:true});
	});
	
	Ti.App.addEventListener('fillIaInfo', function(e){
		if(!e.initialize){
			
			tfVisaInterFee.value = utility.formatCurrency(globalVariables.GV.visaInterchangeFees,"$"); 
			
			tfMcInterFee.value = utility.formatCurrency(globalVariables.GV.mcInterchangeFees,"$"); 
			
			tfDsInterFee.value = utility.formatCurrency(globalVariables.GV.dsInterchangeFees,"$");
			
			tfAeInterFee.value = utility.formatCurrency(globalVariables.GV.aeInterchangeFees,"$");
			
			tfDebitInterFee.value = utility.formatCurrency(globalVariables.GV.debitInterchangeFees,"$");
		
			labVisaCardFees.setText(utility.formatCurrency(globalVariables.GV.visaCardFees,"$"));
			labMcCardFees.setText(utility.formatCurrency(globalVariables.GV.mcCardFees,"$"));
			labDsCardFees.setText(utility.formatCurrency(globalVariables.GV.dsCardFees,"$"));
			labAeCardFees.setText(utility.formatCurrency(globalVariables.GV.aeCardFees,"$"));
			labDebitCardFees.setText(utility.formatCurrency(globalVariables.GV.debitCardFees,"$"));
			
			labVisaProcFees.setText(utility.formatCurrency(globalVariables.GV.visaProcessingFees,"$"));
			labMcProcFees.setText(utility.formatCurrency(globalVariables.GV.mcProcessingFees,"$"));
			labDsProcFees.setText(utility.formatCurrency(globalVariables.GV.dsProcessingFees,"$"));
			labAeProcFees.setText(utility.formatCurrency(globalVariables.GV.aeProcessingFees,"$"));
			labDebitProcFees.setText(utility.formatCurrency(globalVariables.GV.debitProcessingFees,"$"));
			
			labTotalNewField.setText(utility.formatCurrency(globalVariables.GV.TotalNewFees,"$"));
			labNewEffectiveRate1.setText(parseFloat(globalVariables.GV.NewEffectiveRate).toFixed(2)+'%');
			formattedCurrency=true;
		}
		else{
			formattedCurrency=false;
			tfVisaInterFee.value = "";
			
			tfMcInterFee.value = "";
			
			tfDsInterFee.value = "";
			
			tfAeInterFee.value = "";
			
			tfDebitInterFee.value = "";
		
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
