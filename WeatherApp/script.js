const form = document.querySelector("#form");
const input = document.querySelector("#search");
const msg = document.querySelector(".error-box");
const list = document.querySelector(".card-container .cities")
const apiKey = "b83600421fea6f6179bbc4ad549aee7c";

form.addEventListener("submit", e => {
    e.preventDefault();
    let val_of_input = input.value;
    const listItems = list.querySelectorAll(".city");
    const listItemsArray = Array.from(listItems);

    if(listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(ele => {
            let content = ""

            if (val_of_input.includes(",")) {
                if (val_of_input.split(",")[1].length > 2) {
                    val_of_input = val_of_input.split(",")[0];
                    content = ele
                    .querySelectorAll("city-name div")
                    .textContent.toLowerCase();
                } else {
                    content = ele.querySelectorAll(".city-name");
                }
            } else {
                content = ele.querySelector(".city-name");
            }
            return content == val_of_input.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.document.style.display = "block";
            form.reset();
            input.focus();
            return;
        }
    }

    // API call here
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${val_of_input}&appid=${apiKey}&units=metric`;
    fetch(baseURL)
      .then(res => res.json())
      .then(data => {
          const { main, name, weather } = data;
          console.log(data)
          const li = document.createElement("li");
          li.classList.add("city");
          const markup = `
          <p class="city-name">${name}</p>
          <p class="temp">${Math.round(main.temp)}<sup>°C</sup></p>
          <p class="shower-text">${weather[0]["description"]}</p>
          `;
          li.innerHTML = markup;
          list.appendChild(li);
      })
      .catch((_data) => {
        msg.style.display = "block";
      });
    input.focus();
});