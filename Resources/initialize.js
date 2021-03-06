var globalVariables = require('globalVariables');
var db = require("db/db");
var sync = require("lib/sync");
var acs = require("lib/acs");
//var Cloud = require('ti.cloud');


exports.init = function(startApp){
	
	//initialize global variables
	globalVariables.GV.sessionId = Ti.App.Properties.getString('sessionId',null);
	globalVariables.GV.firstName = Ti.App.Properties.getString('firstname', null);
	globalVariables.GV.lastName = Ti.App.Properties.getString('lastname', null);
	globalVariables.GV.userId = Ti.App.Properties.getString('userId', null);
	globalVariables.GV.userRole = Ti.App.Properties.getString('userRole', null);
	globalVariables.GV.loggedIn = Ti.App.Properties.getBool('loggedIn',false);
	globalVariables.GV.sm_id = Ti.App.Properties.getString("sm_id", null);
	globalVariables.GV.tm_id = Ti.App.Properties.getString("tm_id", null);
	globalVariables.GV.team_id = Ti.App.Properties.getString("team_id", null);
	globalVariables.GV.team_name = Ti.App.Properties.getString("team_name", null);
	globalVariables.GV.companyName = Ti.App.Properties.getString("companyName", null);
	globalVariables.GV.addressLine1 = Ti.App.Properties.getString("addressLine1", null);
	globalVariables.GV.addressLine2 = Ti.App.Properties.getString("addressLine2", null);
	globalVariables.GV.phone = Ti.App.Properties.getString("phone", null);
	globalVariables.GV.website = Ti.App.Properties.getString("website", null);
	globalVariables.GV.email = Ti.App.Properties.getString("email", null);
	
	globalVariables.GV.repName = globalVariables.GV.firstName+' '+globalVariables.GV.lastName;
	// db.getProposalCount(function(e){
        // if(e.success){
            // if(e.total>0){
                // globalVariables.GV.proposalsViewFirstTime = false;
            // }
            // else{
                // globalVariables.GV.proposalsViewFirstTime = true;
            // }
        // }
    // });
	globalVariables.GV.proposalsViewFirstTime = true;
	globalVariables.GV.libraryViewFirstTime = true;
	globalVariables.GV.acl_id = Ti.App.Properties.getString("acl_id");
	globalVariables.GV.lastFileSyncDate = Ti.App.Properties.getString("lastFileSyncDate", 0);
	globalVariables.GV.lastProposalSyncDate = Ti.App.Properties.getString("lastProposalSyncDate");
	
	db.init();
	
	//initialize app event listeners
	Ti.App.addEventListener("closeHomeWindow", function(e){
		globalVariables.GV.homeScreen=null;
		globalVariables.GV.navGroup=null;
	});
	
	Ti.App.addEventListener("closeLoginWindow", function(e){
		globalVariables.GV.loginScreen.close();
		//globalVariables.GV.loginScreen=null;
	});
	
	Ti.App.addEventListener("resumed", function(e){
		
		Ti.API.info("caught resumed event");
		//initialize global variables
		globalVariables.GV.sessionId = Ti.App.Properties.getString('sessionId',null);
		globalVariables.GV.firstName = Ti.App.Properties.getString('firstname', null);
		globalVariables.GV.lastName = Ti.App.Properties.getString('lastname', null);
		globalVariables.GV.userId = Ti.App.Properties.getString('userId', null);
		globalVariables.GV.userRole = Ti.App.Properties.getString('userRole', null);
		globalVariables.GV.loggedIn = Ti.App.Properties.getBool('loggedIn',false);
		globalVariables.GV.sm_id = Ti.App.Properties.getString("sm_id", null);
		globalVariables.GV.tm_id = Ti.App.Properties.getString("tm_id", null);
		globalVariables.GV.team_id = Ti.App.Properties.getString("team_id", null);
        globalVariables.GV.team_name = Ti.App.Properties.getString("team_name", null);
		globalVariables.GV.repName = globalVariables.GV.firstName+' '+globalVariables.GV.lastName;
		globalVariables.GV.companyName = Ti.App.Properties.getString("companyName", null);
		globalVariables.GV.addressLine1 = Ti.App.Properties.getString("addressLine1", null);
		globalVariables.GV.addressLine2 = Ti.App.Properties.getString("addressLine2", null);
		globalVariables.GV.phone = Ti.App.Properties.getString("phone", null);
		globalVariables.GV.website = Ti.App.Properties.getString("website", null);
		globalVariables.GV.email = Ti.App.Properties.getString("email", null);
		// db.getProposalCount(function(e){
		    // if(e.success){
		        // if(e.total>0){
		            // globalVariables.GV.proposalsViewFirstTime = false;
		        // }
		        // else{
		            // globalVariables.GV.proposalsViewFirstTime = true;
		        // }
		    // }
		// });
		
		globalVariables.GV.libraryViewFirstTime=true;
		globalVariables.GV.acl_id = Ti.App.Properties.getString("acl_id");
		globalVariables.GV.lastFileSyncDate = Ti.App.Properties.getString("lastFileSyncDate",0);
		Ti.API.info("INITIALIZED LASTFILE SYNC DATE:   "+globalVariables.GV.lastFileSyncDate);
		globalVariables.GV.lastProposalSyncDate = Ti.App.Properties.getString("lastProposalSyncDate");
		
		//load charge rates
		// db.LoadBusinessTypes(function(e){
			// db.LoadReferralPartners(function(f){
				if(globalVariables.GV.sessionId!==null)
				{
					if(Ti.Network.online)
					{
						acs.isLoggedIn(function(g){
							if(g.loggedIn){
								// acs.updateTmid(function(h){
									// if(h.success){
										// alert("Roxie's proposals Updated");
									// }
								// });
								//sync.syncDialog();
								acs.getPartners(function(f){
                                    if(f.success){
                                        db.FillReferralPartners(f.results);
                                        db.LoadReferralPartners(function(f){});
                                    }
                                    acs.getRates(function(g){
                                        if(g.success){
                                            db.FillBusinessType(g.results);
                                            //globalVariables.GV.SetRates(g.results);
                                            //db.LoadBusinessTypes(function(e){});
                                            acs.getUsers(globalVariables.GV.userRole,function(n){
                                                if(n.success){
                                                    //startApp({loggedIn: true});
                                                }
                                            }); 
                                         }           
                                    });
                                });
							}
							else{
								//alert("You are logged out. Please Login again to continue");
								globalVariables.GV.loginScreen = new LoginScreen();
								globalVariables.GV.loginScreen.open();
								//globalVariables.GV.navGroup.close();
								//Ti.App.fireEvent("closeHomeWindow");
							}
						});
					}
						
				}
				else{
				    globalVariables.GV.loginScreen = new LoginScreen();
                    globalVariables.GV.loginScreen.open();
                    //globalVariables.GV.navGroup.close();
                    Ti.App.fireEvent("closeHomeWindow");
				    //startApp(loggedIn: true)
				}
		// db.LoadBusinessTypes(function(e){
            // db.LoadReferralPartners(function(f){
			// });
		// });	
		
	});
	
	Ti.App.addEventListener("pause", function(e){
		pausedEvent();
	});
	
	Ti.App.addEventListener("paused", function(e){
		pausedEvent();
	});
	
	function pausedEvent(){
	}
	
	Ti.Network.addEventListener("change", function(e){
		if(!Ti.Network.NETWORK_NONE && Ti.Network.online)
		{
			if(!globalVariables.GV.cloudSessionSet){
				acs.isLoggedIn(function(e){
					sync.syncDialog();
				});
			}
		}
	});
	
	//load charge rates
	// db.LoadBusinessTypes(function(e){
		// db.LoadReferralPartners(function(f){
			// if(globalVariables.GV.sessionId!=null)
            // {
                // if(Ti.Network.online)
                // {
                    // acs.isLoggedIn(function(g){
                        // if(g.loggedIn){
                            // startApp({loggedIn: true});
                        // }
                        // else{
                            // startApp({loggedIn: false});
                        // }
                    // });
                // }
//                     
            // }
            // else{
                // startApp({loggedIn: false});
            // }
// 			
		// });
	// });
	// if(globalVariables.GV.sessionId!=null)
    // {
        if(Ti.Network.online)
        {
            if(globalVariables.GV.sessionId!==null)
            {
	            acs.isLoggedIn(function(g){
	                if(g.loggedIn){
	                    // acs.updateTmid(function(h){
	                        // if(h.success){
	                            // alert("Roxie's proposals Updated");
	                        // }
	                    // });
	                    //sync.syncDialog();
	                    acs.getPartners(function(f){
	                        if(f.success){
	                            db.FillReferralPartners(f.results);
	                            db.LoadReferralPartners(function(f){});
	                        }
	                        acs.getRates(function(h){
	                            if(h.success){
	                                db.FillBusinessType(h.results);
	                                //globalVariables.GV.SetRates(g.results);
	                                //db.LoadBusinessTypes(function(e){});
	                                acs.getUsers(globalVariables.GV.userRole,function(n){
	                                    if(n.success){
	                                        startApp({loggedIn: true});
	                                    }
	                                }); 
	                            }
	                        });
	                    });
	                }
	                else{
	                    // alert("You are logged out. Please Login again to continue");
	                    // globalVariables.GV.loginScreen = new LoginScreen();
	                    // globalVariables.GV.loginScreen.open();
	                    // globalVariables.GV.navGroup.close();
	                    // Ti.App.fireEvent("closeHomeWindow");
	                    startApp({loggedIn: false});
	                }
	            });
            }
            else{
            	startApp({loggedIn: false});
            }
        }
        else{
            startApp({loggedIn: false});
        }
            
    //}
		
};
