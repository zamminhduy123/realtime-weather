// day forcast onload
let $noti = document.querySelector('.notification');
let $weatherIcon = document.getElementById('icon');
let $weatherVal = document.querySelector('.temperature-value p');
let $weatherDes = document.querySelector('.temperature-description p');
let $location = document.querySelector('.location p');

var dayForcastUrl = '';

const handleUrl = (res) => {
    $.getJSON(res.urlDay, function(res){
        var weatherList = res.data;
        var newForcast = "";
        for (var i =0;i<weatherList.length;i++){
            
            var icon = weatherList[i].weather.icon;
            icon = icon.substring(1);
           
            newForcast = `<div class = "weather-container"><div class="weather-icon">
            <img id ="icon" src="./src/icons/${icon}.png" alt=""/>
        </div>
        <div class="temperature-value">
            <p>${weatherList[i].temp} °<span>C</span></p>
        </div>
        <div class="temperature-description">
            <p> ${weatherList[i].weather.description} </p>
        </div>
        <div>
            <p> ${weatherList[i].timestamp_local} </p>
        </div></div>`;
    
        $('.container').append(newForcast);
        }
    }).error(function errHandler(){
        $noti.style.display = "block";
        $noti.innerHTML = "Weather data could not loaded!!!";
    })
}


function bodyOnLoad() {
        
    var data;
    $.ajax({
        type: "POST",
        url: '/getUrl',
        data: data,
        success: handleUrl,
        dataType: "json"
    });
}