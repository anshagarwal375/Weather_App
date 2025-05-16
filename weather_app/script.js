// element select
const searchbtn = document.querySelector("#button");
const searchinput = document.querySelector("#input");
const tempratureElem = document.querySelector(".temperature");
const locationElem = document.querySelector(".location");
const emojiImg = document.querySelector(".emoji");
const dateElem = document.querySelector(".date");
const timeElem = document.querySelector(".time");
const conditionElem = document.querySelector(".condition");

// event listener
searchbtn.addEventListener("click", async function () {
  alert("i was clicked");
  const location = searchinput.value;
  if (location) {
    if (location != " ") {
      // fetch data
      const data = await fetchData(location);
      if (data == null) {
        // do nothing if no data
      } else {
        updateDOM(data);
      }
    }
    searchinput.value = "";
  }
});

function updateDOM(data) {
  // filter required data
  console.log("i will update this data", data);
  const temp = data.current.temp_c;
  const location = data.location.name;
  const timedate = data.location.localtime;
  const [date, time] = timedate.split(" ");
  const iconlink = "https:" + data.current.condition.icon;
  const condition = data.current.condition.text;

  console.log("temp:", temp, "location:", location);
  console.log("Date:", date, "Time:", time, "link:", iconlink);
  console.log("condition:", condition);

  // update data inside DOM
  tempratureElem.textContent = temp + "°C";
  locationElem.textContent = location;
  emojiImg.src = iconlink;
  dateElem.textContent = date;
  timeElem.textContent = time;
  conditionElem.textContent = condition;
}

async function fetchData(location) {
  const url = `http://api.weatherapi.com/v1/current.json?key=c114f25a48fb40a6aab34603251005&q=${encodeURIComponent(
    location
  )}&aqi=no`;

  const response = await fetch(url);
  console.log(response);

  if (response.status == 404) {
    alert("location is invalid");
    return null;
  } else if (response.status == 200) {
    const json = await response.json();
    console.log(json);
    return json;
  }
}
