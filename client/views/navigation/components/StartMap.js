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

    }

    // Sätter in rätt karta
    currentMapLogic() {
        let currentMapInfo = store.state.currentMap;
        console.log(currentMapInfo)


        store.subscribe("currentMap", (data) => {
            currentMapInfo = data;
        });

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
            this.currentCordinates.longitude = pos.coords.longitude;
            this.currentCordinates.latitude = pos.coords.latitude;

            let currentCordinatesPoints = this.changePointCordinates();

            this.shadowRoot.querySelector("p").innerHTML = `${pos.coords.latitude}, ${pos.coords.longitude}`;

            console.log(pos.coords.latitude, pos.coords.longitude);

            // let [xCordinat, yCordinat] = geoCordinatesInput([pos.coords.longitude, pos.coords.latitude]);
            // let xCordinat = this.calculateXLocation(pos.coords.longitude, 12.9970, 12.990332, 380)
            // let yCordinat = this.calculateYLocation(pos.coords.latitude, 55.612563, 55.60780, 500);
            let xCordinat = this.newCalculateXLocation(currentCordinatesPoints.pointA.mapCoord.x, currentCordinatesPoints.pointB.mapCoord.x, currentCordinatesPoints.pointA.geoCoord.long, currentCordinatesPoints.pointB.geoCoord.long, pos.coords.longitude);
            let yCordinat = this.newCalculateYLocation(currentCordinatesPoints.pointA.mapCoord.y, currentCordinatesPoints.pointB.mapCoord.y, currentCordinatesPoints.pointA.geoCoord.lat, currentCordinatesPoints.pointB.geoCoord.lat, pos.coords.latitude);

            svg.select("circle")
                .attr("cx", xCordinat)
                .attr("cy", yCordinat)
                .attr("fill", "red")
                .attr("r", 20);

            this.changeMapLogic();
        });


    }

    // Används för att få ut verkliga x och y position på den nerskalade kartan
    getSVGCoords(event, svgElement) {
        const rect = svgElement.getBoundingClientRect();

        const viewBoxWidth = 1107;
        const viewBoxHeight = 1151;

        const x = (event.offsetX / rect.width) * viewBoxWidth;
        const y = (event.offsetY / rect.height) * viewBoxHeight;

        return { x, y };
    }


    // Returnerar X position för cirkeln på kartan
    newCalculateXLocation(x1, x2, longitude1, longitude2, currentLongitude) {

        let scaleX = (x2 - x1) / (longitude2 - longitude1);
        let offsetX = x1 - scaleX * longitude1;

        return scaleX * currentLongitude + offsetX;
    }

    // Retunrerar Y position för cirkeln på kartan
    newCalculateYLocation(y1, y2, latitude1, latitude2, currentLatitude) {

        let scaleY = (y2 - y1) / (latitude2 - latitude1);
        let offsetY = y1 - scaleY * latitude1;

        return scaleY * currentLatitude + offsetY;
    }


    // Skickar en signal om att kartan ska bytas
    changeMapLogic() {
        let svg = d3.select(this.shadowRoot)
            .select("svg");

        let cordinateDifference = this.calculateDistance(12.989923, 55.608916, this.currentCordinates.longitude, this.currentCordinates.latitude);
        console.log(cordinateDifference);
        // Kontrollerar så att kordinaterna cirklen är inom radiet
        if (cordinateDifference <= 60) {
            store.state = {
                currentMap: {
                    mapName: "karta2",
                    cordinates: { pointA: { long: 12.974866, x: 95, lat: 55.609700, y: 404 }, pointB: { long: 12.989713, x: 1056, lat: 55.608868, y: 734 } },
                    mapSize: { width: 1853, height: 1180 }
                }
            };

        }
    }

    // Returnerar geoKordinater, X och Y för alla segment punkter 
    changePointCordinates() {
        let cordinateDifferencePoint1A = this.calculateDistance(12.991251, 55.609058, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let cordinateDifferencePoint1B = this.calculateDistance(12.993685, 55.609345, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let segmentDistancePoint1 = this.calculateDistance(12.991251, 55.609058, 12.993685, 55.609345)

        let cordinateDifferencePoint2B = this.calculateDistance(12.993272, 55.611075, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let segmentDistancePoint2 = this.calculateDistance(12.993685, 55.60934, 12.993272, 55.611075)

        let cordinateDifferencePoint3B = this.calculateDistance(12.994147, 55.612407, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let segmentDistancePoint3 = this.calculateDistance(12.993272, 55.611075, 12.994147, 55.612407)

        let cordinateDifferencePoint4B = this.calculateDistance(12.997450, 55.612398, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let segmentDistancePoint4 = this.calculateDistance(12.994147, 55.612407, 12.997450, 55.612398);

        let cordinateDifferencePoint5B = this.calculateDistance(12.999242, 55.608669, this.currentCordinates.longitude, this.currentCordinates.latitude);
        let segmentDistancePoint5 = this.calculateDistance(12.997450, 55.612398, 12.999242, 55.608669);
        console.log(Math.abs(cordinateDifferencePoint1A + cordinateDifferencePoint1B) - segmentDistancePoint1, segmentDistancePoint1);

        if ((Math.abs(cordinateDifferencePoint1A + cordinateDifferencePoint1B) - segmentDistancePoint1) <= segmentDistancePoint1) {
            return { pointA: { geoCoord: { long: 12.991251, lat: 55.609058 }, mapCoord: { x: 216, y: 721 } }, pointB: { geoCoord: { long: 12.993685, lat: 55.609345 }, mapCoord: { x: 492, y: 690 } } };
        }

        if ((Math.abs(cordinateDifferencePoint1B + cordinateDifferencePoint2B) - segmentDistancePoint2) <= segmentDistancePoint2) {
            return { pointA: { geoCoord: { long: 12.993685, lat: 55.609345 }, mapCoord: { x: 492, y: 690 } }, pointB: { geoCoord: { long: 12.993272, lat: 55.611075 }, mapCoord: { x: 473, y: 363 } } };
        }

        if ((Math.abs(cordinateDifferencePoint2B + cordinateDifferencePoint3B) - segmentDistancePoint3) <= segmentDistancePoint3) {
            return { pointA: { geoCoord: { long: 12.993272, lat: 55.611075 }, mapCoord: { x: 473, y: 363 } }, pointB: { geoCoord: { long: 12.994147, lat: 55.612407 }, mapCoord: { x: 605, y: 129 } } };
        }

        if ((Math.abs(cordinateDifferencePoint3B + cordinateDifferencePoint4B) - segmentDistancePoint4) <= segmentDistancePoint4) {
            return { pointA: { geoCoord: { long: 12.994147, lat: 55.612407 }, mapCoord: { x: 605, y: 129 } }, pointB: { geoCoord: { long: 12.997450, lat: 55.612398 }, mapCoord: { x: 946, y: 171 } } };
        }

        if ((Math.abs(cordinateDifferencePoint4B + cordinateDifferencePoint5B) - segmentDistancePoint5) <= segmentDistancePoint5) {
            return { pointA: { geoCoord: { long: 12.997450, lat: 55.612398 }, mapCoord: { x: 946, y: 171 } }, pointB: { geoCoord: { long: 12.999242, lat: 55.608669 }, mapCoord: { x: 1084, y: 884 } } };
        };

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
                justify-content: center;
            }

        </style>
        
        <p>0</p>

        <div id="mapContainer">

            <svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">
                <image x="0" y="0"/>
                <circle></circle>
            </svg>

        </div>
            
            
        `;

    }


}


customElements.define("start-map", StartMap);