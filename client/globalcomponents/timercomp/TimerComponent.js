import { store } from "../../core/store/Store.js";

class TimerComponent extends HTMLElement {


    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.timeLogic();
    }


    timeLogic() {
        let seconds;
        let minutes;
        let hours;
        let h3 = this.shadowRoot.querySelector("h3");

        store.subscribe("currentTime", (data) => {
            seconds = (data.time / 1000) % 60;
            minutes = (data.time / 60000) % 60;
            hours = data.time / 3600000;

            h3.innerHTML = `${Math.trunc(hours)}:${Math.trunc(minutes)}:${seconds}`;
        })
    }




    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    border: 1px solid red;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 15px;
                }
                h3 {
                    font-family: "timer-font";
                    color: white;
                    font-size: 75px;
                    margin: 0;
                    
                }
            </style>

            <div>
                <h3></h3>

            </div>
        
        
        
        `;
    }

}

customElements.define("timer-footer", TimerComponent);