const searchbtn = document.querySelector("#search-btn");
const inputCity = document.querySelector("#city");

const myAPIKey = 'c3dce583129645e5fbfd8906c1347162';
// const city = inputCity.value;

searchbtn.addEventListener('click', function(){
    let city = inputCity.value;
    console.log(city);
    const url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}`;

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("I am here");
        console.log(data);

    });
})