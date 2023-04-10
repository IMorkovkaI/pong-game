let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");



let getWeather = () => {
  let cityValue = cityRef.value;
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
        </div>
        `;
        const temperature = data.temp;
        changeTemperature(data.main.temp);
      })

      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
      
      
    
    }
    function changeTemperature(temperature) {
      if (temperature < 0.0) {
        document.body.style.background = "linear-gradient(135deg, var(--cold), var(--cold-2))";
     } else if (10.0 > temperature && temperature > 0.0) {
      document.body.style.background = "linear-gradient(135deg, var(--blue-1), var(--blue-2))";
     } else if (10.0 <= temperature && temperature <= 20.0) {
      document.body.style.background = "linear-gradient(135deg, var(--warm), var(--warm-2))";
     } else if (temperature > 20.0) {
       document.body.style.background = "linear-gradient(135deg, var(--hot), var(--hot-2))";
     }
     
    }
    
};
searchBtn.addEventListener("click",getWeather);
window.addEventListener("load", getWeather);
