Ti.UI.backgroundColor = '#2d2d2d';
var acs = require('lib/acs');
var globalVariables = require('globalVariables');
var LoginScreen = require("/ui/LoginScreen");
var AppInit = require('initialize');
var HomeScreen = require("/ui/HomeScreen");


AppInit.init(function(e){
	Ti.API.info("SESSION ID IS:  " +globalVariables.GV.sessionId);
	
	if(e.loggedIn)
	{	
		globalVariables.GV.homeScreen = new HomeScreen({});
		globalVariables.GV.navGroup = Titanium.UI.iOS.createNavigationWindow({
			window : globalVariables.GV.homeScreen
		});
		globalVariables.GV.navGroup.open();
	}
	else 
	{
		
		globalVariables.GV.loginScreen = new LoginScreen();
		globalVariables.GV.loginScreen.open();
		Ti.App.fireEvent("closeHomeWindow");
	}
});
