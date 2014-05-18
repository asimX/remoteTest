exports.GetPdfNumbers = function(Folder) {

	var folder = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), 'Pdf/' + Folder);
	var dir = folder.getDirectoryListing();
	var intFile = 0, intFiles = dir.length;
	for ( intFile = 0; intFile < intFiles; intFile = intFile + 1) {
		Ti.API.info(dir[intFile]);
	}
	return dir;
};
