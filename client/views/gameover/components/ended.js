import { store } from "../../../core/store/Store.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";


class TimerEnded extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `

        <style>
            @font-face {
                font-family: "Benguiat_bold";
                src: url("../fonts/Benguiat_Bold.ttf") format("truetype");
            }
            @font-face {
                font-family: "Benguiat_outlined";
                src: url("../fonts/Stranger_Things_Outlined.ttf") format("Outlined");
            }
        
            h1{
                -webkit-text-stroke: 2px #A10303;
                color: transparent;
                font-size: 48px;
                line-height: 48px;
            }

            h2{
        
                font-family: "Benguiat_bold";
                color: white;
                font-size: 24px;
            }

            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 84px;
            }
        </style>

        <div>
            <h1>GAME OVER</h1>
            <h2>Time is up</h2>        
        </div>

        `;
    }

}

customElements.define("timer-ended", TimerEnded);