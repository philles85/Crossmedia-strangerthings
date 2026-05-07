import "../../../globalcomponents/podComp/PodComp.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";

class Riddle extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subs();
    }

    subs(){
        pubsub.subscribe(EVENTS.VIEWS.POPUP.SHOW.AUDIO, () => {
            this.shadowRoot.innerHTML = ``;
        })
        pubsub.subscribe(EVENTS.VIEWS.POPUP.SHOW.MENU, () =>  {
            this.render() 
            this.eventListeners();
        })
        pubsub.publish(EVENTS.VIEWS.POPUP.SHOW.MENU)
    }

    eventListeners (){
        let inputField = this.shadowRoot.querySelector("input")
        inputField.addEventListener("keydown", (e) => {
            if(e.key === "Enter"){
                this.logic(inputField.value)
            }
        });
    }


    logic (userAnswer){
        if(userAnswer === "Max"){
            let pDOM = this.shadowRoot.querySelector("p");
            pDOM.textContent = "ACCESS GRANTED. LOADING AUDIO"
            setTimeout(() => {
                pubsub.unsubscribe(EVENTS.VIEWS.POPUP.SHOW.MENU)
                pubsub.publish(EVENTS.VIEWS.POPUP.SHOW.AUDIO)
            }, 1000);
        } else {
            let pDOM = this.shadowRoot.querySelector("p");
            pDOM.textContent = "ACCESS DENIED. THE GATE IS STILL SEALED"

        }
    }

    render(){
        // svara på gåtan för att få podcasten 
        this.shadowRoot.innerHTML = `
            <style>
                #riddle{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    gap: 20px
                }
                #riddle input{
                    width: 100px;
                    background-color:
                }
                #riddle p{
                    color: white;
                    text-align: center;
                }
                #menuImage{
                    width: 350px;
                }
            </style>
            <div id="riddle">
                <img id="menuImage" src="./views/endpage/components/menu.png"/>
                <input placeholder="Answer" type="password"/>
                <p></p>
            </div>
            
        `
        // <podcast-comp type="fas4"></podcast-comp">
    }
}

customElements.define("riddle-comp", Riddle);