function getweather(){
    const key = '12649df7ba78a474a31fb7144a849823';
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }
  const currenturl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
  fetch(currenturl)
    .then(response => response.json())
    .then(data => displayweatherfunction(data))
    .catch(error => {
      console.log(error);
      alert("Please enter a valid city");
    });
  fetch(forecasturl)
    .then(response => response.json())
    .then(data => displayforecastfunction(data.list))
    .catch(error => {
      console.log(error);
      alert("OOPS! Something went wrong. Please try again");
    });
}

function displayweatherfunction(data){
  const temp = document.getElementById("temp");
  const weatherinfo= document.getElementById("weatherinfo");
  const hourlyforecast = document.getElementById("hourlyforecast");

  temp.innerHTML = '';
  weatherinfo.innerHTML = '';
  hourlyforecast.innerHTML = '';
  if(data.cod === '404'){
    weatherinfo.innerHTML = `<p>${data.message}</p>`;
  }
  else{
    const cityname = data.name;
    const temperature = Math.round(data.main.temp - 272.15);
    const typeofweather = data.weather[0].description;
    const tyepofWeather = typeofweather[0].toUpperCase() + typeofweather.slice(1);
    temp.innerHTML = `<p>${temperature}</p>`;
    weatherinfo.innerHTML = `<p>${cityname}</p><p>${tyepofWeather}</p>`;
  }
}

function displayforecastfunction(hourlydata) {
  const hourlyforecast = document.getElementById('hourlyforecast');

  const next24hours = hourlydata.slice(0, 8);

  next24hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); 
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15); 
      const iconcode = item.weather[0].icon;
      const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;
      
      const hourlyItemHtml = `
          <div class="hourlyitem">
              <span>${hour}:00</span>
              <img src="${iconurl}" alt="Hourly Weather Icon">
              <span>${temperature}°C</span>
          </div>
      `;
      hourlyforecast.innerHTML += hourlyItemHtml;
  });
}
