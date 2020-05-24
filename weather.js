const weather = document.querySelector(".js-weather");

const API_KEY = "37b8b26f6aaeba1a4f6b631143e20e75";
const COORDS='coords';

function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
.then(function(response){
    return response.json()    
})
.then(function(json){
    const tempurature = json.main.temp;
    const place = json.name;
    weather.innerText = `${tempurature} @ ${place}`;
});

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude); 
}

// 객체의 변수 잉름과, 객체의 key 이름을 같게 저장할 때는
// 이름만 작성해준다. 


function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    //로케이션 확인하는 함수 
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();

}

init();