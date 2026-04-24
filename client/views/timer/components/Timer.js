import { store } from "../../../core/store/Store.js";

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
            .endAngle(Math.PI * 2)

        svg.append("g")
            .append("path")
            .attr("d", timeCircle)
            .attr("transform", "translate(196.5, 200)")
            .attr("fill", "red");

        let g = svg.append("g")
            .append("text")
            .attr("transform", `translate(196.5, 200)`)
            .attr("text-anchor", "middle")
            .style("font-size", "32px")
            .attr("fill", "red")

        let seconds = 59
        let minutes = 59
        let hours = 2

        // Fixa så endangle ändras efter varje sekund

        store.subscribe("currentTime", (data) => {
            if (seconds == 0) {
                seconds = 59;
                minutes = minutes - 1
            }
            seconds = seconds - 1
            if (minutes == 0) {
                minutes = 59;
            }
            // minutes = minutes - ((data.time / 1000) / 60);

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
        </style>



            <div id="timerCircle">
                <svg></svg>
            </div>
        `;
    }

}

customElements.define("timer-circle", Timer);