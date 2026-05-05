import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";

class StartMap extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.positionLogic()
    }

    subs() {


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
        const geoCordinatesInput = d3.geoMercator()
            .center([12.9940, 55.6089])
            .scale(2667241)
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
                pubsub.publish(EVENTS.VIEWS.NAVIGATION.MAP2);
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
                <image width="100%" height="100%" href="views/navigation/components/karta1.png"/>
                <circle></circle>
            </svg>

        </div>
            
            
        `;

    }


}

customElements.define("start-map", StartMap);