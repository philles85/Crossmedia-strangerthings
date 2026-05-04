class StartMap extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.positionLogic();
    }

    subs() {


    }

    positionLogic() {
        let previousCords;
        let Element = this.shadowRoot;

        let svg = d3.select(Element)
            .select("svg")
            .attr("width", 393)
            .attr("height", 400)
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
                .scale(150)
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

        navigator.geolocation.watchPosition((pos) => {
            console.log(pos.coords.latitude, pos.coords.longitude);
        });
        // navigator.geolocation.watchPosition(success, error, options);



    }


    render() {
        this.shadowRoot.innerHTML = `
        <style>
            p {
                color: white;
            }
        </style>
        <p>0</p>
        <svg>
            <circle></circle>
        </svg>

        `;

    }


}

customElements.define("start-map", StartMap);