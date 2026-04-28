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
        let pElement = this.shadowRoot.querySelector("p");

        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };


        function error(err) {
            console.error(`ERROR(${err.code}): ${err.message}`);
        }

        function success(pos) {
            if (pos.coords != previousCords) {
                pElement.innerHTML = `${pos.coords.latitude}, ${pos.coords.longitude}`;
            }
            previousCords = pos.coords;
            console.log(pos.coords);
        }

        navigator.geolocation.watchPosition(success, error, options);
    }


    render() {
        this.shadowRoot.innerHTML = `
        <style>
            p {
                color: white;
            }
        </style>
        <p>0</p>


        `;

    }


}

customElements.define("start-map", StartMap);