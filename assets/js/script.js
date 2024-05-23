const searchbtn = document.querySelector("#search-btn");
const weatherContainer = document.querySelector(".main");
const inputCity = document.querySelector("#city");
const search = document.querySelector("search");
const myAPIKey = "c3dce583129645e5fbfd8906c1347162";
// const city = inputCity.value;

const weatherData = [];
// let  searchHistory;

searchbtn.addEventListener("click", function () {
  let city = inputCity.value;

  // searchHistory.push(city);
  // localStorage.setItem("city",JSON.stringify(searchHistory))
  // console.log(city);

  const urlCordinate = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${myAPIKey}&units=imperial`;
  // const url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}&units=imperial`;

  let cord = {};

  fetch(urlCordinate)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("I am here in cordinate");
      console.log(data);

      let lat = data[0].lat;
      let lon = data[0].lon;
      console.log(lon);
      console.log(lat);
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myAPIKey}&units=imperial`;

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (inputCity.value == "") {
            alert("Enter the city name");
          }

          console.log("I am here at Data");
          console.log(data);

          let weather = {
            name: data.city.name,
            // date: dayjs().format("MM/DD/YYYY"),
            date: data.list[0].dt_txt,
            icon: data.list[0].weather[0].icon,
            temp: data.list[0].main.temp,
            wind: data.list[0].wind.speed,
            humidity: data.list[0].main.humidity,
            // localStorage.setItem("weather", JSON.stringify(weatherData));
          };
          weatherData.push(weather);
          let i = 39;
          while (i > 0) {
            weather = {
              // JSON.stringify(json.weather[0].icon);
              // date: dayjs().format("MM/DD/YYYY"),
              date: data.list[i].dt_txt,
              icon: data.list[i].weather[0].icon,
              temp: data.list[i].main.temp,
              wind: data.list[i].wind.speed,
              humidity: data.list[i].main.humidity,
              // localStorage.setItem("weather", JSON.stringify(weatherData));
            };
            weatherData.push(weather);
            i = i - 8;
          }

          console.log("I am here after finishing the array");
          console.log(weatherData);

          const mainDiv = document.createElement("div");
          mainDiv.setAttribute("class", "col-9 justify-content-center");
          //****************** */
          const secondDiv = document.createElement("div");
          secondDiv.setAttribute(
            "class",
            "row h-25 bg-danger shadow p-3 rounded m-3"
          );
          mainDiv.append(secondDiv);

          let cityName = document.createElement("h3");
          cityName.textContent = `${weatherData[0].name} ${weatherData[0].date}`;
          secondDiv.append(cityName);

          let icon = document.createElement("img");
          icon.setAttribute('src',`https://openweathermap.org/img/w/${weatherData[0].icon}.png`)
          icon.setAttribute('id', 'todayIcon');
          icon.textContent = `Icon: ${weatherData[0].icon}`;
          secondDiv.append(icon);

          let temp = document.createElement("p");
          temp.textContent = `Temp: ${weatherData[0].temp} F`;
          secondDiv.append(temp);

          let wind = document.createElement("p");
          wind.textContent = `Wind: ${weatherData[0].wind} MPH`;
          secondDiv.append(wind);

          let humidity = document.createElement("p");
          humidity.textContent = `Humidity: ${weatherData[0].humidity} %`;
          secondDiv.append(humidity);

          
          // appending mainDiv to weatherContainer
          weatherContainer.append(mainDiv);

          // 5 day implementation

          const fiveDaysH3 = document.createElement("h3");
          fiveDaysH3.setAttribute("class", "m-4");
          fiveDaysH3.textContent = `5-Days Forecase:`;
          mainDiv.append(fiveDaysH3);

          const fiveDaysContainer = document.createElement("div");
          fiveDaysContainer.setAttribute(
            "class",
            "row h-25  gap-4 text-white justify-content-center"
          );
          mainDiv.append(fiveDaysContainer);

          for (let i = 5; i > 0; i--) {
            let dailyDiv = document.createElement("div");
            dailyDiv.setAttribute("class", "col-2 p-3 h-75 bg-dark");

            cityName = document.createElement("h5");
            cityName.textContent = `${weatherData[i].date}`;
            dailyDiv.append(cityName);

            temp = document.createElement("p");
            temp.textContent = `Temp: ${weatherData[i].temp} F`;
            dailyDiv.append(temp);

            wind = document.createElement("p");
            wind.textContent = `Wind: ${weatherData[i].wind} MPH`;
            dailyDiv.append(wind);

            humidity = document.createElement("p");
            humidity.textContent = `Humidity: ${weatherData[i].humidity} %`;
            dailyDiv.append(humidity);
         icon = document.createElement("img");
          icon.setAttribute('src',`https://openweathermap.org/img/w/${weatherData[i].icon}.png`)
          icon.textContent = `Icon: ${weatherData[0].icon}`;
          dailyDiv.append(icon);

            fiveDaysContainer.append(dailyDiv);
          }

          // storeData(){

          // }
        });
    });
});
