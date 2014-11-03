var globalVariables = require('globalVariables');
var db = require("db/db");
var sync = require("lib/sync");
var acs = require("lib/acs");
var Cloud = require('ti.cloud');


exports.init = function(startApp){
	
	//initialize global variables
	globalVariables.GV.sessionId = Ti.App.Properties.getString('sessionId',null);
	globalVariables.GV.firstName = Ti.App.Properties.getString('firstname', null);
	globalVariables.GV.lastName = Ti.App.Properties.getString('lastname', null);
	globalVariables.GV.userId = Ti.App.Properties.getString('userId', null);
	globalVariables.GV.userRole = Ti.App.Properties.getString('userRole', null);
	globalVariables.GV.loggedIn = Ti.App.Properties.getBool('loggedIn',false);
	globalVariables.GV.sm_id = Ti.App.Properties.getString("sm_id");
	globalVariables.GV.tm_id = Ti.App.Properties.getString("tm_id");
	globalVariables.GV.repName = globalVariables.GV.firstName+' '+globalVariables.GV.lastName;
	globalVariables.GV.proposalsViewFirstTime = true;
	globalVariables.GV.libraryViewFirstTime = true;
	globalVariables.GV.acl_id = Ti.App.Properties.getString("acl_id");
	globalVariables.GV.lastFileSyncDate = Ti.App.Properties.getString("lastFileSyncDate");
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
		globalVariables.GV.sm_id = Ti.App.Properties.getString("sm_id");
		globalVariables.GV.tm_id = Ti.App.Properties.getString("tm_id");
		globalVariables.GV.repName = globalVariables.GV.firstName+' '+globalVariables.GV.lastName;
		globalVariables.GV.proposalsViewFirstTime = true;
		globalVariables.GV.libraryViewFirstTime=true;
		globalVariables.GV.acl_id = Ti.App.Properties.getString("acl_id");
		globalVariables.GV.lastFileSyncDate = Ti.App.Properties.getString("lastFileSyncDate");
		globalVariables.GV.lastProposalSyncDate = Ti.App.Properties.getString("lastProposalSyncDate");
		
		//load charge rates
		db.LoadBusinessTypes(function(e){
			db.LoadReferralPartners(function(f){
				if(globalVariables.GV.sessionId!=null)
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
								sync.syncDialog();
							}
							else{
								alert("You are logged out. Please Login again to continue");
								globalVariables.GV.loginScreen = new LoginScreen();
								globalVariables.GV.loginScreen.open();
								globalVariables.GV.navGroup.close();
								Ti.App.fireEvent("closeHomeWindow");
							}
						});
					}
						
				}
			});
		});	
		
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
	db.LoadBusinessTypes(function(e){
		db.LoadReferralPartners(function(f){
			if(globalVariables.GV.sessionId!=null)
            {
                if(Ti.Network.online)
                {
                    acs.isLoggedIn(function(g){
                        if(g.loggedIn){
                            startApp({loggedIn: true});
                        }
                        else{
                            startApp({loggedIn: false});
                        }
                    });
                }
                    
            }
            else{
                startApp({loggedIn: false});
            }
			
		});
	});
	
		
};
