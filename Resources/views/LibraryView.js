var GetPdfNumbers = require('lib/GetPdfNumbers');
var sync = require('lib/sync');
var db = require('db/db');

exports.LibraryView = function() {
	var fontStyle = 'gillsanslight.ttf';
	var self = Ti.UI.createView({
		backgroundColor : 'transparent',
		width : Ti.UI.FILL, 
		height : 704,
		top: 704,
		bottom: -704
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

//=============================================================================	
	
	var foldersTableData = null;
	var data = null; 
	var detailsTableData = null;
	var filesArr = null;
	
	// CREATE DETAIL VIEW	
	var detailsView = Titanium.UI.createView({
		width : '75%',
		height : Ti.UI.FILL,
		right : 0

	});
	
	var detailsTV = Ti.UI.createTableView({
		backgroundColor : 'white',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		separatorInsets:{
			left:0
		}
	});
	
	detailsView.add(detailsTV);
	
	detailsTV.addEventListener('click',function(e){
			docViewer=null;
			docViewer = Ti.UI.iOS.createDocumentViewer({
				url: e.rowData.localPath
			});
			docViewer.show({
				animated : true
			});
	});

	tvContainer.add(detailsView);
	
	var checkAnimate = 0;
	var menuTableView = Ti.UI.createTableView({
		backgroundColor : 'white',
		//scrollable: false,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		width : '25%',
		left : '0%',
		//data : foldersTableData,
		//headerView: titleLbl,
		borderColor: "#a9a9a9",
		borderWidth: 1
	});

	menuTableView.addEventListener('click', function(e) {
		loadData(e.index);
	});
			
	tvContainer.add(menuTableView);
	
	function loadData(folderNum){
		
		
		//Initialize vars
		foldersTableData = [];
		data = []; 
		detailsTableData = [];
		
		db.getLibraryFolders(function(e){
			data = e.folders;
		});

		var filesArr = [];
		
		if(data.length>0)
		{
				filesArr = db.getFolderFiles(data[folderNum]);
			
		}
		
	
		for ( i = 0; i < filesArr.length; i++) {
	
			var viewPlaceHolder = Ti.UI.createTableViewRow({
				
				height : '90dp',
				localPath: filesArr[i].localPath
			});
			//viewMarketing.add(viewPlaceHolder[i]);
			var imgView = Ti.UI.createImageView({
				
				right : '30dp',
				width : '60dp',
				height : '70dp',
				myid : i,
				image : '/images/iconPdf.png'
			});
			viewPlaceHolder.add(imgView);
	
			var labName = Ti.UI.createLabel({
				text : filesArr[i].name,
				color : 'black',
				font : {
					fontSize : '20dp',
					fontFamily : 'GillSans-Light'
				},
				left : '90dp',
				
				width : Ti.UI.SIZE,
				height : Ti.UI.FILL
			});
		
			viewPlaceHolder.add(labName);
			detailsTableData.push(viewPlaceHolder);
		}
		
		detailsTV.setData(detailsTableData);
		
	
		for (var i = 0; i < data.length; i++) {
			var row = Ti.UI.createTableViewRow({
				className : 'forumEvent', 
				selectedBackgroundColor : 'white',
				rowIndex : i, 
				height : 75
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
		    foldersTableData.push(row);
		}
		
		menuTableView.setData(foldersTableData);
	}
	
		
	loadData(0);
	
	Ti.App.addEventListener('reloadLibrary', function(e){
		loadData(0);
	});
	
	syncBtn.addEventListener("click", function(){
		var loading = require('lib/loading').loading();
		self.add(loading);
		loading._show({
			message : 'Syncing Library'
		});
		sync.syncLibrary(function(e){
			loading.hide();
			if(!e.success){
				alert(e.msg);
			}
		});
	});
	
	return self;

};
