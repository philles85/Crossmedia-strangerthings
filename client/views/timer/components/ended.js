import { store } from "../../../core/store/Store.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";


class TimerEnded extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subs();
    }
    subs(){
        pubsub.subscribe(EVENTS.VIEWS.POPUP.SHOW.TIMERENDED, () => {
            this.render()  
        });
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
            div{
                position: absolute;
                width: 100%;
                top: 0;
                bottom: 0;
                background: black;
                text-align: center;
                padding-top: 100px;
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
        </style>
        <div>
            <h1>GAME OVER</h1>
            <h2>time is up</h2>
        </div>
        `;
    }

}

customElements.define("timer-ended", TimerEnded);