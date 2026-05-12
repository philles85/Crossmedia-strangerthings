import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";
import { store } from "../../../core/store/Store.js";

class StartMap extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.positionLogic()
    }

    subs() {
        pubsub.subscribe(EVENTS.NAVIGATION.MAPCHANGE, (data) => {
            store.state = { currentmap: data.map };
        })

    }

    positionLogic() {
        let previousCords;
        let Element = this.shadowRoot;

        let svg = d3.select(Element)
            .select("svg")
            .attr("width", 380)
            .attr("height", 450)
            .style("border", "1px solid green");

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };


        function error(err) {
            console.error(`ERROR(${err.code}): ${err.message}`);
        }

        function success(pos) {
            // if (!previousCords || pos.coords.latitude != previousCords.latitude || pos.coords.longitude != previousCords.longitude) {
            //     Element.querySelector("p").innerHTML = `${pos.coords.latitude}, ${pos.coords.longitude}`;

            //     previousCords = {
            //         latitude: pos.coords.latitude,
            //         longitude: pos.coords.longitude
            //     }

            // }
            Element.querySelector("p").innerHTML = `${pos.coords.latitude}, ${pos.coords.longitude}`;

            console.log(pos.coords);

            // let geoCordinatesInput = d3.geoMercator();
            const geoCordinatesInput = d3.geoMercator()
                .center([13.109433761205093, 55.91591059739929])
                .scale(10)
                .translate([393 / 2, 400 / 2]);

            // let [xCordinat, yCordinat] = geoCordinatesInput([previousCords.latitude.toFixed(2), previousCords.longitude.toFixed(2)]);
            let [xCordinat, yCordinat] = geoCordinatesInput([pos.coords.longitude, pos.coords.latitude]);
            // let yCordinat = geoCordinatesInput([previousCords.longitude]);
            console.log(xCordinat)

            // let path = d3.geoPath().projection(convertCordi  nates);

            svg.select("circle")
                .attr("cx", xCordinat)
                .attr("cy", yCordinat)
                .attr("r", 10)
                .style("fill", "green");

        }

        // const geoCordinatesInput = d3.geoMercator()
        //     .scale(150)
        //     .translate([380 / 2, 500 / 2]);


        // navigator.geolocation.getCurrentPosition((pos) => {
        //     geoCordinatesInput.center[pos.coords.longitude, pos.coords.latitude];
        // })


        // Föregående scale var 1300000
        // 2667241
        const geoCordinatesInput = d3.geoMercator()
            .center([12.9940, 55.6089])
            .scale(1300000)
            .translate([380 / 2, 500 / 2]);

        navigator.geolocation.watchPosition((pos) => {
            Element.querySelector("p").innerHTML = `${pos.coords.latitude}, ${pos.coords.longitude}`;

            console.log(pos.coords.latitude, pos.coords.longitude);

            let [xCordinat, yCordinat] = geoCordinatesInput([pos.coords.longitude, pos.coords.latitude]);

            svg.select("circle")
                .attr("cx", xCordinat)
                .attr("cy", yCordinat)
                .attr("fill", "red")
                .attr("r", 10);

        });
        // navigator.geolocation.watchPosition(success, error, options);

        let currentPosCx = svg.select("circle").attr("cx");
        let currentPosCy = svg.select("circle").attr("cy");

        if (currentPosCx >= 40 && currentPosCx <= 45) {
            if (currentPosCy >= 285 && currentPosCy <= 295) {
                pubsub.publish(EVENTS.VIEWS.NAVIGATION.MAPCHANGE, {
                    map: "karta2"
                });
            }
        }


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
                <image width="100%" height="100%"/>
                <circle></circle>
            </svg>

        </div>
            
            
        `;

    }


}

// customElements.define("start-map", StartMap);


// let cordinateDifferencePoint1A = this.calculateDistance(12.991251, 55.609058, this.currentCordinates.longitude, this.currentCordinates.latitude);
//         let cordinateDifferencePoint1B = this.calculateDistance(12.993685, 55.609345, this.currentCordinates.longitude, this.currentCordinates.latitude);
//         let segmentDistancePoint1 = this.calculateDistance(12.991251, 55.609058, 12.993685, 55.609345)

//         let cordinateDifferencePoint2B = this.calculateDistance(12.993272, 55.611075, this.currentCordinates.longitude, this.currentCordinates.latitude);
//         let segmentDistancePoint2 = this.calculateDistance(12.993685, 55.60934, 12.993272, 55.611075)

//         let cordinateDifferencePoint3B = this.calculateDistance(12.994147, 55.612407, this.currentCordinates.longitude, this.currentCordinates.latitude);
//         let segmentDistancePoint3 = this.calculateDistance(12.993272, 55.611075, 12.994147, 55.612407)

//         let cordinateDifferencePoint4B = this.calculateDistance(12.997450, 55.612398, this.currentCordinates.longitude, this.currentCordinates.latitude);
//         let segmentDistancePoint4 = this.calculateDistance(12.994147, 55.612407, 12.997450, 55.612398);

//         let cordinateDifferencePoint5B = this.calculateDistance(12.999242, 55.608669, this.currentCordinates.longitude, this.currentCordinates.latitude);
//         let segmentDistancePoint5 = this.calculateDistance(12.997450, 55.612398, 12.999242, 55.608669);
//         console.log(Math.abs(cordinateDifferencePoint1A + cordinateDifferencePoint1B) - segmentDistancePoint1, segmentDistancePoint1);

//         if ((Math.abs(cordinateDifferencePoint1A + cordinateDifferencePoint1B) - segmentDistancePoint1) <= segmentDistancePoint1) {
//             return { pointA: { geoCoord: { long: 12.991251, lat: 55.609058 }, mapCoord: { x: 216, y: 721 } }, pointB: { geoCoord: { long: 12.993685, lat: 55.609345 }, mapCoord: { x: 492, y: 690 } } };
//         }

//         if ((Math.abs(cordinateDifferencePoint1B + cordinateDifferencePoint2B) - segmentDistancePoint2) <= segmentDistancePoint2) {
//             return { pointA: { geoCoord: { long: 12.993685, lat: 55.609345 }, mapCoord: { x: 492, y: 690 } }, pointB: { geoCoord: { long: 12.993272, lat: 55.611075 }, mapCoord: { x: 473, y: 363 } } };
//         }

//         if ((Math.abs(cordinateDifferencePoint2B + cordinateDifferencePoint3B) - segmentDistancePoint3) <= segmentDistancePoint3) {
//             return { pointA: { geoCoord: { long: 12.993272, lat: 55.611075 }, mapCoord: { x: 473, y: 363 } }, pointB: { geoCoord: { long: 12.994147, lat: 55.612407 }, mapCoord: { x: 605, y: 129 } } };
//         }

//         if ((Math.abs(cordinateDifferencePoint3B + cordinateDifferencePoint4B) - segmentDistancePoint4) <= segmentDistancePoint4) {
//             return { pointA: { geoCoord: { long: 12.994147, lat: 55.612407 }, mapCoord: { x: 605, y: 129 } }, pointB: { geoCoord: { long: 12.997450, lat: 55.612398 }, mapCoord: { x: 946, y: 171 } } };
//         }

//         if ((Math.abs(cordinateDifferencePoint4B + cordinateDifferencePoint5B) - segmentDistancePoint5) <= segmentDistancePoint5) {
//             return { pointA: { geoCoord: { long: 12.997450, lat: 55.612398 }, mapCoord: { x: 946, y: 171 } }, pointB: { geoCoord: { long: 12.999242, lat: 55.608669 }, mapCoord: { x: 1084, y: 884 } } };
//         };
