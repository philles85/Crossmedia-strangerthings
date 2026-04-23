class PodFas1 extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render()
        this.d3_logic()
    }

    subs() {

    }
    d3_logic (){
        const hSvg = 70, wSvg = 200;
        const svg = d3.select("svg")
                    .attr("height", hSvg)
                    .attr("width", wSvg)
        console.log(svg)
        let randomHeight = Math.floor(10 * Math.random())
        console.log(randomHeight)
        for(let i = 0; i < 10; i++){
            console.log(i)
            svg.append("rect")
                .attr("height", randomHeight)
                .attr("width", 10)
        }
    }

    render() {

        this.shadowRoot.innerHTML = `
            <style>
                #podcast{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin: 70px 20px;
                }
            </style>
            <div id="podcast">
                <svg id="soundWaves"></svg>
                <audio controls autoplay>
                    <source src="views/podcast/podcasts/testSound.mp3" type="audio/mpeg"> 

                </audio> 
                
            </div>
        `
    }
}

customElements.define("pod-fas1", PodFas1);