const searchbtn = document.querySelector("#search-btn");
const weatherContainer = document.querySelector(".main");
const inputCity = document.querySelector("#city");

const myAPIKey = "c3dce583129645e5fbfd8906c1347162";
// const city = inputCity.value;

const weatherData = [];

searchbtn.addEventListener("click", function () {
  let city = inputCity.value;
  console.log(city);

  const urlCordinate = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${myAPIKey}&units=imperial`;
//   const url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}&units=imperial`;

  let cord = {};

  fetch(urlCordinate)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("I am here in cordinate");
      console.log(data);
      cord = {
        lat: data[0].lat,
        lon: data[0].lon,
      };
      console.log(cord.lat);
  

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${cord.lat}&lon=${cord.lon}&appid=${myAPIKey}&units=imperial`;

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

      const weather = {
        name: data.name,
        date: dayjs().format("MM/DD/YYYY"),
        // icon: data.weather[0].icon,
        temp: data.main.temp,
        wind: data.wind.speed,
        humidity: data.main.humidity,
      };

      const mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "col-9 justify-content-center");
      //****************** */
      const secondDiv = document.createElement("div");
      secondDiv.setAttribute(
        "class",
        "row h-25 bg-white border border-dark m-3"
      );
      mainDiv.append(secondDiv);

      let cityName = document.createElement("h3");
      cityName.textContent = `${weather.name} ${weather.date}`;
      secondDiv.append(cityName);

      let temp = document.createElement("p");
      temp.textContent = `Temp: ${weather.temp} F`;
      secondDiv.append(temp);

      let wind = document.createElement("p");
      wind.textContent = `Wind: ${weather.wind} MPH`;
      secondDiv.append(wind);

      let humidity = document.createElement("p");
      humidity.textContent = `Humidity: ${weather.humidity} %`;
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

      for (let i = 0; i < 5; i++) {
        let dailyDiv = document.createElement("div");
        dailyDiv.setAttribute("class", "col-2 p-3 bg-dark");

        cityName = document.createElement("h5");
        cityName.textContent = `${weather.date}`;
        dailyDiv.append(cityName);

        temp = document.createElement("p");
        temp.textContent = `Temp: ${weather.temp} F`;
        dailyDiv.append(temp);

        wind = document.createElement("p");
        wind.textContent = `Wind: ${weather.wind} MPH`;
        dailyDiv.append(wind);

        humidity = document.createElement("p");
        humidity.textContent = `Humidity: ${weather.humidity} %`;
        dailyDiv.append(humidity);

        fiveDaysContainer.append(dailyDiv);
      }

      weatherData.push(weather);
      localStorage.setItem("weather", JSON.stringify(weatherData));
      console.log(weatherData);

      // storeData(){

      // }
    });
});
});