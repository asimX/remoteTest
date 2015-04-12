var globalVariables = require('globalVariables');
var acs = require('lib/acs');
var loading = require('lib/loading').loading();
var sync = require('lib/sync');
var db = require('db/db');

function HomeScreen(params) {
	
	var LibraryView = require('views/LibraryView').LibraryView();
	var MenuProposalView = require('views/MenuProposalView').MenuProposalView();
	var lastView = null;
	
	var selfW = Ti.UI.createWindow({
		backgroundColor : 'black',//'#3a3f65',
		backgroundImage : 'images/perforatedMetalBlack.png',
		tintColor: '#FFF', //'#0082b4',
		navTintColor: '#FFF',//'#0082b4',
		titleAttributes:{
			color:'#FFF',//'#0082b4',
        	font: {//fontFamily:'GillSans-Light', 
        		   fontSize:24,
        		   //fontWeight : 'bold'
        	}
       },
       title: "Interchange Analysis",
       barColor: "#0082b4"
	});
	
	var sliderPosition = 0;
	
	selfW.add(loading);
	//selfW.add(self);

	//////////////////////////////////Animations Work////////////////////////////////////
	var SlideInLibraryNormal = Titanium.UI.createAnimation({
		top : 0,
		duration: 300
	});
	var SlideOutLibraryFull = Titanium.UI.createAnimation({
		top : 704,
		duration: 300
	});
	var slideOutLibraryPar = Titanium.UI.createAnimation({
		top : 200,
		duration: 300
	});
	var slideInScrollableNormal = Titanium.UI.createAnimation({
		top : 0,
		duration: 300,
		bottom: 0
	});
	var slideOutScrollableFull = Titanium.UI.createAnimation({
		top : 704,
		duration: 300,
		bottom: -704
	});
	var slideOutScrollAblePar = Titanium.UI.createAnimation({
		top : 200,
		duration: 300,
		bottom: -200
	});
	var slideInPropsalNormal = Titanium.UI.createAnimation({
		top : 0,
		duration: 300
	});
	var slideOutPropsalFull = Titanium.UI.createAnimation({
		top : 704,
		duration: 300
	});
	var slideOutPropsalPar = Titanium.UI.createAnimation({
		top : 200,
		duration: 300
	});
	
	///////////////////////////////////////
	var ViewMenu = Ti.UI.createView({
		backgroundColor : 'transparent',
		width : Ti.UI.FILL,
		//layout : 'horizantal',
		height : 200,
		top : 0,
	});
	
	var imgInterchage = Ti.UI.createImageView({
		left : '12%',
		image : '/images/iconInterchange.png',
		width: 100,
		height: 100
	});

	ViewMenu.add(imgInterchage);
	
	imgInterchage.addEventListener('click', function(e) {
		animateIaView(function(e){});
	});
	
	function animateIaView (callback){
		if (sliderPosition == 5) {
			sliderPosition = 0;
			
			globalVariables.GV.localFileIds=null;
			LibraryView.animate(SlideOutLibraryFull);
			
			self.animate(slideInScrollableNormal, function(){
				selfW.title="Interchange Analysis";
				callback();
			});//, function(){
			//});
			
		} else if (sliderPosition === 8 || sliderPosition === 6) {
			sliderPosition = 0;
			
			MenuProposalView.animate(slideOutPropsalFull);
			self.animate(slideInScrollableNormal, function(){
				selfW.title="Interchange Analysis";
				callback();
			});//, function(){
			//});
			// scrollableView.animate(slideInScrollableNormal, function(e){
				// callback();
			// });
		} else {
			sliderPosition = 0;
			self.animate(slideInScrollableNormal, function(e){
				selfW.title="Interchange Analysis";
				callback();
			});
			// scrollableView.animate(slideInScrollableNormal, function(e){
				// callback();
			// });
		}
	}
	
	var labInterchage = Ti.UI.createLabel({
		color : 'white',
		text : 'Interchange Genius',
		left : '23%',
		width : 100,
		height : Ti.UI.SIZE

	});
	ViewMenu.add(labInterchage);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var imgLibray = Ti.UI.createImageView({
		left : '42%',
		image : '/images/iconLibrary.png',
		width: 100,
		height: 100
	});
	
	ViewMenu.add(imgLibray);
	imgLibray.addEventListener('click', function(e) {
		
		if(sliderPosition==6||sliderPosition==8)
		{
			sliderPosition = 3;
			MenuProposalView.animate(slideOutPropsalFull);
			LibraryView.animate(SlideInLibraryNormal, function(){
				selfW.title="Library";
				if(globalVariables.GV.libraryViewFirstTime==true)
				{
					loading._show({
						message:"Updating Library"
					});
					sync.syncLibrary(function(e){
						loading.hide();
						globalVariables.GV.libraryViewFirstTime=false;
						if(!e.success){
							alert(e.msg);
						}
					});
				}
				
			});
		}
		else{
			sliderPosition=3;
			self.animate(slideOutScrollableFull);
			LibraryView.animate(SlideInLibraryNormal, function(){
				selfW.title="Library";
				if(globalVariables.GV.libraryViewFirstTime==true)
				{
					loading._show({
						message:"Updating Library"
					});
					sync.syncLibrary(function(e){
						loading.hide();
						globalVariables.GV.libraryViewFirstTime=false;
						
						if(!e.success){
							alert(e.msg);
						}
					});
				}
			});
			
		}
	});

	var labLibrary = Ti.UI.createLabel({
		color : 'white',
		text : 'Library ',
		left : '54%',
		width : 300,
		height : 200
	});

	ViewMenu.add(labLibrary);

	var imgProposal = Ti.UI.createImageView({
		left : '70%',
		image : '/images/iconProposal.png',
		height: 100,
		width: 100
	});
	ViewMenu.add(imgProposal);
	imgProposal.addEventListener('click', function(e) {
		if (sliderPosition == 5) {
			sliderPosition = 6; // proposals showing
			globalVariables.GV.localFileIds=null;
			LibraryView.animate(SlideOutLibraryFull);
			MenuProposalView.animate(slideInPropsalNormal, function(){
				selfW.title="Proposals";
				if(globalVariables.GV.proposalsViewFirstTime)
				{
					loading._show({
						message:"Downloading Proposals from backend"
					});
					globalVariables.GV.proposalsViewFirstTime=false;
					loading._hide();
					sync.proposalSync(function(g){
                        if(g.done){
                            
                            //do something
                        }
                    });
					// sync.syncWithACS(function(g){
						// if(g.success){
							// loading._hide();
							// if(!g.downloaded)
							// {
								// loading._show({
									// message: "Looking for changes"
								// });
								// sync.syncChanges(function(f){
									// if(f.success){
										// loading._hide();
										// Ti.App.fireEvent("reloadProposals");
									// }
									// else{
										// alert("Error downloading updated proposals from back end. Try again later by pressing the sync button on the bottom right \n"+e.results);
									// }
								// });
							// }
							// else{
								// Ti.App.fireEvent("reloadProposals");
							// }
						// }
						// else{
							// alert("Error downloading new proposals from back-end. Try again by pressing the sync button on the bottom right \n"+ e.results);
							// loading._hide();
						// }
					// });
				}
			});
		} else {
			sliderPosition = 6;
			self.animate(slideOutScrollableFull);
			MenuProposalView.animate(slideInPropsalNormal, function(){
				selfW.title="Proposals";
				if(globalVariables.GV.proposalsViewFirstTime)
				{
					loading._show({
						message:"Downloading Proposals from backend"
					});
					globalVariables.GV.proposalsViewFirstTime=false;
					loading._hide();
					sync.proposalSync(function(g){
					    if(g.done){
					        
					        //do something
					    }
					});
					// sync.syncWithACS(function(g){
						// if(g.success){
							// loading._hide();
							// if(!g.downloaded)  //this is only true when db is empty, so here if it's not empty we're looking for changes to current proposals
							// {
								// loading._show({
									// message: "Looking for changes"
								// });
								// sync.syncChanges(function(f){
									// if(f.success){
										// loading._hide();
										// Ti.App.fireEvent("reloadProposals");
									// }
									// else{
										// alert("Error downloading updated proposals from back end. Try again later by pressing the sync button on the bottom right \n"+f.results);
									// }
								// });
							// }
							// else{
								// Ti.App.fireEvent("reloadProposals");
							// }
						// }
						// else{
							// alert("Error downloading proposals from back-end. Try again by pressing the sync button on the bottom right \n"+ e.results);
							// loading._hide();
						// }
					// });
				}
				
			});
		}

	});
	var labProposal = Ti.UI.createLabel({
		color : 'white',
		text : 'Proposal ',
		left : '82%',
		width : 300,
		height : 200
	});

	ViewMenu.add(labProposal);
	selfW.add(ViewMenu);
	
	var self = Ti.UI.createView({
		backgroundColor : 'transparent',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		//zIndex: 1
	});
	
	selfW.add(self);
	
	var NoteView = true;
	var DollarView = true;
	var InformationView = require('views/InformationView').Information();
	var CurrentScenarioView = require('views/CurrentScenarioView').CurrentScenario();
	var InterchangeAnalysisView = require('views/InterchangeAnalysisView').InterchangeAnalysis();
	var ProposalView = require('views/ProposalView').Proposal();
	var NotesView = require('views/NotesView').NotesView();
	self.add(NotesView);
	
	//NotesView.hide();
	NoteView = false;

	///////

	var DollarPercent = require('views/DollarPercent').DollarPercent(self);
	self.add(DollarPercent);
	//DollarPercent.hide();
	DollarView = false;

	var btnMenu = Ti.UI.createButton({
		title : 'Menu',
		color: "#0082b4",
		tintColor: "#0082b4"
	});

	selfW.rightNavButton = btnMenu;
	btnMenu.addEventListener('click', function(e) {
		if (sliderPosition == 0) {
			sliderPosition = 2;
			self.animate(slideOutScrollAblePar);
			//scrollableView.animate(slideOutScrollAblePar);
		} else if (sliderPosition == 3) {
			sliderPosition = 5;
			LibraryView.animate(slideOutLibraryPar);
		} else if (sliderPosition == 2) {
			self.animate(slideInScrollableNormal, function(e){});
			//scrollableView.animate(slideInScrollableNormal, function(e){});
			sliderPosition = 0;
		} else if (sliderPosition == 5) {
			LibraryView.animate(SlideInLibraryNormal, function(){
				//self.animate(slideOutScrollableFull, function(){
			sliderPosition = 3;
				//});
			});
		} else if (sliderPosition == 6) {
			sliderPosition = 8;
			MenuProposalView.animate(slideOutPropsalPar);
		} else if (sliderPosition == 8) {
			MenuProposalView.animate(slideInPropsalNormal);
			sliderPosition = 6;
		}

	});

	var userBtnView = Ti.UI.createButton({
		title : 'Logout',
		color: "#0082b4",
		tintColor: "#0082b4"
	});

	selfW.leftNavButton = userBtnView;

	userBtnView.addEventListener('click', function(e) {
		var LoginScreen = require('/ui/LoginScreen');
		acs.logoutUser(function(){
			var LoginScreen = require("/ui/LoginScreen");
			globalVariables.GV.loginScreen = new LoginScreen();
			globalVariables.GV.loginScreen.open();
			Ti.App.fireEvent('closeHomeWindow');
			if(globalVariables.GV.navGroup!=null){
				globalVariables.GV.navGroup.close();	
			}
			LoginScreen=null;
			MenuProposalView=null;
			LibraryView=null;
			//globalVariables.GV.navGroup.openWindow(globalVariables.GV.loginScreen);
			
		});
	});

	var scrollableView = Ti.UI.createScrollableView({
		height : 704,
		views : [InformationView, CurrentScenarioView, InterchangeAnalysisView, ProposalView],
		showPagingControl : true,
		pagingControlColor: "transparent",
		width: Ti.UI.SIZE
	});

	self.add(scrollableView);
	//selfW.add(self);
	/////////////////////////////////
	
	selfW.add(LibraryView);
	selfW.add(MenuProposalView);
	//lastView = self;	
	/////////////////////////////////
	var imageiconDollarPercent = Ti.UI.createImageView({
		image : '/images/iconDollarPercent.png',
		bottom : '3%',
		width : '5.8%',
		height : '8.5%',
		left : '0.5%'

	});

	self.add(imageiconDollarPercent);

	imageiconDollarPercent.addEventListener('click', function(e) {

		if (DollarView == false) {
			DollarPercent.show();
			DollarView = true;
		} else {

			DollarPercent.hide();
			DollarView = false;
		}
	});
	//////////////////////
	var imgiconNotes = Ti.UI.createImageView({
		image : '/images/iconNotes.png',
		bottom : '3%',
		width : '5.8%',
		height : '8.5%',
		right : '0.5%'

	});
	self.add(imgiconNotes);

	imgiconNotes.addEventListener('click', function(e) {
		if (NoteView == false) {
			NotesView.show();
			NoteView = true;

		} else {

			NotesView.hide();
			NoteView = false;
		}
	});
	
	Ti.App.addEventListener('propTableClicked', function(e){
		animateIaView(function(){
			//FIRE EVENT TO LOAD DATA INTO VIEWS
			Ti.App.fireEvent('fillBusinessInfo',{initialize:false});
			Ti.App.fireEvent('fillCSInfo',{initialize:false});
			Ti.App.fireEvent('fillIaInfo',{initialize:false});
			Ti.App.fireEvent('fillSavingsInfo',{initialize:false});
			Ti.App.fireEvent('fillProposedPricing',{initialize:false});
			Ti.App.fireEvent('fillNotes',{initialize:false});
		});
		
	});
	
	return selfW;
};

module.exports = HomeScreen;
