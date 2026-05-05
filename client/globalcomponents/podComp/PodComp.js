class Podcast extends HTMLElement {

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
        
        let rSelection = svg.append("g")
            .selectAll("rect")
            .data(rectArray)
            .enter()
            .append("rect")
                
                    
        function printWaves(){
            rSelection.attr("height", d => d.height)
                .attr("width", xScale.bandwidth())
                .attr("x", d => xScale(d))
                .attr("y", d => (hSvg - d.height) / 2)
                .attr("fill", "darkgrey")
        }
        printWaves()
        let allRects = rSelection.nodes()
        let timer = null;
        const audioButton = this.shadowRoot.querySelector("#play");
        let storeState = 0;
        let audio = null;
        let playing = false;
        let intervall = null;

        if(this.getAttribute("type") == "fas1") {
            audio = new Audio("./globalcomponents/audios/intro.mp3");
            audio.pause;
            audio.currentTime = 0;
            intervall = 2280;

        } else if (this.getAttribute("type") == "fas4"){
            audio = new Audio("./globalcomponents/audios/Eleven-podd-fas4.mp3");
            intervall = 1520;
        } 

        audioButton.addEventListener("click", function (){
            if (playing == false){
                audio.play();
                audioButton.removeAttribute("id", "play");
                audioButton.setAttribute("id", "pause");
                audioButton.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M0 18V0H6V18H0Z" fill="white"/>
                        <path d="M18 0H12V18H18V0Z" fill="white"/>
                    </svg>
                `;
                timer = setInterval(function(){
                    if (storeState >= allRects.length){
                        clearInterval(timer);
                        timer = 0;
                        return;
                    }
                    let node = allRects[storeState];
                    d3.select(node).attr("fill", "white");
                    storeState++;
                }, intervall);
                playing = true;
            } else if (playing == true){
                audio.pause();
                audioButton.removeAttribute("id", "pause");
                audioButton.setAttribute("id", "play");
                audioButton.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M0 18L18 9.29032L0 0V18Z" fill="white"/>                    
                    </svg>
                `;
                clearInterval(timer);
                timer = 0;
                playing = false;
            }

            let song = new Audio("./globalcomponents/audios/Running_Up_That_Hill.mp3");
            let played = false;
            if(this.getAttribute("type") == "fas4"){
                if(playing == false){
                    song.play
                }
                else{
                    song.pause
                }
            }
        })
        let restartButton = this.shadowRoot.querySelector("#restart")
        restartButton.addEventListener("click", () => windows.location.reload())
        // alternativt windows.location.reload()
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
                #buttons{
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
            </style>
            <div id="podcast">
                <svg id="soundWaves"></svg>
                <div id="buttons">
                    <button id="play">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M0 18L18 9.29032L0 0V18Z" fill="white"/>                    
                        </svg>
                    </button>
                    <div id="restart">
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path opacity="100" d="M32.457 12.8567C33.8824 18.1945 32.5014 24.1261 28.3138 28.3137C22.0654 34.5621 11.9347 34.5621 5.6863 28.3137C-0.562101 22.0653 -0.562101 11.9347 5.6863 5.68629C11.9347 -0.562098 22.0654 -0.562098 28.3138 5.68629L29.728 7.10049" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28 8.08731H31.7123V4.375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>    
                    </div> 
                </div>
            </div>
        `;
    }
}

customElements.define("podcast-comp", Podcast);