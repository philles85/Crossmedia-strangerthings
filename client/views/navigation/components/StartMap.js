import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";
import { store } from "../../../core/store/Store.js";
import { router } from "../../../core/router/Router.js";

class StartMap extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.currentCordinates = { longitude: 0, latitude: 0 };

        this.currentMapName = store.state.currentMap.mapName;
        this.currentMapCordinates = store.state.currentMap.cordinates;
        this.currentMapSize = store.state.currentMap.mapSize;

        store.subscribe("currentMap", (data) => {
            this.currentMapLogic(data);
            this.currentMapCordinates = data.cordinates;
            this.currentMapSize = data.mapSize;
            this.currentMapName = data.mapName;
        });

        this.endingPageOpen = store.state.endingPageOpen;
        this.lastPageOpen = store.state.lastPageOpen;

        store.subscribe("endingPageOpen", (data) => {
            this.endingPageOpen = data;
        })

        store.subscribe("lastPageOpen", (data) => {
            this.lastPageOpen = data;
        })

        this.subs();
        this.render();
        this.currentMapLogic();
        this.positionLogic();

    }

    subs() {

    }

    // Sätter in rätt karta
    currentMapLogic(data) {

        d3.select(this.shadowRoot)
            .select("svg")
            .attr("viewBox", `0 0 ${this.currentMapSize.width} ${this.currentMapSize.height}`)
            .select("image")
            .attr("width", this.currentMapSize.width)
            .attr("height", this.currentMapSize.height)
            .attr("href", `assets/images/${this.currentMapName}.png`);

    }

    // Positionerar ut cirkeln rätt
    positionLogic() {
        let svg = d3.select(this.shadowRoot)
            .select("svg")
            .style("border", "1px solid green")


        svg.on("click", (e) => {
            const { x, y } = this.getSVGCoords(e, svg.node());
            console.log("Sanna koordinater:", x, y);
        });

        const options = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };

        navigator.geolocation.watchPosition((pos) => {
            let gpsAccuracy = pos.coords.accuracy <= 50;
            console.log(this.currentMapCordinates);
            this.currentCordinates.longitude = pos.coords.longitude;
            this.currentCordinates.latitude = pos.coords.latitude;


            console.log(pos.coords.latitude, pos.coords.longitude);

            let xCordinat = this.getXPosition(pos.coords.longitude, this.currentMapCordinates.topLeftLong, this.currentMapCordinates.topRightLong, this.currentMapSize.width);
            let yCordinat = this.getYPosition(pos.coords.latitude, this.currentMapCordinates.topLeftLat, this.currentMapCordinates.bottomLeftLat, this.currentMapSize.height);


            console.log(this.currentMapSize)
            svg.select("circle")
                .attr("cx", xCordinat)
                .attr("cy", yCordinat)
                .attr("fill", "red")
                .attr("r", 20);

            this.changeMapLogic();

        }, (err) => {
            console.log(err);

        }, options);


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
        let codinatesDifferenceVideo = this.calculateDistance(12.97369, 55.61615, this.currentCordinates.longitude, this.currentCordinates.latitude);


        // Kontrollerar så att kordinaterna cirklen är inom radiet
        if (cordinateDifferenceMap2 <= 30) {
            store.state = {
                currentMap: {
                    mapName: "karta2",
                    cordinates: { topLeftLong: 12.974861, topRightLong: 12.988768, topLeftLat: 55.612296, bottomLeftLat: 55.606152 },
                    mapSize: { width: 1853, height: 1180 }
                }
            };
        }

        if (cordinateDifferenceMap3 <= 30) {
            store.state = {
                currentMap: {
                    mapName: "karta3",
                    cordinates: { topLeftLong: 12.983754, topRightLong: 12.992198, topLeftLat: 55.615469, bottomLeftLat: 55.612463 },
                    mapSize: { width: 987, height: 788 }
                },

            }
        };


        if (cordinateDifferenceMap4 <= 30) {
            store.state = {
                currentMap: {
                    mapName: "karta4",
                    cordinates: { topLeftLong: 12.974409, topRightLong: 12.983900, topLeftLat: 55.620026, bottomLeftLat: 55.613500 },
                    mapSize: { width: 1178, height: 1340 }
                },

            };

        }


        if (cordinateDifferenceEnding <= 25) {

            if (!this.endingPageOpen) {
                router.updateUrl("?page=ending");
                this.endingPageOpen = true;
            }

        } else {
            this.endingPageOpen = false;
        }


        if (codinatesDifferenceVideo <= 8) {

            if (!this.lastPageOpen) {
                router.updateUrl("?page=lastpage");
                this.lastPageOpen = true;
            }

        } else {
            this.lastPageOpen = false;
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
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 15px;
            }
            
            button {
                width: 150px;
             
                border: 1px solid red;
            }   

        </style>
        
        <p>FOLLOW THE MAP</p>

        <div id="mapContainer">

            <svg viewBox="0 0 1107 1151" style="width: 100%; height: auto;">
                <image/>
                <circle id="dot" r="10" fill="red" />
            </svg>

        </div> `;


    }


}


customElements.define("start-map", StartMap);