var GetPdfNumbers = require('lib/GetPdfNumbers');
exports.LibraryView = function() {
	var fontStyle = 'gillsanslight.ttf';
	var self = Ti.UI.createView({
		backgroundColor : 'transparent',
		width : Ti.UI.FILL, //"93%",
		height : 704,//704,
		top: 704,
		bottom: -704
		//zIndex : 1
	});
	
	var tvContainer = Ti.UI.createView({
		top: "2%",
		height: Ti.UI.FILL,
		width: "86.4%",
		bottom: "2%",
		borderColor: "#a9a9a9",
		borderWidth: 2.5
	});
	
	self.add(tvContainer);
	
	// var titleLbl = Ti.UI.createLabel({
		// color : '#0082b4',
		// text : 'Library',
		// textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		// font : {
			// //fontFamily : 'GillSans-Light',
			// fontSize : "24dp",
			// //fontWeight: "bold"
		// },
		// height : Titanium.UI.SIZE,
		// width : Ti.UI.SIZE,
		// backgroundColor: '#d0d0d0'
	// });

	//self.titleControl = titleLbl;
	var docViewer = null; 
	
	var defaultFontSize = 14;
	
	var syncBtn = Ti.UI.createImageView({
		image : '/images/PPS-South_Icons-Refresh.png',
		bottom : '3%',
		width : '5.8%',
		height : '8.5%',
		right : '0.5%'

	});
	
	self.add(syncBtn);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var slideIn = Titanium.UI.createAnimation({
		right : 0,
	});
	var slideOut = Titanium.UI.createAnimation({
		right : -768,
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var labMark = [];
	var imgView = [];
	var viewPlaceHolder = [];
	var viewMarketing = Titanium.UI.createView({
		
		//backgroundColor : '#EEEEEEEE',
		width : '75%',
		//width : 768,
		//layout: "horizontal",
		height : Ti.UI.FILL,
		right : 0

	});
	
	var tableMarketingData = [];
	var tableMarketing = Ti.UI.createTableView({
		backgroundColor : 'white',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		separatorInsets:{
			left:0
		}
	});
	

	viewMarketing.add(tableMarketing);
	var lastView = viewMarketing;
	var MarketingArr = GetPdfNumbers.GetPdfNumbers('Marketing');
	for ( i = 0; i < MarketingArr.length; i++) {

		viewPlaceHolder[i] = Ti.UI.createTableViewRow({
			
			height : '90dp',
			
		});
		viewMarketing.add(viewPlaceHolder[i]);
		imgView[i] = Ti.UI.createImageView({
			
			right : '30dp',
			width : '60dp',
			height : '70dp',
			myid : i,
			image : '/images/iconPdf.png'
		});
		viewPlaceHolder[i].add(imgView[i]);

		labMark[i] = Ti.UI.createLabel({
			text : MarketingArr[i],
			color : 'black',
			font : {
				fontSize : '20dp',
				fontFamily : 'GillSans-Light'
			},
			left : '90dp',
			
			width : Ti.UI.SIZE,
			height : Ti.UI.FILL
		});

		viewPlaceHolder[i].add(labMark[i]);
		tableMarketingData.push(viewPlaceHolder[i]);
	}
	tableMarketing.setData(tableMarketingData);
	tableMarketing.addEventListener('click',function(e){
		
		docViewer=null;
		docViewer = Ti.UI.iOS.createDocumentViewer({
			url: '/Pdf/Marketing/' + MarketingArr[e.index]
		});
		//docViewer.url = 'Pdf/Marketing/' + MarketingArr[e.index];
		//Ti.API.info("DOCVIEWER FILE:  "+MarketingArr[e.index]);
		docViewer.show({
			animated : true
		});

	});


	tvContainer.add(viewMarketing);
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////// mx pos
	var viewMXPos = Titanium.UI.createView({
		//backgroundColor : '#EEEEEEEE',
		width : '75%',
		layout : 'horizontal',
		height : Ti.UI.FILL,
		right : -768
		

	});
	var viewPlaceHolder = [];
	var tableMXPosData = [];
	var tableMXPos = Ti.UI.createTableView({
		backgroundColor : 'white',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		separatorInsets:{
			left:0
		}
		
	});
	viewMXPos.add(tableMXPos);
	var imgView = [];
	var labMXpos = [];
	var MxposArr = GetPdfNumbers.GetPdfNumbers('MXPOS');
	for ( i = 0; i < MxposArr.length; i++) {

		viewPlaceHolder[i] = Ti.UI.createTableViewRow({
			
			height : '90dp',
			
				});
		viewMXPos.add(viewPlaceHolder[i]);

		imgView[i] = Ti.UI.createImageView({
			
			right : '30dp',
			width : '60dp',
			height : '70dp',
			myid : i,
			image : '/images/iconPdf.png'
		});
		viewPlaceHolder[i].add(imgView[i]);
		labMXpos[i] = Ti.UI.createLabel({
			text : MxposArr[i],

			color : 'black',
			font : {
				fontSize : '20dp',
				fontFamily : 'GillSans-Light'
			},
			left : '90dp',
			
			width : Ti.UI.SIZE,
			height : Ti.UI.FILL
		});

		viewPlaceHolder[i].add(labMXpos[i]);
		tableMXPosData.push(viewPlaceHolder[i]);

	}

	tableMXPos.setData(tableMXPosData);

    tableMXPos.addEventListener('click',function(e){
		
		docViewer=null;
		docViewer = Ti.UI.iOS.createDocumentViewer({
			url: '/Pdf/MXPOS/' + MxposArr[e.index]
		});
		//Ti.API.info('/Pdf/MXPOS/' + MxposArr[e.index]);
			docViewer.show({
				//url: 'Pdf/MXPOS/' + MxposArr[e.index],
				animated : true
			});

	});

	tvContainer.add(viewMXPos);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////                                            pay roll
	var viewPayroll = Titanium.UI.createView({
		
		backgroundColor : '#EEEEEEEE',
		width : '75%',
	
		height : Ti.UI.FILL,
		right : -768,
		
	});
	var labPayroll = [];
	var imgView = [];
	var PayrollArr = GetPdfNumbers.GetPdfNumbers('Payroll');
	var viewPlaceHolder = [];

	//table view

	var tablePayRollData = [];

	var tablePayRoll = Ti.UI.createTableView({
		backgroundColor : 'white',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		separatorInsets:{
			left:0
		}
	});
	viewPayroll.add(tablePayRoll);
	for ( i = 0; i < PayrollArr.length; i++) {

		viewPlaceHolder[i] = Ti.UI.createTableViewRow({
			
			height : '90dp',
			
		});
		viewPayroll.add(viewPlaceHolder[i]);

		imgView[i] = Ti.UI.createImageView({
			
			right : '30dp',
			width : '60dp',
			height : '70dp',
			myid : i,
			image : '/images/iconPdf.png'
		});
		viewPlaceHolder[i].add(imgView[i]);

		labPayroll[i] = Ti.UI.createLabel({
			text : PayrollArr[i],
			color : 'black',
			font : {
				fontSize : '20dp',
				fontFamily : 'GillSans-Light'
			},
			left : '90dp',
			
			width : Ti.UI.SIZE,
			height : Ti.UI.FILL
		});

		viewPlaceHolder[i].add(labPayroll[i]);
		
		tablePayRollData.push(viewPlaceHolder[i]);

	}

	tablePayRoll.setData(tablePayRollData);
	tablePayRoll.addEventListener('click',function(e){
		
		docViewer=null;
		docViewer = Ti.UI.iOS.createDocumentViewer({
			url: '/Pdf/Payroll/' + PayrollArr[e.index]
		});
			Ti.API.info(MarketingArr[e.source.myid]);
			docViewer.show({

				animated : true
			});

	});

	tvContainer.add(viewPayroll);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var viewPitchBook = Titanium.UI.createView({
		/////borderRadius:10,
		backgroundColor : '#EEEEEEEE',
		width : '75%',
		//layout : 'horizontal',
		height : Ti.UI.FILL,
		right : -768
	});
	
	var labPitchBook = [];
	var imgView = [];
	var PitchBookArr = GetPdfNumbers.GetPdfNumbers('PitchBook');
	var viewPlaceHolder = [];

	var tablePitchBookData = [];

	var tablePitchBook = Ti.UI.createTableView({
		backgroundColor : 'white',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		separatorInsets:{
			left:0
		}
	});
	viewPitchBook.add(tablePitchBook);
	for ( i = 0; i < PitchBookArr.length; i++) {

		viewPlaceHolder[i] = Ti.UI.createTableViewRow({
			
			height : '90dp',
			
		});
		viewPitchBook.add(viewPlaceHolder[i]);

		imgView[i] = Ti.UI.createImageView({
			
			right : '30dp',
			width : '60dp',
			height : '70dp',
			myid : i,
			image : '/images/iconPdf.png'
		});
		viewPlaceHolder[i].add(imgView[i]);

		labPitchBook[i] = Ti.UI.createLabel({
			text : PitchBookArr[i],
			color : 'black',
			font : {
				fontSize : '20dp',
				fontFamily : 'GillSans-Light'
			},
			left : '90dp',
			
			width : Ti.UI.SIZE,
			height : Ti.UI.FILL
		});

		viewPlaceHolder[i].add(labPitchBook[i]);
		
		tablePitchBookData.push(viewPlaceHolder[i]);

	}

	tablePitchBook.setData(tablePitchBookData);
	tablePitchBook.addEventListener('click',function(e){
		
		docViewer=null;
		docViewer = Ti.UI.iOS.createDocumentViewer({
			url: '/Pdf/PitchBook/' + PitchBookArr[e.index]
		});
			docViewer.show({

				animated : true
			});

	});

	tvContainer.add(viewPitchBook);
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////////                                               view pricing
	var viewPricing = Titanium.UI.createView({
		
		backgroundColor : '#EEEEEEEE',
		width : '75%',
		
		height : Ti.UI.FILL,
		right : -768
		
	});

	var imgView = [];
	var PricingArr = GetPdfNumbers.GetPdfNumbers('Pricing');
	var viewPlaceHolder = [];
	var tablePricingData = [];
	var labPricing = [];

	var tablePricing = Ti.UI.createTableView({
		backgroundColor : 'white',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		separatorInsets:{
			left:0
		}
	});
	viewPricing.add(tablePricing);
	for ( i = 0; i < PricingArr.length; i++) {
		viewPlaceHolder[i] = Ti.UI.createTableViewRow({
			
			height : '90dp',
			
		});
		viewPricing.add(viewPlaceHolder[i]);

		imgView[i] = Ti.UI.createImageView({
			
			right : '30dp',
			width : '60dp',
			height : '70dp',
			myid : i,
			image : '/images/iconPdf.png'
		});
		viewPlaceHolder[i].add(imgView[i]);
		labPricing[i] = Ti.UI.createLabel({
			text : PricingArr[i],
			color : 'black',
			font : {
				fontSize : '20dp',
				fontFamily : 'GillSans-Light'
			},
			left : '90dp',
			
			width : Ti.UI.SIZE,
			height : Ti.UI.FILL
		});

		viewPlaceHolder[i].add(labPricing[i]);
		

		tablePricingData.push(viewPlaceHolder[i]);

	}

	tablePricing.setData(tablePricingData);
tablePricing.addEventListener('click',function(e){
		
		docViewer=null;
		docViewer = Ti.UI.iOS.createDocumentViewer({
			url: '/Pdf/Pricing/' + PricingArr[e.index]
		});
			Ti.API.info(MarketingArr[e.source.myid]);
			docViewer.show({

				animated : true
			});

	});

	tvContainer.add(viewPricing);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////        priority Paper
	var viewPriorityPaper = Titanium.UI.createView({
		
		backgroundColor : '#EEEEEEEE',
		width : '75%',
	
		height : Ti.UI.FILL,
		
		right : -768

	});

	var imgView = [];
	var PriorityPaperArr = GetPdfNumbers.GetPdfNumbers('PriorityPaperwork');
	var viewPlaceHolder = [];
	var tablePriPaperData = [];

	var tablePriPaper = Ti.UI.createTableView({
		backgroundColor : 'white',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		separatorInsets:{
			left:0
		}
	});
	viewPriorityPaper.add(tablePriPaper);
	var labPriority = [];
	for ( i = 0; i < PriorityPaperArr.length; i++) {
		viewPlaceHolder[i] = Ti.UI.createTableViewRow({
			
			height : '90dp',
			
					});
		viewPriorityPaper.add(viewPlaceHolder[i]);

		imgView[i] = Ti.UI.createImageView({
			
			right : '30dp',
			width : '60dp',
			height : '70dp',
			myid : i,
			image : '/images/iconPdf.png'
		});
		viewPlaceHolder[i].add(imgView[i]);

		labPriority[i] = Ti.UI.createLabel({
			text : PriorityPaperArr[i],
			color : 'black',
			font : {
				fontSize : '20dp',
				fontFamily : 'GillSans-Light'
			},
			left : '90dp',
			
			width : Ti.UI.SIZE,
			height : Ti.UI.FILL

		});

		viewPlaceHolder[i].add(labPriority[i]);

		

		tablePriPaperData.push(viewPlaceHolder[i]);

	}

	tablePriPaper.setData(tablePriPaperData);

tablePriPaper.addEventListener('click',function(e){
		
		docViewer=null;
		docViewer = Ti.UI.iOS.createDocumentViewer({
			url: '/Pdf/PriorityPaperwork/' + PriorityPaperArr[e.index]
		});
			Ti.API.info(MarketingArr[e.source.myid]);
			docViewer.show({

				animated : true
			});

	});

	tvContainer.add(viewPriorityPaper);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var viewTerminalSell = Titanium.UI.createView({
		
		backgroundColor : '#EEEEEEEE',
		width : '75%',
		
		height : Ti.UI.FILL,
		right : -768
	});

	var imgView = [];
	var TerminalArr = GetPdfNumbers.GetPdfNumbers('TerminalSellSheets');
	var viewPlaceHolder = [];
	var labTerminal = [];
	var tableTerminalData = [];

	var tableTerminal = Ti.UI.createTableView({
		backgroundColor : 'white',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		separatorInsets:{
			left:0
		}
	});
	viewTerminalSell.add(tableTerminal);

	for ( i = 0; i < TerminalArr.length; i++) {

		viewPlaceHolder[i] = Ti.UI.createTableViewRow({
			
			height : '90dp',
			
		});
		viewTerminalSell.add(viewPlaceHolder[i]);
		imgView[i] = Ti.UI.createImageView({
			
			right : '30dp',
			width : '60dp',
			height : '70dp',
			myid : i,
			image : '/images/iconPdf.png'
		});
		viewPlaceHolder[i].add(imgView[i]);

		labTerminal[i] = Ti.UI.createLabel({
			text : TerminalArr[i],
			color : 'black',
			font : {
				fontSize : '20dp',
				fontFamily : 'GillSans-Light'
			},
			left : '90dp',
						width : Ti.UI.SIZE,
			height : Ti.UI.FILL
		});

		viewPlaceHolder[i].add(labTerminal[i]);
		
		

		tableTerminalData.push(viewPlaceHolder[i]);

	}

	tableTerminal.setData(tableTerminalData);
    tableTerminal.addEventListener('click',function(e){
		
		docViewer=null;
		docViewer = Ti.UI.iOS.createDocumentViewer({
			url: '/Pdf/TerminalSellSheets/' + TerminalArr[e.index]
		});
			//Ti.API.info(MarketingArr[e.source.myid]);
			docViewer.show({

				animated : true
			});

	});

	tvContainer.add(viewTerminalSell);
	
	var data = [{
		title : 'Marketing',
	}, {
		title : ' MX POS',
	}, {
		title : 'Payroll',
	}, {
		title : ' Pitch Book',
	}, {
		title : ' Pricing',
	}, {
		title : 'Priority Paperwork',
	}, {
		title : 'Terminal Sell Sheets',
	}];
	var tableData = [];

	for (var i = 0; i < data.length; i++) {
		var row = Ti.UI.createTableViewRow({
			className : 'forumEvent', 
			selectedBackgroundColor : 'white',
			rowIndex : i, 
			height : 75,
			//detailView: "view"+data[i].title
		});
		var labelPlanName = Ti.UI.createLabel({
			color : '#000',
			font : {
				fontFamily : 'GillSans-Light',
				fontSize : defaultFontSize + 6,
				fontWeight : 'bold'
			},
			textAlign : "center",
			text : data[i].title,
			width : Ti.UI.SIZE,
			height : '30dp',
		});
		row.add(labelPlanName);
		tableData.push(row);
	}
	var checkAnimate = 0;
	var tableView = Ti.UI.createTableView({
		backgroundColor : 'white',
		scrollable: false,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		width : '25%',
		left : '0%',
		data : tableData,
		//headerView: titleLbl,
		borderColor: "#a9a9a9",
		borderWidth: 1
	});

	tableView.addEventListener('click', function(e) {
		//lastView.animate(slideOut);
		switch(e.index){
			case 0:
				if(lastView != viewMarketing)
				{
					lastView.animate(slideOut);
					viewMarketing.animate(slideIn);
					lastView = viewMarketing;
				}
				break;
			case 1:
				if(lastView != viewMXPos){
					lastView.animate(slideOut);
					viewMXPos.animate(slideIn);
					lastView = viewMXPos;
				}
				break;
			case 2:
				if(lastView != viewPayroll)
				{
					lastView.animate(slideOut);
					viewPayroll.animate(slideIn);
					lastView = viewPayroll;
				}
				break;
			case 3:
				if(lastView != viewPitchBook)
				{
					lastView.animate(slideOut);
					viewPitchBook.animate(slideIn);
					lastView = viewPitchBook;
				}
				break;
			case 4: 
				if(lastView != viewPricing)
				{
					lastView.animate(slideOut);
					viewPricing.animate(slideIn);
					lastView = viewPricing;
				}
				break;
			case 5: 
				if(lastView != viewPriorityPaper)
				{
					lastView.animate(slideOut);
					viewPriorityPaper.animate(slideIn);
					lastView = viewPriorityPaper;
				}
				break;
			case 6:
				if(lastView != viewTerminalSell)
				{
					lastView.animate(slideOut);
					viewTerminalSell.animate(slideIn);
					lastView = viewTerminalSell;
				}
				break;
			default:
				break;
		}
	});
		// ////////////////////////////////////////////////                        index 0
		// if (e.index == 0) {
			// if (checkAnimate == 0) {
				// Ti.API.info('i m check animate 0 and index 0');
			// } else if (checkAnimate == 1) {
				// Ti.API.info('i m chk animate 1 and index 0');
				// viewMXPos.animate(slideOut);
				 // viewMarketing.animate(slideIn);
				// checkAnimate = 0;
			// } else if (checkAnimate == 2) {
				// viewMarketing.animate(slideIn);
				// viewPayroll.animate(slideOut);
				// checkAnimate = 0;
			// } else if (checkAnimate == 4) {
// 
				// viewMarketing.animate(slideIn);
				// viewPricing.animate(slideOut);
				// checkAnimate = 0;
			// } else if (checkAnimate == 5) {
				// viewMarketing.animate(slideIn);
				// viewPriorityPaper.animate(slideOut);
				// checkAnimate = 0;
			// } else {
				// viewMarketing.animate(slideIn);
				// viewTerminalSell.animate(slideOut);
				// checkAnimate = 0;
			// }
// 
		// }
// ///////////////////////////////////////////////////////index 1	
		// else
		// if (e.index == 1) {
// 
			// if (checkAnimate == 0) {
// 				
				// viewMarketing.animate(slideOut);
				// viewMXPos.animate(slideIn);
// 
				// checkAnimate = 1;
// 
			// } else if (checkAnimate == 1) {
// 				
// 
			// } else if (checkAnimate == 2) {
				// viewPayroll.animate(slideOut);
				// viewMXPos.animate(slideIn);
				// checkAnimate = 1;
			// } else if (checkAnimate == 4) {
				// viewPricing.animate(slideOut);
				// viewMXPos.animate(slideIn);
				// checkAnimate = 1;
			// } else if (checkAnimate == 5) {
				// viewMXPos.animate(slideIn);
				// viewPriorityPaper.animate(slideOut);
				// checkAnimate = 1;
			// } else {
				// viewMXPos.animate(slideIn);
				// viewTerminalSell.animate(slideOut);
				// checkAnimate = 1;
			// }
		// }
		// ////////////////////////////////////                                 index 2
// else if (e.index === 2) {
    // if (checkAnimate == 0) {
        // viewMarketing.animate(slideOut);
        // viewPayroll.animate(slideIn);
        // checkAnimate = 2;
    // } else if (checkAnimate == 1) {
        // viewMXPos.animate(slideOut);
        // viewPayroll.animate(slideIn);
        // checkAnimate = 2;
    // } else if (checkAnimate == 2) {
// 
    // } else if (checkAnimate == 4) {
        // viewPayroll.animate(slideIn);
        // viewPricing.animate(slideOut);
        // checkAnimate = 2;
    // } else if (checkAnimate == 5) {
        // viewPayroll.animate(slideIn);
        // viewPriorityPaper.animate(slideOut);
        // checkAnimate = 2;
    // } else {
        // viewPayroll.animate(slideIn);
        // viewTerminalSell.animate(slideOut);
        // checkAnimate = 2;
    // }
// 
// }
// 		 
// 		
		// ////////////////////////////////////                                 index 3
		// else
		// if (e.index == 3) {
// 
		// }
// 
		// ////////////////////////////////////                                 index 4
 // else if (e.index == 4) {
// 
     // if (checkAnimate == 0) {
         // viewMarketing.animate(slideOut);
         // viewPricing.animate(slideIn);
         // checkAnimate = 4;
     // } else if (checkAnimate == 1) {
         // viewMXPos.animate(slideOut);
         // viewPricing.animate(slideIn);
         // checkAnimate = 4;
     // } else if (checkAnimate == 2) {
         // viewPayroll.animate(slideOut);
         // viewPricing.animate(slideIn);
         // checkAnimate == 4;
// 
     // } else if (checkAnimate == 4) {
// 
     // } else if (checkAnimate == 5) {
         // viewPricing.animate(slideIn);
         // viewPriorityPaper.animate(slideOut);
         // checkAnimate = 4;
// 
     // } else {
         // viewPricing.animate(slideIn);
         // viewTerminalSell.animate(slideOut);
         // checkAnimate = 4;
     // }
// 
 // }
// 		
		// ////////////////////////////////////                                 index 5
// 
	// else if (e.index === 5) {
// 
	    // if (checkAnimate == 0) {
	        // viewMarketing.animate(slideOut);
	        // viewPriorityPaper.animate(slideIn);
	        // checkAnimate = 5;
	    // } else if (checkAnimate == 1) {
	        // viewMXPos.animate(slideOut);
	        // viewPriorityPaper.animate(slideIn);
	        // checkAnimate = 5;
	    // } else if (checkAnimate == 2) {
	        // viewPayroll.animate(slideOut);
	        // viewPriorityPaper.animate(slideIn);
	        // checkAnimate = 5;
	    // } else if (checkAnimate == 4) {
	        // viewPricing.animate(slideOut);
	        // viewPriorityPaper.animate(slideIn);
	        // checkAnimate = 5;
	    // } else if (checkAnimate == 5) {
// 
	    // } else {
	        // viewPriorityPaper.animate(slideIn);
	        // viewTerminalSell.animate(slideOut);
	        // checkAnimate = 5;
	    // }
// 
	// }
// 
		// ////////////////////////////////////                                 index 6
// 
		// else
		// {
			// if (checkAnimate == 0) {
				// viewMarketing.animate(slideOut);
				// viewTerminalSell.animate(slideIn);
				// checkAnimate = 6;
			// } else if (checkAnimate == 1) {
				// viewMXPos.animate(slideOut);
				// viewTerminalSell.animate(slideIn);
				// checkAnimate = 6;
			// } else if (checkAnimate == 2) {
				// viewPayroll.animate(slideOut);
				// viewTerminalSell.animate(slideIn);
				// checkAnimate = 6;
			// } else if (checkAnimate == 4) {
				// viewPricing.animate(slideOut);
				// viewTerminalSell.animate(slideIn);
				// checkAnimate = 6;
			// } else if (checkAnimate == 5) {
				// viewPriorityPaper.animate(slideOut);
				// viewTerminalSell.animate(slideIn);
				// checkAnimate = 6;
			// } else {
// 
			// }
		// }
	

	tvContainer.add(tableView);

	return self;

};
