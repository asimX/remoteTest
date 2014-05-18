function get_remote_file(filename, url, fn_end, fn_progress) {

	Ti.API.info("[filename]" + filename);
	Ti.API.info("[url]" + url);

	var file_obj = {
		file : filename,
		url : url,
		path : null
	};
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
	if (!file.exists()) {
		file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
		//fn_end(file_obj);
		Ti.API.info("arquivo existe");
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
		f.write(this.responseData);
		var fcontent = f.read();
		Ti.API.info('[CONTENT] = ' + fcontent.text);
	} else {
		if (Titanium.Network.online) {
			var c = Titanium.Network.createHTTPClient();
			c.setTimeout(10000);
			c.onload = function() {
				if (c.status == 200) {

					Ti.API.info("Ok");

					var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
					f.write(this.responseData);
					var fcontent = f.read();
					Ti.API.info('[CONTENT] = ' + fcontent.text);
					file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
				} else {
					file_obj.error = 'file not found';
					// to set some errors codes
					Ti.API.info("error");
				}
				// fn_end(file_obj);
			};
			c.ondatastream = function(e) {
				if (fn_progress)
					fn_progress(e.progress);
			};
			c.error = function(e) {
				file_obj.error = e.error;
				// fn_end(file_obj);
			};
			c.open('GET', url);
			c.send();
		} else {
			file_obj.error = 'no internet';
			//fn_end(file_obj);
		}
	}
};