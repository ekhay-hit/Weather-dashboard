// elements selectors
const searchbtn = document.querySelector("#search-btn");
const weatherContainer = document.querySelector(".main");
const inputCity = document.querySelector("#city");
const search = document.querySelector(".search");
const searchDiv = document.querySelector(".main");
const mainDiv = document.querySelector(".main-div");///
const divHistory = document.querySelector(".divHistory")
const myAPIKey = "c3dce583129645e5fbfd8906c1347162";
const btnclicked = document.querySelectorAll(".btn");

// veraibles declarations
const weatherData = [];
let searchHistory;

// rendering search history function
function createSearchHistory(){
  mainDiv.classList.remove("d-none");
  // if search array is empty initialize the array otherwise render the search history
if(localStorage.getItem('cities')=== null){
  searchHistory =[];
}else{
searchHistory=JSON.parse(localStorage.getItem("cities"))
// remove any history that is rendered
divHistory.textContent="";
// renders search history
for(city of searchHistory){
const historyBtn = document.createElement('button');
historyBtn.setAttribute("class","btn btn-secondary mt-3 form-control ");
historyBtn.textContent = city;
divHistory.append(historyBtn);
}
  }
}

// calling the search history
createSearchHistory();

// fetching function that even listner calls
function fetchDta (city){
  // empty the previous search information
  initialize();
  // call fetchData function
  fetchData(city);

}

// This is the function that fetch data
function fetchData(city){
  
  // url tto get cordinate of the city
  const urlCordinate = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${myAPIKey}&units=imperial`;
 
  //fetch data from url and return json
  fetch(urlCordinate)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // printing data to console
      console.log(data);

      let lat = data[0].lat;
      let lon = data[0].lon;
    
      // url to fetch data of the weather

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myAPIKey}&units=imperial`;

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          
          // if the city is not already in the array, unshift the city to the begining of the array and save to local storage
          if (!(searchHistory.includes(data.city.name))){

          searchHistory.unshift(data.city.name);
          localStorage.setItem("cities", JSON.stringify(searchHistory));

          }else{

            // if it is in the array  find the index 
            let index = searchHistory.findIndex(x => x == data.city.name);
            
           // remove the element that is in index in the array searchhistory
            searchHistory.splice(index,1);
            // insert the data.city.name at index 0 with out any deletion 0
            searchHistory.splice(0,0, data.city.name);
            // save changes to local storage
            localStorage.setItem("cities", JSON.stringify(searchHistory));
          }

          // call to create search history
          createSearchHistory();
          // todays date with the format 
          let today = dayjs().format("DD/MM/YYYY");
        
          // create html element that are required to hold data
          // div that hold all the elements 

          const secondDiv = document.createElement("div");
          secondDiv.setAttribute(
            "class",
            "col-3 ms-5 lead fs-4 "
          );

          mainDiv.append(secondDiv);

            // div that hold the icon for current day

            const iconDiv = document.createElement("div");
            secondDiv.textContent="";
            iconDiv.setAttribute('class',"col-3")
            let icon = document.createElement("img");
            icon.setAttribute('src',`https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`)
            icon.setAttribute('id', 'todayIcon');
            icon.setAttribute("class","col-2 ")
            icon.textContent = `Icon: ${data.list[0].weather[0].icon}`;
            iconDiv.append(icon);
            mainDiv.append(iconDiv);

          // header for date

          today =dayjs().format("DD/MM/YYYY");
          let cityName = document.createElement("h3");
          cityName.textContent = `${data.city.name} ${today}`
          cityName.setAttribute("class","h5 fs-3  lead")
          secondDiv.append(cityName);
          
          // element holder for temp
          let temp = document.createElement("p");
          temp.textContent = `Temp: ${data.list[0].main.temp} °F`;
          secondDiv.append(temp);

          // element holder for wind 
          let wind = document.createElement("p");
          wind.textContent = `Wind: ${data.list[0].wind.speed} MPH`;
          secondDiv.append(wind);

          // element holder for humadity
          let humidity = document.createElement("p");
          humidity.textContent = `Humidity: ${data.list[0].main.humidity} %`;
          secondDiv.append(humidity);

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
          
          let day = 1;
            i =39
            while(i>0){
            today =dayjs().add(day,'day').format("DD/MM/YYYY"),
            console.log(i);
            let dailyDiv = document.createElement("div");
            dailyDiv.setAttribute("class", "col-2 p-3 h-100 bg-dark");

            cityName = document.createElement("h5");
            cityName.textContent = `${today}`;
            dailyDiv.append(cityName);

            icon = document.createElement("img");
            icon.setAttribute('src',`https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`)
            icon.textContent = `Icon: ${data.list[i].weather[0].icon}`;
            dailyDiv.append(icon);

            temp = document.createElement("p");
            temp.textContent = `Temp: ${data.list[i].main.temp} °F`;
            dailyDiv.append(temp);

            wind = document.createElement("p");
            wind.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
            dailyDiv.append(wind);

            humidity = document.createElement("p");
            humidity.textContent = `Humidity: ${data.list[i].main.humidity} %`;
            dailyDiv.append(humidity);
         
            fiveDaysContainer.append(dailyDiv);
            i =i-8;
            day++;
          }

        });
    });
    
}

// function to initialize the weather main div element
function initialize(){
  mainDiv.textContent = '';
}

// even listner for search button 
searchbtn.addEventListener("click", function(){
    if (inputCity.value == "") {
    alert("Enter the city name");
  }
  let city = inputCity.value;

  fetchDta(city);
});

// even listner for search history button
divHistory.addEventListener("click", function(e){
 
  console.log('hey hey btn clicked');
 
   city = e.target.textContent;
   console.log(city);
  
  fetchDta(city);

})
 