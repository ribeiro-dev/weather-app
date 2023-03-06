var x = document.getElementById("content");
const iconElement = document.querySelector('#icon')
const temperatureElement = document.querySelector('#temperature')
const feelsLikeElement = document.querySelector('#feels-like')

let apiData


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      
      let data = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }

      fetch("/location", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(json => {
        apiData = json
        
        let icon = json.weather[0].icon
        let temperature = json.main.temp
        let feelsLike = json.main.feels_like

        iconElement.src = `http://openweathermap.org/img/wn/${icon}@4x.png`
        temperatureElement.innerHTML = `${parseInt(temperature)}<sup>\u00B0</sup>`
        feelsLikeElement.innerHTML = `Sensação térmica: ${parseInt(feelsLike)}<sup>\u00B0</sup>`
      })
    });
  } else {
    alert("Geolocation não suportado pelo browser! :(")
  }
}

function showPosition(position) {
  const coords = position.coords

  console.log(coords)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&lang=pt_br&units=metric&appid=${key}`

  fetch(url) // faz um get na API
    .then(res => {
      return res.json() // converte a response em json
    })
    .then(res => {
      console.log(res) 
      console.log(res.main)
      
    })
}
getLocation()