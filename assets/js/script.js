const searchbtn = document.querySelector("#search-btn");
const weatherContainer = document.querySelector(".main");
const inputCity = document.querySelector("#city");
const search = document.querySelector(".search");
const searchDiv = document.querySelector(".main");
const divHistory = document.querySelector(".divHistory")
const myAPIKey = "c3dce583129645e5fbfd8906c1347162";
// const city = inputCity.value;

const weatherData = [];
let searchHistory;


console.log(searchHistory);
// <button id="search-btn" class="btn btn-info mt-3 form-control ">Search</button>
function createSearchHistory(){

if(localStorage.getItem('cities')=== null){
  searchHistory =[];
}else{
  searchHistory=JSON.parse(localStorage.getItem("cities"))
}
divHistory.textContent="";
for(city of searchHistory){
const historyBtn = document.createElement('button');
historyBtn.setAttribute("class","btn btn-secondary mt-3 form-control ");
historyBtn.textContent = city;
divHistory.append(historyBtn);
}
};

createSearchHistory();


searchbtn.addEventListener("click", function () {

  if (inputCity.value == "") {
    alert("Enter the city name");
  }
  let city = inputCity.value;
  
 
  // let city = "orlando";
//   if(localStorage.getItem('cities')=== null){
//     searchHistory =[];
//   }else{
//     searchHistory=JSON.parse(localStorage.getItem("cities"))
//   }
//   searchHistory.push(city);
// localStorage.setItem("cities", JSON.stringify(searchHistory));
// console.log(searchHistory);
// // <button id="search-btn" class="btn btn-info mt-3 form-control ">Search</button>
// for(city of searchHistory){
//   const button = document.createElement('button');
//   button.setAttribute("class","btn btn-seconday mt-3 form-control ");
//   button.textContent = city;
//   search.append(button);
// }

  const urlCordinate = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${myAPIKey}&units=imperial`;
  // const url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}&units=imperial`;

  // let cord = {};

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
          
          searchHistory.push(data.city.name);
          localStorage.setItem("cities", JSON.stringify(searchHistory));
          createSearchHistory();
          

          console.log("I am here at Data");
          console.log(data);
          let today = dayjs().format("DD/MM/YYYY");
          console.log(`Today is ${today}`)

          let weather = {
            name: data.city.name,
            // date: dayjs().format("MM/DD/YYYY"),
            date: today,
            icon: data.list[0].weather[0].icon,
            temp: data.list[0].main.temp,
            wind: data.list[0].wind.speed,
            humidity: data.list[0].main.humidity,
            // localStorage.setItem("weather", JSON.stringify(weatherData));
          };
          weatherData.push(weather);
          let i = 39;
          let day = 5;
          while (i > 0) {
            today =dayjs().add(day,'day').format("DD/MM/YYYY"),
            weather = {
              // JSON.stringify(json.weather[0].icon);
              // date: dayjs().format("MM/DD/YYYY"),
              date: today,
              icon: data.list[i].weather[0].icon,
              temp: data.list[i].main.temp,
              wind: data.list[i].wind.speed,
              humidity: data.list[i].main.humidity,
              // localStorage.setItem("weather", JSON.stringify(weatherData));
            };
            weatherData.push(weather);
            day--;
            i = i - 8;
          }

          console.log("I am here after finishing the array");
          console.log(weatherData);

          const mainDiv = document.createElement("div");
          mainDiv.setAttribute("class", "row w-75 shadow rounded p-5 ");
          //****************** */
          const secondDiv = document.createElement("div");
          secondDiv.setAttribute(
            "class",
            "col-3 ms-5 lead fs-4 "
          );
          mainDiv.append(secondDiv);

            const iconDiv = document.createElement("div");
            iconDiv.setAttribute('class',"col-3")

            let icon = document.createElement("img");
            icon.setAttribute('src',`https://openweathermap.org/img/w/${weatherData[0].icon}.png`)
            icon.setAttribute('id', 'todayIcon');
            icon.setAttribute("class","col-2 ")
            icon.textContent = `Icon: ${weatherData[0].icon}`;
            iconDiv.append(icon);
            mainDiv.append(iconDiv);

          let cityName = document.createElement("h3");
          cityName.textContent = `${weatherData[0].name} ${weatherData[0].date}`;
          cityName.setAttribute("class","h5 fs-3  lead")
          secondDiv.append(cityName);
          
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

          const fiveDaysH3 = document.createElement("span");
          fiveDaysH3.setAttribute("class", "row h3 py-3 ms-5 w-75 ");
          fiveDaysH3.textContent = `5-Days Forecase:`;
          mainDiv.append(fiveDaysH3);

          const fiveDaysContainer = document.createElement("div");
          fiveDaysContainer.setAttribute(
            "class",
            "row   gap-4 text-white justify-content-center"
          );
          mainDiv.append(fiveDaysContainer);

          for (let i = 5; i > 0; i--) {
            let dailyDiv = document.createElement("div");
            dailyDiv.setAttribute("class", "col-2 p-3 h-100 bg-dark");

            cityName = document.createElement("h5");
            cityName.textContent = `${weatherData[i].date}`;
            dailyDiv.append(cityName);

            icon = document.createElement("img");
            icon.setAttribute('src',`https://openweathermap.org/img/w/${weatherData[i].icon}.png`)
            icon.textContent = `Icon: ${weatherData[0].icon}`;
            dailyDiv.append(icon);

            temp = document.createElement("p");
            temp.textContent = `Temp: ${weatherData[i].temp} F`;
            dailyDiv.append(temp);

            wind = document.createElement("p");
            wind.textContent = `Wind: ${weatherData[i].wind} MPH`;
            dailyDiv.append(wind);

            humidity = document.createElement("p");
            humidity.textContent = `Humidity: ${weatherData[i].humidity} %`;
            dailyDiv.append(humidity);
         
            fiveDaysContainer.append(dailyDiv);
          }

          // storeData(){

          // }
        });
    });
});
