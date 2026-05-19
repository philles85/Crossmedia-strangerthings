import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";

class HalfTimePopup extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subs();

        pubsub.subscribe(EVENTS.GAME.TIMER.HALF, () => {
            this.render();

        })
    }

    subs() {

    }


    render() {

        this.shadowRoot.innerHTML = `
            <style>
                div {
                 
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    background-color: white;
                    width: 150px;
                    height: 250px;
                    
                }   

            </style>
            
            <div>
                <h1>Attention!</h1>
                <p>You are now halfway through the game, make sure you have enough time for the rest of the game</p>
                <button>OK</button>
            </div>


        `;
    }


}

customElements.define("halftime-popup", HalfTimePopup);