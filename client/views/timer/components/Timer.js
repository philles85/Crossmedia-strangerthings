import { store } from "../../../core/store/Store.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";

class Timer extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.currentEndAngle = store.state.timerCircleAngle;
        this.render();
        this.d3_logic();
        this.subs();
    }



    subs() {
        store.subscribe("timerCircleAngle", (angle) => {
            this.currentEndAngle = angle;

        })
    }

    eventListeners() {

    }

    // LOGIC FOR COMPONENT
    d3_logic() {

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
            .style("font-size", "46px")
            .style("font-family", "timer-font")
            .attr("fill", "red")

        let seconds;
        let minutes;
        let hours;

        // Fixa så endangle ändras efter varje sekund

        store.subscribe("currentTime", (data) => {

            // Med subtraktionen här går den ner medurs och inte moturs
            svgPath.attr("d", timeCircle({ endAngle: -this.currentEndAngle }));

            seconds = Math.floor((data / 1000)) % 60;
            minutes = Math.floor((data / 60000)) % 60;
            hours = data / 3600000;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            if (minutes < 10) {
                minutes = `0${minutes}`
            }

            g.text(`0${Math.trunc(hours)}:${Math.trunc(minutes)}:${seconds}`);

        })

        if (store.state.curentTime == 0) {
            console.log(data);
            g.text(`00:00:00`);

        }

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