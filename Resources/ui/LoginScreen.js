var acs = require('lib/acs');
var alert = require('lib/alert');
var db= require("db/db");
var sync = require("lib/sync");

function LoginScreen() {
	var loading = require('lib/loading').loading();
	
	var self = Ti.UI.createWindow({
		backgroundImage : 'images/perforatedMetalBlack.png'
	});
	////////////////////Priority
	var imagePriority = Ti.UI.createImageView({
		image : '/images/iconPriorityWhite.png',
		top : '2%',
		left : '2%',
		height : '12%',
		width : '37%'
	});
	self.add(imagePriority);
	//////////////////////////////////////////////////////////
	///////////label Interchange Genius
	var labInterchangeGenius = Ti.UI.createLabel({
		text : 'Interchange Genius',
		color : 'white',
		font : {
			fontSize : 35,
			fontWeight : 'bold'
		},
		top : "225dp",//'17%',
		width : Ti.UI.SIZE
	});

	self.add(labInterchangeGenius);

	var viewLogo = Ti.UI.createView({
		backgroundImage : 'images/companyLogo.png',
		left : '0dp',
		top : 0,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});
	var tfEmail = Ti.UI.createTextField({
		hintText : 'Email',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		textAlign : 'left',
		top : '300dp',
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		width : '30%',
		height : '40dp'
	});
	tfEmail.addEventListener('return', function(e) {

		tfPassword.focus();

	});
	self.add(tfEmail);
	var tfPassword = Ti.UI.createTextField({
		hintText : 'Password',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		textAlign : 'left',
		returnKeyType : Ti.UI.RETURNKEY_GO,
		top : '350dp',
		width : '30%',
		height : '40dp',
		passwordMask : true
	});
	tfPassword.addEventListener('return', function(e) {

		btnLogin.fireEvent('click');

	});
	self.add(tfPassword);

	var btnLogin = Titanium.UI.createButton({
		title : 'Login',
		top : '425dp',
		width : "30%",
		height : "40dp",
		font: {
			fontSize: "30"
		}
	});

	self.add(btnLogin);
	self.add(loading);

	btnLogin.addEventListener('click', function(e) {
		var Email = tfEmail.value;
		var Password = tfPassword.value;
		tfEmail.blur();
		tfPassword.blur();
		tfEmail.value = "";
		tfPassword.value = '';
		loading._show({
			message : 'Logging In'
		});
		
		acs.loginUser(Email, Password, function(e){
			if(e.success)
			{
				loading._hide();
				loading._show({
					fullScreen: true,
					message: "Loading Home Screen"
				});
				loadHome(function(){
					Ti.App.fireEvent('closeLoginWindow');
					loading._hide();
					loading=null;
					sync.syncDialog();
				});
			}
			else
			{
				loading._hide();
				alert.alert('Invalid', e.message);
			}
		});//loading);
		
		function loadHome(callback){
			var HomeScreen = require('ui/HomeScreen');
			globalVariables.GV.homeScreen = new HomeScreen({
				//indicator: loading
			});
			globalVariables.GV.navGroup = Titanium.UI.iOS.createNavigationWindow({
				window : globalVariables.GV.homeScreen
			});
			globalVariables.GV.navGroup.open();			
			//Download latest referral partner list
			acs.getPartners(function(f){
				if(f.success){
					db.FillReferralPartners(f.results);
				}
				acs.getRates(function(g){
					if(g.success){
						db.FillBusinessType(g.results);
						globalVariables.GV.SetRates(g.results);
					}
					callback();
				});
			});
			
		}

	});
	
	return self;

}

module.exports = LoginScreen;
