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
        const audioButton = this.shadowRoot.querySelector("#play");
        let storeState = 0;
        let audio = new Audio("views/podcast/podcasts/testsound.mp3")
        let playing = false;

        audioButton.addEventListener("click", function (){
            if (playing == false){
                audio.play()
                audioButton.removeAttribute("id", "play")
                audioButton.setAttribute("id", "pause")
                audioButton.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M0 18V0H6V18H0Z" fill="white"/>
                        <path d="M18 0H12V18H18V0Z" fill="white"/>
                    </svg>
                `
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
                playing = true;
            } else if (playing == true){
                audio.pause()
                audioButton.removeAttribute("id", "pause")
                audioButton.setAttribute("id", "play")
                audioButton.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M0 18L18 9.29032L0 0V18Z" fill="white"/>                    
                    </svg>
                `
                clearInterval(timer);
                timer = 0;
                playing = false;
            }
        })

    }

    render() {

        this.shadowRoot.innerHTML = `
            <style>
                #podcast{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 70px 20px;
                    gap: 20px;
                }
                #play, #pause{
                    width: 40px;
                    height: 40px;
                    background: transparent;
                    border: 2px solid white;
                    border-radius: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #play{
                    padding: 7px 7px 7px 10px;
                }
            </style>
            <div id="podcast">
                <svg id="soundWaves"></svg>
                <button id="play">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M0 18L18 9.29032L0 0V18Z" fill="white"/>                    
                    </svg>
                </button>
                
            </div>
        `
        // <audio>
        //       <source src="views/podcast/podcasts/testSound.mp3" type="audio/mpeg"> 

        // </audio>
    }
}

customElements.define("pod-fas1", PodFas1);