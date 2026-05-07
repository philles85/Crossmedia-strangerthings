import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";
import { store } from "../../../core/store/Store.js";

class StartMap extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.currentCordinates = { longitude: 0, latitude: 0 };
        this.subs();
        this.render();
        this.currentMapLogic();
        this.positionLogic();
    }

    subs() {
        // Ändrar på kartan i statet när signalen kommit
        pubsub.subscribe(EVENTS.VIEWS.NAVIGATION.MAPCHANGE, (data) => {
            store.state = {
                currentMap: {
                    mapName: data.mapName,
                    centerCordinates: [data.centerCordinates],
                    mapSize: { width: data.mapSize.width, height: data.mapSize.height }
                }
            };
        })

    }

    // Sätter in rätt karta
    currentMapLogic() {
        let currentMapInfo = store.state.currentMap;
        console.log(currentMapInfo)


        store.subscribe("currentMap", (data) => {
            currentMapInfo = data;
        });

        let imgTag = d3.select(this.shadowRoot)
            .select("svg")
            .select("image")
            .attr("width", currentMapInfo.mapSize.width)
            .attr("height", currentMapInfo.mapSize.height)
            .attr("href", `views/navigation/components/${currentMapInfo.mapName}.png`);

        // Kanske köra om render funktionen för att rerendera?
    }

    // Positionerar ut cirkeln rätt
    positionLogic() {
        let previousCords;

        let svg = d3.select(this.shadowRoot)
            .select("svg")
            .attr("width", 380)
            .attr("height", 500)
            .style("border", "1px solid green");


        // Föregående scale var 1300000
        // 2667241
        // Föregående center kordinater för karta1: 12.9940, 55.6089

        //Mittpunkt för karta2 12.9821, 55.6090
        const geoCordinatesInput = d3.geoMercator()
            .center([12.9940, 55.6089])
            .scale(1600000)
            .translate([svg.select("image").attr("width") / 2, svg.select("image").attr("height") / 2]);

        navigator.geolocation.watchPosition((pos) => {
            this.currentCordinates.longitude = pos.coords.longitude;
            this.currentCordinates.latitude = pos.coords.latitude;


            this.shadowRoot.querySelector("p").innerHTML = `${pos.coords.latitude}, ${pos.coords.longitude}`;

            console.log(pos.coords.latitude, pos.coords.longitude);

            // let [xCordinat, yCordinat] = geoCordinatesInput([pos.coords.longitude, pos.coords.latitude]);
            let xCordinat = this.calculateXLocation(pos.coords.longitude, 12.9970, 12.990332, 380)
            let yCordinat = this.calculateYLocation(pos.coords.latitude, 55.612563, 55.60780, 500);

            svg.select("circle")
                .attr("cx", xCordinat)
                .attr("cy", yCordinat)
                .attr("fill", "red")
                .attr("r", 10);

            this.changeMapLogic();
        });


    }

    calculateXLocation(currentLongitude, maxLongitude, minLongitude, mapWidth) {
        let targetDiff = currentLongitude - minLongitude;
        let maxDiff = maxLongitude - minLongitude;

        let x = mapWidth * (targetDiff / maxDiff);

        return x;
    }

    calculateYLocation(currentLatitude, maxLatitude, minLatitude, mapHeight) {
        let targetDiff = currentLatitude - minLatitude;
        let maxDiff = maxLatitude - minLatitude;

        let y = mapHeight * (1 - (targetDiff / maxDiff));

        return y;
    }


    // Skickar en signal om att kartan ska bytas
    changeMapLogic() {
        let svg = d3.select(this.shadowRoot)
            .select("svg");

        // let currentPosCx = svg.select("circle").attr("cx");
        // let currentPosCy = svg.select("circle").attr("cy");

        // if (currentPosCx >= 40 && currentPosCx <= 45) {
        //     if (currentPosCy >= 285 && currentPosCy <= 295) {
        //         pubsub.publish(EVENTS.VIEWS.NAVIGATION.MAPCHANGE, {
        //             map: "karta2"
        //         });
        //     }
        // }
        let cordinateDifference = this.calculateDistance(12.989923, 55.608916, this.currentCordinates.longitude, this.currentCordinates.latitude);
        console.log(cordinateDifference);
        // Kontrollerar så att kordinaterna cirklen är inom radiet
        if (cordinateDifference <= 25) {
            pubsub.publish(EVENTS.VIEWS.NAVIGATION.MAPCHANGE, {
                mapName: "karta2",
                cemterCordinates: [12.9821, 55.6090],
                mapSize: { width: 427.38, height: 265.94 }

            });
        }
    }

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
                justify-content: center;
            }

        </style>
        
        <p>0</p>

        <div id="mapContainer">

            <svg id="Lager_1" xmlns="http://www.w3.org/2000/svg">
                <image x="0" y="0" width="" height=""/>
                <circle></circle>
            </svg>

        </div>
            
            
        `;

    }


}


customElements.define("start-map", StartMap);