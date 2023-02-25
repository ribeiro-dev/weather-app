var x = document.getElementById("content");
const temperatureElement = document.querySelector('#temperature')
const feelsLikeElement = document.querySelector('#feels-like')

const key = config.API_KEY

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation não é suportado neste browser.";
  }
}

function showPosition(position) {
  const coords = position.coords
  // x.innerHTML = "Latitude: " + position.coords.latitude +
  // "<br>Longitude: " + position.coords.longitude;

  console.log(coords)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&lang=pt_br&units=metric&appid=${key}`

  fetch(url) // faz um get na API
    .then(res => {
      return res.json() // converte a response em json
    })
    .then(res => {
      // x.innerHTML += res.weather[0].description
      console.log(res) 
      console.log(res.main)
      let temperature = res.main.temp
      let feelsLike = res.main.feels_like
      // console.log(typeof(temperature))
      
      temperatureElement.textContent = parseInt(temperature) + "º"
      feelsLikeElement.textContent = `Sensação térmica de ${parseInt(feelsLike)}º`
    })
}
getLocation()