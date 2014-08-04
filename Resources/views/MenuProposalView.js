var db = require('db/db');
var globalVariables = require('globalVariables');
var sync = require('lib/sync');
var loading = require('lib/loading').loading();
exports.MenuProposalView = function() {
	
	///////////////////////// ANIMATIONS /////////////////////////////////
	
	var self = Ti.UI.createView({
		backgroundColor : 'Transparent',
		width : Ti.UI.FILL,
		height : 704,
		bottom : -704,
		zIndex : 1
	});
	
	self.add(loading);
	
	var tvContainer = Ti.UI.createView({
		top: "2%",
		height: Ti.UI.FILL,
		width: "86.4%",
		bottom: "2%",
		borderColor: "#a9a9a9",
		borderWidth: 2.5
	});
	
	self.add(tvContainer);
	
	var syncBtn = Ti.UI.createImageView({
		image : '/images/PPS-South_Icons-Refresh.png',
		bottom : '3%',
		width : '5.8%',
		height : '8.5%',
		right : '0.5%'

	});
	
	self.add(syncBtn);
	
	syncBtn.addEventListener('click', function(e){
		// loading._show({
			// message: "SYNCING PROPOSALS"
		// });
		Ti.App.fireEvent('proposalSync');//,{ai: loading});
	});
	
	var myArray = [];
	
	var headerView = Titanium.UI.createView({
		//borderRadius : 10,
		backgroundColor : '#FFF',//'#d0d0d0',
		top : 0,
		layout : 'horizontal',
		width : '100%',
		height : '60dp',
	});
	tvContainer.add(headerView);
	var viewLine = Titanium.UI.createView({
		//borderRadius : 10,
		backgroundColor : '#6c6c6c',
		top : '60dp',
		//layout : 'horizontal',
		width : '100%',
		height : '2dp',
		zIndex : 1
	});
	tvContainer.add(viewLine);
	
	///////////////////////////////////////////////////////////////////////
	
	var labBname = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontFamily : 'Arial',
			fontSize : 25,
			//fontWeight : 'bold'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		text : 'BUSINESS NAME',
		left : 20,
		//top : '22dp',
		//backgroundColor: "blue",
		//left: "35%",
		//width : "55%"
		//		height : 30,
	});
	var bnameContainer = Ti.UI.createView({
		width: "50%",
		backgroundColor: "#ffffff"
	});
	bnameContainer.add(labBname);
	headerView.add(bnameContainer);
	
	///////////////////////////////////////////////////////////////////////
	
	var labStatus = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontFamily : 'Arial',
			fontSize : 25,
			//fontWeight : 'bold'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		text : 'STATUS',
		//left : '30',
		//top : '22dp',
		//left: "60%",
		//width: "20%"
		//backgroundColor: "green",
		//	height : 30,
	});
	
	var statusContainer = Ti.UI.createView({
		width: "15%",
		backgroundColor: "#ffffff"
	});
	
	statusContainer.add(labStatus);
	headerView.add(statusContainer);
	
	var labRP = Ti.UI.createLabel({
		color : '#0082b4',
		font : {
			fontFamily : 'Arial',
			fontSize : 25,
			//fontWeight : 'bold'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		text : 'REFERRAL PARTNER',
		//left : '30',
		//top : '22dp',
		//left: "75%",
		//width : "25%"
		//backgroundColor: "blue",
	});
	
	var rpContainer = Ti.UI.createView({
		width: "34.9%",
		backgroundColor: "#ffffff"
	});
	
	rpContainer.add(labRP);
	headerView.add(rpContainer);

	var myArray = [];
	
	// function GetRpName(id, callback){
		// for(var i=0;i<globalVariables.GV.ReferralPartners.length;i++){
			// if(globalVariables.GV.ReferralPartners[i].id==id){
				// callback({name: globalVariables.GV.ReferralPartners[i].title});
			// }
		// }
	// }
	
	function loadData(params){
		var tableData = [];
	
		db.ShowProposal(function(f){
			myArray = f.results;
			
			// if(globalVariables.GV.userRole=="Admin"){
				// data.sort(function (x, y) {
   	 				// var n = x.repName - y.repName;
				    // if (n != 0) {
				        // return n;
				    // }
// 
    				// return x.year - y.year;
				// });
			// }
			
			// myArray.sort(function(a, b) {
// 			    
			    // return a>b ? -1 : a<b ? 1 : 0;
			// });
			
			myArray.sort(function(a, b){
			    aDate = new Date(a.LastUpdated);
			    bDate = new Date(b.LastUpdated);
			    // return  (a.repName - b.repName) || (bDate - aDate);
			    
			    if(a.repName < b.repName){
			        return -1;  
			    }else if(a.repName > b.repName){
			        return 1;
			    }else{
			        if(aDate < bDate){
			           return 1;
			        }else if(aDate > bDate){
			          return -1;
			        }else{
			          return 0;
			        }
			    }
			    
			    // if(a.repName===b.repName){
			    	// return bDate - aDate;
			    // }
			    // else if(b.repName>a.repName){
			    	// return 
			    // }
			    // if(a.repName && !b.repName) {return -1;}
      			// if(!a.repName && b.repName) {return 1;}
      			// return bDate - aDate;
      			
      			// var dName = a.repName - b.repName;
    			// if(dName) return dName;
// // 
    			// // If there is a tie, sort by year
			    // var dDate = bDate - aDate;
			    // return dDate;
			});
			
			var sections=[];
			var j=0;
			
			for (var i = 0; i < myArray.length; i++) {
				var row = Ti.UI.createTableViewRow({
					className : 'proposalRow', // used to improve table performance
					selectedBackgroundColor : 'white',
					rowIndex : i, // custom property, useful for determining the row during events
					height : 70,
					//layout: "horizontal"
				});
	
				var nameView = Ti.UI.createView({
					backgroundColor: "transparent",
					//layout: "vertical",
					height: Ti.UI.FILL,
					width: "45%",
					left: 0
				});
			
				var labLastDate = Ti.UI.createLabel({
					color : '#B8B8B8',//d0d0d0',
					font : {
						fontFamily : 'Arial',
						//	fontSize : defaultFontSize + 6,
						//		fontWeight : 'bold'
					},
					text : new Date(myArray[i].LastUpdated).toLocaleString(),
					left : 5,
					top: 5,
					textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
					width : Ti.UI.SIZE,
					height : 8,
					zIndex: 1
					//backgroundColor: "blue"
				});
				
				//Ti.API.error(myArray[i].Date);
				var busName = Ti.UI.createLabel({
					color : '#222',
					font : {
						fontFamily : 'Arial',
						fontSize : 18,
						//fontWeight : 'normal'
					},
					text : myArray[i].BusinessName,
					left : 10,
					//top : 12,
					verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
					width : Ti.UI.SIZE,
					height: Ti.UI.SIZE,
					bottom:15
					//backgroundColor: "green"
				});
				//row.add(labelDetails);
			
				nameView.add(busName);
				nameView.add(labLastDate);
				
				row.add(nameView);
		
				var statusClickArea = Ti.UI.createView({
					width: "25%",
					height: Ti.UI.FILL,
					left: "45%",
					name: "status"
				});
				
				//check to fix bug with status being date
				if(myArray[i].ProposalStatus==null || myArray[i].ProposalStatus!="Appointment" || myArray[i].ProposalStatus!="Presented" || myArray[i].ProposalStatus!="Signed"){
					myArray[i].ProposalStatus="Appointment";
					myArray[i].IsUpdated=1;
				}
				
				var labStatus = Ti.UI.createLabel({
					color : '#222',
					font : {
						fontFamily : 'Arial',
						fontSize : 18,
						//fontWeight : 'normal'
					},
					text : myArray[i].ProposalStatus,
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
					//right : 65,
					bottom : 15,
					//width : "25%",
					height : Ti.UI.SIZE,
					//top: 28,
					//left: "40%",
					name: "status"
				});
				
				statusClickArea.add(labStatus);
				row.add(statusClickArea);
				
				var rpClickArea = Ti.UI.createView({
					width : "35%",
					left: "65%",
					height: Ti.UI.FILL,
					name: "rp"
				});
				
				var labRPName = Ti.UI.createLabel({
					color : '#222',
					font : {
						fontFamily : 'Arial',
						fontSize : 18,
						//fontWeight : 'normal'
					},
					text : '',
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
					//right : 25,
					bottom : 15,
					// width : "35%",
					height : Ti.UI.SIZE,
					//top: 28,
					// left: "65%",
					name: "rp"
				});
				
				if(myArray[i].rpID==null){
					labRPName.text='None';
				}
				else if(!(myArray[i].valueOf() in globalVariables.GV.ReferralPartners)){
				    labRPName.text='None';
				}
				else{
					labRPName.text=globalVariables.GV.ReferralPartners[(myArray[i].rpID).valueOf()].title;
				}
				
				rpClickArea.add(labRPName);
				row.add(rpClickArea);
				
				if(i>0){
					if(myArray[i].repName !== myArray[i-1].repName){
						//tableData.push(sections[j]);
						j++;
						sections[j]= Ti.UI.createTableViewSection({
							headerTitle: "     "+myArray[i].repName
						});	
						sections[j].add(row);
					}
					else{
						sections[j].add(row);
					}
				}
				else if(i==0)
				{
					sections[j] = Ti.UI.createTableViewSection({
						headerTitle: "     "+myArray[i].repName
					});
					sections[j].add(row);
				}
			}
			tableView.setData(sections);
		});
	}
	
	var tableView = Ti.UI.createTableView({
		backgroundColor : 'white',
		top : '61dp',
		separatorInsets:{
			left: 0
		}
		//data : tableData
	});
	
	// sync.syncWithACS(function(e){
		// if(e.success)
		// {
			// loadData();
		// }
		// else{
			// loadData();
			// alert("Could not sync with back end. Loading local proposals. Sync again later by a Pull to refresh on the Proposals screen");
		// }
// 		
	// });

	tvContainer.add(tableView);
	
	tableView.addEventListener('click', function(e) {
		
		if(e.source.name=="status"){
			var statusData = [
				{title:'Appointment', rownum:e.index},
			 	{title:'Presented', rownum:e.index},
			 	{title:'Signed', rownum: e.index},
			];
			
			var statusTV = Ti.UI.createTableView({
				data: statusData,
				width: 150,
				height: 150,
				rownum: e.index,
				separatorInsets:{
					left: 0
				}		
			});
	
			statusTV.addEventListener("click", function(f){
				Ti.API.info("from popover click:   "+JSON.stringify(f));
				db.updateStatus({
					status: f.row.title,
					proposalId: myArray[f.row.rownum].ProposalId
				}, function(g){
					alert("Local Status Updated");
					loading._show({
						message: "Updating Status in back office."
					});
					if(Ti.Network.online)
					{
						if(!globalVariables.GV.cloudSessionSet){
							acs.isLoggedIn(function(h){
								if(h.loggedIn){
									acs.updateProposal({row: myArray[f.row.rownum]},function(i){
										if(i.success===false)	
										{
											loading._hide();
											alert('Problem Updating on backend. Try again later');
										}
										else
										{
											db.setUpdateOff({proposalId: myArray[f.row.rownum].ProposalId}, function(j){
												if(j.success){
													loading._hide();
													alert('Updated on back end');
												}
												else{
													alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
												}
											});
										}
									});
								}
							});
						}
						else{
							acs.updateProposal({row: myArray[f.row.rownum]},function(e){
								if(e.success===false)	
								{
									loading._hide();
									alert('Problem Updating on backend. Try again later');
								}
								else
								{
									db.setUpdateOff({proposalId: myArray[f.row.rownum].ProposalId}, function(j){
										if(j.success){
											loading._hide();
											alert('Updated on back end');
										}
										else{
											alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
										}
									});
								}
							});
						}
					}
					else{
						loading._hide();
						alert("iPad is currently not online. Sync later using sync button.");
					}
						
					e.source.text=f.row.title;
					statusPopover.hide();
					statusTV=null;
					statusPopover=null;
					statusData=null;
				});
			});
			
			var statusPopover = Ti.UI.iPad.createPopover({//require('lib/popover').getPopover({
				title: "Proposal Status",
				width: 150,
				height: 130,
				arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT,
				contentView: statusTV,
				//index: e.index 
			});
			
			statusPopover.show({ view: e.source });
			
		}
		
		else if(e.source.name=="rp"){
			//alert("referral partner field clicked");
			//for(var i=0;i<Object.keys(globalVariables.GV.ReferralPartners).length;i++){
			var refTableData = [];
			for(var key in globalVariables.GV.ReferralPartners)
			{
				globalVariables.GV.ReferralPartners[key].rownum = e.index;
				refTableData.push({title: globalVariables.GV.ReferralPartners[key].title,
								   id: key,
								   rownum: globalVariables.GV.ReferralPartners[key].rownum
				});
			}
			
			var rpTV = Ti.UI.createTableView({
				data: refTableData,
				width: 250,
				height: 350,
				rownum: e.index,
				separatorInsets:{
					left: 0
				}
			});
			
			rpTV.addEventListener("click", function(f){
				// if(f.row.title!='None')
				// {
					myArray[f.row.rownum].rpID=f.row.id;
					db.updateRp({
						rpid: f.row.id,
						proposalId: myArray[f.row.rownum].ProposalId
					}, function(g){
						alert("Local Referral Partner added Updated");
						loading._show({
							message: "Updating Referral Partner in back office."
						});
						if(Ti.Network.online)
						{
							if(!globalVariables.GV.cloudSessionSet){
								acs.isLoggedIn(function(h){
									if(h.loggedIn){
										acs.updateProposal({row: myArray[f.row.rownum]},function(i){
											if(i.success===false)	
											{
												loading._hide();
												alert('Problem Updating on backend. Try again later');
											}
											else
											{
												db.setUpdateOff({proposalId: myArray[f.row.rownum].ProposalId}, function(j){
													if(j.success){
														loading._hide();
														alert('Updated on back end');
													}
													else{
														alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
													}
												});
											}
											e.source.text=f.row.title;
											rpPopover.hide();
											rpTV=null;
											rpPopover=null;
											rpData=null;
										});
									}
								});
							}
							else{
								acs.updateProposal({row: myArray[f.row.rownum]},function(i){
									if(i.success===false)	
									{
										loading._hide();
										alert('Problem Updating on backend. Try again later');
									}
									else
									{
										db.setUpdateOff({proposalId: myArray[f.row.rownum].ProposalId}, function(j){
											if(j.success){
												loading._hide();
												alert('Updated on back end');
											}
											else{
												alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
											}
										});
									}
									e.source.text=f.row.title;
									rpPopover.hide();
									rpTV=null;
									rpPopover=null;
									rpData=null;
								});
							}
						}
						else{
							loading._hide();
							alert("iPad is currently not online. Sync later using sync button.");
							e.source.text=f.row.title;
							rpPopover.hide();
							rpTV=null;
							rpPopover=null;
							rpData=null;
						}	
					});
				//}
				// else
				// {
					// rpPopover.hide();
					// rpTV=null;
					// rpPopover=null;
					// rpData=null;
				// }
			});
			
			var rpPopover = Ti.UI.iPad.createPopover({//require('lib/popover').getPopover({
				title: "Partner",
				width: 200,
				height: 150,
				arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT,
				contentView: rpTV,
				//index: e.index 
			});
			
			rpPopover.show({ view: e.source });
			
		}
		
		else{
		
			globalVariables.GV.requestedUpdate = true;
			
			globalVariables.GV.repName = myArray[e.index].repName;
			globalVariables.GV.BusinessName = myArray[e.index].BusinessName;
			globalVariables.GV.StreetAddress = myArray[e.index].StreetAddress;
			globalVariables.GV.State = myArray[e.index].State;
			globalVariables.GV.City = myArray[e.index].City;
			globalVariables.GV.Zip = myArray[e.index].Zip;
			globalVariables.GV.Contact = myArray[e.index].Contact;
			globalVariables.GV.Phone = myArray[e.index].Phone;
			globalVariables.GV.BusinessType = myArray[e.index].BusinessType;
			globalVariables.GV.ProcessingMonths = myArray[e.index].ProcessingMonths;
			globalVariables.GV.debitVol = myArray[e.index].debitVol;
			globalVariables.GV.aeVol = myArray[e.index].aeVol;
			globalVariables.GV.dsVol = myArray[e.index].dsVol;
			globalVariables.GV.mcVol = myArray[e.index].mcVol;
			globalVariables.GV.visaVol = myArray[e.index].visaVol;
			globalVariables.GV.debitTransactions = myArray[e.index].debitTransactions;
			globalVariables.GV.aeTransactions = myArray[e.index].aeTransactions;
			globalVariables.GV.dsTransactions = myArray[e.index].dsTransactions;
			globalVariables.GV.mcTransactions = myArray[e.index].mcTransactions;
			globalVariables.GV.visaTransactions = myArray[e.index].visaTransactions;
			globalVariables.GV.debitAverageTicket = myArray[e.index].debitAverageTicket;
			globalVariables.GV.aeAverageTicket = myArray[e.index].aeAverageTicket;
			globalVariables.GV.dsAverageTicket = myArray[e.index].dsAverageTicket;
			globalVariables.GV.mcAverageTicket = myArray[e.index].mcAverageTicket;
			globalVariables.GV.visaAverageTicket = myArray[e.index].visaAverageTicket;
			globalVariables.GV.TotalCurrentFees = myArray[e.index].TotalCurrentFees;
			globalVariables.GV.CurrentEffectiveRate = myArray[e.index].CurrentEffectiveRate;
			globalVariables.GV.debitInterchangeFees = myArray[e.index].debitInterchangeFees;
			globalVariables.GV.aeInterchangeFees = myArray[e.index].aeInterchangeFees;
			globalVariables.GV.dsInterchangeFees = myArray[e.index].dsInterchangeFees;
			globalVariables.GV.mcInterchangeFees = myArray[e.index].mcInterchangeFees;
			globalVariables.GV.visaInterchangeFees = myArray[e.index].visaInterchangeFees;
			globalVariables.GV.debitProcessingFees = myArray[e.index].debitProcessingFees;
			globalVariables.GV.aeProcessingFees = myArray[e.index].aeProcessingFees;
			globalVariables.GV.dsProcessingFees = myArray[e.index].dsProcessingFees;
			globalVariables.GV.mcProcessingFees = myArray[e.index].mcProcessingFees;
			globalVariables.GV.visaProcessingFees = myArray[e.index].visaProcessingFees;
			globalVariables.GV.debitCardFees = myArray[e.index].debitCardFees;
			globalVariables.GV.aeCardFees = myArray[e.index].aeCardFees;
			globalVariables.GV.dsCardFees = myArray[e.index].dsCardFees;
			globalVariables.GV.mcCardFees = myArray[e.index].mcCardFees;
			globalVariables.GV.visaCardFees = myArray[e.index].visaCardFees;
			globalVariables.GV.TotalNewFees = myArray[e.index].TotalNewFees;
			globalVariables.GV.NewEffectiveRate = myArray[e.index].NewEffectiveRate;
			//globalVariables.GV.NewEffectiveRate =myArray[e.index].TotalCurrentFees;
	
			globalVariables.GV.MonthlySavings = myArray[e.index].MonthlySavings;
			globalVariables.GV.Year1Savings = myArray[e.index].Year1Savings;
			globalVariables.GV.Year2Savings = myArray[e.index].Year2Savings;
			globalVariables.GV.Year3Savings = myArray[e.index].Year3Savings;
			globalVariables.GV.Year4Savings = myArray[e.index].Year4Savings;
			//globalVariables.GV.Year5Savings = myArray[e.index].Year5Saving;
	
			globalVariables.GV.ProcessingFee = myArray[e.index].ProcessingFee;
			globalVariables.GV.AuthFee = myArray[e.index].AuthFee;
			globalVariables.GV.PinDebitProcessingFee = myArray[e.index].PinDebitProcessingFee;
			globalVariables.GV.PinDebitAuthFee = myArray[e.index].PinDebitAuthFee;
			globalVariables.GV.MonthlyServiceFee = myArray[e.index].MonthlyServiceFee;
			globalVariables.GV.IndustryComplinceFee = myArray[e.index].IndustryComplinceFee;
			globalVariables.GV.TerminalFee = myArray[e.index].TerminalFee;
			globalVariables.GV.MXGatewayFee = myArray[e.index].MXGatewayFee;
			globalVariables.GV.DebitAccessFee = myArray[e.index].DebitAccessFee;
			globalVariables.GV.ProposalId = myArray[e.index].ProposalId;
			globalVariables.GV.timeId = myArray[e.index].timeId;
			globalVariables.GV.NotesText = myArray[e.index].NotesText;
			globalVariables.GV.LastUpdated = myArray[e.index].LastUpdated;
			globalVariables.GV.DateCreated = myArray[e.index].DateCreated;
			globalVariables.GV.tfInterFeeChange=false;
			globalVariables.GV.currentLocalId = myArray[e.index].localPropID;
			globalVariables.GV.acl_id = myArray[e.index].acl_id;
			//globalVariables.GV.sm_id = myArray[e.index].sm_id;
			
			Ti.API.info(JSON.stringify(myArray[e.index]));
			Ti.App.fireEvent("propTableClicked");
		}

	});

	Ti.App.addEventListener('reloadProposals', function(e){
		loadData();
	});

	return self;

};
