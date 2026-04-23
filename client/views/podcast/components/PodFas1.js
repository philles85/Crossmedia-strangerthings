class PodFas1 extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render()
        this.d3_logic()
    }

    subs() {

    }
    d3_logic() {
        const hSvg = 70, wSvg = 350;
        const svg = d3.select(this.shadowRoot)
                    .select("svg")
                    .attr("height", hSvg)
                    .attr("width", wSvg);

        let rectArray = [];
        for (let i = 0; i < 50; i++) {
            let randomHeight = Math.floor(70 * Math.random())
            rectArray.push({id: i, height: randomHeight})
        } 
        
        let xScale = d3.scaleBand(rectArray, [0, wSvg])
                        .paddingInner(.8)
                        .paddingOuter(.9);

        let testArray = svg.append("g")
            .selectAll("rect")
            .data(rectArray)
            .enter()
            .append("rect")
            .attr("height", d => d.height)
            .attr("width", xScale.bandwidth())
            .attr("x", d => xScale(d))
            .attr("y", d => (hSvg - d.height) / 2)
            .attr("fill", "darkgrey")
                

        let allRects = testArray.nodes()
        let timer = null;
        const audioDOM = this.shadowRoot.querySelector("audio");
        let storeState = 0;

        audioDOM.addEventListener("play", function (){
            timer = setInterval(function(){
                if (storeState >= allRects.length){
                    clearInterval(timer);
                    timer = 0;
                    return;
                }
                let node = allRects[storeState]
                d3.select(node).attr("fill", "white")
                storeState++
            }, 360)

        })

        audioDOM.addEventListener("pause", function (){
            clearInterval(timer);
            timer = 0;
            return;            
        })

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