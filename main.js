const backgroundElement = document.getElementById("background");
const timer = ms => new Promise(res => setTimeout(res, ms));

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showWeather);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}

function showWeather(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + " Longitude: " + longitude)

    var apiKey = "20baba615d4fcaca227a97f284bb0c4f"; // Substitua pelo seu próprio API Key do OpenWeatherMap v2.5

    var localizacaoElement = document.getElementById("localizacao");
    var temperaturaElement = document.getElementById("temperatura");
    var umidadeElement = document.getElementById("umidade");
    var ceuElement = document.getElementById("ceu");
    
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
          //convertendo Kelvin (padrão da API) para celsius
          var temperatura = parseInt(parseFloat(data.main.temp) - 273.15);
          console.log(temperatura);
          console.log(typeof(temperatura));
          var description = data.weather[0].description;

          localizacaoElement.textContent = String(data.name);
          temperaturaElement.textContent = String(temperatura) + "°C";
          umidadeElement.textContent = String(data.main.humidity) + "%";
          ceuElement.textContent = description;
          ajustarCss();
      })
      .catch(error => {
        console.log("Ocorreu um erro ao obter os dados do clima da API:", error);
      });
}

function ajustarCss(){
  var today = new Date();
  var time = parseInt(today.getHours());
  if(time<=6){
    fadeBackground('figuras-background/madrugada.jpg');
  }else if(time<=12){
    fadeBackground('figuras-background/manha-tarde.jpg');
  }else if(time<=18){
    fadeBackground('figuras-background/manha-tarde.jpg');
  }else{
    fadeBackground('figuras-background/noite.jpg');
  }
}

async function fadeBackground(imgUrl){
  backgroundElement.style.backgroundImage = "url('" + imgUrl + "')";
  let j;
  for(let i=0; i<100; i++){
    j = i/100;
    backgroundElement.style.opacity = j;
    console.log(j);
    await timer(10);
  }
}
