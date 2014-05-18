var db = require('db/db');
var PDF = require('bencoding.pdf');
var acs = require('lib/acs');
var globalVariables = require('globalVariables');
exports.Proposal = function() {
	
	var self = Ti.UI.createView({
		backgroundColor : 'white',
		width : '93%',
		height : Ti.UI.FILL,
		top : '2%'
	});

	Ti.API.info("module is => " + PDF);

	var converters = PDF.createConverters();
	
	//////////////////////////
	var img = Ti.UI.createImageView({
		image : '/images/iconPriority.png',
		top : '5dp',
		left : '5dp',
		width : '150dp',
		height : '32dp',

	});
	self.add(img);
	
	var labProposal = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '34dp',
			fontFamily : 'GillSans-Light',
			fontWeight : 'bold'
		},
		text : 'Proposal For ' + globalVariables.GV.BusinessName,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : "45dp",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labProposal);
	//// label CurrentPrice
	var underline = Ti.UI.createImageView({
		image : '/images/titleUnderline.png',
		top : 70
	});
	self.add(underline);

	var labCurrentPrice = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			//fontWeight : 'bold'
		},
		text : 'Current Pricing',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 130,
		left : '5%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labCurrentPrice);
	//currentPricingContainerView.add(labCurrentPrice);

	//container for pricings
	var currentPricingContainerView = Ti.UI.createView({
		//backgroundColor : 'transparent',
		backgroundImage : '/images/viewBorderBG.png',
		top : 170,
		left : '5%',
		width : '40%',
		height : 150,
		//layout: 'vertical',
		// borderColor : '#99999',
		// borderWidth : .5,
		// backgroundColor : 'transparent',
	});

	var itemLbl = Ti.UI.createLabel({
		text : 'Item',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#e6e6e6',
		width : '65%',
		top : 1,
		left : 2,
		height : Ti.UI.SIZE,
		//borderColor: '#999999'
	});

	var vdivider = Ti.UI.createView({
		backgroundColor : '#999999',
		width : 1,
		//height : Ti.UI.FILL,
		bottom : 1,
		left : '65%',
		top : 1,
		zIndex : 2
	});

	var costLbl = Ti.UI.createLabel({
		text : 'Cost',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#e6e6e6',
		left : '65%',
		right : 2,
		top : 1,
		//width : '34%',
		height : Ti.UI.SIZE,
		//borderColor: '#999999'
	});

	var hdivider = Ti.UI.createView({
		backgroundColor : '#999999',
		height : 1,
		//width : Ti.UI.FILL,
		right : 1,
		left : 1,
		top : 22
	});
	var hdivider1 = Ti.UI.createView({
		backgroundColor : 'black',
		height : 1,
		width : 350,
		left : 44,
		top : 337
	});

	//self.add(hdivider1);
	var hdivider2Item = Ti.UI.createView({
		backgroundColor : 'black',
		height : 168,
		layout : 'vertical',
		width : 1,
		left : 395,
		top : 170,
		zIndex : 4
	});

	//self.add(hdivider2Item);

	var hdivider1cost = Ti.UI.createView({
		backgroundColor : 'black',
		height : 1,
		width : 350,
		right : 44,
		top : 337
	});

	//self.add(hdivider1cost);
	var hdivider2cost = Ti.UI.createView({
		backgroundColor : 'black',
		height : 168,
		layout : 'vertical',
		width : 1,
		right : 43,
		top : 170,
		zindzIndex : 2
	});

	//self.add(hdivider2cost);
	// var currentView = Ti.UI.createView({
	// borderColor: '#99999',
	// height: '70%',
	// borderWidth: .5,
	// backgroundColor: 'transparent'
	// });

	currentPricingContainerView.add(itemLbl);
	currentPricingContainerView.add(vdivider);
	currentPricingContainerView.add(costLbl);
	currentPricingContainerView.add(hdivider);

	self.add(currentPricingContainerView);

	//// label Total Current Fees
	var labTotalCurrentFees = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '18dp'
		},
		text : 'Total Current Fees',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 220,
		left : '7%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labTotalCurrentFees);
	//currentView.add(labTotalCurrentFees);

	//// label Total Current Fees 2
	var labTotalCurrentFees2 = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '18dp'
		},
		text : '$xxxxx.xx',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 220,
		right : '56%',
		width : 110,
		height : Ti.UI.SIZE
	});
	self.add(labTotalCurrentFees2);

	//currentView.add(labTotalCurrentFees2);

	//// label Current Effective Rate
	var labCurrentEffectiveRate = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '18dp'
		},
		text : 'Current Effective Rate',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 270,
		left : '7%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labCurrentEffectiveRate);
	//currentView.add(labCurrentEffectiveRate);

	//// label Current Effective Rate 2
	var labCurrentEffectiveRate2 = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '18dp'
		},
		text : 'xx.xx',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 270,
		//left : '40%',
		right : '56%',
		width : 110, //Ti.UI.SIZE,
		height : Ti.UI.SIZE,
	});
	self.add(labCurrentEffectiveRate2);

	////////////////////////////////////////////////////////////////
	//// label Proposd Pricing

	var labProposdPricing = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			//fontWeight : 'bold'
		},
		text : 'Proposed Pricing',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 130,
		left : '55%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labProposdPricing);

	var proposedPricingContainerView = Ti.UI.createView({
		//backgroundColor : 'transparent',
		backgroundImage : '/images/viewBorderBG.png',
		top : 170,
		left : '55%',
		width : '40%',
		height : 150,
		//layout: 'vertical',
		// borderColor : '#99999',
		// borderWidth : .5,
		// backgroundColor : 'transparent',
	});

	var itemLbl1 = Ti.UI.createLabel({
		text : 'Item',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#e6e6e6',
		width : '65%',
		top : 1,
		left : 2,
		height : Ti.UI.SIZE,
		//borderColor: '#999999'
	});

	var vdivider1 = Ti.UI.createView({
		backgroundColor : '#999999',
		width : 1,
		//height : Ti.UI.FILL,
		bottom : 1,
		left : '65%',
		top : 1,
		zIndex : 2
	});

	var costLbl1 = Ti.UI.createLabel({
		text : 'Cost',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#e6e6e6',
		left : '65%',
		right : 2,
		top : 1,
		//width : '35%',
		height : Ti.UI.SIZE,
		//borderColor: '#999999'
	});

	var hdivider1 = Ti.UI.createView({
		backgroundColor : '#999999',
		height : 1,
		//width : Ti.UI.FILL,
		right : 1,
		left : 1,
		top : 20
	});

	proposedPricingContainerView.add(itemLbl1);
	proposedPricingContainerView.add(vdivider1);
	proposedPricingContainerView.add(costLbl1);
	proposedPricingContainerView.add(hdivider1);

	self.add(proposedPricingContainerView);

	////////Proposed Fees
	var labProposedFees = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '18dp'
		},
		text : 'Proposed Fees',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 220,
		left : '57%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labProposedFees);
	////////Proposed Fees2
	var labProposedFees2 = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '18dp'
		},
		text : '$xxxxx.xx',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 220,
		//left : '87%',
		right : '6%',
		width : 110, //Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labProposedFees2);

	//////// Proposed Effective Rate
	var labProposedEffectiveRate = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '18dp'
		},
		text : 'Proposed Effective Rate',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 270,
		left : '57%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labProposedEffectiveRate);

	//////// Proposed Effective Rate2
	var labProposedEffectiveRate2 = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '18dp'
		},
		text : 'xx.xx',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 270,
		right : '6%',
		width : 110,
		height : Ti.UI.SIZE
	});
	self.add(labProposedEffectiveRate2);
	/////////////////////////////////////////////////////
	//////// Monthly Savings
	var labMonthlySavings = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontFamily : 'gillsans-bold',
			fontSize : '50dp',
			fontweight : 'bold'
		},
		text : 'Monthly Savings',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 400,
		left : '6%',
		width : 430,
		height : Ti.UI.SIZE
	});
	self.add(labMonthlySavings);
	//////// Monthly Savings2
	var labMonthlySavings2 = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '40dp',
			fontweight : 'bold'
		},
		text : '$ xxxxx.xx',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 460,
		left : '6%',
		width : 430,
		height : Ti.UI.SIZE
	});
	self.add(labMonthlySavings2);
	//////// Year 1 Savings
	var labYear1Savings = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : 'Year 1 Savings',

		top : 370,
		left : '60%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labYear1Savings);
	//////// Year 1 Savings ii
	var labYear1Savingsii = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : '$ xxxxx.xx',

		top : 370,
		left : '80%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labYear1Savingsii);

	//////// Year 2 Savings
	var labYear2Savings = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : 'Year 2 Savings',

		top : 410,
		left : '60%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labYear2Savings);
	//////// Year 2 Savings ii
	var labYear2Savingsii = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : '$ xxxxx.xx',

		top : 410,
		left : '80%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labYear2Savingsii);
	//////// Year 3 Savings
	var labYear3Savings = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : 'Year 3 Savings',

		top : 450,
		left : '60%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labYear3Savings);
	//////// Year 3 Savings ii
	var labYear3Savingsii = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : '$ xxxxx.xx',

		top : 450,
		left : '80%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labYear3Savingsii);
	//////// Year 4 Savings
	var labYear4Savings = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : 'Year 4 Savings',

		top : 490,
		left : '60%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labYear4Savings);
	//////// Year 4 Savings ii
	var labYear4Savingsii = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : '$ xxxxx.xx',

		top : 490,
		left : '80%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(labYear4Savingsii);
	//////// Year 5 Savings
	/*	var labYear5Savings = Ti.UI.createLabel({
	color : '#0082b4',
	font : {
	fontSize : '22dp',
	fontweight : 'bold'
	},
	text : 'Year 5 Savings',

	top : '80%',
	left : '60%',
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE
	});
	self.add(labYear5Savings);
	//////// Year 5 Savings ii
	var labYear5Savingsii = Ti.UI.createLabel({
	color : '#0082b4',
	font : {
	fontSize : '22dp',
	fontweight : 'bold'
	},
	text : '$ xxxxx.xx',

	top : '80%',
	left : '80%',
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE
	});
	self.add(labYear5Savingsii);*/
	//////// Prepaid By : Asim siddiqui
	var labPreparedBy = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontSize : '22dp',
			fontweight : 'bold'
		},
		text : 'Prepared By: \n' + globalVariables.GV.firstName + '  ' + globalVariables.GV.lastName,

		top : '90%',
		left : '5%',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		
	});
	self.add(labPreparedBy);
	//////////////////////////
	var imgCal = Ti.UI.createImageView({
		image : '/images/iconDollarSign.png',
		top : '85%',
		right : '5%',
		height : '90dp',
		width : '90dp'
	});
	self.add(imgCal);
	imgCal.addEventListener('click', function(e) {

		labMonthlySavings2.setText(Math.abs(globalVariables.GV.TotalCurrentFees - globalVariables.GV.TotalNewFees));

		labYear1Savingsii.setText(labMonthlySavings2.getText() * 12);
		//Ti.API.info(lab.getText());
		var result = parseFloat(labYear1Savingsii.getText()).toFixed(2);
		//result = '$ ' + result.toFixed(2);
		labYear1Savingsii.setText('$ ' + result);

		labYear2Savingsii.setText(labMonthlySavings2.getText() * 24);

		var resultYear2Savingsii = parseFloat(labYear2Savingsii.getText()).toFixed(2);
		//resultYear2Savingsii = '$ ' + resultYear2Savingsii.toFixed(2);
		labYear2Savingsii.setText('$ ' + resultYear2Savingsii);

		Ti.API.info(labYear2Savingsii);
		labYear3Savingsii.setText(labMonthlySavings2.getText() * 36);

		var resultYear3Savingsii = parseFloat(labYear3Savingsii.getText()).toFixed(2);
		//resultYear3Savingsii = '$ ' + resultYear3Savingsii.toFixed(2);
		labYear3Savingsii.setText('$ ' + resultYear3Savingsii);

		labYear4Savingsii.setText(labMonthlySavings2.getText() * 48);

		var resultYear4Savingsii = parseFloat(labYear4Savingsii.getText()).toFixed(2);
		//resultYear4Savingsii = '$ ' + resultYear4Savingsii.toFixed(2);
		labYear4Savingsii.setText('$ ' + resultYear4Savingsii);

		var resultMonthlySavings2 = parseFloat(labMonthlySavings2.getText()).toFixed(2);
		//resultMonthlySavings2 = '$ ' + resultMonthlySavings2.toFixed(2);
		labMonthlySavings2.setText('$ ' + resultMonthlySavings2);
		//////////////
		//acs.();

		globalVariables.GV.MonthlySavings = resultMonthlySavings2;
		globalVariables.GV.Year1Savings = result;
		globalVariables.GV.Year2Savings = resultYear2Savingsii;
		globalVariables.GV.Year3Savings = resultYear3Savingsii;
		globalVariables.GV.Year4Savings = resultYear4Savingsii;

		labCurrentEffectiveRate2.setText(globalVariables.GV.CurrentEffectiveRate+' %');
		labTotalCurrentFees2.setText('$ '+globalVariables.GV.TotalCurrentFees);
			
		labProposedFees2.setText('$ '+globalVariables.GV.TotalNewFees);
		labProposedEffectiveRate2.setText(globalVariables.GV.NewEffectiveRate+' %');
		
		if(globalVariables.GV.requestedUpdate)
		{
			var dialog = Ti.UI.createAlertDialog({
    			cancel: 1,
    			buttonNames: ['YES', 'NO'],
    			message: 'This will save the updated proposal and reset all fields to begin a new proposal. Hit YES to save or NO to continue editing the proposal.',
    			title: 'Update Proposal'
  			});
  			dialog.addEventListener('click', function(e){
    			if (e.index === e.source.cancel){
      				Ti.API.info('The cancel button was clicked');
    			}
    			else{  
  
					db.updateLocalProposal(function(f){
						alert("database record updated with PropID: "+f.proposalId);
						var thisPropId = f.proposalId;
						//self.add(goButton);
						//Ti.API.info("SESSION ID IS:  " +globalVariables.GV.sessionId);
						if(Ti.Network.online)
						{
							if(!globalVariables.GV.cloudSessionSet){
								acs.isLoggedIn(function(e){
									if(e.loggedIn){
										acs.updateProposal(null, function(g){
											if(g.success){
												//updated IsUpdated Column in DB
												db.setUpdateOff({proposalId: thisPropId}, function(h){
													if(h.success){
														db.setUploadedOn({proposalId: thisPropId}, function(i){
															alert("Proposal Synced with cloud");
															Ti.App.fireEvent('reloadProposals');
															globalVariables.GV.ResetValues();
															Ti.App.fireEvent('fillBusinessInfo',{initialize:true});
															Ti.App.fireEvent('fillCSInfo',{initialize:true});
															Ti.App.fireEvent('fillIaInfo',{initialize:true});
															Ti.App.fireEvent('fillSavingsInfo',{initialize:true});
															Ti.App.fireEvent('fillProposedPricing',{initialize:true});
															Ti.App.fireEvent('fillNotes',{initialize:true});
														});
													}
												});
											}
										});
									}
								});
							}
							else{
								
								acs.updateProposal(null, function(g){
									if(g.success){
										//updated IsUpdated Column in DB
										db.setUpdateOff({proposalId: thisPropId}, function(h){
											if(h.success){
												db.setUploadedOn({proposalId: thisPropId}, function(h){
													alert("Proposal Synced with cloud");
													Ti.App.fireEvent('reloadProposals');
													globalVariables.GV.ResetValues();
													Ti.App.fireEvent('fillBusinessInfo',{initialize:true});
													Ti.App.fireEvent('fillCSInfo',{initialize:true});
													Ti.App.fireEvent('fillIaInfo',{initialize:true});
													Ti.App.fireEvent('fillSavingsInfo',{initialize:true});
													Ti.App.fireEvent('fillProposedPricing',{initialize:true});
													Ti.App.fireEvent('fillNotes',{initialize:true});
												});
											}
										});
									}
									else{
										db.setUploadedOff({proposalId: thisPropId}, function(e){
											Ti.App.fireEvent('reloadProposals');
											globalVariables.GV.ResetValues();
											Ti.App.fireEvent('fillBusinessInfo',{initialize:true});
											Ti.App.fireEvent('fillCSInfo',{initialize:true});
											Ti.App.fireEvent('fillIaInfo',{initialize:true});
											Ti.App.fireEvent('fillSavingsInfo',{initialize:true});
											Ti.App.fireEvent('fillProposedPricing',{initialize:true});
											Ti.App.fireEvent('fillNotes',{initialize:true});
										});
									}
								});
							}
						}
						else{
							db.setUploadedOff({proposalId: thisPropId}, function(e){
								Ti.App.fireEvent('reloadProposals');
								globalVariables.GV.ResetValues();
								Ti.App.fireEvent('fillBusinessInfo',{initialize:true});
								Ti.App.fireEvent('fillCSInfo',{initialize:true});
								Ti.App.fireEvent('fillIaInfo',{initialize:true});
								Ti.App.fireEvent('fillSavingsInfo',{initialize:true});
								Ti.App.fireEvent('fillProposedPricing',{initialize:true});
								Ti.App.fireEvent('fillNotes',{initialize:true});
								alert("Device is offline. Sync with cloud after connecting to WiFi Network");
							});
						}
					});
				}
				globalVariables.GV.requestedUpdate=false;
			});
  			dialog.show();
		}
		else{	
			globalVariables.GV.ProposalStatus="Appointment";
			globalVariables.GV.rpID='00';
			db.FillProposal(function(){
				alert("proposal saved locally with timeId");
				//self.add(goButton);
				//Ti.API.info("SESSION ID IS:  " +globalVariables.GV.sessionId);
				if(Ti.Network.online)
				{
					acs.createProposal(null,function(f){
						if(f.success)
						{
							alert("Proposal Synced with cloud");
							db.InsertProposalID(f, function(g){
								if(g.success)
								{
									Ti.App.fireEvent('reloadProposals');
									globalVariables.GV.ResetValues();
									Ti.App.fireEvent('fillBusinessInfo',{initialize:true});
									Ti.App.fireEvent('fillCSInfo',{initialize:true});
									Ti.App.fireEvent('fillIaInfo',{initialize:true});
									Ti.App.fireEvent('fillSavingsInfo',{initialize:true});
									Ti.App.fireEvent('fillProposedPricing',{initialize:true});
									Ti.App.fireEvent('fillNotes',{initialize:true});
									alert("proposal ID updated in local db");
								}
								else{
									alert("Error saving Proposal locally.  \n"+JSON.stringify(g.results));
								}
								
							});
						}
					});
				}
				else{
					Ti.App.fireEvent('reloadProposals');
					globalVariables.GV.ResetValues();
					Ti.App.fireEvent('fillBusinessInfo',{initialize:true});
					Ti.App.fireEvent('fillCSInfo',{initialize:true});
					Ti.App.fireEvent('fillIaInfo',{initialize:true});
					Ti.App.fireEvent('fillSavingsInfo',{initialize:true});
					Ti.App.fireEvent('fillProposedPricing',{initialize:true});
					Ti.App.fireEvent('fillNotes',{initialize:true});
					alert("Device is offline. Sync with cloud after connecting to WiFi Network");
				}	
			});
		}

	});

	var goButton = Ti.UI.createButton({
		title : 'Create PDF',
		top : '4%',
		color : '#0082b4',
		right : 40,
		height : 70
	});
	
	self.add(goButton);
	// var calcBtn = Ti.UI.createButton({
		// title : 'Calculate Savings',
		// top: '90%',
		// right: '25%',
		// color : '#0082b4',
		// height : "40dp",
		// font: {
			// fontSize: "30"
		// }
// 		
	// });
// 	
	// calcBtn.addEventListener("click", function(e){
// 		
		// // labTotalCurrentFees2.setText('$ '+ parseFloat(globalVariables.GV.TotalCurrentFees).toFixed(2));
		// // labCurrentEffectiveRate2.setText(parseFloat(globalVariables.GV.CurrentEffectiveRate).toFixed(2)+' %');
		// // labProposedFees2.setText('$ ' + parseFloat(globalVariables.GV.TotalNewFees).toFixed(2));
		// // labProposedEffectiveRate2.setText(parseFloat(globalVariables.GV.NewEffectiveRate).toFixed(2) + ' %');
// // 		
		// // labMonthlySavings2.setText('$ '+ parseFloat(globalVariables.GV.MonthlySavings).toFixed(2));
// // 	
		// // labYear1Savingsii.setText('$ ' + parseFloat(globalVariables.GV.Year1Savings).toFixed(2));
		// // labYear2Savingsii.setText('$ ' + parseFloat(globalVariables.GV.Year2Savings).toFixed(2));
		// // labYear3Savingsii.setText('$ ' + parseFloat(globalVariables.GV.Year3Savings).toFixed(2));
		// // labYear4Savingsii.setText('$ ' + parseFloat(globalVariables.GV.Year4Savings).toFixed(2));
// 		
		// labMonthlySavings2.setText(Math.abs(globalVariables.GV.TotalCurrentFees - globalVariables.GV.TotalNewFees));
// 
		// labYear1Savingsii.setText(labMonthlySavings2.getText() * 12);
		// //Ti.API.info(lab.getText());
		// var result = parseFloat(labYear1Savingsii.getText()).toFixed(2);
		// //result = '$ ' + result.toFixed(2);
		// labYear1Savingsii.setText('$ ' + result);
// 
		// labYear2Savingsii.setText(labMonthlySavings2.getText() * 24);
// 
		// var resultYear2Savingsii = parseFloat(labYear2Savingsii.getText()).toFixed(2);
		// //resultYear2Savingsii = '$ ' + resultYear2Savingsii.toFixed(2);
		// labYear2Savingsii.setText('$ ' + resultYear2Savingsii);
// 
		// Ti.API.info(labYear2Savingsii);
		// labYear3Savingsii.setText(labMonthlySavings2.getText() * 36);
// 
		// var resultYear3Savingsii = parseFloat(labYear3Savingsii.getText()).toFixed(2);
		// //resultYear3Savingsii = '$ ' + resultYear3Savingsii.toFixed(2);
		// labYear3Savingsii.setText('$ ' + resultYear3Savingsii);
// 
		// labYear4Savingsii.setText(labMonthlySavings2.getText() * 48);
// 
		// var resultYear4Savingsii = parseFloat(labYear4Savingsii.getText()).toFixed(2);
		// //resultYear4Savingsii = '$ ' + resultYear4Savingsii.toFixed(2);
		// labYear4Savingsii.setText('$ ' + resultYear4Savingsii);
// 
		// var resultMonthlySavings2 = parseFloat(labMonthlySavings2.getText()).toFixed(2);
		// //resultMonthlySavings2 = '$ ' + resultMonthlySavings2.toFixed(2);
		// labMonthlySavings2.setText('$ ' + resultMonthlySavings2);
		// //////////////
		// //acs.();
// 
		// globalVariables.GV.MonthlySavings = resultMonthlySavings2;
		// globalVariables.GV.Year1Savings = result;
		// globalVariables.GV.Year2Savings = resultYear2Savingsii;
		// globalVariables.GV.Year3Savings = resultYear3Savingsii;
		// globalVariables.GV.Year4Savings = resultYear4Savingsii;
// 
		// labCurrentEffectiveRate2.setText(globalVariables.GV.CurrentEffectiveRate+' %');
		// labTotalCurrentFees2.setText('$ '+globalVariables.GV.TotalCurrentFees);
// 			
		// labProposedFees2.setText('$ '+globalVariables.GV.TotalNewFees);
		// labProposedEffectiveRate2.setText(globalVariables.GV.NewEffectiveRate+' %');
// 		
		// labProposal.setText('Proposal For ' + globalVariables.GV.BusinessName);
		// labPreparedBy.setText('Prepared By :   ' + globalVariables.GV.repName);
	// });
// 	
	// self.add(calcBtn);
	
	goButton.addEventListener('click', function(e) {

		//REMOVE BUTTONS
		self.remove(goButton);
		self.remove(imgCal);
		self.remove(labPreparedBy);
			
		//CHANGE SIZE AND COLOR
		self.height=1300;
		var children = self.getChildren();//labProposdPricing.color='#000';
		for (var i=0;i<children.length;i++){
			Ti.API.info(children[i].apiName);
			if(children[i].apiName=='Ti.UI.Label')
			{
				children[i].color="#000";
			}
		}
		
		//ADD CORPORATE TEXT
		var footerLogo = Ti.UI.createImageView({
			image: "/images/imageOnly.png",
			top: 590,
			width: 900,
			height: 300
		});
		self.add(footerLogo);
		
		var footerText1 = Ti.UI.createLabel({
			left: 5,
			top: 940,
			font : {
				fontSize : '22dp',
				fontweight : 'bold'
			},
			text : 'Prepared By: \n' + globalVariables.GV.firstName + '  ' + globalVariables.GV.lastName+
					'\n\nPriority Payment System South'+
					'\n(866) 648-6449 option 2'+
					'\nwww.ppssouth.com'+
					'\nsales@prioritypays.com'
		});
		self.add(footerText1);
		
		var footerText2 = Ti.UI.createLabel({
			right: 5,
			left: '45%',
			top: 940,
			font : {
				fontSize : '22dp',
				fontweight : 'bold'
			},
			text: 'The Value of Partnering with Priority begins with:\n\n'+
				  '     * Fair and Transparent Pricing.\n'+
     			  ' 	* Easy to read Monthly Statements.\n'+
     			  ' 	* One statement for all cards Visa, Mastercard,\n       American Express, Discover and Debit.\n'+
     			  ' 	* Next Day Funding for all card types.'
		});
		
		self.add(footerText2);
		
		var footerText3 = Ti.UI.createLabel({
			left: 5,
			top: 1200,
			font:{
				fontSize: 16
			},
			text: 'This quote is based on the merchant statement/information provided by the merchant. This offer is valid for 30 days. After 30 '+ 
				  'days we may need to complete another comparison because interchange can fluctuate month to month. Our overall effective '+
				  'rate is also based on the interchange categories for the bankcards you process each month.'
		});
		
		self.add(footerText3);
		var pdfBlob = converters.convertImageToPDF(self.toImage(),100);
		var pdfFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, globalVariables.GV.BusinessName + '.pdf');
		pdfFile.write(pdfBlob);
		Ti.API.info(pdfFile.nativePath);
		var docViewer = Ti.UI.iOS.createDocumentViewer({
			url : pdfFile.nativePath
		});
		docViewer.show({
			animated : true
		});
		docViewer.addEventListener("unload", function(e) {
			docViewer = null;
			self.height=Ti.UI.FILL;
			self.add(goButton);
			self.add(imgCal);
			self.remove(footerLogo);
			footerLogo=null;
			self.remove(footerText1);
			self.add(labPreparedBy);
			footerText1=null;
			self.remove(footerText3);
			footerText3=null;
			self.remove(footerText2);
			footerText2=null;
			for (var i=0;i<children.length;i++){
				Ti.API.info(children[i].apiName);
				if(children[i].apiName=='Ti.UI.Label')
				{
					children[i].color="#0082b4";
				}
			}
			//self.add(calcBtn);
		});
		//	});
	});
	
	Ti.App.addEventListener('fillSavingsInfo', function(e){
		if(!e.initialize){
			
			labMonthlySavings2.setText(Math.abs(globalVariables.GV.TotalCurrentFees - globalVariables.GV.TotalNewFees));

			labYear1Savingsii.setText(labMonthlySavings2.getText() * 12);
			//Ti.API.info(lab.getText());
			var result = parseFloat(labYear1Savingsii.getText()).toFixed(2);
			//result = '$ ' + result.toFixed(2);
			labYear1Savingsii.setText('$ ' + result);
	
			labYear2Savingsii.setText(labMonthlySavings2.getText() * 24);
	
			var resultYear2Savingsii = parseFloat(labYear2Savingsii.getText()).toFixed(2);
			//resultYear2Savingsii = '$ ' + resultYear2Savingsii.toFixed(2);
			labYear2Savingsii.setText('$ ' + resultYear2Savingsii);
	
			Ti.API.info(labYear2Savingsii);
			labYear3Savingsii.setText(labMonthlySavings2.getText() * 36);
	
			var resultYear3Savingsii = parseFloat(labYear3Savingsii.getText()).toFixed(2);
			//resultYear3Savingsii = '$ ' + resultYear3Savingsii.toFixed(2);
			labYear3Savingsii.setText('$ ' + resultYear3Savingsii);
	
			labYear4Savingsii.setText(labMonthlySavings2.getText() * 48);
	
			var resultYear4Savingsii = parseFloat(labYear4Savingsii.getText()).toFixed(2);
			//resultYear4Savingsii = '$ ' + resultYear4Savingsii.toFixed(2);
			labYear4Savingsii.setText('$ ' + resultYear4Savingsii);
	
			var resultMonthlySavings2 = parseFloat(labMonthlySavings2.getText()).toFixed(2);
			//resultMonthlySavings2 = '$ ' + resultMonthlySavings2.toFixed(2);
			labMonthlySavings2.setText('$ ' + resultMonthlySavings2);
			//////////////
			//acs.();
	
			globalVariables.GV.MonthlySavings = resultMonthlySavings2;
			globalVariables.GV.Year1Savings = result;
			globalVariables.GV.Year2Savings = resultYear2Savingsii;
			globalVariables.GV.Year3Savings = resultYear3Savingsii;
			globalVariables.GV.Year4Savings = resultYear4Savingsii;
	
			labCurrentEffectiveRate2.setText(globalVariables.GV.CurrentEffectiveRate+' %');
			labTotalCurrentFees2.setText('$ '+globalVariables.GV.TotalCurrentFees);
				
			labProposedFees2.setText('$ '+globalVariables.GV.TotalNewFees);
			labProposedEffectiveRate2.setText(globalVariables.GV.NewEffectiveRate+' %');
			// labTotalCurrentFees2.setText('$ '+ parseFloat(globalVariables.GV.TotalCurrentFees).toFixed(2));
			// labCurrentEffectiveRate2.setText(parseFloat(globalVariables.GV.CurrentEffectiveRate).toFixed(2)+' %');
			// labProposedFees2.setText('$ ' + parseFloat(globalVariables.GV.TotalNewFees).toFixed(2));
			// labProposedEffectiveRate2.setText(parseFloat(globalVariables.GV.NewEffectiveRate).toFixed(2) + ' %');
	// 		
			// labMonthlySavings2.setText('$ '+ parseFloat(globalVariables.GV.MonthlySavings).toFixed(2));
	// 	
			// labYear1Savingsii.setText('$ ' + parseFloat(globalVariables.GV.Year1Savings).toFixed(2));
			// labYear2Savingsii.setText('$ ' + parseFloat(globalVariables.GV.Year2Savings).toFixed(2));
			// labYear3Savingsii.setText('$ ' + parseFloat(globalVariables.GV.Year3Savings).toFixed(2));
			// labYear4Savingsii.setText('$ ' + parseFloat(globalVariables.GV.Year4Savings).toFixed(2));
	// 		
			labProposal.setText('Proposal For ' + globalVariables.GV.BusinessName);
			labPreparedBy.setText('Prepared By:\n' + globalVariables.GV.repName);
			if(globalVariables.GV.requestedUpdate && e.alert){
				
				alert("SAVINGS UPDATED");
			}
		}
		else{
			labTotalCurrentFees2.setText("");
			labCurrentEffectiveRate2.setText("");
			labProposedFees2.setText("");
			labProposedEffectiveRate2.setText("");
			
			labMonthlySavings2.setText("");
		
			labYear1Savingsii.setText("");
			labYear2Savingsii.setText("");
			labYear3Savingsii.setText("");
			labYear4Savingsii.setText("");
			
			labProposal.setText('Proposal For ');
			labPreparedBy.setText('Prepared By :   ');
		}
	});
	return self;
};
