// Update function so time is accurate
function updateMoment(){
	var now = moment();
	$("#time").html(now.format('h:mm:ss a'));
	$("#date").html(now.format('dddd' + ", " + 'MMM Do'));
}

function updateWeather(){
	var apiKey = 'bd0e23dbeb0c1b833c00b4b45d4fa188';
	$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=Tucson&mode=JSON&units=imperial&cnt=4&APPID=' + apiKey, function(weatherForecast){
	// For the description, the access path differs from the given path on their site. You must add
	// an index to the 'weather' element, because it's stored as a list for some reason.
		$("#weather").html("Today ");
		$("#weather").append(Math.round(weatherForecast.list[0].temp.min), " ", Math.round(weatherForecast.list[0].temp.max), " ", weatherForecast.list[0].weather[0].description, '<br>');
		$("#weather").append(moment().add(1, 'd').format('dddd'), " ");
		$("#weather").append(Math.round(weatherForecast.list[1].temp.min), " ", Math.round(weatherForecast.list[1].temp.max), " ", weatherForecast.list[1].weather[0].description,  '<br>');
		$("#weather").append(moment().add(2, 'd').format('dddd'), " ");
		$("#weather").append(Math.round(weatherForecast.list[2].temp.min), " ", Math.round(weatherForecast.list[2].temp.max), " ",weatherForecast.list[2].weather[0].description,  '<br>');
		$("#weather").append(moment().add(3, 'd').format('dddd'), " ");
		$("#weather").append(Math.round(weatherForecast.list[3].temp.min), " ", Math.round(weatherForecast.list[3].temp.max), " ",weatherForecast.list[3].weather[0].description, '<br>');
	});
}

var clientId = '840122434097-gb87cdf08fupi69b262066jl68f9q1a4.apps.googleusercontent.com';
var apiKey = 'AIzaSyDgUKhpF1UNxiTbGU-bS1FRPwyksg5M3I0';
var scopes = 'https://www.googleapis.com/auth/calendar';


function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);

}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

function makeApiCall(){
	gapi.client.load('calendar', 'v3').then(function(){
		var minTime = moment().format();
		var request = gapi.client.calendar.events.list({
			'calendarId':'davidcai2012@gmail.com',
			'singleEvents': true,
			'orderBy': 'startTime',
			'timeMin': minTime,
			'maxResults': 10});
		request.execute(function(resp){
			for (i = 0; i <= resp.items.length ;i++){
				var item = resp.items[i];
				var name = item.summary;
				var start = item.start.dateTime;
				$("#calendar").append(name, start, '<br>');
			};
		});
		alert("woo");
	});
}

$(document).ready(function(){
	updateMoment();
	setInterval(updateMoment, 1000);

	updateWeather();
	setInterval(updateWeather, 600000);



	handleClientLoad();





})


