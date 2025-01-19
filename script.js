
const currentDate = new Date().toISOString().split("T")[0]; 

getCurrentImageOfTheDay();
addSearchToHistory()
async function getCurrentImageOfTheDay() {
  let date = currentDate;
  fetchInfo(date);
}

function getImageOfTheDay() {
    let searchDate = document.getElementById("search-input").value;
    if(searchDate> currentDate)
    alert("Cannot get future Dates!!");
    else
    {
        fetchInfo(searchDate);
        saveSearch(searchDate);
    }
}
function saveSearch(searchDate) {

    let searchHistory =[];
    searchHistory= localStorage.getItem("searchArr") ?JSON.parse(localStorage.getItem("searchArr")) : [] ;
    if(searchHistory.includes(searchDate))
    {}
    else{
        searchHistory.unshift({date:searchDate});
        localStorage.setItem("searchArr",JSON.stringify(searchHistory));
        addSearchToHistory()
    }

}
function addSearchToHistory() {
    let list = document.getElementById("search-history");
    let searchArr = JSON.parse(localStorage.getItem("searchArr"));
    list.innerHTML = ``;
    searchArr.map((date)=>{
        list.innerHTML += `<li onclick="fetchInfo('${date.date}')">${date.date}</li>` 
    })
}

function fetchInfo(date) {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=3YOHmoOdtHoePkE2UGKkRJWfOOJ7l65vDSkjH61v&date=${date}`
  )
    .then((Response) => Response.json())
    .then((data) => {
      renderData(data);
    });
}
function renderData(data) {
  let currentImageContainer = document.getElementById(
    "current-image-container"
  );
  currentImageContainer.innerHTML = ``;
  currentImageContainer.innerHTML = `
        <div id="img-details">
                <p id="date">${data.date == currentDate?"Today":data.date}</p>
                <h1 id="heading">NASA's Picture of the Day</h1>
                <h2 id="title">${data.title}</h2>
                <p id="disc">${data.explanation}</div>
            <div id="img">
            ${
              data.media_type == "video"
                ? `<iframe src=${data.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`
                : `<img src=${data.url}></img>`
            }
                
            </div>
       `;
}