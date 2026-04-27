import { store } from "../../../core/store/Store.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";

class Timer extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.d3_logic();
    }

    subs() {

    }

    eventListeners() {

    }

    // LOGIC FOR COMPONENT
    d3_logic() {
        setInterval(() => {
            this.timerLogic();
        }, 1000)

        let svg = d3.select(this.shadowRoot).select("svg")
            .attr("width", 393)
            .attr("height", 400);

        let timeCircle = d3.arc()
            .innerRadius(130)
            .outerRadius(150)
            .startAngle(0)
        // .endAngle(Math.PI * 2)

        let svgPath = svg.append("g")
            .append("path")
            .attr("d", timeCircle({ endAngle: Math.PI * 2 }))
            .attr("transform", "translate(196.5, 200)")
            .attr("fill", "red");

        let g = svg.append("g")
            .append("text")
            .attr("transform", `translate(196.5, 200)`)
            .attr("text-anchor", "middle")
            .style("font-size", "32px")
            .attr("fill", "red")

        let currentEndAngle = Math.PI * 2;

        let seconds = 59;
        let minutes = 59;
        let hours = 2;

        // Fixa så endangle ändras efter varje sekund

        store.subscribe("currentTime", (data) => {
            // if (data.currentTime.time == 5400000) {
            //     Pub
            // }
            currentEndAngle = currentEndAngle - 0.00058178;

            // Med subtraktionen här går den ner medurs och inte moturs
            svgPath.attr("d", timeCircle({ endAngle: -currentEndAngle }));

            if (seconds == 0) {
                seconds = 60;
                minutes = minutes - 1
            }
            seconds = seconds - 1
            if (minutes == 0) {
                minutes = 59;
                hours = hours - 1;
            }

            g.text(`${hours}:${minutes}:${seconds}`);
        })

    }

    timerLogic() {
        let currTime = store.state.currentTime.time;

        currTime = currTime - 1000;

        store.state = { currentTime: { time: currTime } };
    }


    render() {
        this.shadowRoot.innerHTML = `

        <style>
            #timerCircle{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            svg text {
          
            }
        </style>

            <div id="timerCircle">
                <svg></svg>
            </div>
        `;
    }

}

customElements.define("timer-circle", Timer);