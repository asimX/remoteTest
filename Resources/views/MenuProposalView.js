var db = require('db/db');
var globalVariables = require('globalVariables');
var sync = require('lib/sync');
var loading = require('lib/loading').loading();
var moment = require('/lib/moment');
exports.MenuProposalView = function() {
	
	///////////////////////// Variables /////////////////////////////////
	
	//var myArray = [];
	
	var self = Ti.UI.createView({
		backgroundColor : 'Transparent',
		width : Ti.UI.FILL,
		height : 704,
		bottom : -704,
		zIndex : 1
	});
	
	self.add(loading);
	
	var tvContainer = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: "80%",//Ti.UI.FILL,//"86.4%",
		right: 0
	});
	
	self.add(tvContainer);
	
	var tableView = Ti.UI.createTableView({
        backgroundColor : 'white',
        separatorInsets:{
            left: 0
        },
        borderColor: "#a9a9a9",
        borderWidth: 1
        
    });
    
    tvContainer.add(tableView);
    
	var menuContainer = Ti.UI.createView({
	    height: Ti.UI.FILL,
	    width:"20%",
	    left: 0
	});
	
	self.add(menuContainer);
	
	var myPropsView = Ti.UI.createView({
	    backgroundColor: "#fff",
	    top: 0,
	    height: 50,
	    width: Ti.UI.FILL,
	    borderColor: "#a9a9a9",
        borderWidth: 1
	});
	
	var menuLastSelectedIndex = -1;
	
	myPropsView.addEventListener("click", function(e){
	    if(menuLastSelectedIndex>=0 && menuLastSelectedIndex!=e.index){
                menuTableView.data[0].rows[menuLastSelectedIndex].backgroundColor="white";
                menuTableView.data[0].rows[menuLastSelectedIndex].children[0].color="#000";
        }
        myPropsLbl.color = "#fff";
        myPropsView.backgroundColor = "#0082b4";
	    menuLastSelectedIndex=-1;
	    db.ShowProposal({},function(e){
	       //myArray = e.results;
	       loadData(e.results);
	    });
	});
	
	menuContainer.add(myPropsView);
	
	var myPropsLbl = Ti.UI.createLabel({
	    color : '#0082b4',
        font : {
            fontFamily : 'GillSans-Light',
            fontSize : 20,
            fontWeight : 'bold'
        },
        textAlign : "center",
        text : "My Proposals",
        width : Ti.UI.FILL,
        height : '30dp',
	});
	
	myPropsView.add(myPropsLbl);
	
	if(globalVariables.GV.userRole != "Account Executive"){
            
            var menuTableView = Ti.UI.createTableView({
                backgroundColor : 'white',
                separatorInsets:{
                    left: 0,
                    right: 0
                },
                top: 50,
                borderColor: "#a9a9a9",
                borderWidth: 1
            });
        
            menuTableView.addEventListener('click', function(e) {
                //loadData(e.index);
                e.rowData.backgroundColor = "#0082b4";
                e.row.children[0].color = "white";
                //e.rowData.name
                if(menuLastSelectedIndex>=0 && menuLastSelectedIndex!=e.index){
                    menuTableView.data[0].rows[menuLastSelectedIndex].backgroundColor="white";
                    menuTableView.data[0].rows[menuLastSelectedIndex].children[0].color="#000";
                }
                else{
                    myPropsView.backgroundColor="#fff";
                    myPropsLbl.color = "#0082b4";
                }
                menuLastSelectedIndex = e.index; 
                //alert(e.row.user_id);
                acs.queryProposalsByUid({
                    user_id: e.row.user_id
                }, function(f){
                    loadData(f.results);
                });
            });
                    
            menuContainer.add(menuTableView);
    }
    else{
        var blankMenuView = Ti.UI.createView({
            backgroundColor: "white",
            top: 50,
            borderColor: "#a9a9a9",
            borderWidth: 1
        });
        
        menuContainer.add(blankMenuView);
    }
	
	function loadUsers(){
        
            db.getUsers(function(e){
                //if(e.success){
                    var data = e.results;
                    var userData = [];
                    for(var i=0;i<data.length;i++){
                        
                        if(data[i].user_id!=globalVariables.GV.userId){
                            var row = Ti.UI.createTableViewRow({
                                className : 'user', 
                                //selectedBackgroundColor : '#0082b4',
                                rowIndex : i, 
                                height : 50,
                                user_id: data[i].user_id,
                                //selectedColor: 'white'
                            });
                            var nameLbl = Ti.UI.createLabel({
                                color : '#000',
                                font : {
                                    fontFamily : 'GillSans-Light',
                                    fontSize : 20,
                                    fontWeight : 'bold'
                                },
                                textAlign : "center",
                                text : data[i].first_name+" "+data[i].last_name,
                                width : Ti.UI.SIZE,
                                height : '30dp',
                                
                            });
                            row.add(nameLbl);
                            userData.push(row);
                        }
                    }
                    
                    menuTableView.setData(userData);
                //}
            });
    }
    
    self.add(menuContainer);

	
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
		Ti.App.fireEvent('proposalSync');
		//,{ai: loading});
	});
	
	var updating = false;
	var dynamicIndex=0;
	var scrollToIndex = 0;
	
	function loadData(myArray){//(skip){
		if(menuLastSelectedIndex==-1){
		    myPropsLbl.color="#fff";
		    myPropsView.backgroundColor="#0082b4";
		}
		
		var tableData = [];
		tableView.setData(tableData);
		// var users = [];
		
		
		
		// if(skip==0){
		    // tableView.setData(tableData);
		// }
	    
	    //var results=null;
		
		// db.ShowProposal({skip: skip},function(f){
			// results = f.results;
			// scrollToIndex = results.length;
			// });
			
			var sections=[];
			var j=0;
			if(myArray.length>0)//(results.length>0){
    			for (var i = 0; i < myArray.length; i++) {
    			    //myArray.push(results[i]);
    				var row = Ti.UI.createTableViewRow({
    					className : 'proposalRow', // used to improve table performance
    					selectedBackgroundColor : 'white',
    					rowIndex : i, // custom property, useful for determining the row during events
    					height : 70,
    					proposalId: myArray[i].ProposalId || myArray[i].id
    					//layout: "horizontal"
    				});
    	
    				var nameView = Ti.UI.createView({
    					backgroundColor: "transparent",
    					//layout: "vertical",
    					height: Ti.UI.FILL,
    					width: "70%",//"45%",
    					left: 0,
    					//backgroundColor: "yellow"
    				});
                    
                    var updatedDate = myArray[i].updated_at || myArray[i].LastUpdated;
                    
                    var labLastDate = Ti.UI.createLabel({
                        color : '#B8B8B8',//d0d0d0',
                        font : {
                            fontFamily : 'Arial',
                            fontSize : 15,
                            fontWeight : 'bold'
                        },
                        text : moment(updatedDate).local().format('LLLL'),//new Date(myArray[i].LastUpdated).toLocaleString(),
                        left : 30,//5,
                        bottom: 10,
                        top: 47,
                        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
                        width : Ti.UI.SIZE,
                        //height : 8,
                        //zIndex: 1
                        //backgroundColor: "blue"
                    });
                    			
    				//Ti.API.error(myArray[i].Date);
    				var busName = Ti.UI.createLabel({
    					color : '#222',
    					font : {
    						fontFamily : 'Arial',
    						fontSize : 22,
    						//fontWeight : 'normal'
    					},
    					text : myArray[i].BusinessName,
    					left : 30,
    					top : 12,
    					verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
    					//width : Ti.UI.SIZE,
    					//height: Ti.UI.SIZE,
    					textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
    					wordWrap: false,
    					bottom:24
    					//backgroundColor: "green"
    				});
    				//row.add(labelDetails);
    			
    				nameView.add(busName);
    				nameView.add(labLastDate);
    				
    				row.add(nameView);
    		        
    		        var rightParentView = Ti.UI.createView({
    		            width: "30%",
    		            height: Ti.UI.FILL,
    		            left: "70%",
    		            //backgroundColor: "blue"
    		            //layout: "vertical"
    		        });
    		        
    				var statusClickArea = Ti.UI.createView({
    					width: Ti.UI.FILL,//"25%",
    					height: "50%", //Ti.UI.FILL,
    					top: 0,
    					left: 0,   
    					//left: "45%",
    					name: "status",
    					layout: "horizontal"
    					//backgroundColor: "yellow"
    				});
    				
    				//check to fix bug with status being date
    				if(myArray[i].ProposalStatus==null){// || myArray[i].ProposalStatus!="Appointment" || myArray[i].ProposalStatus!="Presented" || myArray[i].ProposalStatus!="Signed"){
    					myArray[i].ProposalStatus="Appointment";
    					myArray[i].IsUpdated=1;
    				}
    				
    				var labStat = Ti.UI.createLabel({
    				    color: "#0082b4",
    				    font:{
    				        fontFamily : 'Arial',
                            fontSize : 15,
    				    },
    				    text: "STATUS:   ",
    				    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    				    width: Ti.UI.SIZE,
    				    height: Ti.UI.SIZE,
    				    left: 0,
    				    //verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
    				    top: 10
    				});
    				
    				var labStatus = Ti.UI.createLabel({
    					color : '#222',
    					font : {
    						fontFamily : 'Arial',
    						fontSize : 15,
    						//fontWeight : 'normal'
    					},
    					text : myArray[i].ProposalStatus,
    					textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
    					//right : 20,
    					//bottom : 15,
    					width : Ti.UI.FILL,
    					height : Ti.UI.SIZE,
    					top: 10,
    					//left: "50%",
    					name: "status",
    					//backgroundColor: "green"
    				});
    				
    				statusClickArea.add(labStat);
    				statusClickArea.add(labStatus);
    				rightParentView.add(statusClickArea);
    				//row.add(statusClickArea);
    				 
    				var rpClickArea = Ti.UI.createView({
    					width : Ti.UI.FILL,  //"35%",
    					//left: "65%",
    					height: "50%",
    					top: "50%",
    					name: "rp",
    					layout: "horizontal"
    				});
    				
    				var labRP = Ti.UI.createLabel({
                        color: "#0082b4",
                        font:{
                            fontFamily : 'Arial',
                            fontSize : 15,
                        },
                        text: "REFERRAL PARTNER:   ",
                        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                        width: Ti.UI.SIZE,
                        height: Ti.UI.SIZE,
                        left: 0,
                        //verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
                        top: 10
                    });
                    
    				var labRPName = Ti.UI.createLabel({
    					color : '#222',
    					font : {
    						fontFamily : 'Arial',
    						fontSize : 15,
    						//fontWeight : 'normal'
    					},
    					text : '',
    					textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
    					//right : 25,
    					//bottom : 15,
    					width : Ti.UI.FILL,
    					height : Ti.UI.SIZE,
    					top: 10,
    					//left: 20,
    					name: "rp",
    					//backgroundColor: "green"
    				});
    				
    				if(myArray[i].rpID==null){
    					labRPName.text='None';
    				}
    				else if(!(myArray[i].rpID.valueOf() in globalVariables.GV.ReferralPartners)){
    				    labRPName.text='None';
    				}
    				else{
    					labRPName.text=globalVariables.GV.ReferralPartners[(myArray[i].rpID).valueOf()].title;
    				}
    				
    				rpClickArea.add(labRP);
    				rpClickArea.add(labRPName);
    				rightParentView.add(rpClickArea);
    				row.add(rightParentView);
    				tableData.push(row);
    				//var curr = results[i].repName;//moment(results[i].LastUpdated);
    				
    				// if(skip==0 && i==0)
    				// {
    					// sections[j] = Ti.UI.createTableViewSection({
    						// headerTitle: "     "+curr //curr.local().format('LLLL')//
    					// });
    					// sections[j].add(row);
    					// tableView.appendSection(sections[j]);
    				// }
    				// else
    				// {
    					// if(i==0){
    					    // var prev = myArray[scrollToIndex].repName;//moment(myArray[scrollToIndex].repName);//LastUpdated);
    					// }
    					// else{
    					   // var prev = results[i-1].repName;//moment();//LastUpdated);    
    					// }
//     					
    					// var changeHeading = false;
    					// //if(curr.local().date() < prev.local().date() && curr.month()==prev.month()&&curr.year()==prev.year()){
    					// if(curr !== prev){
    					   // changeHeading = true;
    					// // if(myArray[i].repName !== myArray[i-1].repName){
    						// //tableData.push(sections[j]);
    					// }
    					// // else if(/*(curr.getDate() > prev.getDate()||curr.getDate() < prev.getDate()) && */curr.month()<prev.month()&&curr.year()==prev.year()){eeeeeeeeeeeeeeeeeeeeeeeq
    					   // // changeHeading=true;
    					// // }
    					// // else if(/*curr.getDate > prev.getDate && curr.getMonth>prev.getMonth && */curr.year() < prev.year()){
    					    // // changeHeading = true;
    					// // }
    					// if(changeHeading){
    						// j++;
    						// sections[j]= Ti.UI.createTableViewSection({
    							// headerTitle: "     "+curr//.local().format('LLLL')//myArray[i].repName
    						// });	
    						// sections[j].add(row);
    						// tableView.appendSection(sections[j]);
    					// }
    					// else{
    						// //sections[j].add(row);
    						// tableView.appendRow(row);
    					// }
    				// }
//     				
    			// }
    		}
			//updating=false;
			//dynamicIndex = skip + results.length;
			tableView.setData(tableData);
		//});
	};
	
	// var tableView = Ti.UI.createTableView({
		// backgroundColor : 'white',
		// separatorInsets:{
			// left: 0
		// }
	// });
	
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

	// tvContainer.add(tableView);
	
	tableView.addEventListener('click', function(e) {
		
		var clickedPropId = e.row.proposalId;
		
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
				var updatedProposal = null;
				if(menuLastSelectedIndex==-1){
				    
    				db.updateStatus({
    					status: f.row.title,
    					proposalId: e.row.proposalId
    				}, function(g){
    					alert("Local Status Updated");
    					// myArray[f.row.rownum].ProposalStatus=f.row.title;
    					db.ShowProposal({
    					    proposalId: clickedPropId
    					}, function(q){
    					    
    					   //updatedProposal = q.results;
    					   //updateCloudStatus(e.row.proposalId, f.row.title);
    					});
    			    });
    		    }
    		    
    		    loading._show({
                    message: "Updating Status in back office."
                });
    		    updateCloudStatus(e.row.proposalId, f.row.title, function(g){
    		        if(g.success){
    		            e.source.text=f.row.title;
                        statusPopover.hide();
                        statusTV=null;
                        statusPopover=null;
                        statusData=null;
                        loading._hide();
                        if(menuLastSelectedIndex==-1){
                            Ti.App.fireEvent('proposalSync');
                        }
                        else{
                            Ti.App.fireEvent('reloadProposals');
                        }
    		            alert('Updated on back end');
    		        }
    		        else{
    		            loading._hide();
    		            alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
    		        }
    		        
    		    });
    		});
			
			
    					
			
			var statusPopover = Ti.UI.iPad.createPopover({//require('lib/popover').getPopover({
				title: "Proposal Status",
				width: 150,
				height: 130,
				arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT,
				contentView: statusTV,
				
				//index: e.index 
			});
			
			statusPopover.show({ view: e.source });
			
		}
		else if(e.source.name=="rp"){
			//alert("referral partner field clicked");
			//for(var i=0;i<Object.keys(globalVariables.GV.ReferralPartners).length;i++){
			var refTableData = [];
			//var updatedProposal = null;
			//var clickedPropId = e.row.proposalId;
			
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
			 if(menuLastSelectedIndex==-1){	
					db.updateRp({
						rpid: f.row.id,
						proposalId: clickedPropId
					}, function(g){
						alert("Local Referral Partner added Updated");
						
						db.ShowProposal({
                            proposalId: clickedPropId
                        }, function(q){
                            
                           //updatedProposal = q.results;
						//myArray[f.row.rownum].rpID=f.row.id;
    							
					});
					});
				}
				
				loading._show({
                            message: "Updating Referral Partner in back office."
                });
                
                 updateCloudRP(e.row.proposalId, f.row.id, function(g){
                    if(g.success){
                        e.source.text=f.row.title;
                        rpPopover.hide();
                        rpTV=null;
                        rpPopover=null;
                        rpData=null;
                        loading.hide();
                        if(menuLastSelectedIndex==-1){
                            Ti.App.fireEvent('proposalSync');
                        }
                        else{
                            Ti.App.fireEvent('reloadProposals');
                        }
                        
                        alert(g.message);
                    }
                    else{
                        rpPopover.hide();
                        rpTV=null;
                        rpPopover=null;
                        rpData=null;
                        loading.hide();
                        alert(g.message);
                        // loading._hide();
                        // alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
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
		    
		    if(menuLastSelectedIndex==-1){
		        db.ShowProposal({
                    proposalId: clickedPropId
                }, function(q){
                    loadProposal(q.results[0]);
		        });
	        }
	        else{
	            acs.getProposalById(clickedPropId, function(q){
	                loadProposal(q.results);
	            });
	        }
	    }
	});
    
    function loadProposal(propToUpdate){
        globalVariables.GV.requestedUpdate = true;
            
            globalVariables.GV.repName = propToUpdate.repName;
            
            globalVariables.GV.BusinessName = propToUpdate.BusinessName;
            globalVariables.GV.StreetAddress = propToUpdate.StreetAddress;
            globalVariables.GV.State = propToUpdate.State;
            globalVariables.GV.City = propToUpdate.City;
            globalVariables.GV.Zip = propToUpdate.Zip;
            globalVariables.GV.Contact = propToUpdate.Contact;
            globalVariables.GV.Phone = propToUpdate.Phone;
            globalVariables.GV.BusinessType = propToUpdate.BusinessType;
            globalVariables.GV.ProcessingMonths = propToUpdate.ProcessingMonths;
            globalVariables.GV.debitVol = propToUpdate.debitVol;
            globalVariables.GV.aeVol = propToUpdate.aeVol;
            globalVariables.GV.dsVol = propToUpdate.dsVol;
            globalVariables.GV.mcVol = propToUpdate.mcVol;
            globalVariables.GV.visaVol = propToUpdate.visaVol;
            globalVariables.GV.debitTransactions = propToUpdate.debitTransactions;
            globalVariables.GV.aeTransactions = propToUpdate.aeTransactions;
            globalVariables.GV.dsTransactions = propToUpdate.dsTransactions;
            globalVariables.GV.mcTransactions = propToUpdate.mcTransactions;
            globalVariables.GV.visaTransactions = propToUpdate.visaTransactions;
            globalVariables.GV.debitAverageTicket = propToUpdate.debitAverageTicket;
            globalVariables.GV.aeAverageTicket = propToUpdate.aeAverageTicket;
            globalVariables.GV.dsAverageTicket = propToUpdate.dsAverageTicket;
            globalVariables.GV.mcAverageTicket = propToUpdate.mcAverageTicket;
            globalVariables.GV.visaAverageTicket = propToUpdate.visaAverageTicket;
            globalVariables.GV.TotalCurrentFees = propToUpdate.TotalCurrentFees;
            globalVariables.GV.CurrentEffectiveRate = propToUpdate.CurrentEffectiveRate;
            globalVariables.GV.debitInterchangeFees = propToUpdate.debitInterchangeFees;
            globalVariables.GV.aeInterchangeFees = propToUpdate.aeInterchangeFees;
            globalVariables.GV.dsInterchangeFees = propToUpdate.dsInterchangeFees;
            globalVariables.GV.mcInterchangeFees = propToUpdate.mcInterchangeFees;
            globalVariables.GV.visaInterchangeFees = propToUpdate.visaInterchangeFees;
            globalVariables.GV.debitProcessingFees = propToUpdate.debitProcessingFees;
            globalVariables.GV.aeProcessingFees = propToUpdate.aeProcessingFees;
            globalVariables.GV.dsProcessingFees = propToUpdate.dsProcessingFees;
            globalVariables.GV.mcProcessingFees = propToUpdate.mcProcessingFees;
            globalVariables.GV.visaProcessingFees = propToUpdate.visaProcessingFees;
            globalVariables.GV.debitCardFees = propToUpdate.debitCardFees;
            globalVariables.GV.aeCardFees = propToUpdate.aeCardFees;
            globalVariables.GV.dsCardFees = propToUpdate.dsCardFees;
            globalVariables.GV.mcCardFees = propToUpdate.mcCardFees;
            globalVariables.GV.visaCardFees = propToUpdate.visaCardFees;
            globalVariables.GV.TotalNewFees = propToUpdate.TotalNewFees;
            globalVariables.GV.NewEffectiveRate = propToUpdate.NewEffectiveRate;
            //globalVariables.GV.NewEffectiveRate =propToUpdate.TotalCurrentFees;
    
            globalVariables.GV.MonthlySavings = propToUpdate.MonthlySavings;
            globalVariables.GV.Year1Savings = propToUpdate.Year1Savings;
            globalVariables.GV.Year2Savings = propToUpdate.Year2Savings;
            globalVariables.GV.Year3Savings = propToUpdate.Year3Savings;
            globalVariables.GV.Year4Savings = propToUpdate.Year4Savings;
            //globalVariables.GV.Year5Savings = propToUpdate.Year5Saving;
    
            globalVariables.GV.ProcessingFee = propToUpdate.ProcessingFee;
            globalVariables.GV.AuthFee = propToUpdate.AuthFee;
            globalVariables.GV.PinDebitProcessingFee = propToUpdate.PinDebitProcessingFee;
            globalVariables.GV.PinDebitAuthFee = propToUpdate.PinDebitAuthFee;
            globalVariables.GV.MonthlyServiceFee = propToUpdate.MonthlyServiceFee;
            globalVariables.GV.IndustryComplinceFee = propToUpdate.IndustryComplinceFee;
            globalVariables.GV.TerminalFee = propToUpdate.TerminalFee;
            globalVariables.GV.MXGatewayFee = propToUpdate.MXGatewayFee;
            globalVariables.GV.DebitAccessFee = propToUpdate.DebitAccessFee;
            //globalVariables.GV.ProposalId = propToUpdate.ProposalId;
            globalVariables.GV.ProposalStatus = propToUpdate.ProposalStatus;
            globalVariables.GV.timeId = propToUpdate.timeId;
            globalVariables.GV.Notes = propToUpdate.Notes;
            
            globalVariables.GV.LastUpdated = propToUpdate.updated_at || propToUpdate.LastUpdated;
            globalVariables.GV.DateCreated = propToUpdate.created_at || propToUpdate.DateCreated;
            
            globalVariables.GV.tfInterFeeChange=false;
            
            //globalVariables.GV.currentLocalId = propToUpdate.localPropID;
            
            //globalVariables.GV.acl_id = propToUpdate.acl_id;
            //globalVariables.GV.sm_id = propToUpdate.sm_id;
            globalVariables.GV.ProposalId = propToUpdate.ProposalId || propToUpdate.id;
            
            Ti.API.info(JSON.stringify(propToUpdate));
            Ti.App.fireEvent("propTableClicked");
    }
    
    function updateCloudRP(propId,rpID, callback){
    
        if(Ti.Network.online)
            {
                if(!globalVariables.GV.cloudSessionSet){
                    acs.isLoggedIn(function(h){
                        if(h.loggedIn){
                            acs.updateProposalRP({propId: propId, rpID: rpID},function(i){
                                if(i.success===false)   
                                {
                                    //loading._hide();
                                    callback({
                                        success: false,
                                        message: 'Problem Updating on backend. Try again later'
                                    });
                                    //alert('Problem Updating on backend. Try again later');
                                }
                                else
                                {
                                    if(menuLastSelectedIndex==-1){
                                        db.setUpdateOff({proposalId: propId}, function(j){
                                            if(j.success){
                                                db.setUploadedOn({
                                                    proposalId: propId
                                                }, function(k){
                                                    if(k.success){
                                                       //loading._hide();
                                                       callback({
                                                           success: true,
                                                           message: 'Updated on back end'
                                                       });
                                                       //alert('Updated on back end');
                                                    }
                                                    else{
                                                        callback({
                                                            success: false, 
                                                            message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                                                        });
                                                        //alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
                                                    }
                                                }); 
                                            }
                                            else{
                                                callback({
                                                    success: false,
                                                    message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                                                });
                                                //alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
                                            }
                                        });
                                    }
                                }
                                
                            });
                        }
                    });
                }
                else{
                    acs.updateProposalRP({propId: propId, rpID: rpID},function(i){
                        if(i.success===false)   
                        {
                            callback({
                                success: false,
                                message: 'Problem Updating on backend. Try again later'
                            });
                            // loading._hide();
                            // alert('Problem Updating on backend. Try again later');
                        }
                        else
                        {
                            db.setUpdateOff({proposalId: propId}, function(j){
                                if(j.success){
                                    db.setUploadedOn({
                                        proposalId: propId
                                    }, function(k){
                                        if(k.success){
                                           callback({
                                               success: true,
                                               message: 'Updated on back end'
                                           });
                                           // loading._hide();
                                           // alert('Updated on back end');
                                        }
                                        else{
                                            callback({
                                                success: false,
                                                message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                                            });
                                            //alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
                                        }
                                    }); 
                                }
                                else{
                                    callback({
                                        success: false,
                                        message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                                    });
                                    //alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
                                }
                            });
                        }
                        // e.source.text=f.row.title;
                        // rpPopover.hide();
                        // rpTV=null;
                        // rpPopover=null;
                        // rpData=null;
                    });
                }
            
          }
        else{
            callback({
                success: false,
                message: "iPad is currently not online. Sync later using sync button."
            });
            // loading._hide();
            // alert("iPad is currently not online. Sync later using sync button.");
            // e.source.text=f.row.title;
            // rpPopover.hide();
            // rpTV=null;
            // rpPopover=null;
            // rpData=null;
        }
    
    }
    
    function updateCloudStatus(propId, status, callback){
        
        if(Ti.Network.online)
            {
                if(!globalVariables.GV.cloudSessionSet){
                    acs.isLoggedIn(function(h){
                        if(h.loggedIn){
                            acs.updateProposalStatus({propId: propId, status: status}, function(i){//myArray[f.row.rownum]},function(i){
                                if(i.success==false)    
                                {
                                    callback({
                                success: false,
                                message: 'Problem Updating on backend. Try again later'
                            });
                                }
                                else
                                {
                                    if(menuLastSelectedIndex==-1){
                                        
                                        db.setUpdateOff({proposalId: propId}, function(j){
                                            if(j.success){
                                                db.setUploadedOn({
                                                    proposalId: propId,
                                                    //LastUpdated: i.LastUpdated
                                                }, function(k){
                                                    if(k.success){
                                                       db.setLastUpdated({
                                                           LastUpdated: i.updated_at,
                                                           proposalId: propId}, function(l){
                                                           if(l.success){
                                                               
                                                               callback({success: true});
                                                           }
                                                           else{
                                                               callback({
                                success: false,
                                message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                            });
                                                           }
                                                       });
                                                    }
                                                    else{
                                                        callback({
                                success: false,
                                message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                            });
                                                    }
                                                }); 
                                            }
                                            else{
                                                callback({
                                success: false,
                                message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                            });
                                            }
                                        });
                                    }
                                    else{
                                        callback({success: true});
                                        
                                        
                                    }
                                }
                            });
                        }
                    });
                }
                else{
                    
                    acs.updateProposalStatus({propId: propId, status: status},function(h){
                        if(h.success==false)    
                        {
                            callback({
                                success: false,
                                message: 'Problem Updating on backend. Try again later'
                            });
                            //loading._hide();
                            //alert('Problem Updating on backend. Try again later');
                        }
                        else
                        {
                            if(menuLastSelectedIndex==-1){
                                
                                db.setUpdateOff({proposalId: propId}, function(j){
                                    if(j.success){
                                        db.setUploadedOn({
                                            proposalId: propId,
                                            //LastUpdated: h.LastUpdated
                                        }, function(k){
                                            if(k.success){
                                               db.setLastUpdated({LastUpdated: h.updated_at}, function(l){
                                                   if(l.success){
                                                       
                                                       callback({success: true});
                                                       
                                                   }
                                                   else{
                                                       callback({
                                            success: false,
                                            message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                                        });
                                                       //alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
                                                   }
                                               });
                                               
                                            }
                                            else{
                                                callback({
                                            success: false,
                                            message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                                        });
                                                //alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
                                            }
                                        }); 
                                    }
                                    else{
                                        callback({
                                            success: false,
                                            message: 'Updated on back end, but error syncing local db. Hit Sync button to fix.'
                                        });
                                        //alert('Updated on back end, but error syncing local db. Hit Sync button to fix.');
                                    }
                                });
                            }
                            else{
                                //loading._hide();
                                callback({success: true});
                                //alert('Updated on back end');
                            }
                        }
                    });
                }
        }
               
        
        else{
            //loading._hide();
            callback({
                success: false,
                message: "iPad is currently not online. Sync later using sync button." 
            });
            //alert();
        }
    }
    
    var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."});
    var lastRow = 0;//dynamicIndex;
    
    function beginUpdate()
    {
        updating = true;
    
        tableView.appendRow(loadingRow);
    
        // just mock out the reload
        endUpdate();
    }
    
    function endUpdate()
    {
        //updating = false;
        lastRow=dynamicIndex;
        tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
    
        // simulate loading
        loadData(dynamicIndex);
        //lastRow = dynamicIndex;
        // just scroll down a bit to the new rows to bring them into view
        //tableView.scrollToIndex(lastRow-scrollToIndex,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
        updating=false;
        //navActInd.hide();
    }
    
    var lastDistance=0;
    
    //tableView.addEventListener("scroll", function(e){
        // var offset = e.contentOffset.y;
        // var height = e.size.height;
        // var total = offset + height;
        // var theEnd = e.contentSize.height;
        // var distance = theEnd - total;
//     
        // // going down is the only time we dynamically load,
        // // going up we can safely ignore -- note here that
        // // the values will be negative so we do the opposite
        // if (distance < lastDistance)
        // {
            // // adjust the % of rows scrolled before we decide to start fetching
            // var nearEnd = theEnd * .95;
//     
            // if (!updating && (total >= nearEnd))
            // {
                // beginUpdate();
            // }
        // }
        // lastDistance = distance; 
    //});
    
	Ti.App.addEventListener('reloadProposals', function(e){
		//loadData(0);
		if(globalVariables.GV.userRole!=="Account Executive"){
		    loadUsers();
		}
		if(menuLastSelectedIndex==-1){
            myPropsLbl.color = "#fff";
            myPropsView.backgroundColor = "#0082b4";
            db.ShowProposal({},function(f){
               //myArray = e.results;
               loadData(f.results);
            });
        }
        else{
            
            menuTableView.data[0].rows[menuLastSelectedIndex].backgroundColor="#0082b4";
            menuTableView.data[0].rows[menuLastSelectedIndex].children[0].color="#fff";
            acs.queryProposalsByUid({
                   user_id: menuTableView.data[0].rows[menuLastSelectedIndex].user_id
                }, function(f){
                    loadData(f.results);
                });
        }
		
	});
    
    
	return self;

};
