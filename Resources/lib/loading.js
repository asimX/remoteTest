function isAndroid() {
	return Ti.Platform.osname == 'android';
}

exports.loading = function() {
	var container;

	if (isAndroid()) {
		container = Ti.UI.createActivityIndicator({
			color : '#fff'
		});
	} else {
		container = Ti.UI.createView({
			width : "350dp",
			height : '250dp',
			borderRadius : '10dp',
			visible : false,
			zIndex: 100
		});

		container.add(Ti.UI.createView({
			width : Ti.UI.FILL,//'100%',
			height : '100%',
			top : 0,
			left : 0,
			backgroundColor : '#000',
			opacity : 0.5,
			zIndex : 0
		}));

		var ai = Ti.UI.createActivityIndicator({
			style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
			color : '#fff',
			//zIndex : 100
		});
		container.add(ai);
		ai.show();
		ai = null;
	}

	container._isShowing = false;

	container._show = function(params) {
		if (this._isShowing) {
			return;
		}

		if (isAndroid()) {
			this.message = params.message;
		} else {
			this.children[1].message = params.message;
		}
		if(params.fullScreen){
			container.width=Ti.UI.FILL;
			container.height = Ti.UI.FILL;
			container.children[0].opacity=1;
		}
		if (params.timeout) {
			this._myTimeout = setTimeout(function() {
				exports.manager.get('ai')._hide();

				if (params.timeoutMessage) {
					var alertDialog = Ti.UI.createAlertDialog({
						title : 'Update Timeout',
						message : params.timeoutMessage,
						buttonNames : ['OK']
					});
					alertDialog.show();
				}
			}, params.timeout);
		}

		this._isShowing = true;
		this.show();
	};

	container._hide = function() {
		if (this._myTimeout !== undefined) {
			clearTimeout(this._myTimeout);
			delete this._myTimeout;
		}
		if (this._isShowing) {
			this._isShowing = false;
			this.hide();
		}
	};

	return container;
};
