var globalVariables = require('globalVariables');
var Cloud = require('ti.cloud');
var alert = require('lib/alert');
var db = require('/db/db');

var loggedIn = false;
globalVariables.GV.sessionId = Ti.App.Properties.getString('sessionId',null);
globalVariables.GV.userId = Ti.App.Properties.getString('userId', null);

exports.loginUser = function(email, password, callback) {

	Cloud.Users.login({
		login : email,
		password : password
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			Ti.API.info("USER:   "+JSON.stringify(user));
			//Ti.API.error(Ti.App.Properties.setString.use);
			Ti.App.Properties.setString('lastname', user.last_name);
			globalVariables.GV.lastName = user.last_name;
			Ti.App.Properties.setString('firstname', user.first_name);
			globalVariables.GV.firstName = user.first_name;
			globalVariables.GV.repName = globalVariables.GV.firstName+' '+globalVariables.GV.lastName;
			Ti.App.Properties.setString('userId', user.id);
			globalVariables.GV.userId = user.id;
			Ti.App.Properties.setString('sessionId', Cloud.sessionId);
			globalVariables.GV.sessionId=Cloud.sessionId;//e.meta.session_id;
			Ti.App.Properties.setString('userRole', user.role);
			globalVariables.GV.userRole = user.role;
			Ti.API.info("SESSION ID IS:  " +Cloud.sessionId);
			Ti.App.Properties.setBool("loggedIn",true);
			globalVariables.GV.loggedIn=true;
			globalVariables.GV.proposalsViewFirstTime=true;
			globalVariables.GV.sm_id = user.custom_fields.sm_id;
			Ti.App.Properties.setString("sm_id", globalVariables.GV.sm_id);
			globalVariables.GV.tm_id = user.custom_fields.tm_id;
			Ti.App.Properties.setString("tm_id", globalVariables.GV.tm_id);
			if(user.custom_fields.neverLoggedIn)
			{
				
				var t = Titanium.UI.create2DMatrix();
				t = t.scale(0);
	
				var w = Titanium.UI.createWindow({
					backgroundColor:'transparent',
					backgroundImage: "/images/iconGradientBG.png",
					borderWidth:1,
					borderColor:'#999',
					height:230,
					width:330,
					borderRadius:10,
					opacity:0.92,
					transform:t,
					layout: "vertical"
				});
	
				// create first transform to go beyond normal size
				var t1 = Titanium.UI.create2DMatrix();
				t1 = t1.scale(1.1);
				var a = Titanium.UI.createAnimation();
				a.transform = t1;
				a.duration = 200;
	
				// when this animation completes, scale to normal size
				a.addEventListener('complete', function()
				{
					Titanium.API.info('here in complete');
					var t2 = Titanium.UI.create2DMatrix();
					t2 = t2.scale(1.0);
					w.animate({transform:t2, duration:200});
			
				});
	
				// create a button to close window
				var tfNewPwd = Titanium.UI.createTextField({
					hintText: "New Password",
					height:30,
					width:"80%",
					top: 50,
					backgroundColor: "#fff",
					passwordMask: true
				});
				
				w.add(tfNewPwd);
				
				var tfNewPwdConf = Titanium.UI.createTextField({
					hintText: "Confirm Password",
					height:30,
					width:"80%",
					top: 20,
					backgroundColor: "#fff",
					passwordMask: true
				});
				
				w.add(tfNewPwdConf);
				
				var changeBtn = Ti.UI.createButton({
					title: "Change Password",
					height: 30,
					top: 20,
					color: "#0082b4",
					font:{
						fontSize: 25
					}
				});
				
				w.add(changeBtn);
				
				changeBtn.addEventListener('click', function()
				{
					var t3 = Titanium.UI.create2DMatrix();
					t3 = t3.scale(0);
					w.close({transform:t3,duration:300});
					if(tfNewPwd.value == tfNewPwdConf.value){
						changePwd({
							pwd: tfNewPwd.value
						}, function(f){
							if(f.success){
								callback(e);
							}
							else{
								alert.alert("Could not change password. You will be asked next time you log in. \n"+JSON.stringify(f));
								callback(e);
							}
						});
					}
					else{
						alert("Passwords don't match.");
						tfNewPwd.value="";
						tfNewPwdConf.value="";
					}
					
					
				});
			
				w.open(a);
				
			}
			else{
				callback(e);
			}
		}
		else{
			callback(e);
		}
	});

};

function changePwd(params,callback){
	Cloud.Users.update({
		password: params.pwd,
		password_confirmation: params.pwd,
		custom_fields:{
			neverLoggedIn: false
		}
	}, function(e){
		callback(e);
	});
};

exports.logoutUser = function(callback){
	Cloud.Users.logout(function(e){
		if(e.success){
			Ti.App.Properties.setString('lastname', null);
			globalVariables.GV.lastName = null;
			Ti.App.Properties.setString('firstname', null);
			globalVariables.GV.firstName = null;
			Ti.App.Properties.setString('userId', null);
			globalVariables.GV.userId =null;
			Ti.App.Properties.setString('sessionId', null);
			globalVariables.GV.sessionId=null;
			Ti.App.Properties.setString('userRole', null);
			globalVariables.GV.userRole = null;
			Ti.App.Properties.setBool("loggedIn", false);
			globalVariables.GV.loggedIn = false;
			globalVariables.GV.cloudSessionSet = false;
			callback();
		}
		else{
			alert.alert('ERROR', e.message);
		}
	});
};

exports.queryProposalsByUid = function(params, callback) {
	
	//Ti.API.info(key+": "+value);
	Cloud.Objects.query({
		classname : 'Proposal',
		//page : 1,
		//per_page : 10,
		where:{
			user_id: globalVariables.GV.userId
		}
	}, function(e) {
		Ti.API.debug("queryProposal by UID Results: " + JSON.stringify(e));
		if (e.success) {
			if(params.getUpdates){
				db.getAllLastDates(function(f){
					var changedArray = [];
					for(var i=0;i<f.results.length;i++){
						var j=0;
						var found=false;
						while(!found && j<e.Proposal.length){
							if(e.Proposal[j].id==f.results[i].ProposalId){
								var remoteDate = new Date(e.Proposal[j].LastUpdated);
								var localDate = new Date(f.results[i].LastUpdated);
								if(remoteDate>localDate)
								{
									changedArray.push(e.Proposal[j]);
								}
								found=true;
							}
							j++;
						}
					}
					callback({
						success: true,
						results: changedArray
					});
				});
			}
			else{
				callback({
					success: true,
					results:e.Proposal
				});
			}
		} else {
			callback({
				success: false,
				results: e
			});
			// alert.alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

exports.queryProposalsBySmid = function(params,callback) {
	//var key=params.key.valueOf();
	//var value=params.value;
	//Ti.API.info(key+": "+value);
	Cloud.Objects.query({
		classname : 'Proposal',
		//page : 1,
		//per_page : 10,
		where:{
			sm_id: globalVariables.GV.userId
		}
	}, function(e) {
		Ti.API.debug("queryProposal by sm_ID Results: " + JSON.stringify(e));
		if (e.success) {
			if(params.getUpdates){
				db.getAllLastDates(function(f){
					var changedArray = [];
					for(var i=0;i<f.results.length;i++){
						var j=0;
						var found=false;
						while(!found && j<e.Proposal.length){
							if(e.Proposal[j].id==f.results[i].ProposalId){
								var remoteDate = new Date(e.Proposal[j].LastUpdated);
								var localDate = new Date(f.results[i].LastUpdated);
								if(remoteDate>localDate)
								{
									changedArray.push(e.Proposal[j].LastUpdated);
								}
								found=true;
							}
							j++;
						}
					}
					callback({
						success: true,
						results: changedArray
					});
				});
			}
			else{
				callback({
					success: true,
					results:e.Proposal
				});
			}
		} else {
			callback({
				success: false,
				results: e
			});
			// alert.alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

exports.queryProposalsByTmid = function(params, callback) {
	//var key=params.key.valueOf();
	//var value=params.value;
	//Ti.API.info(key+": "+value);
	Cloud.Objects.query({
		classname : 'Proposal',
		//page : 1,
		//per_page : 10,
		where:{
			tm_id: globalVariables.GV.userId
		}
	}, function(e) {
		Ti.API.debug("queryProposal by tm_ID Results: " + JSON.stringify(e));
		if (e.success) {
			if(params.getUpdates){
				db.getAllLastDates(function(f){
					var changedArray = [];
					for(var i=0;i<f.results.length;i++){
						var j=0;
						var found=false;
						while(!found && j<e.Proposal.length){
							if(e.Proposal[j].id==f.results[i].ProposalId){
								var remoteDate = new Date(e.Proposal[j].LastUpdated);
								var localDate = new Date(f.results[i].LastUpdated);
								if(remoteDate>localDate)
								{
									changedArray.push(e.Proposal[j].LastUpdated);
									found=true;
								}
								j++;
							}
						}
					}
					callback({
						success: true,
						results: changedArray
					});
				});
			}
			else{
				callback({
					success: true,
					results:e.Proposal
				});
			}
		} else {
			callback({
				success: false,
				results: e
			});
			// alert.alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

exports.getPartners = function(callback){
	Cloud.Objects.query({
		classname: 'ReferralPartner'
	}, function(e){
		if(e.success){
			callback({
				success: true,
				results: e.ReferralPartner
			});
		}
		else{
			callback({
				success: false,
				results: e
			});
		}
	});
};

exports.queryAllProposals = function(params,callback) {
	//var key=params.key.valueOf();
	//var value=params.value;
	//Ti.API.info(key+": "+value);
	Cloud.Objects.query({
		classname : 'Proposal',
		//page : 1,
		//per_page : 10,
		// where:{
			// user_id: value
		// }
	}, function(e) {
		if (e.success) {
			// Ti.API.info("queryProposal All Results: " + JSON.stringify(e));
			//alert.alert('Success:\n' + 'Count: ' + e.Proposal[0].BusinessName);
			//Ti.API.error('Success:\n' + 'Count: ' + e.Proposal[0].debitTransactions);
			if(params.getUpdates){
				db.getAllLastDates(function(f){
					var changedArray = [];
					for(var i=0;i<f.results.length;i++){
						var j=0;
						var found=false;
						while(!found && j<e.Proposal.length){
							if(e.Proposal[j].id==f.results[i].ProposalId){
								var remoteDate = new Date(e.Proposal[j].LastUpdated);
								var localDate = new Date(f.results[i].LastUpdated);
								if(remoteDate>localDate)
								{
									changedArray.push(e.Proposal[j].LastUpdated);
								}
								found=true;
							}
							j++;
						}
					}
					callback({
						success: true,
						results: changedArray
					});
				});
			}
			else{
				callback({
					success: true,
					results:e.Proposal
				});
			}
		} else {
			callback({
				success: false,
				results: e
			});
			//alert.alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

exports.downloadRemoteProposals = function(params, callback){
	var conditions=null;
	if(globalVariables.GV.userRole=="Admin"){
		Cloud.Objects.query({
			classname : 'Proposal',
			where: {
				id: {"$nin":params.localProposals}
			}
		}, function(e){
				Ti.API.debug("queryProposal Results: " + JSON.stringify(e));
				if (e.success) {
					Ti.API.info("downloadRemoteProposals Results: " + JSON.stringify(e));
					//alert.alert('Success:\n' + 'Count: ' + e.Proposal[0].BusinessName);
					callback({
						success: e.success,
						results:e.Proposal
					});
				} else {
					callback({
						success: false,
						results: e
					});
					//alert.alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
		});
	}
	else if(globalVariables.GV.userRole == "Sales Manager"){
		Cloud.Objects.query({
			classname : 'Proposal',
			where: {
				sm_id: globalVariables.GV.userId,
				id: {"$nin":params.localProposals}
			}
		}, function(e){
			Ti.API.debug("queryProposal Results: " + JSON.stringify(e));
			if (e.success) {
				Ti.API.info("downloadRemoteProposals Results: " + JSON.stringify(e));
				//alert.alert('Success:\n' + 'Count: ' + e.Proposal[0].BusinessName);
				callback({
					success: e.success,
					results:e.Proposal
				});
			} else {
				callback({
					success: false,
					results: e
			    });
			}
		});
	}
	else if (globalVariables.GV.userRole == "Territory Manager"){
		Cloud.Objects.query({
			classname : 'Proposal',
			where: {
				tm_id: globalVariables.GV.userId,
				id: {"$nin":params.localProposals}
			}
		}, function(e){
			Ti.API.debug("queryProposal Results: " + JSON.stringify(e));
			if (e.success) {
				Ti.API.info("downloadRemoteProposals Results: " + JSON.stringify(e));
				//alert.alert('Success:\n' + 'Count: ' + e.Proposal[0].BusinessName);
				callback({
					success: e.success,
					results:e.Proposal
				});
			} else {
				callback({
					success: false,
					results: e
			    });
			}
		});
	}
	else{
		Cloud.Objects.query({
		classname : 'Proposal',
		where: {
			user_id: globalVariables.GV.userId,
			id: {"$nin":params.localProposals}
		}
		}, function(e){
			Ti.API.debug("queryProposal Results: " + JSON.stringify(e));
			if (e.success) {
				Ti.API.info("downloadRemoteProposals Results: " + JSON.stringify(e));
				//alert.alert('Success:\n' + 'Count: ' + e.Proposal[0].BusinessName);
				callback({
					success: e.success,
					results:e.Proposal
				});
			} else {
				callback({
						success: false,
						results: e
				});
			}
		});
	}	
};

exports.createProposal = function(params,callback) {	
	var smid="";
	var tmid="";
	if(globalVariables.GV.userRole=="Sales Manager"){
		smid=globalVariables.GV.userId;
	}
	else if(globalVariables.GV.userRole=="Territory Manager")
	{
		tmid=globalVariables.GV.userId;
		smid=globalVariables.GV.sm_id;
	}
	else if(globalVariables.GV.userRole=="Account Executive"){
		tmid=globalVariables.GV.tm_id;
		smid=globalVariables.GV.sm_id;
	}
	
	if(params)
	{
		var row = params.row;
		Cloud.Objects.create({
			//session_id: globalVariables.GV.sessionId,
			classname : 'Proposal',
			fields : {
				BusinessName : row.BusinessName,
				StreetAddress : row.StreetAddress,
				State : row.State,
				City : row.City,
				Zip : row.Zip,
				Contact : row.Contact,
				Phone : row.Phone,
				BusinessType: row.BusinessType,
				ProcessingMonths : row.ProcessingMonths,
				debitVol : row.debitVol,
				aeVol : row.aeVol,
				dsVol : row.dsVol,
				mcVol : row.mcVol,
				visaVol : row.visaVol,
				debitTransactions : row.debitTransactions,
				aeTransactions : row.aeTransactions,
				dsTransactions : row.dsTransactions,
				mcTransactions : row.mcTransactions,
				visaTransactions : row.visaTransactions,
				debitAverageTicket : row.debitAverageTicket,
				aeAverageTicket : row.aeAverageTicket,
				dsAverageTicket : row.dsAverageTicket,
				mcAverageTicket : row.mcAverageTicket,
				visaAverageTicket : row.visaAverageTicket,
				TotalCurrentFees : row.TotalCurrentFees,
				CurrentEffectiveRate : row.CurrentEffectiveRate,
				debitInterchangeFees : row.debitInterchangeFees,
				aeInterchangeFees : row.aeInterchangeFees,
				dsInterchangeFees : row.dsInterchangeFees,
				mcInterchangeFees : row.mcInterchangeFees,
				visaInterchangeFees : row.visaInterchangeFees,
				debitProcessingFees : row.debitProcessingFees,
				aeProcessingFees : row.aeProcessingFees,
				dsProcessingFees : row.dsProcessingFees,
				mcProcessingFees : row.mcProcessingFees,
				visaProcessingFees : row.visaProcessingFees,
				debitCardFees : row.debitCardFees,
				aeCardFees : row.aeCardFees,
				dsCardFees : row.dsCardFees,
				mcCardFees : row.mcCardFees,
				visaCardFees : row.visaCardFees,
				TotalNewFees : row.TotalNewFees,
				NewEffectiveRate : row.NewEffectiveRate,
				MonthlySavings : row.MonthlySavings,
				Year1Savings : row.Year1Savings,
				Year2Savings : row.Year2Savings,
				Year3Savings : row.Year3Savings,
				Year4Savings : row.Year4Savings,
				ProcessingFee : row.ProcessingFee,
				AuthFee : row.AuthFee,
				PinDebitProcessingFee : row.PinDebitProcessingFee,
				PinDebitAuthFee : row.PinDebitAuthFee,
				MonthlyServiceFee : row.MonthlyServiceFee,
				IndustryComplinceFee : row.IndustryComplinceFee,
				TerminalFee : row.TerminalFee,
				MXGatewayFee : row.MXGatewayFee,
				DebitAccessFee : row.DebitAccessFee,
				//timeId: row.timeId,
				Notes: row.NotesText,
				LastUpdated: row.LastUpdated,
				DateCreated: row.DateCreated,
				ProposalStatus: row.ProposalStatus,
				rpID: row.rpID,
				sm_id: smid,
				tm_id: tmid
			}

		}, function(e) {
			if (e.success) {
				//globalVariables.GV.ProposalId = e.Proposal.id;
				alert.alert("Success", "Created Successfully");
				Ti.API.info("PROPOSAL CUSTOM OBJECT:  \n" + JSON.stringify(e));				
				callback({success: true, 
					proposalId: e.Proposal[0].id,
					//timeId: e.Proposal[0].timeId
				});
			} else {
				callback({success: false});
				alert.alert('Error: \n', JSON.stringify(e));
			}
		});
	}
	else{
		Cloud.Objects.create({
			//session_id: globalVariables.GV.sessionId,
			classname : 'Proposal',
			fields : {
				BusinessName : globalVariables.GV.BusinessName,
				StreetAddress : globalVariables.GV.StreetAddress,
				State : globalVariables.GV.State,
				City : globalVariables.GV.City,
				Zip : globalVariables.GV.Zip,
				Contact : globalVariables.GV.Contact,
				Phone : globalVariables.GV.Phone,
				BusinessType: globalVariables.GV.BusinessType,
				ProcessingMonths : globalVariables.GV.ProcessingMonths,
				debitVol : globalVariables.GV.debitVol,
				aeVol : globalVariables.GV.aeVol,
				dsVol : globalVariables.GV.dsVol,
				mcVol : globalVariables.GV.mcVol,
				visaVol : globalVariables.GV.visaVol,
				debitTransactions : globalVariables.GV.debitTransactions,
				aeTransactions : globalVariables.GV.aeTransactions,
				dsTransactions : globalVariables.GV.dsTransactions,
				mcTransactions : globalVariables.GV.mcTransactions,
				visaTransactions : globalVariables.GV.visaTransactions,
				debitAverageTicket : globalVariables.GV.debitAverageTicket,
				aeAverageTicket : globalVariables.GV.aeAverageTicket,
				dsAverageTicket : globalVariables.GV.dsAverageTicket,
				mcAverageTicket : globalVariables.GV.mcAverageTicket,
				visaAverageTicket : globalVariables.GV.visaAverageTicket,
				TotalCurrentFees : globalVariables.GV.TotalCurrentFees,
				CurrentEffectiveRate : globalVariables.GV.CurrentEffectiveRate,
				debitInterchangeFees : globalVariables.GV.debitInterchangeFee,
				aeInterchangeFees : globalVariables.GV.aeInterchangeFees,
				dsInterchangeFees : globalVariables.GV.dsInterchangeFees,
				mcInterchangeFees : globalVariables.GV.mcInterchangeFees,
				visaInterchangeFees : globalVariables.GV.visaInterchangeFees,
				debitProcessingFees : globalVariables.GV.debitProcessingFees,
				aeProcessingFees : globalVariables.GV.aeProcessingFees,
				dsProcessingFees : globalVariables.GV.dsProcessingFees,
				mcProcessingFees : globalVariables.GV.mcProcessingFees,
				visaProcessingFees : globalVariables.GV.visaProcessingFees,
				debitCardFees : globalVariables.GV.debitCardFees,
				aeCardFees : globalVariables.GV.aeCardFees,
				dsCardFees : globalVariables.GV.dsCardFees,
				mcCardFees : globalVariables.GV.mcCardFees,
				visaCardFees : globalVariables.GV.visaCardFees,
				TotalNewFees : globalVariables.GV.TotalNewFees,
				NewEffectiveRate : globalVariables.GV.NewEffectiveRate,
				MonthlySavings : globalVariables.GV.MonthlySavings,
				Year1Savings : globalVariables.GV.Year1Savings,
				Year2Savings : globalVariables.GV.Year2Savings,
				Year3Savings : globalVariables.GV.Year3Savings,
				Year4Savings : globalVariables.GV.Year4Savings,
				ProcessingFee : globalVariables.GV.ProcessingFee,
				AuthFee : globalVariables.GV.AuthFee,
				PinDebitProcessingFee : globalVariables.GV.PinDebitProcessingFee,
				PinDebitAuthFee : globalVariables.GV.PinDebitAuthFee,
				MonthlyServiceFee : globalVariables.GV.MonthlyServiceFee,
				IndustryComplinceFee : globalVariables.GV.IndustryComplinceFee,
				TerminalFee : globalVariables.GV.TerminalFee,
				MXGatewayFee : globalVariables.GV.MXGatewayFee,
				DebitAccessFee : globalVariables.GV.DebitAccessFee,
				//timeId: globalVariables.GV.timeId,
				Notes: globalVariables.GV.NotesText,
				LastUpdated: globalVariables.GV.LastUpdated,
				DateCreated: globalVariables.GV.DateCreated,
				ProposalStatus: globalVariables.GV.ProposalStatus,
				rpID: globalVariables.GV.rpID,
				sm_id: smid,
				tm_id: tmid
			}

		}, function(e) {
			if (e.success) {
				globalVariables.GV.ProposalId = e.Proposal[0].id;
				alert.alert("Success", "Created Successfully");
				callback({success: true,
					proposalId: e.Proposal[0].id,
					//timeId: e.Proposal[0].timeId
				});
			} else {
				callback({success: false});
				alert.alert('Error: \n', JSON.stringify(e));
			}
		});
	}
};

exports.updateProposal = function (params,callback){
	if(params)
	{
	var row = params.row;
	Cloud.Objects.update({
			//session_id: globalVariables.GV.sessionId,
			classname : 'Proposal',
			id: row.ProposalId,
			fields : {
				BusinessName : row.BusinessName,
				StreetAddress : row.StreetAddress,
				State : row.State,
				City : row.City,
				Zip : row.Zip,
				Contact : row.Contact,
				Phone : row.Phone,
				BusinessType: row.BusinessType,
				ProcessingMonths : row.ProcessingMonths,
				debitVol : row.debitVol,
				aeVol : row.aeVol,
				dsVol : row.dsVol,
				mcVol : row.mcVol,
				visaVol : row.visaVol,
				debitTransactions : row.debitTransactions,
				aeTransactions : row.aeTransactions,
				dsTransactions : row.dsTransactions,
				mcTransactions : row.mcTransactions,
				visaTransactions : row.visaTransactions,
				debitAverageTicket : row.debitAverageTicket,
				aeAverageTicket : row.aeAverageTicket,
				dsAverageTicket : row.dsAverageTicket,
				mcAverageTicket : row.mcAverageTicket,
				visaAverageTicket : row.visaAverageTicket,
				TotalCurrentFees : row.TotalCurrentFees,
				CurrentEffectiveRate : row.CurrentEffectiveRate,
				debitInterchangeFees : row.debitInterchangeFees,
				aeInterchangeFees : row.aeInterchangeFees,
				dsInterchangeFees : row.dsInterchangeFees,
				mcInterchangeFees : row.mcInterchangeFees,
				visaInterchangeFees : row.visaInterchangeFees,
				debitProcessingFees : row.debitProcessingFees,
				aeProcessingFees : row.aeProcessingFees,
				dsProcessingFees : row.dsProcessingFees,
				mcProcessingFees : row.mcProcessingFees,
				visaProcessingFees : row.visaProcessingFees,
				debitCardFees : row.debitCardFees,
				aeCardFees : row.aeCardFees,
				dsCardFees : row.dsCardFees,
				mcCardFees : row.mcCardFees,
				visaCardFees : row.visaCardFees,
				TotalNewFees : row.TotalNewFees,
				NewEffectiveRate : row.NewEffectiveRate,
				MonthlySavings : row.MonthlySavings,
				Year1Savings : row.Year1Savings,
				Year2Savings : row.Year2Savings,
				Year3Savings : row.Year3Savings,
				Year4Savings : row.Year4Savings,
				ProcessingFee : row.ProcessingFee,
				AuthFee : row.AuthFee,
				PinDebitProcessingFee : row.PinDebitProcessingFee,
				PinDebitAuthFee : row.PinDebitAuthFee,
				MonthlyServiceFee : row.MonthlyServiceFee,
				IndustryComplinceFee : row.IndustryComplinceFee,
				TerminalFee : row.TerminalFee,
				MXGatewayFee : row.MXGatewayFee,
				DebitAccessFee : row.DebitAccessFee,
				//timeId: row.timeId,
				Notes: row.NotesText,
				LastUpdated: row.LastUpdated,
				DateCreated: row.Date,
				ProposalStatus: row.ProposalStatus,
				rpID: row.rpID
			}

		}, function(e) {
			if (e.success) {
				globalVariables.GV.ProposalId = e.Proposal[0].id;
				alert.alert("Success", "Updated Successfully");
				callback({success: true,
					proposalId: e.Proposal[0].id
					//timeId: e.Proposal[0].timeId
				});
			} else {
				callback({success: false});
				alert.alert('Error: \n', JSON.stringify(e));
			}
		});
		}
		else{
			Cloud.Objects.update({
			//session_id: globalVariables.GV.sessionId,
				classname : 'Proposal',
				id: globalVariables.GV.ProposalId,
				fields : {
					BusinessName : globalVariables.GV.BusinessName,
					StreetAddress : globalVariables.GV.StreetAddress,
					State : globalVariables.GV.State,
					City : globalVariables.GV.City,
					Zip : globalVariables.GV.Zip,
					Contact : globalVariables.GV.Contact,
					Phone : globalVariables.GV.Phone,
					BusinessType: globalVariables.GV.BusinessType,
					ProcessingMonths : globalVariables.GV.ProcessingMonths,
					debitVol : globalVariables.GV.debitVol,
					aeVol : globalVariables.GV.aeVol,
					dsVol : globalVariables.GV.dsVol,
					mcVol : globalVariables.GV.mcVol,
					visaVol : globalVariables.GV.visaVol,
					debitTransactions : globalVariables.GV.debitTransactions,
					aeTransactions : globalVariables.GV.aeTransactions,
					dsTransactions : globalVariables.GV.dsTransactions,
					mcTransactions : globalVariables.GV.mcTransactions,
					visaTransactions : globalVariables.GV.visaTransactions,
					debitAverageTicket : globalVariables.GV.debitAverageTicket,
					aeAverageTicket : globalVariables.GV.aeAverageTicket,
					dsAverageTicket : globalVariables.GV.dsAverageTicket,
					mcAverageTicket : globalVariables.GV.mcAverageTicket,
					visaAverageTicket : globalVariables.GV.visaAverageTicket,
					TotalCurrentFees : globalVariables.GV.TotalCurrentFees,
					CurrentEffectiveRate : globalVariables.GV.CurrentEffectiveRate,
					debitInterchangeFees : globalVariables.GV.debitInterchangeFees,
					aeInterchangeFees : globalVariables.GV.aeInterchangeFees,
					dsInterchangeFees : globalVariables.GV.dsInterchangeFees,
					mcInterchangeFees : globalVariables.GV.mcInterchangeFees,
					visaInterchangeFees : globalVariables.GV.visaInterchangeFees,
					debitProcessingFees : globalVariables.GV.debitProcessingFees,
					aeProcessingFees : globalVariables.GV.aeProcessingFees,
					dsProcessingFees : globalVariables.GV.dsProcessingFees,
					mcProcessingFees : globalVariables.GV.mcProcessingFees,
					visaProcessingFees : globalVariables.GV.visaProcessingFees,
					debitCardFees : globalVariables.GV.debitCardFees,
					aeCardFees : globalVariables.GV.aeCardFees,
					dsCardFees : globalVariables.GV.dsCardFees,
					mcCardFees : globalVariables.GV.mcCardFees,
					visaCardFees : globalVariables.GV.visaCardFees,
					TotalNewFees : globalVariables.GV.TotalNewFees,
					NewEffectiveRate : globalVariables.GV.NewEffectiveRate,
					MonthlySavings : globalVariables.GV.MonthlySavings,
					Year1Savings : globalVariables.GV.Year1Savings,
					Year2Savings : globalVariables.GV.Year2Savings,
					Year3Savings : globalVariables.GV.Year3Savings,
					Year4Savings : globalVariables.GV.Year4Savings,
					ProcessingFee : globalVariables.GV.ProcessingFee,
					AuthFee : globalVariables.GV.AuthFee,
					PinDebitProcessingFee : globalVariables.GV.PinDebitProcessingFee,
					PinDebitAuthFee : globalVariables.GV.PinDebitAuthFee,
					MonthlyServiceFee : globalVariables.GV.MonthlyServiceFee,
					IndustryComplinceFee : globalVariables.GV.IndustryComplinceFee,
					TerminalFee : globalVariables.GV.TerminalFee,
					MXGatewayFee : globalVariables.GV.MXGatewayFee,
					DebitAccessFee : globalVariables.GV.DebitAccessFee,
					timeId: globalVariables.GV.timeId,
					Notes: globalVariables.GV.NotesText,
					LastUpdated: globalVariables.GV.LastUpdated,
					DateCreated: globalVariables.GV.DateCreated,
					ProposalStatus: globalVariables.GV.DateCreated,
					rpID: globalVariables.GV.rpID
			}

		}, function(e) {
			if (e.success) {
				globalVariables.GV.ProposalId = e.Proposal[0].id;
				alert.alert("Success", "Updated Successfully");
				callback({success: true,
					proposalId: e.Proposal[0].id,
					//timeId: e.Proposal[0].timeId
				});
			} else {
				callback({success: false});
				alert.alert('Error: \n', JSON.stringify(e));
			}
		});
		}
};
// exports.BusinessType = function() {
	// var visa_rate;
	// var mc_rate;
	// var ds_rate;
	// var amex_rate;
	// var debit_rate;
// 
	// if (globalVariables.GV.BusinessTypeName == 'Retail Low') {
// 
		// visa_rate = globalVariables.GV.RetailLowVsa;
		// mc_rate = globalVariables.GV.RetailLowMcard;
		// ds_rate = globalVariables.GV.RetailLowDis;
		// //amex_rate=globalVariables.GV.retailL
		// debit_rate = globalVariables.GV.RetailLowDb;
	// } else if (globalVariables.GV.BusinessTypeName == 'Retail High') {
		// visa_rate = globalVariables.GV.RetailHighVsa;
		// mc_rate = globalVariables.GV.RetailHighMcard;
		// ds_rate = globalVariables.GV.RetailHighDis;
		// //amex_rate=globalVariables.GV.RetailHigh;
		// debit_rate = globalVariables.GV.RetailHighDb;
// 
	// } else if (globalVariables.GV.BusinessTypeName == 'Restaurant Low') {
		// visa_rate = globalVariables.GV.RestaurantLowVsa;
		// mc_rate = globalVariables.GV.RestaurantLowMcard;
		// ds_rate = globalVariables.GV.RestaurantLowDis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.RestaurantLowDb;
// 
	// } else if (globalVariables.GV.BusinessTypeName == 'Restaurant High') {
		// visa_rate = globalVariables.GV.RestaurantHighVsa;
		// mc_rate = globalVariables.GV.RestaurantHighMcard;
		// ds_rate = globalVariables.GV.RestaurantHighDis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.RestaurantHighDb;
// 
	// } else if (globalVariables.GV.BusinessTypeName == 'Small Ticket') {
		// visa_rate = globalVariables.GV.SmallTicketVsa;
		// mc_rate = globalVariables.GV.SmallTicketMcard;
		// ds_rate = globalVariables.GV.SmallTicketDis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.SmallTicketDb;
// 
	// } else if (globalVariables.GV.BusinessTypeName == 'MOTO') {
		// visa_rate = globalVariables.GV.MOTOVsa;
		// mc_rate = globalVariables.GV.MOTOMcard;
		// ds_rate = globalVariables.GV.MOTODis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.MOTODb;
// 
	// } else if (globalVariables.GV.BusinessTypeName == 'Internet') {
		// visa_rate = globalVariables.GV.InternetVsa;
		// mc_rate = globalVariables.GV.InternetMcard;
		// ds_rate = globalVariables.GV.InternetDis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.InternetDb;
// 
	// } else if (globalVariables.GV.BusinessTypeName == 'Business To Business') {
		// visa_rate = globalVariables.GV.BusinessToBusinessVsa;
		// mc_rate = globalVariables.GV.BusinessToBusinessMcard;
		// ds_rate = globalVariables.GV.BusinessToBusinessDis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.BusinessToBusinessDb;
// 
	// } else if (globalVariables.GV.BusinessTypeName == 'SuperMarket') {
		// visa_rate = globalVariables.GV.SuperMarket;
		// mc_rate = globalVariables.GV.SupermarketMcard;
		// ds_rate = globalVariables.GV.SupermarketDis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.SupermarketDb;
// 
	// } else if (globalVariables.GV.BusinessTypeName == 'Hotel/lodging') {
		// visa_rate = globalVariables.GV.HotelLodgingVsa;
		// mc_rate = globalVariables.GV.HotelLodgingMcard;
		// ds_rate = globalVariables.GV.HotelLodgingDis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.HotelLodgingDb;
// 
	// } else {
		// visa_rate = globalVariables.GV.UtilitiesVsa;
		// mc_rate = globalVariables.GV.UtilitiesMcard;
		// ds_rate = globalVariables.GV.UtilitiesDis;
		// //amex_rate=globalVariables.GV.
		// debit_rate = globalVariables.GV.UtilitiesDb;
// 
	// }
	// Cloud.Users.login({
		// login : Ti.App.Properties.getString('Email'),
		// password : Ti.App.Properties.getString('Password'),
	// }, function(e) {
		// if (e.success) {
// 
			// Cloud.Objects.create({
				// classname : 'BusinessType',
				// fields : {
					// BusinessTypeName : globalVariables.GV.BusinessTypeName,
					// visa_rate : visa_rate,
					// mc_rate : mc_rate,
					// ds_rate : ds_rate,
					// amex_rate : 2,
					// debit_rate : debit_rate,
// 
				// }
			// }, function(e) {
				// if (e.success) {
					// alert.alert("Success", "Created Successfully");
				// } else {
					// alert.alert('Error: ', 'Object Not Created Successfully');
				// }
			// });
// 
		// } else {
			// alert('Login Error:' + ((e.error && e.message) || JSON.stringify(e)));
		// }
	// });
// 
// };

// exports.createNotes = function(NotesText) {
	// Cloud.Users.login({
		// login : Ti.App.Properties.getString('Email'),
		// password : Ti.App.Properties.getString('Password'),
	// }, function(e) {
		// if (e.success) {
// 
			// Cloud.Objects.create({
				// classname : 'Notes',
				// fields : {
					// Notes : NotesText,
// 
				// }
// 
			// }, function(e) {
				// if (e.success) {
					// alert.alert("Success", "Created Successfully");
				// } else {
					// alert.alert('Error: ', 'Object Not Created Successfully');
				// }
			// });
// 
		// } else {
			// alert.alert('Login Error:', ((e.error && e.message) || JSON.stringify(e)));
		// }
	// });
// 
// };

exports.getFiles = function(callback) {
	Cloud.Files.query({
		page : 1,
		per_page : 20
	}, function(e) {
		callback(e);
		if (e.success) {

		} else {
			Ti.API.error('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

};

exports.isLoggedIn = function(callback) {
	if(globalVariables.GV.sessionId) {
    	Cloud.sessionId = globalVariables.GV.sessionId;
    	globalVariables.GV.cloudSessionSet=true;
        var me = Cloud.Users.showMe(function(e) {
        	if(e.success){
        		var user = e.users[0];
        		if(user.id===globalVariables.GV.userId)
        		{
        			//loggedIn = true;
        			callback({loggedIn: true});
        		}
        	}
            else
            {
            	callback({loggedIn: false});
            }
        });    
    } 
    else {
        callback({loggedIn: false});
    }
};

exports.getRates= function(callback){
	Cloud.Objects.query({
		classname: "businessType"
	}, function(e){
		if(e.success){
			callback({
				success: e.success,
				results: e.businessType
			});
		}
		else{
			callback({
				success: e.success,
				results: e.message
			});
		}
	});
};
