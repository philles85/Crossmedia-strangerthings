import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";
import { store } from "../../../core/store/Store.js";

class StartMap extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.currentCordinates = { longitude: 0, latitude: 0 };

        this.currentMapCordinates = { topLeftLong: 12.9882200, topRightLong: 13.0003500, topLeftLat: 55.6142100, bottomLeftLat: 55.6071200 };
        this.currentMapSize = { width: 1107, height: 1151 }

        store.subscribe("currentMap", (data) => {
            this.currentMapLogic(data);
            this.currentMapCordinates = data.cordinates;
            this.currentMapSize = data.mapSize;
        });

        this.subs();
        this.render();
        this.currentMapLogic();
        this.positionLogic();

    }

    subs() {

    }

    // Sätter in rätt karta
    currentMapLogic(data) {
        let currentMapInfo;
        if (!data) {
            currentMapInfo = store.state.currentMap;
            console.log(currentMapInfo)
        } else {
            currentMapInfo = data;
            this.currentMapCordinates = data.cordinates;
        }

        d3.select(this.shadowRoot)
            .select("svg")
            .attr("viewBox", `0 0 ${currentMapInfo.mapSize.width} ${currentMapInfo.mapSize.height}`)
            .select("image")
            .attr("width", currentMapInfo.mapSize.width)
            .attr("height", currentMapInfo.mapSize.height)
            .attr("href", `assets/images/${currentMapInfo.mapName}.png`);

        // Kanske köra om render funktionen för att rerendera?
    }

    // Positionerar ut cirkeln rätt
    positionLogic() {
        let svg = d3.select(this.shadowRoot)
            .select("svg")

            .style("border", "1px solid green");


        svg.on("click", (e) => {
            const { x, y } = this.getSVGCoords(e, svg.node());
            console.log("Sanna koordinater:", x, y);
        });


        // Föregående scale var 1300000
        // 2667241
        // Föregående center kordinater för karta1: 12.9940, 55.6089

        //Mittpunkt för karta2 12.9821, 55.6090
        const geoCordinatesInput = d3.geoMercator()
            .center([12.9940, 55.6089])
            .scale(1600000)
            .translate([svg.select("image").attr("width") / 2, svg.select("image").attr("height") / 2]);

        navigator.geolocation.watchPosition((pos) => {
            let gpsAccuracy = pos.coords.accuracy <= 50;
            console.log(this.currentMapCordinates);
            this.currentCordinates.longitude = pos.coords.longitude;
            this.currentCordinates.latitude = pos.coords.latitude;

            this.shadowRoot.querySelector("p").innerHTML = `${pos.coords.latitude}, ${pos.coords.longitude}`;

            console.log(pos.coords.latitude, pos.coords.longitude);

            // let [xCordinat, yCordinat] = geoCordinatesInput([pos.coords.longitude, pos.coords.latitude]);

            // Previous coords: xCordinat: 12.989553, 12.997465,
            // yCordinat: 55.612422, 55.607342
            let xCordinat = this.getXPosition(pos.coords.longitude, this.currentMapCordinates.topLeftLong, this.currentMapCordinates.topRightLong, this.currentMapSize.width);
            let yCordinat = this.getYPosition(pos.coords.latitude, this.currentMapCordinates.topLeftLat, this.currentMapCordinates.bottomLeftLat, this.currentMapSize.height);


            console.log(this.currentMapSize)
            svg.select("circle")
                .attr("cx", xCordinat)
                .attr("cy", yCordinat)
                .attr("fill", "red")
                .attr("r", 20);

            this.changeMapLogic();

        });


    }

    getXPosition(userLong, topLeftLong, topRightLong, width) {
        let userDiff = userLong - topLeftLong;

        let coordDiff = topRightLong - topLeftLong;

        let xRatio = userDiff / coordDiff;

        return xRatio * width;
    }

    getYPosition(userLat, topLeftLat, bottomLeftLat, height) {
        let userDiff = topLeftLat - userLat;

        let coordDiff = topLeftLat - bottomLeftLat;

        let yRatio = userDiff / coordDiff;

        return yRatio * height;
    }

    // Används för att få ut verkliga x och y position på den nerskalade kartan
    getSVGCoords(event, svgElement) {
        const rect = svgElement.getBoundingClientRect();

        const viewBoxWidth = 1853;
        const viewBoxHeight = 1180;

        const x = (event.offsetX / rect.width) * viewBoxWidth;
        const y = (event.offsetY / rect.height) * viewBoxHeight;

        return { x, y };
    }

    // Skickar en signal om att kartan ska bytas
    changeMapLogic() {

        let cordinateDifferenceMap2 = this.calculateDistance(12.989923, 55.608916, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let cordinateDifferenceMap3 = this.calculateDistance(12.98805, 55.612335, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let cordinateDifferenceMap4 = this.calculateDistance(12.984289, 55.614168, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let cordinateDifferenceEnding = this.calculateDistance(12.974933, 55.616721, this.currentCordinates.longitude, this.currentCordinates.latitude);

        let button2 = this.shadowRoot.querySelector("#map2");
        let button3 = this.shadowRoot.querySelector("#map3");
        let button4 = this.shadowRoot.querySelector("#map4");
        let button5 = this.shadowRoot.querySelector("#ending");

        button2.addEventListener("click", () => {
            store.state = {
                currentMap: {
                    mapName: "karta2",
                    cordinates: { topLeftLong: 12.974861, topRightLong: 12.988768, topLeftLat: 55.612296, bottomLeftLat: 55.606152 },
                    mapSize: { width: 1853, height: 1180 }
                }
            };
        })

        button3.addEventListener("click", () => {
            store.state = {
                currentMap: {
                    mapName: "karta3",
                    cordinates: { topLeftLong: 12.973798, topRightLong: 12.992102, topLeftLat: 55.614883, bottomLeftLat: 55.612750 },
                    mapSize: { width: 987, height: 788 }
                }
            };
        })

        button4.addEventListener("click", () => {
            store.state = {
                currentMap: {
                    mapName: "karta4",
                    cordinates: { topLeftLong: 12.974578, topRightLong: 12.981476, topLeftLat: 55.616667, bottomLeftLat: 55.613867 },
                    mapSize: { width: 1178, height: 1340 }
                }
            };
        })


        button5.addEventListener("click", () => {
            pubsub.publish(EVENTS.VIEWS.PAGE.SHOW.ENDING);
        })



        console.log(cordinateDifferenceMap2);
        // Kontrollerar så att kordinaterna cirklen är inom radiet
        if (cordinateDifferenceMap2 <= 60) {
            store.state = {
                currentMap: {
                    mapName: "karta2",
                    cordinates: { cordinates: { topLeftLong: 12.974861, topRightLong: 12.988768, topLeftLat: 55.612296, bottomLeftLat: 55.606152 } },
                    mapSize: { width: 1853, height: 1180 }
                }
            };
        }

        if (cordinateDifferenceMap3 <= 60) {
            store.state = {
                currentMap: {
                    mapName: "karta3",
                    cordinates: { cordinates: { topLeftLong: 12.973798, topRightLong: 12.992102, topLeftLat: 55.614883, bottomLeftLat: 55.612750 } },
                    mapSize: { width: 987, height: 788 }
                }
            };
        }

        if (cordinateDifferenceMap4 <= 60) {
            store.state = {
                currentMap: {
                    mapName: "karta4",
                    cordinates: { cordinates: { topLeftLong: 12.974578, topRightLong: 12.981476, topLeftLat: 55.616667, bottomLeftLat: 55.613867 } },
                    mapSize: { width: 1178, height: 1340 }
                }
            };
        }

        if (cordinateDifferenceEnding <= 30) {
            pubsub.publish(EVENTS.VIEWS.PAGE.SHOW.ENDING);
        }


    }

    // HAVERSINE FORMEL, men kan byggas om till avståndsformeln istället
    calculateDistance(longitude1, latitude1, longitude2, latitude2) {
        const earthRadius = 6371000;

        let differenceLongitude = (longitude2 - longitude1) * Math.PI / 180;
        let differenceLatitude = (latitude2 - latitude1) * Math.PI / 180;

        let area = Math.sin(differenceLatitude / 2) * Math.sin(differenceLatitude / 2) +
            Math.cos(latitude1 * Math.PI / 180) * Math.cos(latitude2 * Math.PI / 180) *
            Math.sin(differenceLongitude / 2) * Math.sin(differenceLongitude / 2);

        let angle = 2 * Math.atan2(Math.sqrt(area), Math.sqrt(1 - area));

        return earthRadius * angle;

    }


    render() {
        this.shadowRoot.innerHTML = `
        <style>
            p {
                color: white;
            }
            #mapContainer {
                display:flex;   
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 15px;
            }
            
            button {
                width: 150px;
                height:
                border: 1px solid red;
            }

        </style>
        
        <p>0</p>

        <div id="mapContainer">

            <svg viewBox="0 0 1107 1151" style="width: 100%; height: auto;">
                <image/>
                <circle id="dot" r="10" fill="red" />
            </svg>

            <button id="map2">Change map 2</button>
            <button id="map3">Change map 3</button>
            <button id="map4">Change map 4</button>
            <button id="ending">Ending</button>
        </div>
            
            
        `;

    }


}


customElements.define("start-map", StartMap);