import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";

class SecondMap extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.NAVIGATION.MAP2, () => {
            this.render();
            this.positionLogic();
        })

    }

    positionLogic() {

        let Element = this.shadowRoot;

        let svg = d3.select(Element)
            .select("svg")
            .attr("width", 380)
            .attr("height", 450)
            .style("border", "1px solid green");

        const geoCordinatesInput = d3.geoMercator()
            .center([12.9958, 55.6100])
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
                <image width="100%" height="100%" href="views/navigation/components/karta2.png"/>
                <circle></circle>
            </svg>

        </div>
            
            

       

        `;

    }


}

customElements.define("second-map", SecondMap);