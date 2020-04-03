let $noti = document.querySelector('.notification');
let $weatherIcon = document.getElementById('icon');
let $weatherVal = document.querySelector('.temperature-value p');
let $weatherDes = document.querySelector('.temperature-description p');
let $location = document.querySelector('.location p');


//weather app api key
const APIkey = 'c2ebdcff57daa0e3e82260556b09ad2a';
const APIkey1 = '434a0fd1d91b494f9de758b50ac5b740';
var dayForcastUrl = '';


const weather = { 
    icon : 'unknown.jpg',
    val: '-',
    type: 'C',
    location: {
        city: '-',
        country: '-'
    },
    description: '-',
    geolocation: {
        long: 0.0,
        lat: 0.0
    }
}

var userLocationUrl = '';
//convert faraday to celcius 
const convertFToC = (F) => {
    return Math.round(F-273);
}

// ask for user location
const setGeoPos = (pos) => {
    weather.geolocation.long = pos.coords.longitude;
    weather.geolocation.lat = pos.coords.latitude;
    userLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${weather.geolocation.lat}&lon=${weather.geolocation.long}&appid=${APIkey}`;
    dayForcastUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${weather.geolocation.lat}&lon=${weather.geolocation.long}&key=${APIkey1}&hours=8`;
    var data = {
        urlDay: dayForcastUrl,
        urlCurrent: userLocationUrl
    }
    $.ajax({
        type: "POST",
        url: '/',
        data: data,
        success: function(){
            console.log("success");
        },
        dataType: "json"
      });
    getWeather(userLocationUrl);
}

const denied = () => {
    $noti.style.display = "block";
    $noti.innerHTML = "User's location denied";
}


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setGeoPos, denied);
    } else {
        $noti.style.display = "block";
        $noti.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//api url 
let url = "";

//display weather 
const displayWeather = () => {
    $weatherDes.innerHTML = `<p> ${weather.description} </p>`;

    $weatherIcon.src = `./src/icons/${weather.icon}.png`;

    $location.innerHTML = `<p>${weather.location.city}, ${weather.location.country}.</p>`;
    $weatherVal.innerHTML = `<p>${weather.val} °<span>C</span></p>`;
}

//send api req
const getWeather = (url) =>{
    $noti.innerHTML = "";
    $.getJSON(url, function(data) {
        weather.description = data.weather[0].description;
        weather.icon = data.weather[0].icon;
        weather.val = convertFToC(data.main.temp);
        weather.location = {
            country: data.sys.country,
            city: data.name
        }
        displayWeather();
    }).error(function errHandler(){
        $noti.style.display = "block";
        $noti.innerHTML = "Weather data could not loaded!!!";
    })
}

getLocation();

//user input form
const getWeatherToNation = () => {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + $('#city').val() +','+ $('#country').val() +'&appid=' + APIkey;
    getWeather(url);
    return false;
}
