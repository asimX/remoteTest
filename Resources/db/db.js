//Ti.Database.install('/db/pps.sqlite', 'pps');
var globalVariables = require('globalVariables');
//var Getdate = require('lib/currentDate');
//var Date;

exports.init = function(){
	var db = Ti.Database.open('pps');
	db.execute('CREATE TABLE IF NOT EXISTS Proposal(localPropID INTEGER PRIMARY KEY, proposalId TEXT, repName TEXT, userId TEXT, BusinessName TEXT,StreetAddress TEXT,State TEXT,City TEXT,Zip TEXT,Contact TEXT,Phone TEXT, BusinessType TEXT, ProcessingMonths TEXT,debitVol REAL,aeVol REAL,dsVol REAL ,mcVol REAL ,visaVol REAL,debitTransactions REAL ,aeTransactions REAL ,dsTransactions REAL ,mcTransactions REAL ,visaTransactions REAL, debitAverageTicket REAL ,aeAverageTicket REAL ,dsAverageTicket REAL ,mcAverageTicket REAL ,visaAverageTicket REAL,TotalCurrentFees REAL,CurrentEffectiveRate REAL,debitInterchangeFees REAL , aeInterchangeFees REAL,dsInterchangeFees REAL ,mcInterchangeFees REAL,visaInterchangeFees REAL,debitProcessingFees REAL ,aeProcessingFees REAL,dsProcessingFees REAL,mcProcessingFees REAL,visaProcessingFees REAL,debitCardFees REAL ,aeCardFees REAL ,dsCardFees REAL ,mcCardFees REAL ,visaCardFees REAL ,TotalNewFees REAL,NewEffectiveRate REAL,MonthlySavings REAL,Year1Savings REAL,Year2Savings REAL,Year3Savings REAL,Year4Savings REAL,ProcessingFee REAL,AuthFee REAL,PinDebitProcessingFee REAL,PinDebitAuthFee REAL,MonthlyServiceFee REAL,IndustryComplinceFee REAL,TerminalFee REAL,MXGatewayFee REAL,DebitAccessFee REAL,DateCreated TEXT, Notes TEXT, IsUpdated INTEGER, LastUpdated TEXT, IsUploaded INTEGER, ProposalStatus TEXT, rpID TEXT, sm_id TEXT, tm_id TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS BusinessType (BusinessTypeName TEXT,visa_rate REAL,mc_rate REAL,ds_rate REAL,amex_rate REAL,debit_rate REAL)');
	db.execute('CREATE TABLE IF NOT EXISTS ReferralPartner (rp_id TEXT, BusinessName TEXT, StreetAddress TEXT, State TEXT, City TEXT, Zip TEXT, Contact TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS Library (file_id TEXT, file_name TEXT, folder TEXT, url TEXT, local_path TEXT, updated_at TEXT)');
	
	
	// pps table additions
	addColumn('pps','Proposal','acl_id', 'TEXT');
	db.close();
};

exports.insertAclBugFix = function(callback){
	
	try{
    	if(globalVariables.GV.userRole!="Admin")
    	{
    		var db = Ti.Database.open('pps');
    		db.execute('UPDATE Proposal SET acl_id=?, IsUploaded=0 where userId=? and (acl_id is null or acl_id="")',globalVariables.GV.acl_id, globalVariables.GV.userId);
    		db.close();	
    	}
    	callback({success: true});
    }
    catch(err){
        callback({
            success: false,
            message: err
        });
    }
};

exports.insertSmTmBugFix = function(callback){
    
    try{
        if(globalVariables.GV.userRole!="Sales Manager" || globalVariables.GV.userRole!="Admin")
        {
            var db = Ti.Database.open('pps');
            if(globalVariables.GV.tm_id!=null || globalVariables.GV.tm_id!="")
            {
                if(globalVariables.GV.userRole=="Territory Manager")
                {
                    db.execute('UPDATE Proposal SET tm_id=?, IsUploaded=0 where userId=? and (tm_id is null or tm_id="")',globalVariables.GV.userId, globalVariables.GV.userId);
                }
                else{
                    db.execute('UPDATE Proposal SET tm_id=?, IsUploaded=0 where userId=? and (tm_id is null or tm_id="")',globalVariables.GV.tm_id, globalVariables.GV.userId);    
                }
                
                Ti.API.info("--------RAN TM_ID UPDATE------------");
            }
            db.execute('UPDATE Proposal SET sm_id=?, IsUploaded=0 where userId=? and (sm_id is null or sm_id="")',globalVariables.GV.sm_id, globalVariables.GV.userId);
            Ti.API.info("--------RAN SM_ID UPDATE------------");
            db.close(); 
        }
        Ti.API.info("--------RUNNING CALLBACK------------");
        callback({success: true});
    }
    catch(err){
        callback({
            success: false,
            message: err
        });
    }
};

var addColumn = function(dbname, tblName, newFieldName, colSpec) {
	var db = Ti.Database.open(dbname);
	var fieldExists = false;
	resultSet = db.execute('PRAGMA TABLE_INFO(' + tblName + ')');
	while (resultSet.isValidRow()) {
		if(resultSet.field(1)==newFieldName) {
			fieldExists = true;
		}
		resultSet.next();
	} // end while
	if(!fieldExists) {
		// field does not exist, so add it
		db.execute('ALTER TABLE ' + tblName + ' ADD COLUMN '+newFieldName + ' ' + colSpec);
	}
	db.close();
};

exports.FillProposal = function(callback) {
	var d = new Date();
	globalVariables.GV.DateCreated = globalVariables.GV.LastUpdated = d.toUTCString();
	//globalVariables.GV.timeId = Date.time;
	try{
		var db = Ti.Database.open('pps');
		db.execute('INSERT INTO Proposal (proposalId, userId, repName, BusinessName,StreetAddress,State,City,Zip,Contact,Phone,BusinessType, ProcessingMonths,debitVol,aeVol,dsVol ,mcVol,visaVol,debitTransactions,aeTransactions ,dsTransactions,mcTransactions,visaTransactions, debitAverageTicket ,aeAverageTicket ,dsAverageTicket ,mcAverageTicket ,visaAverageTicket ,TotalCurrentFees ,CurrentEffectiveRate ,debitInterchangeFees , aeInterchangeFees,dsInterchangeFees,mcInterchangeFees,visaInterchangeFees,debitProcessingFees,aeProcessingFees,dsProcessingFees,mcProcessingFees,visaProcessingFees,debitCardFees ,aeCardFees ,dsCardFees,mcCardFees,visaCardFees,TotalNewFees,NewEffectiveRate,MonthlySavings,Year1Savings,Year2Savings,Year3Savings,Year4Savings,ProcessingFee,AuthFee,PinDebitProcessingFee,PinDebitAuthFee,MonthlyServiceFee,IndustryComplinceFee,TerminalFee,MXGatewayFee,DebitAccessFee,DateCreated, Notes, IsUpdated, LastUpdated, IsUploaded, ProposalStatus, rpID, sm_id, tm_id, acl_id)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', "0", globalVariables.GV.userId, globalVariables.GV.repName, globalVariables.GV.BusinessName, globalVariables.GV.StreetAddress, globalVariables.GV.State, globalVariables.GV.City, globalVariables.GV.Zip, globalVariables.GV.Contact, globalVariables.GV.Phone, globalVariables.GV.BusinessType, globalVariables.GV.ProcessingMonths, globalVariables.GV.debitVol, globalVariables.GV.aeVol, globalVariables.GV.dsVol, globalVariables.GV.mcVol, globalVariables.GV.visaVol, globalVariables.GV.debitTransactions, globalVariables.GV.aeTransactions, globalVariables.GV.dsTransactions, globalVariables.GV.mcTransactions, globalVariables.GV.visaTransactions, globalVariables.GV.debitAverageTicket, globalVariables.GV.aeAverageTicket, globalVariables.GV.dsAverageTicket, globalVariables.GV.mcAverageTicket, globalVariables.GV.visaAverageTicket, globalVariables.GV.TotalCurrentFees, globalVariables.GV.CurrentEffectiveRate, globalVariables.GV.debitInterchangeFees, globalVariables.GV.aeInterchangeFees, globalVariables.GV.dsInterchangeFees, globalVariables.GV.mcInterchangeFees, globalVariables.GV.visaInterchangeFees, globalVariables.GV.debitProcessingFees, globalVariables.GV.aeProcessingFees, globalVariables.GV.dsProcessingFees, globalVariables.GV.mcProcessingFees, globalVariables.GV.visaProcessingFees, globalVariables.GV.debitCardFees, globalVariables.GV.aeCardFees, globalVariables.GV.dsCardFees, globalVariables.GV.mcCardFees, globalVariables.GV.visaCardFees, globalVariables.GV.TotalNewFees, globalVariables.GV.NewEffectiveRate, globalVariables.GV.MonthlySavings, globalVariables.GV.Year1Savings, globalVariables.GV.Year2Savings, globalVariables.GV.Year3Savings, globalVariables.GV.Year4Savings, globalVariables.GV.ProcessingFee, globalVariables.GV.AuthFee, globalVariables.GV.PinDebitProcessingFee, globalVariables.GV.PinDebitAuthFee, globalVariables.GV.MonthlyServiceFee, globalVariables.GV.IndustryComplinceFee, globalVariables.GV.TerminalFee, globalVariables.GV.MXGatewayFee, globalVariables.GV.DebitAccessFee, globalVariables.GV.DateCreated, globalVariables.GV.NotesText, 0, globalVariables.GV.LastUpdated, 0, globalVariables.GV.ProposalStatus, globalVariables.GV.rpID, globalVariables.GV.sm_id, globalVariables.GV.tm_id, globalVariables.GV.acl_id);
		globalVariables.GV.currentLocalId=db.lastInsertRowId;
		db.close();
		d=null;
		if(callback)
		{
			callback();
		}
	}
	catch(err){
		alert("Error saving new proposal locally");
		Ti.API.error("Error Inserting new Proposal to local db" + JSON.stringify(err));
	}
};

exports.fillLibrary = function(dataArray, callback){
	
		try{
			for(var i=0;i<dataArray.length;i++){
				var db = Ti.Database.open('pps');
				//db.execute
				if(globalVariables.GV.localFileIds.indexOf(dataArray[i].id) > -1){
					db.execute('UPDATE Library SET file_name=?,folder=?, url=?, local_path=?, updated_at=? where file_id=?',dataArray[i].name, dataArray[i].folder, dataArray[i].url, dataArray[i].filepath, dataArray[i].updated_at, dataArray[i].id);
					db.close();
				}
				else{
					db.execute('INSERT INTO Library (file_id, file_name, folder, url, local_path, updated_at)VALUES(?,?,?,?,?,?)',dataArray[i].id, dataArray[i].name, dataArray[i].folder, dataArray[i].url, dataArray[i].filepath, dataArray[i].updated_at);
					db.close();
				}
			}
			callback({success: true});
		}
		catch(err){
			//Ti.API.error("Error downloading document "+dataArray[i].name);
			alert("Error downloading library document "+dataArray[i].name+". Try to sync again later.");
			callback({
				success: false,
				msg: err
			});
		}
	//callback();	
};

exports.insertProposal = function(dataArray, callback){
	var success = true;
	var moment=require('/lib/moment');
	for(var i=0;i<dataArray.length;i++){
		try{
			var db = Ti.Database.open('pps');
			//var Date = Getdate.GetDate();
			// var timeId = Date.time;
			// if(dataArray[i].timeId==0){
				// dataArray[i].timeId=timeId;
			// }
			if(dataArray[i].ProposalStatus==null){// || dataArray[i].ProposalStatus!="Appointment" || dataArray[i].ProposalStatus!="Presented" || dataArray[i].ProposalStatus!="Signed"){
				dataArray[i].ProposalStatus="Appointment";
			}
			//var moment = require('/moment');
			var dateHolder = moment(dataArray[i].updated_at);
			//new Date(dataArray[i].updated_at.toString());
			dataArray[i].LastUpdated = dateHolder.toString();
			var aclid=null;
			var _isUploaded=1;
			var _isUpdated=0;
			if(!("acls" in dataArray[i]) && dataArray[i].user.custom_fields.acl_id!=="")//(dataArray[i].indexOf("acls") == -1) //|| typeof dataArray[i].acls[0].id == null)
			{
			    if(dataArray[i].user.role=="Account Executive" || dataArray[i].user.role=="Territory Manager"||dataArray[i].user.role=="Sales Manager")
			    {
			        aclid=dataArray[i].user.custom_fields.acl_id;
			        _isUpdated=1;
	                _isUploaded=0;
			    }
			    // else
			    // {
			        // aclid=null;
			        // isUploaded=1;
			    // }
			}
			else{
			    aclid=dataArray[i].acls.id;
			    _isUploaded=1;
			    _isUpdated=0;
			}
			// if(globalVariables.GV.userRole=="Account Executive" || globalVariables.GV.userRole=="Territory Manager")
			// {
// 			    
			// }
			// {
			    // aclid=null;
			// }
			// else{
			    // aclid=dataArray[i].acls[0].id;
			// }
			db.execute('INSERT INTO Proposal (proposalId, userId, repName, BusinessName,StreetAddress,State,City,Zip,Contact,Phone,BusinessType, ProcessingMonths,debitVol,aeVol,dsVol ,mcVol,visaVol,debitTransactions,aeTransactions ,dsTransactions,mcTransactions,visaTransactions, debitAverageTicket ,aeAverageTicket ,dsAverageTicket ,mcAverageTicket ,visaAverageTicket ,TotalCurrentFees ,CurrentEffectiveRate ,debitInterchangeFees , aeInterchangeFees,dsInterchangeFees,mcInterchangeFees,visaInterchangeFees,debitProcessingFees,aeProcessingFees,dsProcessingFees,mcProcessingFees,visaProcessingFees,debitCardFees ,aeCardFees ,dsCardFees,mcCardFees,visaCardFees,TotalNewFees,NewEffectiveRate,MonthlySavings,Year1Savings,Year2Savings,Year3Savings,Year4Savings,ProcessingFee,AuthFee,PinDebitProcessingFee,PinDebitAuthFee,MonthlyServiceFee,IndustryComplinceFee,TerminalFee,MXGatewayFee,DebitAccessFee,DateCreated, Notes, IsUpdated, LastUpdated, IsUploaded, ProposalStatus, rpID, sm_id, tm_id, acl_id)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', dataArray[i].id, dataArray[i].user.id, dataArray[i].user.first_name+" "+dataArray[i].user.last_name, dataArray[i].BusinessName, dataArray[i].StreetAddress, dataArray[i].State, dataArray[i].City, dataArray[i].Zip, dataArray[i].Contact, dataArray[i].Phone, dataArray[i].BusinessType, dataArray[i].ProcessingMonths, dataArray[i].debitVol, dataArray[i].aeVol, dataArray[i].dsVol, dataArray[i].mcVol, dataArray[i].visaVol, dataArray[i].debitTransactions, dataArray[i].aeTransactions, dataArray[i].dsTransactions, dataArray[i].mcTransactions, dataArray[i].visaTransactions, dataArray[i].debitAverageTicket, dataArray[i].aeAverageTicket, dataArray[i].dsAverageTicket, dataArray[i].mcAverageTicket, dataArray[i].visaAverageTicket, dataArray[i].TotalCurrentFees, dataArray[i].CurrentEffectiveRate, dataArray[i].debitInterchangeFees, dataArray[i].aeInterchangeFees, dataArray[i].dsInterchangeFees, dataArray[i].mcInterchangeFees, dataArray[i].visaInterchangeFees, dataArray[i].debitProcessingFees, dataArray[i].aeProcessingFees, dataArray[i].dsProcessingFees, dataArray[i].mcProcessingFees, dataArray[i].visaProcessingFees, dataArray[i].debitCardFees, dataArray[i].aeCardFees, dataArray[i].dsCardFees, dataArray[i].mcCardFees, dataArray[i].visaCardFees, dataArray[i].TotalNewFees, dataArray[i].NewEffectiveRate, dataArray[i].MonthlySavings, dataArray[i].Year1Savings, dataArray[i].Year2Savings, dataArray[i].Year3Savings, dataArray[i].Year4Savings, dataArray[i].ProcessingFee, dataArray[i].AuthFee, dataArray[i].PinDebitProcessingFee, dataArray[i].PinDebitAuthFee, dataArray[i].MonthlyServiceFee, dataArray[i].IndustryComplinceFee, dataArray[i].TerminalFee, dataArray[i].MXGatewayFee, dataArray[i].DebitAccessFee, dataArray[i].DateCreated, dataArray[i].NotesText, _isUpdated, dataArray[i].LastUpdated, _isUploaded, dataArray[i].ProposalStatus, dataArray[i].rpID, dataArray[i].sm_id, dataArray[i].tm_id, aclid);
			db.close();
			dateHolder=null;
			aclid=null;
		}
		catch(err){
			success=false;
			alert("Error inserting proposals from back end into iPad");
			Ti.API.error("Insert Proposal to local db from ACS error " + JSON.stringify(err));
		}
	}
	moment=null;
	callback({success: success});
};

exports.ShowProposal = function(callback) {
	
	var sqlStatement = null;
	if(globalVariables.GV.userRole=="Admin")
	{
		sqlStatement = "Select * from Proposal order by LastUpdated";
	}
	else if(globalVariables.GV.userRole=="Sales Manager"){
		sqlStatement = "Select * from Proposal where sm_id= '"+ globalVariables.GV.userId+"'";// GROUP BY userId ORDER BY repName ";
	}
	else if(globalVariables.GV.userRole=="Territory Manager"){
		sqlStatement = "Select * from Proposal where tm_id= '"+ globalVariables.GV.userId+"'";// GROUP BY userId ORDER BY repName ";
	}
	else{
		sqlStatement = "Select * from Proposal where userId= '"+ globalVariables.GV.userId+"'";// 
	}
	var dataArray = [];
	try{
		var db = Ti.Database.open('pps');
		var SPTable = db.execute(sqlStatement);//('select * from Proposal');
		var i = 0;
		while (SPTable.isValidRow()) {
			// var luDate = new Date(SPTable.fieldByName('LastUpdated'));
			// var luDateLocal=luDate.toLocaleString();
			// var createdDate = new Date(SPTable.fieldByName('DateCreated'));
			// var createdDateLocal = 
							
			dataArray.push({
				repName : SPTable.fieldByName('repName'),
				BusinessName : SPTable.fieldByName('BusinessName'),
	            DateCreated:SPTable.fieldByName('DateCreated'),
				StreetAddress : SPTable.fieldByName('StreetAddress'),
				State : SPTable.fieldByName('State'),
				City : SPTable.fieldByName('City'),
				Zip : SPTable.fieldByName('Zip'),
				Contact : SPTable.fieldByName('Contact'),
				Phone : SPTable.fieldByName('Phone'),
				BusinessType : SPTable.fieldByName('BusinessType'),
				ProcessingMonths : SPTable.fieldByName('ProcessingMonths'),
				debitVol : SPTable.fieldByName('debitVol'),
				aeVol : SPTable.fieldByName('aeVol'),
				dsVol : SPTable.fieldByName('dsVol'),
				mcVol : SPTable.fieldByName('mcVol'),
				visaVol : SPTable.fieldByName('visaVol'),
				debitTransactions : SPTable.fieldByName('debitTransactions'),
				aeTransactions : SPTable.fieldByName('aeTransactions'),
				dsTransactions : SPTable.fieldByName('dsTransactions'),
				mcTransactions : SPTable.fieldByName('mcTransactions'),
				visaTransactions : SPTable.fieldByName('visaTransactions'),
				debitAverageTicket : SPTable.fieldByName('debitAverageTicket'),
				aeAverageTicket : SPTable.fieldByName('aeAverageTicket'),
				dsAverageTicket : SPTable.fieldByName('dsAverageTicket'),
				mcAverageTicket : SPTable.fieldByName('mcAverageTicket'),
				visaAverageTicket : SPTable.fieldByName('visaAverageTicket'),
				TotalCurrentFees : SPTable.fieldByName('TotalCurrentFees'),
				CurrentEffectiveRate : SPTable.fieldByName('CurrentEffectiveRate'),
				debitInterchangeFees : SPTable.fieldByName('debitInterchangeFees'),
				aeInterchangeFees : SPTable.fieldByName('aeInterchangeFees'),
				dsInterchangeFees : SPTable.fieldByName('dsInterchangeFees'),
				mcInterchangeFees : SPTable.fieldByName('mcInterchangeFees'),
				visaInterchangeFees : SPTable.fieldByName('visaInterchangeFees'),
				debitProcessingFees : SPTable.fieldByName('debitProcessingFees'),
				aeProcessingFees : SPTable.fieldByName('aeProcessingFees'),
				dsProcessingFees : SPTable.fieldByName('dsProcessingFees'),
				mcProcessingFees : SPTable.fieldByName('mcProcessingFees'),
				visaProcessingFees : SPTable.fieldByName('visaProcessingFees'),
				debitCardFees : SPTable.fieldByName('debitCardFees'),
				aeCardFees : SPTable.fieldByName('aeCardFees'),
				dsCardFees : SPTable.fieldByName('dsCardFees'),
				mcCardFees : SPTable.fieldByName('mcCardFees'),
				visaCardFees : SPTable.fieldByName('visaCardFees'),
				TotalNewFees : SPTable.fieldByName('TotalNewFees'),
				NewEffectiveRate : SPTable.fieldByName('NewEffectiveRate'),
				MonthlySavings : SPTable.fieldByName('MonthlySavings'),
				Year1Savings : SPTable.fieldByName('Year1Savings'),
				Year2Savings : SPTable.fieldByName('Year2Savings'),
				Year3Savings : SPTable.fieldByName('Year3Savings'),
				Year4Savings : SPTable.fieldByName('Year4Savings'),
				ProcessingFee : SPTable.fieldByName('ProcessingFee'),
				AuthFee : SPTable.fieldByName('AuthFee'),
				PinDebitProcessingFee : SPTable.fieldByName('PinDebitProcessingFee'),
				PinDebitAuthFee : SPTable.fieldByName('PinDebitAuthFee'),
				MonthlyServiceFee : SPTable.fieldByName('MonthlyServiceFee'),
				IndustryComplinceFee : SPTable.fieldByName('IndustryComplinceFee'),
				TerminalFee : SPTable.fieldByName('TerminalFee'),
				MXGatewayFee : SPTable.fieldByName('MXGatewayFee'),
				DebitAccessFee : SPTable.fieldByName('DebitAccessFee'),
				//timeId: SPTable.fieldByName('timeId'),
				ProposalId: SPTable.fieldByName('proposalId'),
				NotesText: SPTable.fieldByName('Notes'),
				IsUpdated : SPTable.fieldByName('IsUpdated'),
				LastUpdated: SPTable.fieldByName('LastUpdated'),
				userId: SPTable.fieldByName('userId'),
				ProposalStatus: SPTable.fieldByName('ProposalStatus'),
				rpID: SPTable.fieldByName('rpID'),
				sm_id: SPTable.fieldByName('sm_id'),
				tm_id: SPTable.fieldByName('tm_id'),
				acl_id: SPTable.fieldByName('acl_id')
			});
			
			//Commenting out Log data
			//Ti.API.info('PPS Table Row: \n' + JSON.stringify(dataArray[i]));
			
			i++;
			SPTable.next();
		};
		db.close();
		sqlStatement=null;
	}
	catch (err){
		Ti.API.error("Query Proposals Error: \n" + JSON.stringify(err));
	}
	
	callback({results: dataArray});
};

exports.getAllProposalIds = function(callback){
	var sqlStatement = null;
	if(globalVariables.GV.userRole=="Admin")
	{
		sqlStatement = "Select * from Proposal where IsUploaded=1";
	}
	else if(globalVariables.GV.userRole=="Sales Manager")
	{ 
		sqlStatement = "Select * from Proposal where IsUploaded=1 and sm_id= '"+ globalVariables.GV.userId+"'";
	}
	else if(globalVariables.GV.userRole=="Territory Manager")
	{ 
		sqlStatement = "Select * from Proposal where IsUploaded=1 and tm_id= '"+ globalVariables.GV.userId+"'";
	}
	else{
		sqlStatement = "Select * from Proposal where IsUploaded=1 and userId= '"+ globalVariables.GV.userId+"'";
	}
	var dataArray = [];
	try{
		var db = Ti.Database.open('pps');
		var SPTable = db.execute(sqlStatement);//('select * from Proposal');
		var i = 0;
		while (SPTable.isValidRow()) {	
			dataArray.push({
				ProposalId: SPTable.fieldByName('proposalId'),
			});
			i++;
			SPTable.next();
		};
		db.close();
		sqlStatement=null;
		if(dataArray.length==0)
			globalVariables.GV.lastProposalSyncDate=0;
	}
	catch (err){
		Ti.API.error("Query Proposals Error: \n" + JSON.stringify(err));
	}
	callback({results:dataArray});
};

exports.getFileIDs = function(callback){
	//var returnArray = [];
	globalVariables.GV.localFileIds=[];
	try{
		var db = Ti.Database.open('pps');
		var SPTable = db.execute("Select * from Library");
		//var i=0;
		while(SPTable.isValidRow()){
			globalVariables.GV.localFileIds.push(
				SPTable.fieldByName('file_id')
			);
			//i++;
			SPTable.next();
		}
		db.close();
		if(globalVariables.GV.localFileIds.length==0){
			globalVariables.GV.lastFileSyncDate = 0;
		}
		callback({
			success: true
		});
	}
	catch (err){
		//Ti.API.error("Error getting local file ids");
		callback({
			success: false,
			message: err
		});
	}
};

exports.FillBusinessType = function(dataArray) {

	try{
		var db = Ti.Database.open('pps');
		
		// var visarate;
		// var mcrate;
		// var dsrate;
		// var amexrate;
		// var debitrate;

		// if (globalVariables.GV.BusinessTypeName == 'Retail Low') {
			// visarate = globalVariables.GV.RetailLowVsa;
			// mcrate = globalVariables.GV.RetailLowMcard;
			// dsrate = globalVariables.GV.RetailLowDis;
			// //amexrate=globalVariables.GV.retailL
			// debitrate = globalVariables.GV.RetailLowDb;
		// } else if (globalVariables.GV.BusinessTypeName == 'Retail High') {
			// visarate = globalVariables.GV.RetailHighVsa;
			// mcrate = globalVariables.GV.RetailHighMcard;
			// dsrate = globalVariables.GV.RetailHighDis;
			// //amexrate=globalVariables.GV.RetailHigh;
			// debitrate = globalVariables.GV.RetailHighDb;
// 	
		// } else if (globalVariables.GV.BusinessTypeName == 'Restaurant Low') {
			// visarate = globalVariables.GV.RestaurantLowVsa;
			// mcrate = globalVariables.GV.RestaurantLowMcard;
			// dsrate = globalVariables.GV.RestaurantLowDis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.RestaurantLowDb;
// 	
		// } else if (globalVariables.GV.BusinessTypeName == 'Restaurant High') {
			// visarate = globalVariables.GV.RestaurantHighVsa;
			// mcrate = globalVariables.GV.RestaurantHighMcard;
			// dsrate = globalVariables.GV.RestaurantHighDis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.RestaurantHighDb;
// 	
		// } else if (globalVariables.GV.BusinessTypeName == 'Small Ticket') {
			// visarate = globalVariables.GV.SmallTicketVsa;
			// mcrate = globalVariables.GV.SmallTicketMcard;
			// dsrate = globalVariables.GV.SmallTicketDis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.SmallTicketDb;
// 	
		// } else if (globalVariables.GV.BusinessTypeName == 'MOTO') {
			// visarate = globalVariables.GV.MOTOVsa;
			// mcrate = globalVariables.GV.MOTOMcard;
			// dsrate = globalVariables.GV.MOTODis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.MOTODb;
// 	
		// } else if (globalVariables.GV.BusinessTypeName == 'Internet') {
			// visarate = globalVariables.GV.InternetVsa;
			// mcrate = globalVariables.GV.InternetMcard;
			// dsrate = globalVariables.GV.InternetDis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.InternetDb;
// 	
		// } else if (globalVariables.GV.BusinessTypeName == 'Business To Business') {
			// visarate = globalVariables.GV.BusinessToBusinessVsa;
			// mcrate = globalVariables.GV.BusinessToBusinessMcard;
			// dsrate = globalVariables.GV.BusinessToBusinessDis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.BusinessToBusinessDb;
// 	
		// } else if (globalVariables.GV.BusinessTypeName == 'SuperMarket') {
			// visarate = globalVariables.GV.SuperMarket;
			// mcrate = globalVariables.GV.SupermarketMcard;
			// dsrate = globalVariables.GV.SupermarketDis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.SupermarketDb;
// 	
		// } else if (globalVariables.GV.BusinessTypeName == 'Hotel/lodging') {
			// visarate = globalVariables.GV.HotelLodgingVsa;
			// mcrate = globalVariables.GV.HotelLodgingMcard;
			// dsrate = globalVariables.GV.HotelLodgingDis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.HotelLodgingDb;
// 	
		// } else {
			// visarate = globalVariables.GV.UtilitiesVsa;
			// mcrate = globalVariables.GV.UtilitiesMcard;
			// dsrate = globalVariables.GV.UtilitiesDis;
			// //amexrate=globalVariables.GV.
			// debitrate = globalVariables.GV.UtilitiesDb;
// 	
		// }
		db.execute('DELETE FROM BusinessType');
		for(var i=0;i<dataArray.length;i++){
			db.execute('INSERT INTO BusinessType (BusinessTypeName,visa_rate ,mc_rate ,ds_rate,amex_rate ,debit_rate ) VALUES(?,?,?,?,?,?)', dataArray[i].typeName, dataArray[i].visaRate, dataArray[i].mcRate, dataArray[i].dsRate, dataArray[i].amexRate, dataArray[i].debitRate);
		}
		db.close();
		LoadBusinessTypes(function(){});
	}
	catch(err){
		Ti.API.error("Error in Fill Business Table:  \n"+JSON.stringify(err));
	}
};

exports.FillReferralPartners = function(dataArray){
	try{
		var db = Ti.Database.open('pps');
		db.execute('Delete from ReferralPartner');
		
		for(var i=0;i<dataArray.length;i++){
			db.execute('INSERT into ReferralPartner(rp_id, BusinessName, StreetAddress, State, City, Zip, Contact) VALUES(?,?,?,?,?,?,?)', dataArray[i].id, dataArray[i].BusinessName, dataArray[i].StreetAddress, dataArray[i].State, dataArray[i].City, dataArray[i].Zip, dataArray[i].Contact);	
		}
		db.close();
		LoadReferralPartners(function(){});
	}
	catch (err){
		Ti.API.error(JSON.stringify(err));
	}
};

function LoadBusinessTypes (callback) {

	try{
		var db = Ti.Database.open('pps');
		var BTypeTable = db.execute('select * from BusinessType');
	
		//var ID = [];
		var BusinessTypeName = [];
		var visa_rate = [];
		var mc_rate = [];
		var ds_rate = [];
		var amex_rate = [];
		var debit_rate = [];
		var i = 0;
		while (BTypeTable.isValidRow()) {
			//ID[i] = BTypeTable.fieldByName('ID');
			var name = BTypeTable.fieldByName('BusinessTypeName');
			if(name=="Retail High")
			{
				globalVariables.GV.RetailHighVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.RetailHighMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.RetailHighDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.RetailHighAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.RetailHighDb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="Retail Low")
			{
				globalVariables.GV.RetailLowVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.RetailLowMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.RetailLowDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.RetailLowAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.RetailLowDb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="Restaurant High")
			{
				globalVariables.GV.RestaurantHighVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.RestaurantHighMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.RestaurantHighDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.RestaurantHighAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.RestaurantHighDb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="Restaurant Low")
			{
				globalVariables.GV.RestaurantLowVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.RestaurantLowMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.RestaurantLowDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.RestaurantLowAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.RestaurantLowDb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="Utilities")
			{
				globalVariables.GV.UtilitiesVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.UtilitiesMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.UtilitiesDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.UtilitiesAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.UtilitiesDb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="Hotel/Lodging")
			{
				globalVariables.GV.HotelLodgingVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.HotelLodgingMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.HotelLodgingDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.HotelLodgingAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.HotelLodgingDb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="Supermarket")
			{
				globalVariables.GV.SupermarketVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.SupermarketMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.SupermarketDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.SupermarketAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.SupermarketDb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="Business to Business")
			{
				globalVariables.GV.BusinessToBusinessVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.BusinessToBusinessMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.BusinessToBusinessDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.BusinessToBusinessAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.BusinessToBusinessDb = BTypeTable.fieldByName('debit_rate');
			}
			else if (name=="Internet"){
				globalVariables.GV.InternetVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.InternetMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.InternetDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.InternetAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.InternetDb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="MOTO"){
				globalVariables.GV.MOTOVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.MOTOMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.MOTODis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.	MOTOAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.MOTODb = BTypeTable.fieldByName('debit_rate');
			}
			else if(name=="Small Ticket")
			{
				globalVariables.GV.SmallTicketVsa = BTypeTable.fieldByName('visa_rate');
				globalVariables.GV.SmallTicketMcard = BTypeTable.fieldByName('mc_rate');
				globalVariables.GV.SmallTicketDis = BTypeTable.fieldByName('ds_rate');
				globalVariables.GV.SmallTicketAmex = BTypeTable.fieldByName('amex_rate');
				globalVariables.GV.SmallTicketDb = BTypeTable.fieldByName('debit_rate');
			}
			
			// visa_rate[i] = BTypeTable.fieldByName('visa_rate');
			// Ti.API.info('visa_rate');
			// mc_rate[i] = BTypeTable.fieldByName('mc_rate');
			// Ti.API.info('mc_rate');
			// ds_rate[i] = BTypeTable.fieldByName('ds_rate');
			// Ti.API.info(ds_rate[i]);
			// amex_rate[i] = BTypeTable.fieldByName('amex_rate');
			// Ti.API.info('amex_rate');
			// debit_rate[i] = BTypeTable.fieldByName('debit_rate');
			// Ti.API.info('debit_rate');
			// i++;
			BTypeTable.next();
		};
		callback();
	}
	catch(err){
		Ti.API.error('Error querying business type table:  \n'+JSON.stringify(err));
	}

};

exports.LoadBusinessTypes = LoadBusinessTypes;

exports.InsertProposalID = function(params, callback){
	try{
		var db = Ti.Database.open('pps');
		// insert proposal and set IsUploaded column to 1
		if(params.localPropId)
		{
			db.execute('UPDATE Proposal SET proposalId=?, IsUploaded=1 WHERE localPropID=?',params.proposalId,params.localPropId);
		}
		else
		{
			db.execute('UPDATE Proposal SET proposalId=?, IsUploaded=1 WHERE localPropID=?',params.proposalId,globalVariables.GV.currentLocalId);
		}
		db.close();
		callback({success: true});
	}
	catch (err){
		callback({
			success: false,
			results: err
		});
		//Ti.API.error("Update Proposal ID Error: \n" + JSON.stringify(err));
	}
};

exports.setUploadedOff = function(params, callback){
	try
	{
		var db = Ti.Database.open('pps');
		db.execute('UPDATE Proposal SET IsUploaded=0 WHERE proposalId=?',params.proposalId);
		db.close();
		callback({success: true});
	}
	catch (err){
		callback({success: false});
		Ti.API.error("Upload off Proposal ID Error: \n" + JSON.stringify(err));
	}
};

exports.setUploadedOn = function(params, callback){
	try
	{
		var db = Ti.Database.open('pps');
		db.execute('UPDATE Proposal SET IsUploaded=1 WHERE proposalId=?',params.proposalId);
		db.close();
		callback({success: true});
	}
	catch (err){
		callback({success: false});
		Ti.API.error("Upload on Proposal ID Error: \n" + JSON.stringify(err));
	}
};

exports.updateStatus = function(params, callback){
	try
	{
		var db = Ti.Database.open('pps');
		db.execute("UPDATE Proposal SET ProposalStatus=?, IsUpdated=?, IsUploaded=0 WHERE proposalId=?", params.status,1, params.proposalId);
		db.close();
		callback({success: true});
	}
	catch (err){
		callback({success: false});
		Ti.API.error("Update ProposalStatus on Proposal ID Error: \n" + JSON.stringify(err));
	}
};

exports.queryLocalProposals = function(callback){
	var dataArray = [];
	try{
		var db = Ti.Database.open('pps');
		//db.execute('SELECT * from Proposal where proposalId="0"');
	    var queryStatement = null;
		if(globalVariables.GV.userRole=="Account Executive")
		{
		    queryStatement = 'select * from Proposal where (proposalId="0" or IsUploaded=0) and userId="'+globalVariables.GV.userId+'"';
		}
		else if(globalVariables.GV.userRole=="Territory Manager")
		{
		    queryStatement = 'select * from Proposal where (proposalId="0" or IsUploaded=0) and tm_id="'+globalVariables.GV.userId+'"';
		}
		else if(globalVariables.GV.userRole=="Sales Manager")
		{
		    queryStatement = 'select * from Proposal where (proposalId="0" or IsUploaded=0) and sm_id="'+globalVariables.GV.userId+'"';
		}
		else{
		    queryStatement = 'select * from Proposal where proposalId="0" or IsUploaded=0';
		}
		var SPTable = db.execute(queryStatement);
		    //'select * from Proposal where proposalId="0" or IsUploaded=0');// OR IsUpdated=1');
		var i = 0;
		while (SPTable.isValidRow()) {
	
			dataArray.push({
				BusinessName : SPTable.fieldByName('BusinessName'),
	            DateCreated:SPTable.fieldByName('DateCreated'),
				StreetAddress : SPTable.fieldByName('StreetAddress'),
				State : SPTable.fieldByName('State'),
				City : SPTable.fieldByName('City'),
				Zip : SPTable.fieldByName('Zip'),
				Contact : SPTable.fieldByName('Contact'),
				Phone : SPTable.fieldByName('Phone'),
				BusinessType: SPTable.fieldByName('BusinessType'),
				ProcessingMonths : SPTable.fieldByName('ProcessingMonths'),
				debitVol : SPTable.fieldByName('debitVol'),
				aeVol : SPTable.fieldByName('aeVol'),
				dsVol : SPTable.fieldByName('dsVol'),
				mcVol : SPTable.fieldByName('mcVol'),
				visaVol : SPTable.fieldByName('visaVol'),
				debitTransactions : SPTable.fieldByName('debitTransactions'),
				aeTransactions : SPTable.fieldByName('aeTransactions'),
				dsTransactions : SPTable.fieldByName('dsTransactions'),
				mcTransactions : SPTable.fieldByName('mcTransactions'),
				visaTransactions : SPTable.fieldByName('visaTransactions'),
				debitAverageTicket : SPTable.fieldByName('debitAverageTicket'),
				aeAverageTicket : SPTable.fieldByName('aeAverageTicket'),
				dsAverageTicket : SPTable.fieldByName('dsAverageTicket'),
				mcAverageTicket : SPTable.fieldByName('mcAverageTicket'),
				visaAverageTicket : SPTable.fieldByName('visaAverageTicket'),
				TotalCurrentFees : SPTable.fieldByName('TotalCurrentFees'),
				CurrentEffectiveRate : SPTable.fieldByName('CurrentEffectiveRate'),
				debitInterchangeFees : SPTable.fieldByName('debitInterchangeFees'),
				aeInterchangeFees : SPTable.fieldByName('aeInterchangeFees'),
				dsInterchangeFees : SPTable.fieldByName('dsInterchangeFees'),
				mcInterchangeFees : SPTable.fieldByName('mcInterchangeFees'),
				visaInterchangeFees : SPTable.fieldByName('visaInterchangeFees'),
				debitProcessingFees : SPTable.fieldByName('debitProcessingFees'),
				aeProcessingFees : SPTable.fieldByName('aeProcessingFees'),
				dsProcessingFees : SPTable.fieldByName('dsProcessingFees'),
				mcProcessingFees : SPTable.fieldByName('mcProcessingFees'),
				visaProcessingFees : SPTable.fieldByName('visaProcessingFees'),
				debitCardFees : SPTable.fieldByName('debitCardFees'),
				aeCardFees : SPTable.fieldByName('aeCardFees'),
				dsCardFees : SPTable.fieldByName('dsCardFees'),
				mcCardFees : SPTable.fieldByName('mcCardFees'),
				visaCardFees : SPTable.fieldByName('visaCardFees'),
				TotalNewFees : SPTable.fieldByName('TotalNewFees'),
				NewEffectiveRate : SPTable.fieldByName('NewEffectiveRate'),
				// TotalCurrentFees : SPTable.fieldByName('TotalCurrentFee'),
				// ProposedFee : SPTable.fieldByName('TotalNewFee'),
				// CurrentEffectiveRate : SPTable.fieldByName('CurrentEffectiveRate'),
				// ProposedEffectiveRate : SPTable.fieldByName('NewEffectiveRate'),
				MonthlySavings : SPTable.fieldByName('MonthlySavings'),
				Year1Savings : SPTable.fieldByName('Year1Savings'),
				Year2Savings : SPTable.fieldByName('Year2Savings'),
				Year3Savings : SPTable.fieldByName('Year3Savings'),
				Year4Savings : SPTable.fieldByName('Year4Savings'),
				ProcessingFee : SPTable.fieldByName('ProcessingFee'),
				AuthFee : SPTable.fieldByName('AuthFee'),
				PinDebitProcessingFee : SPTable.fieldByName('PinDebitProcessingFee'),
				PinDebitAuthFee : SPTable.fieldByName('PinDebitAuthFee'),
				MonthlyServiceFee : SPTable.fieldByName('MonthlyServiceFee'),
				IndustryComplinceFee : SPTable.fieldByName('IndustryComplinceFee'),
				TerminalFee : SPTable.fieldByName('TerminalFee'),
				MXGatewayFee : SPTable.fieldByName('MXGatewayFee'),
				DebitAccessFee : SPTable.fieldByName('DebitAccessFee'),
				//timeId: SPTable.fieldByName('timeId'),
				ProposalId: SPTable.fieldByName('proposalId'),
				NotesText: SPTable.fieldByName('Notes'),
				IsUpdated : SPTable.fieldByName('IsUpdated'),
				LastUpdated: SPTable.fieldByName('LastUpdated'),
				localPropId: SPTable.fieldByName('localPropId'),
				IsUploaded: SPTable.fieldByName('IsUploaded'),
				ProposalStatus: SPTable.fieldByName('ProposalStatus'),
				rpID: SPTable.fieldByName('rpID'),
				sm_id: SPTable.fieldByName('sm_id'),
				tm_id: SPTable.fieldByName('tm_id'),
				acl_id: SPTable.fieldByName('acl_id')
			});
			
			i++;
			SPTable.next();
		};
		SPTable.close();
		db.close();
		callback({results: dataArray});
	}
	catch (err){
		Ti.API.error("Query Proposals Error: \n" + JSON.stringify(err));
	}
	
};

exports.updateLocalProposal=function(callback){
	try{
		
		var db = Ti.Database.open('pps');
		//Ti.API.info("TIME ID: "+ globalVariables.GV.timeId);
		var d = new Date();
		if(globalVariables.GV.requestedUpdate)
		{
			globalVariables.GV.LastUpdated = d.toUTCString();
		}
		else
		{
			globalVariables.GV.DateCreated = globalVariables.GV.LastUpdated = d.toUTCString();
		}
		
		db.execute('UPDATE Proposal SET BusinessName=?,StreetAddress=?,State=?,City=?,Zip=?,Contact=?,Phone=?,BusinessType=?, ProcessingMonths=?,debitVol=?,aeVol=?,dsVol=? ,mcVol=?,visaVol=?,debitTransactions=?,aeTransactions=? ,dsTransactions=?,mcTransactions=?,visaTransactions=?, debitAverageTicket=? ,aeAverageTicket=? ,dsAverageTicket=? ,mcAverageTicket=? ,visaAverageTicket=? ,TotalCurrentFees=? ,CurrentEffectiveRate=? ,debitInterchangeFees=? , aeInterchangeFees=?,dsInterchangeFees=?,mcInterchangeFees=?,visaInterchangeFees=?,debitProcessingFees=?,aeProcessingFees=?,dsProcessingFees=?,mcProcessingFees=?,visaProcessingFees=?,debitCardFees=? ,aeCardFees=? ,dsCardFees=?,mcCardFees=?,visaCardFees=?,TotalNewFees=?,NewEffectiveRate=?,MonthlySavings=?,Year1Savings=?,Year2Savings=?,Year3Savings=?,Year4Savings=?,ProcessingFee=?,AuthFee=?,PinDebitProcessingFee=?,PinDebitAuthFee=?,MonthlyServiceFee=?,IndustryComplinceFee=?,TerminalFee=?,MXGatewayFee=?,DebitAccessFee=?,DateCreated=?, Notes=?, IsUpdated=?, LastUpdated=?, ProposalStatus=?, IsUploaded=? WHERE proposalId=?', globalVariables.GV.BusinessName, globalVariables.GV.StreetAddress, globalVariables.GV.State, globalVariables.GV.City, globalVariables.GV.Zip, globalVariables.GV.Contact, globalVariables.GV.Phone, globalVariables.GV.BusinessType, globalVariables.GV.ProcessingMonths, globalVariables.GV.debitVol, globalVariables.GV.aeVol, globalVariables.GV.dsVol, globalVariables.GV.mcVol, globalVariables.GV.visaVol, globalVariables.GV.debitTransactions, globalVariables.GV.aeTransactions, globalVariables.GV.dsTransactions, globalVariables.GV.mcTransactions, globalVariables.GV.visaTransactions, globalVariables.GV.debitAverageTicket, globalVariables.GV.aeAverageTicket, globalVariables.GV.dsAverageTicket, globalVariables.GV.mcAverageTicket, globalVariables.GV.visaAverageTicket, globalVariables.GV.TotalCurrentFees, globalVariables.GV.CurrentEffectiveRate, globalVariables.GV.debitInterchangeFees, globalVariables.GV.aeInterchangeFees, globalVariables.GV.dsInterchangeFees, globalVariables.GV.mcInterchangeFees, globalVariables.GV.visaInterchangeFees, globalVariables.GV.debitProcessingFees, globalVariables.GV.aeProcessingFees, globalVariables.GV.dsProcessingFees, globalVariables.GV.mcProcessingFees, globalVariables.GV.visaProcessingFees, globalVariables.GV.debitCardFees, globalVariables.GV.aeCardFees, globalVariables.GV.dsCardFees, globalVariables.GV.mcCardFees, globalVariables.GV.visaCardFees, globalVariables.GV.TotalNewFees, globalVariables.GV.NewEffectiveRate, globalVariables.GV.MonthlySavings, globalVariables.GV.Year1Savings, globalVariables.GV.Year2Savings, globalVariables.GV.Year3Savings, globalVariables.GV.Year4Savings, globalVariables.GV.ProcessingFee, globalVariables.GV.AuthFee, globalVariables.GV.PinDebitProcessingFee, globalVariables.GV.PinDebitAuthFee, globalVariables.GV.MonthlyServiceFee, globalVariables.GV.IndustryComplinceFee, globalVariables.GV.TerminalFee, globalVariables.GV.MXGatewayFee, globalVariables.GV.DebitAccessFee, globalVariables.GV.DateCreated, globalVariables.GV.NotesText, 1, globalVariables.GV.LastUpdated, globalVariables.GV.ProposalStatus, 0, globalVariables.GV.ProposalId);
		db.close();
		d=null;
		//globalVariables.GV.requestedUpdate=false;
		if(callback)
		{
			callback({proposalId: globalVariables.GV.ProposalId});
		}
	}
	catch(err)
	{
		Ti.API.error(JSON.stringify(err));
	}
};

exports.importPropUpdates = function(dataArray, callback){
	var success = true;
	var moment=require('/lib/moment');
	for(var i=0;i<dataArray.length;i++){
		try{
			var db = Ti.Database.open('pps');
			//var Date = Getdate.GetDate();
			// var timeId = Date.time;
			// if(dataArray[i].timeId==0){
				// dataArray[i].timeId=timeId;
			// }
			if(dataArray[i].ProposalStatus==null){// || dataArray[i].ProposalStatus!="Appointment" || dataArray[i].ProposalStatus!="Presented" || dataArray[i].ProposalStatus!="Signed"){
				dataArray[i].ProposalStatus="Appointment";
			}
			var dateHolder = moment(dataArray[i].updated_at);
			dataArray[i].LastUpdated = dateHolder.toString();
			var aclid=null;
            var _isUploaded=1;
            var _isUpdated=0;
            if(!("acls" in dataArray[i])&& dataArray[i].user.custom_fields.acl_id!=="")//(dataArray[i].indexOf("acls") == -1) //|| typeof dataArray[i].acls[0].id == null)
            {
                if(dataArray[i].user.role=="Account Executive" || dataArray[i].user.role=="Territory Manager" || dataArray[i].user.role=="Sales Manager")
                {
                    aclid=dataArray[i].user.custom_fields.acl_id;
                    _isUploaded=0;
                    _isUpdated=1;
                }
                else
                {
                    aclid=null;
                    IsUploaded=1;
                }
            }
            else{
                aclid=dataArray[i].acls.id;
                _isUploaded=1;
            }
			db.execute('UPDATE Proposal SET userId=?, repName=?, BusinessName=?,StreetAddress=?,State=?,City=?,Zip=?,Contact=?,Phone=?,BusinessType=?, ProcessingMonths=?,debitVol=?,aeVol=?,dsVol=? ,mcVol=?,visaVol=?,debitTransactions=?,aeTransactions=? ,dsTransactions=?,mcTransactions=?,visaTransactions=?, debitAverageTicket=? ,aeAverageTicket=? ,dsAverageTicket=? ,mcAverageTicket=? ,visaAverageTicket=? ,TotalCurrentFees=? ,CurrentEffectiveRate=? ,debitInterchangeFees=? , aeInterchangeFees=?,dsInterchangeFees=?,mcInterchangeFees=?,visaInterchangeFees=?,debitProcessingFees=?,aeProcessingFees=?,dsProcessingFees=?,mcProcessingFees=?,visaProcessingFees=?,debitCardFees=? ,aeCardFees=? ,dsCardFees=?,mcCardFees=?,visaCardFees=?,TotalNewFees=?,NewEffectiveRate=?,MonthlySavings=?,Year1Savings=?,Year2Savings=?,Year3Savings=?,Year4Savings=?,ProcessingFee=?,AuthFee=?,PinDebitProcessingFee=?,PinDebitAuthFee=?,MonthlyServiceFee=?,IndustryComplinceFee=?,TerminalFee=?,MXGatewayFee=?,DebitAccessFee=?,DateCreated=?, Notes=?, IsUpdated=?, LastUpdated=?, ProposalStatus=?, acl_id=?, IsUploaded=? WHERE proposalId=?', dataArray[i].user_id, dataArray[i].user.first_name+" "+dataArray[i].user.last_name, dataArray[i].BusinessName, dataArray[i].StreetAddress, dataArray[i].State, dataArray[i].City, dataArray[i].Zip, dataArray[i].Contact, dataArray[i].Phone, dataArray[i].BusinessType, dataArray[i].ProcessingMonths, dataArray[i].debitVol, dataArray[i].aeVol, dataArray[i].dsVol, dataArray[i].mcVol, dataArray[i].visaVol, dataArray[i].debitTransactions, dataArray[i].aeTransactions, dataArray[i].dsTransactions, dataArray[i].mcTransactions, dataArray[i].visaTransactions, dataArray[i].debitAverageTicket, dataArray[i].aeAverageTicket, dataArray[i].dsAverageTicket, dataArray[i].mcAverageTicket, dataArray[i].visaAverageTicket, dataArray[i].TotalCurrentFees, dataArray[i].CurrentEffectiveRate, dataArray[i].debitInterchangeFees, dataArray[i].aeInterchangeFees, dataArray[i].dsInterchangeFees, dataArray[i].mcInterchangeFees, dataArray[i].visaInterchangeFees, dataArray[i].debitProcessingFees, dataArray[i].aeProcessingFees, dataArray[i].dsProcessingFees, dataArray[i].mcProcessingFees, dataArray[i].visaProcessingFees, dataArray[i].debitCardFees, dataArray[i].aeCardFees, dataArray[i].dsCardFees, dataArray[i].mcCardFees, dataArray[i].visaCardFees, dataArray[i].TotalNewFees, dataArray[i].NewEffectiveRate, dataArray[i].MonthlySavings, dataArray[i].Year1Savings, dataArray[i].Year2Savings, dataArray[i].Year3Savings, dataArray[i].Year4Savings, dataArray[i].ProcessingFee, dataArray[i].AuthFee, dataArray[i].PinDebitProcessingFee, dataArray[i].PinDebitAuthFee, dataArray[i].MonthlyServiceFee, dataArray[i].IndustryComplinceFee, dataArray[i].TerminalFee, dataArray[i].MXGatewayFee, dataArray[i].DebitAccessFee, dataArray[i].DateCreated, dataArray[i].NotesText, _isUpdated, dataArray[i].LastUpdated, dataArray[i].ProposalStatus, aclid, _isUploaded, dataArray[i].id);
			db.close();
			dateHolder=null;
			aclid=null;
			isUploaded=null;
		}
		catch(err){
			success=false;
			alert("Error updating proposals from back end into iPad");
			Ti.API.error("Update Proposal to local db from ACS error " + JSON.stringify(err));
		}
	}
	moment=null;
	callback({success: success});
};

exports.setUpdateOff = function(params, callback){
	try{
		var db = Ti.Database.open('pps');
		db.execute('UPDATE Proposal SET IsUpdated=? WHERE proposalId=?',0,params.proposalId);
		db.close();
		callback({success: true});
	}
	catch (err){
		callback({success: false});
		Ti.API.error("Update Proposal ID Error: \n" + JSON.stringify(err));
	}
};

function LoadReferralPartners(callback){
	try{
		var db= Ti.Database.open('pps');
		var rpTable = db.execute('Select rp_id, BusinessName from ReferralPartner');
		while(rpTable.isValidRow())
		{
			var json={};
			json[rpTable.fieldByName('rp_id').valueOf()] = {
					title: rpTable.fieldByName('BusinessName'),
					rownum: null 
			};
			// var rpItem = {
				// id:
				// {
					// title: rpTable.fieldByName('BusinessName'),
					// rownum: null 
				// }
				// //id: id,//rpTable.fieldByName('rp_id'),
// 				
			// };
			globalVariables.GV.ReferralPartners[rpTable.fieldByName('rp_id').valueOf()]=json[rpTable.fieldByName('rp_id').valueOf()];
			rpTable.next();
		}
		callback();
	}
	catch(err){
		Ti.API.error("LoadReferralPartner error:  \n" + JSON.stringify(err));
	}
};

exports.LoadReferralPartners = LoadReferralPartners;

exports.updateRp = function(params, callback){
	try
	{
		var db = Ti.Database.open('pps');
		db.execute("UPDATE Proposal SET rpID=?, IsUploaded=0, IsUpdated=1 WHERE proposalId=?", params.rpid, params.proposalId);
		db.close();
		callback({success: true});
	}
	catch (err){
		callback({success: false});
		Ti.API.error("Update ProposalStatus on Proposal ID Error: \n" + JSON.stringify(err));
	}
};

exports.getAllLastDates = function (callback){
	var sqlStatement = null;
	if(globalVariables.GV.userRole=="Admin")
	{
		sqlStatement = "Select * from Proposal";
	}
	else if(globalVariables.GV.userRole=="Sales Manager")
	{ 
		sqlStatement = "Select * from Proposal where sm_id= '"+ globalVariables.GV.userId+"'";
	}
	else if(globalVariables.GV.userRole=="Territory Manager")
	{ 
		sqlStatement = "Select * from Proposal where tm_id= '"+ globalVariables.GV.userId+"'";
	}
	else{
		sqlStatement = "Select * from Proposal where userId= '"+ globalVariables.GV.userId+"'";
	}
	var dataArray = [];
	try{
		var db = Ti.Database.open('pps');
		var SPTable = db.execute(sqlStatement);//('select * from Proposal');
		var i = 0;
		while (SPTable.isValidRow()) {	
			dataArray.push({
				ProposalId: SPTable.fieldByName('proposalId'),
				LastUpdated: SPTable.fieldByName('LastUpdated')
			});
			i++;
			SPTable.next();
		};
		db.close();
		sqlStatement=null;
	}
	catch (err){
		Ti.API.error("Query Proposals Error: \n" + JSON.stringify(err));
	}
	callback({results:dataArray});
};

exports.deleteProposals = function(params, callback){
    var sqlStatement = "Delete from Proposal where proposalId = ?";
    var dataset = params.ids;
    try{
        var db = Ti.Database.open('pps');
        for (var i=0;i<dataset.length;i++)
        {
            db.execute(sqlStatement,dataset[i]);
        }
        //db.execute(sqlStatement,params.ids);
        db.close();
        dataset=null;
        sqlStatement=null;
        callback({
            success: true
        });
    }
    catch(err){
        callback({
            success: false,
            message: err
        });
        
    }
};

exports.getLibraryFolders = function(callback){
	try{
		var db = Ti.Database.open('pps');
		var folders = [];
		var SPTable = db.execute("SELECT DISTINCT folder from library");
		while (SPTable.isValidRow()) {	
			folders.push({
				title: SPTable.fieldByName('folder'),
			});
			SPTable.next();
		};
		db.close();
		
		callback({
			success: true,
			folders: folders
		});
	}
	catch(err){
		callback({
			success: false,
			msg: "Error loading Folders from local database."
		});
	}
};

exports.getFolderFiles = function(folderName){
	try{
		var db = Ti.Database.open('pps');
		var sqlStatement = 'SELECT * from library where folder="' + folderName.title+'"';
		var SPTable = db.execute(sqlStatement);
		var returnData = [];
		//(file_id TEXT, file_name TEXT, folder TEXT, url TEXT, local_path TEXT, updated_at TEXT)');
		while(SPTable.isValidRow()){
			returnData.push({
				name: SPTable.fieldByName('file_name'),
				localPath: SPTable.fieldByName('local_path'),
			});
			SPTable.next();
		}
		db.close();
		return returnData;
	}
	catch(err){
		return err;
	}
};
