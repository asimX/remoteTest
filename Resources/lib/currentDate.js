exports.GetDate = function() {
	var currentTime = new Date();
	//Getting today date
	var month = currentTime.getMonth() + 1;
	//getting the current month
	var day = currentTime.getDate();
	//getting the current day
	var year = currentTime.getFullYear();
	//getting year
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var currentTime = new Date();
	var daynumber = currentTime.getDay();
	var dayName = days[daynumber];
	var time = currentTime.getTime();
	return {date: dayName + "," + month + "/" + day + "/" + year, time: time};
	//returning the full date
}; 