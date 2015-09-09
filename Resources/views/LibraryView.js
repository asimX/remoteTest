var GetPdfNumbers = require('lib/GetPdfNumbers');
var sync = require('lib/sync');
var db = require('db/db');
var loading = require('lib/loading').loading();

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
	
	self.add(loading);
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
			
			if(!Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+e.rowData.localPath).exists()){
				//h09q8h4nwepasd ; k,;;;;;;; ,;u1039n 
				loading._show({
					message: "Downloading.."
				});
				var utility = require("lib/utilities");
				utility.DownloadOneFile(e.rowData.url, Ti.Filesystem.applicationDataDirectory+e.rowData.localPath, function(f){
					loading._hide();
					if(f.status==200){
						docViewer = Ti.UI.iOS.createDocumentViewer({
							url: Ti.Filesystem.applicationDataDirectory+e.rowData.localPath
						});
						docViewer.show({
							animated : true
						});
					}
					else{
						alert("Error downloading file try again later. \n"+"ERROR CODE: \n"+f.status);
					}
				});
					//downloadOneFile(downloadQueue[queueIndex].url, downloadQueue[queueIndex].filepath, processQueue);
			}
			else{
				docViewer = Ti.UI.iOS.createDocumentViewer({
					url: Ti.Filesystem.applicationDataDirectory+e.rowData.localPath
				});
				docViewer.show({
					animated : true
				});
			}
			
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
	
	var menuLastSelectedFile = -1;
	
	menuTableView.addEventListener('click', function(e) {
		
        if(menuLastSelectedFile>=0 && menuLastSelectedFile!=e.index){
			menuTableView.data[0].rows[menuLastSelectedFile].children[0].backgroundColor="#fff";
	        menuTableView.data[0].rows[menuLastSelectedFile].children[0].color="#000";
       	}
       	
		
		loadData(e.index, false);
		e.row.children[0].backgroundColor = "#0082b4";
		e.rowData.backgroundColor = "#0082b4";
        e.row.children[0].color = "white";
        menuLastSelectedFile=e.index;
		
	});
			
	tvContainer.add(menuTableView);
	
	var filesArray = [];
	
	function loadData(folderNum, init){
		
		
		//Initialize vars
		foldersTableData = [];
		data = []; 
		detailsTableData = [];
		
		detailsTV.setData(detailsTableData);
		
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
				localPath: filesArr[i].localPath,
				url: filesArr[i].url
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
		
		if(init==true){
			
			menuTableView.setData(foldersTableData);
			
			for (var i = 0; i < data.length; i++) {
				var row = Ti.UI.createTableViewRow({
					className : 'forumEvent', 
					//selectedBackgroundColor : '#0082b4',
					//backgroundSelectedColor: '#0082b4',
					//backgroundFocusedColor: '#0082b4',
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
					width : Ti.UI.FILL,
					height: Ti.UI.FILL,
					//height : '30dp',
				});
				row.add(labelPlanName);
			    foldersTableData.push(row);
			}
			
			menuTableView.setData(foldersTableData);
			
			if(foldersTableData.length>0){
				menuTableView.data[0].rows[0].children[0].backgroundColor="#0082b4";
		    	menuTableView.data[0].rows[0].children[0].color="#fff";
		    	menuLastSelectedFile=0;
			}
			
		}
		// else{
			// menuTableView.data[0].rows[folderNum].children[0].backgroundColor="#0082b4";
		    // menuTableView.data[0].rows[folderNum].children[0].color="#fff";
		// }
		//menuTableView.selectRow(0);
	}
	
		
	loadData(0, true);
	
	Ti.App.addEventListener('reloadLibrary', function(e){
		loadData(0, true);
	});
	
	syncBtn.addEventListener("click", function(){
		var loading = require('lib/loading').loading();
		self.add(loading);
		loading._show({
			message : 'Syncing Library'
		});
		sync.syncLibrary(function(e){
			loading.hide();
			loadData(0, true);
			if(!e.success){
				alert(e.msg);
			}
		});
	});
	
	return self;

};
