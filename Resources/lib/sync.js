var acs = require("lib/acs");
var globalVariables = require("globalVariables");
var loading = require('lib/loading').loading();
var db = require("db/db");

//var dataArray = [];
// 
// function proposalsUploader(i){
	// if(i<length)
// };

function syncProposalsToACS(params,callback){
	var loadingWin = Ti.UI.createWindow({
		backgroundColor: "transparent"
	});
	loadingWin.add(loading);
	loadingWin.open();
	loading._show({
			message : 'SYNCING'
	});
	//var i=0;
	var dataArray = params.dataArray||[];
	var success = true;
	//while(i<dataArray.length){
	
	function uploader(i){
		if(i<dataArray.length){
			if(dataArray[i].ProposalId=="0"){
				acs.createProposal({row: dataArray[i]}, function(e){
					if(e.success==false)	
					{
						alert('Problem Creating on backend. Try again later');
						success=false;
						uploader(dataArray.length);
					}
					else{
						Ti.API.info(e.proposalId+" , "+ e.timeId);
						db.InsertProposalID({
							proposalId: e.proposalId,
							localPropId: dataArray[i].localPropId
						}, function(f){
							if(f.success)
							{
								uploader(i+1);
							}
						});	
					}
				});
			}
			else if (dataArray[i].ProposalId!="0" && dataArray[i].IsUploaded==0)
			{
				acs.updateProposal({row: dataArray[i]},function(e){
					if(e.success===false)	
					{
						alert('Problem Updating on backend. Try again later');
						success=false;
						uploader(dataArray.length);
					}
					else
					{
						Ti.API.info(e.proposalId+" , "+ e.proposalId);
						db.setUploadedOn({
							proposalId: e.proposalId
						}, function(f){
							if(f.success)
							{
								uploader(i+1);
							}
						});	
					}
				});
			}
			else
			{
				acs.updateProposal({row: dataArray[i]},function(e){
					if(e.success===false)	
					{
						alert('Problem Updating on backend. Try again later');
						success=false;
						uploader(dataArray.length);
					}
					else
					{
						Ti.API.info(e.proposalId+" , "+ e.proposalId);
						db.setUpdateOff({
							proposalId: e.proposalId
						}, function(f){
							if(f.success)
							{
								db.setUploadedOn({proposalId: e.proposalId}, function(g){
									if(g.success)
									{
										uploader(i+1);
									}
								});		
							}
						});	
					}
				});
				
			}
		}
		else{
			loading._hide();
			loadingWin.close();
			dataArray=[];
			callback({success: success});
		}
	}
	
	uploader(0);
	
		
};

function syncDialog(){
	if(Ti.Network.online)
		{
			db.queryLocalProposals(function(f){
				if(f.results.length>0){
					var dialog = Ti.UI.createAlertDialog({
    					cancel: 1,
    					buttonNames: ['YES', 'NO'],
    					message: 'Some proposals have not been uploaded to the back office. Would you like to sync now?',
    					title: 'SYNC'
  					});
  					dialog.addEventListener('click', function(g){
    					if (g.index === g.source.cancel){
      						Ti.API.info('Click on Sync button on the bottom right to Sync later.');
    					}
    					else if(g.index===0)
    					{
    						syncProposalsToACS({dataArray: f.results},function(h){
								if(h.success)
									alert("Sync Successful");
								else
									alert("Sync Problem");
							});
    					}
  					});
  					dialog.show();
				}
			});
		}
	else{
		alert("iPad is offline. Please connect to WiFi and try again.");
	}
};

function syncWithACS(callback){
	if(Ti.Network.online){
		db.getAllProposalIds(function(f){
			if(f.results.length==0){    // empty database
				if(globalVariables.GV.userRole=="Account Executive")
				{
					acs.queryProposalsByUid({},function(e){
						//Ti.API.info("e.results.username: " + e.results[0].user.first_name);
						Ti.API.info('FOUND ONLINE PROPOSALS BY UID');
						if(e.success){
							if(e.results.length>0){
								Ti.API.info('CALLING DB INSERT PROPOSALS');
								db.insertProposal(e.results, function(g){
									Ti.API.info('INSERT PROPOSALS DONE');
									if(g.success){
										callback({success:true,
												  downloaded: true
										});
									}
								});
							}
							else{
								callback({success: true,
										  downloaded: true
								});
							}
						}
						else{
							callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
							});
							//alert("Error:  \n"+JSON.stringify(e.results));
						}
						
					});
				}
				else if(globalVariables.GV.userRole=="Admin")
				{
					acs.queryAllProposals({},function(e){
						//Ti.API.info("e.results.usernames: " + e.results);
						if(e.success)
						{
							if(e.results.length>0){
								db.insertProposal(e.results, function(g){
									if(g.success){
										callback({success:true,
												  downloaded: true
										});
									}
								});
							}
							else{
								callback({success: true,
										  downloaded: true
										});
							}
						}
						else{
							callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
							});
							//alert("Error:  \n"+JSON.stringify(e.results));
						}
					});
				}
				else if(globalVariables.GV.userRole=="Sales Manager"){
					acs.queryProposalsBySmid({},function(e){
						//Ti.API.info("e.results.usernames: " + e.results);
						if(e.success)
						{
							if(e.results.length>0){
								db.insertProposal(e.results, function(g){
									if(g.success){
										callback({success:true,
												  downloaded: true
										});
									}
								});
							}
							else{
								callback({success: true,
										  downloaded: true
										});
							}
						}
						else{
							callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
							});
							//alert("Error:  \n"+JSON.stringify(e.results));
						}
					});
				}
				else if(globalVariables.GV.userRole=="Territory Manager"){
					acs.queryProposalsByTmid({},function(e){
						//Ti.API.info("e.results.usernames: " + e.results);
						if(e.success)
						{
							if(e.results.length>0){
								db.insertProposal(e.results, function(g){
									if(g.success){
										callback({success:true,
												  downloaded: true
										});
									}
								});
							}
							else{
								callback({success: true,
										  downloaded: true
										});
							}
						}
						else{
							callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
							});
							//alert("Error:  \n"+JSON.stringify(e.results));
						}
					});
				}
			}
			else{
				// if(globalVariables.GV.userRole!="Admin")
				// {
					var propIds = [];
					for(var i=0;i<f.results.length;i++)
					{
						propIds.push(f.results[i].ProposalId);
					}
					acs.downloadRemoteProposals({
						localProposals: propIds
						},function(e){
							propIds=null;
							if(e.success){
								if(e.results.length>0){
									db.insertProposal(e.results, function(g){
										if(g.success){
											callback({success:true,
												      downloaded: false
										});
										}
									});
								}
								else{
									callback({
										success:true,
										downloaded: false
									});
								}
							}
							else{
								callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
								});
								//alert("Error:  \n"+JSON.stringify(e.results));
							}
							
					});
				//}
				
			}
		});
			
	}
	else{
		callback({
			success: false,
			results: "Device is offline."
		});
	}
}

function syncChanges(callback){
	if(Ti.Network.online){
		db.getAllProposalIds(function(f){
			// if(f.results.length==0){
				if(globalVariables.GV.userRole=="Account Executive")
				{
					acs.queryProposalsByUid({getUpdates: true},function(e){
						//Ti.API.info("e.results.username: " + e.results[0].user.first_name);
						Ti.API.info('FOUND ONLINE PROPOSALS BY UID');
						if(e.success){
							if(e.results.length>0){
								Ti.API.info('CALLING DB INSERT PROPOSALS');
								db.importPropUpdates(e.results, function(g){
									Ti.API.info('INSERT PROPOSALS DONE');
									if(g.success){
										callback({success:true,
												  downloaded: true
										});
									}
								});
							}
							else{
								callback({success: true,
										  downloaded: false
								});
							}
						}
						else{
							callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
							});
							//alert("Error:  \n"+JSON.stringify(e.results));
						}
						
					});
				}
				else if(globalVariables.GV.userRole=="Admin")
				{
					acs.queryAllProposals({getUpdates: true},function(e){
						//Ti.API.info("e.results.usernames: " + e.results);
						if(e.success)
						{
							if(e.results.length>0){
								db.importPropUpdates(e.results, function(g){
									if(g.success){
										callback({success:true,
												  downloaded: true
										});
									}
								});
							}
							else{
								callback({success: true,
										  downloaded: false
										});
							}
						}
						else{
							callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
							});
							//alert("Error:  \n"+JSON.stringify(e.results));
						}
					});
				}
				else if(globalVariables.GV.userRole=="Sales Manager"){
					acs.queryProposalsBySmid({getUpdates: true},function(e){
						//Ti.API.info("e.results.usernames: " + e.results);
						if(e.success)
						{
							if(e.results.length>0){
								db.importPropUpdates(e.results, function(g){
									if(g.success){
										callback({success:true,
												  downloaded: true
										});
									}
								});
							}
							else{
								callback({success: true,
										  downloaded: false
										});
							}
						}
						else{
							callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
							});
							//alert("Error:  \n"+JSON.stringify(e.results));
						}
					});
				}
				else if(globalVariables.GV.userRole=="Territory Manager"){
					acs.queryProposalsByTmid({getUpdates: true},function(e){
						//Ti.API.info("e.results.usernames: " + e.results);
						if(e.success)
						{
							if(e.results.length>0){
								db.importPropUpdates(e.results, function(g){
									if(g.success){
										callback({success:true,
												  downloaded: true
										});
									}
								});
							}
							else{
								callback({success: true,
										  downloaded: false
										});
							}
						}
						else{
							callback({
									success: false,
									results: "Error:  \n"+JSON.stringify(e.results)
							});
							//alert("Error:  \n"+JSON.stringify(e.results));
						}
					});
				}
			});
			// else{
				// // if(globalVariables.GV.userRole!="Admin")
				// // {
					// var propIds = [];
					// for(var i=0;i<f.results.length;i++)
					// {
						// propIds.push(f.results[i].ProposalId);
					// }
					// acs.downloadRemoteProposals({
						// localProposals: propIds
						// },function(e){
							// propIds=null;
							// if(e.success){
								// if(e.results.length>0){
									// db.insertProposal(e.results, function(g){
										// if(g.success){
											// callback({success:true,
												      // downloaded: true
										// });
										// }
									// });
								// }
								// else{
									// callback({
										// success:true,
										// downloaded: false
									// });
								// }
							// }
							// else{
								// callback({
									// success: false,
									// results: "Error:  \n"+JSON.stringify(e.results)
								// });
								// //alert("Error:  \n"+JSON.stringify(e.results));
							// }
// 							
					// });
				// //}
// // 				
			// // }
		// // });
			
	}
	else{
		callback({
			success: false,
			results: "Device is offline."
		});
	}
}

// function syncReferralPartners()

exports.syncWithACS = syncWithACS;
exports.syncDialog = syncDialog;
exports.syncProposalsToACS = syncProposalsToACS;
exports.syncChanges = syncChanges;
