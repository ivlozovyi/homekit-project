const dom = {
    selectbox: document.querySelector(".selectbox"),
    selectboxList: document.querySelector('.selectbox__list'),
    selectboxSelected: document.querySelector('.selectbox__selected'),
    selectboxItem: document.querySelector('.selectbox__item'),
    rooms: document.querySelector("#rooms"),
    settings: document.querySelector("#settings"),
    settingsPanel: document.querySelector('#settings-panel'),
    settingsTabs: document.querySelector('#settings-tabs'),
    temperatureLine: document.querySelector("#line"),
    temperatureRound: document.querySelector("#round"),
    temperatureInfo: document.querySelector('.temperature-button__info span'),
    temperatureButton: document.querySelector('.temperature-button'),
    temperatureSaveButton: document.querySelector('.set-button'),
    temperaturePowerButton: document.querySelector('.power'),
    sliders: {
        lights: document.querySelector('#lights-slider'),
        humidity: document.querySelector('#humidity-slider'),
    },
    swtch: {
        lights: document.getElementById('lights-power'),
        humidity: document.getElementById('humidity-power'),
    },


}

const listOFRooms = {
    all: 'All Rooms',
    livingroom: 'Living Room',
    bedroom: 'Bedroom',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    studio: 'Studio',
    washingroom: 'Washing Room',
}

const roomsData = {
    livingroom: {
        temperature: 16,
        temperatureOff: false,
        lights: 100,
        lightsOff: false,
        humidity: 80,
        humidityOff: false,
    },
    bedroom: {
        temperature: 16,
        temperatureOff: false,
        lights: 100,
        lightsOff: false,
        humidity: 80,
        humidityOff: false,
    },
    kitchen: {
        temperature: 16,
        temperatureOff: false,
        lights: 100,
        lightsOff: false,
        humidity: 80,
        humidityOff: false,
    },
    bathroom: {
        temperature: 16,
        temperatureOff: false,
        lights: 100,
        lightsOff: false,
        humidity: 80,
        humidityOff: false,
    },
    studio: {
        temperature: 16,
        temperatureOff: false,
        lights: 100,
        lightsOff: false,
        humidity: 80,
        humidityOff: false,
    },
    washingroom: {
        temperature: 16,
        temperatureOff: false,
        lights: 100,
        lightsOff: false,
        humidity: 80,
        humidityOff: false,
    },
}

let activeRoom = 'all';
let activeTab = 'temperature';

const { selectbox, selectboxList, selectboxSelected, rooms, selectboxItem, settings, settingsPanel, settingsTabs, temperatureLine, temperatureRound, temperatureInfo, temperatureButton, temperatureSaveButton, temperaturePowerButton, sliders, swtch, } = dom;

selectboxSelected.addEventListener('click', (e) => {
    selectbox.classList.toggle("open");
})
document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (!target.matches(".selectbox") && !target.parentElement.parentElement.matches(".selectbox") && !target.parentElement.matches('.selectbox')) {
        selectbox.classList.remove("open")
    }
});

selectboxList.addEventListener('click', (e) => {
    const { target } = e;
    if (target.matches(".selectbox__item")) {
        const { room } = target.dataset;
        selectboxList.querySelector('.selected').classList.remove('selected');
        target.classList.add('selected');
        selectbox.classList.remove("open");
        selectRoom(room);
    }
});

function selectRoom(room) {
    const selectedRoom = rooms.querySelector('.selected');
    if (selectedRoom) {
        selectedRoom.classList.remove('selected');
    };
    if (room !== 'all') {
        const newSelectedRoom = rooms.querySelector(`[data-room=${room}`);
        const { temperature, lights, humidity, lightsOff, humidityOff } = roomsData[room];
        activeRoom = room;
        newSelectedRoom.classList.add('selected');
        renderScreen(false);
        temperatureInfo.innerText = temperature;
        renderTemperature(temperature);
        setTemperaturePower();
        changeSettigsType(activeTab);
        changeSlider(lights, sliders.lights);
        changeSlider(humidity, sliders.humidity);
        changeSwitch('lights', lightsOff)
        changeSwitch('humidity', humidityOff)
    } else {
        renderScreen(true);
    }
    const selectedSelectboxRoom = selectbox.querySelector('.selectbox__item.selected');
    selectedSelectboxRoom.classList.remove('selected');
    const newSelectedItem = selectbox.querySelector(`[data-room="${room}"]`);
    newSelectedItem.classList.add('selected');
    const selectboxSpan = selectbox.querySelector('.selectbox__selected span');
    selectboxSpan.innerText = listOFRooms[room];

}

rooms.querySelectorAll('.mobile__room').forEach(element => {
    element.addEventListener('click', () => {
        const { room } = element.dataset;
        selectRoom(room);
    })
})

function renderScreen(isRooms) {
    setTimeout(() => {
        if (isRooms) {
            rooms.style.display = "grid";
            settings.style.display = "none";
        } else {
            rooms.style.display = "none"
            settings.style.display = "block";
        }
    }, 300)
}
//------------------------------SETTINGS SECTION---------------------------


function renderTemperature(temperature) {
    const min = 16;
    const max = 40;
    const range = max - min;
    const percent = range / 100;
    const lineMin = 54;
    const lineMax = 276;
    const lineRange = lineMax - lineMin;
    const linePercent = lineRange / 100;
    const roundMin = -240;
    const roundMax = 48;
    const roundRange = roundMax - roundMin;
    const roundPercent = roundRange / 100;
    if (temperature >= min && temperature <= max) {
        const finishPercent = Math.round((temperature - min) / percent);
        const lineFinishPercent = lineMin + linePercent * finishPercent;
        const roundFinishPercent = roundMin + roundPercent * finishPercent;
        temperatureLine.style.strokeDasharray = `${lineFinishPercent}, 276`;
        temperatureRound.style.transform = `rotate(${roundFinishPercent}deg)`;
        temperatureInfo.innerText = temperature;

    }
}


function changeTemperature() {
    let mouseover = false;
    let mousedown = false;
    let position = 0;
    let range = 0;
    let change = 0;
    temperatureButton.onmouseover = () => {
        mouseover = true;
        mousedown = false;
    };
    temperatureButton.onmouseout = () => mouseover = false;
    temperatureButton.onmouseup = (e) => mousedown = false;
    temperatureButton.onmousedown = (e) => {
        mousedown = true;
        position = e.offsetY;
        range = 0;
    }
    temperatureButton.onmousemove = (e) => {
        if (mouseover && mousedown) {
            range = e.offsetY - position;
            const newChange = Math.round(range / -5);
            if (newChange !== change) {
                let temperature = +temperatureInfo.innerText;
                if (newChange < change) {
                    temperature = temperature - 1;
                } else {
                    temperature = temperature + 1;
                }
                change = newChange;
                renderTemperature(temperature);
            }

        }
    }
}
changeTemperature()
temperatureSaveButton.addEventListener('click', () => {
    const temperature = +temperatureInfo.innerText;
    roomsData[activeRoom].temperature = temperature;
    alert('Temperature was set')
});

temperaturePowerButton.addEventListener("click", () => {
    const power = temperaturePowerButton;
    power.classList.toggle('off');
    if (power.matches('.off')) {
        roomsData[activeRoom].temperatureOff = true;
    } else {
        roomsData[activeRoom].temperatureOff = false;
    }
})
function setTemperaturePower() {
    if (roomsData[activeRoom].temperatureOff) {
        temperaturePowerButton.classList.add('off');
    } else {
        temperaturePowerButton.classList.remove('off');
    }

}

settingsTabs.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const optionType = tab.dataset.type;
        activeTab = optionType;
        changeSettigsType(optionType)
    })
})

function changeSettigsType(type) {
    const tabSelected = settingsTabs.querySelector('.tab.selected');
    const tab = settingsTabs.querySelector(`[data-type=${type}]`);
    const panelSelected = settingsPanel.querySelector('.selected');
    const panel = settingsPanel.querySelector(`[data-type="${type}"]`)
    tabSelected.classList.remove('selected');
    panelSelected.classList.remove('selected');
    tab.classList.add('selected');
    panel.classList.add('selected');
}

function changeSlider(percent, slider) {
    if (percent >= 0 && percent <= 100) {
        const { type } = slider.parentElement.parentElement.dataset
        slider.querySelector("span").innerText = percent;
        slider.style.height = `${percent}%`;
        roomsData[activeRoom][type] = percent;
    }
}

function watchSlider(slider) {
    let mouseover = false;
    let mousedown = false;
    let position = 0;
    let range = 0;
    let change = 0;
    const parent = slider.parentElement;
    parent.onmouseover = () => {
        mouseover = true;
        mousedown = false;
    };
    parent.onmouseout = () => mouseover = false;
    parent.onmouseup = (e) => mousedown = false;
    parent.onmousedown = (e) => {
        mousedown = true;
        position = e.offsetY;
        range = 0;
    }
    parent.onmousemove = (e) => {
        if (mouseover && mousedown) {
            range = e.offsetY - position;
            const newChange = Math.round(range / -2);
            if (newChange !== change) {
                let percent = +slider.querySelector('span').innerText;
                if (newChange < change) {
                    percent = percent - 1;
                } else {
                    percent = percent + 1;
                }
                change = newChange;
                changeSlider(percent, slider);
            }

        }
    }
}
watchSlider(sliders.lights);
watchSlider(sliders.humidity);

function changeSwitch(activeTab, isOff) {
    if (isOff) {
        swtch[activeTab].classList.add("off");
    } else {
        swtch[activeTab].classList.remove("off");
    }
    roomsData[activeRoom][`${activeTab}Off`] = isOff;
}
swtch.humidity.addEventListener("click", () => {
    const isOff = !swtch.humidity.matches(".off");
    changeSwitch(activeTab, isOff);
})
swtch.lights.addEventListener("click", () => {
    const isOff = !swtch.lights.matches(".off");
    changeSwitch(activeTab, isOff);
})

/*-------*/

const pointer = document.querySelector('.selectbox__pointer');
pointer.addEventListener('click', (e) => {
    document.querySelector(".mobile__content").classList.toggle("none");
    document.querySelector(".mobile__search").classList.toggle("block");
})

const apiKey = "d2365d41895006ee7e682e6acebef306";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.mobile__search-container input');
const searchBtn = document.querySelector('.mobile__search-container button');
const weatherIcon = document.querySelector(`.weather__icon`);

console.log(searchBox, searchBtn);

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status === 404){
        document.querySelector(`.mobile__search-error`).style.display = 'block';
        document.querySelector(`.weather`).style.display = 'none';
    } else{
        const data = await response.json();

    document.querySelector(`.weather__city`).innerHTML = data.name;
    document.querySelector(`.weather__temp`).innerHTML = Math.round(data.main.temp) + "&deg;C";
    document.querySelector(`.weather__humidity`).innerHTML = data.main.humidity + "%";
    document.querySelector(`.weather__wind`).innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "img/weather/images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "img/weather/images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "img/weather/images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "img/weather/images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "img/weather/images/mist.png";
    }

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.mobile__search-error').style.display = 'none';
    }
}
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });


