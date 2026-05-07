import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";
import { store } from "../../../core/store/Store.js";

class StartMap extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subs();
        this.render();
        this.currentMapLogic();
        this.positionLogic();
        this.changeMapLogic();
    }

    subs() {
        // Ändrar på kartan i statet när signalen kommit
        pubsub.subscribe(EVENTS.VIEWS.NAVIGATION.MAPCHANGE, (data) => {
            store.state = { currentMap: data.map };
        })

    }

    // Sätter in rätt karta
    currentMapLogic() {
        let currentMap = "karta1";

        store.subscribe("currentMap", (data) => {
            currentMap = data;
        });

        let imgTag = d3.select(this.shadowRoot)
            .select("svg")
            .select("image")
            .attr("href", `views/navigation/components/${currentMap}.png`);

        // Kanske köra om render funktionen för att rerendera?
    }

    // Positionerar ut cirkeln rätt
    positionLogic() {
        let previousCords;

        let svg = d3.select(this.shadowRoot)
            .select("svg")
            .attr("width", 380)
            .attr("height", 450)
            .style("border", "1px solid green");


        // Föregående scale var 1300000
        // 2667241
        const geoCordinatesInput = d3.geoMercator()
            .center([12.9940, 55.6089])
            .scale(2300000)
            .translate([380 / 2, 500 / 2]);

        navigator.geolocation.watchPosition((pos) => {

            this.shadowRoot.querySelector("p").innerHTML = `${pos.coords.latitude}, ${pos.coords.longitude}`;

            console.log(pos.coords.latitude, pos.coords.longitude);

            let [xCordinat, yCordinat] = geoCordinatesInput([pos.coords.longitude, pos.coords.latitude]);

            svg.select("circle")
                .attr("cx", xCordinat)
                .attr("cy", yCordinat)
                .attr("fill", "red")
                .attr("r", 10);

        });


    }

    // Skickar en signal om att kartan ska bytas
    changeMapLogic() {
        let svg = d3.select(this.shadowRoot)
            .select("svg");

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

customElements.define("start-map", StartMap);