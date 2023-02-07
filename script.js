const minSize = 0.01;
let area;
let map;

function sendData() {
    try {
        let params = {
            "type": "",
            "currency": "",
            "budget": 0,
            "coords": [{
                "lat": 0,
                "lng": 0
            },
            {
                "lat": 0,
                "lng": 0
            }],
            "turbineAmount": 1,
            "height": 0,
        }

        params.type = "rect";
        params.height = document.querySelector("#height").value;
        let bounds = area._bounds;
        params.coords = [{ "lat": bounds._northEast.lat, "lng": bounds._southWest.lng }, { "lat": bounds._southWest.lat, "lng": bounds._northEast.lng }]

        const http = new XMLHttpRequest();
        http.open('POST', '/');
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(params));
        http.onload = function () {
            alert(http.responseText)
            let response = JSON.parse(http.responseText);
            L.marker([response.best[0], response.best[1]]).addTo(map);
            let output = document.querySelector(".output");
            output.innerHTML = `Output: ${response.best[2]} W/m^2`;
        }
    } catch { }
}

let controls;


function loadMap() {
    let tempMap = document.querySelector(
        "#map"
    );
    tempMap.style.height = `${document.body.scrollHeight - 100}px`;
    tempMap.style.width = `${document.body.scrollWidth - 400}px`;
    // let controls = document.querySelector(".controls");
    // controls.style.top = `${document.body.querySelector("main").scrollHeight / 2 + controls.scrollHeight / 2 + 100}px`;
    map = L.map("map", { editable: true }).setView([59.402896, 17.955869], 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.control.scale().addTo(map);
    // let addRectButton = controls.querySelector("");
    // addRectButton.onclick = () => {
    //     map.editTools.startRectangle();
    // }
}

function selectArea() {
    try {
        area.remove();
    } catch { }
    area = map.editTools.startRectangle();
}



document.body.onload = () => {
    setTimeout(loadMap, 1000);
};
