var acs = require("lib/acs");
var globalVariables = require("globalVariables");
var loading = require('lib/loading').loading();
var db = require("db/db");

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
			if((dataArray[i].ProposalId=="0"||dataArray[i].IsUploaded==0)){//&&!dataArray[i].IsUpdated){
				if(dataArray[i].userId == globalVariables.GV.userId ){
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
				else{
				   acs.updateProposal({row: dataArray[i]},function(e){
                        if(e.success===false)   
                        {
                            alert('Problem Updating on backend case 2. Try again later');
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
                                    db.setUpdateOff({
                                        proposalId: e.proposalId
                                            }, function(g){
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
			else if (dataArray[i].ProposalId!="0" && dataArray[i].IsUpdated==1&&!dataArray[i].IsUploaded)
			{
				acs.updateProposal({row: dataArray[i]},function(e){
					if(e.success===false)	
					{
						alert('Problem Updating on backend case 2. Try again later');
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
								db.setUpdateOff({
                                    proposalId: e.proposalId
                                        }, function(g){
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
			// else
			// {
				// acs.updateProposal({row: dataArray[i]},function(e){
					// if(e.success===false)	
					// {
						// alert('Problem Updating on backend case 3. Try again later');
						// success=false;
						// uploader(dataArray.length);
					// }
					// else
					// {
						// Ti.API.info(e.proposalId+" , "+ e.proposalId);
						// db.setUpdateOff({
							// proposalId: e.proposalId
						// }, function(f){
							// if(f.success)
							// {
								// db.setUploadedOn({proposalId: e.proposalId}, function(g){
									// if(g.success)
									// {
										// uploader(i+1);
									// }
								// });		
							// }
						// });	
					// }
				// });
// 				
			// }
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
    					message: 'Some proposals have not been synced to the back office. Would you like to sync now?',
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

////*********************************************
////This function queries proposals created on the web or by others and imports them to local db
////
////********************************************
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
										globalVariables.GV.lastProposalSyncDate = (new Date).toISOString();
										Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
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
						
						// currentIndex = e.currentIndex;
						// total = e.total;
						// while(currentIndex<total){
						      // acs.queryAllProposals({
						          // skip: e.currentIndex
						      // },function(d){
						          // currentIndex=d.currentIndex;
						      // });
						// }
						if(e.success)
						{
							if(e.results.length>0){
								db.insertProposal(e.results, function(g){
									if(g.success){
										globalVariables.GV.lastProposalSyncDate = (new Date).toISOString();
										Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
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
										globalVariables.GV.lastProposalSyncDate = (new Date).toISOString();
										Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
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
										globalVariables.GV.lastProposalSyncDate = (new Date).toISOString();
										Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
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
				//if(globalVariables.GV.userRole!="Admin")
				//{
					var propIds = [];
					for(var i=0;i<f.results.length;i++)
					{
						propIds.push(f.results[i].ProposalId);
					}
					db.getLastCreatedProp(function(g){
					    
					
					   acs.downloadRemoteProposals({
    						lastCreatedDate: g.lastCreatedDate
    						},function(e){
    							//propIds=null;
    							if(e.success){
    								if(e.results.length>0){
    								    //if(globalVariables.GV.userRole=="Admin"){
    								        
    								    
        								    var arrayToInsert=[];
        								    for(var i=0;i<e.results.length;i++)
        								    {
        								        var j=0;
        								        var matchFound=false;
        								        while(j<propIds.length && !matchFound)
        								        {
        								            if(e.results[i].id==propIds[j])
        								            {
        								                matchFound=true;
        								                Ti.API.info("MATCH FOUND: "+e.results[i].id+" = "+propIds[j]+" , "+e.results[i].BusinessName);
        								            }
        								            
        								            j++;
        								                
        								        }
        								        
        								        if(!matchFound){
        								            arrayToInsert.push(e.results[i]);
        								            Ti.API.info("MATCH NOT FOUND: PUSHING   "+e.results[i].id+" , "+e.results[i].BusinessName);
        								        }
        								    }
        								    j = matchFound = propIds= null;
        									if(arrayToInsert.length>0)
        									{
        									    db.insertProposal(arrayToInsert, function(g){
        										  if(g.success){
        										      callback({
        										          success:true,
        												  downloaded: false
        										      });
        										  }
        										  globalVariables.GV.lastProposalSyncDate = (new Date).toISOString();
                                                  Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
        									   });
        									}
        									else{
                                                callback({
                                                    success:true,
                                                    downloaded: false
                                                });
                                            }
    									
    								    //}
    								    // else{
    								        // db.insertProposal(e.results, function(g){
                                                  // if(g.success){
                                                      // callback({
                                                          // success:true,
                                                          // downloaded: false
                                                      // });
                                                  // }
                                               // });
                                        // }
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
    				});
				}
				
			//}
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
					acs.queryProposalsByUid({getUpdates: true, localProps: f.results},function(e){
						//Ti.API.info("e.results.username: " + e.results[0].user.first_name);
						Ti.API.info('FOUND ONLINE PROPOSALS BY UID');
						if(e.success){
							if(e.results.length>0){
								//Ti.API.info('CALLING DB INSERT PROPOSALS');
								db.importPropUpdates(e.results, function(g){
									//Ti.API.info('INSERT PROPOSALS DONE');
									if(g.success){
									    globalVariables.GV.lastProposalSyncDate = new Date().toISOString();
                                        Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
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
									    globalVariables.GV.lastProposalSyncDate = new Date().toISOString();
                                        Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
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
									    globalVariables.GV.lastProposalSyncDate = new Date().toISOString();
                                        Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
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
									    globalVariables.GV.lastProposalSyncDate = new Date().toISOString();
                                        Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
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
						}
					});
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

function checkForDeleted(callback){
    if(Ti.Network.online){
        db.getAllProposalIds(function(f){
            if(f.results.length>0)
            {
                // var propIds = [];
                // for(var i=0;i<f.results.length;i++)
                // {
                    // var x = f.results[i].ProposalId;
                    // x = x.toString();
                    // propIds.push(x);//f.results[i].ProposalId.toString());
                // }
//                 
                acs.getDeletedIds({
                    //localProposals: propIds
                },function(e){
                    if(e.success){
                        if(e.results.length>0){
                            var propsToDelete = [];
                            for(var i=0;i<e.results.length;i++)
                            {
                                propsToDelete.push(e.results[i].id);
                            }
                            //var toDelete = arr_diff(propsToDelete,propIds);
                            Ti.API.info("TO DELETE:  "+propsToDelete);
                            if(propsToDelete.length>0){  
                                db.deleteProposals({ids: propsToDelete}, function(g){
                                    if(g.success){
                                        callback({
                                            success:true
                                        });
                                    }
                                    else{
                                        callback({
                                            success:false,
                                            msg: "Error Deleting results locally."
                                        });
                                    }
                                });
                            }
                            else{
                                callback({
                                    success:true
                                });   
                            }
                                 
                        }
                        else{
                            callback({
                                success: true
                            });
                        }
                    }
                    else{
                        callback({
                            success: false,
                            msg: "Error checking for proposals deleted in the back office."
                        });
                    }     
                });
            }
            else{
                callback({
                    success: true
                });
            }
        });
    }
    else{
        callback({
            success: false,
            results: "Device is offline."
        });
    }
};

Ti.App.addEventListener('proposalSync', function(){
    proposalSync(function(f){
        alert("SYNC COMPLETED");
        // collect analytics stuff from here later.
    });
});

function proposalSync(callback){
	
	var loadingWin = Ti.UI.createWindow({
		backgroundColor: "transparent"
	});
	
	loadingWin.open();
	// loading._show({
			// message : 'SYNCING'
	// });
	loadingWin.add(loading);
	loading._show({
	    message: "LOOKING FOR CHANGES"
	});
	checkForDeleted(function(k){
	    Ti.API.info("******************COMPLETED CHECKING FOR DELETED PROPOSALS******************");
    	syncWithACS(function(g){
    		Ti.API.info("****************COMPLETE SYNC WITH ACS*************************");
    		loadingWin.remove(loading);
    		loading._show({
    			message : 'LOOKING FOR CHANGES'
    		});
    		loadingWin.add(loading);
     		syncChanges(function(h){
    			Ti.API.info("****************COMPLETE SYNC CHANGES*************************");
    			loadingWin.remove(loading);
    			loading._show({
    				message : 'UPLOADING PROPOSALS TO BACK OFFICE'
    			});
    			loadingWin.add(loading);
    			//checkForDeleted(function(k){
                    
    			    db.queryLocalProposals(function(f){
        				Ti.API.info("****************COMPLETE DB LOCAL QUERY*************************");
        				if(f.results.length>0){
        					syncProposalsToACS({dataArray: f.results},function(j){
        					    
            						Ti.API.info("****************COMPLETE SYNC TO ACS*************************");	
        						loading._hide();
                                loadingWin.close();
        						Ti.App.fireEvent('reloadProposals');
        						callback({
        						    done: true
        						});
        				    });		
        				}
    				    else{
        					loading._hide();
        					loadingWin.close();
        					Ti.App.fireEvent('reloadProposals');
        					callback({
        					    done: true
        					});
    				    }
    			    globalVariables.GV.lastProposalSyncDate = new Date().toISOString();
                    Ti.App.Properties.setString("lastProposalSyncDate", globalVariables.GV.lastProposalSyncDate);
    			    });
    					
    		    //});
    	    });
    	});
    });
};

function arr_diff(a1, a2)
{
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
}

function syncLibrary(callback){
	var success, msg = null;
	db.getFileIDs(function(f){
		if(Ti.Network.online){
			acs.getFiles(function(h){
				if(h.success){
					if(h.results.length>0){
						db.fillLibrary(h.results, function(m){
							if(m.success){
								Ti.App.fireEvent('reloadLibrary');
								globalVariables.GV.lastFileSyncDate=new Date().toISOString();
								Ti.App.Properties.setString("lastFileSyncDate", globalVariables.GV.lastFileSyncDate);
								//Ti.App.fireEvent("loadLibrary");
								callback({
									success:m.success
								});
								
							}
							else{
								callback({
									success: false,
									msg: m.msg
								});
								
							}	
						});
					}
					else{
						globalVariables.GV.lastFileSyncDate=new Date().toISOString();
						Ti.App.Properties.setString("lastFileSyncDate", globalVariables.GV.lastFileSyncDate);
						callback({
							success: true
						});
					}
				}
				else{
					callback({
						success: false,
						msg: "There was a problem downloading updated files. Try again by clicking Sync"
					});
					
				}
			});	
		}
		else{
			callback({
				success: false,
				msg: "You are not connected to the internet. Please connect and try again."
			});
			
		}
	});
}

// function syncReferralPartners()

exports.proposalSync = proposalSync;
exports.syncWithACS = syncWithACS;
exports.syncDialog = syncDialog;
exports.syncProposalsToACS = syncProposalsToACS;
exports.syncChanges = syncChanges;
exports.syncLibrary = syncLibrary;
